"use client";

import Image from "next/image";
import { useLanguage } from "@/lib/i18n/useLanguage";
import { BOOKING_URL } from "@/lib/constants";

export default function AboutPage() {
  const { content } = useLanguage();

  return (
    <div>
      <section className="section-spacing">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-8 md:gap-12 items-start">
            {/* Left Column - Image and CTA */}
            <div className="flex flex-col gap-8 order-2 md:order-1">
              <Image
                src="/images/profile.jpg"
                alt="Profile photo"
                width={400}
                height={400}
                className="w-full h-auto rounded-lg max-w-sm mx-auto md:max-w-none md:mx-0"
              />

              {/* CTA Group - Tightly coupled */}
              <div className="cta-group-primary text-center">
                <p className="cta-text">{content.about.freeConsultation}</p>
                <a
                  href={BOOKING_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary-enhanced"
                >
                  {content.home.hero.cta}
                </a>

                {/* Contact email */}
                <p className="cta-text-secondary -mt-px">
                  {content.about.contact}
                  <a
                    href="mailto:azulitaholistics@gmail.com"
                    className="underline hover:no-underline"
                  >
                    azulitaholistics@gmail.com
                  </a>
                </p>
              </div>
            </div>

            {/* Right Column - Bio Text */}
            <div className="order-1 md:order-2">
              <h1 className="page-title !mt-0 !text-left !mb-4">
                {content.about.title}
              </h1>
              <div className="text-body-spacing">
                {content.about.bio.map((paragraph, index) => (
                  <p key={index} className="text-body">
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
