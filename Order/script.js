let order = [];
let currentClass = "leather";
let lastClickedImage = null;
let leatherSelectedImages = [];
let paperSelectedImages = [];
let emblemSelectedImages = [];
let lbe = "Leather"; 

let nextBtn = document.querySelector(".nextBtn");
nextBtn.disabled = true;

document.addEventListener("DOMContentLoaded", () => {
  const lbeElements = document.querySelectorAll(".lbe");
  lbeElements.forEach((element) => {
    element.textContent = lbe;
  });
});

function addBlockedDivsToOtherImages(item, clickedImage) {
  const images = item.querySelectorAll("img");
  images.forEach((image) => {
    if (image !== clickedImage && !image.dataset.clicked) {
      const blockedDiv = image.parentElement.querySelector(".blocked");
      if (!blockedDiv) {
        const customSrc = "/Offers/assets/block.jpg";
        const newBlockedDiv = document.createElement("div");
        newBlockedDiv.classList.add("blocked", "visible");
        newBlockedDiv.style.backgroundImage = `url(${customSrc})`;
        newBlockedDiv.style.display = "none";
        image.parentElement.appendChild(newBlockedDiv);
      }
    }
  });
}

function initLeatherItems() {
  const leatherItems = document.querySelectorAll(".leather, .paper, .emblem");
  const observer = new MutationObserver((mutationsList, observer) => {
    for (const mutation of mutationsList) {
      if (mutation.type === "childList") {
        const removedNodes = Array.from(mutation.removedNodes);
        removedNodes.forEach((removedNode) => {
          if (removedNode.contains(image)) {
            image.removeEventListener("mouseenter", onImageEnter);
            image.removeEventListener("mouseleave", onImageLeave);
            image.removeEventListener("click", onImageClick);
          }
        });
      }
    }
  });

  leatherItems.forEach((item) => {
    const images = item.querySelectorAll("img");
    const bios = item.querySelectorAll(".leatherBio, .paperBio, .emblemBio");
    images.forEach((image, index) => {
      const bio = bios[index];
      const blockedDiv = document.createElement("div");
      blockedDiv.classList.add("blocked");
      const customSrc = "/Offers/assets/block.jpg";
      blockedDiv.style.backgroundImage = `url(${customSrc})`;
      image.parentElement.appendChild(blockedDiv);

      let clickCount = 0;

      const onImageEnter = (event) => {
        const clicked = image.dataset.clicked === "true";

        if (!clicked) {
          const otherImages = Array.from(images).filter(
            (otherImage) =>
              otherImage !== image && otherImage.dataset.clicked !== "true",
          );

          if (otherImages.length > 0) {
            otherImages.forEach((otherImage) => {
              otherImage.classList.add("selected-image");
              otherImage.dataset.clicked = "true";
              const otherBio = otherImage.nextElementSibling;
              const otherBlockedDiv =
                otherImage.parentElement.querySelector(".blocked");
              otherBio.style.display = "none";
              bio.style.display = "flex";
              otherBlockedDiv.style.display = "block";
              // addToOrder(item.querySelector(".itemSummary")); if clicked on image && on next,then addToOrder.
            });
          }
        }
      };

      const onImageLeave = (event) => {
        const clicked = image.dataset.clicked === "true";

        if (!clicked) {
          const otherImages = Array.from(images).filter(
            (otherImage) =>
              otherImage !== image && otherImage.dataset.clicked !== "true",
          );

          if (otherImages.length > 0) {
            otherImages.forEach((otherImage) => {
              otherImage.classList.remove("selected-image");
              otherImage.dataset.clicked = "false";
              const otherBio = otherImage.nextElementSibling;
              const otherBlockedDiv =
                otherImage.parentElement.querySelector(".blocked");
              otherBio.style.display = "none";
              otherBlockedDiv.style.display = "none";
            });
          } else {
            images.forEach((otherImage) => {
              otherImage.dataset.clicked = "false";
              const otherBio = otherImage.nextElementSibling;
              const otherBlockedDiv =
                otherImage.parentElement.querySelector(".blocked");
              otherBio.style.display = "none";
              otherBlockedDiv.style.display = "none";
            });
          }
        }

        const anyImageClicked = Array.from(images).some(
          (otherImage) => otherImage.dataset.clicked === "true",
        );
        nextBtn.disabled = !anyImageClicked; 
      };

      function resetAll() {
        const images = document.querySelectorAll("img");
        images.forEach((image) => {
          image.dataset.clicked = false;
          const blockedDiv = image.parentElement.querySelector(".blocked");
          if (blockedDiv) {
            blockedDiv.style.display = "block";
          }
        });
        const leatherBios = document.querySelectorAll(
          ".leatherBio",
          ".paperBio",
          ".emblemBio",
        );
        leatherBios.forEach((bio) => {
          bio.style.display = "none";
        });
        order = [];
        updateOrderSummary();
      }

      const onImageClick = (event) => {
        const clicked = image.dataset.clicked === "true";

        if (!clicked) {
          image.dataset.clicked = "true";
          bio.style.display = "flex";
          blockedDiv.style.display = "none";
        } else {
          image.dataset.clicked = "false";
          bio.style.display = "none";
          blockedDiv.style.display = "block";
        }

        const otherImages = Array.from(images).filter(
          (otherImage) => otherImage !== image,
        );

        otherImages.forEach((otherImage) => {
          const otherBio = otherImage.nextElementSibling;
          const otherBlockedDiv =
            otherImage.parentElement.querySelector(".blocked");

          if (!clicked) {
            otherImage.classList.remove("selected-image");
            otherImage.dataset.clicked = "false";
            otherBio.style.display = "none";
            otherBlockedDiv.style.display = "block";
          } else {
            otherImage.dataset.clicked = "true";
            otherBio.style.display = "none";
            otherBlockedDiv.style.display = "none";
            blockedDiv.style.display = "block"; 
          }
        });
        lastClickedImage = image;
        nextBtn.disabled = !clicked; 
      };

      image.removeEventListener("mouseenter", onImageEnter);
      image.removeEventListener("mouseleave", onImageLeave);
      image.removeEventListener("click", onImageClick);
    
      image.addEventListener("mouseenter", onImageEnter);
      image.addEventListener("mouseleave", onImageLeave);
      image.addEventListener("click", onImageClick);
    });
  });
}



