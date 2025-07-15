// Contact Page - Thematic JavaScript
let contactFlow = false;
let formMomentum = 0;

async function squishLoadContact() {
  try {
    const contactData = await fetch("data/contact-info.json");
    const contactContent = await contactData.json();
    squishRenderContact(contactContent);
  } catch (error) {
    console.error("Contact load error:", error);
    squishFallbackContact();
  }
}

function squishRenderContact(contactData) {
  const contactContainer = document.getElementById("contact-content");
  if (!contactContainer) return;

  let contactHTML = "";
  contactData.forEach((item) => {
    contactHTML += `
            <div class="contact-item-bubble">
                <div class="contact-icon-bubble">${item.icon}</div>
                <div class="contact-details-bubble">
                    <h3>${item.title}</h3>
                    <p>${item.value}</p>
                </div>
            </div>
        `;
  });

  contactContainer.innerHTML = contactHTML;
}

function squishFallbackContact() {
  const contactContainer = document.getElementById("contact-content");
  if (contactContainer) {
    contactContainer.innerHTML = `
            <div class="contact-item-bubble">
                <div class="contact-icon-bubble">📧</div>
                <div class="contact-details-bubble">
                    <h3>Email</h3>
                    <p>hello@EnterPlayZone.com</p>
                </div>
            </div>
            <div class="contact-item-bubble">
                <div class="contact-icon-bubble">📞</div>
                <div class="contact-details-bubble">
                    <h3>Phone</h3>
                    <p>+1 403-268-2489</p>
                </div>
            </div>
            <div class="contact-item-bubble">
                <div class="contact-icon-bubble">📍</div>
                <div class="contact-details-bubble">
                    <h3>Address</h3>
                    <p>200 8 Ave SW, Calgary, AB T2P 1B5, Canada</p>
                </div>
            </div>
        `;
  }
}

// Form Handling
function squishInitForm() {
  const contactForm = document.getElementById("contact-form");
  if (contactForm) {
    contactForm.addEventListener("submit", squishHandleSubmit);
  }
}

function squishHandleSubmit(event) {
  event.preventDefault();

  const formData = new FormData(event.target);
  const name = formData.get("name");
  const phone = formData.get("phone");
  const message = formData.get("message");

  // Simulate form submission
  squishShowSuccess();

  // Reset form
  event.target.reset();
}

function squishShowSuccess() {
  const submitButton = document.querySelector(".submit-gel");
  if (submitButton) {
    const originalText = submitButton.textContent;
    submitButton.textContent = "Message Sent!";
    submitButton.style.background =
      "linear-gradient(45deg, var(--jelly-green), var(--jelly-blue))";

    setTimeout(() => {
      submitButton.textContent = originalText;
      submitButton.style.background =
        "linear-gradient(45deg, var(--jelly-yellow), var(--jelly-orange))";
    }, 3000);
  }
}

// Form Input Animations
function squishInitFormAnimations() {
  const formInputs = document.querySelectorAll(".form-input, .form-textarea");

  formInputs.forEach((input) => {
    input.addEventListener("focus", () => {
      squishBounceEffect(input.parentElement);
    });

    input.addEventListener("blur", () => {
      if (input.value.trim() === "") {
        input.style.borderColor = "rgba(255,255,255,0.3)";
      } else {
        input.style.borderColor = "var(--jelly-green)";
      }
    });
  });
}

// Initialize contact page
document.addEventListener("DOMContentLoaded", function () {
  squishLoadContact(); // ВОЗВРАЩАЕМ ОТОБРАЖЕНИЕ КАРТОЧЕК!
  const form = document.getElementById("contact-form");
  if (!form) return;

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    // 1. Simple validation
    let valid = true;
    const fields = ["name", "phone", "message"];
    fields.forEach((id) => {
      const el = form.querySelector(`[name="${id}"]`);
      if (el) {
        el.classList.remove("input-error");
        if (!el.value.trim()) {
          el.classList.add("input-error");
          valid = false;
        }
      }
    });
    if (!valid) return;

    // 2. Overlay + spinner
    let overlay = document.createElement("div");
    overlay.className = "squish-overlay";
    overlay.innerHTML = '<div class="squish-spinner"></div>';
    document.body.appendChild(overlay);

    // 3. Simulate sending (1.5s)
    setTimeout(() => {
      // Remove overlay
      overlay.remove();
      // 4. Scroll to top
      window.scrollTo({ top: 0, behavior: "smooth" });
      // 5. Show toast
      showSquishToast("Your message has been sent!");
      // Optionally reset form
      form.reset();
    }, 1500);
  });

  // Toast function
  function showSquishToast(msg) {
    let toast = document.createElement("div");
    toast.className = "squish-toast";
    toast.textContent = msg;
    document.body.appendChild(toast);
    setTimeout(() => {
      toast.classList.add("show");
    }, 50);
    setTimeout(() => {
      toast.classList.remove("show");
      setTimeout(() => toast.remove(), 400);
    }, 2500);
  }
});
