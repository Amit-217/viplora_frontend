import { component$ } from '@builder.io/qwik';
import { Link } from '@builder.io/qwik-city';
import Header from "../../components/Header"; 
import Footer from "../../components/Footer";



export default component$(() => {
  return (
    <>
      <Header />

      <main class="min-h-screen bg-black flex items-center justify-center px-6">
        <section class="max-w-xl text-center">
          <h1 class="text-7xl font-bold text-[#20DEFF] mb-4">404</h1>

          <h2 class="text-2xl font-semibold text-white mb-3">
            Page Not Found
          </h2>

          <p class="text-[#B7B3B7] mb-8">
            The page you’re trying to access doesn’t exist or has been moved.
          </p>

          <div class="flex justify-center gap-4">
            <Link
              href="/"
              class="px-6 py-3 rounded-lg bg-[#20DEFF] text-black font-semibold"
            >
              Go Home
            </Link>

            <Link
              href="/contact"
              class="px-6 py-3 rounded-lg border border-[#20DEFF] text-[#20DEFF]"
            >
              Contact Us
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
});

