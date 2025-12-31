import { component$, useStore, useVisibleTask$, $ } from "@builder.io/qwik";
import AdminLayout from "../AdminLayout";
import Navbar from "../Navbar";
import { CONSTANTS } from "../../../lib/constants";

const API_BASE = `${CONSTANTS.API_BASE_URL}/api/statistics/statistics`;

export default component$(() => {
  const store = useStore({
    no_of_clients: 0,
    no_of_projects: 0,
    no_of_years: 0,
    isAdmin: false,
    loading: false,
    popup: {
      open: false,
      message: "",
    },
  });

  const loadStats = $(async () => {
    try {
      store.loading = true;

      const res = await fetch(API_BASE);
      const data = await res.json();

      if (data.status === "success") {
        store.no_of_clients = data.data.no_of_clients;
        store.no_of_projects = data.data.no_of_projects;
        store.no_of_years = data.data.no_of_years;
      }
    } catch (err) {
      console.error("Stats load error:", err);
    } finally {
      store.loading = false;
    }
  });

  useVisibleTask$(() => {
    store.isAdmin = !!localStorage.getItem("admin_token");
    loadStats();
  });

  const updateStats = $(async () => {
    const token = localStorage.getItem("admin_token");

    if (!token) {
      store.popup = {
        open: true,
        message: "Unauthorized access detected.",
      };
      return;
    }

    await fetch(API_BASE, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        no_of_clients: store.no_of_clients,
        no_of_projects: store.no_of_projects,
        no_of_years: store.no_of_years,
      }),
    });

    store.popup = {
      open: true,
      message: "Statistics updated successfully",
    };
  });

  return (
    <AdminLayout>
      <div class="min-h-screen bg-[#000000] text-white font-sans p-6 lg:p-10">
        <Navbar title="Statistics" />

        <div class="max-w-7xl mx-auto mt-12">
          {!store.loading && store.isAdmin ? (
            <div class="max-w-2xl">
              <div class="bg-[#0a0a0a] border border-white/10 p-10 rounded-sm relative group">
                <div class="space-y-8">

                  <div>
                    <label class="block text-zinc-500 text-[10px] font-black uppercase tracking-widest mb-3">
                      Number of Clients
                    </label>
                    <input
                      type="number"
                      min="0"
                      class="w-full p-4 bg-zinc-900 text-white border border-white/5 focus:border-[#20DEFF] outline-none text-lg font-mono font-bold"
                      value={store.no_of_clients}
                      onInput$={(e) =>
                        (store.no_of_clients = Math.max(0, Number((e.target as HTMLInputElement).value)))
                      }
                    />
                  </div>

                  <div>
                    <label class="block text-zinc-500 text-[10px] font-black uppercase tracking-widest mb-3">
                      Number of Projects
                    </label>
                    <input
                      type="number"
                      min="0"
                      class="w-full p-4 bg-zinc-900 text-white border border-white/5 focus:border-[#20DEFF] outline-none text-lg font-mono font-bold"
                      value={store.no_of_projects}
                      onInput$={(e) =>
                        (store.no_of_projects = Math.max(0, Number((e.target as HTMLInputElement).value)))
                      }
                    />
                  </div>

                  <div>
                    <label class="block text-zinc-500 text-[10px] font-black uppercase tracking-widest mb-3">
                      Years of Experience
                    </label>
                    <input
                      type="number"
                      min="0"
                      class="w-full p-4 bg-zinc-900 text-white border border-white/5 focus:border-[#20DEFF] outline-none text-lg font-mono font-bold"
                      value={store.no_of_years}
                      onInput$={(e) =>
                        (store.no_of_years = Math.max(0, Number((e.target as HTMLInputElement).value)))
                      }
                    />
                  </div>
                </div>

                <button
                  class="w-full mt-12 bg-[#20DEFF] text-black font-black uppercase tracking-widest py-4 rounded-sm"
                  onClick$={updateStats}
                >
                  Save Statistics
                </button>
              </div>
            </div>
          ) : (
            !store.loading && (
              <p class="text-zinc-500 uppercase font-black text-xs">
                Access Denied
              </p>
            )
          )}
        </div>

        {store.popup.open && (
          <div class="fixed inset-0 bg-black/95 flex items-center justify-center z-[100]">
            <div class="bg-[#0a0a0a] p-10 border border-white/10 text-center">
              <p class="text-zinc-400 mb-6">{store.popup.message}</p>
              <button
                class="px-8 py-3 bg-[#20DEFF] text-black font-black text-xs uppercase"
                onClick$={() => (store.popup.open = false)}
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
});
