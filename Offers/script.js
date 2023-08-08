const leatherItems = document.querySelectorAll(".leather, .paper, .emblem");

leatherItems.forEach((item) => {
  const image = item.querySelector("img");
  const bio = item.querySelector(".leatherBio, .paperBio, .emblemBio");
  image.addEventListener("mouseenter", () => {
    bio.style.display = "block";
  });
  image.addEventListener("mouseleave", () => {
    bio.style.display = "none";
  });
});

const orderBtn = document.querySelector(".orderBtn");
orderBtn.addEventListener("click", () => {
  console.log("he");
  window.location.href = "/Order/Order.html";
});
