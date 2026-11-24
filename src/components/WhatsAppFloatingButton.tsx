import React from 'react';
import { BRAND_INFO } from '../data/content.ts';

export const WhatsAppFloatingButton: React.FC = () => {
  const handleWhatsAppClick = () => {
    if (typeof (window as unknown as { gtag?: (...args: unknown[]) => void }).gtag === 'function') {
      (window as unknown as { gtag: (...args: unknown[]) => void }).gtag('event', 'contact_whatsapp', {
        event_category: 'engagement',
        event_label: 'floating_whatsapp_button',
      });
    }
  };

  return (
    <div className="fixed bottom-5 right-5 sm:bottom-6 sm:right-6 z-[35] group flex items-center gap-3">
      {/* Desktop hover tooltip with high contrast (WCAG AAA) */}
      <span
        aria-hidden="true"
        className="hidden sm:inline-flex items-center bg-[#0A0A0A] text-white text-xs font-mono font-bold tracking-wide px-3.5 py-2 border border-neutral-800 shadow-lg opacity-0 translate-x-2 pointer-events-none group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200 whitespace-nowrap"
      >
        Escríbeme por WhatsApp
      </span>

      <a
        href={BRAND_INFO.whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        onClick={handleWhatsAppClick}
        aria-label="Contactar a Patricia Loaiza por WhatsApp"
        title="Contactar a Patricia Loaiza por WhatsApp"
        className="w-12 h-12 rounded-full bg-[#25D366] hover:bg-[#1EBE5D] text-white flex items-center justify-center shadow-[0_8px_24px_rgba(0,0,0,0.28)] ring-2 ring-white transition-transform duration-200 hover:scale-105 active:scale-95 focus:outline-none focus-visible:ring-4 focus-visible:ring-[#0A0A0A]"
      >
        <svg
          viewBox="0 0 32 32"
          width="24"
          height="24"
          className="w-6 h-6 block"
          aria-hidden="true"
          focusable="false"
        >
          <path
            fill="#FFFFFF"
            d="M16.004 2.667C8.64 2.667 2.667 8.64 2.667 16c0 2.352.616 4.647 1.787 6.67L2.667 29.333l6.834-1.792A13.27 13.27 0 0 0 16.004 29.333c7.363 0 13.329-5.97 13.329-13.333S23.367 2.667 16.004 2.667zm0 24.416a11.04 11.04 0 0 1-5.635-1.545l-.404-.24-4.055 1.063 1.083-3.954-.263-.419a11.028 11.028 0 0 1-1.693-5.888c0-6.11 4.97-11.083 11.083-11.083 2.96 0 5.743 1.154 7.835 3.249a11.014 11.014 0 0 1 3.248 7.834c0 6.113-4.973 11.083-11.083 11.083zm6.08-8.301c-.333-.167-1.971-.973-2.277-1.084-.305-.111-.528-.167-.75.167-.222.333-.861 1.084-1.055 1.306-.195.222-.389.25-.722.083-.333-.167-1.407-.519-2.68-1.654-.99-.884-1.659-1.975-1.853-2.309-.195-.333-.021-.514.146-.68.15-.149.333-.389.5-.583.167-.195.222-.333.333-.556.111-.222.056-.417-.028-.583-.083-.167-.75-1.806-1.028-2.473-.27-.65-.546-.562-.75-.572-.194-.01-.417-.012-.639-.012-.222 0-.583.083-.889.417-.305.333-1.167 1.14-1.167 2.779s1.195 3.223 1.361 3.445c.167.222 2.35 3.59 5.694 5.034.795.343 1.416.548 1.9.701.798.254 1.525.218 2.099.132.64-.096 1.971-.806 2.249-1.584.278-.778.278-1.445.195-1.584-.084-.139-.306-.222-.64-.389z"
          />
        </svg>
      </a>
    </div>
  );
};
