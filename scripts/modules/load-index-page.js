export function loadIndexPage(lang, flag) {
    
    // AboutSection
    document.getElementById("about-title").innerText = lang.about.title;
    document.getElementById("about-subtitle").innerText = lang.about.subtitle;
    document.getElementById("about-topics").innerHTML = lang.about.topics.map(topic => `<li>${topic}</li>`).join('');
    document.getElementById("about-more").innerText = lang.about.moreButton;

    // TechnologiesSection
    document.getElementById("technologies-title").innerText = lang.technologies.title;
    document.getElementById("technologies-subtitle").innerText = lang.technologies.subtitle;

    // CertificatesSection
    document.getElementById("certificates-title").innerText = lang.certificates.title;
    document.getElementById("certificates-subtitle").innerText = lang.certificates.subtitle;


    //academic
    document.querySelector(".academic .content .title").innerHTML = lang.certificates.academic.title;
    document.querySelector(".academic .content .subtitle").innerHTML = lang.certificates.academic.subtitle;
    document.querySelector(".academic .content .institution").innerHTML = lang.certificates.academic.institution;
    document.querySelector(".academic .content .year").innerHTML = lang.certificates.academic.year;


    //certificate Fiap
    document.querySelector("#certificate_fiap .title").innerHTML = lang.certificates.certificateFiap.title;
    document.querySelector("#certificate_fiap .content .certificate-item ul").innerHTML = `
        <li>${lang.certificates.certificateFiap.first.title}</li>
        <span class="date">${lang.certificates.certificateFiap.first.date}</span>
        <li>${lang.certificates.certificateFiap.second.title}</li>
        <span class="date">${lang.certificates.certificateFiap.second.date}</span>
        <li>${lang.certificates.certificateFiap.third.title}</li>
        <span class="date">${lang.certificates.certificateFiap.third.date}</span>
        <li>${lang.certificates.certificateFiap.fourth.title}</li>
        <span class="date">${lang.certificates.certificateFiap.fourth.date}</span>
    `;

    //others
    document.querySelector("#certificate_others .title").innerHTML = lang.certificates.others.title;
    document.querySelector("#certificate_others .content .certificate-more").innerHTML = lang.certificates.others.more;
   
    // PortfolioSection
    document.getElementById("portfolio-title").innerText = lang.portfolio.title;
    document.getElementById("portfolio-subtitle").innerText = lang.portfolio.subtitle;

    lang.portfolio.projects.forEach(el => {
        const projectName = Object.keys(el)[0];
        const project = lang.portfolio.projects.find(element => element[projectName])[projectName];

        // Carregar elementos do DOM
        let tag = document.querySelector(`#${projectName} > .card > .card__tag`)
        let stacks = document.querySelector(`#${projectName} > .card > .card__content > .card__stacks`);
        let name = document.querySelector(`#${projectName} > .card > .card__content > .projeto__nome`);
        let description = document.querySelector(`#${projectName} > .card > .card__content > .projeto__descricao`);
        let lastUpdate = document.querySelector(`#${projectName} > .card > .card__content > .last_update`);

        // // Atualizar valores
        tag.innerText = project.tag;
        stacks.innerText = "";
        project.stacks.forEach(element => { stacks.innerHTML += `<li class="stack__item">${element}</li>`});
        name.innerText = project.name;
        description.innerText = project.shortDescription;
        lastUpdate.innerText = project.lastUpdate;
    });

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