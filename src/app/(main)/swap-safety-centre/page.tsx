"use client";

import React, { useEffect, useState } from "react";
import {
  ArrowRight,
  CheckCircle2,
  CircleAlert,
  Flag,
  LockKeyhole,
  MapPin,
  ShieldCheck,
  Siren,
  UserRoundCheck,
} from "lucide-react";
import useIsMobile from "@/app/_hooks/useIsMobile";
import Herosection from "@/components/shared/herosection";

const sections = [
  { id: "before-you-agree", title: "Before You Agree to a Swap" },
  {
    id: "check-the-item-carefully",
    title: "Check the Item Carefully",
  },
  {
    id: "make-sure-the-item-can-be-legally-swapped",
    title: "Make Sure the Item Can Be Legally Swapped",
  },
  {
    id: "protect-your-personal-information",
    title: "Protect Your Personal Information",
  },
  {
    id: "watch-out-for-scams",
    title: "Watch Out for Scams",
  },
  {
    id: "be-careful-with-money",
    title: "Be Careful With Money",
  },
  {
    id: "meeting-another-user",
    title: "Meeting Another User",
  },
  {
    id: "be-careful-when-visiting-someones-home",
    title: "Be Careful When Visiting Someone’s Home",
  },
  {
    id: "delivery-and-collection",
    title: "Delivery and Collection",
  },
  {
    id: "check-before-you-hand-over-your-item",
    title: "Check Before You Hand Over Your Item",
  },
  {
    id: "trust-your-instincts",
    title: "Trust Your Instincts",
  },
  {
    id: "report-suspicious-activity",
    title: "Report Suspicious Activity",
  },
  {
    id: "what-happens-after-you-report-something",
    title: "What Happens After You Report Something?",
  },
  {
    id: "if-you-believe-you-have-been-scammed",
    title: "If You Believe You Have Been Scammed",
  },
  {
    id: "protect-other-members",
    title: "Protect Other Members",
  },
  {
    id: "remember-what-swap-correct-does",
    title: "Remember What Swap Correct Does",
  },
  {
    id: "checklist",
    title: "A Simple Before-You-Swap Checklist",
  },
  {
    id: "the-golden-rule",
    title: "The Golden Rule",
  },
];

const prohibitedItems = [
  "Illegal drugs or controlled substances",
  "Firearms, ammunition or explosives",
  "Stolen goods",
  "Counterfeit goods",
  "Fraudulent documents",
  "Financial or identity credentials",
  "Items prohibited by applicable law",
  "Dangerous substances or materials",
  "Any other item prohibited by Swap Correct’s Terms & Conditions",
];

const personalInformation = [
  "Your full home address",
  "Financial information",
  "Bank details",
  "Passwords",
  "Security codes",
  "Identity documents",
  "Personal identification numbers",
  "Private information about yourself or your family",
];

const scamWarnings = [
  "Pressures you to accept immediately",
  "Refuses to answer reasonable questions",
  "Provides inconsistent information",
  "Offers an item that appears suspiciously valuable",
  "Asks you to move the conversation away from the platform unnecessarily",
  "Sends suspicious links",
  "Asks for passwords or security codes",
  "Claims to represent Swap Correct and asks for sensitive information",
  "Tries to persuade you to ignore the platform’s safety rules",
  "Changes the agreed arrangement at the last minute without a good reason",
];

const moneyWarnings = [
  "Send money",
  "Pay a deposit",
  "Pay a “release fee”",
  "Pay a “verification fee”",
  "Buy gift cards",
  "Transfer money to another account",
  "Pay through an unusual payment method",
];

const meetingTips = [
  "Choose a public location.",
  "Use busy public places during normal hours where other people are present.",
  "Avoid unnecessarily meeting in isolated locations.",
];

const homeVisitTips = [
  "Tell someone where you are going.",
  "Share the address and expected meeting time with someone you trust.",
  "Take another person with you where appropriate.",
  "Arrange the collection during daylight hours.",
  "Avoid entering areas of a property that are unnecessary for the collection.",
  "Leave if you feel uncomfortable or unsafe.",
];

const deliveryPoints = [
  "Who is arranging delivery",
  "Who is responsible for collection",
  "Where the item is being sent",
  "When it is expected to arrive",
  "What happens if delivery fails",
  "What happens if an item is damaged or lost during transport",
];

