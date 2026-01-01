'use client';

import { useLanguage } from '@/lib/i18n/useLanguage';

export function Footer() {
  const { content } = useLanguage();

  return (
    // py-6/py-8: compact vertical padding for tighter footer
    <footer className="text-white py-6 md:py-8" style={{ backgroundColor: 'var(--color-footer-bg)' }}>
      <div className="container-custom">
        {/* Contact Info - mb-4: space before copyright divider */}
        <div className="flex flex-col items-center text-center mb-4">
          {/* mb-2: tight spacing between heading and contact links */}
          <h3 className="text-xl md:text-2xl font-semibold mb-2">
            {content.footer.contact.title}
          </h3>
          {/* gap-2/gap-6: tight vertical stack on mobile, wider horizontal gap on desktop */}
            <div className="flex flex-col md:flex-row gap-2 md:gap-6 items-center">
            <a
              href={`mailto:${content.footer.contact.email}`}
              className="inline-flex items-center gap-2 text-base hover:text-primary-light transition-colors duration-200"
            >
              <svg
                className="w-5 h-5 flex-shrink-0"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
              <span>{content.footer.contact.email}</span>
            </a>
            <a
              href={`https://instagram.com/${content.footer.contact.instagram.replace('@', '')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-base hover:text-primary-light transition-colors duration-200"
              aria-label={`Follow us on Instagram ${content.footer.contact.instagram}`}
            >
              <svg
                className="w-5 h-5 flex-shrink-0"
                fill="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
                  clipRule="evenodd"
                />
              </svg>
              <span>{content.footer.contact.instagram}</span>
            </a>
          </div>
        </div>

        {/* Copyright - pt-4: compact padding above copyright line */}
        <div className="border-t border-white/20 pt-4 text-center text-sm text-neutral-light">
          <p>{content.footer.copyright}</p>
        </div>
      </div>
    </footer>
  );
}
