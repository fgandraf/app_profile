# Especificação do site — lógica e convenções

Documento de referência para entender e modificar o portfólio. Descreve **como as peças se conectam** e as **regras que precisam ser respeitadas** para não quebrar nada. A estrutura de pastas está resumida no `CLAUDE.md`; aqui fica o porquê e o como.

---

## 0. Diretrizes do projeto (obrigatórias)

> **Escopo:** este documento e todas as regras aqui definidas valem **apenas para o site principal**. O GranaWiz (`granawiz/`) é um site à parte e **não** está sujeito a elas (ver §7).

### Sem frameworks, sem bibliotecas externas
O projeto foi desenvolvido **sem uso de IA e sem frameworks**, por decisão deliberada, e deve continuar assim.

- Toda revisão ou adição deve ser feita **exclusivamente com HTML, CSS e JavaScript puros** (vanilla).
- **Não** adicionar frameworks (React, Vue, Tailwind, Bootstrap etc.), bibliotecas, pré-processadores, bundlers ou etapas de build.
- Se uma biblioteca externa parecer a melhor solução, **apenas recomendar e explicar o motivo** — ela só pode ser adicionada **após aprovação explícita** do autor. Sem aprovação, implementar em vanilla.
- Dependências que já existem no projeto (SwiperJS, jQuery, reset-css, Google Fonts/Material Symbols — ver §8) são legado aprovado. Não acrescentar novas dependências nem ampliar o uso das atuais sem aprovação; substituí-las por código vanilla é bem-vindo, mas também deve ser combinado antes.

### Todo conteúdo nos três idiomas
Todo conteúdo visível do site deve existir em **português (`br`), inglês (`en`) e espanhol (`es`)**.

- Nenhum texto novo pode ficar fixo no HTML em um só idioma: ele entra pelo mecanismo de tradução (§1) com a chave presente nos **três** JSONs.
- Uma alteração de texto em um idioma deve ser replicada nos outros dois na mesma mudança.
- Vale também para atributos visíveis ou lidos por leitores de tela (`title`, `alt`, `aria-label`, `placeholder`) e para rótulos de botões.
- Exceções aceitas: nomes próprios e de tecnologias (ex.: "Kotlin", "Ethor"), dados de contato e URLs.
- Trechos que hoje violam esta regra estão listados em §10 e devem ser corrigidos quando aquela parte for modificada.

---

## 1. Princípio central: HTML com marcadores + JSON de idioma

Todo texto visível que muda com o idioma **não fica no HTML**. O HTML traz marcadores `##` (ou `#`) e o JavaScript os substitui pelo texto do arquivo `languages/<lang>.json`.

```
HTML (estrutura + "##")  ──►  load-*-page.js (seletor → chave)  ◄──  languages/<lang>.json (textos)
```

A ligação entre o elemento e o texto é feita **no JavaScript**, por `id` ou seletor CSS escrito à mão. Consequência: para um texto novo é preciso mexer em **três lugares** — o HTML, o `load-*-page.js` e os três JSONs.

Textos que **não** passam por tradução (ficam fixos no HTML): menu lateral de contatos, nomes das tecnologias, título e vídeo/link de cada página de projeto, lista de cursos em `#certificate_others`.

---

## 2. Idioma

| Item | Valor |
|---|---|
| Idiomas | `br` (português), `en` (inglês), `es` (espanhol) |
| Onde fica salvo | `localStorage['selectedLanguage']` |
| Padrão | `en` na home e nos projetos; `br` em `pages/about.html` (inconsistência) |
| Cache das traduções | `sessionStorage['translation_<lang>']` (JSON serializado) |

### `scripts/modules/fetchTranslations.js`
1. Se houver cache no `sessionStorage`, retorna dele.
2. Senão faz `fetch('../languages/<lang>.json')`, salva no cache e retorna.

