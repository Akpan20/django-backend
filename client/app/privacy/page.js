"use client";

import Link from "next/link";

export default function PrivacyPolicy() {
  const sections = [
    {
      title: "1. Introduction",
      content: [
        {
          subtitle: "1.1 Our Commitment",
          text: "BOPHILL SUITES ('we', 'us', 'our') is committed to protecting your privacy and personal information. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our hotel, use our website, or book our services."
        },
        {
          subtitle: "1.2 Acceptance",
          text: "By using our services or providing us with your personal information, you consent to the practices described in this Privacy Policy. If you do not agree with our policies and practices, please do not use our services."
        },
        {
          subtitle: "1.3 Scope",
          text: "This Privacy Policy applies to all guests, website visitors, and anyone who interacts with BOPHILL SUITES, whether directly or through third-party booking platforms."
        }
      ]
    },
    {
      title: "2. Information We Collect",
      content: [
        {
          subtitle: "2.1 Personal Information",
          text: "We collect personal information that you voluntarily provide when making a reservation or checking in, including: Full name, email address, phone number, postal address, date of birth, government-issued ID details (passport, driver's license, national ID), payment information (credit/debit card details), and special requests or preferences."
        },
        {
          subtitle: "2.2 Booking Information",
          text: "When you make a reservation, we collect: Check-in and check-out dates, room preferences, number of guests, special requests (accessibility needs, dietary requirements), loyalty program membership details, and booking source information."
        },
        {
          subtitle: "2.3 Automatic Information",
          text: "We automatically collect certain information when you visit our website or use our services: IP address, browser type and version, device information, pages viewed and time spent on pages, referring website addresses, and cookies and similar tracking technologies."
        },
        {
          subtitle: "2.4 Communications",
          text: "We maintain records of your communications with us, including: Email correspondence, phone call records (with your consent where required), feedback and survey responses, and customer service interactions."
        },
        {
          subtitle: "2.5 Security and Safety Information",
          text: "For the safety and security of all guests, we may collect: CCTV footage from public areas, key card access logs, and incident reports if applicable."
        }
      ]
    },
    {
      title: "3. How We Use Your Information",
      content: [
        {
          subtitle: "3.1 Primary Purposes",
          text: "We use your information to: Process and manage your reservations, provide hotel services and amenities, communicate with you about your booking, process payments and prevent fraud, respond to your inquiries and customer service requests, and fulfill contractual obligations."
        },
        {
          subtitle: "3.2 Service Improvement",
          text: "We analyze your information to: Improve our services and facilities, understand guest preferences and trends, personalize your experience, develop new services and offerings, and conduct market research and analytics."
        },
        {
          subtitle: "3.3 Marketing Communications",
          text: "With your consent, we may use your information to: Send promotional offers and special deals, share news about our hotel and services, conduct surveys and request feedback, and provide information about loyalty programs. You can opt out of marketing communications at any time."
        },
        {
          subtitle: "3.4 Legal and Safety Purposes",
          text: "We may use your information to: Comply with legal obligations and regulations, protect our rights and property, ensure safety and security of guests and staff, prevent and investigate fraud or illegal activities, and respond to legal processes and law enforcement requests."
        }
      ]
    },
    {
      title: "4. Information Sharing and Disclosure",
      content: [
        {
          subtitle: "4.1 Service Providers",
          text: "We may share your information with trusted third-party service providers who assist us in: Payment processing, IT services and website hosting, marketing and advertising services, customer relationship management, and housekeeping and maintenance services. These providers are contractually obligated to protect your information."
        },
        {
          subtitle: "4.2 Business Partners",
          text: "We may share limited information with: Travel agencies and booking platforms, loyalty program partners, tourism boards and associations, and event organizers for group bookings."
        },
        {
          subtitle: "4.3 Legal Requirements",
          text: "We may disclose your information when required by law, including to: Law enforcement agencies, regulatory authorities, courts and legal proceedings, government agencies, and tax authorities."
        },
        {
          subtitle: "4.4 Business Transfers",
          text: "In the event of a merger, acquisition, or sale of assets, your information may be transferred to the new owner, subject to this Privacy Policy."
        },
        {
          subtitle: "4.5 With Your Consent",
          text: "We may share your information for other purposes with your explicit consent."
        }
      ]
    },
    {
      title: "5. Data Security",
      content: [
        {
          subtitle: "5.1 Security Measures",
          text: "We implement appropriate technical and organizational measures to protect your information, including: Encryption of sensitive data, secure servers and firewalls, access controls and authentication, regular security assessments, and staff training on data protection."
        },
        {
          subtitle: "5.2 Payment Security",
          text: "All payment transactions are processed through secure, PCI-DSS compliant payment gateways. We do not store complete credit card information on our servers."
        },
        {
          subtitle: "5.3 Limitations",
          text: "While we strive to protect your information, no method of transmission over the internet or electronic storage is 100% secure. We cannot guarantee absolute security."
        }
      ]
    },
    {
      title: "6. Your Rights and Choices",
      content: [
        {
          subtitle: "6.1 Access and Correction",
          text: "You have the right to: Access your personal information, request corrections to inaccurate information, update your contact details and preferences, and request a copy of your data."
        },
        {
          subtitle: "6.2 Deletion and Restriction",
          text: "You may request to: Delete your personal information (subject to legal obligations), restrict processing of your data, object to certain uses of your information, and withdraw consent where processing is based on consent."
        },
        {
          subtitle: "6.3 Marketing Preferences",
          text: "You can opt out of marketing communications by: Clicking the unsubscribe link in emails, contacting our customer service team, updating your account preferences, or sending a written request to our Data Protection Officer."
        },
        {
          subtitle: "6.4 Data Portability",
          text: "You have the right to receive your personal information in a structured, commonly used format and transmit it to another organization."
        },
        {
          subtitle: "6.5 Exercising Your Rights",
          text: "To exercise any of these rights, contact us at: Email: privacy@bophillsuites.com | Phone: +234 123 456 7890. We will respond to your request within 30 days."
        }
      ]
    },
    {
      title: "7. Data Retention",
      content: [
        {
          subtitle: "7.1 Retention Period",
          text: "We retain your personal information for as long as necessary to: Fulfill the purposes outlined in this Privacy Policy, comply with legal, accounting, or regulatory requirements, resolve disputes and enforce agreements, and maintain business records."
        },
        {
          subtitle: "7.2 Specific Retention Periods",
          text: "Booking information: 7 years for tax and accounting purposes. Payment records: As required by financial regulations. Marketing communications: Until you opt out or request deletion. CCTV footage: 30-90 days unless needed for investigations."
        },
        {
          subtitle: "7.3 Disposal",
          text: "When information is no longer needed, we securely delete or anonymize it in accordance with our data retention policy."
        }
      ]
    },
    {
      title: "8. Cookies and Tracking Technologies",
      content: [
        {
          subtitle: "8.1 What Are Cookies",
          text: "Cookies are small text files stored on your device when you visit our website. They help us provide a better user experience and analyze website usage."
        },
        {
          subtitle: "8.2 Types of Cookies We Use",
          text: "Essential cookies: Required for website functionality. Analytics cookies: Help us understand how visitors use our site. Marketing cookies: Used to deliver relevant advertisements. Preference cookies: Remember your settings and preferences."
        },
        {
          subtitle: "8.3 Managing Cookies",
          text: "You can control cookies through your browser settings. Note that disabling certain cookies may affect website functionality and your user experience."
        },
        {
          subtitle: "8.4 Third-Party Cookies",
          text: "Our website may include cookies from third-party services like Google Analytics, social media platforms, and advertising networks. These are governed by the respective third party's privacy policy."
        }
      ]
    },
    {
      title: "9. International Data Transfers",
      content: [
        {
          subtitle: "9.1 Cross-Border Transfers",
          text: "Your information may be transferred to and processed in countries other than Nigeria. We ensure that such transfers comply with applicable data protection laws and that adequate safeguards are in place."
        },
        {
          subtitle: "9.2 Safeguards",
          text: "When transferring data internationally, we use: Standard contractual clauses, adequacy decisions by relevant authorities, and other legally recognized transfer mechanisms."
        }
      ]
    },
    {
      title: "10. Children's Privacy",
      content: [
        {
          subtitle: "10.1 Age Restrictions",
          text: "Our services are not directed to children under 18 years of age. We do not knowingly collect personal information from children without parental consent."
        },
        {
          subtitle: "10.2 Parental Consent",
          text: "If we learn that we have collected information from a child without parental consent, we will delete that information promptly."
        }
      ]
    },
    {
      title: "11. Changes to This Privacy Policy",
      content: [
        {
          subtitle: "11.1 Updates",
          text: "We may update this Privacy Policy from time to time to reflect changes in our practices, technology, legal requirements, or other factors."
        },
        {
          subtitle: "11.2 Notification",
          text: "We will notify you of significant changes by: Posting the updated policy on our website with a new 'Last Updated' date, sending email notifications to registered guests, and displaying a notice on our website."
        },
        {
          subtitle: "11.3 Continued Use",
          text: "Your continued use of our services after changes to this Privacy Policy constitutes acceptance of those changes."
        }
      ]
    },
    {
      title: "12. Contact Information",
      content: [
        {
          subtitle: "12.1 Data Protection Officer",
          text: "If you have questions, concerns, or requests regarding this Privacy Policy or our data practices, please contact our Data Protection Officer:"
        },
        {
          subtitle: "12.2 Contact Details",
          text: "BOPHILL SUITES Data Protection Officer | Email: privacy@bophillsuites.com | Phone: +234 123 456 7890 | Address: 123 Victoria Island, Lagos, Nigeria | Office Hours: Monday - Friday, 9:00 AM - 5:00 PM WAT"
        },
        {
          subtitle: "12.3 Complaints",
          text: "If you believe your privacy rights have been violated, you have the right to lodge a complaint with the relevant data protection authority in Nigeria or your jurisdiction."
        }
      ]
    }
  ];

  const quickInfo = [
    {
      icon: "🔒",
      title: "Data Security",
      description: "Your information is encrypted and securely stored"
    },
    {
      icon: "👤",
      title: "Your Rights",
      description: "Access, correct, or delete your data anytime"
    },
    {
      icon: "🚫",
      title: "No Sale",
      description: "We never sell your personal information"
    },
    {
      icon: "📧",
      title: "Control",
      description: "Opt out of marketing emails anytime"
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
                🔐 Privacy & Data Protection
              </span>
            </div>
            
            <h1 className="text-5xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-purple-200 to-pink-200 mb-6">
              Privacy Policy
            </h1>
            
            <p className="text-lg text-purple-100 leading-relaxed mb-8">
              Last Updated: December 22, 2025
            </p>

            <div className="bg-blue-500/20 border border-blue-400/30 rounded-xl p-6 backdrop-blur-sm">
              <p className="text-purple-100 text-left">
                At BOPHILL SUITES, we respect your privacy and are committed to protecting your personal information. 
                This Privacy Policy outlines how we collect, use, store, and protect your data when you book a room or use our services.
              </p>
            </div>
          </div>
        </div>

        {/* Quick Info Cards */}
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
          <div className="grid md:grid-cols-4 gap-6">
            {quickInfo.map((item, index) => (
              <div
                key={index}
                className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20 text-center hover:transform hover:scale-105 transition-all"
              >
                <div className="text-4xl mb-3">{item.icon}</div>
                <h3 className="text-white font-bold mb-2">{item.title}</h3>
                <p className="text-purple-200 text-sm">{item.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Privacy Content */}
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

          {/* Contact CTA */}
          <div className="mt-12 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl p-8 text-center">
            <h3 className="text-2xl font-bold text-white mb-4">
              Questions About Your Privacy?
            </h3>
            <p className="text-white/90 mb-6">
              Our Data Protection Officer is here to help. Contact us anytime with privacy-related questions or concerns.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="mailto:privacy@bophillsuites.com"
                className="px-8 py-3 bg-white text-purple-600 rounded-xl font-bold hover:bg-gray-100 transition-all shadow-xl"
              >
                Email Privacy Team
              </a>
              <Link
                href="/terms"
                className="px-8 py-3 bg-white/20 backdrop-blur-sm text-white rounded-xl font-bold hover:bg-white/30 transition-all border border-white/30"
              >
                View Terms & Conditions
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
                Contact Us
              </h4>
              <p className="text-purple-200 text-sm">Reach our support team</p>
            </Link>

            <Link
              href="/rooms"
              className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20 hover:border-white/40 transition-all text-center group"
            >
              <div className="text-4xl mb-3">🏨</div>
              <h4 className="text-white font-semibold mb-2 group-hover:text-purple-300 transition-colors">
                Browse Rooms
              </h4>
              <p className="text-purple-200 text-sm">Book your stay with confidence</p>
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