const reportTypes = [
  "Suspicious listings",
  "Prohibited items",
  "Suspected scams",
  "Fake or misleading information",
  "Suspicious user behaviour",
  "Harassment or threats",
  "Attempts to obtain personal information",
  "Other activity that may violate Swap Correct’s rules",
];

const reportActions = [
  "Reviewing the listing",
  "Reviewing the reported account",
  "Removing content",
  "Restricting an account",
  "Suspending or terminating an account",
  "Requesting additional information",
  "Taking other appropriate platform action",
];

const checklist = [
  "Have I checked the listing?",
  "Have I asked the important questions?",
  "Do I understand the item’s condition?",
  "Am I comfortable with the person I am dealing with?",
  "Have I agreed exactly what is being exchanged?",
  "Have I avoided sharing unnecessary personal information?",
  "Have I considered how and where the exchange will take place?",
  "Have I avoided suspicious payment requests?",
  "Do I feel safe completing this exchange?",
];

function BulletList({
  items,
  icon = "dot",
}: {
  items: string[];
  icon?: "dot" | "check" | "warning";
}) {
  return (
    <ul className="mt-5 space-y-3">
      {items.map((item) => (
        <li key={item} className="flex items-start gap-3">
          {icon === "check" ? (
            <CheckCircle2 className="mt-1 h-5 w-5 shrink-0" style={{ color: "#007AFF" }} />
          ) : icon === "warning" ? (
            <CircleAlert className="mt-1 h-5 w-5 shrink-0 text-amber-500" />
          ) : (
            <span className="mt-3 h-1.5 w-1.5 shrink-0 rounded-full bg-slate-400" />
          )}

          <span className="text-[15px] leading-7 text-slate-600">{item}</span>
        </li>
      ))}
    </ul>
  );
}

function SafetySection({
  number,
  title,
  children,
  id,
}: {
  number: number;
  title: string;
  children: React.ReactNode;
  id: string;
}) {
  return (
    <section
      id={id}
      className="scroll-mt-28 border-b border-slate-200 py-10 first:pt-0 last:border-0"
    >
      <div className="mb-6 flex items-start gap-4">
        <div
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl text-sm font-bold ring-1"
          style={{
            backgroundColor: "#007AFF14",
            color: "#007AFF",
            boxShadow: "inset 0 0 0 1px #007AFF1A",
          }}
        >
          {number}
        </div>

        <h2 className="text-lg font-bold tracking-tight text-slate-950 sm:text-xl">{title}</h2>
      </div>

      <div className="pl-0 text-sm leading-7 text-slate-600 sm:pl-[52px]">{children}</div>
    </section>
  );
}

