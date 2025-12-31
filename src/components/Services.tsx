import {
  component$,
  useStore,
  useVisibleTask$,
} from '@builder.io/qwik';
import { CONSTANTS } from '../lib/constants';


const ServiceCard = component$<{ data: any; index: number }>(
  ({ data }) => {
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
                <li key={line}>
                  {line.replace('- ', '').trim()}
                </li>
              ))}
          </ul>
        </div>
      </article>
    );
  }
);


export default component$(() => {
  const store = useStore({
    services: [] as any[],
    loading: true,
    error: '',
  });

  useVisibleTask$(async () => {
    try {
      const res = await fetch(
        `${CONSTANTS.API_BASE_URL}/api/services/get_active`
      );

      if (!res.ok) {
        throw new Error(`API Error: ${res.status}`);
      }

      const json = await res.json();
      store.services = json.services?.results || [];
    } catch (err) {
      console.error('Services load error:', err);
      store.error = 'Failed to load services';
    } finally {
      store.loading = false;
    }
  });

  return (
    <>
      <section
        class="pt-12 pb-16 md:pt-16 md:pb-28 bg-[#0E0E12]"
        aria-labelledby="services-heading"
      >
        <div class="w-full px-6 text-center fade-up">
          <h2
            id="services-heading"
            class="text-4xl font-bold mb-8 text-[#20DEFF]"
          >
            Our Advanced Technology Services
          </h2>

          <p class="text-lg md:text-xl leading-relaxed text-[#B7B3B7] max-w-5xl mx-auto">
            Viplora Tech is your strategic partner for end-to-end digital
            transformation. We deliver secure, scalable, and intelligent
            software solutions across five core areas to future-proof your
            business.
          </p>
        </div>
      </section>

      <section
        class="py-16 md:py-24 bg-black"
        aria-label="Core Service Offerings"
      >
        <div class="w-full px-6">
          <h2 class="text-4xl font-bold mb-16 text-center text-[#20DEFF]">
            The Pillars of Digital Excellence
          </h2>

          {store.loading && (
            <div class="text-center text-[#20DEFF] text-xl">
              Loading services...
            </div>
          )}

          {store.error && (
            <div class="text-center text-red-500 text-xl">
              {store.error}
            </div>
          )}

          {!store.loading && !store.error && (
            <div class="flex flex-col items-center gap-10">
              <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
                {store.services.slice(0, 3).map((service, i) => (
                  <ServiceCard
                    key={service.id}
                    data={service}
                    index={i}
                  />
                ))}
              </div>

              <div class="flex justify-center gap-8">
                {store.services.slice(3, 5).map((service, i) => (
                  <ServiceCard
                    key={service.id}
                    data={service}
                    index={i + 3}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      <section
        class="py-14 md:py-20 bg-[#0B0C10] text-[#B7B3B7] text-center"
        aria-label="Service Call to Action"
      >
        <div class="w-full px-6 max-w-4xl mx-auto">
          <h2 class="text-4xl font-bold mb-6 text-[#20DEFF]">
            Ready to Transform Your Business?
          </h2>

          <p class="text-lg md:text-xl leading-relaxed">
            Whether it’s enterprise systems, AI, or advanced innovation —
            we design solutions that power the future.
          </p>

          <a
            href="/Contact/"
            class="
              inline-block bg-[#20DEFF] text-black font-bold
              py-3 px-10 rounded-lg text-lg
              hover:bg-[#17BFD9]
              transition-all shadow-lg active:scale-95
              mt-10
            "
            aria-label="Start a project with Viplora Tech"
          >
            Start Your Project Today
          </a>
        </div>
      </section>
    </>
  );
});
