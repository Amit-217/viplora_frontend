import { component$ } from '@builder.io/qwik';
import Header from '../../components/Header';
import Footer from '../../components/Footer';


const CodeIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-8 h-8">
        <polyline points="16 18 22 12 16 6" />
        <polyline points="8 6 2 12 8 18" />
    </svg>
);

const BuildingIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-8 h-8">
        <rect x="3" y="2" width="18" height="20" rx="2" ry="2" />
        <line x1="12" y1="6" x2="12" y2="18" />
        <line x1="7" y1="10" x2="7" y2="14" />
        <line x1="17" y1="10" x2="17" y2="14" />
    </svg>
);
const BrainIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-8 h-8">
        <polyline points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
    </svg>
);

const GraduationCapIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-8 h-8">
        <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
        <path d="M6 12v5c0 1.7 2.6 3 6 3s6-1.3 6-3v-5" />
    </svg>
);

const HandshakeIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-8 h-8">
        <path d="M11 20H7a2 2 0 01-2-2V5a2 2 0 012-2h4M7 20v-5.2M17 10h.01M17 6h.01M17 14h.01M17 18h.01M17 12a4 4 0 100 8h-4a2 2 0 01-2-2v-4a2 2 0 012-2h4z" />
    </svg>
);

const TrophyIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-8 h-8">
        <path d="M22 9V7h-2.5a5 5 0 00-5-5H9a5 5 0 00-5 5H2v2c0 2 1 4 2 5 1 1 2 2 3 3h10c1-1 2-2 3-3 1-1 2-3 2-5z" />
        <path d="M12 17v4m-3 0h6" />
        <path d="M6 7v3" />
        <path d="M18 7v3" />
    </svg>
);

const TrendingUpIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-8 h-8">
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
    </svg>
);

const UsersIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-8 h-8">
        <path d="M16 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
        <circle cx="8.5" cy="7" r="4" />
        <path d="M20 8v.01" />
        <path d="M17 21v-2a4 4 0 00-4-4h-1" />
        <path d="M20 12v.01" />
        <path d="M20 16v.01" />
    </svg>
);


