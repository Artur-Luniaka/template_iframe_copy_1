// Jelly Dash 3D - Thematic JavaScript Variables and Functions
let gooVelocity = 0;
let squishMomentum = 0;
let jellyFlow = false;
let bounceIntensity = 1;

// Dynamic Content Loading Functions
async function squishLoadContent() {
  try {
    const slideData = await fetch("data/slide-guide.json");
    const slideContent = await slideData.json();
    squishRenderSlideGuide(slideContent);

    const echoData = await fetch("data/gamer-echoes.json");
    const echoContent = await echoData.json();
    squishRenderEchoes(echoContent);

    const headerData = await fetch("components/header.html");
    const headerContent = await headerData.text();
    document.getElementById("squish-header").innerHTML = headerContent;

    const footerData = await fetch("components/footer.html");
    const footerContent = await footerData.text();
    document.getElementById("squish-footer").innerHTML = footerContent;
  } catch (error) {
    console.error("Squish load error:", error);
    squishFallbackContent();
  }
}

function squishRenderSlideGuide(slideData) {
  const slideContainer = document.getElementById("slide-content");
  if (!slideContainer) return;

  let slideHTML = "";
  slideData.forEach((item) => {
    slideHTML += `
            <div class="slide-item">
                <h3>${item.title}</h3>
                <p>${item.description}</p>
                ${
                  item.tips
                    ? `<ul>${item.tips
                        .map((tip) => `<li>${tip}</li>`)
                        .join("")}</ul>`
                    : ""
                }
            </div>
        `;
  });

  slideContainer.innerHTML = slideHTML;
}

function squishRenderEchoes(echoData) {
  const echoContainer = document.getElementById("echo-content");
  if (!echoContainer) return;

  let echoHTML = "";
  echoData.forEach((review, index) => {
    const firstLetter = review.name.charAt(0).toUpperCase();
    echoHTML += `
            <div class="echo-bubble" style="animation-delay: ${index * 0.2}s;">
                <div class="echo-avatar">
                    <span class="avatar-letter">${firstLetter}</span>
                </div>
                <h4>${review.name}</h4>
                <p>"${review.text}"</p>
                <div class="echo-rating">
                    ${"★".repeat(review.rating)}${"☆".repeat(5 - review.rating)}
                </div>
            </div>
        `;
  });

  echoContainer.innerHTML = echoHTML;

  // Add staggered animation to echo bubbles
  const echoBubbles = echoContainer.querySelectorAll(".echo-bubble");
  echoBubbles.forEach((bubble, index) => {
    bubble.style.opacity = "0";
    bubble.style.transform = "translateY(20px)";

    setTimeout(() => {
      bubble.style.transition = "all 0.6s ease";
      bubble.style.opacity = "1";
      bubble.style.transform = "translateY(0)";
    }, index * 200);
  });
}

function squishFallbackContent() {
  // Fallback content if JSON files fail to load
  const slideContainer = document.getElementById("slide-content");
  if (slideContainer) {
    slideContainer.innerHTML = `
            <div class="slide-item">
                <h3>Basic Controls</h3>
                <p>Use touch or mouse to control your jelly's movement. Swipe left and right to navigate through obstacles.</p>
                <ul>
                    <li>Tap to jump</li>
                    <li>Swipe to change direction</li>
                    <li>Collect power-ups for bonuses</li>
                </ul>
            </div>
        `;
  }

  const echoContainer = document.getElementById("echo-content");
  if (echoContainer) {
    echoContainer.innerHTML = `
            <div class="echo-bubble">
                <h4>JellyMaster</h4>
                <p>"Amazing game! The physics feel so smooth and satisfying."</p>
                <div class="echo-rating">★★★★★</div>
            </div>
        `;
  }
}

// Animation Functions
function squishLaunch() {
  gooVelocity = 1;
  squishMomentum = 0.8;
  jellyFlow = true;

  // Add launch animation
  const launchButton = document.querySelector(".launch-gel");
  if (launchButton) {
    launchButton.style.transform = "scale(1.2)";
    setTimeout(() => {
      launchButton.style.transform = "scale(1)";
    }, 200);
  }

  // Simulate game launch
  setTimeout(() => {
    alert("Jelly Dash 3D launching... Get ready to slide!");
  }, 500);
}

function squishBounceEffect(element) {
  if (!element) return;

  element.style.transform = "scale(1.1)";
  setTimeout(() => {
    element.style.transform = "scale(1)";
  }, 150);
}

