.addEventListener("DOMContentLoaded", () => {
  // Rose garden: eight different messages
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

  roseButton.addEventListener("click", () => {
    quoteIndex = (quoteIndex + 1) % quotes.length;

    quoteText.textContent = quotes[quoteIndex];
    quoteCount.textContent =
      String(quoteIndex + 1).padStart(2, "0") +
      " / " +
      String(quotes.length).padStart(2, "0");

    gardenNote.textContent =
      quoteIndex === quotes.length - 1
        ? "You have reached the last rose. Start again for another little reminder. 🌹"
        : "Rose number " + (quoteIndex + 1) +
          " has a special thought for you. ❤️";
  });

  // Love letter: open and close
  const envelope = document.getElementById("envelope");
  const letterPaper = document.getElementById("letterPaper");
  const closeLetter = document.getElementById("closeLetter");
  const letterHint = document.getElementById("letterHint");

  function setLetterOpen(isOpen) {
    letterPaper.hidden = !isOpen;
    envelope.classList.toggle("is-open", isOpen);
    envelope.setAttribute("aria-expanded", String(isOpen));

    letterHint.textContent = isOpen
      ? "Your letter is open. Read it with a smile. ♥"
      : "Tap the envelope to open your letter ♥";

    envelope.setAttribute(
      "aria-label",
      isOpen ? "Close the love letter" : "Open the love letter"
    );
  }

  envelope.addEventListener("click", () => {
    setLetterOpen(letterPaper.hidden);
  });

  closeLetter.addEventListener("click", () => {
    setLetterOpen(false);
    envelope.focus();
  });

  // Final surprise
  const surpriseButton = document.getElementById("surpriseButton");
  const surpriseMessage = document.getElementById("surpriseMessage");

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
      surpriseMessage.scrollIntoView({
        behavior: "smooth",
        block: "center"
      });
    }
  });

  // Respect users who prefer reduced motion.
  // All primary interactions work without extra libraries.
});