export default component$(() => {
    return (
        <>
            <Header />

        <section class="bg-neutral-950 text-white py-24 md:py-32">
            <div class="container mx-auto px-6 text-center max-w-5xl">
        
              <h1 class="text-6xl md:text-7xl font-extrabold mb-6 tracking-tight">
                 <span class="text-primary-500">Viplora Tech</span>
                </h1>

            <p class="mx-auto text-xl leading-relaxed max-w-4xl text-white font-bold">
                 नवोन्मेषस्य मार्गे अस्माकं कर्मनिष्ठैव शक्तिः
            </p>



         <p class="mx-auto text-xl leading-relaxed max-w-4xl text-[#B7B3B7]">
             On the path of innovation, dedication is our strength
         </p>

        </div>
    </section>


        <section class="py-36 bg-[#0E0E12] text-white">
         <div class="container mx-auto px-6 text-center max-w-5xl">

             <h2 class="text-4xl font-bold mb-6 tracking-tight text-[#20DEFF]">
                        Our Vision
                    </h2>


                        <p class="mx-auto text-xl leading-relaxed max-w-4xl text-[#B7B3B7]">
                        Our vision is to become a leading India-first, globally trusted technology partner that simplifies and digitises how people live, work and learn, by transforming manual processes into intelligent, secure and accessible digital experiences.
                    </p>
                </div>
            </section>

        <section class="py-24 bg-black text-white">
          <div class="container mx-auto px-6">

           <h2 class="text-4xl font-bold mb-6 text-center text-primary-400">
                Our Mission: Driving Digital Change
            </h2>

             <p class="mx-auto text-xl leading-relaxed max-w-4xl text-[#B7B3B7] text-center mb-16">
             Deliver end-to-end custom software development, AI-based solutions, cloud and web platforms,
              and scalable SaaS products that replace paper- and spreadsheet-driven workflows across industries.
             </p>

                    <div class="grid sm:grid-cols-2 lg:grid-cols-5 gap-6">
                        
                        <div class="p-6 bg-neutral-800 border border-neutral-700 rounded-2xl shadow-lg transition-all duration-300 hover:scale-[1.03] hover:shadow-2xl hover:shadow-primary-500/30 min-h-64 flex flex-col justify-start">
                            <span class="text-3xl text-primary-500 block mb-3">
                                <CodeIcon />
                            </span>
                            <h3 class="text-xl font-bold mb-10">End-to-End Digital Solutions</h3>
                            <p class="text-neutral-300">
                                Deliver end-to-end custom software development, AI-based solutions, cloud and web platforms, 
                                and scalable SaaS products that replace paper- and spreadsheet-driven workflows across industries.
                            </p>
                        </div>
                        
                        <div class="p-6 bg-neutral-800 border border-neutral-700 rounded-2xl shadow-lg transition-all duration-300 hover:scale-[1.03] hover:shadow-2xl hover:shadow-primary-500/30 min-h-64 flex flex-col justify-start">
                            <span class="text-3xl text-primary-500 block mb-3">
                                <BuildingIcon />
                            </span>
                            <h3 class="text-xl font-bold mb-10">Digital Transformation Across Sectors</h3>
                            <p class="text-neutral-300">
                                Drive digital transformation for government, financial services, education, healthcare and SMEs 
                                by providing reliable, user-centric and compliant technology solutions built on modern architectures.
                            </p>
                        </div>

                        <div class="p-6 bg-neutral-800 border border-neutral-700 rounded-2xl shadow-lg transition-all duration-300 hover:scale-[1.03] hover:shadow-2xl hover:shadow-primary-500/30 min-h-64 flex flex-col justify-start">
                            <span class="text-3xl text-primary-500 block mb-3">
                                <BrainIcon />
                            </span>
                            <h3 class="text-xl font-bold mb-10">AI, IoT & Emerging Technologies</h3>
                            <p class="text-neutral-300">
                                Build and continuously enhance proprietary products that leverage AI, IoT, data analytics 
                                and emerging technologies to solve complex, real-world problems at scale.
                            </p>
                        </div>

                        <div class="p-6 bg-neutral-800 border border-neutral-700 rounded-2xl shadow-lg transition-all duration-300 hover:scale-[1.03] hover:shadow-2xl hover:shadow-primary-500/30 min-h-64 flex flex-col justify-start">
                            <span class="text-3xl text-primary-500 block mb-3">
                                <GraduationCapIcon />
                            </span>
                            <h3 class="text-xl font-bold mb-10">Viplora Digital Academy</h3>
                            <p class="text-neutral-300">
                                Operate the Academy as a talent engine offering structured training and internships, producing industry-ready engineers and improving digital literacy.
                            </p>
                        </div>
                        
                        <div class="p-6 bg-neutral-800 border border-neutral-700 rounded-2xl shadow-lg transition-all duration-300 hover:scale-[1.03] hover:shadow-2xl hover:shadow-primary-500/30 min-h-64 flex flex-col justify-start">
                            <span class="text-3xl text-primary-500 block mb-3">
                                <HandshakeIcon />
                            </span>
                            <h3 class="text-xl font-bold mb-10">Accountable Long-Term Partner</h3>
                            <p class="text-neutral-300">
                                Taking ownership of outcomes, upholding humanity and ethics, and measuring success through client impact and sustainable profitability.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

<section class="py-24 bg-[#0E0E12] text-white">
  <div class="container mx-auto px-6">

    <h2 class="text-4xl font-bold mb-6 text-center text-[#20DEFF]">
      Our Core Values
    </h2>

    <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mt-12">

      <div
        class="p-6 bg-[#16161A]
               border border-[rgba(32,222,255,0.25)]
               rounded-xl shadow-lg
               transition-all duration-300
               hover:shadow-xl hover:shadow-[#20DEFF]/30
               hover:scale-[1.02]
               min-h-48 flex flex-col justify-start"
      >
        <h3 class="text-xl font-semibold mb-4 h-16 flex items-center text-white">
          Customer Success & Ownership
        </h3>
        <p class="text-[#B7B3B7]">
          We prioritize customer success and ownership over mere delivery, ensuring accountability for outcomes.
        </p>
      </div>

      <div
        class="p-6 bg-[#16161A]
               border border-[rgba(32,222,255,0.25)]
               rounded-xl shadow-lg
               transition-all duration-300
               hover:shadow-xl hover:shadow-[#20DEFF]/30
               hover:scale-[1.02]
               min-h-48 flex flex-col justify-start"
      >
        <h3 class="text-xl font-semibold mb-4 h-16 flex items-center text-white">
          Full-Stack Innovation
        </h3>
        <p class="text-[#B7B3B7]">
          Innovation across the full stack—from hardware and IoT to software, cloud and AI.
        </p>
      </div>

      <div
        class="p-6 bg-[#16161A]
               border border-[rgba(32,222,255,0.25)]
               rounded-xl shadow-lg
               transition-all duration-300
               hover:shadow-xl hover:shadow-[#20DEFF]/30
               hover:scale-[1.02]
               min-h-48 flex flex-col justify-start"
      >
        <h3 class="text-xl font-semibold mb-4 h-16 flex items-center text-white">
          India-First Global Quality
        </h3>
        <p class="text-[#B7B3B7]">
          Driving India-first impact while maintaining a global standard of quality.
        </p>
      </div>

      <div
        class="p-6 bg-[#16161A]
               border border-[rgba(32,222,255,0.25)]
               rounded-xl shadow-lg
               transition-all duration-300
               hover:shadow-xl hover:shadow-[#20DEFF]/30
               hover:scale-[1.02]
               min-h-48 flex flex-col justify-start"
      >
        <h3 class="text-xl font-semibold mb-4 h-16 flex items-center text-white">
          Integrity & Zero-Compromise Ethics
        </h3>
        <p class="text-[#B7B3B7]">
          Upholding humanity, respect for people, and zero-compromise ethics in every engagement.
        </p>
      </div>

    </div>
  </div>
</section>


<section class="py-24 bg-black text-white">
  <div class="container mx-auto px-6">

    <h2 class="text-4xl font-bold mb-6 text-center text-primary-400">
      Strategic Aims
    </h2>

    <p class="mx-auto text-xl leading-relaxed max-w-xl text-[#B7B3B7] text-center mb-16">
      Our focused goals to ensure sustainable growth and market leadership in the coming years.
    </p>

  


                    <div class="space-y-12 max-w-4xl mx-auto">
                        
                        <div class="flex items-start bg-neutral-800 p-6 rounded-xl border-l-4 border-primary-500 shadow-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-primary-500/50 cursor-pointer">
                            <div class="flex-shrink-0 text-3xl mr-4 text-primary-500">
                                <TrophyIcon />
                            </div>
                            <div>
                                <h3 class="text-2xl font-semibold mb-1">Establish Market Recognition</h3>
                                <p class="text-neutral-300">
                                    Establish Viplora Tech as a recognised <span class="text-primary-400">digital-transformation</span> and <span class="text-primary-400">AI solutions provider</span> in India, with a growing international client base.
                                </p>
                            </div>
                        </div>

                        <div class="flex items-start bg-neutral-800 p-6 rounded-xl border-l-4 border-primary-500 shadow-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-primary-500/50 cursor-pointer">
                            <div class="flex-shrink-0 text-3xl mr-4 text-primary-500">
                                <TrendingUpIcon />
                            </div>
                            <div>
                                <h3 class="text-2xl font-semibold mb-1">Launch and Scale Flagship SaaS</h3>
                                <p class="text-neutral-300">
                                    Launch and scale at least <span class="text-primary-400">two flagship</span> SaaS products generating recurring global revenue.
                                </p>
                            </div>
                        </div>

                        <div class="flex items-start bg-neutral-800 p-6 rounded-xl border-l-4 border-primary-500 shadow-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-primary-500/50 cursor-pointer">
                            <div class="flex-shrink-0 text-3xl mr-4 text-primary-500">
                                <UsersIcon />
                            </div>
                            <div>
                                <h3 class="text-2xl font-semibold mb-1">Empower 1,000+ Learners</h3>
                                <p class="text-neutral-300">
                                    Train <span class="text-primary-400">1,000+ learners</span> through Viplora Digital Academy and place a significant share in internships and full-time roles within the tech ecosystem.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </>
    );
});






