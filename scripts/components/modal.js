export function openModal(path, size) {
    var modal = document.getElementById("myModal");
    var objectElement = document.createElement("object");
    objectElement.type = "text/html";
    objectElement.data = path;

    if (size === "full") {
        objectElement.style.width = "90vw";
        objectElement.style.height = "80vh";
    }

    var modalContent = document.getElementById("modalContent");
    modalContent.innerHTML = "";
    modalContent.appendChild(objectElement);

    modal.style.display = "block";
    document.body.style.overflow = "hidden";
}

export function closeModal() {
    var modal = document.getElementById("myModal");
    modal.style.display = "none";
    document.body.style.overflow = "";
}

var a = document.getElementsByClassName("close")[0];
a.onclick = function () {
    closeModal();
}
