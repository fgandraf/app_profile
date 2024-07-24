export function getProjectsByLanguage(language, translations) {
    if (!translations || !translations[language]) {
        console.error(`Translations for language '${language}' are not defined.`);
        return [];
    }
    return translations[language].portfolio.projects || [];
}

export function updateProjects(projects) {
    const projectContainers = document.querySelectorAll('.card');
    projectContainers.forEach(container => container.innerHTML = ''); // Limpa os projetos existentes
    projects.forEach(addCard);
}

export function addCard(project) {
    const projectName = Object.keys(project)[0];
    const projectDetails = project[projectName];
    const cardContainer = document.getElementById(projectName);
    const stacksHTML = projectDetails.stacks.map(stack => `<li class="stack__item">${stack}</li>`).join('');

    cardContainer.innerHTML = `
        <div class="card">
            <div class="card__tag">${projectDetails.tag}</div>
            <div class="card__content" onclick="openModal('./pages/project/${projectName}.html')">
                <img src="${projectDetails.img}" class="card__cover">
                <ul class="card__stacks">${stacksHTML}</ul>
                <h4 class="projeto__nome">${projectDetails.name}</h4>
                <p class="projeto__descricao">${projectDetails.shortDescription}</p>
                <span class="last_update">${projectDetails.lastUpdate}</span>
            </div>
        </div>
    `;
}
