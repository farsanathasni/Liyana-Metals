import React, { useEffect, useRef } from 'react';
import coolerImg from "../../Assets/cooler.webp";
import chimminyImg from "../../Assets/chimminy.jpeg";
import dinnersetImg from "../../Assets/dinnerset.jpeg";
import indectionstoveImg from "../../Assets/indectionstove.jpeg";
import ovenImg from "home-needs\src\Assets\oven.jpeg"
import nonsticcasaroleImg from "../../Assets/nonsticcasarole.jpeg";
import { useNavigate } from 'react-router-dom';

const ImageList = [
  {
    id: 1,
    img: coolerImg,
    title: "Air Coolers",
    description: "Beat the heat with energy-efficient cooling solutions.",
    offer: "20% OFF",
  },
  {
    id: 2,
    img: chimminyImg,
    title: "Kitchen Chimneys",
    description: "Smoke-free cooking with powerful suction technology.",
    offer: "15% OFF",
  },
  {
    id: 3,
    img: dinnersetImg,
    title: "Designer Dinner Sets",
    description: "Add elegance to every meal with premium designs.",
    offer: "Flat ₹1000 OFF",
  },
  {
    id: 4,
    img: indectionstoveImg,
    title: "Induction Stoves",
    description: "Smart cooking with safety and efficiency.",
    offer: "Up to 25% OFF",
  },
  {
    id: 5,
    img: ovenImg,
    title: "Ovens & OTGs",
    description: "Bake, grill, and roast with modern precision.",
    offer: "Limited Offer",
  },
  {
    id: 6,
    img: nonsticcasaroleImg,
    title: "Non-Stick Cookware",
    description: "Healthy cooking with durable non-stick coating.",
    offer: "Buy 1 Get 1",
  },
];

function Hero() {

  const navigate=useNavigate()
 
  return (
    <section className="bg-gray-50 py-10">
      <div className="max-w-7xl mx-auto px-4">

        <div className="mb-8 text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
            Exclusive Offers on Home Essentials
          </h1>
          <p className="mt-2 text-gray-600">
            Premium quality products for modern Indian homes
          </p>
        </div>

        <div className="overflow-hidden relative">
          <div className="flex animate-scroll gap-6">
            {[...ImageList, ...ImageList].map((item, index) => (
              <div
                key={index}
                className="min-w-[280px] bg-white rounded-xl shadow-md hover:shadow-lg transition relative"
              >
                <span className="absolute top-4 left-4 bg-amber-600 text-white text-xs font-semibold px-3 py-1 rounded-full z-10">
                  {item.offer}
                </span>

                <div className="h-56 flex items-center justify-center bg-white rounded-t-xl">
                  <img
                    src={item.img}
                    alt={item.title}
             className="max-h-44 w-auto object-contain"
                  />
                </div>

                <div className="p-5">
                  <h3 className="text-lg font-semibold text-gray-900">
                    {item.title}   
                  </h3>
                  <p className="mt-2 text-sm text-gray-600">
                    {item.description}
                  </p>
                  <button className="mt-4 w-full bg-amber-600 text-white py-2 rounded-lg hover:bg-amber-700 transition"
                  onClick={()=>navigate("/products")}
                  >
                    Shop Now
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}

export default Hero;
