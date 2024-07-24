import { fetchTranslation } from './fetchTranslations.js';

document.addEventListener('DOMContentLoaded', async () => {
    const savedLanguage = localStorage.getItem('selectedLanguage') || 'br';
    const currentTranslation = await fetchTranslation(savedLanguage);

    document.getElementById("whoiam-title").innerText = currentTranslation.about.whoIAm.title;
    
    let firstPart = document.getElementById("whoim-content__first-part");
    firstPart.innerText = "";
    firstPart.innerHTML += "<p>" +  currentTranslation.about.whoIAm.body[0] + "</p>";
    firstPart.innerHTML += "<p>" +  currentTranslation.about.whoIAm.body[1] + "</p>";
    firstPart.innerHTML += "<p>" +  currentTranslation.about.whoIAm.body[2] + "</p>";
    firstPart.innerHTML += "<p>" +  currentTranslation.about.whoIAm.body[3] + "</p>";
    
    let secondPart = document.getElementById("whoim-content__second-part");
    secondPart.innerText = "";
    secondPart.innerHTML += "<p>" +  currentTranslation.about.whoIAm.body[4] + "</p>";
    secondPart.innerHTML += "<p>" +  currentTranslation.about.whoIAm.body[5] + "</p>";
    secondPart.innerHTML += "<p>" +  currentTranslation.about.whoIAm.body[6] + "</p>";
    secondPart.innerHTML += "<p>" +  currentTranslation.about.whoIAm.body[7] + "</p>";
    secondPart.innerHTML += "<p>" +  currentTranslation.about.whoIAm.body[8] + "</p>";
    secondPart.innerHTML += "<p>" +  currentTranslation.about.whoIAm.body[9] + "</p>";
    secondPart.innerHTML += "<p>" +  currentTranslation.about.whoIAm.body[10] + "</p>";
    secondPart.innerHTML += "<p>" +  currentTranslation.about.whoIAm.body[11] + "</p>";
    secondPart.innerHTML += "<p>" +  currentTranslation.about.whoIAm.body[12] + "</p>";
});
