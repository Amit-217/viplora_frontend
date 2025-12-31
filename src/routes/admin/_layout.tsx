import { component$, Slot } from "@builder.io/qwik";
import { Link } from "@builder.io/qwik-city";
import Sidebar from "./Sidebar";

export default component$(() => {
  return (
    <div class="min-h-screen bg-neutral-950 text-white flex">
      <Sidebar />

      <main class="flex-1 p-8 overflow-auto">
        <Slot />
      </main>
    </div>
  );
});
