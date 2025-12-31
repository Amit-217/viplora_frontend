import { component$, useStore, $ } from "@builder.io/qwik";
import Header from "../../components/Header";
import Footer from "../../components/Footer";


export default component$(() => {
  const form = useStore({
    email: "",
    error: "",
    success: "",
  });

  const handleSubmit = $(() => {
    form.error = "";
    form.success = "";

    if (!form.email) {
      form.error = "Please enter your email";
      return;
    }

    // Basic email format validation
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(form.email)) {
      form.error = "Enter a valid email address";
      return;
    }

    form.success = "Password reset link has been sent to your email!";
  });

  return (
    <>
      <Header />

      <div class="flex justify-center items-center min-h-screen bg-gray-100">
        <div class="w-full max-w-md p-8 bg-white shadow-lg rounded-xl">
          <h2 class="text-2xl font-bold mb-4 text-center">
            Forgot Password?
          </h2>

          {form.error && (
            <p class="text-red-600 font-medium mb-3">{form.error}</p>
          )}

          {form.success && (
            <p class="text-green-600 font-medium mb-3">{form.success}</p>
          )}

          <input
            type="email"
            class="w-full p-2 border rounded mb-3"
            placeholder="Enter your email"
            value={form.email}
            onInput$={(e) =>
              (form.email = (e.target as HTMLInputElement).value)
            }
          />

          <button
            class="w-full bg-blue-600 text-white p-2 rounded"
            onClick$={handleSubmit}
          >
            Send Reset Link
          </button>
        </div>
      </div>

      <Footer />
    </>
  );
});
