document.addEventListener("DOMContentLoaded", function () {
  const navToggle = document.getElementById("navToggle");
  const navMenu = document.getElementById("navMenu");

  if (navToggle) {
    navToggle.addEventListener("click", function () {
      navMenu.classList.toggle("active");
      navToggle.classList.toggle("active");
    });
  }

  const navLinks = document.querySelectorAll(".nav-link");
  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      navMenu.classList.remove("active");
      navToggle.classList.remove("active");

      // Update active link
      navLinks.forEach((item) => item.classList.remove("active"));
      link.classList.add("active");
    });
  });

  window.addEventListener("scroll", function () {
    const sections = document.querySelectorAll("section");
    const scrollPosition = window.scrollY + 100;

    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      const sectionId = section.getAttribute("id");

      if (
        scrollPosition >= sectionTop &&
        scrollPosition < sectionTop + sectionHeight
      ) {
        navLinks.forEach((link) => {
          link.classList.remove("active");
          if (link.getAttribute("href") === `#${sectionId}`) {
            link.classList.add("active");
          }
        });
      }
    });
  });

  const skillBars = document.querySelectorAll(".skill-level");

  function animateSkillBars() {
    skillBars.forEach((bar) => {
      const level = bar.getAttribute("data-level");
      if (isElementInViewport(bar) && !bar.style.width) {
        bar.style.width = `${level}%`;
      }
    });
  }

  function isElementInViewport(el) {
    const rect = el.getBoundingClientRect();
    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <=
        (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
  }

  // Initial check and on scroll
  animateSkillBars();
  window.addEventListener("scroll", animateSkillBars);

  // Update current year in footer
  const currentYear = new Date().getFullYear();
  document.getElementById("currentYear").textContent = currentYear;

  // Contact Form Submission
  const contactForm = document.getElementById("contactForm");

  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();

      const name = document.getElementById("name").value;
      const email = document.getElementById("email").value;
      const subject = document.getElementById("subject").value;
      const message = document.getElementById("message").value;

      // Validation
      if (!name || !email || !subject || !message) {
        alert("Please fill in all fields.");
        return;
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        alert("Please enter a valid email address.");
        return;
      }

      // Send email using EmailJS
      emailjs
        .send("service_t316bxi", "template_zbf70nl", {
          from_name: name,
          from_email: email,
          subject: subject,
          message: message,
        })
        .then(
          function (response) {
            alert(`Thank you, ${name}! Your message has been sent.`);
            contactForm.reset();
          },
          function (error) {
            alert("Oops! Something went wrong. Please try again later.");
          }
        );
    });
  }

  // Back to top button
  const backToTopButton = document.querySelector(".back-to-top");

  window.addEventListener("scroll", function () {
    if (window.scrollY > 300) {
      backToTopButton.style.opacity = "1";
      backToTopButton.style.visibility = "visible";
    } else {
      backToTopButton.style.opacity = "0";
      backToTopButton.style.visibility = "hidden";
    }
  });

  // Smooth scrolling for all anchor links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      const targetId = this.getAttribute("href");
      if (targetId === "#") return;

      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        e.preventDefault();
        window.scrollTo({
          top: targetElement.offsetTop - 80,
          behavior: "smooth",
        });
      }
    });
  });

  // Project card hover effect enhancement
  const projectCards = document.querySelectorAll(".project-card");
  projectCards.forEach((card) => {
    card.addEventListener("mouseenter", function () {
      this.style.transform = "translateY(-10px)";
    });

    card.addEventListener("mouseleave", function () {
      this.style.transform = "translateY(0)";
    });
  });

  // Form input focus effects
  const formInputs = document.querySelectorAll(
    ".form-group input, .form-group textarea"
  );
  formInputs.forEach((input) => {
    input.addEventListener("focus", function () {
      this.parentElement.classList.add("focused");
    });

    input.addEventListener("blur", function () {
      if (!this.value) {
        this.parentElement.classList.remove("focused");
      }
    });
  });

  // Load profile image with error handling
  const profileImage = document.getElementById("profileImage");
  if (profileImage) {
    profileImage.onerror = function () {
      this.src = "https://via.placeholder.com/500x500/3498db/ffffff?text=MAM";
      this.alt = "Profile Placeholder";
    };
  }
});
