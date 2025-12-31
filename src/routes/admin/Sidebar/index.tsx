import { component$ } from "@builder.io/qwik";
import { useLocation } from "@builder.io/qwik-city";

export default component$(() => {
  const loc = useLocation();

  const links = [
    { name: "Dashboard", href: "/admin/dashboard/" },
    { name: "Services", href: "/admin/services/" },
    { name: "Projects", href: "/admin/projects/" },
    { name: "Applications", href: "/admin/applications/" },
    { name: "Contact Messages", href: "/admin/contact/" },
    { name: "Statistics", href: "/admin/stats/" },
  ];

  return (
<aside class="w-[260px] bg-neutral-950 border-r border-neutral-800/40 px-6 pt-10 pb-6 shrink-0">
<h2 class="text-3xl font-black text-white leading-none -mt-1">
        VIPLORA
      </h2>

      <nav class="space-y-1 mt-10">
        {links.map((item) => {
          const active = loc.url.pathname.startsWith(item.href);

          return (
            <a
              key={item.href}
              href={item.href}
              class={`flex px-4 py-3 rounded-xl text-sm font-medium transition-all
                ${
                  active
                    ? "bg-primary-500/10 text-primary-500 border border-primary-500/20"
                    : "text-neutral-400 hover:bg-white/5 hover:text-white"
                }`}
            >
              {item.name}
            </a>
          );
        })}
      </nav>
    </aside>
  );
});
