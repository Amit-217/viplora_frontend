import { component$ } from "@builder.io/qwik";

interface NavbarProps {
  title: string;
  rightSlot?: boolean;
}

export default component$<NavbarProps>(({ title }) => {
  const today = new Date().toDateString().toUpperCase();

  return (
    <header
      class="
        flex items-center justify-between
        pt-0
        pb-4
        mb-8
        border-b border-white/10
      "
    >
      <div class="flex items-center gap-4">
        <span class="w-1 h-7 bg-[#20DEFF]"></span>
        <h1 class="text-3xl font-black text-white uppercase tracking-tight">
          {title}
        </h1>
      </div>

      <div class="flex items-center gap-8">
        <span class="hidden md:block text-[11px] font-semibold text-zinc-500 tracking-widest">
          {today}
        </span>

        <div
          class="
            w-10 h-10 rounded-sm
            bg-zinc-900
            flex items-center justify-center
            text-xs font-black text-[#20DEFF]
            border border-white/10
            hover:border-[#20DEFF]/50 transition-colors
            cursor-pointer
          "
        >
          A
        </div>
      </div>
    </header>
  );
});
