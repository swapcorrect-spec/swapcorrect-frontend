"use client";

import React, { useState } from "react";
import {
  Search,
  ChevronDown,
  ShieldAlert,
  Package,
  UserCheck,
  Lock,
  HelpCircle,
  FileText,
  RefreshCw,
  MessageSquare,
} from "lucide-react";
import useIsMobile from "@/app/_hooks/useIsMobile";
import Herosection from "@/components/shared/herosection";

export default function FaqPage() {
  const isMobile = useIsMobile();
  const [searchQuery, setSearchQuery] = useState("");
  const [openItems, setOpenItems] = useState<Record<string, boolean>>({});

  const toggleItem = (id: string) => {
    setOpenItems((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const categories = [
    {
      title: "About Swap Correct",
      icon: HelpCircle,
      faqs: [
        {
          id: "1",
          q: "1. What is Swap Correct?",
          a: "Swap Correct is a platform that allows people to exchange items they already own with other users. Instead of buying an item with money, users can offer something they have and agree on an exchange with another member.",
        },
        {
          id: "2",
          q: "2. How does Swap Correct work?",
          a: (
            <div className="space-y-2">
              <p>It is simple:</p>
              <ol className="list-decimal pl-5 space-y-1">
                <li>Create an account.</li>
                <li>List an item you want to swap.</li>
                <li>Browse items listed by other users.</li>
                <li>Find something you would like.</li>
                <li>Contact the other user or make a swap offer.</li>
                <li>Agree on the exchange.</li>
                <li>Arrange collection, delivery or a suitable meeting.</li>
                <li>Complete the swap.</li>
              </ol>
            </div>
          ),
        },
        {
          id: "3",
          q: "3. Do I need money to use Swap Correct?",
          a: "The standard Swap Correct model is based on item-for-item exchanges, so users do not need to buy the listed item with money. However, users may independently incur costs such as postage, transportation or delivery if they choose to arrange these services.",
        },
        {
          id: "4",
          q: "4. Can I swap anything?",
          a: "No. Items must comply with Swap Correct’s Terms & Conditions and applicable laws. Illegal, stolen, counterfeit, dangerous or otherwise prohibited items cannot be listed or exchanged.",
        },
        {
          id: "5",
          q: "5. Who owns the items on Swap Correct?",
          a: "Items listed on Swap Correct should belong to the person listing them, or that person must have the legal authority to offer them for exchange. You should not list something that you do not have the right to exchange.",
        },
      ],
    },
    {
      title: "Creating an Account",
      icon: UserCheck,
      faqs: [
        {
          id: "6",
          q: "6. Do I need an account to use Swap Correct?",
          a: "You may be able to browse some publicly available listings without an account, but an account is required to use features such as listing items, communicating with other users and arranging swaps.",
        },
        {
          id: "7",
          q: "7. How do I create an account?",
          a: "Follow the registration process on Swap Correct and provide the information requested. You are responsible for keeping your account information accurate and your login details secure.",
        },
        {
          id: "8",
          q: "8. Can I have more than one account?",
          a: "Unless Swap Correct expressly permits otherwise, users should maintain one genuine personal account and should not create multiple accounts to deceive other users, avoid restrictions or manipulate the platform.",
        },
        {
          id: "9",
          q: "9. What happens if I forget my password?",
          a: "Use the password-reset process provided by Swap Correct. Never give your password or security codes to another user.",
        },
      ],
    },
    {
      title: "Listing Items",
      icon: Package,
      faqs: [
        {
          id: "10",
          q: "10. How do I list an item?",
          a: "Create a listing and provide accurate information about the item, including photographs, condition, description and any important details another user should know before agreeing to a swap.",
        },
        {
          id: "11",
          q: "11. What should I include in my listing?",
          a: (
            <div className="space-y-2">
              <p>A good listing should clearly explain:</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>What the item is</li>
                <li>Its condition</li>
                <li>Any damage or defects</li>
                <li>What is included</li>
                <li>Relevant specifications</li>
                <li>Clear photographs</li>
                <li>What type of item you would consider swapping for it</li>
              </ul>
              <p>
                The more accurate your listing is, the easier it is for another user to make an
                informed decision.
              </p>
            </div>
          ),
        },
        {
          id: "12",
          q: "12. Can I list damaged items?",
          a: "You may be able to list an item that has damage or defects if the item is otherwise permitted and you clearly disclose its condition. Do not hide important defects or deliberately misrepresent an item’s condition.",
        },
        {
          id: "13",
          q: "13. Can I remove my listing?",
          a: "Yes. If you no longer want to swap an item, you should remove or deactivate the listing where the platform provides that option.",
        },
        {
          id: "14",
          q: "14. Can I change my listing after publishing it?",
          a: "Where editing is available, you can update your listing to keep the information accurate. If the condition, availability or other important information changes, update the listing promptly.",
        },
      ],
    },
    {
      title: "Making a Swap",
      icon: RefreshCw,
      faqs: [
        {
          id: "15",
          q: "15. How do I find something I want to swap for?",
          a: "Browse or search listings using categories, keywords, location or other available filters. When you find an item you are interested in, review the listing carefully before contacting the owner.",
        },
        {
          id: "16",
          q: "16. Can I offer more than one item for another item?",
          a: "This may be possible if both users agree to the arrangement. For example, one user may offer two smaller items in exchange for one larger item. The important thing is that both parties clearly understand and agree to what is being exchanged.",
        },
        {
          id: "17",
          q: "17. Does Swap Correct decide whether two items have equal value?",
          a: "No. Swap Correct does not normally determine whether an exchange is equal or fair in value. Users decide for themselves whether the proposed exchange is acceptable.",
        },
        {
          id: "18",
          q: "18. Can I cancel a swap?",
          a: "Before an exchange is completed, either user may decide not to proceed. However, if you have already made a specific agreement with another user, communicate clearly and promptly if you need to cancel.",
        },
        {
          id: "19",
          q: "19. What if the other person changes their mind?",
          a: "A user may decide not to proceed with an exchange. If this happens, try to resolve the situation calmly and do not send additional items or money because of pressure from another user. If you believe the behaviour violates Swap Correct’s rules, you can report it.",
        },
      ],
    },
    {
      title: "Safety",
      icon: ShieldAlert,
      faqs: [
        {
          id: "20",
          q: "20. Is Swap Correct responsible for the safety of every swap?",
          a: "Swap Correct provides tools, rules and information intended to support safer exchanges, but users ultimately make their own decisions about whether, where and how to complete an exchange. You should always follow the Swap Safety Centre guidance.",
        },
        {
          id: "21",
          q: "21. Where should I meet another user?",
          a: "When meeting someone in person, choose a safe, public and reasonably busy location where possible. Avoid isolated locations and consider telling someone you trust where you are going.",
        },
        {
          id: "22",
          q: "22. Should I give another user my home address?",
          a: "Only provide personal information that is reasonably necessary for the exchange. If an item can be exchanged safely in a public location, consider doing so rather than unnecessarily sharing your home address.",
        },
        {
          id: "23",
          q: "23. What should I do if something feels suspicious?",
          a: "Stop and reconsider the exchange. You can ask additional questions, cancel the arrangement and report the listing or user to Swap Correct. You are never required to complete a swap that makes you uncomfortable.",
        },
        {
          id: "24",
          q: "24. How do I report a suspicious listing or user?",
          a: "Use the reporting option provided on the relevant listing, profile or communication area, where available. Give enough information to help Swap Correct understand what you are reporting.",
        },
        {
          id: "25",
          q: "25. What should I do if I think someone is trying to scam me?",
          a: "Do not send additional items, money or sensitive information. Keep relevant messages and evidence, stop the interaction if necessary, and report the user or listing. If you believe a criminal offence has occurred, you should also consider contacting the appropriate authorities.",
        },
      ],
    },
    {
      title: "Collection and Delivery",
      icon: Package,
      faqs: [
        {
          id: "26",
          q: "26. Who arranges delivery?",
          a: "Unless Swap Correct expressly provides a delivery service, users are responsible for arranging delivery or collection between themselves. Before agreeing to a swap, make sure both parties understand who is responsible for transportation and any associated costs.",
        },
        {
          id: "27",
          q: "27. What happens if an item is damaged or lost during delivery?",
          a: "Users should agree beforehand how delivery will be handled and consider appropriate delivery methods. Unless Swap Correct expressly provides or guarantees the delivery service, Swap Correct is not ordinarily responsible for independently arranged transportation, loss or damage.",
        },
        {
          id: "28",
          q: "28. Can I collect an item in person?",
          a: "Yes, if both users agree. Choose a safe meeting arrangement and inspect the item where practical before completing the exchange.",
        },
      ],
    },
    {
      title: "Problems With a Swap",
      icon: ShieldAlert,
      faqs: [
        {
          id: "29",
          q: "29. What if the item I receive is different from the description?",
          a: "If the item significantly differs from what was described, communicate with the other user and try to resolve the matter. You should also consider reporting the listing if you believe the description was deliberately misleading or violates Swap Correct’s rules.",
        },
        {
          id: "30",
          q: "30. What if someone sends me a fake or counterfeit item?",
          a: "Do not knowingly participate in the exchange of counterfeit goods. If you believe you have received a counterfeit item, preserve relevant evidence and report the listing or user to Swap Correct.",
        },
        {
          id: "31",
          q: "31. What if I receive a stolen item?",
          a: "If you have reason to believe an item may be stolen, do not attempt to resell or redistribute it. Keep relevant information and consider reporting the matter to the appropriate authorities as well as to Swap Correct.",
        },
        {
          id: "32",
          q: "32. Can Swap Correct guarantee that every user is genuine?",
          a: "No platform can guarantee that every user or every piece of information supplied by users is genuine. Swap Correct may use account controls, moderation and reporting processes, but users should still carry out their own checks and use the safety tools provided.",
        },
      ],
    },
    {
      title: "Reviews and Reporting",
      icon: MessageSquare,
      faqs: [
        {
          id: "33",
          q: "33. Can I leave a review after a swap?",
          a: "If Swap Correct provides a review or rating feature, you may be able to leave feedback about your experience. Reviews should be honest, relevant and based on your actual experience.",
        },
        {
          id: "34",
          q: "34. Can I report someone because I disagree with their review?",
          a: "You can report reviews that you believe violate Swap Correct’s rules, such as reviews containing harassment, threats, unlawful content or deliberately misleading information. Disagreement alone does not necessarily mean that a review violates the rules.",
        },
      ],
    },
    {
      title: "Privacy and Security",
      icon: Lock,
      faqs: [
        {
          id: "35",
          q: "35. What information can other users see?",
          a: "The information visible to other users depends on the platform’s design, your profile settings and the information you choose to include in your listings. Avoid putting unnecessary personal or sensitive information in public listings.",
        },
        {
          id: "36",
          q: "36. Does Swap Correct protect my personal information?",
          a: "Swap Correct should handle personal information in accordance with its Privacy Policy and applicable data-protection requirements. Users should also take responsibility for what information they voluntarily share with other members.",
        },
        {
          id: "37",
          q: "37. Will Swap Correct ask for my password?",
          a: "No legitimate user-to-user swap requires you to disclose your Swap Correct password. Never share your password, verification codes or other account-security credentials with another person.",
        },
      ],
    },
    {
      title: "Accounts and Rules",
      icon: FileText,
      faqs: [
        {
          id: "38",
          q: "38. Can Swap Correct remove a listing?",
          a: "Yes. Swap Correct may remove, restrict or otherwise moderate listings that violate its Terms & Conditions, applicable law or platform rules.",
        },
        {
          id: "39",
          q: "39. Can my account be suspended?",
          a: "Yes. An account may be restricted, suspended or terminated where there are appropriate grounds under the platform’s Terms & Conditions. This can include serious or repeated rule violations, fraud, prohibited listings or behaviour that creates significant risk to other users or the platform.",
        },
        {
          id: "40",
          q: "40. What happens if I break Swap Correct’s rules?",
          a: "Depending on the circumstances, Swap Correct may take appropriate action, which could include removing content, restricting features, suspending an account or terminating access to the platform. Serious matters may also be referred to the appropriate authorities where required or appropriate.",
        },
      ],
    },
    {
      title: "General Questions",
      icon: HelpCircle,
      faqs: [
        {
          id: "41",
          q: "41. Can I use Swap Correct to give something away instead of swapping?",
          a: "If Swap Correct provides a gifting or free-item feature, you may use it according to the rules of that feature. Otherwise, standard listings should follow the exchange model described by the platform.",
        },
        {
          id: "42",
          q: "42. Can businesses use Swap Correct?",
          a: "This depends on the account and platform rules applicable to businesses. If business accounts are permitted, businesses must comply with Swap Correct’s rules and all applicable legal requirements.",
        },
        {
          id: "43",
          q: "43. What happens if Swap Correct is temporarily unavailable?",
          a: "Online services can occasionally experience technical problems, maintenance or interruptions. If the platform is unavailable, try again later or contact Swap Correct through the available support channels.",
        },
        {
          id: "44",
          q: "44. How can I contact Swap Correct?",
          a: "Use the Contact Us or Support section of the platform to contact Swap Correct about account, safety, technical or other platform-related issues.",
        },
        {
          id: "45",
          q: "45. Where can I find the full rules?",
          a: "The full rules governing use of Swap Correct are contained in the platform’s Terms & Conditions. You should read them before using the platform.",
        },
      ],
    },
  ];

  const filteredCategories = categories
    .map((category) => {
      const filteredFaqs = category.faqs.filter(
        (faq) =>
          faq.q.toLowerCase().includes(searchQuery.toLowerCase()) ||
          (typeof faq.a === "string" && faq.a.toLowerCase().includes(searchQuery.toLowerCase()))
      );
      return { ...category, faqs: filteredFaqs };
    })
    .filter((category) => category.faqs.length > 0);

  return (
    <>
      {!isMobile && <Herosection />}
      <div className="min-h-screen bg-gray-50 text-gray-800 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Header */}
          <div className="text-center space-y-4">
            <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">
              Frequently Asked Questions
            </h1>
            <p className="text-gray-600 text-sm sm:text-base">
              Find answers to common questions about Swap Correct.
            </p>

            {/* Search Bar */}
            <div className="relative max-w-xl mx-auto pt-2">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search questions or keywords..."
                className="w-full pl-10 pr-4 py-3 bg-white border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-[#007aff] text-sm transition-all"
              />
              <Search className="absolute left-3.5 top-5 h-4 w-4 text-gray-400" />
            </div>
          </div>

          {/* Categories / FAQs List */}
          <div className="space-y-8">
            {filteredCategories.length === 0 ? (
              <div className="text-center py-12 bg-white rounded-2xl shadow-sm border border-gray-100">
                <p className="text-gray-500">No questions found matching "{searchQuery}".</p>
              </div>
            ) : (
              filteredCategories.map((category, idx) => {
                const CategoryIcon = category.icon;
                return (
                  <div
                    key={idx}
                    className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden"
                  >
                    <div className="bg-gray-50/80 px-6 py-4 border-b border-gray-100 flex items-center gap-3">
                      <CategoryIcon className="w-5 h-5 text-[#007aff]" />
                      <h2 className="text-lg font-bold text-gray-900">{category.title}</h2>
                    </div>

                    <div className="divide-y divide-gray-100">
                      {category.faqs.map((faq) => {
                        const isOpen = !!openItems[faq.id];
                        return (
                          <div key={faq.id} className="transition-colors">
                            <button
                              onClick={() => toggleItem(faq.id)}
                              className="w-full text-left px-6 py-4 flex items-start justify-between gap-4 hover:bg-gray-50/50 transition-colors focus:outline-none"
                            >
                              <span className="font-semibold text-gray-800 text-sm sm:text-base leading-snug">
                                {faq.q}
                              </span>
                              <ChevronDown
                                className={`w-5 h-5 text-gray-400 shrink-0 transition-transform duration-200 mt-0.5 ${
                                  isOpen ? "rotate-180 text-[#007aff]" : ""
                                }`}
                              />
                            </button>
                            {isOpen && (
                              <div className="px-6 pb-5 pt-1 text-sm text-gray-600 leading-relaxed bg-emerald-50/20 border-t border-gray-50">
                                {faq.a}
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* One Last Question Box */}
          {/* <div className="bg-gradient-to-br from-emerald-600 to-teal-700 text-white rounded-2xl p-6 sm:p-8 shadow-lg space-y-6">
          <div className="space-y-2">
            <h2 className="text-xs uppercase tracking-wider font-semibold text-emerald-200">
              One Last Question
            </h2>
            <h3 className="text-xl sm:text-2xl font-bold">
              What is the most important thing to remember when using Swap Correct?
            </h3>
          </div>

          <div className="space-y-2 text-emerald-50 text-sm sm:text-base leading-relaxed">
            <p className="font-medium text-white">Take your time and use your judgement.</p>
            <ul className="space-y-1 list-inside list-disc">
              <li>Check the item.</li>
              <li>Ask questions.</li>
              <li>Protect your personal information.</li>
              <li>Choose safe meeting arrangements.</li>
              <li>Be cautious of suspicious behaviour.</li>
            </ul>
            <p className="font-semibold text-white pt-2">
              And if something doesn’t feel right, don’t complete the swap.
            </p>
          </div>

          <div className="border-t border-emerald-500/50 pt-6 space-y-4">
            <div>
              <p className="text-lg font-bold text-white">Swap Correct</p>
              <p className="text-xs sm:text-sm text-emerald-100">
                Swap what you have. Find what you need. Swap safely.
              </p>
            </div>

            <div className="flex flex-wrap gap-2 pt-2">
              <a
                href="#browse"
                className="px-4 py-2 bg-white text-emerald-700 font-semibold text-xs sm:text-sm rounded-lg shadow hover:bg-emerald-50 transition-colors"
              >
                Browse Swaps
              </a>
              <a
                href="#list"
                className="px-4 py-2 bg-emerald-500 text-white font-semibold text-xs sm:text-sm rounded-lg hover:bg-emerald-400 transition-colors border border-emerald-400"
              >
                List an Item
              </a>
              <a
                href="#safety"
                className="px-4 py-2 bg-emerald-800/60 text-white font-semibold text-xs sm:text-sm rounded-lg hover:bg-emerald-800/80 transition-colors"
              >
                Swap Safety Centre
              </a>
              <a
                href="#contact"
                className="px-4 py-2 bg-emerald-800/60 text-white font-semibold text-xs sm:text-sm rounded-lg hover:bg-emerald-800/80 transition-colors"
              >
                Contact Us
              </a>
            </div>
          </div>
        </div> */}
        </div>
      </div>
    </>
  );
}