**Atenção:**
- O caminho do `fetch` é resolvido em relação à **URL da página**, não à do módulo. Funciona na home (`/` → `/languages`) e em `/pages/about.html` (→ `/languages`), mas em `/pages/project/x.html` aponta para `/pages/languages/` (404). As páginas de projeto só funcionam porque, abertas pelo modal, encontram a tradução já em cache. Abertas direto pela URL em sessão nova, falham.
- O cache só expira ao fechar a aba: após editar um JSON, limpe o `sessionStorage` (ou abra aba anônima) para ver a mudança.

### Seletor de bandeiras (home)
- Cada bandeira é `div#lang-<xx>.language__item` contendo `img#flag-<xx>`.
- O código usa `language.id.slice(-2)` → os **2 últimos caracteres do id** são o código do idioma. Um idioma novo precisa seguir esse padrão de id.
- A bandeira ativa é marcada com `border-bottom: solid 2px white` via JS. As três bandeiras estão escritas à mão em `configLanguageSelector()` — idioma novo exige incluir lá também.

---

## 3. Página inicial (`index.html`)

### Ordem de carregamento dos scripts
1. Vercel Insights (`/_vercel/insights/script.js` — só funciona no deploy da Vercel).
2. jQuery 3.6.0 (CDN) — usado apenas por `scroll.js`.
3. `scripts/main.js` (módulo) — importa `modal.js` e `scroll.js`.
4. SwiperJS 11.1.7 (CDN) e depois `scripts/components/swiper.js` (script comum, não módulo).

### `scripts/main.js` (orquestrador)
No `DOMContentLoaded`:
1. `setFlag()` — lê/grava o idioma e destaca a bandeira.
2. `configLanguageSelector()` — liga os cliques nas bandeiras.
3. `loadTranslation(flag)` — busca o JSON e chama `loadIndexPage(lang, flag)`.
4. `setModal()` — expõe `window.openModal` / `window.closeModal`. Necessário porque os `onclick="openModal(...)"` do HTML não enxergam funções de módulos ES.

### `scripts/modules/load-index-page.js` — mapa elemento → chave

| Seção | Elemento | Chave no JSON |
|---|---|---|
| Sobre | `#about-title`, `#about-subtitle` | `about.title`, `about.subtitle` |
| | `#about-topics` (vira `<li>`s) | `about.topics[]` |
| | `#about-more` | `about.moreButton` |
| Tecnologias | `#technologies-title`, `#technologies-subtitle` | `technologies.title`, `.subtitle` |
| Certificados | `#certificates-title`, `#certificates-subtitle` | `certificates.title`, `.subtitle` |
| | `.academic .content .title/.subtitle/.institution/.year` | `certificates.academic.*` |
| | `#certificate_fiap .title` | `certificates.certificateFiap.title` |
| | `#certificate_fiap ... ul` | `certificateFiap.first/second/third/fourth` → `{title, date}` (exatamente 4, fixos no código) |
| | `#certificate_others .title`, `.certificate-more` | `certificates.others.title`, `.more` |
| Portfólio | `#portfolio-title`, `#portfolio-subtitle` | `portfolio.title`, `.subtitle` |
| | cards (ver §4) | `portfolio.projects[]` |
| Rodapé | `#desktop-footer__resume-title` | `footer.resume.title` |
| | `#desktop-footer__resume-link`, `#mobile-footer__resume-link` (`href` + `.description`) | `footer.resume.link`, `.description` |
| | `#desktop-footer__links-title/-more/-courses` | `footer.links.title/moreAboutMe/courses` |
| | `#desktop-footer__contacts-*` | `footer.contacts.title/email/phone/github/linkedin` |

O link do currículo é por idioma (cada JSON aponta para um arquivo diferente no Google Drive).

### Componentes
- **`swiper.js`** — carrossel `.mySwiper` com efeito coverflow, `loop: true`, paginação e setas.
- **`scroll.js`** (jQuery) — desktop (> 500px): ao rolar além de uma altura de tela, mostra o rodapé (`.display-flex`); ao passar da altura do `<main>`, esconde o `<nav>` (`.display-none`). Mobile: só mostra/oculta o rodapé mobile.
- **`modal.js`** — ver §5.

---

## 4. Portfólio (projetos)

Cada projeto existe em **quatro lugares**, todos ligados pelo mesmo **ID** (camelCase):

