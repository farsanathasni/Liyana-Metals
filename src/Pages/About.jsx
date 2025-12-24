import React from 'react'

function About() {
  return (
//     <div>
//       <section className="relative overflow-hidden py-20 md:py-28 bg-gradient-to-b from-gray-50 to-white">
//   {/* Decorative Background Elements */}
//   <div className="absolute top-10 left-10 w-40 h-40 bg-[#97A87A]/20 rounded-full opacity-20 blur-xl"></div>
//   <div className="absolute bottom-10 right-10 w-60 h-60 bg-[#A8BBA3]/10 rounded-full opacity-10 blur-xl"></div>
  
//   <div className="max-w-6xl mx-auto px-6 md:px-8 relative z-10">
    
//     {/* Header with Icon */}
//     <div className="text-center mb-16">
//       <div className="inline-flex items-center justify-center w-16 h-16 bg-[#97A87A]/10 rounded-2xl mb-6">
//         <svg className="w-8 h-8 text-[#97A87A]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
//         </svg>
//       </div>
//       <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
//         Crafting <span className="text-[#97A87A]">Homes</span>,<br />
//         <span className="text-gray-700">Not Just Houses</span>
//       </h2>
//       <p className="text-gray-600 text-lg max-w-2xl mx-auto">
//         Welcome to Home Needs – Where premium quality meets everyday living
//       </p>
//     </div>

//     <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
      
//       {/* Left Content */}
//       <div className="space-y-8">
//         <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
//           <h3 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
//             <span className="w-3 h-3 bg-[#97A87A] rounded-full mr-3"></span>
//             The Home Needs Difference
//           </h3>
//           <p className="text-gray-700 leading-relaxed">
//             We don't just sell products; we curate experiences. Each item in our collection is handpicked 
//             for its ability to transform ordinary moments into cherished memories. From our non-stick 
//             cookware that makes cooking effortless to our artisanal dinnerware that elevates every meal, 
//             we're dedicated to enhancing your daily rituals.
//           </p>
//         </div>

//         <div className="grid grid-cols-2 gap-6">
//           <div className="bg-gradient-to-br from-[#97A87A]/5 to-white p-6 rounded-xl border border-[#97A87A]/20">
//             <div className="text-[#97A87A] text-3xl font-bold mb-2">5,000+</div>
//             <div className="text-gray-700 font-medium">Products Tested</div>
//             <div className="text-gray-500 text-sm mt-1">Only 200 make the cut</div>
//           </div>
//           <div className="bg-gradient-to-br from-[#97A87A]/5 to-white p-6 rounded-xl border border-[#97A87A]/20">
//             <div className="text-[#97A87A] text-3xl font-bold mb-2">45+</div>
//             <div className="text-gray-700 font-medium">Indian Cities</div>
//             <div className="text-gray-500 text-sm mt-1">Serving nationwide</div>
//           </div>
//         </div>
//       </div>

//       {/* Right Content */}
//       <div className="space-y-8">
//         <div className="bg-gradient-to-br from-white to-gray-50 p-8 rounded-2xl shadow-lg border border-gray-100">
//           <h3 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
//             <span className="w-3 h-3 bg-[#97A87A] rounded-full mr-3"></span>
//             For the Modern Indian Home
//           </h3>
//           <p className="text-gray-700 leading-relaxed mb-6">
//             Understanding the unique needs of Indian households, we've designed products that excel in 
//             both traditional cooking and contemporary living. Our pressure cookers handle your weekend 
//             biryanis, while our sleek appliances fit perfectly in modern modular kitchens.
//           </p>
//           <div className="flex flex-wrap gap-3">
//             <span className="px-4 py-2 bg-[#97A87A]/10 text-[#97A87A] rounded-full text-sm font-medium">Spice-Friendly Cookware</span>
//             <span className="px-4 py-2 bg-[#97A87A]/10 text-[#97A87A] rounded-full text-sm font-medium">Easy-Clean Materials</span>
//             <span className="px-4 py-2 bg-[#97A87A]/10 text-[#97A87A] rounded-full text-sm font-medium">Space-Smart Design</span>
//           </div>
//         </div>

//         <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
//           <h3 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
//             <span className="w-3 h-3 bg-[#97A87A] rounded-full mr-3"></span>
//             Our Promise to You
//           </h3>
//           <ul className="space-y-4">
//             <li className="flex items-start">
//               <svg className="w-5 h-5 text-[#97A87A] mt-0.5 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
//                 <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
//               </svg>
//               <span className="text-gray-700">Every product undergoes 25+ quality checks before reaching you</span>
//             </li>
//             <li className="flex items-start">
//               <svg className="w-5 h-5 text-[#97A87A] mt-0.5 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
//                 <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
//               </svg>
//               <span className="text-gray-700">Direct partnerships with manufacturers for genuine affordability</span>
//             </li>
//             <li className="flex items-start">
//               <svg className="w-5 h-5 text-[#97A87A] mt-0.5 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
//                 <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
//               </svg>
//               <span className="text-gray-700">Expert support for choosing the perfect products for your home</span>
//             </li>
//           </ul>
//         </div>
//       </div>
//     </div>

//     {/* CTA Section */}
//     <div className="mt-16 text-center">
//       <div className="inline-flex flex-col sm:flex-row gap-4 items-center bg-gradient-to-r from-[#97A87A]/5 to-white p-8 rounded-2xl border border-[#97A87A]/20 shadow-sm">
//         <div className="text-left">
//           <h4 className="text-xl font-bold text-gray-900">Ready to Transform Your Home?</h4>
//           <p className="text-gray-600 mt-1">Join 50,000+ families who trust Home Needs</p>
//         </div>
//         <button className="px-8 py-3 bg-[#97A87A] text-white font-semibold rounded-lg hover:bg-[#7A8E63] transition-colors duration-300 shadow-md hover:shadow-lg">
//           Explore Our Collection
//         </button>
//       </div>
//     </div>
//   </div>
// </section>
//     </div>


<section className="relative overflow-hidden py-20 md:py-28 bg-gradient-to-b from-gray-50 to-white">
  {/* Decorative Background Elements */}
  <div className="absolute top-10 left-10 w-40 h-40 bg-amber-100 rounded-full opacity-20 blur-xl"></div>
  <div className="absolute bottom-10 right-10 w-60 h-60 bg-amber-50 rounded-full opacity-10 blur-xl"></div>
  
  <div className="max-w-6xl mx-auto px-6 md:px-8 relative z-10">
    
    {/* Header with Icon */}
    <div className="text-center mb-16">
      <div className="inline-flex items-center justify-center w-16 h-16 bg-amber-100 rounded-2xl mb-6">
        <svg className="w-8 h-8 text-amber-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        </svg>
      </div>
      <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
        Crafting <span className="text-amber-700">Homes</span>,<br />
        <span className="text-gray-700">Not Just Houses</span>
      </h2>
      <p className="text-gray-600 text-lg max-w-2xl mx-auto">
        Welcome to Liyana Metals – Where premium quality meets everyday living
      </p>
    </div>

    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
      
      {/* Left Content */}
      <div className="space-y-8">
        <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
          <h3 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
            <span className="w-3 h-3 bg-amber-500 rounded-full mr-3"></span>
            The Home Needs Difference
          </h3>
          <p className="text-gray-700 leading-relaxed">
            We don't just sell products; we curate experiences. Each item in our collection is handpicked 
            for its ability to transform ordinary moments into cherished memories. From our non-stick 
            cookware that makes cooking effortless to our artisanal dinnerware that elevates every meal, 
            we're dedicated to enhancing your daily rituals.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-6">
          <div className="bg-gradient-to-br from-amber-50 to-white p-6 rounded-xl border border-amber-100">
            <div className="text-amber-700 text-3xl font-bold mb-2">5,000+</div>
            <div className="text-gray-700 font-medium">Products Tested</div>
            <div className="text-gray-500 text-sm mt-1">Only 200 make the cut</div>
          </div>
          <div className="bg-gradient-to-br from-amber-50 to-white p-6 rounded-xl border border-amber-100">
            <div className="text-amber-700 text-3xl font-bold mb-2">45+</div>
            <div className="text-gray-700 font-medium">Indian Cities</div>
            <div className="text-gray-500 text-sm mt-1">Serving nationwide</div>
          </div>
        </div>
      </div>

      {/* Right Content */}
      <div className="space-y-8">
        <div className="bg-gradient-to-br from-white to-gray-50 p-8 rounded-2xl shadow-lg border border-gray-100">
          <h3 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
            <span className="w-3 h-3 bg-amber-500 rounded-full mr-3"></span>
            For the Modern Indian Home
          </h3>
          <p className="text-gray-700 leading-relaxed mb-6">
            Understanding the unique needs of Indian households, we've designed products that excel in 
            both traditional cooking and contemporary living. Our pressure cookers handle your weekend 
            biryanis, while our sleek appliances fit perfectly in modern modular kitchens.
          </p>
          <div className="flex flex-wrap gap-3">
            <span className="px-4 py-2 bg-amber-50 text-amber-700 rounded-full text-sm font-medium">Spice-Friendly Cookware</span>
            <span className="px-4 py-2 bg-amber-50 text-amber-700 rounded-full text-sm font-medium">Easy-Clean Materials</span>
            <span className="px-4 py-2 bg-amber-50 text-amber-700 rounded-full text-sm font-medium">Space-Smart Design</span>
          </div>
        </div>

        <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
          <h3 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
            <span className="w-3 h-3 bg-amber-500 rounded-full mr-3"></span>
            Our Promise to You
          </h3>
          <ul className="space-y-4">
            <li className="flex items-start">
              <svg className="w-5 h-5 text-amber-600 mt-0.5 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              <span className="text-gray-700">Every product undergoes 25+ quality checks before reaching you</span>
            </li>
            <li className="flex items-start">
              <svg className="w-5 h-5 text-amber-600 mt-0.5 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              <span className="text-gray-700">Direct partnerships with manufacturers for genuine affordability</span>
            </li>
            <li className="flex items-start">
              <svg className="w-5 h-5 text-amber-600 mt-0.5 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              <span className="text-gray-700">Expert support for choosing the perfect products for your home</span>
            </li>
          </ul>
        </div>
      </div>
    </div>

    {/* CTA Section */}
    <div className="mt-16 text-center">
      <div className="inline-flex flex-col sm:flex-row gap-4 items-center bg-gradient-to-r from-amber-50 to-white p-8 rounded-2xl border border-amber-100 shadow-sm">
        <div className="text-left">
          <h4 className="text-xl font-bold text-gray-900">Ready to Transform Your Home?</h4>
          <p className="text-gray-600 mt-1">Join 50,000+ families who trust Home Needs</p>
        </div>
        <button className="px-8 py-3 bg-amber-600 text-white font-semibold rounded-lg hover:bg-amber-700 transition-colors duration-300 shadow-md hover:shadow-lg">
          Explore Our Collection
        </button>
      </div>
    </div>
  </div>
</section>



  )
}

export default About
