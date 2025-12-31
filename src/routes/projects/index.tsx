import {
  component$,
  useStore,
  useVisibleTask$,
} from '@builder.io/qwik';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { CONSTANTS } from '../../lib/constants';

export const head = {
  title:
    'Featured Projects & Case Studies | AI, Cloud & Software – Viplora Tech',
  meta: [
    {
      name: 'description',
      content:
        'Explore real-world projects by Viplora Tech including AI-powered platforms, cloud-native systems, SaaS products, and enterprise software solutions delivered for clients in India and globally.',
    },
    {
      name: 'robots',
      content: 'index, follow',
    },
  ],
  links: [
    {
      rel: 'canonical',
      href: `${CONSTANTS.SITE_URL}/projects`,
    },
  ],
};

const getIconType = (category: string | null) => {
  if (!category) return 'default';
  const c = category.toLowerCase();
  if (c.includes('ai') || c.includes('analytics')) return 'analytics';
  if (c.includes('commerce') || c.includes('e-commerce')) return 'commerce';
  if (c.includes('cloud')) return 'cloud';
  if (c.includes('health')) return 'health';
  return 'default';
};

const ProjectIcon = ({ type }: { type: string }) => {
  const common = 'h-10 w-10 text-[#20DEFF]';

  if (type === 'analytics')
    return (
      <svg class={common} viewBox="0 0 24 24" fill="none" stroke="currentColor">
        <path stroke-width="2" d="M3 3v18h18M9 17V9m4 8V5m4 12v-6" />
      </svg>
    );

  if (type === 'commerce')
    return (
      <svg class={common} viewBox="0 0 24 24" fill="none" stroke="currentColor">
        <path stroke-width="2" d="M3 3h18l-2 13H5L3 3z" />
      </svg>
    );

  if (type === 'cloud')
    return (
      <svg class={common} viewBox="0 0 24 24" fill="none" stroke="currentColor">
        <path stroke-width="2" d="M3 15a4 4 0 014-4 5 5 0 019-1 4 4 0 010 8H7a4 4 0 01-4-3z" />
      </svg>
    );

  if (type === 'health')
    return (
      <svg class={common} viewBox="0 0 24 24" fill="none" stroke="currentColor">
        <path stroke-width="2" d="M12 21s-7-4.35-7-10a4 4 0 017-3 4 4 0 017 3c0 5.65-7 10-7 10z" />
      </svg>
    );

  return (
    <svg class={common} viewBox="0 0 24 24" fill="none" stroke="currentColor">
      <path stroke-width="2" d="M12 2a7 7 0 00-7 7v4l-2 2v1h18v-1l-2-2V9a7 7 0 00-7-7z" />
    </svg>
  );
};

export default component$(() => {
  const store = useStore({
    projects: [] as any[],
    loading: true,
    error: '',
  });

  useVisibleTask$(async () => {
    try {
      const res = await fetch(
        `${CONSTANTS.API_BASE_URL}/api/projects/get_all`
      );

      if (!res.ok) {
        throw new Error(`API error: ${res.status}`);
      }

      const data = await res.json();
      store.projects = data.projects?.results || [];
    } catch (err) {
      console.error('Projects fetch error:', err);
      store.error = 'Failed to load projects';
    } finally {
      store.loading = false;
    }
  });

  return (
    <>
      <Header />

      <main id="main-content">
        <section class="py-24 lg:py-32 bg-black text-[#B7B3B7]">
          <div class="container mx-auto px-6">

            {/* HEADER */}
            <header class="mb-16 text-center">
              <h1 class="text-4xl lg:text-5xl font-bold text-white">
                <span class="text-[#20DEFF]">Featured Projects</span>
              </h1>
            </header>

            {/* ERROR */}
            {store.error && (
              <p class="text-center text-red-400">{store.error}</p>
            )}

            {/* LOADING */}
            {store.loading && (
              <div class="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {Array.from({ length: 4 }).map((_, i) => (
                  <div
                    key={i}
                    class="h-[260px] rounded-2xl bg-[#0E0E12] animate-pulse"
                  />
                ))}
              </div>
            )}

            {/* PROJECTS */}
            {!store.loading && !store.error && (
              <div class="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {store.projects.map((project) => (
                  <article
                    key={project.id}
                    class="p-6 bg-[#0E0E12] border border-[#20DEFF]/15 rounded-2xl min-h-[260px]"
                  >
                    <ProjectIcon type={getIconType(project.category)} />
                    <h3 class="text-xl font-bold text-white mt-4">
                      {project.title}
                    </h3>
                    <p class="text-sm mt-2">{project.description}</p>
                  </article>
                ))}
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
});
