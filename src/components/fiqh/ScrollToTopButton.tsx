export default function ScrollToTopButton() {
  return (
    <button
      id="scrollToTopBtn"
      className="scroll-to-top"
      aria-label="Kembali ke atas"
      type="button"
    >
      <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path
          d="M12 19V5"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
        />
        <path
          d="M6 11L12 5L18 11"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  );
}
