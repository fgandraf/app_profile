function openModal(path) {
    var modal = document.getElementById("myModal");
    document.getElementById("modalContent").innerHTML = '<object type="text/html" data="' + path + '"></object>';
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