import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  FaArrowRight,
  FaShieldAlt,
  FaTruck,
  FaStar,
  FaAward,
  FaFire,
} from 'react-icons/fa';

// Asset imports from existing project
import coolerImg from "../../Assets/cooler.webp";
import chimminyImg from "../../Assets/chimminy.jpeg";
import dinnersetImg from "../../Assets/dinnerset.jpeg";
import indectionstoveImg from "../../Assets/indectionstove.jpeg";
import ovenImg from "../../Assets/oven.jpeg";
import nonsticcasaroleImg from "../../Assets/nonsticcasarole.jpeg";
import pressurecookerImg from "../../Assets/pressurecooker.webp";
import mixerImg from "../../Assets/mixer.webp";

const spotlightItems = [
  {
    id: 1,
    img: nonsticcasaroleImg,
    title: "Triply Non-Stick Casserole",
    category: "Cookware",
    tag: "Bestseller",
    offer: "Up to 30% OFF",
    desc: "Heavy-gauge ceramic coating for even heat distribution."
  },
  {
    id: 2,
    img: indectionstoveImg,
    title: "Smart Induction Cooktop",
    category: "Cooktops",
    tag: "Energy Smart",
    offer: "Flat ₹500 OFF",
    desc: "Precision temperature control with auto shut-off safety."
  },
  {
    id: 3,
    img: chimminyImg,
    title: "Silent Auto-Clean Chimney",
    category: "Appliances",
    tag: "High Suction",
    offer: "Special Deal",
    desc: "Filterless baffle technology for smoke-free cooking."
  },
  {
    id: 4,
    img: dinnersetImg,
    title: "Artisanal Ceramic Dinner Set",
    category: "Dining",
    tag: "Premium",
    offer: "Best Value",
    desc: "Microwave & dishwasher safe 32-piece dining set."
  },
  {
    id: 5,
    img: pressurecookerImg,
    title: "Stainless Steel Pressure Cooker",
    category: "Cookware",
    tag: "Durable",
    offer: "20% OFF",
    desc: "Food-grade stainless steel with induction friendly base."
  },
  {
    id: 6,
    img: mixerImg,
    title: "Heavy Duty 750W Mixer Grinder",
    category: "Appliances",
    tag: "Copper Motor",
    offer: "Top Rated",
    desc: "Tough stainless steel jars for wet & dry spices."
  },
  {
    id: 7,
    img: coolerImg,
    title: "High Airflow Personal Cooler",
    category: "Cooling",
    tag: "Seasonal",
    offer: "Limited Stock",
    desc: "Honeycomb cooling pads with silent inverter motor."
  },
  {
    id: 8,
    img: ovenImg,
    title: "Digital Convection OTG Oven",
    category: "Baking",
    tag: "Precision",
    offer: "Save ₹1200",
    desc: "Motorized rotisserie for perfect grilling and baking."
  },
];

