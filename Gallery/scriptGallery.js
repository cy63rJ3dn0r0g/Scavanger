const gridWrapper = document.querySelector('.grid-wrapper');
const photos = document.querySelectorAll('.photo');
const exitBtn = document.querySelector('.exitBtn');
const photoScreen = document.querySelector('.photoScreen');
const photoView = document.querySelector('.photoView');
const photoPreview = document.querySelector('.photoPreview');
const nextBtn = document.querySelector('.nextBtn');
const prevBtn = document.querySelector('.prevBtn');
const fullScreenBtn = document.querySelector('.fullScreen');

let currentIndex = 0;
let currentSubphotoIndex = 0;

function exitHandler() {
  photoScreen.classList.remove('visible');
  document.body.classList.remove('noscroll');
  gridWrapper.classList.add('visible');
}

function openPhotoScreen(event) {
  const photo = event.currentTarget;
  const subphotos = Array.from(photo.querySelectorAll('.slides img[data-photoSlide="carusel"]'));

  function showSubphoto(index) {
    subphotos.forEach((subphoto, i) => {
      if (i === index) {
        subphoto.classList.add('visible');
      } else {
        subphoto.classList.remove('visible');
      }
    });
  }

  function updatePhotoPreview() {
    photoPreview.innerHTML = '';
  
    const startIndex = currentSubphotoIndex;
    const endIndex = (currentSubphotoIndex + 5) % subphotos.length;
  
    // Loop through the subphotos to add preview images
    for (let i = 0; i < 5; i++) {
      const subphotoIndex = (startIndex + i) % subphotos.length;
      if (subphotoIndex !== currentSubphotoIndex) {
        const subphoto = subphotos[subphotoIndex];
        const previewImage = subphoto.cloneNode(true);
        previewImage.classList.add('photoPreviewImage');
        previewImage.addEventListener('click', () => {
          showSubphoto(subphotoIndex);
          currentSubphotoIndex = subphotoIndex;
          updatePhotoView(subphotoIndex);
          updatePhotoPreview();
        });
        photoPreview.appendChild(previewImage);
      }
    }
  }
  
  function updatePhotoView(index) {
    photoView.innerHTML = '';
    photoView.appendChild(subphotos[index].cloneNode(true));
  }

  function nextSubphoto() {
    currentSubphotoIndex = (currentSubphotoIndex + 1) % subphotos.length;
    showSubphoto(currentSubphotoIndex);
    updatePhotoView(currentSubphotoIndex);
    updatePhotoPreview();
  }

  function prevSubphoto() {
    currentSubphotoIndex = (currentSubphotoIndex - 1 + subphotos.length) % subphotos.length;
    showSubphoto(currentSubphotoIndex);
    updatePhotoView(currentSubphotoIndex);
    updatePhotoPreview();
  }

  function showPhotoView() {
    gridWrapper.classList.remove('visible');
    photoScreen.classList.add('visible');
    showSubphoto(0);
    currentSubphotoIndex = 0;
    updatePhotoView(0);
    updatePhotoPreview();
  }

  function toggleFullScreen() {
    if (document.fullscreenElement) {
      document.exitFullscreen();
    } else {
      photoScreen.requestFullscreen();
    }
  }

  showPhotoView();
  nextBtn.addEventListener('click', nextSubphoto);
  window.addEventListener('keydown', function(e) {
    if (e.keyCode === 39) {
      currentSubphotoIndex = (currentSubphotoIndex + 1) % subphotos.length;
      showSubphoto(currentSubphotoIndex);
      updatePhotoView(currentSubphotoIndex);
      updatePhotoPreview();
    }
  });

  prevBtn.addEventListener('click', prevSubphoto);
  window.addEventListener('keydown', function(e) {
    if(e.keyCode === 37) {
      currentSubphotoIndex = (currentSubphotoIndex - 1 + subphotos.length) % subphotos.length;
      showSubphoto(currentSubphotoIndex);
      updatePhotoView(currentSubphotoIndex);
      updatePhotoPreview();
    }
  });

  fullScreenBtn.addEventListener('click', toggleFullScreen);
}

exitBtn.addEventListener('click', exitHandler);
window.addEventListener('keydown', function(e) {
  if(e.keyCode === 27) {
    photoScreen.classList.remove('visible');
    document.body.classList.remove('noscroll');
    gridWrapper.classList.add('visible');  }
});

photos.forEach((photo) => {
  photo.addEventListener('click', openPhotoScreen);
});

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
const homeBarBtn = document.querySelector(".homeBar");

homeBarBtn.addEventListener("click", () => {
  console.log("Button clicked");
  window.location.href = "/index.html";
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
