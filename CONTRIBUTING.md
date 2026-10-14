# Contributing to Frontend Copied

Thanks for your interest in contributing! This guide will help you add a new website recreation to the collection.

## 🗂️ Folder Structure

Every website recreation must follow this pattern:

```
<category>/<site-name>/
├── README.md           # Required: attribution, tech stack, setup
├── COMPONENTS.md       # Required: list of reusable components
├── package.json        # Project dependencies
├── src/                # Source code
├── public/             # Static assets
└── ...                 # Other project files
```

## 📝 README Template

Each site folder's `README.md` should include:

```markdown
# <Site Name> — Recreation

**Original**: [site-url](https://example.com)
**Category**: SaaS / E-commerce / Portfolio / etc.
**Tech Stack**: React, Vite, TailwindCSS, etc.

## Screenshots
<!-- Add screenshots of your recreation -->

## Setup
npm install
npm run dev

## Components
See [COMPONENTS.md](COMPONENTS.md)
```

## 🏷️ Categories

Place your recreation in the most fitting category:

| Folder | Use for |
|--------|---------|
| `saas/` | SaaS products, dashboards, admin panels |
| `ecommerce/` | Online stores, product pages, carts |
| `portfolio/` | Personal sites, agency portfolios |
| `fintech/` | Banking, payments, financial dashboards |
| `ai-ml/` | AI/ML product sites, model showcases |
| `devtools/` | Developer tools, docs, API references |
| `social/` | Social media, forums, communities |
| `media/` | News, blogs, streaming, content |
| `misc/` | Anything that doesn't fit above |

## 🔀 Git Workflow

1. Create a branch: `git checkout -b add/<site-name>`
2. Add components incrementally — commit after each major section
3. Use conventional commit messages:
   - `feat(<site-name>): add hero section`
   - `feat(<site-name>): add navigation bar`
   - `feat(<site-name>): add footer`
   - `docs(<site-name>): add README and COMPONENTS.md`
4. Push and open a PR

## ⚠️ Rules

- **No copyrighted assets**: Don't copy logos, images, or fonts you don't have rights to. Use placeholders or open-source alternatives.
- **Original code only**: Write your own code inspired by the design — never copy-paste source code from the original site.
- **Attribution required**: Always credit the original website in your README.
- **Self-contained**: Each project should install and run independently.
