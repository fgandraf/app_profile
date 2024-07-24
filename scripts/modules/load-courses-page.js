import { fetchTranslation } from './fetchTranslations.js';

document.addEventListener('DOMContentLoaded', async () => {
    const savedLanguage = localStorage.getItem('selectedLanguage') || 'br';
    const currentTranslation = await fetchTranslation(savedLanguage);

    document.getElementById("courses-title").innerText = currentTranslation.courses.title;

    loadCourse(currentTranslation, "alura-formation-winforms");
    loadCourse(currentTranslation, "alura-formation-agile");
    loadCourse(currentTranslation, "alura-formation-csharpoop");
    loadCourse(currentTranslation, "alura-formation-htmlfromscratch");
    loadCourse(currentTranslation, "alura-formation-css");
    loadCourse(currentTranslation, "balta-carrer-fundamentals");
    loadCourse(currentTranslation, "balta-carrer-dataaccess");
    loadCourse(currentTranslation, "balta-carrer-aspblazor");
    loadCourse(currentTranslation, "balta-carrer-devops");
    loadCourse(currentTranslation, "balta-carrer-advanced");
    loadCourse(currentTranslation, "others");
});

function loadCourse(currentTranslation, courseName) {

    // Carregar informações do json
    const course = currentTranslation.courses.courses.find(element => element[courseName])[courseName];

    // Carregar elementos do DOM
    let title = document.querySelector(`#${courseName} > div > h4`);
    let subtitle = document.querySelector(`#${courseName} > div > h5`);
    let topics = document.querySelector(`#${courseName} > .card__topics`);

    // Limpar valores
    title.innerText = "";
    subtitle.innerText = "";
    topics.innerText = "";

    // Atualizar valores
    title.innerText = course.title;
    subtitle.innerText = course.subtitle;
    course.subjects.forEach(element => { topics.innerHTML += `<li>${element}</li>`; });
}