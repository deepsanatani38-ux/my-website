const quotes = [
  "You are my today and all of my tomorrows. ♥",
  "In a sea of people, my eyes will always search for you.",
  "Every love story is beautiful, but ours is my favorite.",
  "You make ordinary moments feel like magic.",
  "Home is wherever I am with you.",
  "I still get butterflies when I think of you.",
  "You are the poem I never knew how to write.",
  "I would choose you in every lifetime. ♥"
];

let quoteIndex = 0;

const pickRose = document.getElementById("pickRose");

if (pickRose) {
  pickRose.addEventListener("click", function () {
    quoteIndex = (quoteIndex + 1) % quotes.length;

    const quoteText = document.getElementById("quoteText");
    const quoteCount = document.getElementById("quoteCount");
    const gardenNote = document.getElementById("gardenNote");

    if (quoteText) quoteText.textContent = quotes[quoteIndex];
    if (quoteCount) quoteCount.textContent = `${quoteIndex + 1} / ${quotes.length}`;
    if (gardenNote) gardenNote.textContent = "A little rose, just for you. 🌹";

    createHearts(7);
  });
}

// 2. Love Letter — open and close
const envelope = document.getElementById("envelope");
const letterPaper = document.getElementById("letterPaper");

if (envelope && letterPaper) {
  envelope.addEventListener("click", function () {
    const isOpen = envelope.classList.toggle("open");

    letterPaper.classList.toggle("open", isOpen);
    envelope.setAttribute("aria-expanded", String(isOpen));
  });
}

// 3. Our Memories — image carousel
const memories = [
  {
    images: [
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=700&q=85",
      "https://images.unsplash.com/photo-1490750967868-88aa4486c946?auto=format&fit=crop&w=700&q=85",
      "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?auto=format&fit=crop&w=700&q=85"
    ],
    captions: [
      "Every sunset is brighter with you.",
      "With Love ♥",
      "I never want to let go of this hand."
    ]
  },
  {
    images: [
      "https://images.unsplash.com/photo-1470252649378-9c29740c9fa8?auto=format&fit=crop&w=700&q=85",
      "https://images.unsplash.com/photo-1518895949257-7621c3c786d7?auto=format&fit=crop&w=700&q=85",
      "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?auto=format&fit=crop&w=700&q=85"
    ],
    captions: [
      "Golden skies and quiet moments.",
      "A thousand little reasons ♥",
      "Every journey is better together."
    ]
  },
  {
    images: [
      "https://images.unsplash.com/photo-1499002238440-d264edd596ec?auto=format&fit=crop&w=700&q=85",
      "https://images.unsplash.com/photo-1523438885200-e635ba2c371e?auto=format&fit=crop&w=700&q=85",
      "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?auto=format&fit=crop&w=700&q=85"
    ],
    captions: [
      "A little sunshine for your day.",
      "My favorite kind of beautiful.",
      "Hand in hand, heart to heart."
    ]
  }
];

let memoryIndex = 0;

function showMemory(index) {
  memoryIndex = (index + memories.length) % memories.length;

  const memory = memories[memoryIndex];
  const cards = [
    document.querySelector(".left-card"),
    document.querySelector(".card-main"),
    document.querySelector(".right-card")
  ];

  cards.forEach(function (card, i) {
    if (!card) return;

    const image = card.querySelector("img");
    const caption = card.querySelector("p");

    if (image) image.src = memory.images[i];
    if (caption) caption.textContent = memory.captions[i];
  });

  const indicator = document.getElementById("memoryIndicator");

  if (indicator) {
    indicator.textContent = memories
      .map((_, i) => i === memoryIndex ? "●" : "○")
      .join(" ");
  }
}

const prevMemory = document.getElementById("prevMemory");
const nextMemory = document.getElementById("nextMemory");

if (prevMemory) {
  prevMemory.addEventListener("click", function () {
    showMemory(memoryIndex - 1);
  });
}

if (nextMemory) {
  nextMemory.addEventListener("click", function () {
    showMemory(memoryIndex + 1);
  });
}

// 4. Surprise button
const surpriseButton = document.getElementById("surpriseButton");

