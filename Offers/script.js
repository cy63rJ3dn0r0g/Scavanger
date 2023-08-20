const leatherItems = document.querySelectorAll(".leather, .paper, .emblem, .model");

leatherItems.forEach((item) => {
  const image = item.querySelector("img");
  const bioElement = item.querySelector(".leatherBio, .paperBio, .emblemBio, .modelBio");
  image.addEventListener("mouseenter", () => {
    console.log('hey')
    bioElement.classList.add("show");
  });
  image.addEventListener("mouseleave", () => {
    bioElement.classList.remove("show");
  });
});


const menuBarNav = document.querySelector('.menuBar');
const menuNav = document.querySelector('.menuNav')
menuNav.addEventListener('mouseenter', () => {
  menuBarNav.classList.add('moved');
})
menuNav.addEventListener('mouseleave', () => {
  menuBarNav.classList.remove('moved');
})
const orderBtn = document.querySelector(".orderBtn");
orderBtn.addEventListener("click", () => {
  console.log("Button clicked");
  window.location.href = "/Order/Order.html";
});

const biographyBarBtn = document.querySelector('.bioBar');
biographyBarBtn.addEventListener("click", () => {
  console.log("Button clicked");
  window.location.href = "/Bio/Biography.html";
});
const galleryBarBtn = document.querySelector('.galleryBar');

galleryBarBtn.addEventListener("click", () => {
  console.log("Button clicked");
  window.location.href = "/Gallery/Gallery.html";
});
const homeBarBtn = document.querySelector('.homeBar');

homeBarBtn.addEventListener("click", () => {
  console.log("Button clicked");
  window.location.href = "/Index.html";
});
const orderBarBtn = document.querySelector('.orderBar');

orderBarBtn.addEventListener("click", () => {
  console.log("Button clicked");
  window.location.href = "/Order/Order.html";
});


