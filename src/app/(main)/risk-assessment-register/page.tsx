"use client";

import useIsMobile from "@/app/_hooks/useIsMobile";
import Herosection from "@/components/shared/herosection";
import React from "react";

type RiskRow = {
  risk: string;
  example: string;
  impact: string;
  controls: string;
};

const risks: RiskRow[] = [
  {
    risk: "Fake listings",
    example: "User advertises an item they don’t actually possess",
    impact: "Visitor sends their item and receives nothing",
    controls: "Listing verification, reporting, account history, evidence requirements",
  },
  {
    risk: "Non-delivery after receiving item",
    example: "Swapper receives visitor’s item but refuses to send theirs",
    impact: "Loss of visitor’s property",
    controls: "Advance Exchange Mode, holding fee, tracked delivery",
  },
  {
    risk: "Counterfeit items",
    example: "Fake phone, designer item, electronics, etc.",
    impact: "Financial/property loss and platform reputation damage",
    controls: "Authenticity policy, evidence, reporting, removal",
  },
  {
    risk: "Stolen goods",
    example: "User lists property they don’t legally own",
    impact: "Legal/reputational risk",
    controls: "Ownership declaration, reporting, cooperation with authorities",
  },
  {
    risk: "Misrepresented condition",
    example: "“Like new” item arrives damaged",
    impact: "Disputes and complaints",
    controls: "Mandatory condition fields, photographs, disclosure requirements",
  },
  {
    risk: "Wrong item sent",
    example: "User deliberately sends a different/less valuable item",
    impact: "Loss and disputes",
    controls: "Photos, descriptions, tracking, evidence retention",
  },
  {
    risk: "Empty/dummy parcel",
    example: "Parcel is sent but contains nothing useful",
    impact: "Visitor loses their item",
    controls: "Tracking, delivery evidence, dispute process",
  },
  {
    risk: "False delivery claims",
    example: "User claims they never received an item",
    impact: "Fraud/dispute",
    controls: "Tracking and delivery confirmation",
  },
  {
    risk: "Fake tracking information",
    example: "Fraudster provides invalid or unrelated tracking",
    impact: "User believes swap is progressing",
    controls: "Validate tracking where technically possible",
  },
  {
    risk: "Account takeover",
    example: "Criminal gains access to a legitimate account",
    impact: "Listings/messages may be manipulated",
    controls: "MFA, login monitoring, suspicious login detection",
  },
  {
    risk: "Fake accounts",
    example: "Scammer creates multiple identities",
    impact: "Increased fraud and abuse",
    controls: "Email/phone verification, device/IP risk signals, account limits",
  },
  {
    risk: "Multiple account abuse",
    example: "One person creates accounts to manipulate swaps",
    impact: "Circumvention of bans",
    controls: "Account linking/risk detection",
  },
  {
    risk: "Identity impersonation",
    example: "Someone pretends to be another user or Swap Correct staff",
    impact: "Theft/fraud",
    controls: "Verification, official communication channels, warnings",
  },
  {
    risk: "Off-platform scams",
    example: "User moves conversation to another platform and sends malicious links",
    impact: "Phishing or financial loss",
    controls: "Scam warnings, message monitoring where lawful, reporting",
  },
  {
    risk: "Payment scams",
    example: "Fraudster requests fake “delivery”, “release” or “verification” payments",
    impact: "Financial loss",
    controls: "Clear official payment process and anti-phishing messaging",
  },
  {
    risk: "Advance Exchange Mode abuse",
    example: "Swapper and visitor collude to obtain compensation fraudulently",
    impact: "Direct financial loss",
    controls: "Evidence review, transaction records, account-risk monitoring",
  },
  {
    risk: "False protection claims",
    example: "User deliberately claims the other party failed to send",
    impact: "Unjustified payout",
    controls: "Require tracking/proof and investigate disputes",
  },
  {
    risk: "Holding-fee abuse",
    example: "User attempts to manipulate the holding-fee process",
    impact: "Financial/regulatory/reputational risk",
    controls: "Clear terms, controlled release process, audit trail",
  },
  {
    risk: "Collusion",
    example: "Multiple accounts cooperate to exploit protection",
    impact: "Financial loss",
    controls: "Behavioural monitoring and account-link analysis",
  },
  {
    risk: "Chargeback/ payment fraud",
    example: "User disputes legitimate premium fees after receiving service",
    impact: "Revenue loss",
    controls: "Payment provider controls and transaction records",
  },
  {
    risk: "Money laundering",
    example: "Platform is misused to disguise movement of money/property",
    impact: "Serious legal/ regulatory risk",
    controls: "Transaction monitoring, prohibited activities, escalation procedures",
  },
  {
    risk: "Illegal goods",
    example: "Weapons, drugs or other prohibited goods listed",
    impact: "Criminal/legal risk",
    controls: "Prohibited items policy, automated/manual moderation",
  },
  {
    risk: "Harassment/ threats",
    example: "Dispute becomes abusive or threatening",
    impact: "User safety",
    controls: "Reporting, blocking, moderation and escalation",
  },
  {
    risk: "Personal information abuse",
    example: "Users collect addresses/phone numbers for malicious purposes",
    impact: "Privacy and safety risk",
    controls: "Data minimisation, privacy controls, warnings",
  },
  {
    risk: "Delivery theft/ loss",
    example: "Item disappears during transportation",
    impact: "User dispute and potential compensation claim",
    controls: "Tracking, agreed delivery terms, insurance options",
  },
  {
    risk: "Meet-up robbery",
    example: "User is targeted during an in-person exchange",
    impact: "Serious physical safety risk",
    controls: "Public meeting guidance, no home addresses, reporting",
  },
  {
    risk: "Fake reviews",
    example: "Users create fake accounts to boost reputation",
    impact: "Loss of trust",
    controls: "Review eligibility rules and suspicious review detection",
  },
  {
    risk: "Platform phishing",
    example: "Fake emails/websites imitate Swap Correct",
    impact: "Users disclose credentials/ payment details",
    controls: "Domain protection, security alerts, official-channel guidance",
  },
  {
    risk: "Data breach",
    example: "User information is exposed",
    impact: "Privacy, financial and reputational harm",
    controls: "Encryption, access controls, monitoring, incident response plan",
  },
  {
    risk: "Insider abuse",
    example: "Employee/ admin misuses access",
    impact: "Data/fraud risk",
    controls: "Role-based access, audit logs, least privilege access",
  },
  {
    risk: "Bot/ automated abuse",
    example: "Bots create accounts or scrape listings",
    impact: "Platform disruption/ fraud",
    controls: "Rate limits, bot detection, CAPTCHA/risk controls",
  },
  {
    risk: "Dispute overload",
    example: "Large number of fraudulent or genuine disputes",
    impact: "Operational cost and delays",
    controls: "Standardised evidence process and escalation system",
  },
];

