import { component$, useSignal, useVisibleTask$ } from '@builder.io/qwik';
import { Link, useLocation } from '@builder.io/qwik-city';

export default component$(() => {
  const isScrolled = useSignal(false);
  const isMobileMenuOpen = useSignal(false);
  const showTermsMenu = useSignal(false);

  const location = useLocation();

  useVisibleTask$(() => {
    const handleScroll = () => {
      isScrolled.value = window.scrollY > 10;
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  });

  const navItems = [
    { name: 'Home', href: '/' },
    { name: 'Services', href: '/services/' },
    { name: 'Projects', href: '/projects' },
    { name: 'Career', href: '/Career/' },
    { name: 'About Us', href: '/About/' },
    { name: 'Contact Us', href: '/Contact/' },
  ];

  return (
    <header
      class={`
        fixed top-4 left-1/2 -translate-x-1/2 z-[999] w-[94%]
        rounded-3xl
        transition-all duration-500 
        animate-floatingHeader
        ${isScrolled.value
          ? 'bg-neutral-950/70 border border-neutral-800 scale-[0.96] shadow-[0_15px_40px_rgba(0,0,0,0.55)]'
          : 'bg-neutral-900/40 border border-neutral-700/30 shadow-[0_20px_50px_rgba(0,0,0,0.65)]'}
      `}
      style="
        backdrop-filter: blur(18px);
        box-shadow:
          0 12px 40px rgba(0,0,0,0.45),
          0 0 25px rgba(120,0,255,0.15),
          inset 0 2px 8px rgba(255,255,255,0.05),
          inset 0 -4px 12px rgba(0,0,0,0.4);
      "
      role="banner"
    >
      <div
        class="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-purple-500/40 via-blue-400/40 to-pink-500/40 animate-glowLine"
        aria-hidden="true"
      ></div>

      <nav
        class="relative container mx-auto flex items-center justify-between px-8 py-4"
        role="navigation"
        aria-label="Primary Navigation"
      >
        <Link
          href="/"
          class="flex items-center gap-2 transition-transform hover:scale-110"
          aria-label="Viplora Tech Home"
        >
          <div
            class="
              flex h-10 w-10 items-center justify-center 
              rounded-2xl overflow-hidden
              bg-gradient-to-br from-primary-500 to-secondary-500
              shadow-[0_4px_10px_rgba(0,0,0,0.4),0_0_12px_rgba(255,255,255,0.15)]
            "
          >
            <img
              src="/LOGO.jpg"
              alt="Viplora Tech logo"
              class="h-12 w-12 rounded-full object-cover object-center"
            />
          </div>
          <span class="font-display text-xl font-bold text-white drop-shadow-md">
            Viplora
          </span>
        </Link>

        <div class="hidden lg:flex items-center gap-8 xl:gap-10 relative">
          {navItems.map((item) => (
            <div class="relative group" key={item.name}>
              <a
                href={item.href}
                class="relative min-w-max font-medium text-neutral-300 transition-colors hover:text-primary-400
                       after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 
                       after:bg-primary-500 after:transition-all group-hover:after:w-full"
                aria-current={
                  location.url.pathname === item.href ? 'page' : undefined
                }
              >
                {item.name}
              </a>
            </div>
          ))}

          <div class="relative">
            <button
              onClick$={() => (showTermsMenu.value = !showTermsMenu.value)}
              class="text-neutral-300 text-2xl font-bold px-2 hover:text-primary-400"
              aria-haspopup="menu"
              aria-expanded={showTermsMenu.value}
              aria-label="Legal links"
            >
              ⋮
            </button>

            {showTermsMenu.value && (
              <div
                class="absolute right-0 mt-2 w-52 bg-neutral-900 border border-neutral-700 rounded-xl shadow-lg py-2 z-50"
                role="menu"
              >
                <Link
                  href="/privacy/"
                  class="block px-4 py-2 text-neutral-300 hover:text-primary-500 hover:bg-neutral-800/60"
                  role="menuitem"
                >
                  Privacy & Policy
                </Link>
                <Link
                  href="/Terms/"
                  class="block px-4 py-2 text-neutral-300 hover:text-primary-500 hover:bg-neutral-800/60"
                  role="menuitem"
                >
                  Terms & Conditions
                </Link>
              </div>
            )}
          </div>
        </div>

        <button
          onClick$={() => (isMobileMenuOpen.value = !isMobileMenuOpen.value)}
          class="lg:hidden"
          aria-label="Toggle mobile menu"
          aria-expanded={isMobileMenuOpen.value}
        >
          <svg
            class="h-7 w-7 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
      </nav>

      {isMobileMenuOpen.value && (
        <div
          class="
            sticky top-[calc(4rem+1rem)]
            rounded-b-3xl
            border-t border-neutral-700/60
            bg-neutral-950/95
            backdrop-blur-xl
            lg:hidden
            animate-slideDown
            z-[998]
          "
          role="menu"
        >
          <div class="space-y-4 px-6 py-6">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                class="block pl-1 font-medium text-neutral-300 hover:text-primary-400"
                aria-current={
                  location.url.pathname === item.href ? 'page' : undefined
                }
              >
                {item.name}
              </a>
            ))}

            <Link
              href="/privacy/"
              class="block pl-1 font-medium text-neutral-300 hover:text-primary-400"
            >
              Privacy & Policy
            </Link>

            <Link
              href="/Terms/"
              class="block pl-1 font-medium text-neutral-300 hover:text-primary-400"
            >
              Terms & Conditions
            </Link>
          </div>
        </div>
      )}
    </header>
  );
});
