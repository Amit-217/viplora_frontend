import { component$, useSignal, $, QRL } from '@builder.io/qwik';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { CONSTANTS } from '../../lib/constants';

export const head = {
  title: 'Contact Viplora Tech | Software & AI Solutions Company in India',
  meta: [
    {
      name: 'description',
      content:
        'Contact Viplora Tech for custom software development, AI solutions, and digital transformation. Based in Pune, Maharashtra, serving clients across India and globally.',
    },
    {
      name: 'robots',
      content: 'index, follow',
    },
  ],
   links: [
  {
    rel: 'canonical',
    href: `${CONSTANTS.SITE_URL}/contact`,
  },
],

};

export default component$(() => {
  const name = useSignal('');
  const email = useSignal('');
  const phone = useSignal('');
  const subject = useSignal('');
  const message = useSignal('');
  const popupMessage = useSignal('');
  const popupType = useSignal<'success' | 'error'>('success');
  const showPopup = useSignal(false);
  const isSubmitting = useSignal(false);

const handleSubmit: QRL<() => void> = $(async () => {
  if (isSubmitting.value) return; 
  isSubmitting.value = true;

  try {
    if (name.value.trim().length < 2) {
      popupMessage.value = 'Please enter a valid name';
      popupType.value = 'error';
      showPopup.value = true;
      return;
    }

    if (!email.value.includes('@')) {
      popupMessage.value = 'Enter a valid email';
      popupType.value = 'error';
      showPopup.value = true;
      return;
    }

    if (subject.value.trim().length < 3) {
      popupMessage.value = 'Please enter a valid subject';
      popupType.value = 'error';
      showPopup.value = true;
      return;
    }

    if (message.value.trim().length < 10) {
      popupMessage.value = 'Message must be at least 10 characters';
      popupType.value = 'error';
      showPopup.value = true;
      return;
    }

    const API_URL = `${CONSTANTS.API_BASE_URL}/api/contact/send`;

       const res = await fetch(API_URL, {
       method: 'POST',
       headers: { 'Content-Type': 'application/json' },
       body: JSON.stringify({
    name: name.value,
    email: email.value,
    phone: phone.value,
    subject: subject.value,
    description: message.value,
  }),
     });


    const data = await res.json();

    if (data.status === 'success') {
      popupMessage.value = 'Message sent successfully!';
      popupType.value = 'success';

      name.value = '';
      email.value = '';
      phone.value = '';
      subject.value = '';
      message.value = '';
    } else {
      popupMessage.value = data.message;
      popupType.value = 'error';
    }
  } catch {
    popupMessage.value = 'Something went wrong while sending the message.';
    popupType.value = 'error';
  } finally {
    showPopup.value = true;
    isSubmitting.value = false; 
    setTimeout(() => (showPopup.value = false), 3000);
  }
});

  const MAP_URL = 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15129.740203024823!2d73.8188151!3d18.5638151!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2bf38d58ff9b1%3a0x2d87e04f056346b9!2sPune%2c%20Maharashtra!5e0!3m2!1sen!2sin!4v1703277710323!5m2!1sen!2sin';

  return (
    <>
      <Header />

      <main id="main-content">
        <section
          class="bg-black pt-32 pb-16 sm:pb-20 px-4 sm:px-6"
          aria-labelledby="contact-heading"
        >
          <div class="w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 items-stretch">

            <section aria-label="Contact form" class="flex flex-col">
              <header>
                <h1
                  id="contact-heading"
                  class="text-4xl font-bold tracking-tight text-[#20DEFF] sm:text-5xl"
                >
                  Get in Touch
                </h1>
                <p class="mt-4 text-lg text-[#B7B3B7]">
                  Contact Viplora Tech to discuss software, AI, and digital solutions for your business.
                </p>
              </header>

              <div class="bg-[#16161A] text-white rounded-2xl p-10 border border-[rgba(32,222,255,0.25)] shadow-xl mt-8 flex-grow">
                <form class="space-y-6 h-full flex flex-col" onSubmit$={(e) => e.preventDefault()} aria-label="Contact form">
                  <input
  aria-label="Name"
  bind:value={name}
  placeholder="Your Name"
  class="
    w-full px-4 py-3 rounded-lg
    bg-[#0E0E12]
    border border-[rgba(32,222,255,0.25)]
    text-white
    outline-none
    focus:outline-none
    focus:border-[#20DEFF]
    focus:ring-2
    focus:ring-[#20DEFF]/40
    transition
  "
/>

<input
  aria-label="Email"
  bind:value={email}
  placeholder="Your Email"
  class="
    w-full px-4 py-3 rounded-lg
    bg-[#0E0E12]
    border border-[rgba(32,222,255,0.25)]
    text-white
    outline-none
    focus:outline-none
    focus:border-[#20DEFF]
    focus:ring-2
    focus:ring-[#20DEFF]/40
    transition
  "
/>

<input
  aria-label="Phone number"
  bind:value={phone}
  placeholder="Phone Number (Optional)"
  class="
    w-full px-4 py-3 rounded-lg
    bg-[#0E0E12]
    border border-[rgba(32,222,255,0.25)]
    text-white
    outline-none
    focus:outline-none
    focus:border-[#20DEFF]
    focus:ring-2
    focus:ring-[#20DEFF]/40
    transition
  "
/>

<input
  aria-label="Subject"
  bind:value={subject}
  placeholder="Subject"
  class="
    w-full px-4 py-3 rounded-lg
    bg-[#0E0E12]
    border border-[rgba(32,222,255,0.25)]
    text-white
    outline-none
    focus:outline-none
    focus:border-[#20DEFF]
    focus:ring-2
    focus:ring-[#20DEFF]/40
    transition
  "
/>

<textarea
  aria-label="Message"
  rows={5}
  bind:value={message}
  placeholder="Your Message..."
  class="
    w-full px-4 py-3 rounded-lg
    bg-[#0E0E12]
    border border-[rgba(32,222,255,0.25)]
    text-white resize-none
    outline-none
    focus:outline-none
    focus:border-[#20DEFF]
    focus:ring-2
    focus:ring-[#20DEFF]/40
    transition
  "
/>

                  <div class="mt-auto pt-6">
                   <button
  type="button"
  onClick$={handleSubmit}
  disabled={isSubmitting.value}
  class={`
    w-full py-3 rounded-lg font-semibold transition
    ${
      isSubmitting.value
        ? 'bg-neutral-600 text-neutral-300 cursor-not-allowed'
        : 'bg-[#20DEFF] text-black active:scale-95'
    }
  `}
>
  {isSubmitting.value ? 'Sending...' : 'Send Message'}
</button>

                  </div>
                </form>
              </div>
            </section>

            <article
              class="flex flex-col space-y-10"
              aria-label="Company contact details and location"
            >
              <section class="bg-[#16161A] text-white rounded-2xl p-8 border border-[rgba(32,222,255,0.25)] shadow-md">
                <h2 class="text-2xl font-bold mb-4 text-[#20DEFF]">
                  Contact Information
                </h2>

                <address class="space-y-4 text-[#B7B3B7] text-lg not-italic">
                  <p class="flex items-center gap-3">
                    <svg class="w-5 h-5 text-[#20DEFF]" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path stroke-width="2" d="M3 5a2 2 0 012-2h3l2 5-2 1a11 11 0 005 5l1-2 5 2v3a2 2 0 01-2 2A16 16 0 013 5z" />
                    </svg>
                    <span>(+91) 7620837934 , (+91) 7559422045</span>
                  </p>

                  <p class="flex items-center gap-3">
                    <svg class="w-5 h-5 text-[#20DEFF]" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path stroke-width="2" d="M4 4h16v16H4z" />
                      <path stroke-width="2" d="M4 4l8 8 8-8" />
                    </svg>
                    <a href="mailto:viploratech@gmail.com" class="hover:text-[#20DEFF]">viploratech@gmail.com</a>
                  </p>

                  <p class="flex items-center gap-3">
                    <svg class="w-5 h-5 text-[#20DEFF]" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" stroke-width="2" />
                      <circle cx="12" cy="12" r="4" stroke-width="2" />
                      <circle cx="18" cy="6" r="1" />
                    </svg>
                    <a href="https://instagram.com/viploratech" target="_blank" rel="noopener noreferrer" class="hover:text-[#20DEFF]">Instagram</a>
                  </p>

                  <p class="flex items-center gap-3">
                    <svg class="w-5 h-5 text-[#20DEFF]" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M18.9 2H22l-7.2 8.2L23 22h-6.8l-5.4-6.6L5.8 22H2.7l7.7-8.8L1 2h6.9l4.9 6.1L18.9 2z" />
                    </svg>
                    <a href="https://x.com/ViploraTech" target="_blank" rel="noopener noreferrer" class="hover:text-[#20DEFF]">X (Twitter)</a>
                  </p>

                  <p class="flex items-center gap-3">
                    <svg class="w-5 h-5 text-[#20DEFF]" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M4.98 3.5A2.5 2.5 0 002.5 6a2.5 2.5 0 002.48 2.5A2.5 2.5 0 007.46 6 2.5 2.5 0 004.98 3.5zM3 9h4v12H3zM9 9h4v1.7c.6-1 1.6-2 3.4-2 3.6 0 4.6 2.3 4.6 5.4V21h-4v-5.4c0-1.3 0-3-1.9-3s-2.1 1.4-2.1 2.9V21H9z" />
                    </svg>
                    <a href="https://www.linkedin.com/company/viploratech" target="_blank" rel="noopener noreferrer" class="hover:text-[#20DEFF]">LinkedIn</a>
                  </p>
                </address>
              </section>

              <section class="bg-[#16161A] text-white rounded-2xl p-6 border border-[rgba(32,222,255,0.25)] shadow-md flex-grow flex flex-col">
                <h2 class="text-2xl font-bold mb-4 text-[#20DEFF]">
                  Our Location
                </h2>

                <div class="flex-grow rounded-xl overflow-hidden shadow-lg border border-[rgba(32,222,255,0.25)] min-h-[300px]">
                  <iframe
                    src={MAP_URL}
                    class="w-full h-full border-0"
                    loading="lazy"
                    title="Viplora Tech location in Pune, Maharashtra"
                  ></iframe>
                </div>
              </section>
            </article>
          </div>
        </section>
      </main>

      {showPopup.value && (
        <div class="fixed top-24 right-6 z-50" role="status">
          <div
            class={`px-6 py-4 rounded-xl shadow-xl text-white ${
              popupType.value === 'success' ? 'bg-green-500' : 'bg-red-500'
            }`}
          >
            {popupMessage.value}
          </div>
        </div>
      )}

      <Footer />
    </>
  );
});