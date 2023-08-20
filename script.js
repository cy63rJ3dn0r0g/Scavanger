function debounce(func, wait = 20, immediate = true) {
  let timeout;
  return function () {
    const context = this;
    const args = arguments;
    const later = () => {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    const callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
}

const main = document.querySelector(".main");
const offers = document.querySelectorAll(".offer");
const gallery = document.querySelectorAll(".gallery");
const order = document.querySelectorAll(".order");
const biography = document.querySelectorAll(".biography");

const handleScroll = () => {
  const scrolled = window.scrollY;
  const scrollable =
    document.documentElement.scrollHeight - window.innerHeight - scrolled;

  const handleSlide = (elements, trigger) => {
    elements.forEach((element) => {
      const top = element.getBoundingClientRect().top;
      if (trigger > top) {
        element.classList.add("active");
      } else {
        element.classList.remove("active");
      }
    });
  };

  handleSlide(offers, 666);
  handleSlide(gallery, 420);
  handleSlide(order, 320);
  handleSlide(biography, 281);
};

const hintHdl = () => {
  const guide = document.querySelector(".guide");
  const someTime = 10000;
  let timeoutId;

  const checkScroll = () => {
    const scrolling = window.scrollY;
    if (scrolling === 0 || scrolling < 150) {
      clearTimeout(timeoutId);
      guide.classList.add("visible");
      timeoutId = setTimeout(() => {
        guide.classList.remove("visible");
      }, 4200);
    } else {
      timeoutId = setTimeout(checkScroll, someTime);
    }
  };

  timeoutId = setTimeout(checkScroll, someTime);
};

window.addEventListener("scroll", debounce(handleScroll));

handleScroll();

hintHdl();

const menuBarNav = document.querySelector(".menuBar");
const menuNav = document.querySelector(".menuNav");
menuNav.addEventListener("mouseenter", () => {
  menuBarNav.classList.add("moved");
});
menuNav.addEventListener("mouseleave", () => {
  menuBarNav.classList.remove("moved");
});

const biographyBarBtn = document.querySelector(".bioBar");
biographyBarBtn.addEventListener("click", () => {
  console.log("Button clicked");
  window.location.href = "/Bio/Biography.html";
});
const galleryBarBtn = document.querySelector(".galleryBar");

galleryBarBtn.addEventListener("click", () => {
  console.log("Button clicked");
  window.location.href = "/Gallery/Gallery.html";
});
const offersBarBtn = document.querySelector(".offersBar");
offersBarBtn.addEventListener("click", () => {
  console.log("Button clicked");
  window.location.href = "/Offers/Offers.html";
});
const orderBarBtn = document.querySelector(".orderBar");

orderBarBtn.addEventListener("click", () => {
  console.log("Button clicked");
  window.location.href = "/Order/Order.html";
});
