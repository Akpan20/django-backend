"use client";

import Link from "next/link";

export default function TermsAndConditions() {
  const sections = [
    {
      title: "1. Booking and Reservations",
      content: [
        {
          subtitle: "1.1 Reservation Confirmation",
          text: "All reservations are subject to availability and confirmation. A booking is confirmed only when you receive a confirmation email from BOPHILL SUITES with your booking reference number."
        },
        {
          subtitle: "1.2 Payment Terms",
          text: "Full payment or a deposit (as specified at the time of booking) is required to secure your reservation. We accept major credit cards, debit cards, and bank transfers. All prices are quoted in Nigerian Naira (NGN) unless otherwise stated."
        },
        {
          subtitle: "1.3 Booking Modifications",
          text: "Changes to your booking (dates, room type, number of guests) are subject to availability and may incur additional charges. Modifications must be requested at least 48 hours before check-in. Contact our reservations team to request changes."
        },
        {
          subtitle: "1.4 Group Bookings",
          text: "Special terms apply to group bookings (5 or more rooms). Please contact our sales team for group rates and policies. Group bookings may require a non-refundable deposit."
        }
      ]
    },
    {
      title: "2. Cancellation and Refund Policy",
      content: [
        {
          subtitle: "2.1 Standard Cancellation",
          text: "Cancellations made 7 days or more before check-in date: Full refund minus 10% administrative fee. Cancellations made 3-6 days before check-in: 50% refund. Cancellations made less than 3 days before check-in or no-shows: No refund."
        },
        {
          subtitle: "2.2 Non-Refundable Bookings",
          text: "Special promotional rates and packages may be non-refundable. These terms will be clearly stated at the time of booking. No refunds or modifications are permitted for non-refundable bookings."
        },
        {
          subtitle: "2.3 Force Majeure",
          text: "In cases of force majeure events (natural disasters, pandemics, government restrictions), we will work with guests to reschedule or provide credits for future stays. Specific terms will be communicated based on the situation."
        },
        {
          subtitle: "2.4 Refund Processing",
          text: "Approved refunds will be processed within 14 business days to the original payment method used for booking."
        }
      ]
    },
    {
      title: "3. Check-In and Check-Out",
      content: [
        {
          subtitle: "3.1 Check-In Time",
          text: "Standard check-in time is 2:00 PM. Early check-in is subject to availability and may incur additional charges. Please contact us in advance if you require early check-in."
        },
        {
          subtitle: "3.2 Check-Out Time",
          text: "Standard check-out time is 12:00 PM (noon). Late check-out is subject to availability and additional charges apply. Failure to check out by the specified time may result in an extra night's charge."
        },
        {
          subtitle: "3.3 Identification Required",
          text: "All guests must provide valid government-issued photo identification (passport, driver's license, or national ID) at check-in. The person checking in must be at least 18 years old."
        },
        {
          subtitle: "3.4 Credit Card Authorization",
          text: "A valid credit card is required at check-in for incidental charges and security deposit. We may pre-authorize your card for incidentals."
        }
      ]
    },
    {
      title: "4. Guest Conduct and Responsibilities",
      content: [
        {
          subtitle: "4.1 Maximum Occupancy",
          text: "Each room has a maximum occupancy limit. Additional guests beyond the limit are not permitted and may result in additional charges or termination of your stay without refund."
        },
        {
          subtitle: "4.2 Noise and Disturbances",
          text: "Guests must respect other guests and maintain reasonable noise levels, especially during quiet hours (10:00 PM - 7:00 AM). We reserve the right to ask guests to leave without refund if they cause disturbances."
        },
        {
          subtitle: "4.3 Smoking Policy",
          text: "BOPHILL SUITES is a non-smoking facility. Smoking is only permitted in designated outdoor areas. Violation of this policy may result in a cleaning fee of NGN 50,000 and potential eviction."
        },
        {
          subtitle: "4.4 Prohibited Activities",
          text: "Illegal activities, possession of weapons, unauthorized parties, and bringing prohibited items into the hotel are strictly forbidden. Such activities will result in immediate eviction and may involve law enforcement."
        },
        {
          subtitle: "4.5 Pets",
          text: "Pets are not permitted unless specifically approved as service animals with proper documentation provided in advance."
        }
      ]
    },
    {
      title: "5. Property Damage and Liability",
      content: [
        {
          subtitle: "5.1 Guest Responsibility",
          text: "Guests are responsible for any damage caused to hotel property, furnishings, or equipment during their stay. Costs for repairs or replacements will be charged to your account."
        },
        {
          subtitle: "5.2 Lost or Stolen Items",
          text: "BOPHILL SUITES is not responsible for lost, stolen, or damaged personal belongings. We recommend using the in-room safe for valuables. The hotel's liability is limited as per Nigerian hospitality laws."
        },
        {
          subtitle: "5.3 Security Deposit",
          text: "A refundable security deposit may be required at check-in. This will be returned after inspection of the room, provided no damage has occurred."
        }
      ]
    },
    {
      title: "6. Hotel Services and Amenities",
      content: [
        {
          subtitle: "6.1 Service Availability",
          text: "While we strive to maintain all services and amenities, they may occasionally be unavailable due to maintenance or unforeseen circumstances. We will notify guests of any significant service interruptions."
        },
        {
          subtitle: "6.2 Internet Access",
          text: "Complimentary Wi-Fi is provided for guest convenience. We do not guarantee uninterrupted service or specific bandwidth speeds. The hotel is not liable for any security issues arising from Wi-Fi use."
        },
        {
          subtitle: "6.3 Housekeeping",
          text: "Daily housekeeping service is provided unless you opt for our eco-friendly program. Please use the 'Do Not Disturb' sign if you prefer not to be disturbed."
        }
      ]
    },
    {
      title: "7. Special Requests and Accessibility",
      content: [
        {
          subtitle: "7.1 Special Requests",
          text: "Special requests (specific room locations, bed types, dietary requirements) cannot be guaranteed but will be accommodated whenever possible. Please submit requests at the time of booking."
        },
        {
          subtitle: "7.2 Accessibility",
          text: "We are committed to providing accessible accommodations. Please inform us of any accessibility needs at the time of booking so we can ensure your comfort."
        }
      ]
    },
    {
      title: "8. Children and Additional Guests",
      content: [
        {
          subtitle: "8.1 Children Policy",
          text: "Children under 12 years old stay free when sharing existing bedding with adults. Additional charges apply for extra beds or cribs. Parents/guardians are responsible for supervising children at all times."
        },
        {
          subtitle: "8.2 Visitor Policy",
          text: "Registered guests may receive visitors in public areas during reasonable hours. Visitors are not permitted in guest rooms unless registered and additional charges apply."
        }
      ]
    },
    {
      title: "9. Limitation of Liability",
      content: [
        {
          subtitle: "9.1 Hotel Liability",
          text: "BOPHILL SUITES' liability is limited to the extent permitted by Nigerian law. We are not liable for indirect, incidental, or consequential damages arising from your stay."
        },
        {
          subtitle: "9.2 Third-Party Services",
          text: "The hotel may arrange third-party services (tours, transportation) for guests' convenience. We are not liable for the acts or omissions of these third-party providers."
        }
      ]
    },
    {
      title: "10. Governing Law and Dispute Resolution",
      content: [
        {
          subtitle: "10.1 Governing Law",
          text: "These Terms and Conditions are governed by the laws of the Federal Republic of Nigeria. Any disputes shall be subject to the exclusive jurisdiction of Nigerian courts."
        },
        {
          subtitle: "10.2 Dispute Resolution",
          text: "We encourage guests to contact our management team first to resolve any concerns. If necessary, disputes may be resolved through mediation before resorting to legal action."
        }
      ]
    },
    {
      title: "11. Changes to Terms",
      content: [
        {
          subtitle: "11.1 Modifications",
          text: "BOPHILL SUITES reserves the right to modify these Terms and Conditions at any time. Changes will be effective immediately upon posting on our website. Continued use of our services constitutes acceptance of modified terms."
        },
        {
          subtitle: "11.2 Notification",
          text: "Significant changes to these terms will be communicated via email to registered guests and posted on our website."
        }
      ]
    },
    {
      title: "12. Contact Information",
      content: [
        {
          subtitle: "12.1 Questions and Concerns",
          text: "If you have any questions about these Terms and Conditions, please contact us at: Email: legal@bophillsuites.com | Phone: +234 123 456 7890 | Address: 123 Victoria Island, Lagos, Nigeria"
        }
      ]
    }
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
        <div className="pt-32 pb-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-block mb-6">
              <span className="px-4 py-2 bg-purple-500/20 text-purple-200 rounded-full text-sm font-semibold backdrop-blur-sm border border-purple-400/30">
                📜 Legal Information
              </span>
            </div>
            
            <h1 className="text-5xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-purple-200 to-pink-200 mb-6">
              Terms & Conditions
            </h1>
            
            <p className="text-lg text-purple-100 leading-relaxed mb-8">
              Last Updated: December 22, 2025
            </p>

            <div className="bg-blue-500/20 border border-blue-400/30 rounded-xl p-6 backdrop-blur-sm">
              <p className="text-purple-100 text-left">
                Welcome to BOPHILL SUITES. By making a reservation or using our services, you agree to be bound by these Terms and Conditions. 
                Please read them carefully before booking. If you do not agree with any part of these terms, please do not proceed with your booking.
              </p>
            </div>
          </div>
        </div>

        {/* Terms Content */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
          <div className="space-y-8">
            {sections.map((section, index) => (
              <div
                key={index}
                className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20"
              >
                <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">
                  {section.title}
                </h2>
                
                <div className="space-y-6">
                  {section.content.map((item, idx) => (
                    <div key={idx}>
                      <h3 className="text-lg font-semibold text-purple-200 mb-2">
                        {item.subtitle}
                      </h3>
                      <p className="text-purple-100 leading-relaxed">
                        {item.text}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Acceptance Notice */}
          <div className="mt-12 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl p-8 text-center">
            <h3 className="text-2xl font-bold text-white mb-4">
              By proceeding with your booking, you acknowledge that you have read, understood, and agree to these Terms and Conditions.
            </h3>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-6">
              <Link
                href="/rooms"
                className="px-8 py-3 bg-white text-purple-600 rounded-xl font-bold hover:bg-gray-100 transition-all shadow-xl"
              >
                Browse Rooms
              </Link>
              <Link
                href="/privacy-policy"
                className="px-8 py-3 bg-white/20 backdrop-blur-sm text-white rounded-xl font-bold hover:bg-white/30 transition-all border border-white/30"
              >
                View Privacy Policy
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div className="mt-12 grid md:grid-cols-3 gap-6">
            <Link
              href="/contact"
              className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20 hover:border-white/40 transition-all text-center group"
            >
              <div className="text-4xl mb-3">📞</div>
              <h4 className="text-white font-semibold mb-2 group-hover:text-purple-300 transition-colors">
                Questions?
              </h4>
              <p className="text-purple-200 text-sm">Contact our team</p>
            </Link>

            <Link
              href="/about"
              className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20 hover:border-white/40 transition-all text-center group"
            >
              <div className="text-4xl mb-3">🏨</div>
              <h4 className="text-white font-semibold mb-2 group-hover:text-purple-300 transition-colors">
                About Us
              </h4>
              <p className="text-purple-200 text-sm">Learn more about BOPHILL</p>
            </Link>

            <Link
              href="/"
              className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20 hover:border-white/40 transition-all text-center group"
            >
              <div className="text-4xl mb-3">🏠</div>
              <h4 className="text-white font-semibold mb-2 group-hover:text-purple-300 transition-colors">
                Home
              </h4>
              <p className="text-purple-200 text-sm">Return to homepage</p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}