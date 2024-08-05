import { fetchTranslation } from './fetchTranslations.js';

document.addEventListener('DOMContentLoaded', async () => {
    const savedLanguage = localStorage.getItem('selectedLanguage') || 'en';
    localStorage.setItem('selectedLanguage', savedLanguage);
    const currentTranslation = await fetchTranslation(savedLanguage);

    // Obter o nome da página atual
    const path = window.location.pathname;
    const pageName = path.split("/").pop().split(".")[0];

    // Carregar stacks
    const stacksArray = currentTranslation.portfolio.projects.find(project => project[pageName])[pageName].stacks;
    let stacksElement = document.querySelector("main > .esquerda > .stacks__container > .stacks");
    stacksElement.innerHTML = "";
    stacksArray.forEach(stack => {
        stacksElement.innerHTML += `<li class="stack__item">${stack}</li>`
    });

    // Carregar botões
    let deployButton = document.getElementById("deploy-button");
    if (deployButton)
        deployButton.innerText = currentTranslation.portfolio.deployButton;
    let sourceButton = document.getElementById("source-button");
    if (sourceButton)
        sourceButton.innerText = currentTranslation.portfolio.sourceButton;

    // Carregar descrição
    const descriptionArray = currentTranslation.portfolio.projects.find(project => project[pageName])[pageName].longDescription;
    let descriptionElement = document.getElementById("long-description");
    descriptionElement.innerText = "";
    descriptionArray.forEach(element => {
        descriptionElement.innerHTML += `<p>${element}</p>`
    });

    // Carregar última atualização
    const lastUpdate = currentTranslation.portfolio.projects.find(project => project[pageName])[pageName].lastUpdate;
    let lastUpdateElement = document.querySelector("main > .direita > .data");
    lastUpdateElement.innerText = lastUpdate;

    // Desativar menu de contexto do vídeo
    document.querySelectorAll('.localVideo').forEach(video => {
        video.addEventListener('contextmenu', function (e) {
            e.preventDefault();
        });
    });
});
