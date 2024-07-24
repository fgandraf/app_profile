import { fetchTranslation } from './modules/fetchTranslations.js';
import { loadIndexPage } from './modules/load-index-page.js';
import { openModal, closeModal } from './components/modal.js';
import './components/scroll.js';

let currentTranslation = {};

document.addEventListener('DOMContentLoaded', async () => {
    // Carregar o idioma selecionado ou o padrão (português)
    const savedLanguage = localStorage.getItem('selectedLanguage') || 'br';
    currentTranslation = await fetchTranslation(savedLanguage);

    loadIndexPage(currentTranslation, savedLanguage);

    // Adicionar eventos de clique aos links de idioma
    document.getElementById('lang-br').addEventListener('click', (event) => {
        event.preventDefault();
        changeLanguage('br');
    });
    document.getElementById('lang-en').addEventListener('click', (event) => {
        event.preventDefault();
        changeLanguage('en');
    });
    document.getElementById('lang-es').addEventListener('click', (event) => {
        event.preventDefault();
        changeLanguage('es');
    });

    // Anexar funções globais ao objeto window
    window.openModal = openModal;
    window.closeModal = closeModal;
});

async function changeLanguage(lang) {
    try {
        currentTranslation = await fetchTranslation(lang);
        localStorage.setItem('selectedLanguage', lang);
        
        loadIndexPage(currentTranslation, lang);
    } catch (error) {
        console.error("Error changing language:", error);
    }
}