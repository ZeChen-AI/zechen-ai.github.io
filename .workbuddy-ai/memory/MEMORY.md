# Homepage Project — Long-term Notes

## Owner
Ze Chen (陈泽) — undergraduate in AI at Communication University of China (CUC), research intern at MIPG (Media Information Processing Group), advised by Prof. Qi Mao.
Research: flow-based generative modeling / video editing (FlowAnchor) + image quality assessment (TaylorKAN, KAN for BIQA).

## Site template: jemdoc ⭐
The homepage is built with the **jemdoc** academic template (https://jemdoc.jaboc.net/), copied from `https://ycgu.site/` (Yuchao Gu).
- Stylesheet: `index_files/jemdoc.css` (stock, unmodified, from ycgu.site)
- Social icons: `index_files/{github,google_scholar,twitter}.png`
- If jemdoc.css ever needs re-fetching: `curl -sL https://ycgu.site/index_files/jemdoc.css`

### Non-negotiable style facts (do NOT "improve" these)
- Font is **Georgia** — NOT a Google web font. No `<link>` to Google Fonts.
- Links: `#224b8d`, **no underline** (dotted underline on hover only).
- Headings: `#527bbd` with `border-bottom: 1px solid #aaaaaa`.
- Project/paper names: `#8B0000` bold (`.paper-award` class).
- `ul` bullets: `list-style-type: square` (from jemdoc.css).
- Body: max-width 960px, padding 0 50px, line-height 1.3.
- Publication thumbnails: `<img width="240px" style="box-shadow: 4px 4px 8px #888">`.

## User preferences learned the hard way
- **Rejects "modern SaaS" styling** on academic pages: no card backgrounds, no rounded corners, no soft shadows, no gradient placeholder blocks, no pill/badge tags. Wants plain LaTeX-ish academic look.
- **Font sensitivity is high** — got it wrong 3× (Crimson Pro → EB Garamond → Crimson Pro) before discovering the real one was plain Georgia.
- Prefers **copying a real existing template** over bespoke design ("有没有现成的 我们直接 copy 可以？").

## Workflow that works
1. When asked to match another site's look, **curl the raw HTML + CSS first**; WebFetch's markdown conversion loses all styling and leads to wrong guesses.
2. Preview with `cd /Users/chenze/Desktop/Homepage && python3 -m http.server 8765`, then `present_files` the local file. The server dies between turns — always re-check / restart before presenting.

## Confirmed profile links (user supplied 2026-10-01)
- GitHub: https://github.com/ZeChen-AI
- Google Scholar: https://scholar.google.com/citations?user=Du9fl5sAAAAJ&hl=en  (ID `Du9fl5sAAAAJ`)
- X / Twitter: https://x.com/zechen21
- Email (still unconfirmed guess): `chenze@cuc.edu.cn`
All three icon links are wired into the header. Note: the icon file is jemdoc's classic Twitter bird, but the href points to x.com — user has not asked to swap in the X logo.

## Avatar
- Replaced `myphoto.jpg` with user's new portrait, renamed to **`avatar.jpg`** (ASCII name — user's original was `头像.jpg`, Chinese filenames risk URL-encoding issues on deploy).
- Source image is 4284×4284 / 3.7MB — heavy for a 250px slot. Offered to generate a compressed `avatar_small.jpg` (~800px); not done yet, awaiting user's word.
- Old `myphoto.jpg` (484KB) still on disk, undeleted.

## Loose ends
- Only `papers/example.png` exists locally; currently reused as the thumbnail for all 3 papers. Need real teaser images for TaylorKAN (JVCIR) and the ICASSP paper.
- Legacy multi-page Next.js site still on disk at `/en/` (About/Research/Publications/Services/Awards) — kept as fallback, not linked from the new page.

## Working style the user asked for (2026-10-01)
User wants sections refined **one at a time**, not bulk content migration: "不要直接把文字搬运过来 观感不好" — i.e. don't dump the old site's long paragraphs / full abstracts onto the page; rewrite each section tighter to suit jemdoc's airy look. Sequence agreed: Header (done) → Biography → Publications → News → Awards → Services → Education. User lets me judge appropriate text length per section.