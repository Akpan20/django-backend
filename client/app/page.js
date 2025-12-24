"use client";

import { useState, useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";
import Image from "next/image";
import { fetchRooms } from "@/store/bookingSlice";

/* Club logo function */
const getClubLogo = (theme) => {
  const logoMap = {
    'Arsenal': 'https://upload.wikimedia.org/wikipedia/en/5/53/Arsenal_FC.svg',
    'Barcelona': 'https://upload.wikimedia.org/wikipedia/en/4/47/FC_Barcelona_%28crest%29.svg',
    'Bayern Munich': 'https://upload.wikimedia.org/wikipedia/commons/1/1b/FC_Bayern_M%C3%BCnchen_logo_%282017%29.svg',
    'Chelsea': 'https://upload.wikimedia.org/wikipedia/en/c/cc/Chelsea_FC.svg',
    'Inter Milan': 'https://upload.wikimedia.org/wikipedia/commons/0/05/FC_Internazionale_Milano_2021.svg',
    'Liverpool': 'https://upload.wikimedia.org/wikipedia/en/0/0c/Liverpool_FC.svg',
    'Manchester City': 'https://upload.wikimedia.org/wikipedia/en/e/eb/Manchester_City_FC_badge.svg',
    'Manchester United': 'https://upload.wikimedia.org/wikipedia/en/7/7a/Manchester_United_FC_crest.svg',
    'Napoli': 'https://upload.wikimedia.org/wikipedia/commons/2/2d/SSC_Neapel.svg',
    'Real Madrid': 'https://upload.wikimedia.org/wikipedia/en/5/56/Real_Madrid_CF.svg',
  };

  return logoMap[theme] || null;
};

export default function Home() {
  const dispatch = useDispatch();
  const { rooms, loading } = useSelector((state) => state.bookings);

  const [activeCard, setActiveCard] = useState(0);

  /* Fetch rooms (side effect only) */
  useEffect(() => {
    if (rooms.length === 0) {
      dispatch(fetchRooms());
    }
  }, [rooms.length, dispatch]);

  /* All rooms participate - no slicing */
  const featuredRooms = useMemo(() => {
    return rooms; // All rooms included
  }, [rooms]);

  /* Auto-rotate through all cards */
  useEffect(() => {
    if (featuredRooms.length === 0) return;

    const interval = setInterval(() => {
      setActiveCard((prev) => (prev + 1) % featuredRooms.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [featuredRooms.length]);

  const getFeatureText = (roomType) => {
    switch(roomType) {
      case 'Suite': return 'Private Jacuzzi & Balcony';
      case 'Executive': return 'Workspace & Mini Bar';
      case 'Deluxe': return 'Premium Sound System';
      default: return 'Comfort King Bed';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Animated Background Overlay */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse delay-1000"></div>
        <div className="absolute top-40 left-40 w-80 h-80 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse delay-500"></div>
      </div>

      {/* Hero Section */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
        <div className="text-center space-y-8">
          <div className="inline-block">
            <span className="px-4 py-2 bg-purple-500/20 text-purple-200 rounded-full text-sm font-semibold backdrop-blur-sm border border-purple-400/30">
              ⚽ Football-Themed Luxury Rooms
            </span>
          </div>
          
          <h1 className="text-6xl md:text-7xl lg:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-purple-200 to-pink-200 leading-tight">
            Your Dream Stay
            <br />
            <span className="text-5xl md:text-6xl lg:text-7xl">Starts Here</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-purple-100 max-w-3xl mx-auto leading-relaxed">
            Experience world-class hospitality in themed rooms inspired by legendary football clubs. 
            <span className="text-white font-semibold"> Book your perfect escape today.</span>
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-8">
            <Link 
              href="/rooms"
              className="group px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl font-bold text-lg hover:from-purple-600 hover:to-pink-600 transition-all shadow-2xl hover:shadow-purple-500/50 transform hover:scale-105 flex items-center space-x-2"
            >
              <span>Explore Rooms</span>
              <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
            <Link 
              href="/contact"
              className="px-8 py-4 bg-white/10 backdrop-blur-sm text-white rounded-xl font-bold text-lg hover:bg-white/20 transition-all border border-white/20 hover:border-white/40"
            >
              Contact Us
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-8 pt-16 max-w-3xl mx-auto">
            <div className="text-center">
              <div className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">{rooms.length}+</div>
              <div className="text-purple-200 text-sm mt-2">Premium Rooms</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">5★</div>
              <div className="text-purple-200 text-sm mt-2">Guest Rating</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">24/7</div>
              <div className="text-purple-200 text-sm mt-2">Support</div>
            </div>
          </div>
        </div>
      </div>

      {/* COMPACT FEATURED ROOMS CAROUSEL - ALL ROOMS */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Signature Collection
          </h2>
          <p className="text-xl text-purple-200">
            All {featuredRooms.length} themed rooms • Interactive carousel
          </p>
        </div>

        {/* Creative Grid Layout */}
        {loading && rooms.length === 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {[1, 2].map((i) => (
              <div key={i} className="bg-white/10 backdrop-blur-md rounded-3xl p-8 animate-pulse">
                <div className="h-64 bg-white/20 rounded-2xl mb-6"></div>
                <div className="h-8 bg-white/20 rounded mb-4 w-2/3 mx-auto"></div>
                <div className="h-4 bg-white/20 rounded mb-2"></div>
                <div className="h-4 bg-white/20 rounded w-4/5"></div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left Column - Compact Card Stack */}
            <div className="relative h-[450px]">
              {featuredRooms.map((room, index) => {
                const offset = (index - activeCard + featuredRooms.length) % featuredRooms.length;
                const isActive = offset === 0;
                
                // Softer stacking with more visible cards
                const rotation = offset * 4;
                const scale = 1 - offset * 0.08;
                const translateY = offset * 8;
                const translateX = offset * 6;
                const opacity = Math.max(0.3, 1 - offset * 0.15);
                const zIndex = featuredRooms.length - offset;
                
                return (
                  <div
                    key={room.id}
                    className="absolute inset-0 transition-all duration-700 ease-out cursor-pointer"
                    style={{
                      transform: `translate(${translateX}px, ${translateY}px) rotate(${rotation}deg) scale(${scale})`,
                      opacity: opacity,
                      zIndex: zIndex,
                    }}
                    onClick={() => setActiveCard(index)}
                  >
                    <div className={`relative h-full bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-2xl overflow-hidden border transition-all duration-500 ${
                      isActive 
                        ? 'border-purple-400/50 shadow-2xl shadow-purple-500/40' 
                        : 'border-white/10 shadow-lg'
                    }`}>
                      
                      {/* Enhanced Club Logo Background */}
                      <div className="absolute inset-0 flex items-center justify-center">
                        {getClubLogo(room.theme) && (
                          <div className="relative w-64 h-64 opacity-30 transition-opacity">
                            <Image
                              src={getClubLogo(room.theme)}
                              alt={`${room.theme} logo`}
                              fill
                              className="object-contain filter drop-shadow-lg"
                              unoptimized
                            />
                          </div>
                        )}
                      </div>
                      
                      {/* Compact Content */}
                      <div className="relative h-full p-6 flex flex-col justify-between">
                        <div>
                          {/* Theme Badge */}
                          <div className="inline-block px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full mb-4">
                            <span className="text-white text-sm font-semibold">{room.theme}</span>
                          </div>
                          
                          {/* Room Number - Compact */}
                          <div className="mb-4">
                            <div className="text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-200 to-pink-200 opacity-90">
                              {room.room_number || room.id}
                            </div>
                            <p className="text-white/80 text-lg font-medium">{room.room_type}</p>
                          </div>
                          
                          {/* Key Feature - Compact */}
                          <div className="flex items-start gap-2 text-white/80 text-sm">
                            <div className="w-1.5 h-1.5 bg-purple-400 rounded-full mt-1.5 flex-shrink-0"></div>
                            <span>{getFeatureText(room.room_type)}</span>
                          </div>
                        </div>
                        
                        {/* Price Card - Compact */}
                        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3 border border-white/20">
                          <div className="flex justify-between items-center">
                            <div>
                              <div className="text-xl font-bold text-white">
                                ${room.price_per_night || room.price}
                              </div>
                              <div className="text-white/60 text-xs">per night</div>
                            </div>
                            <div className="text-right">
                              <div className="text-lg font-bold text-white">
                                {room.max_capacity || 2}
                              </div>
                              <div className="text-white/60 text-xs">guests</div>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      {/* Active Card Glow */}
                      {isActive && (
                        <div className="absolute inset-0 bg-gradient-to-t from-purple-500/20 via-transparent to-transparent pointer-events-none"></div>
                      )}
                    </div>
                  </div>
                );
              })}
              
              {/* Navigation Dots */}
              <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 flex gap-1.5 z-50 bg-black/30 backdrop-blur-sm px-3 py-2 rounded-full max-w-full overflow-x-auto">
                {featuredRooms.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveCard(index)}
                    className={`transition-all rounded-full flex-shrink-0 ${
                      index === activeCard 
                        ? 'bg-white w-6 h-2' 
                        : 'bg-white/40 hover:bg-white/60 w-2 h-2'
                    }`}
                    aria-label={`Go to room ${index + 1}`}
                  />
                ))}
              </div>
            </div>
            
            {/* Right Column - Detail Panel */}
            <div className="flex items-center">
              {featuredRooms[activeCard] && (
                <div className="bg-gradient-to-br from-purple-900/40 to-pink-900/20 backdrop-blur-xl rounded-2xl p-8 border border-white/20 w-full space-y-6">
                  
                  {/* Title */}
                  <div>
                    <h3 className="text-3xl font-bold text-white mb-3">
                      {featuredRooms[activeCard].theme} Experience
                    </h3>
                    <p className="text-white/80 leading-relaxed">
                      Immerse yourself in the {featuredRooms[activeCard].theme} themed luxury room. 
                      Every detail brings the passion of {featuredRooms[activeCard].theme} to your stay.
                    </p>
                  </div>
                  
                  {/* Quick Stats Grid */}
                  <div className="grid grid-cols-3 gap-4">
                    <div className="text-center p-4 bg-white/10 backdrop-blur-sm rounded-xl border border-white/10">
                      <div className="text-2xl font-bold text-white mb-1">
                        {featuredRooms[activeCard].max_capacity || 2}
                      </div>
                      <div className="text-white/60 text-xs">Guests</div>
                    </div>
                    <div className="text-center p-4 bg-white/10 backdrop-blur-sm rounded-xl border border-white/10">
                      <div className="text-2xl font-bold text-white mb-1">
                        ${featuredRooms[activeCard].price_per_night || featuredRooms[activeCard].price}
                      </div>
                      <div className="text-white/60 text-xs">Per Night</div>
                    </div>
                    <div className="text-center p-4 bg-white/10 backdrop-blur-sm rounded-xl border border-white/10">
                      <div className="text-2xl font-bold text-white mb-1">
                        {featuredRooms[activeCard].room_type}
                      </div>
                      <div className="text-white/60 text-xs">Class</div>
                    </div>
                  </div>
                  
                  {/* CTA Button */}
                  <Link
                    href={`/rooms/${featuredRooms[activeCard].id}`}
                    className="w-full py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl font-bold hover:from-purple-600 hover:to-pink-600 transition-all shadow-lg hover:shadow-purple-500/50 flex items-center justify-center gap-2 group"
                  >
                    <span>Explore This Room</span>
                    <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </Link>

                  {/* Progress Indicator */}
                  <div className="flex items-center justify-between text-sm text-white/60">
                    <span>Room {activeCard + 1} of {featuredRooms.length}</span>
                    <span>{featuredRooms[activeCard].room_number || featuredRooms[activeCard].id}</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Manual Navigation Arrows */}
        <div className="flex justify-center gap-4 mt-16">
          <button
            onClick={() => setActiveCard((prev) => (prev - 1 + featuredRooms.length) % featuredRooms.length)}
            className="p-3 bg-white/10 backdrop-blur-sm text-white rounded-full hover:bg-white/20 transition-all border border-white/20 hover:border-white/40"
            aria-label="Previous room"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            onClick={() => setActiveCard((prev) => (prev + 1) % featuredRooms.length)}
            className="p-3 bg-white/10 backdrop-blur-sm text-white rounded-full hover:bg-white/20 transition-all border border-white/20 hover:border-white/40"
            aria-label="Next room"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        <div className="text-center mt-8">
          <Link
            href="/rooms"
            className="inline-flex items-center space-x-2 px-8 py-4 bg-white/10 backdrop-blur-sm text-white rounded-xl font-bold hover:bg-white/20 transition-all border border-white/20 hover:border-white/40"
          >
            <span>View Complete Collection</span>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </Link>
        </div>
      </div>

      {/* Unique Selling Points */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Why Choose BOPHILL SUITES
          </h2>
          <p className="text-xl text-purple-200">
            Experience hospitality redefined
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Interactive Feature Cards */}
          <div className="group relative">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="relative bg-white/10 backdrop-blur-md rounded-3xl p-8 border border-white/20 hover:border-purple-400/40 transition-all duration-300 h-full">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform">
                <span className="text-2xl">🎯</span>
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Unique Theming</h3>
              <p className="text-purple-200">
                Each room tells a story of legendary football clubs, creating an immersive experience like no other hotel.
              </p>
            </div>
          </div>

          <div className="group relative">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="relative bg-white/10 backdrop-blur-md rounded-3xl p-8 border border-white/20 hover:border-blue-400/40 transition-all duration-300 h-full">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform">
                <span className="text-2xl">✨</span>
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Premium Comfort</h3>
              <p className="text-purple-200">
                Luxury amenities meet ergonomic design for the perfect balance of style, comfort, and functionality.
              </p>
            </div>
          </div>

          <div className="group relative">
            <div className="absolute inset-0 bg-gradient-to-br from-green-500/20 to-emerald-500/20 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="relative bg-white/10 backdrop-blur-md rounded-3xl p-8 border border-white/20 hover:border-green-400/40 transition-all duration-300 h-full">
              <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform">
                <span className="text-2xl">⚡</span>
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Smart Experience</h3>
              <p className="text-purple-200">
                Seamless check-in, intelligent room controls, and personalized services powered by modern technology.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-3xl p-12 md:p-16 text-center shadow-2xl relative overflow-hidden">
          {/* Animated background elements */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-32 translate-x-32"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/10 rounded-full translate-y-32 -translate-x-32"></div>
          
          <div className="relative z-10">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Ready for Your Next Adventure?
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Join thousands of satisfied guests and experience the perfect blend of comfort, luxury, and unique theming.
            </p>
            <Link
              href="/rooms"
              className="inline-block px-10 py-4 bg-white text-purple-600 rounded-xl font-bold text-lg hover:bg-gray-100 transition-all shadow-xl hover:shadow-2xl transform hover:scale-105"
            >
              Book Your Stay Now
            </Link>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="relative z-10 bg-black/30 backdrop-blur-md border-t border-white/10 mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div className="col-span-2">
              <h3 className="text-2xl font-bold text-white mb-4">BOPHILL SUITES</h3>
              <p className="text-purple-200 mb-4">
                Your premier destination for themed luxury accommodations. Experience world-class hospitality with a unique football twist.
              </p>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li><Link href="/rooms" className="text-purple-200 hover:text-white transition-colors">Rooms</Link></li>
                <li><Link href="/terms" className="text-purple-200 hover:text-white transition-colors">Terms & Condition</Link></li>
                <li><Link href="/privacy" className="text-purple-200 hover:text-white transition-colors">Privacy Policy</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Contact</h4>
              <ul className="space-y-2 text-purple-200">
                <li>📧 info@bophillsuites.com</li>
                <li>📞 +234 (802) 123-4567</li>
                <li>📍 Abuja, Nigeria</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-white/10 pt-8 text-center">
            <p className="text-purple-200">
              © {new Date().getFullYear()} BOPHILL SUITES. All rights reserved. | Designed with ⚽ for football fans
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}