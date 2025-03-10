import { fetchTranslation } from './modules/fetchTranslations.js';
import { loadIndexPage } from './modules/load-index-page.js';
import { openModal, closeModal } from './components/modal.js';
import './components/scroll.js';

let languagePack = {};
let currentFlag = '';

document.addEventListener('DOMContentLoaded', async () => {

    setFlag();
    configLanguageSelector();
    loadTranslation(currentFlag);
    setModal();

});

async function setFlag(){
    currentFlag = localStorage.getItem('selectedLanguage') || 'en';
    localStorage.setItem('selectedLanguage', currentFlag);
    document.getElementById(`flag-${currentFlag}`).style.borderBottom = 'solid 2px white';
}

async function configLanguageSelector(){
    document.querySelectorAll(".language__item").forEach(language => {
        language.addEventListener("click", (event) => {
            event.preventDefault;
            document.getElementById("flag-br").style.borderBottom = 'solid 2px transparent';
            document.getElementById("flag-en").style.borderBottom = 'solid 2px transparent';
            document.getElementById("flag-es").style.borderBottom = 'solid 2px transparent';

            loadTranslation(language.id.slice(-2));
        });
    });
}

async function loadTranslation(flag) {
    languagePack = await fetchTranslation(flag);
    localStorage.setItem('selectedLanguage', flag);
    loadIndexPage(languagePack, flag);
    setFlag();
}

function setModal(){
    window.openModal = openModal;
    window.closeModal = closeModal;
}