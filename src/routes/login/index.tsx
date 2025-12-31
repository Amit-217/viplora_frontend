import { component$, useSignal, $ } from "@builder.io/qwik";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { CONSTANTS } from "../../lib/constants";


export const head = {
  title: "Admin Login | Viplora Tech",
  meta: [
    {
      name: "description",
      content: "Secure admin login for Viplora Tech internal dashboard.",
    },
    {
      name: "robots",
      content: "noindex, follow",
    },
  ],
 links: [
  {
    rel: "canonical",
    href: `${CONSTANTS.SITE_URL}/login`,
  },
],
};

export default component$(() => {
  const email = useSignal("");
  const password = useSignal("");

  const emailError = useSignal("");
  const passwordError = useSignal("");
  const serverError = useSignal("");
  const showPassword = useSignal(false);

  const popupMessage = useSignal("");
  const popupType = useSignal<"success" | "error" | "info">("info");
  const showPopup = useSignal(false);

  const validate = $(() => {
    emailError.value = "";
    passwordError.value = "";
    serverError.value = "";

    let valid = true;

    if (!email.value.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      emailError.value = "Enter a valid email address.";
      valid = false;
    }

    if (password.value.length < 6) {
      passwordError.value = "Password must be at least 6 characters.";
      valid = false;
    }

    return valid;
  });

 const handleLogin = $(async () => {
  if (!(await validate())) return;

  try {
    const res = await fetch(
      `${CONSTANTS.API_BASE_URL}/api/admin/login`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: email.value,
          password: password.value,
        }),
      }
    );

    const data = await res.json();

    if (data.status === "error") {
      serverError.value = data.message;
      popupType.value = "error";
      popupMessage.value = data.message;
      showPopup.value = true;
      return;
    }

    if (data.status === "verify_required") {
      popupType.value = "info";
      popupMessage.value = "Please verify your email. OTP sent.";
      showPopup.value = true;

      setTimeout(() => {
        window.location.href = "/verify";
      }, 1500);
      return;
    }

    if (data.status === "success") {
      localStorage.setItem("admin_token", data.accessToken);
      localStorage.setItem("admin_refresh_token", data.refreshToken);

      popupType.value = "success";
      popupMessage.value = "Logged in successfully!";
      showPopup.value = true;

      setTimeout(() => {
        window.location.href = "/admin/dashboard";
      }, 1500);
    }
  } catch (err) {
    console.error(err);
    serverError.value = "Backend not reachable.";
    popupType.value = "error";
    popupMessage.value = "Backend not reachable.";
    showPopup.value = true;
  }
});

  return (
    <>
      <Header />

      <main class="min-h-screen bg-[#000000] flex items-center justify-center px-4 py-20">
        <section
          class="w-full max-w-md bg-[#16161A] shadow-xl p-8 rounded-xl
                 border border-[rgba(32,222,255,0.25)]"
          aria-labelledby="login-title"
        >
          <h1
            id="login-title"
            class="text-3xl font-bold text-center mb-6 tracking-wide text-[#20DEFF]"
          >
            Welcome Back
          </h1>

          {serverError.value && (
            <p class="text-red-500 text-center mb-3" aria-live="polite">
              {serverError.value}
            </p>
          )}

          <form
            class="space-y-4"
            onSubmit$={(e) => e.preventDefault()}
            aria-label="Admin login form"
          >
            {/* Email */}
            <div>
              <label for="email" class="text-white font-medium">
                Email
              </label>
              <input
                id="email"
                type="email"
                class="
                  w-full mt-1 px-4 py-3 rounded-lg
                  bg-[#0E0E12] text-white
                  border border-[rgba(32,222,255,0.25)]
                  outline-none focus:outline-none
                  focus:border-[#20DEFF]
                  focus:ring-2 focus:ring-[#20DEFF]/40
                  transition
                "
                value={email.value}
                onInput$={(e) =>
                  (email.value = (e.target as HTMLInputElement).value)
                }
              />
              {emailError.value && (
                <p class="text-red-500 text-sm mt-1">{emailError.value}</p>
              )}
            </div>

            {/* Password */}
            <div>
              <label for="password" class="text-white font-medium">
                Password
              </label>

              <div class="relative mt-1">
                <input
                  id="password"
                  type={showPassword.value ? "text" : "password"}
                  class="
                    w-full px-4 py-3 rounded-lg
                    bg-[#0E0E12] text-white
                    border border-[rgba(32,222,255,0.25)]
                    outline-none focus:outline-none
                    focus:border-[#20DEFF]
                    focus:ring-2 focus:ring-[#20DEFF]/40
                    transition
                  "
                  value={password.value}
                  onInput$={(e) =>
                    (password.value = (e.target as HTMLInputElement).value)
                  }
                />

                <button
                  type="button"
                  onClick$={() => (showPassword.value = !showPassword.value)}
                  class="absolute right-3 top-3 text-[#20DEFF] text-sm"
                >
                  {showPassword.value ? "Hide" : "Show"}
                </button>
              </div>

              {passwordError.value && (
                <p class="text-red-500 text-sm mt-1">{passwordError.value}</p>
              )}
            </div>

            <button
              type="button"
              onClick$={handleLogin}
              class="
                w-full py-3 rounded-lg font-semibold
                bg-[#20DEFF] text-black
                hover:shadow-lg transition
              "
            >
              Login
            </button>
          </form>
        </section>
      </main>

      {/* TOAST */}
      {showPopup.value && (
        <div class="fixed top-[96px] right-6 z-50" role="status">
          <div class="w-80 p-4 rounded-xl bg-[#0E0E12] border border-[#20DEFF]">
            <p class="font-semibold text-white">{popupMessage.value}</p>
          </div>
        </div>
      )}

      <Footer />
    </>
  );
});
