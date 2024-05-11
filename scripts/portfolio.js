document.addEventListener('DOMContentLoaded', function() {
    const projects = {
        vagalivre: {
            img: "./assets/screenshots/vagalivre.png",
            stacks: ["Kotlin", "Jetpack Compose", "Google Maps SDK"],
            name: "Vagalivre Android App",
            description: "Uma solução ágil e conveniente para localizar espaços de estacionamento de veículos. O aplicativo fornece informações sobre estacionamentos próximos, valores e disponibilidade de vagas.",
            lastUpdate: "março/2024",
            tag: "MOBILE"
        },
        maar: {
            img: "./assets/screenshots/maar.png",
            stacks: ["HTML", "CSS", "Javascript", "Readymag"],
            name: "MAAR Website",
            description: "Somos um novo conceito de empresa de design. Colaboramos com empresas inovadoras para construir e crescer suas marcas, e assim desenharmos juntos a próxima era do design.",
            lastUpdate: "abril/2024",
            tag: "FRONT-END"
        },
        ethor: {
            img: "./assets/screenshots/ethor.png",
            stacks: ["Kotlin", "Jetpack Compose", "Google AdMob"],
            name: "Ethor Android App",
            description: "Aplicativo móvel para Android que serve como um comparador de preços entre etanol e gasolina, ajudando os usuários a decidirem qual combustível é mais econômico para abastecer seus veículos.",
            lastUpdate: "abril/2024",
            tag: "MOBILE"
        },
        promoreApi: {
            img: "./assets/screenshots/promore.png",
            stacks: ["C#", ".NET", "SQL Server", "Entity Framework"],
            name: "Promore Web API",
            description: "API Rest desenvolvida para integrar as operações de manipulação e persistência de dados do software Promore com a base de dados em Microsoft Sql Server.",
            lastUpdate: "fevereiro/2024",
            tag: "BACK-END"
        },
        alucar: {
            img: "./assets/screenshots/alucar.png",
            stacks: ["HTML", "CSS", "Tailwind"],
            name: "AluCar Mobile App",
            description: "Projeto desenvolvido durante o curso de Análise e Desenvolvimento de Sistemas da FIAP para o challenge proporcionado junto à BRQ Digital Solutions e a plataforma EasyCarros.",
            lastUpdate: "setembro/2023",
            tag: "FRONT-END"
        },
        profile: {
            img: "./assets/screenshots/profile.png",
            stacks: ["HTML", "CSS", "Javascript"],
            name: "Profile Web Page",
            description: "Web page criada para expor os trabalhos realizados na área desenvolvimento de software.",
            lastUpdate: "maio/2024",
            tag: "FRONT-END"
        },
        fluxusApi: {
            img: "./assets/screenshots/fluxusapi.png",
            stacks: ["C#", ".NET", "MySQL", "Dapper"],
            name: "Fluxus Web API",
            description: "API Rest desenvolvida para integrar as operações de manipulação e persistência de dados do software Fluxus (gestão de serviços de engenharia para credenciados de bancos públicos) com a base de dados em MySQL.",
            lastUpdate: "janeiro/2024",
            tag: "BACK-END"
        },
        fluxusApp: {
            img: "./assets/screenshots/fluxus.png",
            stacks: ["C#", ".NET", "Windows Forms", "iTextSharp"],
            name: "Fluxus Windows App",
            description: "Software para gestão de Ordens de Serviços emitidas pela Caixa Econômica Federal aos arquitetos e engenheiros credenciadas em edital público.",
            lastUpdate: "dezembro/2023",
            tag: "DESKTOP"
        },
        aex30: {
            img: "./assets/screenshots/aex30.png",
            stacks: ["C#", ".NET", "Windows Forms", "NPOI Library"],
            name: "Aex30 Windows App",
            description: "Software assistente para automatizar o preenchimento dos relatórios de acompanhamento de evolução de obra fornecidos pela Caixa Econômica Federal aos arquitetos e engenheiros credenciados.",
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