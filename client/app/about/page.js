"use client";

import Link from "next/link";

export default function AboutUs() {
  const stats = [
    { number: "10+", label: "Themed Rooms", icon: "🏨" },
    { number: "500+", label: "Happy Guests", icon: "😊" },
    { number: "5★", label: "Average Rating", icon: "⭐" },
    { number: "24/7", label: "Support Available", icon: "🔔" },
  ];

  const values = [
    {
      icon: "🎯",
      title: "Excellence",
      description: "We strive for perfection in every detail, ensuring our guests receive nothing but the best hospitality experience."
    },
    {
      icon: "💎",
      title: "Luxury",
      description: "Premium amenities and world-class service combined with unique football-themed rooms for an unforgettable stay."
    },
    {
      icon: "🤝",
      title: "Integrity",
      description: "Honest, transparent service with a commitment to building lasting relationships with our valued guests."
    },
    {
      icon: "🌟",
      title: "Innovation",
      description: "Blending traditional hospitality with modern conveniences and creative themed experiences."
    },
  ];

  const team = [
    {
      name: "David Adeleke",
      role: "Founder & CEO",
      image: "👔",
      bio: "Visionary leader with 15+ years in hospitality"
    },
    {
      name: "Sarah Johnson",
      role: "Operations Director",
      image: "👩‍💼",
      bio: "Expert in luxury hotel management"
    },
    {
      name: "Michael Chen",
      role: "Guest Experience Manager",
      image: "👨‍💼",
      bio: "Dedicated to creating memorable stays"
    },
    {
      name: "Emma Williams",
      role: "Head of Design",
      image: "👩‍🎨",
      bio: "Creative mind behind our themed rooms"
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Background Effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse delay-1000"></div>
      </div>

      <div className="relative z-10">
        {/* Hero Section */}
        <div className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto text-center">
            <div className="inline-block mb-6">
              <span className="px-4 py-2 bg-purple-500/20 text-purple-200 rounded-full text-sm font-semibold backdrop-blur-sm border border-purple-400/30">
                🏨 About BOPHILL SUITES
              </span>
            </div>
            
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-purple-200 to-pink-200 mb-6">
              Where Passion Meets
              <br />
              Premium Hospitality
            </h1>
            
            <p className="text-xl text-purple-100 max-w-3xl mx-auto leading-relaxed">
              Experience the perfect blend of luxury accommodation and football passion. 
              BOPHILL SUITES brings you uniquely themed rooms inspired by legendary football clubs.
            </p>
          </div>
        </div>

        {/* Stats Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20 text-center hover:transform hover:scale-105 transition-all"
              >
                <div className="text-4xl mb-3">{stat.icon}</div>
                <div className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400 mb-2">
                  {stat.number}
                </div>
                <div className="text-purple-200 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Our Story Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                Our Story
              </h2>
              <div className="space-y-4 text-purple-100 text-lg">
                <p>
                  Founded in 2020, BOPHILL SUITES was born from a unique vision: to create a hospitality 
                  experience that celebrates the world`s most beautiful game while delivering uncompromising luxury.
                </p>
                <p>
                  Located in the heart of Lagos, Nigeria, we`ve transformed the concept of themed accommodation 
                  into an art form. Each of our 10+ rooms is meticulously designed to honor legendary football 
                  clubs, bringing their colors, history, and spirit to life.
                </p>
                <p>
                  Today, `we`re proud to be the premier destination for football enthusiasts and luxury travelers 
                  alike, offering an experience that`s truly one of a kind.
                </p>
              </div>
            </div>
            
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20">
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center flex-shrink-0">
                    <span className="text-2xl">🎯</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2">Our Mission</h3>
                    <p className="text-purple-200">
                      To provide exceptional hospitality experiences that blend luxury, comfort, and passion for football.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center flex-shrink-0">
                    <span className="text-2xl">👁️</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2">Our Vision</h3>
                    <p className="text-purple-200">
                      To become the world`s leading football-themed luxury hotel brand, expanding across major cities globally.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Core Values */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Our Core Values
            </h2>
            <p className="text-xl text-purple-200">
              The principles that guide everything we do
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <div
                key={index}
                className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20 hover:border-white/40 transition-all hover:transform hover:scale-105"
              >
                <div className="text-5xl mb-4">{value.icon}</div>
                <h3 className="text-2xl font-bold text-white mb-3">{value.title}</h3>
                <p className="text-purple-200">{value.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Team Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Meet Our Team
            </h2>
            <p className="text-xl text-purple-200">
              The passionate people behind your perfect stay
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <div
                key={index}
                className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 text-center hover:border-white/40 transition-all hover:transform hover:scale-105"
              >
                <div className="w-24 h-24 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4 text-5xl">
                  {member.image}
                </div>
                <h3 className="text-xl font-bold text-white mb-1">{member.name}</h3>
                <p className="text-purple-300 font-semibold mb-3">{member.role}</p>
                <p className="text-purple-200 text-sm">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-3xl p-12 md:p-16 text-center">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Ready to Experience BOPHILL?
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Join our community of satisfied guests and discover why we`re the premier choice for themed luxury accommodation.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/rooms"
                className="px-10 py-4 bg-white text-purple-600 rounded-xl font-bold text-lg hover:bg-gray-100 transition-all shadow-xl hover:shadow-2xl transform hover:scale-105"
              >
                Explore Rooms
              </Link>
              <Link
                href="/contact"
                className="px-10 py-4 bg-white/20 backdrop-blur-sm text-white rounded-xl font-bold text-lg hover:bg-white/30 transition-all border border-white/30"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}