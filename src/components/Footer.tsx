import { component$ } from '@builder.io/qwik';
import { Link } from '@builder.io/qwik-city';

export default component$(() => {
  return (
    <footer
      class="pt-10 pb-6 md:pt-14 md:pb-8 bg-[#0B0C10] border-t border-[#20DEFF]/30 text-[#B7B3B7]"
      role="contentinfo"
      aria-label="Viplora Tech Footer"
    >
      <div class="container mx-auto px-4">

        <div class="grid grid-cols-1 md:grid-cols-4 gap-12 mb-6 md:mb-12">

          {/* BRAND */}
          <section aria-label="Company Information">
            <div class="flex items-center gap-3">
              <img
                src="/LOGO.jpg"
                alt="Viplora Tech logo"
                class="h-10 w-10 rounded-lg shadow-lg"
              />
              <span class="font-bold text-2xl text-white">
                VIPLORA TECH
              </span>
            </div>

            <p class="mt-4 text-[#20DEFF] text-lg font-semibold">
              नवोन्मेषः परिवर्तनपथे अस्माकं दीपः
            </p>

            <p class="text-sm mt-1 text-[#B7B3B7]/80">
              Innovation lights our path through transformation.
            </p>

          </section>

          {/* QUICK LINKS */}
          <nav aria-label="Footer Quick Links">
            <h4 class="font-semibold text-white mb-4">Quick Links</h4>
            <ul class="space-y-3 text-sm text-gray-400">
              <li><Link href="/" class="hover:text-[#20DEFF] transition">Home</Link></li>
              <li><Link href="/About/" class="hover:text-[#20DEFF] transition">About Us</Link></li>
              <li><Link href="/Career/" class="hover:text-[#20DEFF] transition">Career</Link></li>
              <li><Link href="/Contact/" class="hover:text-[#20DEFF] transition">Contact Us</Link></li>
              <li><Link href="/login/" class="hover:text-[#20DEFF] transition">Admin</Link></li>
            </ul>
          </nav>

          {/* SERVICES */}
          <nav aria-label="Footer Services">
            <h4 class="font-semibold text-white mb-4">Services</h4>
            <ul class="space-y-3 text-sm text-gray-400">
              <li><Link href="/services/" class="hover:text-[#20DEFF] transition">Custom Software Development</Link></li>
              <li><Link href="/services/" class="hover:text-[#20DEFF] transition">Website Development</Link></li>
              <li><Link href="/services/" class="hover:text-[#20DEFF] transition">Digital Transformation</Link></li>
              <li><Link href="/services/" class="hover:text-[#20DEFF] transition">AI-Based Solutions</Link></li>
              <li><Link href="/services/" class="hover:text-[#20DEFF] transition">Support & Maintenance</Link></li>
            </ul>
          </nav>

          {/* PRODUCTS */}
          <nav aria-label="Footer Products">
            <h4 class="font-semibold text-white mb-4">Products</h4>
            <ul class="space-y-3 text-sm text-gray-400">
              <li><Link href="/projects/" class="hover:text-[#20DEFF] transition">Products</Link></li>
            </ul>
          </nav>

        </div>

        {/* DIVIDER */}
        <div class="border-t border-[#20DEFF]/20 my-4 md:my-6"></div>

        {/* ================= BOTTOM SECTION ================= */}
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6 items-center pt-3 pb-1">

          {/* LEGAL */}
          <nav aria-label="Legal Links" class="text-center md:text-left">
            <ul class="text-sm flex space-x-4">
              <li>
                <Link href="/Terms/" class="hover:text-[#20DEFF] transition">
                  T&amp;C
                </Link>
              </li>
              <li class="text-gray-500">|</li>
              <li>
                <Link href="/privacy/" class="hover:text-[#20DEFF] transition">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </nav>

          {/* COPYRIGHT */}
          <div class="text-center text-sm leading-none -mb-1">
            © 2025 <span class="text-white font-medium">Viplora Tech</span>. All Rights Reserved.
          </div>

          {/* CONTACT + SOCIAL */}
          <address class="flex flex-col items-center md:items-end gap-4 not-italic">

            <div class="flex items-center gap-6 text-sm text-[#B7B3B7]">

              {/* EMAIL */}
              <a
                href="mailto:viploratech@gmail.com"
                class="hover:text-[#20DEFF] transition"
                aria-label="Email Viplora Tech"
              >
                <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24" aria-hidden="true">
                  <rect x="2" y="4" width="20" height="16" rx="2" />
                  <path d="M22 6l-10 7L2 6" />
                </svg>
              </a>

              {/* INSTAGRAM */}
              <a
                href="https://instagram.com/viploratech"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Viplora Tech Instagram"
                class="hover:text-[#20DEFF] transition"
              >
                <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24" aria-hidden="true">
                  <rect x="2" y="2" width="20" height="20" rx="5" />
                  <circle cx="12" cy="12" r="4" />
                  <circle cx="17.5" cy="6.5" r="1" />
                </svg>
              </a>

              {/* LINKEDIN */}
              <a
                href="https://www.linkedin.com/company/viploratech"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Viplora Tech LinkedIn"
                class="hover:text-[#20DEFF] transition"
              >
                <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M4.98 3.5A2.5 2.5 0 002.5 6a2.5 2.5 0 002.48 2.5A2.5 2.5 0 007.46 6 2.5 2.5 0 004.98 3.5z" />
                  <path d="M3 9h4v12H3z" />
                  <path d="M9 9h4v1.7c.6-1 1.6-2 3.4-2 3.6 0 4.6 2.3 4.6 5.4V21h-4v-5.4c0-1.3 0-3-1.9-3s-2.1 1.4-2.1 2.9V21H9z" />
                </svg>
              </a>

              {/* X / TWITTER */}
              <a
                href="https://x.com/ViploraTech"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Viplora Tech on X"
                class="hover:text-[#20DEFF] transition"
              >
                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M18.3 2H21l-6.5 7.4L22 22h-7l-4.9-6.7L4 22H1.3l7.2-8.2L2 2h7l4.5 6.2L18.3 2z"/>
                </svg>
              </a>

            </div>
          </address>

        </div>
      </div>
    </footer>
  );
});
