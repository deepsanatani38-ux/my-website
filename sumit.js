
document.addEventListener("DOMContentLoaded", () => {
  const reduceMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  // Rose garden quotes
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
        " / " + String(quotes.length).padStart(2, "0");

      gardenNote.textContent =
        "Rose number " + (quoteIndex + 1) +
        " has a special thought for you. ❤️";

      makeRoseRain(16);
    });
  }

  // Falling roses and hearts
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
      rose.style.animationDelay = Math.random() * 0.6 + "s";
      rose.style.fontSize = 16 + Math.random() * 16 + "px";

      document.body.appendChild(rose);
      window.setTimeout(() => rose.remove(), 7500);
    }
  }

  // Slowly floating background hearts
  function createAmbientHeart() {
    if (reduceMotion) return;

    const layer = document.getElementById("heart-layer");
    if (!layer || layer.childElementCount >= 12) return;

    const heart = document.createElement("span");
    heart.className = "floating-heart-particle";
    heart.textContent = ["♡", "♥", "💗", "💕"][
      Math.floor(Math.random() * 4)
    ];

    heart.style.setProperty("--left", Math.random() * 100 + "vw");
    heart.style.fontSize = 14 + Math.random() * 20 + "px";
    heart.style.animationDuration = 7 + Math.random() * 7 + "s";

    layer.appendChild(heart);
    window.setTimeout(() => heart.remove(), 15000);
  }

  if (document.getElementById("heart-layer") && !reduceMotion) {
    createAmbientHeart();
    window.setInterval(createAmbientHeart, 1400);
  }

  // Open and close the love letter
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

    if (isOpen) makeRoseRain(12);
  }

  if (envelope && letterPaper) {
    setLetterOpen(false);

    envelope.addEventListener("click", () => {
      setLetterOpen(letterPaper.hidden);
    });
  }

  if (closeLetter) {
    closeLetter.addEventListener("click", () => {
      setLetterOpen(false);
      if (envelope) envelope.focus();
    });
  }

  // Surprise button
  const surpriseButton = document.getElementById("surpriseButton");
  const surpriseMessage = document.getElementById("surpriseMessage");

  if (surpriseButton && surpriseMessage) {
    surpriseButton.addEventListener("click", () => {
      const isOpening = surpriseMessage.hidden;
      surpriseMessage.hidden = !isOpening;

      surpriseButton.textContent = isOpening
        ? "Hide Your Surprise ♡"
        : "Open Your Surprise ♡";

      surpriseButton.setAttribute("aria-expanded", String(isOpening));

      if (isOpening) {
        void surpriseMessage.offsetWidth;
        makeRoseRain(24);
        surpriseMessage.scrollIntoView({
          behavior: reduceMotion ? "auto" : "smooth",
          block: "center"
        });
      }
    });
  }

  // Heart form opens the separate heart page
  const heartForm = document.getElementById("heartForm");
  const heartInput = document.getElementById("heartMessage");

  if (heartForm && heartInput) {
    heartForm.addEventListener("submit", (event) => {
      event.preventDefault();

      const message = heartInput.value.trim();
      if (!message) {
        heartInput.focus();
        return;
      }

      const destination = new URL("heart.html", window.location.href);
      destination.searchParams.set("message", message);
      window.location.href = destination.href;
    });
  }

  // Smooth section navigation
  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener("click", (event) => {
      const targetId = link.getAttribute("href");
      if (!targetId || targetId === "#") return;

      const target = document.querySelector(targetId);
      if (!target) return;

      event.preventDefault();
      target.scrollIntoView({
        behavior: reduceMotion ? "auto" : "smooth",
        block: "start"
      });

      history.replaceState(null, "", targetId);
    });
  });

  // Reveal sections as they enter the screen
  const revealItems = document.querySelectorAll(
    ".hero, .section-heading, .garden-card, .letter-area, " +
    ".memory-card, .promise-card, .heart-maker-card, .surprise-card"
  );

  if ("IntersectionObserver" in window && !reduceMotion) {
    const observer = new IntersectionObserver((entries, currentObserver) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("section-visible");
          currentObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });

    revealItems.forEach((item) => {
      item.classList.add("section-reveal");
      observer.observe(item);
    });
  } else {
    revealItems.forEach((item) => {
      item.classList.add("section-visible");
    });
  }

  // Separate animated-heart page
  const heartMessage = document.getElementById("createdHeartMessage");
  const sparkArea = document.getElementById("heartSparkArea");
  const anotherHeart = document.getElementById("anotherHeart");

  if (heartMessage && sparkArea) {
    const params = new URLSearchParams(window.location.search);
    const message = params.get("message") ||
      "Always and forever, Lovely ❤️";

    // Text is inserted safely, not interpreted as HTML
    heartMessage.textContent = message.slice(0, 100);

    function createSparks(amount = 18) {
      if (reduceMotion) return;

      const symbols = ["♥", "♡", "✦", "💗", "✨"];

      for (let i = 0; i < amount; i++) {
        const spark = document.createElement("span");
        spark.className = "heart-spark";
        spark.textContent =
          symbols[Math.floor(Math.random() * symbols.length)];

        spark.style.left = "50%";
        spark.style.top = "50%";
        spark.style.setProperty("--dx", (Math.random() * 360 - 180) + "px");
        spark.style.setProperty("--dy", (Math.random() * 300 - 150) + "px");
        spark.style.animationDelay = Math.random() * 0.7 + "s";
        spark.style.fontSize = 12 + Math.random() * 20 + "px";

        sparkArea.appendChild(spark);
        window.setTimeout(() => spark.remove(), 3500);
      }
    }

    createSparks(28);

    if (anotherHeart) {
      anotherHeart.addEventListener("click", () => createSparks(24));
    }
  }
});
