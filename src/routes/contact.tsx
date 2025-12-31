import { component$, useSignal, $ } from '@builder.io/qwik';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default component$(() => {
  const formData = useSignal({
    name: '',
    email: '',
    company: '',
    subject: 'project',
    message: '',
  });
  const submitted = useSignal(false);

  const handleSubmit = $(async () => {
    // Submit to backend
    try {
      const response = await fetch('https://api.viplora.tech/api/contact/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData.value),
      });

      if (response.ok) {
        submitted.value = true;
        formData.value = {
          name: '',
          email: '',
          company: '',
          subject: 'project',
          message: '',
        };

        setTimeout(() => {
          submitted.value = false;
        }, 5000);
      }
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  });

  return (
    <>
      <Header />
      <main class="min-h-screen bg-black py-20 lg:py-32">
        <div class="container mx-auto max-w-2xl px-4">
          <div class="mb-12 text-center">
            <h1 class="font-display text-5xl font-bold lg:text-6xl">
              Let's Talk
              <br />
              <span class="text-gradient">About Your Project</span>
            </h1>
            <p class="mt-4 text-neutral-400">
              Get in touch with our team to discuss your next big idea
            </p>
          </div>

          {submitted.value && (
            <div class="mb-8 rounded-lg border border-green-500/30 bg-green-500/10 p-4 text-center text-green-300">
              ✓ Thank you! We'll get back to you soon.
            </div>
          )}

          <form class="space-y-6 rounded-lg border border-neutral-800 bg-neutral-900/50 p-8 backdrop-blur-sm">
            <div class="grid gap-6 md:grid-cols-2">
              <div>
                <label class="block text-sm font-medium text-neutral-300">Name</label>
                <input
                  type="text"
                  value={formData.value.name}
                  onChange$={(e) => (formData.value.name = (e.target as HTMLInputElement).value)}
                  class="mt-2 w-full rounded-lg border border-neutral-700 bg-neutral-800 px-4 py-2 text-white outline-none focus:border-primary-500"
                  required
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-neutral-300">Email</label>
                <input
                  type="email"
                  value={formData.value.email}
                  onChange$={(e) => (formData.value.email = (e.target as HTMLInputElement).value)}
                  class="mt-2 w-full rounded-lg border border-neutral-700 bg-neutral-800 px-4 py-2 text-white outline-none focus:border-primary-500"
                  required
                />
              </div>
            </div>

            <div>
              <label class="block text-sm font-medium text-neutral-300">Company</label>
              <input
                type="text"
                value={formData.value.company}
                onChange$={(e) => (formData.value.company = (e.target as HTMLInputElement).value)}
                class="mt-2 w-full rounded-lg border border-neutral-700 bg-neutral-800 px-4 py-2 text-white outline-none focus:border-primary-500"
              />
            </div>

            <div>
              <label class="block text-sm font-medium text-neutral-300">Subject</label>
              <select
                value={formData.value.subject}
                onChange$={(e) => (formData.value.subject = (e.target as HTMLSelectElement).value as any)}
                class="mt-2 w-full rounded-lg border border-neutral-700 bg-neutral-800 px-4 py-2 text-white outline-none focus:border-primary-500"
              >
                <option value="project">Project Inquiry</option>
                <option value="support">Technical Support</option>
                <option value="partnership">Partnership</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div>
              <label class="block text-sm font-medium text-neutral-300">Message</label>
              <textarea
                value={formData.value.message}
                onChange$={(e) => (formData.value.message = (e.target as HTMLTextAreaElement).value)}
                rows={6}
                class="mt-2 w-full rounded-lg border border-neutral-700 bg-neutral-800 px-4 py-2 text-white outline-none focus:border-primary-500"
                required
              />
            </div>

            <button
              onClick$={handleSubmit}
              type="button"
              class="w-full rounded-lg bg-gradient-to-r from-primary-500 to-secondary-500 py-3 font-semibold text-white transition-all hover:shadow-lg hover:shadow-primary-500/50"
            >
              Send Message
            </button>
          </form>
        </div>
      </main>
      <Footer />
    </>
  );
});