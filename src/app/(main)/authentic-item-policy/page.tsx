"use client";

import useIsMobile from "@/app/_hooks/useIsMobile";
import Herosection from "@/components/shared/herosection";

export default function AuthenticItem() {
  const isMobile = useIsMobile();

  return (
    <>
      {!isMobile && <Herosection />}
      <div className="min-h-screen bg-white text-gray-800 py-8 px-4 sm:px-6 md:px-12 lg:px-24">
        <div className="max-w-4xl mx-auto space-y-8 sm:space-y-12">
          <header className="text-center space-y-3 pt-4 sm:pt-8">
            <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black tracking-tight text-gray-900 uppercase">
              ITEM AUTHENTICITY &amp; VERIFICATION POLICY
            </h1>
            <p className="text-xs sm:text-sm font-semibold text-[#007AFF]">
              Last Updated: September 28th, 2026
            </p>
          </header>

          <section className="space-y-4 text-sm sm:text-base leading-relaxed">
            <p>
              At Swap Correct, we want users to exchange items with accurate information and
              reasonable confidence.
            </p>
            <p className="pl-4 border-l-4 border-[#007AFF] bg-blue-50/30 py-2 rounded-r-md">
              This Item Authenticity &amp; Verification Policy explains the standards that apply to
              items listed on Swap Correct, how authenticity concerns may be handled, and what users
              should do before completing a swap.
            </p>
          </section>

          <hr className="border-gray-200" />

          <section className="space-y-4 text-sm sm:text-base">
            <h2 className="text-lg sm:text-2xl font-bold text-gray-900">
              1. Genuine and Legitimate Items
            </h2>
            <p>Users must only list items that:</p>
            <ul className="list-disc pl-5 sm:pl-6 space-y-2 text-gray-700">
              <li>They own or have the legal right to exchange;</li>
              <li>Are accurately described;</li>
              <li>Are not knowingly counterfeit or fake;</li>
              <li>Are not stolen or unlawfully obtained; and</li>
              <li>Comply with Swap Correct’s Terms &amp; Conditions and applicable laws.</li>
            </ul>
            <p className="pl-4 border-l-4 border-[#007AFF] bg-blue-50/30 py-2 rounded-r-md">
              Users must not knowingly misrepresent an item’s brand, model, origin, condition, age,
              value or authenticity.
            </p>
          </section>

          <hr className="border-gray-200" />

          <section className="space-y-4 text-sm sm:text-base">
            <h2 className="text-lg sm:text-2xl font-bold text-gray-900">2. Accurate Listings</h2>
            <p className="pl-4 border-l-4 border-[#007AFF] bg-blue-50/30 py-2 rounded-r-md">
              Listings should provide truthful and sufficiently detailed information about the item.
              Where relevant, users should disclose:
            </p>
            <ul className="list-disc pl-5 sm:pl-6 space-y-2 text-gray-700">
              <li>The item’s make and model;</li>
              <li>Condition;</li>
              <li>Age or approximate age;</li>
              <li>Damage, defects or repairs;</li>
              <li>Missing parts or accessories;</li>
              <li>Serial or identification information, where appropriate;</li>
              <li>Whether the item is genuine or an imitation; and</li>
              <li>
                Any other information that could reasonably affect another user’s decision to swap.
              </li>
            </ul>
            <p>Photographs should accurately represent the item being offered.</p>
          </section>

          <hr className="border-gray-200" />

          <section className="space-y-4 text-sm sm:text-base">
            <h2 className="text-lg sm:text-2xl font-bold text-gray-900">3. Counterfeit Items</h2>
            <p>Counterfeit goods are not permitted on Swap Correct.</p>
            <p>
              This includes items deliberately presented as genuine branded products when they are
              not genuine.
            </p>
            <p className="pl-4 border-l-4 border-[#007AFF] bg-blue-50/30 py-2 rounded-r-md">
              If Swap Correct reasonably suspects that a listing involves counterfeit goods, it may
              remove the listing, restrict the account or take other appropriate action under its
              Terms &amp; Conditions.
            </p>
          </section>

          <hr className="border-gray-200" />

          <section className="space-y-4 text-sm sm:text-base">
            <h2 className="text-lg sm:text-2xl font-bold text-gray-900">
              4. Proof of Authenticity
            </h2>
            <p className="pl-4 border-l-4 border-[#007AFF] bg-blue-50/30 py-2 rounded-r-md">
              For certain items, users may be asked to provide reasonable evidence of authenticity
              or ownership.
            </p>
            <p>Depending on the item, this may include:</p>
            <ul className="list-disc pl-5 sm:pl-6 space-y-2 text-gray-700">
              <li>Original receipts;</li>
              <li>Proof of purchase;</li>
              <li>Certificates of authenticity;</li>
              <li>Serial or model numbers;</li>
              <li>Manufacturer information;</li>
              <li>Original packaging;</li>
              <li>Clear photographs;</li>
              <li>Other relevant documentation.</li>
            </ul>
            <p className="pl-4 border-l-4 border-[#007AFF] bg-blue-50/30 py-2 rounded-r-md">
              Users should not upload unnecessary personal or financial information when providing
              evidence.
            </p>
          </section>

          <hr className="border-gray-200" />

          <section className="space-y-4 text-sm sm:text-base">
            <h2 className="text-lg sm:text-2xl font-bold text-gray-900">
              5. High-Value or Frequently Counterfeited Items
            </h2>
            <p>
              Swap Correct may apply additional verification requirements to certain categories of
              items where there is a greater risk of fraud, counterfeit goods or disputes.
            </p>
            <p>
              Additional checks may apply to items such as branded goods, collectibles, electronics,
              luxury products or other items where authenticity can be difficult to establish.
            </p>
          </section>

          <hr className="border-gray-200" />

          <section className="space-y-4 text-sm sm:text-base">
            <h2 className="text-lg sm:text-2xl font-bold text-gray-900">
              6. Does Swap Correct Authenticate Every Item?
            </h2>
            <p className="text-base sm:text-lg font-bold text-[#007AFF]">No.</p>
            <p>
              Unless Swap Correct expressly identifies an item as having been authenticated through
              an official verification service, users should not assume that an item has been
              independently authenticated by Swap Correct.
            </p>
            <p className="pl-4 border-l-4 border-[#007AFF] bg-blue-50/30 py-2 rounded-r-md">
              The presence of an item on the platform does not, by itself, guarantee its
              authenticity, ownership, condition or value.
            </p>
            <p className="pl-4 border-l-4 border-[#007AFF] bg-blue-50/30 py-2 rounded-r-md">
              Users remain responsible for carrying out appropriate checks before agreeing to a
              swap.
            </p>
          </section>

          <hr className="border-gray-200" />

          <section className="space-y-4 text-sm sm:text-base">
            <h2 className="text-lg sm:text-2xl font-bold text-gray-900">
              7. Verification Does Not Guarantee an Item
            </h2>
            <p className="pl-4 border-l-4 border-[#007AFF] bg-blue-50/30 py-2 rounded-r-md">
              Where Swap Correct performs or facilitates a verification process, that process may
              only assess particular aspects of an item.
            </p>
            <p>Verification should not automatically be interpreted as a guarantee of:</p>
            <ul className="list-disc pl-5 sm:pl-6 space-y-2 text-gray-700">
              <li>Future condition;</li>
              <li>Value;</li>
              <li>Performance;</li>
              <li>Ownership beyond the evidence reviewed;</li>
              <li>Suitability for a particular purpose; or</li>
              <li>Freedom from every possible defect.</li>
            </ul>
          </section>

          <hr className="border-gray-200" />

          <section className="space-y-4 text-sm sm:text-base">
            <h2 className="text-lg sm:text-2xl font-bold text-gray-900">
              8. Suspected Fake or Misrepresented Items
            </h2>
            <p className="pl-4 border-l-4 border-[#007AFF] bg-blue-50/30 py-2 rounded-r-md">
              If you believe an item is counterfeit, stolen, materially misrepresented or otherwise
              violates this policy, do not proceed with the swap if you have not yet completed it.
            </p>
            <p>Where appropriate:</p>
            <ol className="list-decimal pl-5 sm:pl-6 space-y-2 text-gray-700">
              <li>Stop the exchange;</li>
              <li>Preserve relevant messages and evidence;</li>
              <li>Report the listing or user to Swap Correct; and</li>
              <li>
                Consider contacting the appropriate authorities if you believe an offence has
                occurred.
              </li>
            </ol>
            <p className="pl-4 border-l-4 border-[#007AFF] bg-blue-50/30 py-2 rounded-r-md">
              Do not attempt to threaten, confront or retaliate against another user.
            </p>
          </section>

          <hr className="border-gray-200" />

          <section className="space-y-4 text-sm sm:text-base">
            <h2 className="text-lg sm:text-2xl font-bold text-gray-900">9. After an Exchange</h2>
            <p className="pl-4 border-l-4 border-[#007AFF] bg-blue-50/30 py-2 rounded-r-md">
              If you discover after completing a swap that an item may not be genuine or may have
              been materially misrepresented, report the matter to Swap Correct as soon as
              reasonably possible.
            </p>
            <p>Provide relevant information such as:</p>
            <ul className="list-disc pl-5 sm:pl-6 space-y-2 text-gray-700">
              <li>The listing;</li>
              <li>User details;</li>
              <li>Messages relating to the exchange;</li>
              <li>Photographs;</li>
              <li>Proof of purchase or authenticity, if available;</li>
              <li>Delivery information; and</li>
              <li>An explanation of the concern.</li>
            </ul>
            <p>This information may help Swap Correct review the matter.</p>
          </section>

          <hr className="border-gray-200" />

          <section className="space-y-4 text-sm sm:text-base">
            <h2 className="text-lg sm:text-2xl font-bold text-gray-900">10. User Responsibility</h2>
            <p>Every user should make reasonable checks before accepting an item.</p>
            <p className="pl-4 border-l-4 border-[#007AFF] bg-blue-50/30 py-2 rounded-r-md">
              For higher-value or specialist items, users may wish to obtain independent
              authentication or expert advice before completing an exchange.
            </p>
            <p className="pl-4 border-l-4 border-[#007AFF] bg-blue-50/30 py-2 rounded-r-md">
              Do not rely solely on another user’s claims about an item’s authenticity.
            </p>
          </section>

          <hr className="border-gray-200" />

          <section className="space-y-4 text-sm sm:text-base">
            <h2 className="text-lg sm:text-2xl font-bold text-gray-900">11. False Claims</h2>
            <p>Users must not falsely claim that an item has been:</p>
            <ul className="list-disc pl-5 sm:pl-6 space-y-2 text-gray-700">
              <li>Authenticated by Swap Correct;</li>
              <li>Verified by a professional;</li>
              <li>Purchased from a particular retailer;</li>
              <li>Certified by a manufacturer; or</li>
              <li>Proven genuine through documentation that does not actually exist.</li>
            </ul>
            <p className="pl-4 border-l-4 border-[#007AFF] bg-blue-50/30 py-2 rounded-r-md">
              False or misleading claims may result in removal of the listing or action against the
              account.
            </p>
          </section>

          <hr className="border-gray-200" />

          <section className="space-y-4 text-sm sm:text-base">
            <h2 className="text-lg sm:text-2xl font-bold text-gray-900">
              12. Swap Correct’s Right to Act
            </h2>
            <p className="pl-4 border-l-4 border-[#007AFF] bg-blue-50/30 py-2 rounded-r-md">
              Where Swap Correct identifies a reasonable concern regarding authenticity, ownership
              or accuracy, it may take appropriate action in accordance with its Terms &amp;
              Conditions.
            </p>
            <p>This may include:</p>
            <ul className="list-disc pl-5 sm:pl-6 space-y-2 text-gray-700">
              <li>Requesting additional information;</li>
              <li>Requesting evidence;</li>
              <li>Removing or restricting a listing;</li>
              <li>Preventing an exchange from proceeding;</li>
              <li>Limiting account functionality;</li>
              <li>Suspending an account; or</li>
              <li>Terminating an account in appropriate circumstances.</li>
            </ul>
            <p className="pl-4 border-l-4 border-[#007AFF] bg-blue-50/30 py-2 rounded-r-md">
              Where required or appropriate, information may also be provided to relevant
              authorities.
            </p>
          </section>

          <hr className="border-gray-200" />

          <section className="space-y-4 text-sm sm:text-base">
            <h2 className="text-lg sm:text-2xl font-bold text-gray-900">
              13. No Guarantee of Authenticity
            </h2>
            <p>
              Swap Correct takes reasonable steps to establish rules and processes intended to
              reduce counterfeit, fraudulent and misleading listings.
            </p>
            <p className="pl-4 border-l-4 border-[#007AFF] bg-blue-50/30 py-2 rounded-r-md">
              However, Swap Correct cannot guarantee that every item listed by users is genuine,
              accurately described, legally owned or free from defects.
            </p>
            <p>Users should make their own informed decisions before completing an exchange.</p>
          </section>

          <hr className="border-gray-200" />

          <section className="space-y-4 text-sm sm:text-base">
            <h2 className="text-lg sm:text-2xl font-bold text-gray-900">
              14. Relationship With the Terms &amp; Conditions
            </h2>
            <p className="pl-4 border-l-4 border-[#007AFF] bg-blue-50/30 py-2 rounded-r-md">
              This policy forms part of Swap Correct’s platform rules and should be read together
              with the Swap Correct Terms &amp; Conditions and Swap Safety Centre.
            </p>
            <p>
              Where there is a conflict between this policy and the Terms &amp; Conditions, the
              Terms &amp; Conditions will apply unless expressly stated otherwise.
            </p>
          </section>

          <hr className="border-gray-200" />

          <section className="space-y-4 text-sm sm:text-base">
            <h2 className="text-lg sm:text-2xl font-bold text-gray-900">15. Policy Updates</h2>
            <p>
              Swap Correct may update this policy from time to time to reflect changes to the
              platform, technology, safety practices or applicable requirements.
            </p>
            <p>The latest version will be made available on the platform.</p>
          </section>

          <hr className="border-gray-200" />

          <footer className="bg-gray-50 border border-gray-200 rounded-xl p-5 sm:p-8 space-y-4 shadow-sm">
            <h3 className="text-base sm:text-xl font-black text-gray-900 uppercase tracking-wide">
              OUR SIMPLE RULE
            </h3>
            <p className="pl-4 border-l-4 border-[#007AFF] text-sm sm:text-base text-gray-800 leading-relaxed">
              If you cannot confidently establish what an item is, where appropriate, who owns it,
              and what condition it is in — don’t swap it until you have checked. Swap Correct —
              Swap what you have. Find what you need. Swap with confidence.
            </p>
          </footer>
        </div>
      </div>
    </>
  );
}
