import {
  component$,
  useStore,
  useVisibleTask$,
} from "@builder.io/qwik";
import { Link } from "@builder.io/qwik-city";

import AdminLayout from "../AdminLayout";
import Navbar from "../Navbar";
import { CONSTANTS } from "../../../lib/constants";


const STATS_API = `${CONSTANTS.API_BASE_URL}/api/statistics/statistics`;
const APPLICATION_API = `${CONSTANTS.API_BASE_URL}/api/application/get`;
const CONTACT_API = `${CONSTANTS.API_BASE_URL}/api/contact/get`;

export default component$(() => {
  const store = useStore({
    stats: {
      no_of_clients: 0,
      no_of_projects: 0,
      no_of_years: 0,
    },
    applications: [] as any[],
    contacts: [] as any[],
  });

  useVisibleTask$(async () => {
    const token = localStorage.getItem("admin_token");
    if (!token) return;

    try {
      const statsRes = await fetch(STATS_API);
      const statsData = await statsRes.json();

      if (statsData.status === "success") {
        store.stats = statsData.data;
      }

      const appRes = await fetch(APPLICATION_API, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const appData = await appRes.json();
      store.applications = (appData.data || []).slice(0, 5);

      const contactRes = await fetch(CONTACT_API, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const contactData = await contactRes.json();
      store.contacts = (contactData.data || []).slice(0, 5);
    } catch (err) {
      console.error("Admin dashboard fetch error:", err);
    }
  });

  return (
    <AdminLayout>
      <div class="min-h-screen bg-black text-white font-sans p-6 lg:p-10">
        <Navbar title="System Overview" />

        <div class="max-w-7xl mx-auto mt-12">

          <div class="grid md:grid-cols-3 gap-6 mb-12">
            {[
              { label: "Number of Clients", value: store.stats.no_of_clients },
              { label: "Number of Projects", value: store.stats.no_of_projects },
              { label: "Years of Experience", value: store.stats.no_of_years },
            ].map((stat) => (
              <div
                key={stat.label}
                class="bg-[#0a0a0a] border border-white/10 p-8 rounded-sm hover:border-[#20DEFF]/40 transition-all relative group"
              >
                <div class="absolute top-0 right-0 w-4 h-4 border-t border-r border-[#20DEFF]/0 group-hover:border-[#20DEFF] transition-all"></div>

                <p class="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500 mb-3">
                  {stat.label}
                </p>
                <p class="text-4xl font-black text-[#20DEFF] tracking-tight">
                  {stat.value}
                </p>
              </div>
            ))}
          </div>

          <div class="grid lg:grid-cols-2 gap-8">

            <section class="bg-[#0a0a0a] border border-white/10 rounded-sm p-8 shadow-2xl">
              <div class="flex justify-between items-center mb-8 border-b border-white/5 pb-4">
                <h2 class="text-lg font-black uppercase tracking-tight">
                  Recent <span class="text-[#20DEFF]">Applications</span>
                </h2>
                <Link
                  href="/admin/applications"
                  class="text-[#20DEFF] text-[10px] font-black uppercase tracking-widest hover:text-white transition"
                >
                  [ VIEW ALL ]
                </Link>
              </div>

              <div class="space-y-3">
                {store.applications.map((a) => (
                  <div
                    key={a.id}
                    class="flex justify-between items-center bg-zinc-900/30 border border-white/5 p-4 rounded-sm hover:border-[#20DEFF]/30 transition"
                  >
                    <div class="min-w-0">
                      <p class="font-black text-sm uppercase tracking-tight truncate">
                        {a.user_name}
                      </p>
                      <p class="text-[10px] font-mono text-zinc-500 uppercase tracking-widest truncate">
                        {a.role_requested}
                      </p>
                    </div>

                    <span
                      class={`text-[9px] font-black uppercase px-2 py-1 border ${
                        a.status === "approved"
                          ? "text-emerald-400 border-emerald-500/30"
                          : a.status === "rejected"
                          ? "text-rose-500 border-rose-500/30"
                          : "text-amber-400 border-amber-500/30"
                      }`}
                    >
                      {a.status}
                    </span>
                  </div>
                ))}

                {store.applications.length === 0 && (
                  <p class="text-zinc-600 text-xs font-black uppercase tracking-widest">
                    No pending entries found.
                  </p>
                )}
              </div>
            </section>

            <section class="bg-[#0a0a0a] border border-white/10 rounded-sm p-8 shadow-2xl">
              <div class="flex justify-between items-center mb-8 border-b border-white/5 pb-4">
                <h2 class="text-lg font-black uppercase tracking-tight">
                  Latest <span class="text-[#20DEFF]">Messages</span>
                </h2>
                <Link
                  href="/admin/contact"
                  class="text-[#20DEFF] text-[10px] font-black uppercase tracking-widest hover:text-white transition"
                >
                  [ VIEW ALL ]
                </Link>
              </div>

              <div class="space-y-5">
                {store.contacts.map((c) => (
                  <div
                    key={c.id}
                    class="relative pl-4 border-l border-white/5 hover:border-[#20DEFF]/50 transition"
                  >
                    <p class="font-black text-sm uppercase tracking-tight">
                      {c.name}
                    </p>
                    <p class="text-[10px] font-mono text-zinc-500 mb-2">
                      {c.email}
                    </p>
                    <p class="text-[11px] text-zinc-400 line-clamp-1 bg-zinc-900/50 px-3 py-2 border border-white/5">
                      {c.subject || "NO SUBJECT"}
                    </p>
                  </div>
                ))}

                {store.contacts.length === 0 && (
                  <p class="text-zinc-600 text-xs font-black uppercase tracking-widest">
                    Inbox clear.
                  </p>
                )}
              </div>
            </section>

          </div>
        </div>
      </div>
    </AdminLayout>
  );
});
