export function loadIndexPage(lang, flag) {
    // Flag Selector
    document.getElementById("flag-br").style.borderBottom = 'solid 2px transparent';
    document.getElementById("flag-en").style.borderBottom = 'solid 2px transparent';
    document.getElementById("flag-es").style.borderBottom = 'solid 2px transparent';
    document.getElementById(`flag-${flag}`).style.borderBottom = 'solid 2px white';
    
    // AboutSection
    document.getElementById("about-title").innerText = lang.about.title;
    const topics = document.getElementById("about-topics");
    topics.innerHTML = lang.about.topics.map(topic => `<li>${topic}</li>`).join('');
    document.getElementById("about-more").innerText = lang.about.moreButton;

    // TechnologiesSection
    document.getElementById("technologies-title").innerText = lang.technologies.title;

    // CertificatesSection
    document.getElementById("certificates-title").innerText = lang.certificates.title;
    const certificate1 = document.getElementById("certificate1");
    certificate1.querySelector('.title').innerText = lang.certificates.certificate1.title;
    certificate1.querySelector('.right > .institution').innerText = lang.certificates.certificate1.institution;
    certificate1.querySelector('.right > .date').innerText = lang.certificates.certificate1.date;
    const certificate2 = document.getElementById("certificate2");
    certificate2.querySelector('.title').innerText = lang.certificates.certificate2.title;
    certificate2.querySelector('.right > .institution').innerText = lang.certificates.certificate2.institution;
    certificate2.querySelector('.right > .date').innerText = lang.certificates.certificate2.date;
    document.getElementById('todos_os_cursos').innerText = lang.certificates.courses;
    
    // PortfolioSection
    document.getElementById("portfolio-title").innerText = lang.portfolio.title;
    loadProject(lang, "promoreApi");
    loadProject(lang, "ethor");
    loadProject(lang, "profile");
    loadProject(lang, "maar");
    loadProject(lang, "vagalivre");
    loadProject(lang, "alucar");
    loadProject(lang, "fluxusApi");
    loadProject(lang, "fluxusApp");
    loadProject(lang, "aex30");

    // Footer
    // ---resume
    document.getElementById("desktop-footer__resume-title").innerText = lang.footer.resume.title;
    const linkElements = [
        document.querySelector("#desktop-footer__resume-link"),
        document.querySelector("#mobile-footer__resume-link")
    ];
    linkElements.forEach(linkElement => {
        linkElement.href = lang.footer.resume.link;
        linkElement.querySelector('.description').innerText = lang.footer.resume.description;
    });
    // ---links
    document.getElementById("desktop-footer__links-title").innerText = lang.footer.links.title;
    document.querySelector("#desktop-footer__links-more").innerText = lang.footer.links.moreAboutMe;
    document.querySelector("#desktop-footer__links-courses").innerText = lang.footer.links.courses;
    // ---contacts
    document.getElementById("desktop-footer__contacts-title").innerText = lang.footer.contacts.title;
    document.getElementById("desktop-footer__contacts-email").innerText = lang.footer.contacts.email;
    document.getElementById("desktop-footer__contacts-phone").innerText = lang.footer.contacts.phone;
    document.getElementById("desktop-footer__contacts-github").innerText = lang.footer.contacts.github;
    document.getElementById("desktop-footer__contacts-linkedin").innerText = lang.footer.contacts.linkedin;
}


function loadProject(lang, projectName) {

    // Carregar informações do json
    const project = lang.portfolio.projects.find(element => element[projectName])[projectName];

    // Carregar elementos do DOM
    let tag = document.querySelector(`#${projectName} > .card > .card__tag`);
    let stacks = document.querySelector(`#${projectName} > .card > .card__content > .card__stacks`);
    let name = document.querySelector(`#${projectName} > .card > .card__content > .projeto__nome`);
    let description = document.querySelector(`#${projectName} > .card > .card__content > .projeto__descricao`);
    let lastUpdate = document.querySelector(`#${projectName} > .card > .card__content > .last_update`);

    // Limpar valores
    tag.innerText = "";
    stacks.innerText = "";
    name.innerText = "";
    description.innerText = "";
    lastUpdate.innerText = "";

    // Atualizar valores
    tag.innerText = project.tag;
    project.stacks.forEach(element => { stacks.innerHTML += `<li class="stack__item">${element}</li>`});
    name.innerText = project.name;
    description.innerText = project.shortDescription;
    lastUpdate.innerText = project.lastUpdate;
}