function handleMouseLeave() {
  const bio = this.nextElementSibling;
  bio.style.display = "none";
}

function getSelectedImages() {
  const selectedImages = [];
  const currentItems = document.querySelectorAll(`.${currentClass}`);
  currentItems.forEach((item) => {
    const images = item.querySelectorAll("img");
    images.forEach((image) => {
      if (image.dataset.clicked === "true") {
        selectedImages.push(image.src);
      }
    });
  });
  return selectedImages;
}

function restoreSelectedImages(selectedImages) {
  const currentItems = document.querySelectorAll(`.${currentClass}`);
  currentItems.forEach((item) => {
    const images = item.querySelectorAll("img");
    images.forEach((image) => {
      const src = image.src;
      if (selectedImages.includes(src)) {
        image.dataset.clicked = "true";
        image.nextElementSibling.style.display = "flex";
        image.parentElement.querySelector(".blocked").style.display = "none";
        image.classList.add("selected-image");
        addToOrder(item.querySelector(".itemSummary"));
      }
    });
  });
}

nextBtn.addEventListener("click", () => {
  const currentItems = document.querySelectorAll(`.${currentClass}`);
  currentItems.forEach((item) => {
    item.style.display = "none";
  });

  if (currentClass === "leather") {
    currentClass = "paper";
    lbe = "Paper";
  } else if (currentClass === "paper") {
    currentClass = "emblem";
    lbe = "Emblem";
  } else {
    currentClass = "form";
    lbe = "Form";
    const form = document.querySelector('form');
    form.classList.add('visible');
    const buttonSub = document.createElement('button');
    buttonSub.innerHTML = 'review';
    form.append('buttonSub')
  }

  nextBtn.disabled = true;

  const nextItems = document.querySelectorAll(`.${currentClass}`);
  nextItems.forEach((item) => {
    item.style.display = "flex";
  });

  const lbeElements = document.querySelectorAll(".lbe");
  lbeElements.forEach((element) => {
    element.textContent = lbe;
  });
});

