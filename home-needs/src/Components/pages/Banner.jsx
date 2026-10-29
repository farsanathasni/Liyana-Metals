import React from "react";
import { useNavigate } from "react-router-dom";
import { FaTag, FaArrowRight, FaClock, FaGift } from "react-icons/fa";

function Banner() {
  const navigate = useNavigate();

  return (
    <section className="py-16 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="relative rounded-3xl bg-gradient-to-r from-[#1E3A2F] via-[#2A4E3F] to-[#C05621] p-8 sm:p-12 lg:p-16 text-white shadow-2xl overflow-hidden">
          
          {/* Subtle Decorative Geometric Circles */}
          <div className="absolute -right-20 -top-20 w-80 h-80 rounded-full bg-white/10 blur-2xl pointer-events-none" />
          <div className="absolute -left-20 -bottom-20 w-80 h-80 rounded-full bg-black/10 blur-2xl pointer-events-none" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left Content */}
            <div className="lg:col-span-8 space-y-5 text-center lg:text-left">
              
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/15 backdrop-blur-md text-amber-200 text-xs font-bold tracking-wider uppercase border border-white/10">
                <FaGift className="text-sm" />
                <span>Seasonal Home Renewal Sale</span>
              </div>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight">
                Upgrade Your Kitchen with Up to <br className="hidden sm:inline" />
                <span className="text-amber-300 font-serif italic">40% Off</span> Premium Essentials.
              </h2>

              <p className="text-emerald-100 text-sm sm:text-base max-w-xl mx-auto lg:mx-0 leading-relaxed font-light">
                Upgrade your cookware and everyday appliances with our heavy-duty triply stainless steel, smart induction stoves, and food-grade dinner sets.
              </p>

              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 pt-2">
                <button
                  onClick={() => navigate("/products")}
                  className="px-8 py-4 bg-white text-[#1E3A2F] hover:bg-amber-50 font-bold rounded-2xl shadow-lg transition-all duration-200 flex items-center gap-3 text-sm group"
                >
                  <span>Shop The Collection</span>
                  <FaArrowRight className="text-xs group-hover:translate-x-1 transition-transform" />
                </button>

                <div className="px-4 py-3 bg-black/20 backdrop-blur-md rounded-2xl border border-white/15 text-xs text-white flex items-center gap-2 font-mono">
                  <FaTag className="text-amber-300" />
                  <span>Use Code: <strong>LIYANAMETALS</strong> at checkout</span>
                </div>
              </div>

            </div>

            {/* Right Spotlight Card */}
            <div className="lg:col-span-4 flex justify-center">
              <div className="w-full max-w-xs bg-white/10 backdrop-blur-md rounded-3xl p-6 border border-white/20 text-center shadow-inner">
                <div className="w-14 h-14 mx-auto rounded-2xl bg-amber-400 text-[#1E3A2F] flex items-center justify-center font-extrabold text-2xl shadow-md">
                  %
                </div>
                
                <h3 className="text-xl font-bold mt-4">
                  Limited Time Offers
                </h3>
                
                <p className="text-xs text-emerald-100 mt-1">
                  Applicable on selected non-stick cookware, chimneys & dinner sets.
                </p>

                <div className="mt-5 pt-4 border-t border-white/15 text-xs flex items-center justify-center gap-2 text-amber-200">
                  <FaClock />
                  <span>Dispatches within 24 Hours</span>
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}

export default Banner;
