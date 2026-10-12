document.addEventListener("DOMContentLoaded", () => {
// =========================
// 1. ROSE GARDEN & QUOTES
// =========================
const quotes = [
"You make my ordinary world extraordinary.",
"If flowers could talk, every rose would say your name.",
"Somehow, you make even quiet moments beautiful.",
"My favourite memories always have a little of you in them.",
"You are a lovely reason to smile on an ordinary day.",
"A thousand flowers, and I would still choose this rose for you.",
"The smallest moments with you can mean the most.",
"This little garden is a reminder that you are appreciated."
];

const roseButton = document.getElementById("pickRose");
const quoteText = document.getElementById("quoteText");
const quoteCount = document.getElementById("quoteCount");
const gardenNote = document.getElementById("gardenNote");

let quoteIndex = 0;

if (roseButton && quoteText && quoteCount && gardenNote) {
roseButton.addEventListener("click", () => {
quoteIndex = (quoteIndex + 1) % quotes.length;

  quoteText.classList.remove("quote-change");
  void quoteText.offsetWidth;

  quoteText.textContent = quotes[quoteIndex];
  quoteText.classList.add("quote-change");

  quoteCount.textContent =
    String(quoteIndex + 1).padStart(2, "0") +
    " / " +
    String(quotes.length).padStart(2, "0");

  gardenNote.textContent =
    quoteIndex === quotes.length - 1
      ? "You have reached the last rose. Start again for another little reminder. 🌹"
      : "Rose number " + (quoteIndex + 1) +
        " has a special thought for you. ❤️";

  makeRoseRain(16);
});

}

// =========================
// 2. ROSE RAIN ANIMATION
// =========================
const reduceMotion = window.matchMedia(
"(prefers-reduced-motion: reduce)"
).matches;

function makeRoseRain(amount = 16) {
if (reduceMotion) return;

const symbols = ["🌹", "🌸", "💗", "💕", "❤️"];

for (let i = 0; i < amount; i++) {
  const rose = document.createElement("span");

  rose.className = "falling-rose";
  rose.textContent =
    symbols[Math.floor(Math.random() * symbols.length)];

  rose.style.left = Math.random() * 100 + "vw";
  rose.style.animationDuration = 3 + Math.random() * 3 + "s";
  rose.style.animationDelay = Math.random() * 0.8 + "s";
  rose.style.fontSize = 16 + Math.random() * 16 + "px";

  document.body.appendChild(rose);

  window.setTimeout(() => {
    rose.remove();
  }, 7500);
}

}

// =========================
// 3. LOVE LETTER OPEN/CLOSE
// =========================
const envelope = document.getElementById("envelope");
const letterPaper = document.getElementById("letterPaper");
const closeLetter = document.getElementById("closeLetter");
const letterHint = document.getElementById("letterHint");

function setLetterOpen(isOpen) {
if (!envelope || !letterPaper) return;

letterPaper.hidden = !isOpen;
envelope.classList.toggle("is-open", isOpen);
envelope.setAttribute("aria-expanded", String(isOpen));
envelope.setAttribute(
  "aria-label",
  isOpen ? "Close the love letter" : "Open the love letter"
);

if (letterHint) {
  letterHint.textContent = isOpen
    ? "Your letter is open. Read it with a smile. ♥"
    : "Tap the envelope to open your letter ♥";
}

if (isOpen) {
  makeRoseRain(12);
}

}

if (envelope && letterPaper) {
// Start in the closed state
setLetterOpen(false);

envelope.addEventListener("click", () => {
  setLetterOpen(letterPaper.hidden);
});

}

if (closeLetter) {
closeLetter.addEventListener("click", () => {
setLetterOpen(false);

  if (envelope) {
    envelope.focus();
  }
});

}

// =========================
// 4. FINAL SURPRISE
// =========================
const surpriseButton = document.getElementById("surpriseButton");
const surpriseMessage = document.getElementById("surpriseMessage");

if (surpriseButton && surpriseMessage) {
surpriseButton.setAttribute(
"aria-expanded",
String(!surpriseMessage.hidden)
);

surpriseButton.addEventListener("click", () => {
  const isOpening = surpriseMessage.hidden;

  surpriseMessage.hidden = !isOpening;

  surpriseButton.textContent = isOpening
    ? "Hide Your Surprise ♡"
    : "Open Your Surprise ♡";

  surpriseButton.setAttribute(
    "aria-expanded",
    String(isOpening)
  );

  if (isOpening) {
    surpriseMessage.classList.remove("surprise-pop");
    void surpriseMessage.offsetWidth;
    surpriseMessage.classList.add("surprise-pop");

    makeRoseRain(24);

    surpriseMessage.scrollIntoView({
      behavior: reduceMotion ? "auto" : "smooth",
      block: "center"
    });
  }
});

}

// =========================
// 5. SMOOTH NAVIGATION LINKS
// =========================
document.querySelectorAll('a[href^="#"]').forEach((link) => {
link.addEventListener("click", (event) => {
const targetId = link.getAttribute("href");
const target = document.querySelector(targetId);

  if (target) {
    event.preventDefault();

    target.scrollIntoView({
      behavior: reduceMotion ? "auto" : "smooth",
      block: "start"
    });

    // Keep the URL's section link updated
    if (targetId.length > 1) {
      history.replaceState(null, "", targetId);
    }
  }
});

});

// =========================
// 6. REVEAL SECTIONS ON SCROLL
// =========================
const revealItems = document.querySelectorAll(
".hero, .section-heading, .garden-card, .letter-card, .gallery, .promise-card, .surprise-card"
);

if ("IntersectionObserver" in window && !reduceMotion) {
const observer = new IntersectionObserver(
(entries, currentObserver) => {
entries.forEach((entry) => {
if (entry.isIntersecting) {
entry.target.classList.add("section-visible");
currentObserver.unobserve(entry.target);
}
});
},
{ threshold: 0.12 }
);

revealItems.forEach((item) => {
  item.classList.add("section-reveal");
  observer.observe(item);
});

} else {
revealItems.forEach((item) => {
item.classList.add("section-visible");
});
}
});