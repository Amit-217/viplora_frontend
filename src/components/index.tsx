import { component$ } from '@builder.io/qwik';
import Header from './Header';
import Footer from './Footer';


export default component$(() => {
  return (
    <>
      <Header />
      <main class="bg-white py-20">
        <div class="container mx-auto px-6">
          <h1 class="text-4xl font-bold text-gray-900">Terms & Conditions</h1>
          <div class="prose lg:prose-xl mt-8 max-w-4xl text-gray-700 text-justify">
            <p>Last updated: {new Date().toLocaleDateString()}</p>
            <p>Welcome to Viplora. This is the placeholder for your Terms & Conditions.</p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
});