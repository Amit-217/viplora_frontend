import {
  component$,
  useStore,
  useSignal,
  useVisibleTask$,
  $,
} from "@builder.io/qwik";

import AdminLayout from "../AdminLayout";
import Navbar from "../Navbar";
import { CONSTANTS } from "../../../lib/constants";


const API_BASE = `${CONSTANTS.API_BASE_URL}/api/application`;

const getAdminHeaders = () => ({
  "Content-Type": "application/json",
  Authorization: `Bearer ${localStorage.getItem("admin_token")}`,
});

export default component$(() => {
  const store = useStore({
    applications: [] as any[],

    modal: {
      open: false,
      id: null as number | null,
      status: "pending",
      admin_comment: "",
    },

    submitModal: {
      open: false,
      user_name: "",
      phone: "",
      email: "",
      role_requested: "",
      additional_info: "",
      loading: false,
    },
  });

  const loadApplications = $(async () => {
    try {
      const res = await fetch(`${API_BASE}/get`, {
        headers: getAdminHeaders(),
      });

      if (!res.ok) {
        alert("Unauthorized or API error");
        return;
      }

      const data = await res.json();
      store.applications = data.data;
    } catch (err) {
      console.error("LOAD ERROR:", err);
    }
  });

  useVisibleTask$(() => {
    loadApplications();
  });

  const openReview = $((a: any) => {
    store.modal.open = true;
    store.modal.id = a.id;
    store.modal.status = a.status;
    store.modal.admin_comment = a.admin_comment || "";
  });

  const saveReview = $(async () => {
    try {
      const res = await fetch(`${API_BASE}/update/${store.modal.id}`, {
        method: "PUT",
        headers: getAdminHeaders(),
        body: JSON.stringify({
          status: store.modal.status,
          admin_comment: store.modal.admin_comment,
          reviewed_by: "Admin",
        }),
      });

      if (!res.ok) {
        alert("Update failed");
        return;
      }

      const app = store.applications.find(
        (a) => a.id === store.modal.id
      );
      if (app) {
        app.status = store.modal.status;
        app.admin_comment = store.modal.admin_comment;
        app.reviewed_by = "Admin";
      }

      store.modal.open = false;
    } catch (err) {
      console.error("UPDATE ERROR:", err);
    }
  });

  const deleteModal = useSignal<number | null>(null);

  const confirmDelete = $(async () => {
    try {
      const res = await fetch(`${API_BASE}/delete/${deleteModal.value}`, {
        method: "DELETE",
        headers: getAdminHeaders(),
      });

      if (!res.ok) {
        alert("Delete failed");
        return;
      }

      store.applications = store.applications.filter(
        (a) => a.id !== deleteModal.value
      );
      deleteModal.value = null;
    } catch (err) {
      console.error("DELETE ERROR:", err);
    }
  });

  return (
    <AdminLayout>
      <div class="min-h-screen bg-black text-white font-sans p-6 lg:p-10">
        <Navbar title="Applications" />

        <div class="max-w-7xl mx-auto mt-12">
          {/* GRID */}
          <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {store.applications.map((a) => (
              <div
                key={a.id}
                class="
                  bg-[#0a0a0a]
                  border border-white/10
                  p-8
                  rounded-sm
                  hover:border-[#20DEFF]/40
                  transition-all
                  duration-300
                  flex flex-col
                "
              >
                {/* HEADER */}
                <div class="flex items-start gap-5 mb-8">
                  <div
                    class="
                      w-14 h-14
                      bg-zinc-900
                      border border-white/5
                      flex items-center justify-center
                      text-[#20DEFF]
                      font-black text-xl
                      shadow-inner
                    "
                  >
                    {a.user_name.charAt(0)}
                  </div>

                  <div class="min-w-0">
                    <h3 class="text-lg font-black uppercase tracking-tight mb-1">
                      {a.user_name}
                    </h3>
                    <p class="text-[10px] text-zinc-500 font-semibold uppercase tracking-widest truncate">
                      {a.email || "No Email"}
                    </p>
                  </div>
                </div>

                {/* CONTENT */}
                <div class="space-y-4 flex-grow mb-8">
                  <div class="bg-zinc-900/50 p-4 border-l-2 border-[#20DEFF]">
                    <p class="text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-1">
                      Role
                    </p>
                    <p class="text-sm font-semibold uppercase">
                      {a.role_requested}
                    </p>
                  </div>

                  <p class="text-zinc-500 text-sm leading-relaxed line-clamp-3">
                    {a.additional_info || "No additional info provided"}
                  </p>
                </div>

                {/* FOOTER */}
                <div class="flex items-center justify-between pt-6 border-t border-white/5">
                  <div
                    class={`flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest ${
                      a.status === "approved"
                        ? "text-emerald-400"
                        : a.status === "rejected"
                        ? "text-red-500"
                        : "text-yellow-400"
                    }`}
                  >
                    <span class="w-1.5 h-1.5 rounded-full bg-current"></span>
                    {a.status}
                  </div>

                  <div class="flex gap-4">
                    <button
                      class="text-[10px] font-bold uppercase tracking-widest text-[#20DEFF] hover:text-white transition"
                      onClick$={() => openReview(a)}
                    >
                      Review
                    </button>
                    <button
                      class="text-[10px] font-bold uppercase tracking-widest text-zinc-600 hover:text-red-500 transition"
                      onClick$={() => (deleteModal.value = a.id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* REVIEW MODAL */}
        {store.modal.open && (
          <div class="fixed inset-0 bg-black/95 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div class="bg-[#0a0a0a] p-10 border border-white/10 w-full max-w-xl">
              <h2 class="text-2xl font-black text-[#20DEFF] mb-8 uppercase border-b border-white/5 pb-4">
                Review Application
              </h2>

              <div class="space-y-6">
                <div>
                  <label class="block text-zinc-500 text-[10px] font-bold uppercase tracking-widest mb-3">
                    Status
                  </label>
                  <select
                    class="w-full p-4 bg-zinc-900 border border-white/5 text-white uppercase text-xs font-semibold focus:border-[#20DEFF] outline-none"
                    value={store.modal.status}
                    onInput$={(e) =>
                      (store.modal.status = (e.target as HTMLSelectElement).value)
                    }
                  >
                    <option value="approved">Approve</option>
                    <option value="rejected">Reject</option>
                    <option value="pending">Pending</option>
                  </select>
                </div>

                <div>
                  <label class="block text-zinc-500 text-[10px] font-bold uppercase tracking-widest mb-3">
                    Admin Comment
                  </label>
                  <textarea
                    class="w-full p-4 bg-zinc-900 border border-white/5 text-white resize-none text-sm focus:border-[#20DEFF] outline-none"
                    rows={4}
                    value={store.modal.admin_comment}
                    onInput$={(e) =>
                      (store.modal.admin_comment = (e.target as HTMLTextAreaElement).value)
                    }
                  />
                </div>
              </div>

              <div class="mt-10 flex justify-end gap-6">
                <button
                  class="text-[10px] font-bold uppercase tracking-widest text-zinc-500 hover:text-white"
                  onClick$={() => (store.modal.open = false)}
                >
                  Close
                </button>
                <button
                  class="px-8 py-3 bg-[#20DEFF] text-black font-black text-xs uppercase tracking-widest"
                  onClick$={saveReview}
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        )}

        {/* DELETE CONFIRM */}
        {deleteModal.value && (
          <div class="fixed inset-0 bg-black/95 flex items-center justify-center z-[70]">
            <div class="bg-[#0a0a0a] p-10 border border-white/10 w-full max-w-sm text-center">
              <h3 class="text-xl font-black uppercase tracking-tight mb-4">
                Delete application?
              </h3>
              <div class="flex justify-center gap-6 mt-8">
                <button
                  class="text-[10px] font-bold uppercase tracking-widest text-zinc-500 hover:text-white"
                  onClick$={() => (deleteModal.value = null)}
                >
                  No
                </button>
                <button
                  class="px-8 py-3 bg-red-600 text-white font-black text-xs uppercase tracking-widest hover:bg-red-700"
                  onClick$={confirmDelete}
                >
                  Yes
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
});
