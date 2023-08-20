const form = document.getElementById('contact-form');
const exitButton = document.getElementById('exit-button');
const envelope = document.querySelector('.envelope');
const instagram = document.querySelector('.ig');

form.addEventListener('submit', (event) => {
  event.preventDefault();
  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const message = document.getElementById('message').value;

  Email.send({
    Host: "smtp.elasticemail.com",
    Username: "cy63rJ3dn0r0g@gmail.com",
    Password: "019699827C5A76EAE8CED9D06F4FA81F911C",
    To: 'cy63rJ3dn0r0g@gmail.com',
    From: email,
    Subject: `New message from ${name}`,
    Body: "Name: " + name +
      "<br> Email: " + email +
      "<br> Message: " + message
  }).then(message => {
    alert("I wii get in touch as soon as i can");
    form.reset(); 
  });
});

exitButton.addEventListener('click', () => {
  form.style.display = 'none';
});

envelope.addEventListener('click', () => {
  form.style.display = 'flex';
});

instagram.addEventListener('click', () => {
  window.open('https://instagram.com/scavengeruniquebooks?igshid=NTc4MTIwNjQ2YQ==')
})


const menuBarNav = document.querySelector('.menuBar');
const menuNav = document.querySelector('.menuNav')
menuNav.addEventListener('mouseenter', () => {
  menuBarNav.classList.add('moved');
})
menuNav.addEventListener('mouseleave', () => {
  menuBarNav.classList.remove('moved');
})
const orderBtn = document.querySelector(".orderBar");
orderBtn.addEventListener("click", () => {
  console.log("Button clicked");
  window.location.href = "/Order/Order.html";
});

const offersBarBtn = document.querySelector('.offersBar');
offersBarBtn.addEventListener("click", () => {
  console.log("Button clicked");
  window.location.href = "/Offers/Offers.html";
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
