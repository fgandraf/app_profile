document.addEventListener('DOMContentLoaded', function () {
    const projects = {
        vagalivre: {
            img: "./images/thumbs/vagalivre.png",
            stacks: ["Kotlin", "Jetpack Compose", "Google Maps SDK"],
            name: "Vagalivre Android App",
            description: "Aplicativo Android desenvolvido em Kotlin que fornece informações sobre estacionamentos próximos, valores e disponibilidade de vagas com integração com o Google Maps.",
            lastUpdate: "março/2024",
            tag: "MOBILE"
        },
        maar: {
            img: "./images/thumbs/maar.png",
            stacks: ["HTML", "CSS", "Javascript", "Readymag"],
            name: "MAAR Website",
            description: "Somos um novo conceito de empresa de design. Colaboramos com empresas inovadoras para construir e crescer suas marcas, e assim desenharmos juntos a próxima era do design.",
            lastUpdate: "abril/2024",
            tag: "FRONT-END"
        },
        ethor: {
            img: "./images/thumbs/ethor.png",
            stacks: ["Kotlin", "Jetpack Compose", "Google AdMob"],
            name: "Ethor Android App",
            description: "Aplicativo móvel para Android comparador de preços entre etanol e gasolina, ajudando os usuários a decidirem qual combustível é mais econômico para abastecer seus veículos.",
            lastUpdate: "abril/2024",
            tag: "MOBILE"
        },
        promoreApi: {
            img: "./images/thumbs/promore.png",
            stacks: ["C#", ".NET", "SQL Server", "Entity Framework"],
            name: "Promore Web API",
            description: "API Rest desenvolvida para integrar as operações de manipulação e persistência de dados do software Promore com a base de dados em Microsoft Sql Server.",
            lastUpdate: "julho/2024",
            tag: "BACK-END"
        },
        alucar: {
            img: "./images/thumbs/alucar.png",
            stacks: ["HTML", "CSS", "Tailwind"],
            name: "AluCar Mobile App",
            description: "Projeto desenvolvido durante o curso de Análise e Desenvolvimento de Sistemas da FIAP para o challenge proporcionado junto à BRQ Digital Solutions e a plataforma EasyCarros.",
            lastUpdate: "setembro/2023",
            tag: "FRONT-END"
        },
        profile: {
            img: "./images/thumbs/profile.png",
            stacks: ["HTML", "CSS", "Javascript", "SwiperJS"],
            name: "Profile Web Page",
            description: "Projeto web desenvolvido para expor os trabalhos de desenvolvimento de software utilizando HTML, CSS e JavaScript nativos para criar uma experiência rica e interativa.",
            lastUpdate: "junho/2024",
            tag: "FRONT-END"
        },
        fluxusApi: {
            img: "./images/thumbs/fluxusapi.png",
            stacks: ["C#", ".NET", "MySQL", "Dapper"],
            name: "Fluxus Web API",
            description: "API Rest desenvolvida para integrar as operações de manipulação e persistência de dados do software Fluxus com a base de dados em MySQL.",
            lastUpdate: "janeiro/2024",
            tag: "BACK-END"
        },
        fluxusApp: {
            img: "./images/thumbs/fluxus.png",
            stacks: ["C#", ".NET", "Windows Forms", "iTextSharp"],
            name: "Fluxus Windows App",
            description: "Software para gestão de Ordens de Serviços emitidas pela Caixa Econômica Federal aos arquitetos e engenheiros credenciadas em edital público.",
            lastUpdate: "dezembro/2023",
            tag: "DESKTOP"
        },
        aex30: {
            img: "./images/thumbs/aex30.png",
            stacks: ["C#", ".NET", "Windows Forms", "NPOI Library"],
            name: "Aex30 Windows App",
            description: "Software assistente para automatizar o preenchimento dos relatórios de acompanhamento de evolução de obra fornecidos pela Caixa Econômica Federal.",
            lastUpdate: "abril/2023",
            tag: "DESKTOP"
        }
    };

    function addCard(projectName) {
        const project = projects[projectName];
        const cardContainer = document.getElementById(projectName);
        const stacksHTML = project.stacks.map(stack => `<li class="stack__item">${stack}</li>`).join('');

        cardContainer.innerHTML = `
            <div class="card">
                <div class="card__tag">${project.tag}</div>
                <div class="card__content" onclick="openModal('./pages/project/${projectName}.html')">
                    <img src="${project.img}" class="card__cover">
                    <ul class="card__stacks">${stacksHTML}</ul>
                    <h4 class="projeto__nome">${project.name}</h4>
                    <p class="projeto__descricao">${project.description}</p>
                    <span class="last_update">Última atualização: ${project.lastUpdate}</span>
                </div>
            </div>
        `;
    }
    Object.keys(projects).forEach(addCard);
});