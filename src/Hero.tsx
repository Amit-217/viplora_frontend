import { component$, useSignal, useVisibleTask$ } from '@builder.io/qwik';
import { Link } from '@builder.io/qwik-city';

export const head = {
  title: 'Viplora Tech',
  meta: [
    {
      name: 'description',
      content:
        'We build scalable software, AI-powered platforms, and modern digital solutions for startups and enterprises across India and globally.',
    },
    {
      name: 'robots',
      content: 'index, follow',
    },
  ],
  links: [
    {
      rel: 'canonical',
      href: import.meta.env.VITE_SITE_URL,
    },
  ],
};

export default component$(() => {

  const clients = useSignal(0);
  const projects = useSignal(0);
  const years = useSignal(0);
  const loading = useSignal(true);

  useVisibleTask$(
    async () => {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_API_BASE_URL}/api/statistics/statistics`
        );
        const json = await res.json();

        if (json.status === 'success' && json.data) {
          clients.value = json.data.no_of_clients;
          projects.value = json.data.no_of_projects;
          years.value = json.data.no_of_years;
        }
      } catch (err) {
        console.error('Failed to load statistics', err);
      } finally {
        loading.value = false;
      }
    },
    { strategy: 'document-ready' }
  );

  return (
    <header class="w-full text-white">
      <section
        aria-label="Homepage Hero Section"
        class="relative w-full bg-black"
      >
        <div class="relative w-full h-[60vh] sm:h-[70vh] md:h-[80vh] lg:h-[90vh] bg-black overflow-hidden">
          <video
            class="w-full h-full object-cover"
            autoplay
            muted
            loop
            playsInline
            preload="none"
            aria-hidden="true"
          >
            <source
              src="/videos/AI_Generated_Seamless_Loop_Animation.mp4"
              type="video/mp4"
            />
          </video>
          <div class="absolute inset-0 bg-black/30"></div>
        </div>

        <div class="relative w-full bg-black py-24">
          <div class="container mx-auto px-6 text-center">
            <div
              class="inline-block mb-6 px-4 py-2 rounded-md border"
              style={{ backgroundColor: '#0E0E12', borderColor: '#20DEFF' }}
            >
              <span class="text-base sm:text-lg font-semibold text-[#B7B3B7]">
                Welcome to the Future
              </span>
            </div>

            <h1 class="text-4xl sm:text-5xl lg:text-7xl font-extrabold mb-6 text-[#20DEFF]">
              Advanced Tech Solutions
            </h1>

            <h2 class="sr-only">Company Achievements</h2>

            <p class="text-base sm:text-xl font-semibold text-white">
              कर्मनिष्ठया वयं नवविप्लवं प्रज्वालयामः
            </p>

            <p class="mt-4 text-lg md:text-xl text-[#B7B3B7]">
              Through dedication and innovation, we build scalable software
              solutions for modern enterprises.
            </p>

            <div class="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/Contact/"
                class="px-9 py-3 rounded-md font-semibold bg-[#20DEFF] text-black hover:scale-105 transition"
              >
                Start Your Project
              </Link>

              <Link
                href="/projects/"
                class="px-9 py-3 rounded-md font-semibold border border-[#20DEFF] text-[#20DEFF]"
              >
                Explore Our Work
              </Link>
            </div>

            <section class="mt-20">
              <div class="grid grid-cols-1 sm:grid-cols-3 gap-8">
                {[
                  [`${projects.value}+`, 'Projects Delivered'],
                  [`${clients.value}+`, 'Global Clients'],
                  [`${years.value}+`, 'Years Experience'],
                ].map(([num, title]) => (
                  <article
                    key={title}
                    class="bg-[#1A1A1E] px-6 py-6 rounded-lg border border-white/10"
                  >
                    <div class="text-4xl font-bold text-[#20DEFF] mb-2">
                      {loading.value ? '—' : num}
                    </div>
                    <h3 class="font-semibold text-white">{title}</h3>
                  </article>
                ))}
              </div>
            </section>
          </div>
        </div>
      </section>
    </header>
  );
});