const biggestRisks = [
  {
    number: "1.",
    title: "“I sent mine, but they never sent theirs.”",
    text: "This is probably central to the remote-swap model and is exactly where your Advance Exchange Mode can provide an additional layer of protection.",
  },
  {
    number: "2.",
    title: "Counterfeit or stolen items.",
    text: "The platform needs clear rules requiring users to have the legal right to exchange what they list.",
  },
  {
    number: "3.",
    title: "Fake accounts and repeat scammers.",
    text: "A scammer banned today may try to return tomorrow under another account.",
  },
  {
    number: "4.",
    title: "Fraudulent Advance Exchange claims.",
    text: "The protection system itself can become a target. Users could potentially collude or make false claims to obtain money.",
  },
  {
    number: "5.",
    title: "Payment and fee fraud.",
    text: "Users may receive fake messages claiming they need to pay a “release fee”, “verification fee” or “delivery fee.”",
  },
  {
    number: "6.",
    title: "Personal safety.",
    text: "In-person exchanges introduce risks that are different from online fraud, including theft, intimidation and unsafe meeting locations.",
  },
  {
    number: "7.",
    title: "Delivery disputes.",
    text: "You need evidence-based procedures for situations involving lost parcels, damaged items, false delivery claims and incorrect items.",
  },
  {
    number: "8.",
    title: "Platform and data security.",
    text: "A compromised account could allow a criminal to impersonate a genuine user and exploit existing listings or conversations.",
  },
];

