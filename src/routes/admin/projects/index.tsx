import AdminLayout from "../AdminLayout";
import Navbar from "../Navbar";
import { CONSTANTS } from "../../../lib/constants";


import {
  component$,
  useStore,
  useVisibleTask$,
  $,
} from "@builder.io/qwik";

 const API_BASE = `${CONSTANTS.API_BASE_URL}/api/projects`;

export default component$(() => {
  const store = useStore({
    projects: [] as any[],
    loading: false,
    error: "",

    modal: {
      open: false,
      mode: "add" as "add" | "edit",
      id: null as number | null,
      title: "",
      category: "",
      description: "",
      video_url: "",
      project_link: "",
    },

    deletePopup: {
      open: false,
      id: null as number | null,
    },
  });

  useVisibleTask$(async () => {
    store.loading = true;
    try {
      const res = await fetch(`${API_BASE}/get_all`);
      const data = await res.json();
      store.projects = data.projects?.results || data.projects || [];
    } catch {
      store.error = "Failed to load projects";
    } finally {
      store.loading = false;
    }
  });

  const openAdd = $(() => {
    store.modal = {
      open: true,
      mode: "add",
      id: null,
      title: "",
      category: "",
      description: "",
      video_url: "",
      project_link: "",
    };
  });

  const openEdit = $((p: any) => {
    store.modal = {
      open: true,
      mode: "edit",
      id: p.id,
      title: p.title,
      category: p.category,
      description: p.description,
      video_url: p.video_url,
      project_link: p.project_link,
    };
  });

  const saveProject = $(async () => {
    const token = localStorage.getItem("admin_token");
    if (!token || !store.modal.title) return;

    const url =
      store.modal.mode === "add"
        ? `${API_BASE}/add`
        : `${API_BASE}/update/${store.modal.id}`;

    const method = store.modal.mode === "add" ? "POST" : "PUT";

    await fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(store.modal),
    });

    const res = await fetch(API_BASE);
    const data = await res.json();
    store.projects = data.projects?.results || data.projects || [];
    store.modal.open = false;
  });

  const deleteProject = $((id: number) => {
    store.deletePopup.open = true;
    store.deletePopup.id = id;
  });

  const confirmDelete = $(async () => {
    const token = localStorage.getItem("admin_token");
    if (!token || !store.deletePopup.id) return;

    await fetch(`${API_BASE}/delete/${store.deletePopup.id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });

    store.projects = store.projects.filter(
      (p) => p.id !== store.deletePopup.id
    );

    store.deletePopup.open = false;
    store.deletePopup.id = null;
  });

  return (
    <AdminLayout>
      <style>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { scrollbar-width: none; }
      `}</style>

      <div class="min-h-screen bg-black text-white font-sans p-6 lg:p-10">
        <Navbar title="Projects" />

        <div class="max-w-7xl mx-auto mt-12">
          {/* ADD BUTTON */}
          <div class="flex justify-end mb-8">
            <button
              onClick$={openAdd}
              class="px-8 py-3 bg-[#20DEFF] text-black font-black uppercase tracking-widest text-xs rounded-sm hover:bg-white transition-all"
            >
              Add Project
            </button>
          </div>

          {/* GRID */}
          <div class="grid gap-6 lg:grid-cols-2 xl:grid-cols-3">
            {store.projects.map((p) => (
              <div
                key={p.id}
                class="bg-[#0a0a0a] border border-white/10 p-6 rounded-sm hover:border-[#20DEFF]/40 transition-all flex flex-col h-[380px]"
              >
                <div class="flex-grow overflow-hidden flex flex-col">
                  <h3 class="text-xl font-black uppercase mb-2 tracking-tight">
                    {p.title}
                  </h3>

                  <p class="text-[#20DEFF]/80 text-[10px] font-black uppercase tracking-[0.2em] mb-3 border-b border-white/10 pb-2 font-mono">
                    {p.category || "Core Development"}
                  </p>

                  {/* DESCRIPTION */}
                  <div class="flex-grow overflow-y-auto no-scrollbar">
                    <p class="text-zinc-400 text-sm leading-relaxed whitespace-pre-wrap">
                      {p.description}
                    </p>
                  </div>

                  {/* LINKS */}
                  <div class="mt-3 flex flex-col gap-1">
                    {p.video_url && (
                      <a
                        href={p.video_url}
                        target="_blank"
                        class="text-[10px] font-black uppercase tracking-widest text-[#20DEFF] hover:text-white transition flex items-center gap-2"
                      >
                        <span class="w-1.5 h-1.5 rounded-full bg-[#20DEFF]"></span>
                        Watch Demo
                      </a>
                    )}

                    {p.project_link && (
                      <a
                        href={p.project_link}
                        target="_blank"
                        class="text-[10px] font-black uppercase tracking-widest text-[#20DEFF] hover:text-white transition flex items-center gap-2"
                      >
                        <span class="w-1.5 h-1.5 rounded-full bg-[#20DEFF]"></span>
                        Live Project
                      </a>
                    )}
                  </div>
                </div>

                {/* ACTIONS */}
                <div class="mt-4 pt-4 border-t border-white/5 flex gap-4">
                  <button
                    onClick$={() => openEdit(p)}
                    class="flex-1 text-[10px] font-black uppercase tracking-widest text-[#20DEFF] hover:text-white transition"
                  >
                    Edit
                  </button>

                  <button
                    onClick$={() => deleteProject(p.id)}
                    class="flex-1 text-[10px] font-black uppercase tracking-widest text-zinc-600 hover:text-red-500 transition"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        
{store.modal.open && (
  <div class="fixed inset-0 bg-black/95 backdrop-blur-sm flex items-center justify-center z-50 p-4">
    <div class="bg-[#0a0a0a] border border-white/10 p-8 w-full max-w-lg">
      <h3 class="text-xl font-black uppercase mb-6 text-[#20DEFF]">
        {store.modal.mode === "add" ? "Add Project" : "Edit Project"}
      </h3>

      <div class="space-y-4">
        <input
          placeholder="Project Title"
          class="w-full p-3 bg-zinc-900 border border-white/10 text-white"
          value={store.modal.title}
          onInput$={(e) =>
            (store.modal.title = (e.target as HTMLInputElement).value)
          }
        />

        <input
          placeholder="Category"
          class="w-full p-3 bg-zinc-900 border border-white/10 text-white"
          value={store.modal.category}
          onInput$={(e) =>
            (store.modal.category = (e.target as HTMLInputElement).value)
          }
        />

        <textarea
          placeholder="Description"
          rows={4}
          class="w-full p-3 bg-zinc-900 border border-white/10 text-white"
          value={store.modal.description}
          onInput$={(e) =>
            (store.modal.description = (e.target as HTMLTextAreaElement).value)
          }
        />

        <input
          placeholder="Video URL"
          class="w-full p-3 bg-zinc-900 border border-white/10 text-white"
          value={store.modal.video_url}
          onInput$={(e) =>
            (store.modal.video_url = (e.target as HTMLInputElement).value)
          }
        />

        <input
          placeholder="Project Link"
          class="w-full p-3 bg-zinc-900 border border-white/10 text-white"
          value={store.modal.project_link}
          onInput$={(e) =>
            (store.modal.project_link = (e.target as HTMLInputElement).value)
          }
        />
      </div>

      <div class="mt-8 flex justify-end gap-4">
        <button
          class="text-zinc-500 uppercase text-xs font-black"
          onClick$={() => (store.modal.open = false)}
        >
          Cancel
        </button>

        <button
          class="px-6 py-3 bg-[#20DEFF] text-black font-black uppercase text-xs"
          onClick$={saveProject}
        >
          Save
        </button>
      </div>
    </div>
  </div>
)}


        {store.deletePopup.open && (
          <div class="fixed inset-0 bg-black/95 backdrop-blur-sm flex items-center justify-center z-50">
            <div class="bg-[#0a0a0a] p-8 border border-white/10 max-w-sm text-center">
              <h3 class="text-lg font-black uppercase mb-4">
                Delete Project?
              </h3>
              <div class="flex justify-center gap-6">
                <button
                  class="text-[10px] font-black uppercase text-zinc-500"
                  onClick$={() => (store.deletePopup.open = false)}
                >
                  Cancel
                </button>
                <button
                  class="px-6 py-2 bg-red-600 text-white font-black uppercase text-xs"
                  onClick$={confirmDelete}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
});
