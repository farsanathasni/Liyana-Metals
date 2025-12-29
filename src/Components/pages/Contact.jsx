import React from 'react'
import Navbar from '../Layout/Navbar'

function Contact() {
  return (
    <>
<Navbar/>

    <div>
<section className="bg-gradient-to-b from-gray-900 to-black py-20">
  <div className="max-w-7xl mx-auto px-4">

    <div className="max-w-lg bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8 shadow-xl hover:shadow-amber-500/10 transition">

      <h3 className="text-3xl font-bold text-white mb-8 pb-4 border-b border-white/10">
        Get in Touch
      </h3>

      <ul className="space-y-7">

        <li className="flex items-start gap-5 group">
          <div className="w-12 h-12 bg-gradient-to-tr from-amber-600 to-orange-500 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition">
            <span className="text-white text-xl">✉️</span>
          </div>
          <div>
            <p className="text-white font-semibold">Email</p>
            <a
              href="mailto:farsanathasni9846@gmail.com"
              className="text-gray-300 group-hover:text-amber-400 transition"
            >
              farsanathasni9846@gmail.com
            </a>
          </div>
        </li>

        <li className="flex items-start gap-5 group">
          <div className="w-12 h-12 bg-gradient-to-tr from-amber-600 to-orange-500 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition">
            <span className="text-white text-xl">📞</span>
          </div>
          <div>
            <p className="text-white font-semibold">Phone</p>
            <a
              href="tel:+91XXXXXXXXXX"
              className="text-gray-300 group-hover:text-amber-400 transition"
            >
              +91 9633849846
            </a>
          </div>
        </li>


        <li className="flex items-start gap-5 group">
          <div className="w-12 h-12 bg-gradient-to-tr from-amber-600 to-orange-500 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition">
            <span className="text-white text-xl">📍</span>
          </div>
          <div>
            <p className="text-white font-semibold">Location</p>
            <p className="text-gray-300">
              Tamil Nadu, Mettupalayam
            </p>
          </div>
        </li>

      </ul>


      <button className="mt-10 w-full bg-gradient-to-r from-amber-500 to-orange-600 text-white font-semibold py-3 rounded-xl hover:opacity-90 transition shadow-lg">
        Contact Support
      </button>

    </div>

  </div>
</section>

    </div>
    </>
  )
}

export default Contact
