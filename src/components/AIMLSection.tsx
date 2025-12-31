import { component$ } from '@builder.io/qwik';

export default component$(() => {
  return (
    <section id="aiml" class="relative bg-black py-20 lg:py-32">
      {/* Background */}
      <div class="absolute inset-0 -z-10">
        <div class="absolute bottom-0 left-1/4 h-96 w-96 rounded-full bg-secondary-500/20 blur-3xl opacity-20" />
      </div>

      <div class="container mx-auto px-4">
        {/* Header */}
        <div class="mb-16 text-center">
          <h2 class="font-display text-4xl font-bold lg:text-5xl">
            AI/ML <span class="text-gradient">Capabilities</span>
          </h2>
          <p class="mx-auto mt-4 max-w-xl text-neutral-400">
            Powered by state-of-the-art machine learning and artificial intelligence
          </p>
        </div>

        {/* Features Grid */}
        <div class="grid gap-8 lg:grid-cols-2">
          {[
            {
              title: 'Predictive Analytics',
              description: 'Forecast trends and user behavior with advanced ML models',
              icon: '📈',
            },
            {
              title: 'Natural Language Processing',
              description: 'Understand and process human language with precision',
              icon: '💬',
            },
            {
              title: 'Computer Vision',
              description: 'Advanced image and video analysis capabilities',
              icon: '👁️',
            },
            {
              title: 'Recommendation Engine',
              description: 'Personalized recommendations powered by collaborative filtering',
              icon: '🎯',
            },
          ].map((feature, idx) => (
            <div
              key={idx}
              class="flex gap-4 rounded-lg border border-neutral-800 bg-neutral-900/50 p-6 backdrop-blur-sm"
            >
              <div class="text-4xl">{feature.icon}</div>
              <div>
                <h3 class="font-semibold">{feature.title}</h3>
                <p class="mt-2 text-sm text-neutral-400">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
});