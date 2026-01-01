"use client";

import { useLanguage } from "@/lib/i18n/useLanguage";
import { BOOKING_URL } from "@/lib/constants";

export default function ServicesPage() {
  const { content } = useLanguage();

  return (
    <div>
      <section className="page-header-compact">
        <div className="container-custom">
          <h1 className="page-title">{content.services.title}</h1>
          <p className="page-subtitle">{content.services.intro}</p>
        </div>
      </section>

      <section className="section-spacing">
        <div className="container-custom">
          {/* Services List */}
          <div className="flex flex-col gap-8 md:gap-12 max-w-3xl mx-auto mb-12 md:mb-16">
            {content.services.services.map((service, index) => (
              <div key={index} className="card-base">
                <div className="flex justify-between items-baseline mb-3 flex-wrap gap-2">
                  <h2 className="service-detail-title !mb-0">
                    {service.title}
                  </h2>
                  <span className="text-base md:text-lg font-bold text-primary">
                    {service.price}
                  </span>
                </div>

                <p className="service-detail-description !mb-0">
                  {service.description}
                </p>

                {service.note && (
                  <p className="text-sm text-secondary/70 mt-3">
                    {service.note}
                  </p>
                )}
              </div>
            ))}
          </div>

          {/* Secondary CTA Group - Text above and below button */}
          <div className="cta-group-primary text-center">
            <p className="cta-text">{content.services.freeConsultation}</p>

            <a
              href={BOOKING_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary-enhanced"
            >
              {content.home.hero.cta}
            </a>

            <p className="cta-text-secondary -mt-px">
              {content.services.closingText}
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
