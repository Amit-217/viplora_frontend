import AdminLayout from "../AdminLayout";
import Navbar from "../Navbar";
import { CONSTANTS } from "../../../lib/constants";

import {
  component$,
  useStore,
  $,
  useVisibleTask$,
} from "@builder.io/qwik";

const API_BASE = `${CONSTANTS.API_BASE_URL}/api/contact`;

export default component$(() => {
  const store = useStore({
    messages: [] as any[],
    loading: false,
    error: "",

    popup: {
      open: false,
      message: "",
      deleteId: null as number | null,
    },
  });

  const fetchMessages = $(async () => {
    try {
      store.loading = true;
      const token = localStorage.getItem("admin_token");
      if (!token) throw new Error("Unauthorized");

      const res = await fetch(`${API_BASE}/get`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = await res.json();
      if (data.status === "success") {
        store.messages = data.data;
      } else {
        store.error = data.message;
      }
    } catch {
      store.error = "Failed to load messages";
    } finally {
      store.loading = false;
    }
  });

  useVisibleTask$(() => {
    fetchMessages();
  });

  const deleteMessage = $((id: number) => {
    store.popup.open = true;
    store.popup.deleteId = id;
    store.popup.message =
      "Are you sure you want to delete this message? This action is permanent.";
  });

  const confirmDelete = $(async () => {
    try {
      const token = localStorage.getItem("admin_token");
      if (!token || !store.popup.deleteId) return;

      await fetch(`${API_BASE}/delete/${store.popup.deleteId}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });

      store.messages = store.messages.filter(
        (m) => m.id !== store.popup.deleteId
      );
    } finally {
      store.popup.open = false;
      store.popup.deleteId = null;
      store.popup.message = "";
    }
  });

  const formatDate = $((d?: string) =>
    d
      ? new Date(d).toLocaleString("en-US", {
          dateStyle: "medium",
          timeStyle: "short",
        })
      : ""
  );

  return (
    <AdminLayout>
      <div class="min-h-screen bg-[#000000] text-white font-sans p-6 lg:p-10">
        <Navbar title="Contact Messages" />

        <main class="max-w-7xl mx-auto mt-12">
          {/* TABLE */}
          <div class="bg-[#0a0a0a] border border-white/10 rounded-sm shadow-[0_0_40px_rgba(0,0,0,1)] overflow-hidden">
            <div class="overflow-x-auto">
              <table class="w-full text-sm border-collapse">
                <thead>
                  <tr class="bg-zinc-900/50 text-zinc-500 border-b border-white/10">
                    <th class="px-8 py-6 text-left text-[10px] font-black uppercase tracking-[0.2em]">
                      Sender
                    </th>
                    <th class="px-8 py-6 text-left text-[10px] font-black uppercase tracking-[0.2em]">
                      Contact Info
                    </th>
                    <th class="px-8 py-6 text-left text-[10px] font-black uppercase tracking-[0.2em]">
                      Subject
                    </th>
                    <th class="px-8 py-6 text-left text-[10px] font-black uppercase tracking-[0.2em]">
                      Timestamp
                    </th>
                    <th class="px-8 py-6 text-right text-[10px] font-black uppercase tracking-[0.2em]">
                      Actions
                    </th>
                  </tr>
                </thead>

                <tbody class="divide-y divide-white/5">
                  {store.messages.map((m) => (
                    <tr
                      key={m.id}
                      class="hover:bg-[#20DEFF]/[0.02] transition-colors group"
                    >
                      {/* NAME */}
                      <td class="px-8 py-6 font-black uppercase tracking-tight text-white group-hover:text-[#20DEFF] transition-colors">
                        {m.name}
                      </td>

                      {/* EMAIL */}
                      <td class="px-8 py-6 text-zinc-400 font-mono text-xs">
                        {m.email}
                      </td>

                      {/* SUBJECT */}
                      <td class="px-8 py-6 text-zinc-400">
                        <span class="border-l border-[#20DEFF] pl-3 line-clamp-1">
                          {m.subject || "No Subject"}
                        </span>
                      </td>

                      {/* DATE */}
                      <td class="px-8 py-6">
                        <span class="text-[10px] font-black text-zinc-500 uppercase tracking-widest bg-zinc-900 px-3 py-1 rounded-sm border border-white/5 inline-block">
                          {formatDate(m.created_at)}
                        </span>
                      </td>

                      <td class="px-8 py-6 text-right">
                        <div class="flex justify-end gap-4">
                          <button
                            onClick$={() => deleteMessage(m.id)}
                            class="
                              text-[10px]
                              font-black
                              uppercase
                              tracking-widest
                              text-zinc-600
                              hover:text-red-500
                              transition-colors
                            "
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>

                {store.messages.length === 0 && !store.loading && (
                  <tbody>
                    <tr>
                      <td
                        colSpan={5}
                        class="px-8 py-20 text-center text-zinc-600 font-black uppercase tracking-widest text-xs"
                      >
                        No incoming messages
                      </td>
                    </tr>
                  </tbody>
                )}
              </table>
            </div>
          </div>
        </main>

        {store.popup.open && (
          <div class="fixed inset-0 bg-black/95 backdrop-blur-sm flex items-center justify-center z-[100] p-4">
            <div class="bg-[#0a0a0a] p-10 border border-white/10 shadow-[0_0_60px_rgba(0,0,0,1)] w-full max-w-sm text-center">
              <h3 class="text-xl font-black text-white mb-4 uppercase tracking-tight">
                Delete Message?
              </h3>

              <p class="text-zinc-400 mb-8 text-sm leading-relaxed">
                {store.popup.message}
              </p>

              <div class="flex justify-center gap-6">
                <button
                  class="text-[10px] font-black uppercase tracking-widest text-zinc-500 hover:text-white transition"
                  onClick$={() => (store.popup.open = false)}
                >
                  Cancel
                </button>

                <button
                  class="px-8 py-3 bg-red-600 text-white font-black text-xs uppercase tracking-widest hover:bg-red-700 transition"
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
