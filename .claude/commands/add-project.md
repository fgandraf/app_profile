# Add New Portfolio Project

Add a new project to the portfolio website. The project working directory is `/home/felipe/dev/app_profile`.

## Step 1 — Collect required information

Ask the user for the following. Gather everything before making any changes:

1. **Project ID** (`id`): camelCase identifier, used as filename and DOM id (e.g. `vagalivre`, `fluxusApi`)
2. **Display title**: shown in `<title>` and `<h2>` (e.g. `AEX30 WINDOWS APP`)
3. **Tag**: category label shown on the card (e.g. `MOBILE`, `FRONT-END`, `BACK-END`, `FULL-STACK`, `DESKTOP`)
4. **Tech stack**: comma-separated list (e.g. `Kotlin, Jetpack Compose, Google Maps SDK`)
5. **Short description**: one sentence summary for the card
6. **Long description**: full description for the detail page — can be multiple paragraphs (ask for all paragraphs)
7. **Last update**: e.g. `Last update: April/2024`
8. **Link type**: `source` (GitHub) or `deploy` (live URL)
9. **Link URL**: the GitHub repo or live URL

All texts will be provided in **Portuguese (br)**. You must automatically translate them to **English (en)** and **Spanish (es)** before writing the language files. Do not ask the user for translations — generate them yourself.

## Step 2 — Create the project page

Create `pages/project/<id>.html` using this template:

**For `source` link type:**
```html
<!DOCTYPE html>
<html lang="pt-br">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>DISPLAY_TITLE</title>

    <link rel="stylesheet" href="../styles/styles.css">
    <link rel="stylesheet" href="../../styles/case.css">

     <!-- GOOGLE FONTS -->
     <link rel="preconnect" href="https://fonts.googleapis.com">
     <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
     <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" />
     <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;600&display=swap" >

</head>

<body>
    <main>
        <div class="esquerda">

            <div class="stacks__container">
                <ul class="stacks">##</ul>
            </div>

            <div class="video__container">
                <video class="localVideo" width="426" height="240" autoplay loop muted playsinline
                    controlslist="nodownload nofullscreen noremoteplayback">
                    <source src="/assets/videos/ID.mp4" type="video/mp4">
                    Your browser does not support the video tag.
                </video>
            </div>

            <div class="links__container">
                <a href="LINK_URL" target="_blank" class="button">
                    <i class="material-symbols-outlined icone__repo">code</i>
                    <span id="source-button">#</span>
                </a>
            </div>

        </div>

        <div class="direita">
            <h2>DISPLAY_TITLE</h2>
            <div id="long-description">##</div>
            <p class="data">##</p>
        </div>
    </main>

    <script type="module" src="../../scripts/modules/load-project-page.js"></script>
</body>

</html>
```

**For `deploy` link type**, use `deployed_code` icon and `id="deploy-button"` instead:
```html
                <a href="LINK_URL" target="_blank" class="button">
                    <i class="material-symbols-outlined icone__repo">deployed_code</i>
                    <span id="deploy-button">#</span>
                </a>
```

## Step 3 — Add swiper slide to index.html

Read `index.html` first (needed to edit it). Insert the new slide **before** the closing `</div> <!-- swiper-wrapper -->` tag. Use this block:

```html
                        <div class="swiper-slide">
                            <div id="ID" class="card-container">
                                <div class="card">
                                    <div class="card__tag">##</div>
                                    <div class="card__content" onclick="openModal('./pages/project/ID.html')">
                                        <img src="/assets/images/thumbs/ID.png" class="card__cover">
                                        <ul class="card__stacks">##</ul>
                                        <h4 class="projeto__nome">##</h4>
                                        <p class="projeto__descricao">##</p>
                                        <span class="last_update">##</span>
                                    </div>
                                </div>
                            </div>
                        </div>
```

The last existing slide ends just before `</div>` that closes `swiper-wrapper`. Insert after the last `</div>` of the last slide.

## Step 4 — Add entries to all 3 language files

For each of `languages/en.json`, `languages/br.json`, `languages/es.json`:

1. Read the file
2. Add a new entry to the **beginning** of the `portfolio.projects` array (so the newest project appears first in the carousel)

Entry format:
```json
            {
                "ID": {
                    "img": "./images/thumbs/ID.png",
                    "stacks": [
                        "Stack1",
                        "Stack2"
                    ],
                    "name": "Project Name",
                    "shortDescription": "One-sentence summary.",
                    "longDescription": [
                        "Paragraph one.",
                        "Paragraph two."
                    ],
                    "lastUpdate": "Last update: Month/Year",
                    "tag": "TAG"
                }
            },
```

Insert this as the **first element** of the `"projects": [` array in each language file.

## Step 5 — Remind about manual assets

After all edits, tell the user:

> **Assets still needed (manual steps):**
> - `assets/videos/ID.mp4` — demo video for the detail page
> - `assets/images/thumbs/ID.png` — thumbnail image for the portfolio card (check existing thumbs for reference dimensions)
