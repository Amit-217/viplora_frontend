import { component$, useVisibleTask$ } from '@builder.io/qwik';
import Header from '../components/Header';
import Hero from '../Hero';
import ServicesSection from '../components/Services';
import Projects from '../components/Projects';
import Footer from '../components/Footer';
import ChatBot from '../components/ChatBot';
import { CONSTANTS } from '../lib/constants';


export const head = {
  title: 'Viplora Tech ',
  meta: [
    {
      name: 'description',
      content:
        'Viplora Tech delivers scalable software, AI & automation, cybersecurity, SaaS platforms, and digital transformation solutions for startups and enterprises in India and globally.',
    },

  
    { name: 'robots', content: 'index, follow' },

    { name: 'geo.region', content: 'IN-MH' },
    { name: 'geo.country', content: 'India' },
    { name: 'geo.placename', content: 'Maharashtra, India' },
    { name: 'geo.position', content: '19.7515;75.7139' },
    { name: 'ICBM', content: '19.7515, 75.7139' },
  ],

  links: [
    {
      rel: 'canonical',
      href: CONSTANTS.SITE_URL,
    },
  ],

  scripts: [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'Organization',
        name: 'Viplora Tech',
        url: 'https://www.viploratech.com',
        areaServed: [
          { '@type': 'City', name: 'Mumbai', address: { addressRegion: 'MH', addressCountry: 'IN' } },
          { '@type': 'City', name: 'Pune', address: { addressRegion: 'MH', addressCountry: 'IN' } },
          { '@type': 'City', name: 'Aurangabad', address: { addressRegion: 'MH', addressCountry: 'IN' } },
          { '@type': 'City', name: 'Latur', address: { addressRegion: 'MH', addressCountry: 'IN' } },
          { '@type': 'City', name: 'Nagpur', address: { addressRegion: 'MH', addressCountry: 'IN' } },
        ],
      }),
    },
  ],
};

export default component$(() => {
  useVisibleTask$(({ cleanup }) => {
    const sections = document.querySelectorAll<HTMLElement>('.stack-section');

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('show');
            observer.unobserve(entry.target); // prevent re-trigger
          }
        });
      },
      { threshold: 0.3 }
    );

    sections.forEach((section) => observer.observe(section));

    cleanup(() => observer.disconnect());
  });

  return (
    <>
      <Header />

      <main id="main-content" class="stack-container">
        {/* HERO */}
        <section
          id="home"
          class="stack-section"
          aria-labelledby="home-heading"
        >
          <Hero />
        </section>

        <section
          id="services"
          class="stack-section"
          aria-labelledby="services-heading"
        >
          <ServicesSection />
        </section>

        <section
          id="projects"
          class="stack-section"
          aria-labelledby="projects-heading"
        >
          <Projects />
        </section>
      </main>

      <Footer />

      <ChatBot />
    </>
  );
});