if (surpriseButton) {
  surpriseButton.addEventListener("click", function () {
    const message = document.getElementById("surpriseMessage");

    if (!message) return;

    message.hidden = !message.hidden;

    if (!message.hidden) createHearts(18);
  });
}

// 5. Falling petals and floating hearts
function createPetals() {
  const layer = document.querySelector(".petal-layer");

  if (!layer || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    return;
  }

  const petal = document.createElement("span");
  petal.className = "petal";
  petal.style.left = Math.random() * 100 + "%";
  petal.style.setProperty("--drift", (Math.random() * 150 - 75) + "px");
  petal.style.animationDuration = (7 + Math.random() * 8) + "s";

  layer.appendChild(petal);

  window.setTimeout(function () {
    petal.remove();
  }, 16000);
}

function createHearts(count) {
  const layer = document.querySelector(".petal-layer");

  if (!layer) return;

  for (let i = 0; i < count; i++) {
    const heart = document.createElement("span");

    heart.className = "petal";
    heart.textContent = "♥";
    heart.style.background = "transparent";
    heart.style.color = "#d93467";
    heart.style.fontSize = (10 + Math.random() * 12) + "px";
    heart.style.left = (35 + Math.random() * 30) + "%";
    heart.style.top = (45 + Math.random() * 10) + "%";
    heart.style.setProperty("--drift", (Math.random() * 240 - 120) + "px");
    heart.style.animationDuration = (2 + Math.random() * 2) + "s";

    layer.appendChild(heart);

    window.setTimeout(function () {
      heart.remove();
    }, 4500);
  }
}

if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  for (let i = 0; i < 14; i++) {
    window.setTimeout(createPetals, i * 350);
  }

  window.setInterval(createPetals, 900);
}

// 6. Highlight the current page section
const sections = document.querySelectorAll("main .screen");
const navDots = document.querySelectorAll(".nav-dot");

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (!entry.isIntersecting) return;

      const index = Array.from(sections).indexOf(entry.target);

      navDots.forEach(function (dot, i) {
        dot.classList.toggle("active", i === index);
      });
    });
  }, { threshold: 0.5 });

  sections.forEach(function (section) {
    observer.observe(section);
  });
}
.addEventListener("DOMContentLoaded", function () {
  // Rose button
  const roseButton = document.getElementById("roseButton");
  const roseMessage = document.getElementById("roseMessage");

  if (roseButton && roseMessage) {
    roseButton.addEventListener("click", function () {
      roseMessage.classList.toggle("hidden");

      roseButton.textContent =
        roseMessage.classList.contains("hidden")
          ? "Click to Open Your Rose"
          : "Hide Your Rose";
    });
  }

  // Love letter open/close
  const letterButton = document.getElementById("letterButton");
  const loveLetter = document.getElementById("loveLetter");
  const closeLetterButton =
    document.getElementById("closeLetterButton");

  if (letterButton && loveLetter) {
    letterButton.addEventListener("click", function () {
      loveLetter.classList.remove("hidden");
      letterButton.textContent = "Letter Opened ❤️";

      loveLetter.scrollIntoView({
        behavior: "smooth",
        block: "center"
      });
    });
  }

  if (closeLetterButton && loveLetter) {
    closeLetterButton.addEventListener("click", function () {
      loveLetter.classList.add("hidden");

      if (letterButton) {
        letterButton.textContent = "Open My Love Letter";
      }
    });
  }

  // Surprise button
  const surpriseButton =
    document.getElementById("surpriseButton");
  const surpriseMessage =
    document.getElementById("surpriseMessage");

  if (surpriseButton && surpriseMessage) {
    surpriseButton.addEventListener("click", function () {
      surpriseMessage.classList.toggle("hidden");

      surpriseButton.textContent =
        surpriseMessage.classList.contains("hidden")
          ? "Open Your Surprise"
          : "Hide Surprise";
    });
  }

  // Smooth scrolling for menu links
  document.querySelectorAll('.love-menu a[href^="#"]')
    .forEach(function (link) {
      link.addEventListener("click", function (event) {
        const targetId = link.getAttribute("href");
        const target = document.querySelector(targetId);

        if (target) {
          event.preventDefault();

          target.scrollIntoView({
            behavior: "smooth",
            block: "start"
          });
        }
      });
    });
});
