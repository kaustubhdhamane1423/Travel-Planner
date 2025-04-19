import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Sparkles, Map, PlaneTakeoff, Luggage, Star, Users, Compass, Globe2 } from 'lucide-react';

const Itinerary = () => {
  const navigate = useNavigate();

  const cards = [
    {
      title: '🛠️ Build Your Itinerary',
      description: 'Craft your adventure day by day. Fully customizable!',
      route: '/itinerary/builder',
      bg: 'from-emerald-400 via-teal-400 to-cyan-500',
      icon: <Map className="w-10 h-10 text-white" />,
    },
    {
      title: '🤖 AI Itinerary Generator',
      description: 'Sit back and let AI plan the perfect escape!',
      route: '/itinerary/ai',
      bg: 'from-purple-500 via-pink-500 to-rose-500',
      icon: <Sparkles className="w-10 h-10 text-white" />,
    },
  ];

  return (
    <div className="bg-gradient-to-b from-sky-50 via-white to-yellow-100 overflow-x-hidden">

      {/* 🌍 Hero Section */}
      <section className="text-center py-24 px-4 bg-[url('https://images.unsplash.com/photo-1507525428034-b723cf961d3e')] bg-cover bg-center relative text-white">
        <div className="backdrop-blur-sm bg-black/40 py-16 px-6 rounded-xl">
          <motion.h1 className="text-5xl font-bold mb-6" initial={{ y: -30, opacity: 0 }} animate={{ y: 0, opacity: 1 }}>
            ✨ Your Next Adventure Starts Here
          </motion.h1>
          <p className="text-lg mb-8">Let your wanderlust run wild with custom or AI-powered trip planning.</p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            className="bg-yellow-400 text-black font-semibold px-8 py-3 rounded-full shadow-lg"
            onClick={() => navigate('/itinerary/ai')}
          >
            Plan with AI 🤖
          </motion.button>
        </div>
      </section>

      {/* ✈️ Planning Options */}
      <section className="py-20 px-6 max-w-6xl mx-auto grid md:grid-cols-2 gap-10">
        {cards.map((card, idx) => (
          <motion.div
            key={idx}
            whileHover={{ scale: 1.05 }}
            onClick={() => navigate(card.route)}
            className={`bg-gradient-to-br ${card.bg} text-white p-8 rounded-2xl shadow-xl cursor-pointer relative overflow-hidden`}
          >
            <div className="absolute text-[7rem] opacity-10 right-6 top-0">🌍</div>
            <div className="flex items-center gap-4 mb-4">
              {card.icon}
              <h2 className="text-2xl font-bold">{card.title}</h2>
            </div>
            <p className="text-white/90 text-lg">{card.description}</p>
          </motion.div>
        ))}
      </section>

      {/* 🌴 Why Us */}
      <section className="bg-white py-20 px-6 text-center">
        <h2 className="text-4xl font-bold mb-10 text-gray-800">🌴 Why Plan With Travv?</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 max-w-6xl mx-auto">
          {[
            ['🧠 Smart AI Planning', 'Your travel genius assistant.'],
            ['💡 Unique Experiences', 'Discover things most tourists miss.'],
            ['📆 Real-time Itinerary', 'Keep everything in one place.'],
            ['🚀 Instant Booking', 'Flights, hotels, attractions — fast.'],
          ].map(([title, desc], idx) => (
            <div key={idx} className="p-6 bg-yellow-100 rounded-xl shadow hover:shadow-lg transition">
              <h3 className="text-xl font-semibold">{title}</h3>
              <p className="text-gray-600 mt-2">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ⭐ Testimonials */}
      <section className="py-20 bg-gradient-to-br from-indigo-100 to-white px-6 text-center">
        <h2 className="text-4xl font-bold mb-10 text-gray-800">🌟 Loved by Explorers</h2>
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {[
            ['"I built a 10-day Europe trip in 15 mins!"', '– Alex T.'],
            ['"AI itinerary was spooky good. All my favs."', '– Priya M.'],
            ['"So smooth. Booked my Bali honeymoon in one go."', '– Dev & Aria'],
          ].map(([quote, person], i) => (
            <div key={i} className="bg-white p-6 rounded-xl shadow-md">
              <p className="italic">💬 {quote}</p>
              <p className="mt-2 font-semibold text-gray-700">{person}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 🌐 Popular Destinations */}
      <section className="py-20 px-6 bg-white text-center">
        <h2 className="text-4xl font-bold mb-10 text-gray-800">🌐 Trending Destinations</h2>
        <div className="flex flex-wrap justify-center gap-6 max-w-5xl mx-auto">
          {[
            'paris', 'tokyo', 'new york', 'bali', 'cape town', 'rome', 'sydney'
          ].map((city, idx) => (
            <div key={idx} className="relative group">
              <img
                src={`https://source.unsplash.com/300x200/?${city}`}
                alt={city}
                className="rounded-lg shadow-md group-hover:scale-105 transition"
              />
              <div className="absolute bottom-2 left-2 text-white text-sm bg-black/50 px-2 rounded">
                {city.toUpperCase()}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 🔥 Sticky CTA Footer */}
      <footer className="sticky bottom-0 bg-yellow-400 text-black py-4 px-6 flex items-center justify-between shadow-lg z-50">
        <div className="flex items-center gap-2 font-semibold">
          <Luggage className="w-5 h-5" /> Ready to explore?
        </div>
        <button
          className="bg-black text-white px-4 py-2 rounded-full hover:bg-gray-800 transition"
          onClick={() => navigate('/itinerary/builder')}
        >
          Start Planning ✈️
        </button>
      </footer>
    </div>
  );
};

export default Itinerary;
