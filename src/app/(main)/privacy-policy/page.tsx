"use client";

import React, { useState } from "react";
import { FileText, ArrowRight, Mail, Building2, ExternalLink } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import Herosection from "@/components/shared/herosection";
import useIsMobile from "@/app/_hooks/useIsMobile";
import clsx from "clsx";

export default function PrivacyPolicy() {
  const isMobile = useIsMobile();

  const [activeSection, setActiveSection] = useState("1");

  const scrollToSection = (id: string) => {
    setActiveSection(id);

    const element = document.getElementById(`section-${id}`);

    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  const sections = [
    { id: "1", title: "1. Introduction" },
    { id: "2", title: "2. Who is Responsible for Your Information?" },
    { id: "3", title: "3. What Information Do We Collect?" },
    { id: "4", title: "4. Information About Communications" },
    { id: "5", title: "5. Information We Collect Automatically" },
    { id: "6", title: "6. Cookies and Similar Technologies" },
    { id: "7", title: "7. How We Use Your Information" },
    { id: "8", title: "8. Our Legal Bases for Processing Personal Information" },
    { id: "9", title: "9. Information That Other Users Can See" },
    { id: "10", title: "10. Location Information" },
    { id: "11", title: "11. User-to-User Exchanges" },
    { id: "12", title: "12. Scams, Fraud and Losses" },
    { id: "13", title: "13. Safety During Exchanges" },
    { id: "14", title: "14. Information We Receive From Other Users" },
    { id: "15", title: "15. Identity Verification" },
    { id: "16", title: "16. Payments" },
    { id: "17", title: "17. When We Share Personal Information" },
    { id: "18", title: "18. International Transfers" },
    { id: "19", title: "19. How Long We Keep Your Information" },
    { id: "20", title: "20. Account Deletion" },
    { id: "21", title: "21. Your Data Protection Rights" },
    { id: "22", title: "22. How to Exercise Your Rights" },
    { id: "23", title: "23. Marketing Communications" },
    { id: "24", title: "24. Children" },
    { id: "25", title: "25. User-Generated Content" },
    { id: "26", title: "26. Reviews and Reports" },
    { id: "27", title: "27. Security" },
    { id: "28", title: "28. Data Breaches" },
    { id: "29", title: "29. Third-Party Websites" },
    { id: "30", title: "30. Social Media" },
    { id: "31", title: "31. Analytics" },
    { id: "32", title: "32. Automated Decision-Making" },
    { id: "33", title: "33. Changes to This Privacy Policy" },
    { id: "34", title: "34. Contact Us" },
    { id: "35", title: "35. Complaints" },
    { id: "36", title: "36. Important Notice About This Privacy Policy" },
  ];

  const bulletClass = "flex items-start gap-2 text-sm text-[#555555] leading-relaxed";

  return (
    <>
      {!isMobile && <Herosection />}
      <section
        className={clsx(
          "p-4 md:p-8 max-w-7xl mx-auto min-h-screen text-[#222222]",
          isMobile ? "mt-0" : "mt-20"
        )}
      >
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sticky Table of Contents Navigation */}
          <aside className="hidden lg:block w-72 shrink-0">
            <div className="sticky top-24 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
              <h3 className="mb-3 flex items-center gap-2 px-2 text-sm font-semibold text-black">
                <FileText size={16} />
                Table of Contents
              </h3>

              <nav className="space-y-1">
                {sections.map((sec) => (
                  <button
                    key={sec.id}
                    type="button"
                    onClick={() => scrollToSection(sec.id)}
                    className={`group flex w-full items-start justify-between rounded-xl px-3 py-2 text-left text-xs transition-all ${
                      activeSection === sec.id
                        ? "font-medium text-white shadow-sm"
                        : "text-slate-500 hover:bg-[#007AFF0D]"
                    }`}
                    style={activeSection === sec.id ? { backgroundColor: "#007AFF" } : undefined}
                  >
                    <span>{sec.title}</span>

                    {activeSection === sec.id && (
                      <ArrowRight className="ml-2 mt-0.5 h-3.5 w-3.5 shrink-0" />
                    )}
                  </button>
                ))}
              </nav>
            </div>
          </aside>

          {/* Policy Content */}
          <main className="flex-1 space-y-8 max-w-4xl">
            {/* Header */}
            <div className="space-y-2">
              <h1 className="text-2xl md:text-3xl font-bold text-black">PRIVACY POLICY</h1>

              <p className="text-sm text-[#555555]">
                <strong>Last Updated:</strong> 23 September 2026
              </p>

              <p className="text-sm text-[#555555]">
                <strong>Effective Date:</strong> 23 September 2026
              </p>
            </div>

            {/* Section 1 */}
            <section id="section-1" className="space-y-3 scroll-mt-24">
              <h2 className="text-lg md:text-xl font-bold text-black">1. INTRODUCTION</h2>

              <Card className="shadow-none border-gray-100">
                <CardContent className="p-5 space-y-4 text-sm text-[#555555] leading-relaxed">
                  <p>Welcome to Swap Shop (“Swap Shop”, “we”, “us”, or “our”).</p>

                  <p>
                    Swap Shop is an online platform that allows individuals to list items they
                    already own and connect with other users who may wish to exchange those items.
                    Users can communicate with one another and independently agree the terms,
                    conditions, location, timing and method of any exchange.
                  </p>

                  <p>
                    Your privacy is important to us. This Privacy Policy explains what personal
                    information we collect, how we use it, how we protect it, when we may share it,
                    and what rights you have regarding your personal information.
                  </p>

                  <p>
                    By using Swap Shop, including our website, applications, services and related
                    features (collectively, the “Platform”), you acknowledge that you have read and
                    understood this Privacy Policy.
                  </p>
                </CardContent>
              </Card>
            </section>

            {/* Section 2 */}
            <section id="section-2" className="space-y-3 scroll-mt-24">
              <h2 className="text-lg md:text-xl font-bold text-black">
                2. WHO IS RESPONSIBLE FOR YOUR INFORMATION?
              </h2>

              <Card className="shadow-none border-gray-100 bg-[#FBFBFB]">
                <CardContent className="p-5 space-y-4 text-sm text-[#555555]">
                  <p>The organisation responsible for your personal information is:</p>

                  <div className="bg-white p-4 rounded-xl border border-gray-200 space-y-2 text-xs md:text-sm">
                    <div className="flex items-center gap-2 font-semibold text-black">
                      <Building2 size={16} />
                      Swap Shop
                    </div>

                    <p>[Legal Business Name]</p>
                    <p>[Registered Address]</p>
                    <p>[Company Registration Number, if applicable]</p>

                    <p className="flex items-center gap-1.5 text-[#007AFF]">
                      <Mail size={14} />
                      [Email Address]
                    </p>

                    <p className="flex items-center gap-1.5 text-[#007AFF]">
                      <Mail size={14} />
                      [Privacy Contact Email]
                    </p>
                  </div>

                  <p>
                    For the purposes of UK data protection law, including the UK General Data
                    Protection Regulation (UK GDPR) and the Data Protection Act 2018, we will
                    generally act as the data controller for personal information that we collect
                    and process in connection with your use of the Platform.
                  </p>

                  <p>
                    If Swap Shop operates through a different legal entity, the identity of that
                    entity should be inserted above.
                  </p>
                </CardContent>
              </Card>
            </section>

            {/* Section 3 */}
            <section id="section-3" className="space-y-4 scroll-mt-24">
              <h2 className="text-lg md:text-xl font-bold text-black">
                3. WHAT INFORMATION DO WE COLLECT?
              </h2>

              <p className="text-sm text-[#555555]">
                We may collect several categories of information.
              </p>

              <div className="space-y-2">
                <h3 className="text-md font-semibold text-[#222222]">
                  3.1 Information you provide when creating an account
                </h3>

                <Card className="shadow-none border-gray-100">
                  <CardContent className="p-5 space-y-4">
                    <p className="text-sm text-[#555555]">
                      When you register for an account, we may collect:
                    </p>

                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
                      {[
                        "Full name or display name",
                        "Email address",
                        "Telephone number, where provided",
                        "Password or authentication information",
                        "Profile photograph, where you choose to provide one",
                        "General location, such as town, city or postcode",
                        "Account preferences",
                        "Information necessary to verify your account",
                      ].map((item, i) => (
                        <li key={i} className={bulletClass}>
                          <span className="mt-2 w-1.5 h-1.5 shrink-0 rounded-full bg-[#007AFF]" />
                          {item}
                        </li>
                      ))}
                    </ul>

                    <p className="text-xs italic text-amber-700 bg-amber-50 p-3 rounded-lg border border-amber-200">
                      You should avoid putting unnecessary personal information in your public
                      profile.
                    </p>
                  </CardContent>
                </Card>
              </div>

              <div className="space-y-2">
                <h3 className="text-md font-semibold text-[#222222]">
                  3.2 Information about items you list
                </h3>

                <Card className="shadow-none border-gray-100">
                  <CardContent className="p-5 space-y-4">
                    <p className="text-sm text-[#555555]">
                      When you list an item for exchange, we may collect:
                    </p>

                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
                      {[
                        "Item title",
                        "Description",
                        "Photographs",
                        "Videos, where supported",
                        "Approximate location",
                        "Condition of the item",
                        "Category",
                        "Estimated or stated value, where provided",
                        "Exchange preferences",
                        "Date and time of listing",
                        "Information about whether the item is available, exchanged or removed",
                      ].map((item, i) => (
                        <li key={i} className={bulletClass}>
                          <span className="mt-2 w-1.5 h-1.5 shrink-0 rounded-full bg-[#007AFF]" />
                          {item}
                        </li>
                      ))}
                    </ul>

                    <p className="text-sm text-[#555555]">
                      Please do not include unnecessary personal information in item descriptions or
                      photographs.
                    </p>

                    <p className="text-sm text-[#555555]">
                      For example, photographs should not unnecessarily reveal:
                    </p>

                    <div className="bg-[#FFF6F6] border border-[#FFD0D0] rounded-xl p-4">
                      <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        {[
                          "Your home address",
                          "Identification documents",
                          "Financial information",
                          "Passwords",
                          "Private correspondence",
                          "Other people’s personal information",
                        ].map((item, i) => (
                          <li key={i} className={bulletClass}>
                            <span className="mt-2 w-1.5 h-1.5 shrink-0 rounded-full bg-[#FF3B30]" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </section>

            {/* Section 4 */}
            <section id="section-4" className="space-y-3 scroll-mt-24">
              <h2 className="text-lg md:text-xl font-bold text-black">
                4. INFORMATION ABOUT COMMUNICATIONS
              </h2>

              <Card className="shadow-none border-gray-100">
                <CardContent className="p-5 space-y-4 text-sm text-[#555555] leading-relaxed">
                  <p>
                    If the Platform provides messaging or communication features, we may process
                    information relating to communications between users.
                  </p>

                  <p>This may include:</p>

                  <ul className="space-y-2">
                    {[
                      "Messages sent through the Platform",
                      "Images or files sent through the Platform",
                      "Dates and times of communications",
                      "Information about the users involved",
                      "Reports or complaints relating to communications",
                    ].map((item, i) => (
                      <li key={i} className={bulletClass}>
                        <span className="mt-2 w-1.5 h-1.5 shrink-0 rounded-full bg-[#007AFF]" />
                        {item}
                      </li>
                    ))}
                  </ul>

                  <p>
                    We may process communications where necessary to provide the service, maintain
                    security, investigate suspected fraud, enforce our rules, respond to complaints,
                    or comply with legal obligations.
                  </p>

                  <p>
                    Where appropriate and legally permitted, we may use automated systems to detect
                    spam, scams, malicious activity or other prohibited behaviour.
                  </p>
                </CardContent>
              </Card>
            </section>

            {/* Section 5 */}
            <section id="section-5" className="space-y-3 scroll-mt-24">
              <h2 className="text-lg md:text-xl font-bold text-black">
                5. INFORMATION WE COLLECT AUTOMATICALLY
              </h2>

              <Card className="shadow-none border-gray-100">
                <CardContent className="p-5 space-y-4 text-sm text-[#555555]">
                  <p>
                    When you use the Platform, certain technical information may be collected
                    automatically.
                  </p>

                  <p>This may include:</p>

                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
                    {[
                      "IP address",
                      "Device type",
                      "Browser type",
                      "Operating system",
                      "Mobile device identifiers",
                      "Approximate location",
                      "Language and time-zone settings",
                      "Pages and features accessed",
                      "Search activity",
                      "Login information",
                      "Date and time of access",
                      "Referring website",
                      "Error reports",
                      "Information about how you interact with the Platform",
                    ].map((item, i) => (
                      <li key={i} className={bulletClass}>
                        <span className="mt-2 w-1.5 h-1.5 shrink-0 rounded-full bg-[#007AFF]" />
                        {item}
                      </li>
                    ))}
                  </ul>

                  <p>
                    We use this information to operate, maintain, secure and improve the Platform.
                  </p>
                </CardContent>
              </Card>
            </section>

            {/* Section 6 */}
            <section id="section-6" className="space-y-3 scroll-mt-24">
              <h2 className="text-lg md:text-xl font-bold text-black">
                6. COOKIES AND SIMILAR TECHNOLOGIES
              </h2>

              <Card className="shadow-none border-gray-100">
                <CardContent className="p-5 space-y-4 text-sm text-[#555555]">
                  <p>Swap Shop may use cookies and similar technologies.</p>

                  <p>Cookies may be used for purposes such as:</p>

                  <ul className="space-y-2">
                    {[
                      "Keeping you signed in",
                      "Remembering preferences",
                      "Maintaining security",
                      "Understanding how users interact with the Platform",
                      "Improving functionality",
                      "Measuring performance",
                      "Supporting analytics",
                      "Delivering advertising, where applicable",
                    ].map((item, i) => (
                      <li key={i} className={bulletClass}>
                        <span className="mt-2 w-1.5 h-1.5 shrink-0 rounded-full bg-[#007AFF]" />
                        {item}
                      </li>
                    ))}
                  </ul>

                  <p>
                    Where required by law, we will request your consent before placing non-essential
                    cookies on your device.
                  </p>

                  <p>
                    You can manage cookies through your browser and, where available, through our
                    cookie preference controls.
                  </p>
                </CardContent>
              </Card>
            </section>

            {/* Section 7 */}
            <section id="section-7" className="space-y-3 scroll-mt-24">
              <h2 className="text-lg md:text-xl font-bold text-black">
                7. HOW WE USE YOUR INFORMATION
              </h2>

              <Card className="shadow-none border-gray-100">
                <CardContent className="p-5 space-y-6 text-sm text-[#555555]">
                  <div>
                    <h3 className="font-semibold text-black mb-2">Providing the Platform</h3>

                    <p className="mb-2">To:</p>

                    <ul className="space-y-2">
                      {[
                        "Create and manage your account",
                        "Allow you to list items",
                        "Allow other users to discover listings",
                        "Facilitate communication between users",
                        "Provide search and matching functionality",
                        "Maintain your account",
                        "Provide customer support",
                      ].map((item, i) => (
                        <li key={i} className={bulletClass}>
                          <span className="mt-2 w-1.5 h-1.5 shrink-0 rounded-full bg-[#007AFF]" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h3 className="font-semibold text-black mb-2">Security and fraud prevention</h3>

                    <p className="mb-2">To:</p>

                    <ul className="space-y-2">
                      {[
                        "Detect suspicious activity",
                        "Prevent abuse",
                        "Investigate reports",
                        "Identify potentially fraudulent accounts",
                        "Protect users and the Platform",
                        "Prevent spam and malicious activity",
                        "Enforce our Terms and Conditions",
                      ].map((item, i) => (
                        <li key={i} className={bulletClass}>
                          <span className="mt-2 w-1.5 h-1.5 shrink-0 rounded-full bg-[#007AFF]" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h3 className="font-semibold text-black mb-2">Improving the Platform</h3>

                    <p className="mb-2">We may analyse usage information to:</p>

                    <ul className="space-y-2">
                      {[
                        "Improve functionality",
                        "Develop new features",
                        "Understand user behaviour",
                        "Fix technical problems",
                        "Improve performance",
                        "Improve user experience",
                      ].map((item, i) => (
                        <li key={i} className={bulletClass}>
                          <span className="mt-2 w-1.5 h-1.5 shrink-0 rounded-full bg-[#007AFF]" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h3 className="font-semibold text-black mb-2">Legal and regulatory purposes</h3>

                    <p className="mb-2">We may process information where necessary to:</p>

                    <ul className="space-y-2">
                      {[
                        "Comply with applicable law",
                        "Respond to lawful requests from authorities",
                        "Establish or defend legal claims",
                        "Protect our legal rights",
                        "Investigate suspected unlawful activity",
                      ].map((item, i) => (
                        <li key={i} className={bulletClass}>
                          <span className="mt-2 w-1.5 h-1.5 shrink-0 rounded-full bg-[#007AFF]" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </section>

            {/* Section 8 */}
            <section id="section-8" className="space-y-3 scroll-mt-24">
              <h2 className="text-lg md:text-xl font-bold text-black">
                8. OUR LEGAL BASES FOR PROCESSING PERSONAL INFORMATION
              </h2>

              <Card className="shadow-none border-gray-100">
                <CardContent className="p-5 space-y-5 text-sm text-[#555555] leading-relaxed">
                  <p>
                    Where UK GDPR applies, we will process personal information on an appropriate
                    legal basis.
                  </p>

                  <p>Depending on the circumstances, these may include:</p>

                  <div>
                    <h3 className="font-semibold text-black">Contract</h3>
                    <p>
                      Processing may be necessary to provide the Platform and fulfil our agreement
                      with you.
                    </p>
                  </div>

                  <div>
                    <h3 className="font-semibold text-black">Legitimate interests</h3>

                    <p>
                      We may process information where necessary for legitimate interests, provided
                      that those interests are not overridden by your rights and interests.
                    </p>

                    <p className="mt-2">Examples may include:</p>

                    <ul className="space-y-2 mt-2">
                      {[
                        "Platform security",
                        "Fraud prevention",
                        "Service improvement",
                        "Protecting our business",
                        "Responding to abuse",
                        "Maintaining technical infrastructure",
                      ].map((item, i) => (
                        <li key={i} className={bulletClass}>
                          <span className="mt-2 w-1.5 h-1.5 shrink-0 rounded-full bg-[#007AFF]" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h3 className="font-semibold text-black">Consent</h3>
                    <p>
                      We may ask for your consent where required by law, for example for certain
                      marketing or non-essential cookies.
                    </p>

                    <p className="mt-2">
                      Where processing is based on consent, you may withdraw your consent at any
                      time.
                    </p>
                  </div>

                  <div>
                    <h3 className="font-semibold text-black">Legal obligation</h3>
                    <p>
                      We may process information where necessary to comply with a legal obligation.
                    </p>
                  </div>

                  <div>
                    <h3 className="font-semibold text-black">Vital interests</h3>
                    <p>
                      In limited circumstances, personal information may be processed where
                      necessary to protect someone’s vital interests.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </section>

            {/* Section 9 */}
            <section id="section-9" className="space-y-3 scroll-mt-24">
              <h2 className="text-lg md:text-xl font-bold text-black">
                9. INFORMATION THAT OTHER USERS CAN SEE
              </h2>

              <Card className="shadow-none border-gray-100">
                <CardContent className="p-5 space-y-4 text-sm text-[#555555] leading-relaxed">
                  <p>
                    Swap Shop is a platform designed to connect users who wish to exchange items.
                  </p>

                  <p>
                    Depending on the Platform’s functionality and your settings, other users may be
                    able to see information such as:
                  </p>

                  <ul className="space-y-2">
                    {[
                      "Your display name",
                      "Profile photograph",
                      "General location",
                      "Items you have listed",
                      "Item photographs",
                      "Item descriptions",
                      "Exchange preferences",
                      "Public profile information",
                    ].map((item, i) => (
                      <li key={i} className={bulletClass}>
                        <span className="mt-2 w-1.5 h-1.5 shrink-0 rounded-full bg-[#007AFF]" />
                        {item}
                      </li>
                    ))}
                  </ul>

                  <p>
                    We recommend that you do not publish sensitive or unnecessary personal
                    information. For example, you should not publicly publish:
                  </p>

                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {[
                      "Your full home address",
                      "Bank details",
                      "Payment card information",
                      "Passport information",
                      "National Insurance number",
                      "Passwords",
                      "Security questions",
                      "Other sensitive information",
                    ].map((item, i) => (
                      <li key={i} className={bulletClass}>
                        <span className="mt-2 w-1.5 h-1.5 shrink-0 rounded-full bg-[#FF3B30]" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </section>

            {/* Section 10 */}
            <section id="section-10" className="space-y-3 scroll-mt-24">
              <h2 className="text-lg md:text-xl font-bold text-black">10. LOCATION INFORMATION</h2>

              <Card className="shadow-none border-gray-100">
                <CardContent className="p-5 space-y-4 text-sm text-[#555555] leading-relaxed">
                  <p>
                    Location information may be used to help users find items available in their
                    area.
                  </p>

                  <p>
                    Where possible, Swap Shop may display an approximate location rather than your
                    exact address.
                  </p>

                  <p>
                    We strongly recommend that users do not publish their home address publicly.
                  </p>

                  <p>
                    If users choose to exchange items in person, they should independently decide
                    where the exchange will take place and should consider appropriate personal
                    safety precautions.
                  </p>

                  <p>
                    Swap Shop does not require users to disclose their home address to another user
                    unless a particular feature expressly requires it.
                  </p>
                </CardContent>
              </Card>
            </section>

            {/* Section 11 */}
            <section id="section-11" className="space-y-3 scroll-mt-24">
              <h2 className="text-lg md:text-xl font-bold text-black">
                11. USER-TO-USER EXCHANGES
              </h2>

              <Card className="bg-[#FFFDF9] border border-[#FFE8C6] shadow-none">
                <CardContent className="p-5 space-y-4 text-sm text-[#664D03] leading-relaxed">
                  <p>
                    Swap Shop provides a platform for users to discover items and communicate with
                    one another.
                  </p>

                  <p>
                    The actual exchange is an arrangement between the participating users. Users are
                    responsible for independently deciding:
                  </p>

                  <ul className="space-y-2">
                    {[
                      "Whether to exchange",
                      "What items will be exchanged",
                      "Whether an item is genuine",
                      "The condition of an item",
                      "The value of an item",
                      "Whether an exchange is fair",
                      "Where the exchange takes place",
                      "When the exchange takes place",
                      "How the items will be delivered or collected",
                      "Whether additional conditions apply",
                    ].map((item, i) => (
                      <li key={i} className={bulletClass}>
                        <span className="mt-2 w-1.5 h-1.5 shrink-0 rounded-full bg-[#D97706]" />
                        {item}
                      </li>
                    ))}
                  </ul>

                  <p>
                    Swap Shop does not automatically become a party to an exchange simply because
                    the exchange was arranged using the Platform.
                  </p>
                </CardContent>
              </Card>
            </section>

            {/* Section 12 */}
            <section id="section-12" className="space-y-3 scroll-mt-24">
              <h2 className="text-lg md:text-xl font-bold text-black">
                12. SCAMS, FRAUD AND LOSSES
              </h2>

              <Card className="shadow-none border-gray-100">
                <CardContent className="p-5 space-y-4 text-sm text-[#555555] leading-relaxed">
                  <p>
                    Swap Shop is designed to help users connect, but no online platform can
                    guarantee that every user or listing is genuine.
                  </p>

                  <p>Users should exercise caution when dealing with other users.</p>

                  <p>
                    To the maximum extent permitted by applicable law, Swap Shop does not accept
                    responsibility for losses arising from transactions or exchanges independently
                    arranged between users, including losses resulting from:
                  </p>

                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {[
                      "Fraud",
                      "Scams",
                      "Misrepresentation",
                      "Fake listings",
                      "Counterfeit goods",
                      "Stolen property",
                      "Damaged goods",
                      "Defective goods",
                      "Items not matching their description",
                      "Failure to deliver an item",
                      "Failure to attend an exchange",
                      "Theft",
                      "Loss of property",
                      "Damage to property",
                      "Disputes over value",
                      "Disputes over ownership",
                      "Personal injury occurring during an independently arranged exchange",
                    ].map((item, i) => (
                      <li key={i} className={bulletClass}>
                        <span className="mt-2 w-1.5 h-1.5 shrink-0 rounded-full bg-[#FF3B30]" />
                        {item}
                      </li>
                    ))}
                  </ul>

                  <p>This does not exclude or limit liability where doing so would be unlawful.</p>

                  <p>
                    Nothing in this Privacy Policy or our Terms and Conditions is intended to
                    exclude liability that cannot legally be excluded under applicable law.
                  </p>
                </CardContent>
              </Card>
            </section>

            {/* Section 13 */}
            <section id="section-13" className="space-y-3 scroll-mt-24">
              <h2 className="text-lg md:text-xl font-bold text-black">
                13. SAFETY DURING EXCHANGES
              </h2>

              <Card className="shadow-none border-gray-100">
                <CardContent className="p-5 space-y-4 text-sm text-[#555555] leading-relaxed">
                  <p>
                    Users are responsible for taking reasonable precautions when arranging physical
                    exchanges.
                  </p>

                  <p>We encourage users to consider:</p>

                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {[
                      "Meeting in a public place",
                      "Meeting during daylight hours",
                      "Bringing another person where appropriate",
                      "Informing someone they trust about the meeting",
                      "Checking the item before completing the exchange",
                      "Avoiding sharing unnecessary personal information",
                      "Not carrying large amounts of cash",
                      "Cancelling an exchange if something appears suspicious",
                    ].map((item, i) => (
                      <li key={i} className={bulletClass}>
                        <span className="mt-2 w-1.5 h-1.5 shrink-0 rounded-full bg-[#007AFF]" />
                        {item}
                      </li>
                    ))}
                  </ul>

                  <p>
                    If an exchange involves entering someone’s home, users should exercise
                    particular caution.
                  </p>

                  <p>Swap Shop does not supervise physical exchanges between users.</p>
                </CardContent>
              </Card>
            </section>

            {/* Section 14 */}
            <section id="section-14" className="space-y-3 scroll-mt-24">
              <h2 className="text-lg md:text-xl font-bold text-black">
                14. INFORMATION WE RECEIVE FROM OTHER USERS
              </h2>

              <Card className="shadow-none border-gray-100">
                <CardContent className="p-5 space-y-4 text-sm text-[#555555]">
                  <p>We may receive information about you from other users.</p>

                  <p>For example, another user may:</p>

                  <ul className="space-y-2">
                    {[
                      "Report your account",
                      "Report a listing",
                      "Submit a complaint",
                      "Provide information about a suspected scam",
                      "Report inappropriate behaviour",
                      "Submit evidence relating to a dispute",
                    ].map((item, i) => (
                      <li key={i} className={bulletClass}>
                        <span className="mt-2 w-1.5 h-1.5 shrink-0 rounded-full bg-[#007AFF]" />
                        {item}
                      </li>
                    ))}
                  </ul>

                  <p>
                    We may use this information to investigate the matter and protect the Platform
                    and its users.
                  </p>
                </CardContent>
              </Card>
            </section>

            {/* Section 15 */}
            <section id="section-15" className="space-y-3 scroll-mt-24">
              <h2 className="text-lg md:text-xl font-bold text-black">15. IDENTITY VERIFICATION</h2>

              <Card className="shadow-none border-gray-100">
                <CardContent className="p-5 space-y-4 text-sm text-[#555555] leading-relaxed">
                  <p>
                    Where appropriate, Swap Shop may introduce identity verification or account
                    verification features.
                  </p>

                  <p>
                    If verification is introduced, we may collect information necessary to verify
                    identity, depending on the verification method used.
                  </p>

                  <p>
                    Where a third-party identity verification provider is used, that provider may
                    process your personal information according to its own privacy policy.
                  </p>

                  <p>
                    Additional information will be provided when such verification is requested.
                  </p>
                </CardContent>
              </Card>
            </section>

            {/* Section 16 */}
            <section id="section-16" className="space-y-3 scroll-mt-24">
              <h2 className="text-lg md:text-xl font-bold text-black">16. PAYMENTS</h2>

              <Card className="shadow-none border-gray-100">
                <CardContent className="p-5 space-y-4 text-sm text-[#555555] leading-relaxed">
                  <p>Swap Shop may or may not provide payment services.</p>

                  <p>
                    If Swap Shop does not process payments, payment arrangements made directly
                    between users are outside the payment systems of Swap Shop.
                  </p>

                  <p>
                    If payment functionality is introduced in the future, payments may be processed
                    by a third-party payment provider.
                  </p>

                  <p>
                    In such circumstances, the payment provider may process information including:
                  </p>

                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {[
                      "Name",
                      "Billing information",
                      "Payment details",
                      "Transaction information",
                      "Fraud-prevention information",
                    ].map((item, i) => (
                      <li key={i} className={bulletClass}>
                        <span className="mt-2 w-1.5 h-1.5 shrink-0 rounded-full bg-[#007AFF]" />
                        {item}
                      </li>
                    ))}
                  </ul>

                  <p>
                    Swap Shop will not normally have access to full payment-card details where
                    payment processing is handled by a third-party payment provider.
                  </p>
                </CardContent>
              </Card>
            </section>

            {/* Section 17 */}
            <section id="section-17" className="space-y-3 scroll-mt-24">
              <h2 className="text-lg md:text-xl font-bold text-black">
                17. WHEN WE SHARE PERSONAL INFORMATION
              </h2>

              <Card className="shadow-none border-gray-100">
                <CardContent className="p-5 space-y-5 text-sm text-[#555555] leading-relaxed">
                  <p>
                    We do not sell your personal information simply because you use the Platform.
                  </p>

                  <p>We may share personal information where necessary with:</p>

                  <div>
                    <h3 className="font-semibold text-black mb-2">Service providers</h3>

                    <p className="mb-2">
                      We may use third-party companies to provide services such as:
                    </p>

                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {[
                        "Hosting",
                        "Cloud storage",
                        "Email",
                        "Customer support",
                        "Analytics",
                        "Cybersecurity",
                        "Identity verification",
                        "Communications",
                        "Software infrastructure",
                      ].map((item, i) => (
                        <li key={i} className={bulletClass}>
                          <span className="mt-2 w-1.5 h-1.5 shrink-0 rounded-full bg-[#007AFF]" />
                          {item}
                        </li>
                      ))}
                    </ul>

                    <p className="mt-3">These providers may process information on our behalf.</p>
                  </div>

                  <div>
                    <h3 className="font-semibold text-black mb-2">Legal authorities</h3>

                    <p className="mb-2">
                      We may disclose information where required or permitted by law. This may
                      include responding to:
                    </p>

                    <ul className="space-y-2">
                      {[
                        "Police requests",
                        "Court orders",
                        "Regulatory authorities",
                        "Government agencies",
                        "Other lawful requests",
                      ].map((item, i) => (
                        <li key={i} className={bulletClass}>
                          <span className="mt-2 w-1.5 h-1.5 shrink-0 rounded-full bg-[#007AFF]" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h3 className="font-semibold text-black mb-2">Professional advisers</h3>

                    <p className="mb-2">
                      We may disclose relevant information to professional advisers such as:
                    </p>

                    <ul className="space-y-2">
                      {[
                        "Solicitors",
                        "Accountants",
                        "Auditors",
                        "Insurance providers",
                        "Other professional advisers",
                      ].map((item, i) => (
                        <li key={i} className={bulletClass}>
                          <span className="mt-2 w-1.5 h-1.5 shrink-0 rounded-full bg-[#007AFF]" />
                          {item}
                        </li>
                      ))}
                    </ul>

                    <p className="mt-3">where reasonably necessary.</p>
                  </div>

                  <div>
                    <h3 className="font-semibold text-black mb-2">Business transfers</h3>

                    <p>
                      If Swap Shop is sold, merged, reorganised or transferred to another
                      organisation, personal information may be transferred as part of that
                      transaction, subject to applicable law.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </section>

            {/* Section 18 */}
            <section id="section-18" className="space-y-3 scroll-mt-24">
              <h2 className="text-lg md:text-xl font-bold text-black">
                18. INTERNATIONAL TRANSFERS
              </h2>

              <Card className="shadow-none border-gray-100">
                <CardContent className="p-5 space-y-4 text-sm text-[#555555]">
                  <p>Some of our service providers may operate outside the United Kingdom.</p>

                  <p>
                    Where personal information is transferred outside the UK, we will take
                    appropriate steps to ensure that the transfer is made in accordance with
                    applicable data protection law.
                  </p>

                  <p>Depending on the circumstances, this may include using:</p>

                  <ul className="space-y-2">
                    {[
                      "UK adequacy regulations",
                      "Appropriate contractual safeguards",
                      "UK International Data Transfer Agreements",
                      "UK Addendums",
                      "Other legally recognised safeguards",
                    ].map((item, i) => (
                      <li key={i} className={bulletClass}>
                        <span className="mt-2 w-1.5 h-1.5 shrink-0 rounded-full bg-[#007AFF]" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </section>

            {/* Section 19 */}
            <section id="section-19" className="space-y-3 scroll-mt-24">
              <h2 className="text-lg md:text-xl font-bold text-black">
                19. HOW LONG WE KEEP YOUR INFORMATION
              </h2>

              <Card className="shadow-none border-gray-100">
                <CardContent className="p-5 space-y-4 text-sm text-[#555555] leading-relaxed">
                  <p>
                    We will retain personal information only for as long as reasonably necessary for
                    the purposes for which it was collected, unless a longer retention period is
                    required or permitted by law.
                  </p>

                  <p>Retention periods may depend on:</p>

                  <ul className="space-y-2">
                    {[
                      "Whether your account remains active",
                      "The type of information",
                      "The purpose for which it was collected",
                      "Legal requirements",
                      "Fraud prevention requirements",
                      "Dispute resolution",
                      "Legal claims",
                      "Regulatory requirements",
                    ].map((item, i) => (
                      <li key={i} className={bulletClass}>
                        <span className="mt-2 w-1.5 h-1.5 shrink-0 rounded-full bg-[#007AFF]" />
                        {item}
                      </li>
                    ))}
                  </ul>

                  <p>
                    When information is no longer required, we may securely delete or anonymise it.
                  </p>
                </CardContent>
              </Card>
            </section>

            {/* Section 20 */}
            <section id="section-20" className="space-y-3 scroll-mt-24">
              <h2 className="text-lg md:text-xl font-bold text-black">20. ACCOUNT DELETION</h2>

              <Card className="shadow-none border-gray-100">
                <CardContent className="p-5 space-y-4 text-sm text-[#555555] leading-relaxed">
                  <p>You may request deletion of your Swap Shop account.</p>

                  <p>
                    When you request deletion, we may delete or anonymise personal information that
                    we no longer have a legitimate reason or legal obligation to retain.
                  </p>

                  <p>Some information may need to be retained where necessary for:</p>

                  <ul className="space-y-2">
                    {[
                      "Legal compliance",
                      "Fraud prevention",
                      "Security",
                      "Dispute resolution",
                      "Establishing or defending legal claims",
                      "Regulatory requirements",
                    ].map((item, i) => (
                      <li key={i} className={bulletClass}>
                        <span className="mt-2 w-1.5 h-1.5 shrink-0 rounded-full bg-[#007AFF]" />
                        {item}
                      </li>
                    ))}
                  </ul>

                  <p>
                    Deleting your account may also cause your listings, messages or other account
                    features to become unavailable.
                  </p>
                </CardContent>
              </Card>
            </section>

            {/* Section 21 */}
            <section id="section-21" className="space-y-3 scroll-mt-24">
              <h2 className="text-lg md:text-xl font-bold text-black">
                21. YOUR DATA PROTECTION RIGHTS
              </h2>

              <Card className="shadow-none border-gray-100">
                <CardContent className="p-5 space-y-5 text-sm text-[#555555] leading-relaxed">
                  <p>
                    Depending on the circumstances and applicable law, you may have rights
                    including:
                  </p>

                  <div>
                    <h3 className="font-semibold text-black">Right of access</h3>
                    <p>You may request a copy of personal information we hold about you.</p>
                  </div>

                  <div>
                    <h3 className="font-semibold text-black">Right to rectification</h3>
                    <p>You may request correction of inaccurate or incomplete information.</p>
                  </div>

                  <div>
                    <h3 className="font-semibold text-black">Right to erasure</h3>
                    <p>
                      You may request deletion of personal information in certain circumstances.
                    </p>
                  </div>

                  <div>
                    <h3 className="font-semibold text-black">Right to restriction</h3>
                    <p>You may request that we restrict processing in certain circumstances.</p>
                  </div>

                  <div>
                    <h3 className="font-semibold text-black">Right to data portability</h3>
                    <p>
                      In certain circumstances, you may request your information in a structured,
                      commonly used and machine-readable format.
                    </p>
                  </div>

                  <div>
                    <h3 className="font-semibold text-black">Right to object</h3>
                    <p>
                      You may have the right to object to certain processing, including processing
                      based on legitimate interests or direct marketing.
                    </p>
                  </div>

                  <div>
                    <h3 className="font-semibold text-black">Right to withdraw consent</h3>
                    <p>Where we rely on consent, you may withdraw that consent.</p>

                    <p className="mt-2">
                      Withdrawing consent does not affect the lawfulness of processing that took
                      place before withdrawal.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </section>

            {/* Section 22 */}
            <section id="section-22" className="space-y-3 scroll-mt-24">
              <h2 className="text-lg md:text-xl font-bold text-black">
                22. HOW TO EXERCISE YOUR RIGHTS
              </h2>

              <Card className="shadow-none border-gray-100">
                <CardContent className="p-5 space-y-4 text-sm text-[#555555] leading-relaxed">
                  <p>To exercise your data protection rights, contact:</p>

                  <p className="font-semibold text-[#007AFF]">
                    Privacy Email: [privacy@yourdomain.com]
                  </p>

                  <p>
                    Please include enough information for us to identify your account and understand
                    your request.
                  </p>

                  <p>We may need to verify your identity before completing certain requests.</p>

                  <p>
                    We will normally respond within the time period required by applicable data
                    protection law.
                  </p>
                </CardContent>
              </Card>
            </section>

            {/* Section 23 */}
            <section id="section-23" className="space-y-3 scroll-mt-24">
              <h2 className="text-lg md:text-xl font-bold text-black">
                23. MARKETING COMMUNICATIONS
              </h2>

              <Card className="shadow-none border-gray-100">
                <CardContent className="p-5 space-y-4 text-sm text-[#555555]">
                  <p>
                    Where permitted by law, we may send you information about Swap Shop, including:
                  </p>

                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {[
                      "New features",
                      "Platform updates",
                      "Relevant services",
                      "Promotions",
                      "News",
                    ].map((item, i) => (
                      <li key={i} className={bulletClass}>
                        <span className="mt-2 w-1.5 h-1.5 shrink-0 rounded-full bg-[#007AFF]" />
                        {item}
                      </li>
                    ))}
                  </ul>

                  <p>
                    Where consent is required, we will obtain it before sending marketing
                    communications.
                  </p>

                  <p>
                    You can unsubscribe from marketing communications by following the unsubscribe
                    instructions provided in the communication or by contacting us.
                  </p>

                  <p>
                    Service-related communications, such as security alerts, account notifications
                    and important changes to the Platform, may still be sent where necessary.
                  </p>
                </CardContent>
              </Card>
            </section>

            {/* Section 24 */}
            <section id="section-24" className="space-y-3 scroll-mt-24">
              <h2 className="text-lg md:text-xl font-bold text-black">24. CHILDREN</h2>

              <Card className="shadow-none border-gray-100">
                <CardContent className="p-5 space-y-4 text-sm text-[#555555] leading-relaxed">
                  <p>
                    Swap Shop is not intended for children below the minimum age required to use the
                    Platform under applicable law.
                  </p>

                  <p>
                    We do not knowingly collect personal information from children where such
                    collection is prohibited by law.
                  </p>

                  <p>
                    If you believe a child has provided personal information to us improperly,
                    please contact us.
                  </p>

                  <p>
                    If we discover that we have collected personal information from a child where we
                    should not have done so, we may take appropriate steps to delete it.
                  </p>
                </CardContent>
              </Card>
            </section>

            {/* Section 25 */}
            <section id="section-25" className="space-y-3 scroll-mt-24">
              <h2 className="text-lg md:text-xl font-bold text-black">
                25. USER-GENERATED CONTENT
              </h2>

              <Card className="shadow-none border-gray-100">
                <CardContent className="p-5 space-y-4 text-sm text-[#555555]">
                  <p>Users may upload content such as:</p>

                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {[
                      "Photographs",
                      "Videos",
                      "Item descriptions",
                      "Reviews",
                      "Messages",
                      "Comments",
                      "Profile information",
                    ].map((item, i) => (
                      <li key={i} className={bulletClass}>
                        <span className="mt-2 w-1.5 h-1.5 shrink-0 rounded-full bg-[#007AFF]" />
                        {item}
                      </li>
                    ))}
                  </ul>

                  <p>
                    You should ensure that you have the right to upload any content you provide.
                  </p>

                  <p>
                    Do not upload content containing another person’s personal information unless
                    you have a lawful basis to do so.
                  </p>

                  <p>
                    We may remove content that violates our Terms and Conditions, applicable law or
                    the safety of the Platform.
                  </p>
                </CardContent>
              </Card>
            </section>

            {/* Section 26 */}
            <section id="section-26" className="space-y-3 scroll-mt-24">
              <h2 className="text-lg md:text-xl font-bold text-black">26. REVIEWS AND REPORTS</h2>

              <Card className="shadow-none border-gray-100">
                <CardContent className="p-5 space-y-4 text-sm text-[#555555]">
                  <p>
                    If Swap Shop allows users to leave reviews or report other users, those reviews
                    and reports may be associated with your account.
                  </p>

                  <p>We may retain this information for purposes including:</p>

                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {[
                      "Maintaining platform integrity",
                      "Investigating complaints",
                      "Preventing abuse",
                      "Protecting users",
                      "Resolving disputes",
                      "Improving the Platform",
                    ].map((item, i) => (
                      <li key={i} className={bulletClass}>
                        <span className="mt-2 w-1.5 h-1.5 shrink-0 rounded-full bg-[#007AFF]" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </section>

            {/* Section 27 */}
            <section id="section-27" className="space-y-3 scroll-mt-24">
              <h2 className="text-lg md:text-xl font-bold text-black">27. SECURITY</h2>

              <Card className="shadow-none border-gray-100">
                <CardContent className="p-5 space-y-4 text-sm text-[#555555] leading-relaxed">
                  <p>
                    We take reasonable technical and organisational measures designed to protect
                    personal information against:
                  </p>

                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {[
                      "Unauthorised access",
                      "Loss",
                      "Misuse",
                      "Alteration",
                      "Destruction",
                      "Unauthorised disclosure",
                    ].map((item, i) => (
                      <li key={i} className={bulletClass}>
                        <span className="mt-2 w-1.5 h-1.5 shrink-0 rounded-full bg-[#007AFF]" />
                        {item}
                      </li>
                    ))}
                  </ul>

                  <p>Security measures may include:</p>

                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {[
                      "Encryption",
                      "Access controls",
                      "Authentication systems",
                      "Monitoring",
                      "Security testing",
                      "Secure hosting",
                      "Staff access restrictions",
                    ].map((item, i) => (
                      <li key={i} className={bulletClass}>
                        <span className="mt-2 w-1.5 h-1.5 shrink-0 rounded-full bg-[#007AFF]" />
                        {item}
                      </li>
                    ))}
                  </ul>

                  <p>
                    However, no internet service can guarantee absolute security. You are
                    responsible for protecting your password and account credentials. You should not
                    share your password with anyone.
                  </p>

                  <p>
                    If you believe that your account has been compromised, contact us immediately.
                  </p>
                </CardContent>
              </Card>
            </section>

            {/* Section 28 */}
            <section id="section-28" className="space-y-3 scroll-mt-24">
              <h2 className="text-lg md:text-xl font-bold text-black">28. DATA BREACHES</h2>

              <Card className="shadow-none border-gray-100">
                <CardContent className="p-5 space-y-4 text-sm text-[#555555] leading-relaxed">
                  <p>
                    If we become aware of a personal data breach, we will assess the breach and take
                    appropriate action in accordance with applicable data protection law.
                  </p>

                  <p>Where legally required, we may notify:</p>

                  <ul className="space-y-2">
                    {[
                      "The Information Commissioner’s Office (ICO)",
                      "Affected users",
                      "Other relevant authorities",
                    ].map((item, i) => (
                      <li key={i} className={bulletClass}>
                        <span className="mt-2 w-1.5 h-1.5 shrink-0 rounded-full bg-[#FF3B30]" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </section>

            {/* Section 29 */}
            <section id="section-29" className="space-y-3 scroll-mt-24">
              <h2 className="text-lg md:text-xl font-bold text-black">29. THIRD-PARTY WEBSITES</h2>

              <Card className="shadow-none border-gray-100">
                <CardContent className="p-5 space-y-4 text-sm text-[#555555] leading-relaxed">
                  <p>The Platform may contain links to third-party websites or services.</p>

                  <p>We are not responsible for the privacy practices of third-party websites.</p>

                  <p>
                    You should review the privacy policy of any third-party website before providing
                    personal information.
                  </p>
                </CardContent>
              </Card>
            </section>

            {/* Section 30 */}
            <section id="section-30" className="space-y-3 scroll-mt-24">
              <h2 className="text-lg md:text-xl font-bold text-black">30. SOCIAL MEDIA</h2>

              <Card className="shadow-none border-gray-100">
                <CardContent className="p-5 space-y-4 text-sm text-[#555555] leading-relaxed">
                  <p>
                    If you interact with Swap Shop through social media platforms, those platforms
                    may collect and process information about you according to their own privacy
                    policies.
                  </p>

                  <p>
                    We do not control the privacy practices of independent social media providers.
                  </p>
                </CardContent>
              </Card>
            </section>

            {/* Section 31 */}
            <section id="section-31" className="space-y-3 scroll-mt-24">
              <h2 className="text-lg md:text-xl font-bold text-black">31. ANALYTICS</h2>

              <Card className="shadow-none border-gray-100">
                <CardContent className="p-5 space-y-4 text-sm text-[#555555]">
                  <p>
                    We may use analytics services to understand how users interact with the
                    Platform.
                  </p>

                  <p>Analytics information may include:</p>

                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {[
                      "Pages visited",
                      "Features used",
                      "Device information",
                      "Approximate location",
                      "Time spent on pages",
                      "Navigation patterns",
                    ].map((item, i) => (
                      <li key={i} className={bulletClass}>
                        <span className="mt-2 w-1.5 h-1.5 shrink-0 rounded-full bg-[#007AFF]" />
                        {item}
                      </li>
                    ))}
                  </ul>

                  <p>
                    Where applicable, analytics providers will process information according to
                    their own terms and privacy policies.
                  </p>
                </CardContent>
              </Card>
            </section>

            {/* Section 32 */}
            <section id="section-32" className="space-y-3 scroll-mt-24">
              <h2 className="text-lg md:text-xl font-bold text-black">
                32. AUTOMATED DECISION-MAKING
              </h2>

              <Card className="shadow-none border-gray-100">
                <CardContent className="p-5 space-y-4 text-sm text-[#555555] leading-relaxed">
                  <p>We may use automated tools to assist with:</p>

                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {[
                      "Spam detection",
                      "Fraud detection",
                      "Security monitoring",
                      "Content moderation",
                      "Search results",
                      "Recommendations",
                    ].map((item, i) => (
                      <li key={i} className={bulletClass}>
                        <span className="mt-2 w-1.5 h-1.5 shrink-0 rounded-full bg-[#007AFF]" />
                        {item}
                      </li>
                    ))}
                  </ul>

                  <p>
                    Where applicable law gives you rights relating to solely automated decisions
                    that produce legal or similarly significant effects, we will provide the
                    safeguards required by law.
                  </p>
                </CardContent>
              </Card>
            </section>

            {/* Section 33 */}
            <section id="section-33" className="space-y-3 scroll-mt-24">
              <h2 className="text-lg md:text-xl font-bold text-black">
                33. CHANGES TO THIS PRIVACY POLICY
              </h2>

              <Card className="shadow-none border-gray-100">
                <CardContent className="p-5 space-y-4 text-sm text-[#555555] leading-relaxed">
                  <p>We may update this Privacy Policy from time to time.</p>

                  <p>Changes may be made because of:</p>

                  <ul className="space-y-2">
                    {[
                      "Changes to the Platform",
                      "Changes in technology",
                      "Changes in legal requirements",
                      "Changes in our business",
                      "Changes in how we process personal information",
                    ].map((item, i) => (
                      <li key={i} className={bulletClass}>
                        <span className="mt-2 w-1.5 h-1.5 shrink-0 rounded-full bg-[#007AFF]" />
                        {item}
                      </li>
                    ))}
                  </ul>

                  <p>
                    When we make significant changes, we may provide additional notice where
                    required.
                  </p>

                  <p>
                    The “Last Updated” date at the beginning of this Privacy Policy indicates when
                    it was most recently updated.
                  </p>
                </CardContent>
              </Card>
            </section>

            {/* Section 34 */}
            <section id="section-34" className="space-y-3 scroll-mt-24">
              <h2 className="text-lg md:text-xl font-bold text-black">34. CONTACT US</h2>

              <Card className="bg-[#F0FFF6] border border-[#E2FFE3] shadow-none">
                <CardContent className="p-5 space-y-3 text-sm text-[#555555]">
                  <p>
                    If you have questions about this Privacy Policy or how we handle personal
                    information, contact us at:
                  </p>

                  <div className="space-y-1">
                    <p>Swap Shop</p>
                    <p>[Legal Business Name]</p>
                    <p>[Business Address]</p>
                    <p>[City]</p>
                    <p>[Postcode]</p>
                    <p>United Kingdom</p>
                    <p className="text-[#007AFF]">Email: [privacy@yourdomain.com]</p>
                  </div>
                </CardContent>
              </Card>
            </section>

            {/* Section 35 */}
            <section id="section-35" className="space-y-3 scroll-mt-24">
              <h2 className="text-lg md:text-xl font-bold text-black">35. COMPLAINTS</h2>

              <Card className="shadow-none border-gray-100">
                <CardContent className="p-5 space-y-4 text-sm text-[#555555] leading-relaxed">
                  <p>
                    If you believe that we have not handled your personal information appropriately,
                    please contact us first so that we can investigate your concern.
                  </p>

                  <p>You also have the right to complain to the UK’s data protection regulator:</p>

                  <p className="font-semibold text-black">
                    Information Commissioner’s Office (ICO)
                  </p>

                  <p>
                    Website:{" "}
                    <a
                      href="https://ico.org.uk/"
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1 underline text-[#007AFF]"
                    >
                      https://ico.org.uk/
                      <ExternalLink size={12} />
                    </a>
                  </p>

                  <p>The ICO regulates data protection and privacy in the United Kingdom.</p>
                </CardContent>
              </Card>
            </section>

            {/* Section 36 */}
            <section id="section-36" className="space-y-3 scroll-mt-24">
              <h2 className="text-lg md:text-xl font-bold text-black">
                36. IMPORTANT NOTICE ABOUT THIS PRIVACY POLICY
              </h2>

              <Card className="shadow-none border-gray-100">
                <CardContent className="p-5 space-y-5 text-sm text-[#555555] leading-relaxed">
                  <p>This Privacy Policy explains how Swap Shop handles personal information.</p>

                  <p>
                    It does not replace the Swap Shop Terms and Conditions, which should contain
                    separate provisions dealing with matters such as:
                  </p>

                  <ul className="list-disc pl-5 space-y-1">
                    {[
                      "User responsibilities",
                      "Item ownership",
                      "Prohibited items",
                      "Exchanges",
                      "Scams and fraudulent activity",
                      "Disputes between users",
                      "Platform liability",
                      "Limitation of liability",
                      "Indemnification",
                      "User safety",
                      "Account suspension",
                      "Account termination",
                      "Intellectual property",
                      "Acceptable use",
                      "Governing law",
                      "Jurisdiction",
                    ].map((item, i) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>

                  <p>
                    The fact that Swap Shop facilitates communication between users does not
                    necessarily mean that Swap Shop is a party to the private exchange agreement
                    between users.
                  </p>

                  <p>
                    Any limitation or exclusion of liability must remain subject to applicable law.
                    In particular, nothing in the Platform’s legal documents should attempt to
                    exclude liability where such exclusion is prohibited by law.
                  </p>
                </CardContent>
              </Card>
            </section>
          </main>
        </div>
      </section>
    </>
  );
}
