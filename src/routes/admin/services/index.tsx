import AdminLayout from "../AdminLayout";
import Navbar from "../Navbar";
import { CONSTANTS } from "../../../lib/constants";



import {
  component$,
  useStore,
  useVisibleTask$,
  $,
} from "@builder.io/qwik";

const API_BASE = `${CONSTANTS.API_BASE_URL}/api/services`;

export default component$(() => {
  const store = useStore({
    services: [] as any[],
    loading: false,
    error: "",

    modal: {
      open: false,
      mode: "add" as "add" | "edit",
      id: null as number | null,
      title: "",
      short_description: "",
      description: "",
    },

    popup: {
      open: false,
      type: "info" as "info" | "error" | "confirm" | "success",
      message: "",
      onConfirm: null as null | (() => void),
    },
  });

  useVisibleTask$(async () => {
    const token = localStorage.getItem("admin_token");
    if (!token) {
      store.error = "Unauthorized";
      return;
    }

    store.loading = true;
    try {
      const res = await fetch(`${API_BASE}/get_all`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      store.services = data.services?.results || data.services || [];
    } catch {
      store.error = "Server error";
    } finally {
      store.loading = false;
    }
  });

  const saveService = $(async () => {
    if (!store.modal.title || !store.modal.description) {
      store.popup = {
        open: true,
        type: "error",
        message: "Title and Description are required",
        onConfirm: null,
      };
      return;
    }

    const token = localStorage.getItem("admin_token");
    if (!token) return;

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
      body: JSON.stringify({
        title: store.modal.title,
        short_description: store.modal.short_description,
        description: store.modal.description,
        icon_url: "",
      }),
    });

    const res = await fetch(`${API_BASE}/get_all`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await res.json();
    store.services = data.services?.results || data.services || [];
    store.modal.open = false;

    store.popup = {
      open: true,
      type: "success",
      message: "Service saved successfully",
      onConfirm: null,
    };
  });

  const deleteService = $((id: number) => {
    store.popup = {
      open: true,
      type: "confirm",
      message: "Are you sure you want to delete this service?",
      onConfirm: async () => {
        const token = localStorage.getItem("admin_token");
        if (!token) return;

        await fetch(`${API_BASE}/delete/${id}`, {
          method: "DELETE",
          headers: { Authorization: `Bearer ${token}` },
        });

        store.services = store.services.filter((s) => s.id !== id);
      },
    };
  });

  const toggleService = $(async (id: number) => {
    const token = localStorage.getItem("admin_token");
    if (!token) return;

    await fetch(`${API_BASE}/toggle/${id}`, {
      method: "PATCH",
      headers: { Authorization: `Bearer ${token}` },
    });

    const s = store.services.find((x) => x.id === id);
    if (s) s.is_active = !s.is_active;
  });

  const openAdd = $(() => {
    store.modal = {
      open: true,
      mode: "add",
      id: null,
      title: "",
      short_description: "",
      description: "",
    };
  });

  const openEdit = $((s: any) => {
    store.modal = {
      open: true,
      mode: "edit",
      id: s.id,
      title: s.title,
      short_description: s.short_description,
      description: s.description,
    };
  });

  return (
    <AdminLayout>
      <style>{`
        .no-scrollbar::-webkit-scrollbar {
          width: 0px;
          height: 0px;
        }
        .no-scrollbar {
          scrollbar-width: none;
          -ms-overflow-style: none;
        }
      `}</style>

      <div class="min-h-screen bg-[#000000] text-white font-sans p-6 lg:p-10">
        <Navbar title="Services" />

        <div class="max-w-7xl mx-auto">
          {/* ADD BUTTON */}
          <div class="flex justify-end mb-8">
            <button
              class="px-8 py-3 bg-[#20DEFF] text-black font-black text-xs uppercase tracking-widest transition active:scale-95"
              onClick$={openAdd}
            >
              Add Service
            </button>
          </div>

          {/* SERVICE GRID */}
          <div class="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {store.services.map((s) => (
              <div
                key={s.id}
                class="bg-[#0a0a0a] border border-white/10 p-8 rounded-sm hover:border-[#20DEFF]/40 transition flex flex-col h-[450px]"
              >
                <h3 class="text-xl font-black uppercase text-white mb-2">
                  {s.title}
                </h3>

                <p class="text-[#20DEFF]/80 text-[10px] font-black uppercase tracking-[0.2em] mb-4 border-b border-white/10 pb-2">
                  {s.short_description || "Service Category"}
                </p>

                <div class="flex-grow overflow-y-auto no-scrollbar">
                  <p class="text-zinc-400 text-sm leading-relaxed whitespace-pre-wrap">
                    {s.description}
                  </p>
                </div>

                {/* FOOTER */}
                <div class="mt-8 flex justify-between items-center pt-6 border-t border-white/5">
                  <button
                    class={`text-[10px] font-black uppercase tracking-widest ${
                      s.is_active ? "text-emerald-400" : "text-amber-400"
                    }`}
                    onClick$={() => toggleService(s.id)}
                  >
                    {s.is_active ? "Active" : "Inactive"}
                  </button>

                  <div class="flex gap-4">
                    <button
                      class="text-[10px] font-black uppercase tracking-widest text-[#20DEFF] hover:text-white"
                      onClick$={() => openEdit(s)}
                    >
                      Edit
                    </button>
                    <button
                      class="text-[10px] font-black uppercase tracking-widest text-zinc-600 hover:text-red-500"
                      onClick$={() => deleteService(s.id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ADD / EDIT MODAL */}
        {store.modal.open && (
          <div class="fixed inset-0 bg-black/95 flex items-center justify-center z-50 p-4">
            <div class="bg-[#0a0a0a] p-10 border border-white/10 w-full max-w-xl">
              <h2 class="text-2xl font-black uppercase text-[#20DEFF] mb-6">
                {store.modal.mode === "add" ? "Add Service" : "Edit Service"}
              </h2>

              <div class="space-y-4">
                <input
                  class="w-full p-4 bg-zinc-900 text-white border border-white/5 focus:border-[#20DEFF] outline-none text-sm"
                  placeholder="TITLE"
                  value={store.modal.title}
                  onInput$={(e) =>
                    (store.modal.title = (e.target as HTMLInputElement).value)
                  }
                />
                <input
                  class="w-full p-4 bg-zinc-900 text-white border border-white/5 focus:border-[#20DEFF] outline-none text-sm"
                  placeholder="SUMMARY"
                  value={store.modal.short_description}
                  onInput$={(e) =>
                    (store.modal.short_description = (e.target as HTMLInputElement).value)
                  }
                />
                <textarea
                  rows={4}
                  class="w-full p-4 bg-zinc-900 text-white border border-white/5 focus:border-[#20DEFF] outline-none resize-none text-sm"
                  placeholder="DESCRIPTION"
                  value={store.modal.description}
                  onInput$={(e) =>
                    (store.modal.description = (e.target as HTMLTextAreaElement).value)
                  }
                />
              </div>

              <div class="mt-8 flex justify-end gap-6">
                <button
                  class="text-[10px] font-black uppercase tracking-widest text-zinc-500 hover:text-white"
                  onClick$={() => (store.modal.open = false)}
                >
                  Cancel
                </button>
                <button
                  class="px-8 py-3 bg-[#20DEFF] text-black font-black text-xs uppercase tracking-widest"
                  onClick$={saveService}
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        )}

        {/* CONFIRM POPUP */}
        {store.popup.open && (
          <div class="fixed inset-0 bg-black/95 flex items-center justify-center z-[70]">
            <div class="bg-[#0a0a0a] p-10 border border-white/10 w-full max-w-sm text-center">
              <p class="text-zinc-400 mb-8">{store.popup.message}</p>
              <div class="flex justify-center gap-6">
                <button
                  class="text-[10px] font-black uppercase tracking-widest text-zinc-500 hover:text-white"
                  onClick$={() => (store.popup.open = false)}
                >
                  Cancel
                </button>
                {store.popup.type === "confirm" && (
                  <button
                    class="px-8 py-3 bg-red-600 text-white font-black text-xs uppercase tracking-widest"
                    onClick$={() => {
                      store.popup.onConfirm?.();
                      store.popup.open = false;
                    }}
                  >
                    Delete
                  </button>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
});