| # | Onde | O que contém |
|---|---|---|
| 1 | `index.html` — `div.swiper-slide > div#<ID>.card-container` | card: tag, capa, stacks, nome, descrição curta, data; `onclick="openModal('./pages/project/<ID>.html')"` |
| 2 | `pages/project/<ID>.html` | título (`<title>` e `<h2>`), vídeo, botão de link — **fixos no HTML** |
| 3 | `languages/{br,en,es}.json` → `portfolio.projects[]` | `{ "<ID>": { img, stacks[], name, shortDescription, longDescription[], lastUpdate, tag } }` |
| 4 | `assets/videos/<ID>.mp4` e `assets/images/thumbs/*.png` | mídia (o nome da thumb nem sempre é igual ao ID, ex.: `promoreApi` → `promore.png`) |

### Regras
- O **nome do arquivo** da página de projeto precisa ser exatamente o ID: `load-project-page.js` extrai o ID de `location.pathname` e busca `projects.find(p => p[ID])`.
- O `id` da `div.card-container` precisa ser exatamente o ID: `load-index-page.js` faz `querySelector('#<ID> .card ...')`.
- `load-index-page.js` percorre **o JSON** e procura o card correspondente. Se existir no JSON mas não no HTML → erro de `null` e o resto da página (rodapé) não é preenchido. Se existir no HTML mas não no JSON → o card fica com `##`.
- **A ordem dos cards no carrossel é a ordem dos slides no `index.html`**, não a ordem do JSON. Para um projeto novo aparecer primeiro, o slide deve ser o primeiro dentro de `.swiper-wrapper`.
- O campo `img` do JSON não é usado pelo código (a capa vem do `<img>` no HTML).

### Página de projeto (`load-project-page.js`)
Preenche: `.stacks` (de `stacks[]`), `#long-description` (um `<p>` por item de `longDescription[]`), `.direita > .data` (de `lastUpdate`) e os rótulos `#deploy-button` / `#source-button` (de `portfolio.deployButton` / `portfolio.sourceButton`), se existirem. Também bloqueia o menu de contexto dos vídeos `.localVideo`.

Tipos de botão usados: `code` + `#source-button` (GitHub), `deployed_code` + `#deploy-button` (site publicado), ou `download` com texto fixo "Download" (app na loja, ex.: `ethor`).

### Comando `/add-project`
`.claude/commands/add-project.md` automatiza a inclusão (página, slide, entradas nos 3 JSONs com tradução automática a partir do português). Ele insere o slide **no fim** do carrossel e a entrada **no início** do JSON — ou seja, o projeto novo aparece por último (ver regra de ordem acima).

---

## 5. Modal e páginas internas

`openModal(path, size)`:
1. Cria um `<object type="text/html" data="<path>">` dentro de `#modalContent`.
2. Com `size === 'full'`, o objeto ocupa `90vw × 80vh`.
3. Mostra `#myModal` e trava a rolagem do `body`.

`closeModal()` esconde o modal e libera a rolagem; o `X` (`.close`) é ligado no carregamento de `modal.js`.

Como a página interna é um **documento separado** na mesma origem, ela lê o mesmo `localStorage`/`sessionStorage` — é assim que herda o idioma. Ela também carrega os próprios CSS e scripts (o CSS da home não vale lá dentro).

### `pages/about.html`
- `load-about-page.js`: título de `about.whoIAm.title`; parágrafos `body[0..3]` em `#whoim-content__first-part` e `body[4..12]` em `#whoim-content__second-part` (índices fixos no código — mudar a quantidade de parágrafos exige alterar o JS); botão de `about.whoIAm.continueButton`.
- `mais.js`: `moreInfo()` mostra a segunda parte e esconde o botão "continuar".

---

## 6. Estilos

