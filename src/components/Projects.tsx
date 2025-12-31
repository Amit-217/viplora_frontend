import {
  component$,
  useStore,
  useVisibleTask$,
} from '@builder.io/qwik';
import { CONSTANTS } from '../lib/constants';

/* ================= ICON LOGIC ================= */
const getIconType = (category: string | null) => {
  if (!category) return 'default';
  const c = category.toLowerCase();
  if (c.includes('ai') || c.includes('analytics')) return 'analytics';
  if (c.includes('commerce') || c.includes('e-commerce')) return 'commerce';
  if (c.includes('cloud')) return 'cloud';
  if (c.includes('health')) return 'health';
  return 'default';
};

const ProjectIcon = () => (
  <svg
    class="h-10 w-10 text-[#20DEFF]"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
  >
    <path
      stroke-width="2"
      d="M12 2a7 7 0 00-7 7v4l-2 2v1h18v-1l-2-2V9a7 7 0 00-7-7z"
    />
  </svg>
);

/* ================= PROJECTS SECTION ================= */
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
        throw new Error(`API Error: ${res.status}`);
      }

      const data = await res.json();
      store.projects = data.projects?.results || [];
    } catch (err) {
      console.error('Projects load error:', err);
      store.error = 'Failed to load projects';
    } finally {
      store.loading = false;
    }
  });

  return (
    <section id="projects" class="py-24 bg-black text-[#B7B3B7]">
      <div class="container mx-auto px-6">
        <h2 class="text-4xl font-bold text-center text-[#20DEFF] mb-16">
          Featured Projects
        </h2>

        {store.loading && (
          <p class="text-center text-zinc-400">
            Loading projects…
          </p>
        )}

        {store.error && (
          <p class="text-center text-red-400">
            {store.error}
          </p>
        )}

        {!store.loading && !store.error && (
          <div class="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {store.projects.map((project) => (
              <article
                key={project.id}
                class="p-6 bg-[#0E0E12] rounded-xl border border-white/10"
              >
                <ProjectIcon />

                <h3 class="text-white mt-4 font-bold">
                  {project.title}
                </h3>

                <p class="text-sm text-zinc-400 mt-2 line-clamp-4">
                  {project.description}
                </p>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
});
