import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Navbar from '../Layout/Navbar';
import Footer from '../Layout/Footer';
import {
  FaHome,
  FaAward,
  FaCheckCircle,
  FaShieldAlt,
  FaHeart,
  FaArrowRight,
  FaUsers,
  FaTruck,
  FaLeaf,
} from 'react-icons/fa';

function About() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#FAF8F5] flex flex-col">
      <Navbar />

      <main className="flex-1">
        
        {/* Hero Section */}
        <section className="relative overflow-hidden py-20 bg-gradient-to-b from-[#F2ECE3] to-[#FAF8F5]">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 space-y-6">
            
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-stone-200 text-xs font-bold text-[#1E3A2F] shadow-xs">
              <FaHome className="text-[#C05621]" />
              <span>Our Story & Philosophy</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-stone-900 tracking-tight leading-tight">
              Crafting <span className="text-[#1E3A2F]">Homes</span>, <br className="hidden sm:inline" />
              Not Just <span className="text-[#C05621] italic font-serif">Houses.</span>
            </h1>

            <p className="text-base sm:text-lg text-stone-600 max-w-2xl mx-auto leading-relaxed">
              Welcome to <strong>Liyana Metals</strong> — where timeless design, heavy-gauge durability, and everyday convenience meet in modern Indian kitchens.
            </p>

            <div className="pt-4 flex justify-center gap-4">
              <button
                onClick={() => navigate("/products")}
                className="px-8 py-3.5 bg-[#1E3A2F] hover:bg-[#284f3f] text-white font-bold rounded-2xl shadow-lg transition-all flex items-center gap-2 text-sm"
              >
                <span>Explore Our Essentials</span>
                <FaArrowRight className="text-xs" />
              </button>
            </div>

          </div>
        </section>

        {/* Brand Core Pillars */}
        <section className="py-20 bg-white border-y border-stone-200/70">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              
              <div className="space-y-6">
                <span className="text-xs uppercase tracking-wider font-bold text-[#C05621]">
                  The Home Needs Difference
                </span>
                <h2 className="text-3xl sm:text-4xl font-extrabold text-stone-900 tracking-tight">
                  Curated for the Indian Culinary Heritage
                </h2>
                <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
                  We don't merely manufacture appliances; we elevate everyday home rituals. Indian cooking involves complex spices, high heat, and hearty family portions. Our non-stick casseroles, triply tawas, and heavy-duty mixer grinders are engineered to withstand rigorous daily use while remaining effortless to clean.
                </p>

                <div className="grid grid-cols-2 gap-4 pt-2">
                  <div className="bg-[#FAF8F5] p-5 rounded-2xl border border-stone-200/70">
                    <p className="text-3xl font-black text-[#1E3A2F]">50,000+</p>
                    <p className="text-xs font-bold text-stone-800 mt-1">Families Served</p>
                    <p className="text-[11px] text-stone-500 mt-0.5">Across 45+ Indian cities</p>
                  </div>
                  <div className="bg-[#FAF8F5] p-5 rounded-2xl border border-stone-200/70">
                    <p className="text-3xl font-black text-[#C05621]">25+</p>
                    <p className="text-xs font-bold text-stone-800 mt-1">Quality Benchmarks</p>
                    <p className="text-[11px] text-stone-500 mt-0.5">Tested before dispatch</p>
                  </div>
                </div>
              </div>

              {/* Pillars Cards */}
              <div className="space-y-4">
                <div className="p-6 rounded-3xl bg-[#FAF8F5] border border-stone-200/80 shadow-xs flex items-start gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-[#1E3A2F]/10 text-[#1E3A2F] flex items-center justify-center text-xl flex-shrink-0">
                    <FaShieldAlt />
                  </div>
                  <div>
                    <h3 className="font-bold text-stone-900 text-base">Certified Food-Grade Standard</h3>
                    <p className="text-xs text-stone-600 mt-1 leading-relaxed">
                      Every pan, cooker, and container is 100% PFOA and heavy-metal free, guaranteeing your family's health and pure food taste.
                    </p>
                  </div>
                </div>

                <div className="p-6 rounded-3xl bg-[#FAF8F5] border border-stone-200/80 shadow-xs flex items-start gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-[#C05621]/10 text-[#C05621] flex items-center justify-center text-xl flex-shrink-0">
                    <FaAward />
                  </div>
                  <div>
                    <h3 className="font-bold text-stone-900 text-base">Energy-Smart Precision</h3>
                    <p className="text-xs text-stone-600 mt-1 leading-relaxed">
                      Our induction cooktops and motor appliances are tuned for optimal Indian voltage, reducing electricity wastage while delivering maximum power.
                    </p>
                  </div>
                </div>

                <div className="p-6 rounded-3xl bg-[#FAF8F5] border border-stone-200/80 shadow-xs flex items-start gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-emerald-600/10 text-emerald-700 flex items-center justify-center text-xl flex-shrink-0">
                    <FaHeart />
                  </div>
                  <div>
                    <h3 className="font-bold text-stone-900 text-base">Customer-First Service</h3>
                    <p className="text-xs text-stone-600 mt-1 leading-relaxed">
                      Direct manufacturer pricing, prompt warranty resolution, and real human support from our Tamil Nadu distribution headquarters.
                    </p>
                  </div>
                </div>
              </div>

            </div>

          </div>
        </section>

      </main>

      <Footer />
    </div>
  );
}

export default About;
