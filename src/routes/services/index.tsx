import { component$, useResource$, Resource } from '@builder.io/qwik';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { CONSTANTS } from '../../lib/constants';

export const head = {
 title: 'Viplora Tech | Advanced Software, AI & Digital Transformation Services',

  meta: [
    {
      name: 'description',
      content:
        'Explore Viplora Tech’s advanced technology services including custom software development, SaaS platforms, AI & automation, cybersecurity, and digital transformation for businesses in India and globally.',
    },
    {
      name: 'robots',
      content: 'index, follow',
    },
  ],
  links: [
    {
      rel: 'canonical',
      href: `${CONSTANTS.SITE_URL}/services`,
    },
  ],
};

const ServiceCard = component$<{ data: any }>(({ data }) => {
  return (
    <article
      class="
        group relative cursor-pointer
        aspect-square
        w-full max-w-[300px]
        p-5
        bg-[#0E0E12]
        border border-[#20DEFF]/15
        rounded-2xl
        shadow-lg
        flex flex-col justify-center mx-auto
        transition-all duration-300 ease-out
        hover:scale-[1.03]
        hover:border-[#20DEFF]/60
        hover:shadow-2xl
        hover:shadow-[#20DEFF]/30
      "
      aria-label={`Service: ${data.title}`}
    >
      <div class="relative z-10 text-center">
        <h3 class="text-lg font-extrabold text-white mb-8 tracking-wide">
          {data.title}
        </h3>

        <p class="text-sm leading-relaxed text-[#B7B3B7] line-clamp-4">
          {data.short_description}
        </p>
      </div>

      <div
        class="
          absolute inset-0
          bg-[#0E0E12]
          rounded-2xl p-5
          border border-[#20DEFF]/15
          opacity-0 pointer-events-none
          group-hover:opacity-100 group-hover:pointer-events-auto
          transition-all duration-300 ease-out
          overflow-y-auto z-20 scrollbar-hide
        "
        aria-hidden="true"
      >
        <h4 class="text-sm font-semibold text-white mb-3 uppercase tracking-wide text-center">
          Key Capabilities
        </h4>

        <ul class="text-sm space-y-1 list-disc list-inside text-[#B7B3B7]">
          {data.description
            ?.split('\n')
            ?.filter((line: string) => line.trim().startsWith('-'))
            ?.map((line: string) => (
              <li key={line}>{line.replace('- ', '').trim()}</li>
            ))}
        </ul>
      </div>
    </article>
  );
});

export default component$(() => {
  const servicesResource = useResource$(async () => {
    const res = await fetch(
      `${CONSTANTS.API_BASE_URL}/api/services/get_active`
    );

    if (!res.ok) {
      throw new Error('Failed to load services');
    }

    const json = await res.json();
    return json.services.results;
  });

  return (
    <>
      <Header />

      <main id="main-content">
<section
  class="bg-black text-white pt-28 pb-10 md:pt-32 md:pb-12"
  aria-labelledby="services-page-heading"
>

  <div class="container mx-auto px-6 text-center max-w-4xl">
    <h1
      id="services-page-heading"
      class="text-5xl md:text-6xl font-extrabold mb-4 text-[#20DEFF]"
    >
      Our Advanced Technology Services
    </h1>

    <p class="text-[#B7B3B7] text-xl leading-relaxed">
      Viplora Tech is your strategic partner for end-to-end digital
      transformation. We deliver secure, scalable, and intelligent software
      solutions for startups and enterprises across India and global markets.
    </p>
  </div>
</section>


        <section class="py-16 bg-[#0E0E12]" aria-labelledby="services-grid-heading">
          <h2 id="services-grid-heading" class="sr-only">
            Core Technology Services
          </h2>

          <div class="container mx-auto px-6">
            <h2 class="text-4xl font-bold mb-10 text-center text-[#20DEFF]">
              The Pillars of Digital Excellence
            </h2>

            <Resource
              value={servicesResource}
              onPending={() => (
                <div class="text-center text-[#20DEFF] text-xl" role="status">
                  Loading services...
                </div>
              )}
              onRejected={() => (
                <div class="text-center text-red-500 text-xl" role="alert">
                  Failed to load services.
                </div>
              )}
              onResolved={(services) => (
                <div class="flex flex-col items-center gap-10">
                  <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
                    {services.slice(0, 3).map((service: any) => (
                      <ServiceCard key={service.id} data={service} />
                    ))}
                  </div>

                  <div class="flex justify-center gap-8">
                    {services.slice(3, 5).map((service: any) => (
                      <ServiceCard key={service.id} data={service} />
                    ))}
                  </div>
                </div>
              )}
            />
          </div>
        </section>

        <section class="py-20 bg-black text-[#B7B3B7] text-center">
          <div class="container mx-auto px-6 max-w-3xl">
            <h2 class="text-4xl font-bold mb-6 text-[#20DEFF]">
              Ready to Transform Your Business?
            </h2>

            <p class="text-lg leading-relaxed mb-8">
              Whether it’s enterprise systems, AI, or advanced innovation — we
              design solutions that power the future.
            </p>

            <a
              href="/Contact/"
              class="
                inline-block bg-[#20DEFF] text-black font-bold
                py-3 px-10 rounded-lg text-lg
                hover:bg-[#17BFD9]
                transition-all shadow-lg active:scale-95
              "
            >
              Start Your Project Today
            </a>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
});
