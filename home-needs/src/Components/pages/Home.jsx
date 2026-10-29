import React from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../Layout/Navbar';
import Footer from '../Layout/Footer';
import Hero from '../Hero/Hero';
import BestSeller from './BestSeller';
import Banner from './Banner';
import {
  FaShieldAlt,
  FaTruck,
  FaHeadset,
  FaAward,
  FaArrowRight,
} from 'react-icons/fa';

// Assets for category showcases
import dinnersetImg from "../../Assets/dinnerset.jpeg";
import chimminyImg from "../../Assets/chimminy.jpeg";
import saucepanImg from "../../Assets/saucepan.jpeg";
import mixerImg from "../../Assets/mixer.webp";

function Home() {
  const navigate = useNavigate();

  const curatedCategories = [
    {
      title: "Triply & Non-Stick Cookware",
      category: "Cookware",
      items: "Kadai, Pans, Casseroles & Tawas",
      img: saucepanImg,
      badge: "Heavy Duty",
    },
    {
      title: "Smart Kitchen Appliances",
      category: "Appliances",
      items: "Mixer Grinders, Kettles & Choppers",
      img: mixerImg,
      badge: "Energy Saver",
    },
    {
      title: "Cooktops & Auto Chimneys",
      category: "Cooktop & Chimney",
      items: "Induction Stoves & Smoke Chimneys",
      img: chimminyImg,
      badge: "Modern Tech",
    },
    {
      title: "Artisanal Table & Dinnerware",
      category: "Homeware",
      items: "Ceramic Sets, Glasses & Mugs",
      img: dinnersetImg,
      badge: "Crafted Elegance",
    },
  ];

  return (
    <div className="min-h-screen bg-[#FAF8F5] flex flex-col">
      <Navbar />
      
      <main className="flex-1">
        {/* Main Hero Showcase */}
        <Hero />

        {/* Curated Category Grid Section */}
        <section className="py-16 bg-white border-y border-stone-200/60">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-3">
              <div>
                <span className="text-xs uppercase tracking-wider font-bold text-[#C05621]">
                  Designed for Every Routine
                </span>
                <h2 className="text-3xl font-extrabold text-stone-900 mt-1">
                  Shop by Specialty
                </h2>
              </div>
              <button
                onClick={() => navigate("/products")}
                className="text-sm font-bold text-[#1E3A2F] hover:text-[#C05621] transition-colors inline-flex items-center gap-2"
              >
                <span>Browse All Collections</span>
                <FaArrowRight className="text-xs" />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {curatedCategories.map((cat, idx) => (
                <div
                  key={idx}
                  onClick={() => navigate("/products")}
                  className="group relative bg-[#FAF8F5] rounded-3xl p-6 border border-stone-200/80 hover:border-[#1E3A2F]/40 hover:bg-white hover:shadow-xl transition-all duration-300 cursor-pointer flex flex-col justify-between"
                >
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-white text-[#1E3A2F] border border-stone-200 shadow-xs">
                      {cat.badge}
                    </span>
                    <span className="text-xs font-semibold text-[#C05621] group-hover:translate-x-1 transition-transform">
                      Explore &rarr;
                    </span>
                  </div>

                  <div className="h-44 w-full flex items-center justify-center py-2">
                    <img
                      src={cat.img}
                      alt={cat.title}
                      className="max-h-36 w-auto object-contain group-hover:scale-110 transition-transform duration-300 drop-shadow-xs"
                    />
                  </div>

                  <div className="mt-4 pt-3 border-t border-stone-200/60">
                    <h3 className="font-bold text-base text-stone-900 group-hover:text-[#1E3A2F] transition-colors">
                      {cat.title}
                    </h3>
                    <p className="text-xs text-stone-500 mt-1">
                      {cat.items}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Dynamic Best Sellers Section */}
        <BestSeller />

        {/* Seasonal Editorial Promotional Banner */}
        <Banner />

        {/* Benefits & Trust Standards */}
        <section className="py-20 bg-[#FAF8F5] border-t border-stone-200/80">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-14">
              <span className="text-xs uppercase font-bold tracking-wider text-[#C05621]">
                Why Choose Us
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-stone-900 mt-2">
                The Liyana Metals Standard
              </h2>
              <p className="text-stone-600 text-sm sm:text-base mt-2">
                We blend traditional Indian kitchen requirements with state-of-the-art engineering.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              
              <div className="bg-white p-7 rounded-3xl border border-stone-200/80 shadow-xs hover:shadow-lg transition-all duration-300">
                <div className="w-12 h-12 rounded-2xl bg-[#1E3A2F]/10 text-[#1E3A2F] flex items-center justify-center text-xl mb-5">
                  <FaShieldAlt />
                </div>
                <h3 className="text-lg font-bold text-stone-900 mb-2">Food-Grade Certified</h3>
                <p className="text-xs text-stone-500 leading-relaxed">
                  100% PFOA and toxin-free materials that preserve the natural flavors and nutrients of your home cooking.
                </p>
              </div>

              <div className="bg-white p-7 rounded-3xl border border-stone-200/80 shadow-xs hover:shadow-lg transition-all duration-300">
                <div className="w-12 h-12 rounded-2xl bg-[#C05621]/10 text-[#C05621] flex items-center justify-center text-xl mb-5">
                  <FaTruck />
                </div>
                <h3 className="text-lg font-bold text-stone-900 mb-2">Fast Nationwide Dispatch</h3>
                <p className="text-xs text-stone-500 leading-relaxed">
                  Carefully boxed and safely delivered across all Indian cities with live tracking updates.
                </p>
              </div>

              <div className="bg-white p-7 rounded-3xl border border-stone-200/80 shadow-xs hover:shadow-lg transition-all duration-300">
                <div className="w-12 h-12 rounded-2xl bg-amber-500/10 text-amber-700 flex items-center justify-center text-xl mb-5">
                  <FaAward />
                </div>
                <h3 className="text-lg font-bold text-stone-900 mb-2">Built to Last Years</h3>
                <p className="text-xs text-stone-500 leading-relaxed">
                  Rigidly tested against heavy Indian heat cycles, spices, and everyday family dishwashing.
                </p>
              </div>

              <div className="bg-white p-7 rounded-3xl border border-stone-200/80 shadow-xs hover:shadow-lg transition-all duration-300">
                <div className="w-12 h-12 rounded-2xl bg-emerald-600/10 text-emerald-700 flex items-center justify-center text-xl mb-5">
                  <FaHeadset />
                </div>
                <h3 className="text-lg font-bold text-stone-900 mb-2">Direct Customer Care</h3>
                <p className="text-xs text-stone-500 leading-relaxed">
                  Friendly support in English, Tamil, and Malayalam ready to help with product warranties and orders.
                </p>
              </div>

            </div>
          </div>
        </section>

      </main>

      <Footer />
    </div>
  );
}

export default Home;
