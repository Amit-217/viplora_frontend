import { component$ } from "@builder.io/qwik";

export default component$(() => {
  return (
    <div class="space-y-8">
      <h1 class="text-4xl font-bold">Admin Dashboard</h1>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <a href="/admin/projects" class="p-6 bg-neutral-900 rounded-2xl border border-neutral-800 hover:scale-[1.02] transition">
          <h3 class="text-xl font-semibold">Projects</h3>
          <p class="text-neutral-400 mt-2">Manage portfolio projects</p>
        </a>

        <a href="/admin/services" class="p-6 bg-neutral-900 rounded-2xl border border-neutral-800 hover:scale-[1.02] transition">
          <h3 class="text-xl font-semibold">Services</h3>
          <p class="text-neutral-400 mt-2">Add / update / toggle services</p>
        </a>

        <a href="/admin/applications" class="p-6 bg-neutral-900 rounded-2xl border border-neutral-800 hover:scale-[1.02] transition">
          <h3 class="text-xl font-semibold">Applications</h3>
          <p class="text-neutral-400 mt-2">Review and update applications</p>
        </a>

        <a href="/admin/contact" class="p-6 bg-neutral-900 rounded-2xl border border-neutral-800 hover:scale-[1.02] transition">
          <h3 class="text-xl font-semibold">Contact Messages</h3>
          <p class="text-neutral-400 mt-2">View and delete messages</p>
        </a>
      </div>
    </div>
  );
});
