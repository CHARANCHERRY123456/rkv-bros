// src/components/LandingPage.jsx
import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

const features = [
  {
    title: "Assignments & Collaboration",
    description: "Access assignments, collaborate with peers, and even do it anonymously using a duplicate ID.",
  },
  {
    title: "Smart Student Search",
    description: "Easily search students by name, ID, or batch to view their profiles and connect.",
  },
  {
    title: "Join Groups by Interest",
    description: "Join academic or interest-based groups and collaborate with like-minded students.",
  },
  {
    title: "Batch-wise Info (R20, R21...)",
    description: "Browse students grouped by batches like R20, R21, and more.",
  },
  {
    title: "AI Chatbot Help",
    description: "Get help anytime with our intelligent chatbot about RkvBros or student info.",
  },
  {
    title: "Student Analytics",
    description: "View charts and insights on student data and activity.",
  },
  {
    title: "News & Feed (Coming Soon)",
    description: "Soon, you can post news, share feeds, and stay connected!",
  },
];

const images = [
  {
    src: "https://imgs.search.brave.com/_blzFkZBXjARTJP0kuQ74zQzpI0qt_tRje6BaJOrjqw/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9jb250/ZW50LmpkbWFnaWNi/b3guY29tL3YyL2Nv/bXAva2FkYXBhL3E0/Lzk5OTlwODU2Mi44/NTYyLjE4MDkwNTE1/MDMyNC5wMnE0L2Nh/dGFsb2d1ZS9yZ3Vr/dC1paWl0LWlkdXB1/bGFwYXlhLWthZGFw/YS11bml2ZXJzaXRp/ZXMtN3hscTVxMG5h/MC5qcGc_dz0zODQw/JnE9NzU",
    caption: "Explore Our College Campus",
  },
  {
    src: "https://imgs.search.brave.com/ds9Xb3K8p3EssE2mzvlY1S6xNA9S-aaZRh11xt7Pzig/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9jb250/ZW50LmpkbWFnaWNi/b3guY29tL3YyL2Nv/bXAva2FkYXBhL3M1/Lzk5OTlwODU2Mi44/NTYyLjIyMTAyMTAx/MzU0OS5sNHM1L2Nh/dGFsb2d1ZS9yZ3Vr/dC1paWl0LWthZGFw/YS1jb2xsZWdlcy13/NHE0N3Y1ejhoLmpw/Zz93PTM4NDAmcT03/NQ",
    caption: "Modern Learning Spaces",
  },
  {
    src: "https://imgs.search.brave.com/i9SDwOJCARLLnSOCNWuMBJibGdgxZNtJ8K4092K5uMo/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9jb250/ZW50LmpkbWFnaWNi/b3guY29tL3YyL2Nv/bXAva2FkYXBhL3M1/Lzk5OTlwODU2Mi44/NTYyLjIyMTAyMTAx/MzU0OS5sNHM1L2Nh/dGFsb2d1ZS9yZ3Vr/dC1paWl0LWthZGFw/YS1jb2xsZWdlcy11/dTB0dTZ4czJkLmpw/Zz93PTM4NDAmcT03/NQ",
    caption: "Join Our Thriving Community",
  },
];

export default function LandingPage() {
  return (
    <div className="font-sans text-gray-800">
      {/* Hero */}
      <section className="bg-gradient-to-r from-gray-800 via-gray-700 to-gray-900 text-white py-20 px-6 text-center">
      {/* <section className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 text-white py-20 px-6 text-center"> */}
        <h1 className="text-5xl font-bold mb-4 animate-fade-in-down">
          Welcome to <span className="text-yellow-300">RkvBros</span>
        </h1>
        <p className="max-w-2xl mx-auto text-lg">
          Get assignments, find students, collaborate, chat with AI, and explore analytics — all in one platform.
        </p>
      </section>

      {/* Carousel */}
      <section className="mt-10 max-w-5xl mx-auto px-4">
        <Carousel
          showThumbs={false}
          infiniteLoop
          autoPlay
          interval={4000}
          showStatus={false}
          className="rounded-xl shadow-lg"
        >
          {images.map((img, idx) => (
            <div key={idx}>
              <img src={img.src} alt={`slide-${idx}`} className="rounded-xl max-h-[400px] object-cover" />
              {/* <p className="legend text-base">{img.caption}</p> */}
            </div>
          ))}
        </Carousel>
      </section>

      {/* Features */}
      <section className="py-16 bg-gray-50 px-4">
        <h2 className="text-3xl font-bold text-center mb-12 text-indigo-700">Platform Highlights</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {features.map((feature, idx) => (
            <div
              key={idx}
              className="bg-white rounded-xl shadow-md p-6 hover:shadow-xl transition duration-300 border-t-4 border-indigo-600"
            >
              <h3 className="text-xl font-semibold text-indigo-700 mb-2">{feature.title}</h3>
              <p className="text-gray-700">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Future Preview */}
      <section className="py-16 bg-white text-center">
        <h2 className="text-3xl font-bold text-indigo-700 mb-4">What's Coming Next?</h2>
        <p className="max-w-2xl mx-auto text-lg mb-6">
          Stay tuned for amazing features like News Feed, Posts, and more engaging tools for collaboration!
        </p>
        <div className="flex justify-center gap-6 text-4xl animate-bounce">
          <span>✨</span>
          <span>🚀</span>
          <span>📢</span>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-indigo-700 dark:bg-gray-900 text-white py-6 text-center">
        <p className="text-sm">
          Made with ❤️ at IIIT RGUKT RK Valley | &copy; {new Date().getFullYear()} RkvBros
        </p>
      </footer>
    </div>
  );
}
