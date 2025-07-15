// Updates Page - Thematic JavaScript
let updateFlow = false;
let diaryMomentum = 0;

async function squishLoadUpdates() {
  try {
    const changesData = await fetch("data/dash-changes.json");
    const changesContent = await changesData.json();
    squishRenderChanges(changesContent);

    const diariesData = await fetch("data/goo-diaries.json");
    const diariesContent = await diariesData.json();
    squishRenderDiaries(diariesContent);
  } catch (error) {
    console.error("Updates load error:", error);
    squishFallbackUpdates();
  }
}

function squishRenderChanges(changesData) {
  const changesContainer = document.getElementById("changes-content");
  if (!changesContainer) return;

  let changesHTML = "";
  changesData.forEach((change, index) => {
    changesHTML += `
            <div class="change-bubble" style="animation-delay: ${
              index * 0.2
            }s;">
                <div class="change-header">
                  <h3>${change.title}</h3>
                  <div class="change-meta">
                    <span class="change-date">${change.date}</span>
                    <span class="change-type ${change.type}">${
      change.type
    }</span>
                  </div>
                </div>
                <p class="change-description">${change.description}</p>
                ${
                  change.details
                    ? `<ul class="change-details">${change.details
                        .map((detail) => `<li>${detail}</li>`)
                        .join("")}</ul>`
                    : ""
                }
            </div>
        `;
  });

  changesContainer.innerHTML = changesHTML;

  // Add staggered animation to change bubbles
  const changeBubbles = changesContainer.querySelectorAll(".change-bubble");
  changeBubbles.forEach((bubble, index) => {
    bubble.style.opacity = "0";
    bubble.style.transform = "translateY(30px)";

    setTimeout(() => {
      bubble.style.transition =
        "all 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275)";
      bubble.style.opacity = "1";
      bubble.style.transform = "translateY(0)";
    }, index * 200);
  });
}

function squishRenderDiaries(diariesData) {
  const diariesContainer = document.getElementById("diaries-content");
  if (!diariesContainer) return;

  let diariesHTML = "";

  diariesData.forEach((diary) => {
    diariesHTML += `
            <div class="diary-bubble">
                <div class="diary-header">
                    <h3>${diary.title}</h3>
                    <span class="diary-author">by ${diary.author}</span>
                </div>
                ${
                  diary.image
                    ? `<div class="diary-image">
                        <img src="images/${diary.image}" alt="${diary.title}" loading="lazy">
                       </div>`
                    : ""
                }
                <p class="diary-content">${diary.content}</p>
                ${
                  diary.tips
                    ? `<div class="diary-tips"><h4>Pro Tips:</h4><ul>${diary.tips
                        .map((tip) => `<li>${tip}</li>`)
                        .join("")}</ul></div>`
                    : ""
                }
                <div class="diary-date">${diary.date}</div>
            </div>
        `;
  });

  diariesContainer.innerHTML = diariesHTML;
}

function squishFallbackUpdates() {
  const changesContainer = document.getElementById("changes-content");
  if (changesContainer) {
    changesContainer.innerHTML = `
            <div class="change-bubble">
                <div class="change-header">
                    <h3>Version 2.1.0 Released</h3>
                    <span class="change-date">December 15, 2024</span>
                </div>
                <p class="change-description">Major performance improvements and new jelly physics engine.</p>
                <ul class="change-details">
                    <li>Improved collision detection</li>
                    <li>New color-shifting mechanics</li>
                    <li>Enhanced mobile controls</li>
                </ul>
                <div class="change-type update">Update</div>
            </div>
        `;
  }

  const diariesContainer = document.getElementById("diaries-content");
  if (diariesContainer) {
    diariesContainer.innerHTML = `
            <div class="diary-bubble">
                <div class="diary-header">
                    <h3>Mastering the Speed Run</h3>
                    <span class="diary-author">by JellyMaster</span>
                </div>
                <p class="diary-content">Here's how I achieved my personal best time on the Rainbow Road level...</p>
                <div class="diary-tips">
                    <h4>Pro Tips:</h4>
                    <ul>
                        <li>Use momentum to your advantage</li>
                        <li>Time your jumps perfectly</li>
                        <li>Collect power-ups strategically</li>
                    </ul>
                </div>
                <div class="diary-date">December 10, 2024</div>
            </div>
        `;
  }
}

// Initialize updates page
document.addEventListener("DOMContentLoaded", () => {
  squishLoadUpdates();
});
