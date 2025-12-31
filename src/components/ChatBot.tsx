import { component$, useSignal } from '@builder.io/qwik';

export default component$(() => {
  const isOpen = useSignal(false);

  return (
    <div class="fixed bottom-24 right-6 z-40">
      {isOpen.value ? (
        <div
          id="viplora-chatbot"
          role="dialog"
          aria-label="Viplora AI Assistant Chat"
          class="
            flex h-[520px] w-[380px] flex-col
            rounded-2xl
            border border-[#20DEFF]/40
            bg-[#0E0E12]
            shadow-2xl shadow-[#20DEFF]/20
            overflow-hidden
          "
        >
          {/* HEADER */}
          <div
            class="
              flex items-center justify-between
              px-4 py-3
              bg-gradient-to-r from-[#0E0E12] to-[#111827]
              border-b border-[#20DEFF]/30
            "
          >
            <h3 class="font-semibold text-[#20DEFF] tracking-wide">
              Viplora AI Assistant
            </h3>

            <button
              onClick$={() => (isOpen.value = false)}
              aria-label="Close chat"
              class="
                text-neutral-400 hover:text-white
                transition-colors text-lg
              "
            >
              ✕
            </button>
          </div>

          {/* BOTPRESS CHATBOT */}
          <iframe
            src="https://cdn.botpress.cloud/webchat/v3.5/shareable.html?configUrl=https://files.bpcontent.cloud/2025/12/20/15/20251220151834-JJF0YHX3.json"
            class="flex-1 w-full border-none bg-transparent"
            loading="lazy"
            title="Viplora AI Assistant Chatbot"
            aria-hidden="false"
          />
        </div>
      ) : (
        <button
          onClick$={() => (isOpen.value = true)}
          aria-label="Open chat"
          aria-expanded="false"
          aria-controls="viplora-chatbot"
          class="
            flex h-14 w-14 items-center justify-center
            rounded-full
            bg-gradient-to-r from-[#20DEFF] to-[#3B82F6]
            text-2xl text-black
            shadow-lg shadow-[#20DEFF]/40
            hover:scale-105 hover:shadow-2xl
            transition-all
          "
        >
          💬
        </button>
      )}
    </div>
  );
});