export default function RiskAssessmentRegister() {
  const isMobile = useIsMobile();

  return (
    <>
      {!isMobile && <Herosection />}

      <div className="mx-auto w-full max-w-[900px] bg-white px-4 py-6 md:px-8 md:py-8 ...">
        {/* Document title */}
        <h1 className="text-[17px] font-normal leading-tight text-[#444] mb-4">
          RISK ASSESSMENT-REGISTER
        </h1>

        {/* Main table */}
        <div className="w-full overflow-x-auto print:overflow-visible">
          <table className="w-full min-w-[800px] table-fixed border-collapse border border-black text-left text-[#444]">
            <colgroup>
              <col className="w-[25%]" />
              <col className="w-[25%]" />
              <col className="w-[25%]" />
              <col className="w-[25%]" />
            </colgroup>

            <thead>
              <tr>
                <th className="border border-black px-4 py-2 text-[22px] font-normal leading-tight">
                  Risk
                </th>
                <th className="border border-black px-4 py-2 text-[22px] font-normal leading-tight">
                  Example
                </th>
                <th className="border border-black px-4 py-2 text-[22px] font-normal leading-tight">
                  Potential
                  <br />
                  impact
                </th>
                <th className="border border-black px-4 py-2 text-[22px] font-normal leading-tight">
                  Suggested
                  <br />
                  controls
                </th>
              </tr>
            </thead>

            <tbody>
              {risks.map((row, index) => (
                <tr key={`${row.risk}-${index}`} className="break-inside-avoid-page">
                  <td className="border border-black px-4 py-2 align-top text-[21px] leading-[1.5]">
                    {row.risk}
                  </td>

                  <td className="border border-black px-4 py-2 align-top text-[21px] leading-[1.5]">
                    {row.example}
                  </td>

                  <td className="border border-black px-4 py-2 align-top text-[21px] leading-[1.5]">
                    {row.impact}
                  </td>

                  <td className="border border-black px-4 py-2 align-top text-[21px] leading-[1.5]">
                    {row.controls}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* The biggest risks for Swap Correct */}
        <section className="mt-10 break-before-page">
          <h2 className="mb-2 text-[22px] font-normal text-[#444]">
            The biggest risks for Swap Correct
          </h2>

          <p className="mb-5 text-[20px] leading-[1.5] text-[#444]">
            I would pay particular attention to these eight areas:
          </p>

          <ol className="space-y-5">
            {biggestRisks.map((item) => (
              <li
                key={item.number}
                className="break-inside-avoid text-[20px] leading-[1.5] text-[#444]"
              >
                <p>
                  <span className="font-normal">{item.number} </span>
                  <span className="font-semibold">{item.title}</span>
                </p>

                <p className="mt-1">{item.text}</p>
              </li>
            ))}
          </ol>
        </section>

        {/* A useful risk-control structure */}
        <section className="mt-10 break-before-page">
          <h2 className="mb-3 text-[22px] font-normal text-[#444]">
            A useful risk-control structure
          </h2>

          <p className="text-[20px] leading-[1.5] text-[#444]">
            For each risk, Swap Correct could internally record:
          </p>

          <p className="mt-3 text-[20px] font-medium leading-[1.5] text-[#444]">
            Risk → Likelihood → Severity → Overall risk → Preventive control → Detection method →
            Response → Responsible team → Evidence retained → Review date
          </p>

          <div className="mt-7 break-inside-avoid">
            <p className="mb-4 text-[20px] leading-[1.5] text-[#444]">For example:</p>

            <div className="border border-black">
              <div className="grid grid-cols-[180px_1fr] border-b border-black">
                <div className="border-r border-black p-3 text-[19px] font-semibold">Risk:</div>
                <div className="p-3 text-[19px] leading-[1.5]">
                  Swapper receives visitor’s item but does not send their item.
                </div>
              </div>

              <div className="grid grid-cols-[180px_1fr] border-b border-black">
                <div className="border-r border-black p-3 text-[19px] font-semibold">
                  Likelihood:
                </div>
                <div className="p-3 text-[19px]">Medium</div>
              </div>

              <div className="grid grid-cols-[180px_1fr] border-b border-black">
                <div className="border-r border-black p-3 text-[19px] font-semibold">Impact:</div>
                <div className="p-3 text-[19px]">High</div>
              </div>

              <div className="grid grid-cols-[180px_1fr] border-b border-black">
                <div className="border-r border-black p-3 text-[19px] font-semibold">Control:</div>
                <div className="p-3 text-[19px] leading-[1.5]">
                  Advance Exchange Mode + equivalent holding fee + tracked delivery.
                </div>
              </div>

              <div className="grid grid-cols-[180px_1fr] border-b border-black">
                <div className="border-r border-black p-3 text-[19px] font-semibold">
                  Detection:
                </div>
                <div className="p-3 text-[19px] leading-[1.5]">
                  Visitor reports non-completion after confirmed delivery.
                </div>
              </div>

              <div className="grid grid-cols-[180px_1fr] border-b border-black">
                <div className="border-r border-black p-3 text-[19px] font-semibold">Response:</div>
                <div className="p-3 text-[19px] leading-[1.5]">
                  Freeze relevant transaction/account activity, review tracking and communications,
                  contact both parties, determine whether holding fee can be released under the
                  published rules.
                </div>
              </div>

              <div className="grid grid-cols-[180px_1fr]">
                <div className="border-r border-black p-3 text-[19px] font-semibold">Evidence:</div>
                <div className="p-3 text-[19px] leading-[1.5]">
                  Listing, messages, payment records, tracking information, photographs and
                  timestamps.
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Advance Exchange Mode */}
        <section className="mt-10 break-inside-avoid">
          <p className="text-[20px] leading-[1.6] text-[#444]">
            One important point: Advance Exchange Mode should not be described as an absolute
            guarantee or automatic compensation scheme. Its terms should clearly explain exactly
            when the holding fee can be released, what evidence is required, the maximum protection
            amount, dispute time limits, and what happens when both parties dispute the facts.
          </p>
        </section>

        {/* UK-based platform */}
        <section className="mt-8 break-inside-avoid">
          <p className="text-[20px] leading-[1.6] text-[#444]">
            For a UK-based platform, I would also make fraud prevention, consumer protection,
            privacy/data protection, payments, prohibited goods, and the legal treatment of the
            holding/protection-fee arrangement separate risk-assessment areas rather than treating
            them all as ordinary scam risks.
          </p>
        </section>
      </div>

      {/* Print styling */}
      <style jsx global>{`
        @page {
          size: A4 portrait;
          margin: 0;
        }

        html,
        body {
          margin: 0;
          padding: 0;
        }

        * {
          box-sizing: border-box;
        }

        @media print {
          body {
            background: white !important;
            color: #444;
            -webkit-print-color-adjust: exact;
            print-color-adjust: exact;
          }

          table {
            width: 100% !important;
          }

          tr {
            break-inside: avoid !important;
            page-break-inside: avoid !important;
          }

          td,
          th {
            break-inside: avoid !important;
            page-break-inside: avoid !important;
          }

          section {
            break-inside: auto;
          }

          .break-inside-avoid {
            break-inside: avoid;
            page-break-inside: avoid;
          }

          .break-inside-avoid-page {
            break-inside: avoid;
            page-break-inside: avoid;
          }

          .break-before-page {
            break-before: page;
            page-break-before: always;
          }
        }
      `}</style>
    </>
  );
}
