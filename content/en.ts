import type { ContentStructure } from "@/lib/i18n/types";

export const en: ContentStructure = {
  nav: {
    home: "Home",
    about: "About",
    services: "Services",
  },
  home: {
    hero: {
      title: "Azulita Holistics",
      tagline: "Homeopathy · Wellness Coaching · Reiki",
      subtitle:
        "I'm here to support you on your healing journey and help you develop greater wellbeing.",
      freeConsultation: "Free initial consultation (20 min)",
      cta: "BOOK YOUR CONSULTATION",
      callToAction: "Let's talk about how I can help you.",
    },
  },
  services: {
    title: "Services",
    intro: "Pricing is adjustable to your budget. I'm here to help you.",
    freeConsultation: "Free initial consultation (20 min)",
    services: [
      {
        title: "Homeopathy",
        price: "$85.00 (initial session + 2 follow-ups)",
        description:
          "Homeopathy is a system of natural medicine that treats you as a whole person. By considering your mental, emotional, and physical state, it identifies the remedy that matches your unique experience and stimulates your natural healing response.",
        note: "Note: I am in the process of becoming a certified homeopath. Currently, I work with patients with the guidance of my mentor.",
      },
      {
        title: "Wellness Coaching",
        price: "$65.00 (60 min), $90.00 (90 min)",
        description:
          "Personalized sessions tailored to your needs. Drawing from my knowledge of exercise, yoga, breathing techniques, meditation, energy work and other tools, we’ll identify what best suits your goals. I’ll support you in developing emotional resources and establishing routines that will help you regain balance and improve your overall wellbeing.",
      },
      {
        title: "Reiki",
        price: "$60.00 (60 min), $80.00 (90 min)",
        description:
          "By channeling energy through my hands, I’ll help you balance your life force and realign your energetic centers. This promotes healing and helps you feel more relaxed, centered, and at peace.",
      },
    ],
    closingText: "Let's talk about how I can best serve you.",
  },
  about: {
    title: "About Me",
    freeConsultation: "Free initial consultation (20 min)",
    bio: [
      "Hello! I'm Anakaren Santana. Over the years, I’ve trained in pedagogy, yoga and meditation instruction, reiki, therapeutic techniques, art, and even theoretical mathematics and physics. And I'm still studying! I'm currently working towards becoming a certified homeopath. I'm always seeking to understand the nature of life, our inner experience, and how we fit into the world.",
      "I'm also passionate about teaching and sharing my knowledge. For many years, I dedicated my time to the creation of educational experiences and materials. While this work was primarily in academic subjects like mathematics, it deepened my understanding of how people learn and develop. Above all, it taught me that each person is a world of experiences, desires, needs, sensations—all changing day by day. Everyone has their own unique way of growing and evolving.",
      "My experiences have shown me the importance of tending to our needs and understanding ourselves. This self-knowledge is essential for navigating any situation healthily, living fully, and balancing all aspects of what makes us human: body, mind, emotions, and spirit.",
      "Today my greatest motivation is to help people in their process of self-exploration, growth, and healing.",
    ],
    contact: "Or email me at ",
  },
  footer: {
    contact: {
      title: "Get in Touch",
      email: "azulitaholistics@gmail.com",
      instagram: "@azulitaholistics",
    },
    copyright: "© 2026 Azulita Holistics. All rights reserved.",
  },
};
