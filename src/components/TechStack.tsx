import { component$ } from '@builder.io/qwik';

const technologies = [
  { name: 'Qwik', category: 'Frontend', icon: '⚡' },
  { name: 'Tailwind CSS', category: 'Styling', icon: '🎨' },
  { name: 'Three.js', category: '3D', icon: '🎭' },
  { name: 'Framer Motion', category: 'Animation', icon: '✨' },
  { name: 'Node.js', category: 'Backend', icon: '🔧' },
  { name: 'PostgreSQL', category: 'Database', icon: '🗄️' },
  { name: 'TensorFlow', category: 'ML', icon: '🤖' },
  { name: 'Cloudflare', category: 'Cloud', icon: '☁️' },
];

export default component$(() => {
  return (
    <section id="tech" class="relative bg-gray-50 py-20 lg:py-32 border-t border-gray-200">
      <div class="container mx-auto px-4">
        
        {/* Header */}
        <div class="mb-16 text-center">
          <h2 class="font-display text-4xl font-bold lg:text-5xl text-gray-900">
            Technology <span class="text-blue-600">Stack</span>
          </h2>
          <p class="mx-auto mt-4 max-w-xl text-gray-600">
            Built with the best tools and frameworks available in 2025
          </p>
        </div>

        {/* Tech Grid */}
        <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {technologies.map((tech) => (
            <div
              key={tech.name}
              class="flex items-center gap-3 rounded-lg border border-gray-200 bg-white p-4 shadow-sm hover:shadow-md transition-all"
            >
              <span class="text-2xl">{tech.icon}</span>
              <div>
                <div class="font-semibold text-gray-900">{tech.name}</div>
                <div class="text-xs text-gray-500">{tech.category}</div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
});
