import React from "react";

function Banner() {
  return (
<section className="py-15 bg-gray-50">
  <div className="max-w-5xl mx-auto px-6">

    <div className="bg-gradient-to-r from-amber-500 to-orange-600 rounded-3xl p-20 shadow-xl p-10 flex flex-col md:flex-row items-center justify-between">

      {/* Left Content */}
      <div className="text-white text-center md:text-left">
        <p className="text-sm uppercase tracking-widest mb-2">
          🎄 Limited Time Offer
        </p>

        <h1 className="text-4xl md:text-5xl font-extrabold leading-tight">
          X-MAS SALE
        </h1>

        <p className="text-2xl md:text-3xl font-semibold mt-3">
          Up to <span className="text-yellow-300">50% OFF</span>
        </p>

        <p className="mt-4 max-w-md text-white/90">
          Celebrate Christmas with amazing discounts on premium home &
          kitchen essentials. Hurry, offers end soon!
        </p>

        <button className="mt-6 bg-white text-amber-700 font-semibold px-7 py-3 rounded-lg hover:bg-gray-100 transition">
          Shop Now 🎁
        </button>
      </div>

      {/* Right Offer Box */}
      <div className="mt-10 md:mt-0">
        <div className="bg-white/20 backdrop-blur-md rounded-2xl p-8 text-center text-white">
          <p className="text-lg font-medium">Christmas Special</p>
          <h2 className="text-4xl font-bold mt-2">50% OFF</h2>
          <p className="text-sm mt-2">On Selected Products</p>
        </div>
      </div>

    </div>

  </div>
</section>

  );
}

export default Banner;