- `styles/home.css` é o ponto de entrada da home: importa `variables.css`, os arquivos de `_home/` (um por seção: header, menu, modal, sec-about, sec-technologies, sec-certificates, sec-portfolio, footer) e as fontes Poppins/Inter.
- `styles/case.css` — páginas de projeto. `styles/about.css` — página "sobre".
- `styles/variables.css` — paleta. O roxo de destaque é definido por `--color-base-accent-H/S/L` (255, 65%, 70%); fundos, bordas e textos são variações de cinza (`--color-base-black-HS`). Mudar o matiz `H` muda a cor de destaque do site todo.
- Classes utilitárias trocadas por JS: `.display-flex`, `.display-none`.
- Breakpoint usado no JS: `max-width: 500px` = mobile.

---

## 7. Sub-site GranaWiz (`granawiz/`) — fora do escopo

> O GranaWiz é um **site à parte**. As diretrizes da §0 (vanilla, três idiomas) e as demais regras deste documento **não se aplicam** a ele. Esta seção existe só para registrar que a pasta não pertence ao site principal e como ela funciona.

Landing page independente do app GranaWiz, com `<base href="/granawiz/">`, CSS próprio (`styles.css`) e sistema de tradução próprio (`scripts/i18n.js`):

- Idiomas: `br` e `en` (padrão `en`), salvo em `localStorage['granawiz_lang']`, cache em `sessionStorage['gw_t_<lang>']`.
- Tradução **declarativa**: `data-i18n="a.b.c"` (texto), `data-i18n-html` (HTML), `data-i18n-attr="atributo:a.b.c"` (atributo). Não é preciso escrever JS para um texto novo — só o atributo no HTML e a chave nos JSONs de `granawiz/languages/`.
- Detecta o sistema operacional e destaca o card de download correspondente (`.download-card[data-os]`).

Não compartilha código com o site principal.

---

## 8. Dependências externas e deploy

- CDN: SwiperJS 11.1.7, reset-css 5.0.1, jQuery 3.6.0, Google Fonts (Inter, Poppins, Montserrat, Material Symbols).
- Hospedado na Vercel (script de analytics `/_vercel/insights`). Caminhos absolutos (`/assets/...`) assumem que o site é servido a partir da raiz.
- Localmente: `npx serve .` ou `python3 -m http.server 8080` na raiz (não funciona abrindo o arquivo direto com `file://`, por causa do `fetch` e dos módulos ES).

---

## 9. Checklists de modificação

**Alterar um texto existente** → editar a chave nos 3 JSONs. Limpar o `sessionStorage` para testar.

**Adicionar um texto novo** → elemento com `id` e `##` no HTML → linha no `load-*-page.js` correspondente → chave nos 3 JSONs.

**Adicionar um projeto** → `/add-project`, ou manualmente os 4 lugares da §4. Conferir se o ID é idêntico em todos e posicionar o slide conforme a ordem desejada.

**Adicionar uma tecnologia** → bloco `.technologies__card` no `index.html` + SVG em `assets/images/techs/`.

**Adicionar um idioma** → novo `languages/<xx>.json` com todas as chaves, bandeira `#lang-<xx>`/`#flag-<xx>` no `index.html`, e incluir o reset da borda em `configLanguageSelector()`.

---

## 10. Pendências conhecidas

| Problema | Onde |
|---|---|
| `fetch` com caminho relativo quebra nas páginas de projeto abertas direto | `fetchTranslations.js` |
| Link "Cursos" abre `./pages/cursos.html`, que não existe | `index.html` (rodapé) |
| Lista de cursos adicionais fixa em português (viola §0) | `#certificate_others` no `index.html` |
| Títulos das páginas de projeto (`<title>`/`<h2>`) e botão "Download" fixos no HTML (viola §0) | `pages/project/*.html` |
| `alt` das bandeiras e imagens só em inglês ou vazios (viola §0) | `index.html` || Idioma padrão diferente entre páginas (`en` × `br`) | `load-about-page.js` |
| `/add-project` põe o projeto novo no fim do carrossel | `.claude/commands/add-project.md` |
| `<title>` errado ("Alucar") | `pages/project/ethor.html` |
| CSS inexistente `../styles/styles.css` | todas as `pages/project/*.html` |
| Aspa a mais em `id="about-container""` | `index.html` |
| `event.preventDefault` sem `()` (sem efeito hoje) | `main.js` |
| Parágrafos do "sobre" com índices fixos | `load-about-page.js` |