export default function SafetyCentrePage() {
  const isMobile = useIsMobile();

  const [activeSection, setActiveSection] = useState("before-you-agree");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visibleSections = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);

        if (visibleSections.length > 0) {
          setActiveSection(visibleSections[0].target.id);
        }
      },
      {
        rootMargin: "-120px 0px -65% 0px",
        threshold: 0,
      }
    );

    sections.forEach(({ id }) => {
      const element = document.getElementById(id);

      if (element) {
        observer.observe(element);
      }
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  const scrollToSection = (id: string) => {
    setActiveSection(id);

    const element = document.getElementById(id);

    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  return (
    <>
      {!isMobile && <Herosection />}
      <div className="min-h-screen bg-[#f8faf9] text-slate-900">
        <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <div className="rounded-2xl border border-amber-200 bg-amber-50 p-5 sm:p-6">
            <div className="flex items-start gap-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-amber-100 text-amber-700">
                <CircleAlert className="h-5 w-5" />
              </div>

              <div>
                <h2 className="font-semibold text-slate-950">Take your time before you swap</h2>

                <p className="mt-1 text-sm leading-6 text-slate-600">
                  Every exchange involves another person, another item and sometimes a meeting or
                  delivery arrangement. Ask questions, check the details and trust your judgement.
                  If something doesn’t feel right, don’t proceed.
                </p>
              </div>
            </div>
          </div>
        </section>

        <div className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-8 lg:flex-row">
            <aside className="hidden w-72 shrink-0 lg:block">
              <div className="sticky top-24 max-h-[80vh] overflow-y-auto rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
                <h3 className="mb-3 flex items-center gap-2 px-2 text-sm font-semibold text-black">
                  <ShieldCheck className="h-4 w-4" style={{ color: "#007AFF" }} />
                  Safety Guide
                </h3>

                <nav className="space-y-1">
                  {sections.map((section, index) => {
                    const isActive = activeSection === section.id;

                    return (
                      <button
                        key={section.id}
                        type="button"
                        onClick={() => scrollToSection(section.id)}
                        className={`group flex w-full items-start justify-between rounded-xl px-3 py-2 text-left text-xs transition-all ${
                          isActive
                            ? "font-medium text-white shadow-sm"
                            : "text-slate-500 hover:bg-[#007AFF0D]"
                        }`}
                        style={isActive ? { backgroundColor: "#007AFF" } : undefined}
                      >
                        <span className="flex min-w-0 items-start gap-2">
                          <span
                            className={`shrink-0 ${isActive ? "text-blue-100" : "text-slate-400"}`}
                          >
                            {index + 1}.
                          </span>

                          <span>{section.title}</span>
                        </span>

                        {isActive && <ArrowRight className="ml-2 mt-0.5 h-3.5 w-3.5 shrink-0" />}
                      </button>
                    );
                  })}
                </nav>
              </div>
            </aside>

            <main className="min-w-0 flex-1">
              <article className="rounded-2xl border border-slate-200 bg-white px-5 py-8 shadow-sm sm:px-8 lg:px-10 lg:py-10">
                <SafetySection id="before-you-agree" number={1} title="Before You Agree to a Swap">
                  <p>
                    Take a moment to understand exactly what you are exchanging. Before accepting an
                    offer, consider:
                  </p>

                  <BulletList
                    items={[
                      "Is the item clearly described?",
                      "Have you seen enough photographs?",
                      "Is the condition of the item clear?",
                      "Have you asked about damage, defects or missing parts?",
                      "Does the other user’s description make sense?",
                      "Are you comfortable with the proposed exchange arrangements?",
                      "Have you agreed what each person is actually receiving?",
                    ]}
                  />

                  <p className="mt-5">
                    If you are unsure about anything, ask questions before agreeing. There is no
                    need to rush into a swap.
                  </p>
                </SafetySection>

                <SafetySection
                  id="check-the-item-carefully"
                  number={2}
                  title="Check the Item Carefully"
                >
                  <p>
                    An item’s photographs and description may not tell you everything. Where
                    possible, ask the other user about:
                  </p>

                  <BulletList
                    items={[
                      "Age and condition",
                      "Damage or repairs",
                      "Missing parts or accessories",
                      "How frequently the item has been used",
                      "Whether the item works properly",
                      "Any known faults",
                      "Original packaging or documentation",
                      "Anything else that could affect your decision",
                    ]}
                  />

                  <p className="mt-5">
                    If you are meeting in person, inspect the item before completing the exchange
                    where practical.
                  </p>

                  <p className="mt-4">
                    For valuable, specialist or technical items, you may wish to carry out
                    additional checks yourself.
                  </p>
                </SafetySection>

                <SafetySection
                  id="make-sure-the-item-can-be-legally-swapped"
                  number={3}
                  title="Make Sure the Item Can Be Legally Swapped"
                >
                  <p>
                    Only list and exchange items that you are legally entitled to possess and
                    exchange. Do not use Swap Correct to offer or request illegal, stolen,
                    counterfeit or prohibited goods.
                  </p>

                  <div className="mt-6 rounded-xl border border-red-200 bg-red-50 p-5">
                    <div className="flex items-center gap-2 font-semibold text-red-800">
                      <Siren className="h-5 w-5" />
                      Never agree to exchange
                    </div>

                    <BulletList items={prohibitedItems} icon="warning" />
                  </div>

                  <p className="mt-5">
                    If you are unsure whether an item is permitted, check the applicable rules
                    before listing it.
                  </p>
                </SafetySection>

                <SafetySection
                  id="protect-your-personal-information"
                  number={4}
                  title="Protect Your Personal Information"
                >
                  <p>
                    You do not need to give another user unnecessary personal information to arrange
                    a swap.
                  </p>

                  <p className="mt-4">Be particularly careful about sharing:</p>

                  <BulletList items={personalInformation} icon="warning" />

                  <div className="mt-6 flex items-start gap-3 rounded-xl border border-blue-200 bg-blue-50 p-4">
                    <LockKeyhole className="mt-0.5 h-5 w-5 shrink-0 text-blue-600" />

                    <p className="text-sm leading-6 text-blue-900">
                      Swap Correct will never require you to give another user your password or
                      security codes.
                    </p>
                  </div>
                </SafetySection>

                <SafetySection id="watch-out-for-scams" number={5} title="Watch Out for Scams">
                  <p>
                    Scammers may try to create a sense of urgency or pressure you into making a
                    decision. Be cautious if someone:
                  </p>

                  <BulletList items={scamWarnings} icon="warning" />

                  <p className="mt-5 font-medium text-slate-800">
                    If something feels suspicious, stop the conversation and report it.
                  </p>
                </SafetySection>

                <SafetySection id="be-careful-with-money" number={6} title="Be Careful With Money">
                  <p>
                    Swap Correct is designed around item-for-item exchanges, rather than requiring
                    users to purchase items from one another.
                  </p>

                  <p className="mt-4">Be cautious if another user unexpectedly asks you to:</p>

                  <BulletList items={moneyWarnings} icon="warning" />

                  <p className="mt-5">
                    Do not assume that a payment request is legitimate simply because it appears in
                    a conversation.
                  </p>

                  <p className="mt-4">
                    If the proposed arrangement changes from a straightforward swap into a financial
                    transaction, take extra care and make sure you understand exactly what you are
                    agreeing to.
                  </p>
                </SafetySection>

                <SafetySection id="meeting-another-user" number={7} title="Meeting Another User">
                  <p>
                    If you are collecting or exchanging an item in person, think about your personal
                    safety as well as the item.
                  </p>

                  <div className="mt-6 grid gap-4 sm:grid-cols-3">
                    {meetingTips.map((tip) => (
                      <div key={tip} className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                        <MapPin className="mb-3 h-5 w-5" style={{ color: "#007AFF" }} />

                        <p className="text-sm leading-6 text-slate-700">{tip}</p>
                      </div>
                    ))}
                  </div>

                  <p className="mt-6">
                    Consider telling someone you trust where you are going, who you are meeting and
                    approximately when you expect to return.
                  </p>

                  <p className="mt-4">
                    For higher-value items or situations that make you uncomfortable, consider
                    bringing someone with you where appropriate.
                  </p>

                  <div className="mt-6 rounded-xl p-5" style={{ backgroundColor: "#007AFF0D" }}>
                    <p className="font-semibold" style={{ color: "#005FCC" }}>
                      Your personal safety comes first.
                    </p>

                    <p className="mt-1 text-sm leading-6" style={{ color: "#005FCC" }}>
                      You do not have to complete a swap simply because you arranged to meet.
                    </p>
                  </div>
                </SafetySection>

                <SafetySection
                  id="be-careful-when-visiting-someones-home"
                  number={8}
                  title="Be Careful When Visiting Someone’s Home"
                >
                  <p>
                    You may sometimes need to visit a user’s home to collect a large or
                    difficult-to-transport item. If this is necessary, consider taking additional
                    precautions.
                  </p>

                  <BulletList items={homeVisitTips} icon="check" />

                  <p className="mt-5">
                    If the item can reasonably be exchanged somewhere else, consider using a safer
                    public location instead.
                  </p>
                </SafetySection>

                <SafetySection
                  id="delivery-and-collection"
                  number={9}
                  title="Delivery and Collection"
                >
                  <p>
                    Some users may choose to arrange delivery, postage or collection themselves.
                    Before agreeing, make sure both parties understand:
                  </p>

                  <BulletList items={deliveryPoints} />

                  <p className="mt-5">
                    Keep relevant conversations and arrangements on the platform where possible.
                  </p>

                  <p className="mt-4">
                    Remember that independently arranged delivery is normally an arrangement between
                    the users involved.
                  </p>
                </SafetySection>

                <SafetySection
                  id="check-before-you-hand-over-your-item"
                  number={10}
                  title="Check Before You Hand Over Your Item"
                >
                  <p>
                    Before handing over your item, make sure you are satisfied with the exchange.
                    Check that:
                  </p>

                  <BulletList
                    items={[
                      "You are giving the correct item.",
                      "You are receiving the item you agreed to receive.",
                      "The condition is reasonably consistent with what was described.",
                      "Any agreed accessories or parts are included.",
                    ]}
                    icon="check"
                  />

                  <p className="mt-5 font-medium text-slate-800">
                    If something is significantly different from what was agreed, you can choose not
                    to complete the exchange.
                  </p>
                </SafetySection>

                <SafetySection id="trust-your-instincts" number={11} title="Trust Your Instincts">
                  <p>
                    You don’t need to prove that someone is a scammer before deciding not to swap.
                    If something doesn’t feel right, you can stop.
                  </p>

                  <div className="my-6 rounded-xl border border-slate-200 bg-slate-50 p-5">
                    <p className="text-sm font-medium uppercase tracking-wide text-slate-400">
                      You can say
                    </p>

                    <p className="mt-2 text-lg font-semibold italic text-slate-800">
                      “I’m no longer comfortable with this exchange, so I’m going to cancel the
                      swap.”
                    </p>
                  </div>

                  <p>
                    Your safety and peace of mind are more important than completing any particular
                    exchange.
                  </p>
                </SafetySection>

                <SafetySection
                  id="report-suspicious-activity"
                  number={12}
                  title="Report Suspicious Activity"
                >
                  <p>
                    If you see something that appears suspicious, help keep the Swap Correct
                    community safer by reporting it.
                  </p>

                  <BulletList items={reportTypes} icon="warning" />

                  <p className="mt-5">
                    When making a report, provide as much relevant information as you can. This may
                    include screenshots, messages, listing information and an explanation of what
                    happened.
                  </p>

                  <div className="mt-5 flex items-start gap-3 rounded-xl border border-amber-200 bg-amber-50 p-4">
                    <Flag className="mt-0.5 h-5 w-5 shrink-0 text-amber-600" />

                    <p className="text-sm leading-6 text-amber-900">
                      Do not put yourself at risk to investigate another user.
                    </p>
                  </div>
                </SafetySection>

                <SafetySection
                  id="what-happens-after-you-report-something"
                  number={13}
                  title="What Happens After You Report Something?"
                >
                  <p>
                    Reports may be reviewed in accordance with Swap Correct’s policies and
                    applicable law.
                  </p>

                  <p className="mt-4">
                    Depending on the circumstances, Swap Correct may take appropriate action, which
                    can include:
                  </p>

                  <BulletList items={reportActions} icon="check" />

                  <p className="mt-5">
                    Not every report will result in the same action. We may also be unable to
                    disclose details about action taken against another user because of privacy and
                    other legal considerations.
                  </p>
                </SafetySection>

                <SafetySection
                  id="if-you-believe-you-have-been-scammed"
                  number={14}
                  title="If You Believe You Have Been Scammed"
                >
                  <p>If you believe another user has deliberately deceived you:</p>

                  <ol className="mt-5 space-y-4">
                    {[
                      "Stop communicating if you feel unsafe.",
                      "Do not send additional money or items.",
                      "Keep relevant messages and evidence.",
                      "Take screenshots of important information.",
                      "Report the user or listing through Swap Correct.",
                      "If you believe a crime has occurred, consider contacting the appropriate law enforcement or reporting authority.",
                      "If you have shared passwords or security information, change them immediately and take appropriate account-security steps.",
                    ].map((item, index) => (
                      <li key={item} className="flex items-start gap-3">
                        <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-slate-100 text-xs font-bold text-slate-600">
                          {index + 1}
                        </span>

                        <span className="text-[15px] leading-6 text-slate-600">{item}</span>
                      </li>
                    ))}
                  </ol>

                  <p className="mt-5 font-medium text-red-700">
                    Do not attempt to confront, threaten or retaliate against another user.
                  </p>
                </SafetySection>

                <SafetySection id="protect-other-members" number={15} title="Protect Other Members">
                  <p>Online communities work better when members look out for one another.</p>

                  <p className="mt-4">
                    If you notice a suspicious listing or behaviour, reporting it can help prevent
                    another person from becoming a victim.
                  </p>

                  <p className="mt-4">
                    However, do not attempt to investigate, threaten or expose another user
                    yourself. Report it and let the appropriate process deal with it.
                  </p>
                </SafetySection>

                <SafetySection
                  id="remember-what-swap-correct-does"
                  number={16}
                  title="Remember What Swap Correct Does"
                >
                  <p>
                    Swap Correct provides a platform that allows users to discover listings and
                    communicate with other people who may want to exchange items.
                  </p>

                  <p className="mt-4">
                    Swap Correct does not automatically know whether every person, item, description
                    or claim on the platform is genuine.
                  </p>

                  <p className="mt-4">Unless Swap Correct expressly states otherwise:</p>

                  <BulletList
                    items={[
                      "Users arrange swaps directly with one another.",
                      "Users decide whether to accept or reject a swap.",
                      "Users are responsible for checking items and information.",
                      "Users are responsible for agreeing collection or delivery arrangements.",
                      "Users should make their own assessment before completing an exchange.",
                    ]}
                    icon="check"
                  />

                  <p className="mt-5">
                    Swap Correct may provide reporting, moderation and safety tools, but these tools
                    cannot eliminate every risk associated with person-to-person exchanges.
                  </p>
                </SafetySection>

                <SafetySection
                  id="checklist"
                  number={17}
                  title="A Simple Before-You-Swap Checklist"
                >
                  <p>Before completing your next swap, ask yourself:</p>

                  <div className="mt-6 grid gap-3 sm:grid-cols-2">
                    {checklist.map((item) => (
                      <div
                        key={item}
                        className="flex items-start gap-3 rounded-xl border p-4"
                        style={{
                          borderColor: "#007AFF1A",
                          backgroundColor: "#007AFF0D",
                        }}
                      >
                        <CheckCircle2
                          className="mt-0.5 h-5 w-5 shrink-0"
                          style={{ color: "#007AFF" }}
                        />

                        <span className="text-sm leading-6 text-slate-700">{item}</span>
                      </div>
                    ))}
                  </div>

                  <div className="mt-7 rounded-xl border border-amber-200 bg-amber-50 p-5">
                    <p className="font-semibold text-amber-900">
                      If the answer to any important question is no, pause before proceeding.
                    </p>
                  </div>
                </SafetySection>

                <SafetySection id="the-golden-rule" number={18} title="The Golden Rule">
                  <div className="overflow-hidden rounded-2xl bg-slate-950 p-6 text-white sm:p-8">
                    <div
                      className="flex h-12 w-12 items-center justify-center rounded-2xl"
                      style={{ backgroundColor: "#007AFF" }}
                    >
                      <ShieldCheck className="h-6 w-6" />
                    </div>

                    <h3 className="mt-6 text-2xl font-bold sm:text-3xl">
                      If it feels wrong, don’t swap.
                    </h3>

                    <p className="mt-4 max-w-2xl leading-7 text-slate-300">
                      You are never required to complete an exchange. You can change your mind, ask
                      more questions, cancel an arrangement, report suspicious behaviour and walk
                      away.
                    </p>

                    <div className="mt-7 grid gap-3 sm:grid-cols-2">
                      {[
                        "You can change your mind.",
                        "You can ask more questions.",
                        "You can cancel an arrangement.",
                        "You can report suspicious behaviour.",
                        "You can walk away.",
                      ].map((item) => (
                        <div
                          key={item}
                          className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 p-3"
                        >
                          <CheckCircle2 className="h-4 w-4 shrink-0" style={{ color: "#007AFF" }} />

                          <span className="text-sm text-slate-200">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </SafetySection>

                <section className="pt-10">
                  <div
                    className="rounded-2xl p-6 text-center ring-1 sm:p-10"
                    style={{
                      background: "linear-gradient(135deg, #007AFF0D 0%, #007AFF14 100%)",
                      boxShadow: "inset 0 0 0 1px #007AFF1A",
                    }}
                  >
                    <div
                      className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl text-white shadow-lg"
                      style={{
                        backgroundColor: "#007AFF",
                        boxShadow: "0 10px 25px rgba(0,122,255,0.20)",
                      }}
                    >
                      <UserRoundCheck className="h-7 w-7" />
                    </div>

                    <h2 className="mt-5 text-2xl font-bold tracking-tight text-slate-950">
                      Swap what you have. Find what you need. Stay safe.
                    </h2>

                    <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-slate-600">
                      Swap Correct is built to make exchanging items simple, but safety is a shared
                      responsibility. Think before you swap. Check before you exchange. Stay alert.
                      Stay safe.
                    </p>
                  </div>
                </section>
              </article>
            </main>
          </div>
        </div>
      </div>
    </>
  );
}
