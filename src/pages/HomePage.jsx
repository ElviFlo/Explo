import { useEffect, useState } from "react";
import Hero from "../components/Hero";
import CookieConsentModal from "../components/CookieConsentModal";

const COOKIE_MODAL_DELAY = 1000;
const COOKIE_MODAL_KEY = "cookie-consent-answered";

export default function HomePage() {
  const [isCookieModalOpen, setIsCookieModalOpen] = useState(false);

  useEffect(() => {
    const alreadyAnswered = localStorage.getItem(COOKIE_MODAL_KEY);

    if (alreadyAnswered) return;

    const timer = setTimeout(() => {
      setIsCookieModalOpen(true);
    }, COOKIE_MODAL_DELAY);

    return () => clearTimeout(timer);
  }, []);

  const handleCloseCookieModal = () => {
    localStorage.setItem(COOKIE_MODAL_KEY, "true");
    setIsCookieModalOpen(false);
  };

  return (
    <>
      <div className="flex flex-1">
        <Hero />
      </div>

      <CookieConsentModal
        isOpen={isCookieModalOpen}
        onAccept={handleCloseCookieModal}
        onReject={handleCloseCookieModal}
        onCustomize={handleCloseCookieModal}
      />
    </>
  );
}