function openModal(path, size) {
    var modal = document.getElementById("myModal");
    // Cria um novo elemento object
    var objectElement = document.createElement("object");
    objectElement.type = "text/html";
    objectElement.data = path;

    // Verifica se size é "full" e aplica os estilos
    if (size === "full") {
        objectElement.style.width = "90vw";
        objectElement.style.height = "80vh";
    }

    // Limpa o conteúdo anterior e adiciona o novo elemento object
    var modalContent = document.getElementById("modalContent");
    modalContent.innerHTML = ""; // Limpa qualquer conteúdo anterior
    modalContent.appendChild(objectElement); // Adiciona o novo elemento object

    modal.style.display = "block";
    document.body.style.overflow = "hidden";
}


function closeModal() {
    var modal = document.getElementById("myModal");
    modal.style.display = "none";
    document.body.style.overflow = "";
}


// Quando o usuário clicar no botão de fechar, fecha a janela modal
var a = document.getElementsByClassName("close")[0];
a.onclick = function () {
    closeModal();
}