import {
  component$,
  useSignal,
  useStore,
  $,
  QRL,
} from "@builder.io/qwik";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { CONSTANTS } from "../../lib/constants";

export const head = {
  title: "Careers & Internships | Viplora Tech",
  meta: [
    {
      name: "description",
      content:
        "Apply for internships and career opportunities at Viplora Tech. Join our startup journey in software development, AI, UI/UX, and full-stack engineering.",
    },
    {
      name: "robots",
      content: "index, follow",
    },
  ],
  links: [
    {
      rel: "canonical",
      href: `${CONSTANTS.SITE_URL}/career`,
    },
  ],
};

const API_URL = `${CONSTANTS.API_BASE_URL}/api/application/submit`;

export default component$(() => {
  const searchValue = useSignal("");
  const showToast = useSignal(false);
  const toastMessage = useSignal("");
  const toastType = useSignal<"success" | "error">("success");
  const showModal = useSignal(false);
  const selectedRole = useSignal("");
  const isSubmitting = useSignal(false);

  const filteredInternships = useSignal<any[]>([]);

  const formData = useStore({
    user_name: "",
    email: "",
    phone: "",
    additional_info: "",
  });

  const internships = [
    { role: "Frontend Developer Intern", desc: "Work with React, Qwik, Tailwind & modern UI/UX.", badge: "Tech" },
    { role: "AI / ML Intern", desc: "Build intelligent AI & ML solutions.", badge: "AI/ML" },
    { role: "Backend Developer Intern", desc: "APIs, Databases & scalable systems.", badge: "Engineering" },
    { role: "UI/UX Designer Intern", desc: "Create beautiful digital experiences.", badge: "Design" },
    { role: "Full Stack Intern", desc: "Work across the full development stack.", badge: "Tech" },
    { role: "Mobile App Intern", desc: "React Native & modern mobile UI.", badge: "Mobile" },
  ];

  const handleSearch = $(() => {
    const query = searchValue.value.trim().toLowerCase();

    if (query.length < 2) {
      toastType.value = "error";
      toastMessage.value = "Please enter at least 2 characters";
      filteredInternships.value = [];
      showToast.value = true;
      return;
    }

    const found = internships.filter((i) =>
      i.role.toLowerCase().includes(query)
    );

    if (found.length === 0) {
      toastType.value = "error";
      toastMessage.value = `No internship found for "${searchValue.value}"`;
      filteredInternships.value = [];
    } else {
      toastType.value = "success";
      toastMessage.value = `Showing results for "${searchValue.value}"`;
      filteredInternships.value = found;
    }

    showToast.value = true;
    setTimeout(() => (showToast.value = false), 3000);
  });

  const clearSearch = $(() => {
    searchValue.value = "";
    filteredInternships.value = [];
  });

  const handleSubmit: QRL<() => void> = $(async () => {
    if (isSubmitting.value) return;

    if (!formData.user_name || !selectedRole.value) {
      toastType.value = "error";
      toastMessage.value = "Name and role are required";
      showToast.value = true;
      return;
    }

    isSubmitting.value = true;

    try {
      const payload = {
        user_name: formData.user_name,
        phone: formData.phone || null,
        email: formData.email || null,
        role_requested: selectedRole.value,
        additional_info: formData.additional_info || null,
      };

      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) {
        toastType.value = "error";
        toastMessage.value = data.message || "Submission failed";
      } else {
        toastType.value = "success";
        toastMessage.value = "Application submitted successfully";

        formData.user_name = "";
        formData.email = "";
        formData.phone = "";
        formData.additional_info = "";
        showModal.value = false;
      }
    } catch {
      toastType.value = "error";
      toastMessage.value = "Server error. Try again later.";
    } finally {
      isSubmitting.value = false;
      showToast.value = true;
      setTimeout(() => (showToast.value = false), 3000);
    }
  });

  const displayList =
    filteredInternships.value.length > 0
      ? filteredInternships.value
      : internships;

  return (
    <>
      <Header />

      <section class="bg-neutral-950 text-white pt-32 pb-20">
        <div class="text-center px-6">
          <h1 class="text-4xl font-bold mb-3 text-[#20DEFF]">
            Join Our Startup Journey
          </h1>

          <div class="mt-6 flex flex-wrap justify-center gap-3">
            <input
              class="
                px-4 py-2 rounded-lg
                bg-[#050505]
                text-white
                border border-[#20DEFF]/40
                focus:outline-none
                focus:border-[#20DEFF]
              "
              placeholder="Search roles..."
              value={searchValue.value}
              onInput$={(e) => {
                searchValue.value = (e.target as HTMLInputElement).value;
                if (!searchValue.value) filteredInternships.value = [];
              }}
            />

            <button
              onClick$={handleSearch}
              class="bg-[#20DEFF] text-black px-5 py-2 rounded-lg font-semibold"
            >
              Search
            </button>

            {filteredInternships.value.length > 0 && (
              <button
                onClick$={clearSearch}
                class="bg-[#050505] text-[#20DEFF] px-5 py-2 rounded-lg border border-[#20DEFF]/40"
              >
                Clear
              </button>
            )}
          </div>
        </div>
      </section>

      {/* INTERNSHIPS */}
      <section class="py-24 bg-[#0E0E12] text-white">
        <div class="container mx-auto px-6">
          <h2 class="text-4xl font-bold text-center mb-10 text-[#20DEFF]">
            Internship Opportunities
          </h2>

          <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-10">
            {displayList.map((item) => (
              <div
                key={item.role}
                class="p-8 bg-[#16161A] border border-[#20DEFF]/30 rounded-2xl"
              >
                <span class="text-xs px-3 py-1 bg-[#20DEFF]/10 text-[#20DEFF] rounded-full">
                  {item.badge}
                </span>

                <h3 class="text-xl font-bold mt-3">{item.role}</h3>
                <p class="text-[#B7B3B7]">{item.desc}</p>

                <button
                  class="mt-5 text-[#20DEFF] font-semibold hover:underline"
                  onClick$={() => {
                    selectedRole.value = item.role;
                    showModal.value = true;
                  }}
                >
                  Apply Now →
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {showModal.value && (
        <div class="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
          <div class="bg-neutral-950 w-full max-w-lg p-8 rounded-2xl relative">
            <button
              onClick$={() => (showModal.value = false)}
              class="absolute top-3 right-3 text-white"
            >
              ✕
            </button>

            <h2 class="text-2xl font-bold mb-4">
              Apply for {selectedRole.value}
            </h2>

            <form preventdefault:submit onSubmit$={handleSubmit} class="space-y-4">
              <input
                class="w-full p-3 rounded-lg bg-neutral-900 text-white border border-neutral-700 focus:border-[#20DEFF]"
                placeholder="Full Name"
                onInput$={(e) =>
                  (formData.user_name = (e.target as HTMLInputElement).value)
                }
              />

              <input
                class="w-full p-3 rounded-lg bg-neutral-900 text-white border border-neutral-700 focus:border-[#20DEFF]"
                placeholder="Email"
                onInput$={(e) =>
                  (formData.email = (e.target as HTMLInputElement).value)
                }
              />

              <button
                disabled={isSubmitting.value}
                class={`
                  w-full py-2 rounded-lg font-semibold transition
                  ${
                    isSubmitting.value
                      ? "bg-neutral-600 text-neutral-300 cursor-not-allowed"
                      : "bg-[#20DEFF] text-black hover:bg-[#17BFD9]"
                  }
                `}
              >
                {isSubmitting.value ? "Submitting..." : "Submit Application"}
              </button>
            </form>
          </div>
        </div>
      )}

      {showToast.value && (
        <div class="fixed top-24 right-6 z-50">
          <div class="w-80 p-4 rounded-xl border bg-[#0E0E12] border-[#20DEFF] text-[#20DEFF]">
            {toastMessage.value}
          </div>
        </div>
      )}

      <Footer />
    </>
  );
});
