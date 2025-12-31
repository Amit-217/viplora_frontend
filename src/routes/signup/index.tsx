import { component$, useStore, $ } from "@builder.io/qwik";
import Header from "../../components/Header";
import Footer from "../../components/Footer";


export default component$(() => {
  const form = useStore({
    name: "",
    email: "",
    password: "",
    error: "",
    success: "",
  });

  return (
    <>
      <Header />

      <div class="flex justify-center items-center min-h-screen bg-[#000000]">
        <div class="w-full max-w-md p-8 shadow-lg bg-[#16161A] rounded-xl border border-[rgba(32,222,255,0.25)]">

          <h2 class="text-2xl font-bold mb-4 text-center text-[#20DEFF]">
            Create Account
          </h2>

          {/* Error Message */}
          {form.error && (
            <p class="text-red-500 mb-2 font-medium">{form.error}</p>
          )}

          {/* Success Message */}
          {form.success && (
            <p class="text-green-500 mb-2 font-medium">{form.success}</p>
          )}

          <input
            class="w-full p-2 rounded mb-3
                   bg-[#0E0E12] text-white placeholder-[#B7B3B7]
                   border border-[rgba(32,222,255,0.25)]
                   focus:outline-none focus:border-[#20DEFF] focus:ring-2 focus:ring-[#20DEFF]/40"
            placeholder="Enter your name"
            value={form.name}
            onInput$={(e) => (form.name = (e.target as HTMLInputElement).value)}
          />

          <input
            class="w-full p-2 rounded mb-3
                   bg-[#0E0E12] text-white placeholder-[#B7B3B7]
                   border border-[rgba(32,222,255,0.25)]
                   focus:outline-none focus:border-[#20DEFF] focus:ring-2 focus:ring-[#20DEFF]/40"
            placeholder="Enter your email"
            value={form.email}
            onInput$={(e) => (form.email = (e.target as HTMLInputElement).value)}
          />

          <input
            type="password"
            class="w-full p-2 rounded mb-3
                   bg-[#0E0E12] text-white placeholder-[#B7B3B7] caret-[#20DEFF]
                   border border-[rgba(32,222,255,0.25)]
                   focus:outline-none focus:border-[#20DEFF] focus:ring-2 focus:ring-[#20DEFF]/40"
            placeholder="Enter your password"
            value={form.password}
            onInput$={(e) =>
              (form.password = (e.target as HTMLInputElement).value)
            }
          />

          <button
            class="w-full bg-[#20DEFF] text-black p-2 rounded font-semibold
                   hover:shadow-lg hover:shadow-[#20DEFF]/40 transition"
            onClick$={$(() => {
              form.error = "";
              form.success = "";

              if (!form.name || !form.email || !form.password) {
                form.error = "All fields are required";
                return;
              }

              if (form.password.length < 6) {
                form.error = "Password must be at least 6 characters";
                return;
              }

              form.success = "Account created successfully!";
            })}
          >
            Sign Up
          </button>

        </div>
      </div>

      <Footer />
    </>
  );
});


