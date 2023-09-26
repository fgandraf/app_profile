// var images = document.getElementsByClassName("carousel-img");
// var modal = document.getElementById("myModal");
// var modalImg = document.getElementById("img01");

// for (var i = 0; i < images.length; i++) {
// images[i].onclick = function() {
//     modal.style.display = "block";
//     modalImg.src = this.src;
// };
// }

// var span = document.getElementsByClassName("close")[0];
// span.onclick = function() {
// modal.style.display = "none";
// };

// window.onclick = function(event) {
// if (event.target == modal) {
//     modal.style.display = "none";
// }
// };
var images = document.getElementsByClassName("carousel-img");
var modal = document.getElementById("myModal");
var modalImg = document.getElementById("img01");
var previousScrollPosition = 0;

for (var i = 0; i < images.length; i++) {
  images[i].onclick = function() {
    previousScrollPosition = {
      x: window.pageXOffset,
      y: window.pageYOffset
    };

    modal.style.display = "block";
    modalImg.src = this.src;
  };
}

var span = document.getElementsByClassName("close")[0];
span.onclick = function() {
  modal.style.display = "none";

  window.scrollTo(previousScrollPosition.x, previousScrollPosition.y);
};

window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
    window.scrollTo(previousScrollPosition.x, previousScrollPosition.y);
  }
};