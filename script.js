const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');
if (navToggle && navLinks) {
  navToggle.addEventListener('click', function () {
    const expanded = navLinks.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', expanded);
  });
}

document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', function (e) {
    const href = this.getAttribute('href');
    if (href && href.startsWith('#')) {
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
        if (navLinks.classList.contains('open')) {
          navLinks.classList.remove('open');
          navToggle.setAttribute('aria-expanded', false);
        }
      }
    }
  });
});


const contactForm = document.getElementById("contact-form");
if (contactForm) {
  contactForm.addEventListener("submit", function (e) {
    e.preventDefault();
    const name = contactForm.querySelector('[name="name"]').value.trim();
    const email = contactForm.querySelector('[name="email"]').value.trim();
    const message = contactForm.querySelector('[name="message"]').value.trim();
    let formMessage = document.getElementById("formMessage");
    if (!formMessage) {
      formMessage = document.createElement('div');
      formMessage.id = 'formMessage';
      formMessage.style.marginTop = '0.7rem';
      contactForm.appendChild(formMessage);
    }
    if (name && email && message) {
      formMessage.innerText = `Thank you! Your message has been sent.`;
      formMessage.style.color = "lightgreen";
      contactForm.reset();
    } else {
      formMessage.innerText = "Please fill out all fields.";
      formMessage.style.color = "red";
    }
  });
}
