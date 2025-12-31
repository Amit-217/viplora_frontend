import { component$, Slot } from "@builder.io/qwik";
import Sidebar from "../Sidebar";


export default component$(() => {
  return (
    <div
      class="min-h-screen bg-[#000000] text-zinc-200 flex font-sans"
      role="application"
      aria-label="Admin dashboard layout"
    >
      <aside
        class="shrink-0"
        role="navigation"
        aria-label="Admin sidebar navigation"
      >
        <Sidebar />
      </aside>

      <main
        class="flex-1 min-w-0 overflow-auto"
        role="main"
        aria-label="Admin main content"
      >
        <Slot />
      </main>
    </div>
  );
});
