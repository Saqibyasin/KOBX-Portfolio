window.addEventListener('load', function() {
  const loader = document.querySelector('#loader');
  setTimeout(() => {
    loader.style.opacity = '0';
    setTimeout(() => {
      loader.style.display = 'none';
    }, 500);
  }, 1500);
});



const navbar = document.querySelector('#navbar');
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

// Navbar scroll effect
window.addEventListener('scroll', function() {
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});


hamburger.addEventListener('click', function() {
  navLinks.classList.toggle('active');
  hamburger.classList.toggle('active');
});


navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('active');
    hamburger.classList.remove('active');
  });
});


document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});



const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('animate');
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);
document.querySelectorAll('.project-card, .skill-item, .about-card').forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(30px)';
  el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
  observer.observe(el);
});

const style = document.createElement('style');
style.textContent = `.animate { opacity: 1 !important; transform: translateY(0) !important; }`;
document.head.appendChild(style);


const skillObserver = new IntersectionObserver(function(entries) {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.querySelectorAll('.skill-fill').forEach(fill => {
        const width = fill.style.width;
        fill.style.width = '0%';
        setTimeout(() => {
          fill.style.width = width;
        }, 200);
      });
      skillObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.3 });

const skillsSection = document.querySelector('.skills');
if (skillsSection) skillObserver.observe(skillsSection);



const sections = document.querySelectorAll('section[id]');

window.addEventListener('scroll', function() {
  const scrollY = window.scrollY;

  sections.forEach(section => {
    const sectionTop = section.offsetTop - 100;
    const sectionHeight = section.offsetHeight;
    const sectionId = section.getAttribute('id');
    const navLink = document.querySelector(`.nav-links a[href="#${sectionId}"]`);

    if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
      document.querySelectorAll('.nav-links a').forEach(a => a.style.color = '');
      if (navLink) navLink.style.color = '#a78bfa';
    }
  });
});



const form = document.querySelector('#contact-form');

const validators = {
  name: {
    validate: value => value.trim().length >= 3,
    message: 'Name must be at least 3 characters!'
  },
  email: {
    validate: value => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value),
    message: 'Please enter a valid email!'
  },
  subject: {
    validate: value => value.trim().length >= 5,
    message: 'Subject must be at least 5 characters!'
  },
  message: {
    validate: value => value.trim().length >= 20,
    message: 'Message must be at least 20 characters!'
  }
};

function validateField(input) {
  const { id, value } = input;
  const errorEl = document.querySelector(`#${id}-error`);
  const validator = validators[id];
  if (!validator) return true;

  const isValid = validator.validate(value);

  if (value.trim() === '') {
    errorEl.textContent = '';
    input.style.borderColor = '';
    return false;
  }

  if (isValid) {
    errorEl.textContent = '';
    input.style.borderColor = '#4ade80';
  } else {
    errorEl.textContent = validator.message;
    input.style.borderColor = '#f87171';
  }

  return isValid;
}


['name', 'email', 'subject', 'message'].forEach(id => {
  const input = document.querySelector(`#${id}`);
  if (input) {
    input.addEventListener('input', () => validateField(input));
    input.addEventListener('blur', () => validateField(input));
  }
});


if (form) {
  form.addEventListener('submit', function(e) {
    e.preventDefault();

    const inputs = ['name', 'email', 'subject', 'message'].map(id =>
      document.querySelector(`#${id}`)
    );

    const allValid = inputs.every(input => validateField(input));

    if (!allValid) return;

    const btn = document.querySelector('#submit-btn');
    btn.disabled = true;
    btn.textContent = 'Sending... ⏳';

    setTimeout(() => {
      btn.textContent = '✅ Message Sent!';
      btn.style.background = '#4ade80';
      form.reset();
      inputs.forEach(input => {
        input.style.borderColor = '';
      });
      setTimeout(() => {
        btn.disabled = false;
        btn.textContent = 'Send Message 🚀';
        btn.style.background = '';
      }, 3000);
    }, 1500);
  });
}



const heroTitle = document.querySelector('.hero-title');
if (heroTitle) {
  heroTitle.style.opacity = '1';
}


const tempStyle = document.querySelector('style[data-temp]');
if (tempStyle) tempStyle.remove();