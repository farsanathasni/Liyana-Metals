import React, { useState } from 'react';
import Navbar from '../Layout/Navbar';
import Footer from '../Layout/Footer';
import {
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
  FaClock,
  FaPaperPlane,
  FaCheckCircle,
  FaHeadset,
} from 'react-icons/fa';

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.name && formData.email && formData.message) {
      setSubmitted(true);
      setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
      setTimeout(() => setSubmitted(false), 5000);
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF8F5] flex flex-col">
      <Navbar />

      <main className="flex-1 py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Header */}
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-xs uppercase font-bold tracking-wider text-[#C05621] px-3.5 py-1.5 rounded-full bg-[#C05621]/10">
              Customer Helpdesk
            </span>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-stone-900 tracking-tight mt-3">
              We're Here to Help
            </h1>
            <p className="text-stone-600 text-sm sm:text-base mt-2">
              Have a question about a product, warranty, or delivery? Reach out to our dedicated support team.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            
            {/* Left Contact Information Cards */}
            <div className="lg:col-span-5 space-y-5">
              
              <div className="bg-white rounded-3xl p-7 border border-stone-200/80 shadow-xs space-y-6">
                <h3 className="text-lg font-bold text-stone-900 pb-3 border-b border-stone-100 flex items-center gap-2">
                  <FaHeadset className="text-[#1E3A2F]" />
                  <span>Direct Communication</span>
                </h3>

                <div className="space-y-5">
                  <div className="flex items-start gap-4">
                    <div className="w-11 h-11 rounded-2xl bg-[#1E3A2F]/10 text-[#1E3A2F] flex items-center justify-center flex-shrink-0 text-base">
                      <FaEnvelope />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-stone-400 uppercase tracking-wider">Email Inquiry</p>
                      <a
                        href="mailto:farsanathasni9846@gmail.com"
                        className="text-sm font-semibold text-stone-800 hover:text-[#1E3A2F] transition-colors"
                      >
                        farsanathasni9846@gmail.com
                      </a>
                      <p className="text-[11px] text-stone-500 mt-0.5">Response within 24 hours</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-11 h-11 rounded-2xl bg-[#C05621]/10 text-[#C05621] flex items-center justify-center flex-shrink-0 text-base">
                      <FaPhoneAlt />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-stone-400 uppercase tracking-wider">Call or WhatsApp</p>
                      <a
                        href="tel:+919633849846"
                        className="text-sm font-semibold text-stone-800 hover:text-[#C05621] transition-colors"
                      >
                        +91 9633849846
                      </a>
                      <p className="text-[11px] text-stone-500 mt-0.5">Mon – Sat: 9:00 AM – 7:00 PM</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-11 h-11 rounded-2xl bg-amber-500/10 text-amber-700 flex items-center justify-center flex-shrink-0 text-base">
                      <FaMapMarkerAlt />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-stone-400 uppercase tracking-wider">Distribution Center</p>
                      <p className="text-sm font-semibold text-stone-800">
                        Mettupalayam, Tamil Nadu, India
                      </p>
                      <p className="text-[11px] text-stone-500 mt-0.5">Dispatch & Returns Warehouse</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-11 h-11 rounded-2xl bg-emerald-600/10 text-emerald-700 flex items-center justify-center flex-shrink-0 text-base">
                      <FaClock />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-stone-400 uppercase tracking-wider">Working Hours</p>
                      <p className="text-sm font-semibold text-stone-800">
                        Monday – Saturday: 9 AM to 7 PM
                      </p>
                      <p className="text-[11px] text-stone-500 mt-0.5">Sunday: Closed for maintenance</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Warranty notice card */}
              <div className="p-6 rounded-3xl bg-[#1E3A2F] text-white space-y-2">
                <h4 className="font-bold text-sm text-emerald-200">Product Warranty Support</h4>
                <p className="text-xs text-stone-300 leading-relaxed">
                  For warranty claims on appliances, please keep your order ID and invoice handy when calling us.
                </p>
              </div>

            </div>

            {/* Right Interactive Query Form */}
            <div className="lg:col-span-7 bg-white rounded-3xl p-7 sm:p-9 border border-stone-200/80 shadow-xs">
              <h3 className="text-xl font-bold text-stone-900 mb-1">
                Send Us a Message
              </h3>
              <p className="text-stone-500 text-xs mb-6">
                Fill out the form below and our customer relations team will contact you promptly.
              </p>

              {submitted && (
                <div className="mb-6 p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-medium flex items-center gap-2.5">
                  <FaCheckCircle className="text-emerald-600 text-base flex-shrink-0" />
                  <span>
                    Thank you! Your message has been received. Our team will get back to you shortly.
                  </span>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1.5">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      required
                      placeholder="e.g. Ananya Patel"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full bg-[#FAF8F5] border border-stone-200 rounded-xl px-4 py-3 text-sm text-stone-900 focus:outline-none focus:border-[#1E3A2F] focus:bg-white transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1.5">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      placeholder="e.g. ananya@gmail.com"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full bg-[#FAF8F5] border border-stone-200 rounded-xl px-4 py-3 text-sm text-stone-900 focus:outline-none focus:border-[#1E3A2F] focus:bg-white transition-colors"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1.5">
                      Contact Phone
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      placeholder="e.g. +91 9876543210"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full bg-[#FAF8F5] border border-stone-200 rounded-xl px-4 py-3 text-sm text-stone-900 focus:outline-none focus:border-[#1E3A2F] focus:bg-white transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1.5">
                      Subject
                    </label>
                    <input
                      type="text"
                      name="subject"
                      placeholder="Product inquiry, Warranty, or Order"
                      value={formData.subject}
                      onChange={handleChange}
                      className="w-full bg-[#FAF8F5] border border-stone-200 rounded-xl px-4 py-3 text-sm text-stone-900 focus:outline-none focus:border-[#1E3A2F] focus:bg-white transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1.5">
                    Your Message *
                  </label>
                  <textarea
                    name="message"
                    required
                    rows="4"
                    placeholder="Tell us how we can help you..."
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full bg-[#FAF8F5] border border-stone-200 rounded-xl px-4 py-3 text-sm text-stone-900 focus:outline-none focus:border-[#1E3A2F] focus:bg-white transition-colors leading-relaxed"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-4 bg-[#1E3A2F] hover:bg-[#284f3f] text-white font-bold rounded-2xl shadow-lg shadow-[#1E3A2F]/20 hover:shadow-xl transition-all duration-200 flex items-center justify-center gap-2 text-sm"
                >
                  <FaPaperPlane className="text-xs" />
                  <span>Send Message</span>
                </button>
              </form>

            </div>

          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}

export default Contact;
