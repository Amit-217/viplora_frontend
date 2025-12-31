import { component$ } from '@builder.io/qwik';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { CONSTANTS } from '../../lib/constants';


export const head = {
  title: 'Privacy Policy | Viplora Tech – Software & AI Company in India',
  meta: [
    {
      name: 'description',
      content:
        'Read Viplora Tech’s Privacy Policy explaining how we collect, use, and protect personal data. Based in Maharashtra, India, serving global clients.',
    },
    {
      name: 'robots',
      content: 'index, follow',
    },
  ],
links: [
    {
      rel: 'canonical',
      href: `${CONSTANTS.SITE_URL}/privacy`,
    },
  ],
};

export const Section = component$(
  (props: { number: string; title: string; content: string[] }) => {
    return (
      <section class="mt-10" aria-labelledby={`section-${props.number}`}>
        <h2
          id={`section-${props.number}`}
          class="text-2xl font-semibold mb-4 text-[#20DEFF]"
        >
          {props.number}. {props.title}
        </h2>

        <div class="space-y-2 text-[#B7B3B7] ml-4 text-justify">
          {props.content.map((item, i) => (
            <p key={i}>{item}</p>
          ))}
        </div>
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
          aria-labelledby="privacy-title"
        >
          <header>
            <h1
              id="privacy-title"
              class="text-4xl font-bold mb-6 text-[#20DEFF]"
            >
              Privacy Policy – Viplora Tech
            </h1>

            <p class="text-[#B7B3B7] mb-6">17-12-2025</p>
          </header>

          <h2 class="sr-only">Privacy Policy Sections</h2>

          <p class="mb-4 text-[#B7B3B7] text-justify">
            Welcome to Viplora Tech (“Company”, “we”, “our”, “us”). We are an IT
            company building SaaS products and providing custom software, web,
            cloud, and AI-based solutions for various industries. By accessing
            or using our website or services, you agree to this Privacy Policy.
          </p>

          <Section number="1" title="Information We Collect" content={[
            "A. Personal Information: Name, Email, Phone, Company/Organization details (if provided)",
            "B. Account & Employee Login Data: Username & password, user roles, work/project records",
            "C. Client & Project Information: Project requirements, files, attachments, feedback, business info",
            "D. Automatically Collected Data: Device info (IP, browser, OS), cookies & usage data, approximate location",
            "E. Communication Data: Emails, chat messages, interaction history",
            "> Note: Sensitive data will not be collected unless legally required or agreed by the user.",
          ]} />

          <Section number="2" title="How We Use Your Information" content={[
            "Service delivery and product improvement",
            "Creating and managing user accounts",
            "Customer support and communication",
            "Analytics and website optimization",
            "Security, fraud prevention, and compliance",
            "Personalization of user experience",
            "Marketing updates & newsletters (optional – with consent)",
          ]} />

          <Section number="3" title="Sharing of Information" content={[
            "We do not sell your personal information.",
            "Data may be shared only with trusted third parties like hosting providers, payment gateways, analytics tools, and email providers.",
            "All partners comply with global data protection standards.",
          ]} />

          <Section number="4" title="Cookies & Tracking Technologies" content={[
            "Cookies help us understand user interactions, improve performance, and personalize content.",
            "Users can disable cookies via browser settings.",
          ]} />

          <Section number="5" title="Data Security" content={[
            "We implement strong security measures to protect data against unauthorized access, loss, theft, misuse, or alteration.",
            "No system is 100% secure; users share data at their own risk.",
          ]} />

          <Section number="6" title="User Rights" content={[
            "Depending on your country of residence, users may have rights to access, update, delete data, withdraw consent, or object to marketing.",
            "Requests can be submitted via official support email.",
          ]} />

          <Section number="7" title="International Data Transfers" content={[
            "Data may be processed in different countries with GDPR and international privacy protections.",
          ]} />

          <Section number="8" title="Third-Party Links" content={[
            "External website links may be included; we are not responsible for their content or privacy practices.",
          ]} />

          <Section number="9" title="Children’s Privacy" content={[
            "Services are not targeted toward children under 13. We do not knowingly collect data from minors.",
          ]} />

          <Section number="10" title="Policy Updates" content={[
            "We may update this policy from time to time.",
            "Changes will be posted on this page with an updated date.",
          ]} />

          <Section number="11" title="Contact Us" content={[
            "For privacy-related questions or data requests: viploratech@gmail.com",
            "Address: Maharashtra, India.",
          ]} />
        </article>
      </main>

      <Footer />
    </>
  );
});
