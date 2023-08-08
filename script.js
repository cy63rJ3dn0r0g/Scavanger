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
  const scrollable = document.documentElement.scrollHeight - window.innerHeight - scrolled;

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
  const guide = document.querySelector('.guide');
  const someTime = 10000; // 10 seconds
  let timeoutId; // variable to store the timeout ID

  // Check if the user has stopped scrolling for 10 seconds
  const checkScroll = () => {
    const scrolling = window.scrollY; // capture the current scroll position
    if (scrolling === 0 || scrolling < 150) {
      clearTimeout(timeoutId); // clear the timeout if the user starts scrolling again
      guide.classList.add('visible');
      timeoutId = setTimeout(() => {
        guide.classList.remove('visible');
      }, 4200); // set a new timeout to hide the hint or guide after 4.20 seconds
    } else {
      timeoutId = setTimeout(checkScroll, someTime); // set a new timeout to check again in 10 seconds
    }
  };

  // Start the check for scrolling
  timeoutId = setTimeout(checkScroll, someTime);
};

// Call handleScroll whenever the window is scrolled
window.addEventListener("scroll", debounce(handleScroll));

// Initial call to handleScroll on page load
handleScroll();

// Call hintHdl to start checking for scroll position
hintHdl();
