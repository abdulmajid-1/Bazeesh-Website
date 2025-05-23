// Mobile menu functionality
const hamburger = document.querySelector(".hamburger");
const navLinks = document.querySelector(".nav-links");

hamburger.addEventListener("click", () => {
  navLinks.classList.toggle("active");
  hamburger.classList.toggle("active");
});

// Close menu when clicking outside
document.addEventListener("click", function(event) {
  if (!hamburger.contains(event.target) && !navLinks.contains(event.target)) {
    hamburger.classList.remove("active");
    navLinks.classList.remove("active");
  }
});

// Close menu when clicking on a link
document.querySelectorAll(".nav-links a").forEach(link => {
  link.addEventListener("click", () => {
    hamburger.classList.remove("active");
    navLinks.classList.remove("active");
  });
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    target.scrollIntoView({
      behavior: "smooth",
    });
  });
});

// Parallax effect for hero section
window.addEventListener("scroll", () => {
  const hero = document.querySelector(".hero");
  const scrolled = window.pageYOffset;
  hero.style.backgroundPositionY = scrolled * 0.5 + "px";
});

// Animated counters for statistics
const stats = [
  { element: "customers", target: 1000, suffix: "+" },
  { element: "bottles", target: 50000, suffix: "+" },
];

// Add statistics section to HTML
const aboutSection = document.querySelector(".about .container");
const statsHTML = `
    <div class="stats-container">
        <div class="stat-item">
            <span class="stat-number" id="customers">0</span>
            <span class="stat-suffix">+</span>
            <p>Happy Customers</p>
        </div>
        <div class="stat-item">
            <span class="stat-number" id="bottles">0</span>
            <span class="stat-suffix">+</span>
            <p>Bottles Delivered</p>
        </div>
    </div>
`;
aboutSection.insertAdjacentHTML("beforeend", statsHTML);

// Animate counters when in view
const animateCounter = (element, target, suffix) => {
  let current = 0;
  const increment = target / 50;
  const timer = setInterval(() => {
    current += increment;
    if (current >= target) {
      element.textContent = target + suffix;
      clearInterval(timer);
    } else {
      element.textContent = Math.floor(current) + suffix;
    }
  }, 40);
};

// Intersection Observer for counters
const counterObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        stats.forEach((stat) => {
          const element = document.getElementById(stat.element);
          if (element) {
            animateCounter(element, stat.target, stat.suffix);
          }
        });
        counterObserver.disconnect();
      }
    });
  },
  { threshold: 0.5 }
);

counterObserver.observe(document.querySelector(".stats-container"));

// Contact form handling with validation and email sending
const contactForm = document.getElementById("contact-form");
contactForm.addEventListener("submit", function (e) {
  e.preventDefault();

  // Get form data
  const formData = new FormData(this);
  const formObject = {
    name: formData.get("name"),
    email: formData.get("email"),
    message: formData.get("message"),
  };

  // Form validation
  let isValid = true;
  const email = formObject.email;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailRegex.test(email)) {
    showFormError("Please enter a valid email address");
    isValid = false;
  }

  if (!formObject.name.trim()) {
    showFormError("Please enter your name");
    isValid = false;
  }

  if (!formObject.message.trim()) {
    showFormError("Please enter your message");
    isValid = false;
  }

  if (isValid) {
    // Show loading state
    const submitButton = contactForm.querySelector(".submit-button");
    const originalButtonText = submitButton.textContent;
    submitButton.textContent = "Sending...";
    submitButton.disabled = true;

    // Prepare email template parameters
    const templateParams = {
      from_name: formObject.name,
      from_email: formObject.email,
      message: formObject.message,
      to_email: "bazeeshgroupofindustries@gmail.com",
    };

    // Send email using EmailJS
    emailjs
      .send("service_73paw2n", "template_dooyj36", templateParams)
      .then(function (response) {
        console.log("SUCCESS!", response.status, response.text);

        // Show success message
        const successMessage = document.createElement("div");
        successMessage.className = "success-message";
        successMessage.innerHTML = `
                    <h3>Message Sent Successfully!</h3>
                    <p>Thank you for contacting us, ${formObject.name}!</p>
                    <p>We will get back to you at ${formObject.email} soon.</p>
                `;

        // Add success message styles
        const style = document.createElement("style");
        style.textContent = `
                    .success-message {
                        background: #4CAF50;
                        color: white;
                        padding: 1.5rem;
                        border-radius: 5px;
                        margin-top: 1rem;
                        animation: slideIn 0.3s ease;
                    }
                    .success-message h3 {
                        margin-bottom: 0.5rem;
                    }
                    .success-message p {
                        margin: 0.5rem 0;
                    }
                `;
        document.head.appendChild(style);

        // Clear any existing messages
        const existingMessage = document.querySelector(
          ".success-message, .error-message"
        );
        if (existingMessage) {
          existingMessage.remove();
        }

        contactForm.appendChild(successMessage);
        contactForm.reset();

        // Remove success message after 5 seconds
        setTimeout(() => {
          successMessage.style.animation = "slideOut 0.3s ease";
          setTimeout(() => successMessage.remove(), 300);
        }, 5000);
      })
      .catch(function (error) {
        console.log("FAILED...", error);
        showFormError("Failed to send message. Please try again later.");
      })
      .finally(function () {
        // Reset button state
        submitButton.textContent = originalButtonText;
        submitButton.disabled = false;
      });
  }
});

