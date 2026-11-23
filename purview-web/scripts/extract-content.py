"""
Extract published content from a local mirror of purviewservices.com into typed JSON.

Usage:  python scripts/extract-content.py <mirror-pages-dir> src/content/legacy

Content is copied verbatim from the live site (no rewriting) so that the
revamped pages preserve approved messaging. "Sample" dashboard mock-ups are
skipped because their numbers are illustrative, not business facts.
"""
import json, os, re, sys
from bs4 import BeautifulSoup, NavigableString, Tag

SRC, OUT = sys.argv[1], sys.argv[2]
os.makedirs(OUT, exist_ok=True)

SKIP_FILES = {"index.html"}  # homepage is bespoke


def txt(el):
    return re.sub(r"\s+", " ", el.get_text(" ", strip=True)).replace(" ,", ",").replace(" .", ".").strip()


def slug_of(href):
    if not href:
        return None
    if href.startswith("http") or href.startswith("mailto:") or href.startswith("tel:"):
        return href
    h = href.split("#")[0]
    if h in ("", "index.html"):
        return "/"
    return "/" + re.sub(r"\.(html|php)$", "", h)


def is_sample(el):
    t = txt(el)[:160].lower()
    return ("sample" in t and ("● live" in t or "· sample" in t or t.startswith("sample"))) or "● live" in t[:20]


def pair(li):
    b = li.find(["b", "strong", "h3", "h4"])
    if b:
        rest = txt(li)[len(txt(b)):].strip()
        return {"title": txt(b), "body": rest}
    return {"title": txt(li), "body": ""}


def links_in(el):
    out = []
    for a in el.find_all("a"):
        label = txt(a)
        if not label:
            continue
        out.append({"label": label.replace("↗", "").replace("→", "").strip(), "href": slug_of(a.get("href")), "external": (a.get("href") or "").startswith("http")})
    return out


def walk(node, blocks):
    for ch in node.children:
        if isinstance(ch, NavigableString) or not isinstance(ch, Tag):
            continue
        name = ch.name
        cls = " ".join(ch.get("class", []))
        if name in ("svg", "script", "style", "img", "picture", "canvas", "aside", "nav", "button", "form", "input", "select", "label"):
            continue
        if ch.get("hidden") is not None:
            continue
        if name in ("div", "section", "article", "figure") and is_sample(ch):
            continue
        if "crumbs" in cls or "subnav" in cls or "tabs" in cls:
            continue
        if "proof" in cls.split() or "stats" in cls:
            items = []
            for d in ch.find_all("div", recursive=False):
                b = d.find("b")
                if b:
                    items.append({"value": txt(b), "label": txt(d)[len(txt(b)):].strip()})
            if items:
                blocks.append({"type": "stats", "items": items})
            continue
        if "feature-points" in cls:
            continue  # generic template filler, not page content
        if "taglist" in cls:
            names = [t.get("data-logo") or txt(t) for t in ch.find_all(["span", "a"], recursive=False)]
            names = [n for n in names if n]
            if names:
                blocks.append({"type": "logos", "items": names})
            continue
        if "outcomes" in cls.split():
            items = [{"title": txt(d), "body": ""} for d in ch.find_all("div", recursive=False) if txt(d)]
            if items:
                blocks.append({"type": "list", "variant": "outcomes", "items": items})
            continue
        kids = [k for k in ch.children if isinstance(k, Tag)]
        if name == "div" and len(kids) >= 2 and all(k.name in ("div", "a") and k.find(["b", "strong"]) and len(txt(k)) < 400 and not k.find(["h2", "h3", "ul", "ol", "p"]) for k in kids) and "proof" not in cls:
            items = []
            for k in kids:
                b = k.find(["b", "strong"])
                items.append({"title": txt(b), "eyebrow": "", "body": txt(k)[len(txt(b)):].strip(), "links": links_in(k) if k.name == "a" or k.find("a") else []})
            blocks.append({"type": "cards", "variant": "compact", "items": items})
            continue
        if "case" in cls.split():
            h = ch.find(["h3", "h2"])
            eb = ch.find(class_="eyebrow")
            ps = [txt(p) for p in ch.find_all("p")]
            res = ch.find(class_="res")
            blocks.append({
                "type": "case",
                "eyebrow": txt(eb) if eb else "",
                "title": txt(h) if h else "",
                "body": " ".join(ps),
                "result": ({"value": txt(res.find("b")), "label": txt(res)[len(txt(res.find("b"))):].strip()} if res and res.find("b") else None),
                "links": links_in(ch),
            })
            continue
        if name == "details":
            q = ch.find("summary")
            a = txt(ch)[len(txt(q)) if q else 0:].strip()
            if blocks and blocks[-1]["type"] == "faq":
                blocks[-1]["items"].append({"q": txt(q), "a": a})
            else:
                blocks.append({"type": "faq", "items": [{"q": txt(q), "a": a}]})
            continue
        if name == "table":
            rows = []
            for tr in ch.find_all("tr"):
                rows.append([txt(c) for c in tr.find_all(["th", "td"])])
            if rows:
                blocks.append({"type": "table", "rows": rows})
            continue
        if name in ("ul", "ol"):
            lis = ch.find_all("li", recursive=False)
            items = [pair(li) for li in lis if txt(li)]
            if items:
                blocks.append({"type": "steps" if (name == "ol" or "how" in cls) else "list", "items": items})
            continue
        if "card" in cls.split() or "scard" in cls.split() or "pcard" in cls.split():
            h = ch.find(["h3", "h4", "b"])
            eb = ch.find(class_=["eyebrow", "tag", "kicker"])
            body = " ".join(txt(p) for p in ch.find_all("p")) or (txt(ch)[len(txt(h)):].strip() if h else txt(ch))
            item = {"title": txt(h) if h else "", "eyebrow": txt(eb) if eb and eb is not h else "", "body": body, "links": links_in(ch)}
            if blocks and blocks[-1]["type"] == "cards" and blocks[-1].get("_open"):
                blocks[-1]["items"].append(item)
            else:
                blocks.append({"type": "cards", "items": [item], "_open": True})
            continue
        if name in ("h2", "h3", "h4"):
            prev = ch.find_previous_sibling()
            eb = txt(prev) if prev is not None and "eyebrow" in " ".join(prev.get("class", [])) else ""
            blocks.append({"type": "heading", "level": int(name[1]), "eyebrow": eb, "text": txt(ch)})
            continue
        if "eyebrow" in cls:
            continue  # consumed by following heading
        if name == "p":
            t = txt(ch)
            if t:
                blocks.append({"type": "text", "text": t})
            continue
        if name == "blockquote":
            blocks.append({"type": "quote", "text": txt(ch)})
            continue
        if name == "a" and "btn" in cls:
            l = links_in(ch.parent)[:0] or [{"label": txt(ch).replace("↗", "").replace("→", "").strip(), "href": slug_of(ch.get("href")), "external": (ch.get("href") or "").startswith("http")}]
            if blocks and blocks[-1]["type"] == "links":
                blocks[-1]["items"] += l
            else:
                blocks.append({"type": "links", "items": l})
            continue
        before = len(blocks)
        walk(ch, blocks)
        # close a card run once the container that held it ends
        for b in blocks[before:]:
            b.pop("_open", None)


