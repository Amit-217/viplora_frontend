import { component$ } from '@builder.io/qwik';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { CONSTANTS } from '../../lib/constants';

export const head = {
  title: 'Terms & Conditions | Viplora Tech – Software & AI Company in India',
  meta: [
    {
      name: 'description',
      content:
        'Read Viplora Tech’s Terms & Conditions governing the use of our software, services, and digital products. Based in Maharashtra, India.',
    },
    {
      name: 'robots',
      content: 'index, follow',
    },
  ],
   links: [
    {
      rel: 'canonical',
      href: `${CONSTANTS.SITE_URL}/terms`,
    },
  ],
};

export const Section = component$(
  (props: { number: string; title: string; content: string[] }) => {
    return (
      <section
        class="mt-10"
        aria-labelledby={`terms-section-${props.number}`}
      >
        <h2
          id={`terms-section-${props.number}`}
          class="text-2xl font-semibold mb-3 text-[#20DEFF]"
        >
          {props.number}. {props.title}
        </h2>

        <ul class="list-disc ml-6 space-y-2 text-[#B7B3B7] text-justify">
          {props.content.map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ul>
      </section>
    );
  }
);

export default component$(() => {
  return (
    <>
      <Header />

      <main
        id="main-content"
        class="min-h-screen bg-[#000000] py-20 px-6 flex justify-center"
      >
        <article
          class="max-w-4xl w-full bg-[#16161A] p-10 rounded-2xl
                 border border-[rgba(32,222,255,0.25)] shadow-xl"
          aria-labelledby="terms-title"
        >
          <header>
            <h1
              id="terms-title"
              class="text-4xl font-bold mb-6 text-[#20DEFF]"
            >
              Terms & Conditions – Viplora Tech
            </h1>

            <p class="text-[#B7B3B7] mb-6">
            17-12-2025
            </p>
          </header>

          <h2 class="sr-only">Terms and Conditions Sections</h2>

          <p class="mb-4 text-[#B7B3B7] text-justify">
            Welcome to Viplora Tech (“Company”, “we”, “our”, “us”). By accessing
            or using our website, services, software, or products, you agree to
            these Terms & Conditions. If you do not agree, please do not use our
            services.
          </p>

          <Section
            number="1"
            title="Use of Our Services"
            content={[
              'Users must follow all applicable laws while using our platform.',
              'Hacking, misuse, or disruption of services is prohibited.',
              'Uploading harmful content (malware or illegal data) is not allowed.',
              'Copying or stealing products or source code is prohibited.',
              'Using services for fraudulent or illegal purposes is forbidden.',
            ]}
          />

          <Section
            number="4"
            title="Services, Pricing & Modifications"
            content={[
              'Services or pricing may be updated anytime.',
              'We may improve, modify, or remove features without notice.',
              'We may discontinue any service temporarily or permanently.',
            ]}
          />

          <Section
            number="5"
            title="Client Data & Projects"
            content={[
              'Client-provided data remains confidential.',
              'Information is used only for project delivery.',
            ]}
          />

          <Section
            number="6"
            title="Payment Terms"
            content={[
              'Payments must follow agreed service terms.',
              'Refunds depend on specific service policies.',
            ]}
          />

          <Section
            number="7"
            title="Third-Party Services"
            content={[
              'External services may be integrated.',
              'We are not responsible for third-party content or policies.',
            ]}
          />

          <Section
            number="8"
            title="Limitation of Liability"
            content={[
              'We are not liable for damages or data loss.',
              'Services are used at the user’s own risk.',
            ]}
          />

          <Section
            number="9"
            title="Warranty Disclaimer"
            content={[
              "Services are provided 'as-is' and 'as-available'.",
              'No guarantee of uninterrupted service.',
            ]}
          />

          <Section
            number="10"
            title="Account Termination"
            content={[
              'Accounts may be terminated for violations.',
              'Users may request deletion anytime.',
            ]}
          />

          <Section
            number="11"
            title="Governing Law"
            content={[
              'Governed by Indian law.',
              'Disputes resolved under appropriate jurisdiction.',
            ]}
          />

          <Section
            number="12"
            title="Changes to Terms"
            content={[
              'Terms may change anytime.',
              'Continued use implies acceptance.',
            ]}
          />

          <Section
            number="13"
            title="Contact Information"
            content={[
              'Email: viploratech@gmail.com',
              'Address: Maharashtra, India.',
            ]}
          />
        </article>
      </main>

      <Footer />
    </>
  );
});