function showFormError(message) {
  const errorDiv = document.createElement("div");
  errorDiv.className = "error-message";
  errorDiv.innerHTML = `
        <i class="fas fa-exclamation-circle"></i>
        <span>${message}</span>
    `;

  // Add error message styles
  const style = document.createElement("style");
  style.textContent = `
        .error-message {
            background: #ff5252;
            color: white;
            padding: 1rem;
            border-radius: 5px;
            margin-top: 1rem;
            animation: shake 0.5s ease;
            display: flex;
            align-items: center;
            gap: 0.5rem;
        }
        .error-message i {
            font-size: 1.2rem;
        }
        @keyframes shake {
            0%, 100% { transform: translateX(0); }
            25% { transform: translateX(-10px); }
            75% { transform: translateX(10px); }
        }
    `;
  document.head.appendChild(style);

  // Clear any existing messages
  const existingMessage = document.querySelector(
    ".success-message, .error-message"
  );
  if (existingMessage) {
    existingMessage.remove();
  }

  contactForm.appendChild(errorDiv);

  // Remove error message after 3 seconds
  setTimeout(() => {
    errorDiv.style.animation = "fadeOut 0.3s ease";
    setTimeout(() => errorDiv.remove(), 300);
  }, 3000);
}

// Add scroll progress indicator
const progressBar = document.createElement("div");
progressBar.className = "scroll-progress";
document.body.appendChild(progressBar);

// Add progress bar styles
const progressStyle = document.createElement("style");
progressStyle.textContent = `
    .scroll-progress {
        position: fixed;
        top: 0;
        left: 0;
        height: 3px;
        background: linear-gradient(to right, var(--primary-color), var(--secondary-color));
        z-index: 1001;
        transition: width 0.1s ease;
    }
`;
document.head.appendChild(progressStyle);

window.addEventListener("scroll", () => {
  const winScroll =
    document.body.scrollTop || document.documentElement.scrollTop;
  const height =
    document.documentElement.scrollHeight -
    document.documentElement.clientHeight;
  const scrolled = (winScroll / height) * 100;
  progressBar.style.width = scrolled + "%";
});

// Theme switching functionality
document.addEventListener("DOMContentLoaded", function () {
  const themeToggle = document.getElementById("theme-toggle");
  const prefersDarkScheme = window.matchMedia("(prefers-color-scheme: dark)");

  // Check for saved theme preference or use system preference
  const currentTheme =
    localStorage.getItem("theme") ||
    (prefersDarkScheme.matches ? "dark" : "light");

  // Apply the saved theme immediately
  document.documentElement.setAttribute("data-theme", currentTheme);
  if (themeToggle) {
    themeToggle.checked = currentTheme === "dark";
  }

  // Theme toggle event listener
  if (themeToggle) {
    themeToggle.addEventListener("change", function () {
      const newTheme = this.checked ? "dark" : "light";
      document.documentElement.setAttribute("data-theme", newTheme);
      localStorage.setItem("theme", newTheme);
    });
  }

  // Listen for system theme changes
  prefersDarkScheme.addEventListener("change", (e) => {
    if (!localStorage.getItem("theme")) {
      const newTheme = e.matches ? "dark" : "light";
      document.documentElement.setAttribute("data-theme", newTheme);
      if (themeToggle) {
        themeToggle.checked = e.matches;
      }
    }
  });
});