def head_of(main):
    ph = main.find(class_="pagehead") or main.find("section")
    crumbs = []
    c = ph.find(class_="crumbs") if ph else None
    if c:
        for el in c.children:
            if isinstance(el, Tag) and el.name in ("a", "span") and txt(el) not in ("/", ""):
                crumbs.append({"label": txt(el), "href": slug_of(el.get("href")) if el.name == "a" else None})
    eb = ph.find(class_="eyebrow") if ph else None
    h1 = main.find("h1")
    lede = None
    if h1:
        p = h1.find_next("p")
        lede = txt(p) if p else None
    actions = []
    if ph:
        for a in ph.find_all("a", class_="btn"):
            actions.append({"label": txt(a).replace("↗", "").replace("→", "").strip(), "href": slug_of(a.get("href")), "external": (a.get("href") or "").startswith("http")})
    return crumbs, (txt(eb) if eb else ""), (txt(h1) if h1 else ""), lede, actions, ph


index = {}
for f in sorted(os.listdir(SRC)):
    if f in SKIP_FILES:
        continue
    html = open(os.path.join(SRC, f), encoding="utf-8", errors="ignore").read()
    s = BeautifulSoup(html, "html.parser")
    title = s.title.string.strip() if s.title and s.title.string else ""
    m = s.find("meta", attrs={"name": "description"})
    main = s.find("main")
    if not main:
        continue
    for x in main.find_all(["script", "style", "noscript"]):
        x.decompose()
    related = []
    rel = main.find(id="d-related")
    if rel:
        related = [{"label": txt(a).replace("→", "").strip(), "href": slug_of(a.get("href"))} for a in rel.find_all("a")]
    cta = main.find(id="d-cta")
    crumbs, eyebrow, h1, lede, actions, ph = head_of(main)
    blocks = []
    body_root = main
    if ph is not None:
        ph.extract()
    walk(body_root, blocks)
    for b in blocks:
        b.pop("_open", None)
    # drop a duplicated lede and the generic "PURVIEW ENGINEERING" filler lines
    blocks = [b for b in blocks if not (b["type"] == "text" and b["text"] == lede)]
    # image used on the page (published hero/feature image), keep the generated filename
    img = None
    for i in s.find_all("img"):
        src = i.get("src") or ""
        if "assets/gen/" in src:
            img = os.path.basename(src)
            break
    route = slug_of(f)
    template = "service" if s.find(id="page-detail") else ("article" if f.startswith("blog-") else "editorial")
    data = {
        "source": "https://purviewservices.com/" + f,
        "route": route,
        "template": template,
        "title": title,
        "description": m["content"].strip() if m else "",
        "crumbs": crumbs,
        "eyebrow": eyebrow,
        "h1": h1,
        "lede": lede,
        "actions": actions,
        "image": img,
        "related": related,
        "cta": txt(cta) if cta else None,
        "blocks": blocks,
    }
    if template == "article":
        meta = main.find(string=re.compile(r"\d{1,2} \w+ 20\d\d"))
        data["byline"] = "Purview Editorial Team" if "Purview Editorial Team" in txt(main) or "Purview Editorial Team" in html else ""
        md = re.search(r"(\d{1,2} \w+ 20\d\d)\s*·?\s*(\d+ min read)?", BeautifulSoup(html, "html.parser").get_text(" "))
        data["date"] = md.group(1) if md else None
        data["readTime"] = md.group(2) if md and md.group(2) else None
    name = re.sub(r"\.(html|php)$", "", f)
    json.dump(data, open(os.path.join(OUT, name + ".json"), "w", encoding="utf-8"), ensure_ascii=False, indent=1)
    index[name] = {"route": route, "template": template, "title": title, "h1": h1}

json.dump(index, open(os.path.join(OUT, "_index.json"), "w", encoding="utf-8"), ensure_ascii=False, indent=1)
print(len(index), "pages extracted")
