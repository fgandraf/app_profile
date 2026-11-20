---
description: Adiciona um novo projeto ao portfólio (página, card, assets e textos em br/en/es)
---

# Adicionar projeto ao portfólio

Antes de começar, siga as regras de `docs/SPECS.md` — em especial a §0 (somente HTML/CSS/JS puros; todo texto nos três idiomas) e a §4 (os quatro lugares de um projeto e o padrão de mídia). Responda ao usuário em português.

## Passo 1 — Coletar informações

Pergunte tudo **numa única mensagem** e espere a resposta antes de qualquer edição:

1. **Local do código-fonte** (pasta local), se houver.
2. **Local da imagem de thumb.**
3. **Local do vídeo** de demonstração.
4. **Data da última alteração** do projeto.
5. **Links** (opcional): repositório público e/ou endereço publicado/download. Se o repositório for privado, não haverá link de código.
6. **Posição no carrossel**: o padrão é o projeto entrar como **primeiro slide**, que é o que aparece **no centro, em destaque**, ao abrir o site. Pergunte se é isso que o usuário quer — para projetos mais antigos ele pode preferir menos destaque. Nesse caso, pergunte onde: no fim do carrossel ou depois de qual projeto (liste os projetos atuais na ordem do `index.html` para ele escolher).

Se o usuário **não** tiver o código, pergunte em seguida:
- quais **tecnologias** foram usadas;
- uma **descrição** do que o projeto faz (o texto do portfólio vai partir dela).

Não peça nada que dê para descobrir sozinho.

## Passo 2 — Entender o projeto

Com o código: leia README(s), arquivos de build/dependências (`build.gradle.kts`, `libs.versions.toml`, `package.json`, `*.csproj`, `pom.xml` etc.), a estrutura de pastas e o `git log` recente. Se houver remote git, verifique se o repositório é público ou privado (`gh repo view --json visibility,url`, se disponível); na dúvida, pergunte.

Defina:
- **ID**: camelCase curto, sem acentos (ex.: `planob`, `fluxusApi`). Não pode colidir com um ID existente em `languages/br.json`.
- **Nome**: padrão `"<Nome> <Tipo> App"` ou equivalente dos cards existentes (ex.: `Plano B Desktop App`).
- **Título da página**: o nome em maiúsculas (ex.: `PLANO B DESKTOP APP`).
- **Tag**: `DESKTOP`, `MOBILE`, `FRONT-END`, `BACK-END` ou `FULL-STACK`.
- **Stacks**: 3 a 5 tecnologias principais.

## Passo 3 — Assets

Copie e converta a partir dos arquivos de origem (nunca mova nem altere os originais), seguindo o padrão de mídia da §4 do SPECS:

```bash
ffmpeg -v error -i "<video>" -an -vf "scale=960:540:flags=lanczos,fps=30000/1001" \
  -c:v libx264 -preset slow -crf 28 -profile:v high -pix_fmt yuv420p -movflags +faststart assets/videos/<ID>.mp4
ffmpeg -v error -i "<thumb>" -vf "scale=500:331:flags=lanczos" -pix_fmt rgba assets/images/thumbs/<ID>.png
```

- Se a proporção da thumb de origem for diferente de ~1,51 (500×331), avise antes de distorcer e proponha recorte.
- Confira o resultado com `ffprobe` e extraia alguns quadros do vídeo para verificar a legibilidade.
- Informe a duração do vídeo; se for bem maior que os outros (18–45 s), apenas comente — não corte nem edite o conteúdo sem pedido.

## Passo 4 — Código do site

1. **Página** `pages/project/<ID>.html` — copie a estrutura de uma página existente (ex.: `pages/project/planob.html`), sem o link quebrado `../styles/styles.css`. Ajuste `<title>`, `<h2>` e o `<source>` do vídeo. Botões em `.links__container`:
   - repositório público → `code` + `<span id="source-button">#</span>`;
   - site publicado → `deployed_code` + `<span id="deploy-button">#</span>`;
   - repositório privado e sem publicação → sem `.links__container`, com o comentário `<!-- Repositório privado: sem links de código-fonte ou publicação -->`.
2. **Card** em `index.html` — insira o slide dentro de `.swiper-wrapper` **na posição escolhida no Passo 1** (padrão: primeiro slide = centro/destaque; a ordem do carrossel é a ordem do HTML), com `id="<ID>"`, `openModal('./pages/project/<ID>.html')` e a thumb `/assets/images/thumbs/<ID>.png`.

Ainda **não** mexa nos arquivos de idioma.

## Passo 5 — Texto em português (aprovação)

Escreva o texto em português e **mostre ao usuário para aprovação**, sem gravar ainda:

- **Nome**, **Tag**, **Stacks**
- **Descrição curta** (`shortDescription`): uma frase.
- **Descrição longa** (`longDescription`): 2 a 3 parágrafos — o que é e para quem; como funciona/principais recursos; diferenciais técnicos.
- **Última atualização**: `Última atualização: <Mês>/<Ano>` (mês por extenso, inicial maiúscula).

Regras do texto:
- Tom e tamanho dos projetos existentes em `languages/br.json`.
- Não cite nomes de clientes, empresas contratantes, pessoas, cidades específicas ou dados internos — o site é público.
- Projeto privado: termine a descrição longa com uma frase informando que, por ser um projeto privado, o código-fonte não está disponível publicamente.

Ajuste e mostre de novo quantas vezes o usuário pedir. **Só siga após aprovação explícita.**

## Passo 6 — Traduções e inserção

Com o texto aprovado:
1. Gere as versões em **inglês** e **espanhol** (fiéis ao aprovado; `Last update: <Month>/<Year>`, `Última actualización: <Mes>/<Año>`).
2. Insira a entrada em `portfolio.projects` nos três arquivos **na mesma posição relativa do slide** (primeiro item, último item ou logo após o projeto escolhido — a ordem do JSON não afeta a exibição, mas manter as duas iguais facilita a leitura) (`languages/br.json`, `en.json`, `es.json`), com a mesma indentação dos existentes (edição textual, sem reformatar o arquivo):

```json
            {
                "<ID>": {
                    "img": "./assets/images/thumbs/<ID>.png",
                    "stacks": ["..."],
                    "name": "...",
                    "shortDescription": "...",
                    "longDescription": ["...", "..."],
                    "lastUpdate": "...",
                    "tag": "..."
                }
            },
```

3. Valide os três JSONs (ex.: `python3 -c "import json; json.load(open('languages/br.json'))"`).

## Passo 7 — Verificação e resumo

- Suba um servidor local (`python3 -m http.server <porta>`) e confirme status 200 para `/`, `/pages/project/<ID>.html`, o vídeo e a thumb; encerre o servidor.
- Confirme que o ID é idêntico nos quatro lugares (página, card, JSONs, assets).
- Mostre as traduções inseridas e um resumo do que foi feito. Lembre que o navegador pode exigir Ctrl+Shift+R (e que o `sessionStorage` guarda traduções antigas até fechar a aba).
- Não faça commit sem o usuário pedir.
