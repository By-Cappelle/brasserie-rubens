# Brasserie Rubens — Website

Website for [Brasserie Rubens](https://brasserierubens.be) in Knokke-Heist, developed by [Cappelle](https://bycappelle.be).

## Structure

- `index.html` — Dutch homepage (`./`)
- `fr/` — French version
- `en/` — English version
- `assets/` — Images, PDF menus, gallery data, icons
- `css/style.css` — Design system and layout
- `js/main.js` — Navigation, gallery, animations, lightbox

Pages use clean folder URLs (for example `contact/`, `menu/`, `sfeer/`).

## Local preview

Serve the project root over HTTP (required for the Sfeer gallery JSON fetch):

```bash
python3 -m http.server 8080
```

Open `http://localhost:8080/`

## Hosting

Deploy the repository root as the web root. No build step required.

Ensure:

- Folder-based URLs are supported (or equivalent rewrite rules)
- `assets/` is publicly accessible
- HTTPS is enabled for production

## Languages

| Language | Path |
|----------|------|
| Nederlands | `/` |
| Français | `/fr/` |
| English | `/en/` |

## Credits

Design & development by **Cappelle**