function Hero() {
  const navigate = useNavigate();

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#F7F3ED] via-[#FAF8F5] to-white pt-8 pb-16">
      
      {/* Subtle Background Glows */}
      <div className="absolute top-0 right-10 w-96 h-96 bg-[#C05621]/10 rounded-full blur-3xl pointer-events-none -z-0" />
      <div className="absolute top-40 left-0 w-80 h-80 bg-[#1E3A2F]/10 rounded-full blur-3xl pointer-events-none -z-0" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Main Split Hero Banner */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center pt-4 pb-12">
          
          {/* Left Text / Value Column */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            
            {/* Pill Tag */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-stone-200 shadow-xs text-xs font-semibold text-[#1E3A2F]">
              <span className="w-2 h-2 rounded-full bg-[#C05621] animate-pulse" />
              <span>Premium Home & Kitchen Collection 2026</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-stone-900 leading-[1.15]">
              Thoughtful Design for <br className="hidden sm:inline" />
              <span className="text-[#1E3A2F]">Modern Indian</span>{" "}
              <span className="text-[#C05621] italic font-serif">Living.</span>
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-stone-600 max-w-xl mx-auto lg:mx-0 leading-relaxed">
              Equip your kitchen with heavy-gauge cookware, smart appliances, and timeless dinnerware designed for effortless cooking and everyday family moments.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              <button
                onClick={() => navigate("/products")}
                className="w-full sm:w-auto px-8 py-4 bg-[#1E3A2F] hover:bg-[#274f3f] text-white font-semibold rounded-2xl shadow-lg shadow-[#1E3A2F]/20 hover:shadow-xl transition-all duration-200 flex items-center justify-center gap-3 group"
              >
                <span>Explore All Products</span>
                <FaArrowRight className="text-sm group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={() => {
                  const el = document.getElementById("bestsellers-section");
                  if (el) el.scrollIntoView({ behavior: "smooth" });
                  else navigate("/products");
                }}
                className="w-full sm:w-auto px-8 py-4 bg-white hover:bg-stone-50 border border-stone-200 text-stone-800 font-semibold rounded-2xl shadow-xs transition-all hover:border-stone-300"
              >
                View Best Sellers
              </button>
            </div>

            {/* Metric / Trust Stats */}
            <div className="pt-6 border-t border-stone-200/80 grid grid-cols-3 gap-4 max-w-lg mx-auto lg:mx-0">
              <div className="text-center lg:text-left">
                <p className="text-2xl sm:text-3xl font-extrabold text-[#1E3A2F]">50k+</p>
                <p className="text-xs text-stone-500 font-medium mt-0.5">Happy Households</p>
              </div>
              <div className="text-center lg:text-left">
                <p className="text-2xl sm:text-3xl font-extrabold text-[#C05621] flex items-center justify-center lg:justify-start gap-1">
                  <span>4.9</span>
                  <FaStar className="text-amber-500 text-lg" />
                </p>
                <p className="text-xs text-stone-500 font-medium mt-0.5">Average Rating</p>
              </div>
              <div className="text-center lg:text-left">
                <p className="text-2xl sm:text-3xl font-extrabold text-stone-800">100%</p>
                <p className="text-xs text-stone-500 font-medium mt-0.5">Food-Grade Safe</p>
              </div>
            </div>

          </div>

          {/* Right Featured Showcase Card */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none bg-white p-6 rounded-3xl shadow-xl border border-stone-200/70">
              
              {/* Badge Overlay */}
              <div className="absolute top-4 left-4 z-20 flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#1E3A2F] text-white text-xs font-semibold shadow-md">
                <FaFire className="text-amber-400" />
                <span>Featured Collection</span>
              </div>

              <div className="absolute top-4 right-4 z-20 px-3 py-1 rounded-full bg-[#C05621]/10 text-[#C05621] text-xs font-bold">
                Special Pricing
              </div>

              {/* Main Feature Image Container */}
              <div className="h-72 sm:h-80 w-full rounded-2xl bg-gradient-to-b from-[#FBF8F4] to-[#F2EDE4] flex items-center justify-center p-6 relative overflow-hidden group">
                <img
                  src={nonsticcasaroleImg}
                  alt="Non-stick Casserole"
                  className="max-h-64 w-auto object-contain drop-shadow-2xl group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              {/* Card Meta Content */}
              <div className="mt-5 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs uppercase tracking-wider font-bold text-[#C05621]">
                    Cookware Essentials
                  </span>
                  <div className="flex items-center text-amber-500 text-xs">
                    <FaStar /><FaStar /><FaStar /><FaStar /><FaStar />
                    <span className="ml-1.5 text-stone-600 font-semibold text-xs">(4.9/5)</span>
                  </div>
                </div>

                <h3 className="text-xl font-bold text-stone-900">
                  Triply Non-Stick Induction Casserole
                </h3>

                <p className="text-xs text-stone-500 line-clamp-2">
                  Multi-layered encapsulated base for even heating, zero hot spots, and energy-efficient cooking.
                </p>

                <div className="pt-3 flex items-center justify-between">
                  <div>
                    <span className="text-xs text-stone-400 line-through mr-2">₹1,999</span>
                    <span className="text-2xl font-black text-[#1E3A2F]">₹1,299</span>
                  </div>
                  <button
                    onClick={() => navigate("/products")}
                    className="px-5 py-2.5 bg-[#C05621] hover:bg-[#a84919] text-white font-semibold text-xs rounded-xl shadow-xs transition-colors"
                  >
                    View Details
                  </button>
                </div>
              </div>

            </div>
          </div>

        </div>

        {/* Dynamic Category Spotlight Carousel / Scrolling Ribbon */}
        <div className="mt-10 pt-10 border-t border-stone-200/70">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-6 gap-2">
            <div>
              <p className="text-xs uppercase tracking-wider font-bold text-[#C05621]">
                Curated Essentials
              </p>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-stone-900">
                Explore Popular Categories
              </h2>
            </div>
            <button
              onClick={() => navigate("/products")}
              className="text-sm font-semibold text-[#1E3A2F] hover:text-[#C05621] transition-colors inline-flex items-center gap-1.5"
            >
              <span>See Entire Catalog</span>
              <FaArrowRight className="text-xs" />
            </button>
          </div>

          {/* Marquee Carousel of Cards */}
          <div className="overflow-hidden relative py-2">
            <div className="flex animate-scroll gap-6">
              {[...spotlightItems, ...spotlightItems].map((item, index) => (
                <div
                  key={index}
                  className="min-w-[260px] sm:min-w-[280px] bg-white rounded-2xl p-4 shadow-sm hover:shadow-md border border-stone-200/80 transition-all flex flex-col group"
                >
                  <div className="relative h-44 rounded-xl bg-[#FAF8F5] flex items-center justify-center p-3 overflow-hidden">
                    <span className="absolute top-2.5 left-2.5 bg-[#1E3A2F] text-white text-[10px] font-bold px-2 py-0.5 rounded-md z-10">
                      {item.tag}
                    </span>
                    <span className="absolute top-2.5 right-2.5 bg-amber-100 text-amber-800 text-[10px] font-bold px-2 py-0.5 rounded-md z-10">
                      {item.offer}
                    </span>
                    <img
                      src={item.img}
                      alt={item.title}
                      className="max-h-36 w-auto object-contain group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>

                  <div className="pt-3 flex-1 flex flex-col justify-between">
                    <div>
                      <span className="text-[11px] font-semibold text-stone-400 uppercase tracking-wider">
                        {item.category}
                      </span>
                      <h4 className="text-sm font-bold text-stone-800 group-hover:text-[#1E3A2F] transition-colors line-clamp-1 mt-0.5">
                        {item.title}
                      </h4>
                      <p className="text-xs text-stone-500 line-clamp-2 mt-1 leading-relaxed">
                        {item.desc}
                      </p>
                    </div>

                    <button
                      onClick={() => navigate("/products")}
                      className="mt-3.5 w-full py-2 bg-stone-100 hover:bg-[#1E3A2F] hover:text-white text-stone-800 text-xs font-semibold rounded-xl transition-all duration-200"
                    >
                      Shop Category
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}

export default Hero;