// Smooth Scrolling
function squishSmoothScroll(targetId) {
  const targetElement = document.getElementById(targetId);
  if (targetElement) {
    targetElement.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }
}

// Scroll to Game Demo
function squishScrollToGame() {
  const gameDemo = document.querySelector(".game-demo");
  if (gameDemo) {
    gameDemo.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });
  }
}

// Dynamic Year Update for Footer
function squishUpdateYear() {
  const yearElements = document.querySelectorAll(".current-year");
  const currentYear = new Date().getFullYear();

  yearElements.forEach((element) => {
    element.textContent = currentYear;
  });
}

// Performance Optimization
function squishOptimizePerformance() {
  // Throttle scroll events
  let scrollTimeout;
  window.addEventListener("scroll", () => {
    if (scrollTimeout) {
      clearTimeout(scrollTimeout);
    }
    scrollTimeout = setTimeout(() => {
      // Handle scroll-based animations
      squishHandleScrollAnimations();
    }, 16); // ~60fps
  });
}

function squishHandleScrollAnimations() {
  const animatedElements = document.querySelectorAll(
    ".speed-bubble, .agility-bubble, .obstacle-bubble, .tempo-bubble"
  );

  animatedElements.forEach((element) => {
    const rect = element.getBoundingClientRect();
    const isVisible = rect.top < window.innerHeight && rect.bottom > 0;

    if (isVisible) {
      element.style.opacity = "1";
      element.style.transform = "translateY(0)";
    }
  });
}

// Hero Image Slider
function squishInitHeroSlider() {
  const heroImages = document.querySelectorAll(".hero-image");
  if (heroImages.length < 2) return;

  let currentImageIndex = 0;

  function squishSwitchImage() {
    heroImages.forEach((image, index) => {
      if (index === currentImageIndex) {
        image.classList.add("active");
      } else {
        image.classList.remove("active");
      }
    });

    currentImageIndex = (currentImageIndex + 1) % heroImages.length;
  }

  // Switch images every 3 seconds
  setInterval(squishSwitchImage, 3000);
}

// --- Scroll To Top Button ---
function createScrollToTopButton() {
  const btn = document.createElement("button");
  btn.className = "scroll-to-top";
  btn.title = "Scroll to top";
  btn.innerHTML = "↑";
  document.body.appendChild(btn);

  btn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  function toggleButton() {
    if (window.scrollY > 200) {
      btn.classList.add("visible");
    } else {
      btn.classList.remove("visible");
    }
  }
  window.addEventListener("scroll", toggleButton);
  toggleButton();
}

// --- Cookie Banner ---
function createCookieBanner() {
  // Check if user already accepted cookies
  if (localStorage.getItem("cookiesAccepted") === "true") {
    return;
  }

  const banner = document.createElement("div");
  banner.className = "cookie-banner";
  banner.innerHTML = `
    <div class="cookie-content">
      <div class="cookie-text">
        <strong>🍪 We use cookies</strong> to enhance your browsing experience and provide personalized content. By continuing to use this site, you consent to our use of cookies.
      </div>
      <div class="cookie-actions">
        <button class="accept-cookies">Accept Cookies</button>
      </div>
    </div>
  `;

  document.body.appendChild(banner);

  // Show banner after a short delay
  setTimeout(() => {
    banner.classList.add("show");
  }, 1000);

  // Handle accept button click
  const acceptBtn = banner.querySelector(".accept-cookies");
  acceptBtn.addEventListener("click", () => {
    localStorage.setItem("cookiesAccepted", "true");
    banner.classList.remove("show");
    setTimeout(() => {
      banner.remove();
    }, 400);
  });
}

// Initialize everything when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  squishLoadContent();
  squishUpdateYear();
  squishOptimizePerformance();
  squishInitHeroSlider();
  createScrollToTopButton();
  createCookieBanner();

  // Add hover effects to interactive elements
  const interactiveElements = document.querySelectorAll(
    ".launch-gel, .speed-bubble, .agility-bubble, .obstacle-bubble, .tempo-bubble"
  );

  interactiveElements.forEach((element) => {
    element.addEventListener("mouseenter", () => {
      squishBounceEffect(element);
    });
  });
});

// Export functions for use in other scripts
window.squishFunctions = {
  squishLaunch,
  squishSmoothScroll,
  squishScrollToGame,
  squishBounceEffect,
};
