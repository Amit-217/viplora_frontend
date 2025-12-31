import { component$, useSignal } from '@builder.io/qwik';

export default component$(() => {
  const activeTab = useSignal(0);

  const tabs = [
    {
      title: 'Performance',
      icon: '⚡',
      content: 'Lightning-fast load times with sub-50ms global TTFB',
    },
    {
      title: 'Scalability',
      icon: '📈',
      content: 'Handles from 1 to 1M users without code changes',
    },
    {
      title: 'Security',
      icon: '🔒',
      content: 'Enterprise-grade security with automatic DDoS protection',
    },
    {
      title: 'Analytics',
      icon: '📊',
      content: 'Real-time insights into user behavior and conversions',
    },
  ];

  return (
    <section class="relative bg-neutral-950 py-20 lg:py-32">
      <div class="container mx-auto px-4">
        <div class="mb-12 text-center">
          <h2 class="font-display text-4xl font-bold lg:text-5xl">
            Why Choose <span class="text-gradient">Viplora</span>
          </h2>
        </div>

        {/* Tabs */}
        <div class="mx-auto max-w-2xl">
          <div class="mb-8 flex gap-2">
            {tabs.map((tab, idx) => (
              <button
                key={idx}
                onClick$={() => (activeTab.value = idx)}
                class={`flex-1 rounded-lg py-3 text-center font-semibold transition-all ${
                  activeTab.value === idx
                    ? 'bg-primary-500 text-white'
                    : 'bg-neutral-900 text-neutral-300 hover:bg-neutral-800'
                }`}
              >
                <span class="text-lg">{tab.icon}</span>
                <div class="text-xs sm:text-sm">{tab.title}</div>
              </button>
            ))}
          </div>

          {/* Content */}
          <div class="rounded-lg border border-neutral-800 bg-neutral-900/50 p-8 backdrop-blur-sm">
            <div class="text-center">
              <div class="mb-4 text-5xl">{tabs[activeTab.value].icon}</div>
              <h3 class="font-display text-2xl font-bold">{tabs[activeTab.value].title}</h3>
              <p class="mt-4 text-neutral-300">{tabs[activeTab.value].content}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
});