const prevBtn = document.querySelector(".prevBtn");
prevBtn.addEventListener("click", () => {
  const currentItems = document.querySelectorAll(`.${currentClass}`);
  currentItems.forEach((item) => {
    item.style.display = "none";
  });
  if (currentClass === "emblem") {
    currentClass = "paper";
    lbe = "Paper";
  } else if (currentClass === "paper") {
    currentClass = "leather";
    lbe = "Leather";
  }
  initLeatherItems();
  const prevItems = document.querySelectorAll(`.${currentClass}`);
  prevItems.forEach((item) => {
    item.style.display = "flex";
  });
  const lbeElements = document.querySelectorAll(".lbe");
  lbeElements.forEach((element) => {
    element.textContent = lbe;
  });
});


function removeBlockedDivs(item) {
  const blockedDivs = item.querySelectorAll(".blocked");
  blockedDivs.forEach((blockedDiv) => {
    blockedDiv.remove();
  });
}

function clearDisplayedBios() {
  const bios = document.querySelectorAll(".leatherBio");
  bios.forEach((bio) => {
    bio.style.display = "none";
  });
}

function removeFromOrder(itemSummary) {
  if (itemSummary) {
    const itemName = itemSummary.textContent.split("x")[0].trim();
    const indexToRemove = order.findIndex((item) => item.name === itemName);
    if (indexToRemove !== -1) {
      order.splice(indexToRemove, 1);
      updateOrderSummary();
    }
  }
}

function addToOrder(itemSummary) {
  if (itemSummary) {
    const itemName = itemSummary.textContent.split("x")[0].trim();
    const itemQuantity = parseInt(
      itemSummary.textContent.split(" x")[1].split(" -")[0],
    );
    const totalPriceForItem = parseInt(
      itemSummary.textContent.split("Total: ")[1].split("€")[0],
    );
    const itemData = {
      name: itemName,
      quantity: itemQuantity,
      totalPrice: totalPriceForItem,
    };
    order.push(itemData);
    updateOrderSummary();
  }
}

function updateOrderSummary() {
  const orderSummaryElement = document.querySelector(".order-summary");
  if (orderSummaryElement) {
    orderSummaryElement.innerHTML = "";
    for (const item of order) {
      const { name, quantity, totalPrice } = item;
      const itemSummary = document.createElement("div");
      itemSummary.textContent = `${name} x${quantity} - Total: ${totalPrice}€`;
      orderSummaryElement.appendChild(itemSummary);
    }
  }
}

function resetClickedStatus() {
  const leatherItems = document.querySelectorAll(".leather");
  leatherItems.forEach((item) => {
    item.dataset.clicked = false;
    const bio = item.querySelector(".leatherBio");
    if (bio) {
      bio.style.display = "none";
    }
    const blockedDiv = item.querySelector(".blocked");
    if (blockedDiv) {
      blockedDiv.style.display = "block";
    }
  });
  nextBtn.disabled = true; 
}

window.addEventListener("load", () => {
  function initializeBlockedDivs() {
    const blockedDivs = document.querySelectorAll(".blocked");
    blockedDivs.forEach((blockedDiv) => {
      blockedDiv.style.display = "none";
    });
  }
  const nameInput = document.querySelector(".name");
nameInput.addEventListener("input", function() {
  const inputValue = nameInput.value;
  const cleanValue = inputValue.replace(/[^A-Za-z ]/g, ""); // Allow only letters
  nameInput.value = cleanValue;
});
const addressInput = document.querySelector(".address");
addressInput.addEventListener("input", function() {
  const inputValue = addressInput.value;
  const cleanValue = inputValue.replace(/[^A-Za-z / , . 0-9]/g, ""); // Allow only letters
  addressInput.value = cleanValue;
});
const phoneNumberInput = document.querySelector('.contact')
phoneNumberInput.addEventListener("input", function() {
  const inputValue = phoneNumberInput.value;
  const cleanValue = inputValue.replace(/[^0-9- ]/g, ""); // Allow spaces too
  phoneNumberInput.value = cleanValue;

  const validPattern = /^\d{3}[- ]\d{3}[- ]\d{7}$/;
  if (validPattern.test(cleanValue)) {
    phoneNumberInput.style.borderColor = "green";
  } else {
    phoneNumberInput.style.borderColor = "red";
  }
});  

  initializeBlockedDivs();
});

initLeatherItems();
resetClickedStatus();



