"use client";

import useIsMobile from "@/app/_hooks/useIsMobile";
import Herosection from "@/components/shared/herosection";

const sections = [
  {
    number: 1,
    title: "Introduction",
    content: (
      <>
        <p>
          Welcome to Swap Correct. These Terms and Conditions (“Terms”, “Agreement”) govern your
          access to and use of the Swap Correct website, mobile application, platform, services and
          associated features (collectively, the “Platform”).
        </p>

        <p>
          Swap Correct is a money-less exchange platform designed to allow individuals to offer
          items they already own and seek to exchange those items with other users.
        </p>

        <p>
          The fundamental purpose of Swap Correct is simple: users exchange items with other users
          without buying or selling those items for money through Swap Correct.
        </p>

        <p>
          Swap Correct provides the technological platform that allows users to create listings,
          discover items, communicate with other users and arrange exchanges. Swap Correct is not
          ordinarily a party to the exchange agreement between users. The actual exchange is an
          independent arrangement between the users involved.
        </p>

        <p>
          By creating an account, accessing, browsing or using the Platform, you agree to be bound
          by these Terms. If you do not agree to these Terms, you must not use the Platform.
        </p>
      </>
    ),
  },

  {
    number: 2,
    title: "About Swap Correct",
    content: (
      <>
        <p>
          Swap Correct is a platform that connects people who want to exchange items they already
          own.
        </p>

        <p>Examples of items that may be listed include:</p>

        <ul>
          <li>Furniture</li>
          <li>Clothing</li>
          <li>Electronics</li>
          <li>Books</li>
          <li>Toys</li>
          <li>Household equipment</li>
          <li>Tools</li>
          <li>Sports equipment</li>
          <li>Collectibles</li>
          <li>Appliances</li>
          <li>Other permitted personal possessions</li>
        </ul>

        <p>
          A user may find another item they want and communicate with its owner to determine whether
          both parties wish to exchange.
        </p>

        <p>Swap Correct does not guarantee that a suitable exchange will be found.</p>
      </>
    ),
  },

  {
    number: 3,
    title: "Definitions",
    content: (
      <>
        <p>For these Terms:</p>

        <dl className="space-y-4">
          <div>
            <dt className="font-semibold text-slate-900">“Swap Correct”, “we”, “us” or “our”</dt>
            <dd className="mt-1">
              Means the company or legal entity operating the Swap Correct Platform.
            </dd>
          </div>

          <div>
            <dt className="font-semibold text-slate-900">“User”, “you” or “your”</dt>
            <dd className="mt-1">Means any person who accesses or uses the Platform.</dd>
          </div>

          <div>
            <dt className="font-semibold text-slate-900">“Listing”</dt>
            <dd className="mt-1">
              Means an item advertised or displayed on the Platform for potential exchange.
            </dd>
          </div>

          <div>
            <dt className="font-semibold text-slate-900">“Item”</dt>
            <dd className="mt-1">Means a physical product or possession listed for exchange.</dd>
          </div>

          <div>
            <dt className="font-semibold text-slate-900">“Exchange”</dt>
            <dd className="mt-1">
              Means an arrangement between two or more users to exchange permitted items.
            </dd>
          </div>

          <div>
            <dt className="font-semibold text-slate-900">“Exchange Partner”</dt>
            <dd className="mt-1">
              Means another user with whom you communicate or arrange an exchange.
            </dd>
          </div>

          <div>
            <dt className="font-semibold text-slate-900">“Content”</dt>
            <dd className="mt-1">
              Means text, photographs, videos, messages, descriptions, reviews, comments, profiles
              and other material uploaded or submitted to the Platform.
            </dd>
          </div>

          <div>
            <dt className="font-semibold text-slate-900">“Platform”</dt>
            <dd className="mt-1">
              Means the Swap Correct website, mobile application, software, systems and related
              services.
            </dd>
          </div>
        </dl>
      </>
    ),
  },

  {
    number: 4,
    title: "Eligibility",
    content: (
      <>
        <p>
          You must meet the minimum legal age and other requirements applicable to the Platform in
          your country.
        </p>

        <p>You must provide accurate information when creating an account.</p>

        <p>
          You must not create an account using another person’s identity without lawful authority.
        </p>

        <p>
          You must not create an account if your account has previously been permanently banned from
          Swap Correct unless we expressly permit you to create another account.
        </p>

        <p>
          We reserve the right to refuse registration or access where we reasonably consider it
          necessary for security, fraud prevention, legal compliance or protection of the Platform
          and its users.
        </p>
      </>
    ),
  },

  {
    number: 5,
    title: "Your Account",
    content: (
      <>
        <p>Some features of Swap Correct may require an account.</p>

        <p>You are responsible for:</p>

        <ul>
          <li>Keeping your account information accurate.</li>
          <li>Maintaining the confidentiality of your password.</li>
          <li>Protecting your login credentials.</li>
          <li>All activity occurring through your account, subject to applicable law.</li>
          <li>Not allowing unauthorised persons to use your account.</li>
          <li>Not selling, transferring or lending your account.</li>
        </ul>

        <p>You must notify us promptly if you believe that your account has been compromised.</p>

        <p>We may require you to verify your email address, telephone number or identity.</p>
      </>
    ),
  },

  {
    number: 6,
    title: "The Swap Correct Exchange Model",
    content: (
      <>
        <p>
          Swap Correct is designed primarily as a money-less exchange platform. Users may offer
          items they already own and seek other items in return.
        </p>

        <p>An exchange may be:</p>

        <ul>
          <li>Item-for-item.</li>
          <li>Multi-item-for-item.</li>
          <li>Part of a mutually agreed exchange involving multiple users.</li>
          <li>Another exchange arrangement expressly permitted by Swap Correct.</li>
        </ul>

        <p>
          Unless Swap Correct introduces a separate payment feature, Swap Correct does not act as a
          payment intermediary for user exchanges.
        </p>
      </>
    ),
  },

  {
    number: 7,
    title: "Users Are Responsible for Their Own Exchanges",
    content: (
      <>
        <p>
          Users are responsible for deciding whether to enter into an exchange. Before agreeing to
          an exchange, you should independently consider:
        </p>

        <ul>
          <li>Whether the other user appears genuine.</li>
          <li>Whether the item actually exists.</li>
          <li>Whether the other user owns or has authority to exchange the item.</li>
          <li>The condition of the item.</li>
          <li>Whether the item matches its description.</li>
          <li>Whether the item is complete.</li>
          <li>Whether the item is safe to use.</li>
          <li>Whether the exchange is fair.</li>
          <li>Where the exchange will take place.</li>
          <li>How the item will be transported.</li>
          <li>Whether you are comfortable meeting the other user.</li>
        </ul>

        <p>
          You should inspect an item before completing an exchange whenever reasonably possible.
        </p>

        <p>Once an exchange has been completed, disputes may be difficult to resolve.</p>
      </>
    ),
  },

  {
    number: 8,
    title: "Swap Correct Is Not a Party to User Exchanges",
    content: (
      <>
        <p>
          Unless expressly stated otherwise, Swap Correct only provides a platform through which
          users may communicate and arrange exchanges.
        </p>

        <p>Swap Correct does not ordinarily:</p>

        <ul>
          <li>Own the listed items.</li>
          <li>Purchase the listed items.</li>
          <li>Sell the listed items.</li>
          <li>Guarantee ownership.</li>
          <li>Guarantee authenticity.</li>
          <li>Guarantee condition.</li>
          <li>Inspect every item.</li>
          <li>Independently verify every listing.</li>
          <li>Guarantee that a user will complete an exchange.</li>
          <li>Guarantee that an exchange will be successful.</li>
          <li>Set the value of an exchange.</li>
          <li>Determine whether an exchange is fair.</li>
        </ul>

        <p>Any agreement concerning an exchange is primarily between the participating users.</p>
      </>
    ),
  },

  {
    number: 9,
    title: "No Guarantee of Users or Listings",
    content: (
      <>
        <p>
          Although Swap Correct may introduce verification, reporting and moderation systems, these
          systems cannot guarantee that every user is genuine or that every listing is accurate.
        </p>

        <p>Users acknowledge that information supplied by other users may be:</p>

        <ul>
          <li>Incomplete.</li>
          <li>Inaccurate.</li>
          <li>Misleading.</li>
          <li>Outdated.</li>
          <li>Incorrect.</li>
          <li>Fraudulent.</li>
        </ul>

        <p>You should independently verify information before relying on it.</p>
      </>
    ),
  },

  {
    number: 10,
    title: "Listing Items",
    content: (
      <>
        <p>When creating a listing, you must provide information that is reasonably accurate.</p>

        <p>You should accurately describe:</p>

        <ul>
          <li>The item.</li>
          <li>Its condition.</li>
          <li>Any known defects.</li>
          <li>Its age, where relevant.</li>
          <li>Important specifications.</li>
          <li>Whether accessories are included.</li>
          <li>Any material damage.</li>
          <li>Any significant limitations.</li>
        </ul>

        <p>
          Photographs should reasonably represent the item being offered. You must not deliberately
          conceal significant defects.
        </p>
      </>
    ),
  },

  {
    number: 11,
    title: "Ownership and Authority",
    content: (
      <>
        <p>You must have the legal right or appropriate authority to offer an item for exchange.</p>

        <p>You must not list:</p>

        <ul>
          <li>Stolen property.</li>
          <li>Property belonging to another person without permission.</li>
          <li>Property you are not authorised to dispose of.</li>
          <li>Items obtained through fraud.</li>
          <li>Items subject to a legal restriction preventing their transfer.</li>
        </ul>

        <p>
          If we receive credible information that an item may be stolen, unlawfully obtained or
          otherwise prohibited, we may remove the listing and take other appropriate action.
        </p>
      </>
    ),
  },

  {
    number: 12,
    title: "Prohibited Items",
    content: (
      <>
        <p>You must not list or exchange items that are illegal or prohibited by Swap Correct.</p>

        <p>Prohibited items may include, without limitation:</p>

        <ul>
          <li>Illegal drugs.</li>
          <li>Controlled substances.</li>
          <li>Firearms.</li>
          <li>Ammunition.</li>
          <li>Explosives.</li>
          <li>Weapons prohibited by applicable law.</li>
          <li>Stolen goods.</li>
          <li>Counterfeit goods.</li>
          <li>Fraudulent documents.</li>
          <li>Identity documents.</li>
          <li>Bank cards.</li>
          <li>Financial credentials.</li>
          <li>Items designed to facilitate criminal activity.</li>
          <li>Items that infringe another person’s intellectual property rights.</li>
          <li>Dangerous substances.</li>
          <li>Hazardous materials.</li>
          <li>Human remains or body parts.</li>
          <li>Sexually exploitative material.</li>
          <li>Items involving child sexual exploitation.</li>
          <li>Items whose sale or transfer is prohibited by law.</li>
          <li>Any other item prohibited by applicable law.</li>
        </ul>

        <p>Swap Correct may maintain and update a separate Prohibited Items Policy.</p>
      </>
    ),
  },

  {
    number: 13,
    title: "Illegal or Dangerous Items",
    content: (
      <>
        <p>
          If you encounter an item that appears illegal, dangerous or otherwise prohibited, you
          should report it to Swap Correct.
        </p>

        <p>Where appropriate, we may:</p>

        <ul>
          <li>Remove the listing.</li>
          <li>Restrict the account.</li>
          <li>Suspend the account.</li>
          <li>Permanently terminate the account.</li>
          <li>Preserve relevant information.</li>
          <li>Contact appropriate authorities where legally required or reasonably necessary.</li>
        </ul>
      </>
    ),
  },

  {
    number: 14,
    title: "Accuracy of Listings",
    content: (
      <>
        <p>You must not:</p>

        <ul>
          <li>Use false photographs.</li>
          <li>Misrepresent an item’s condition.</li>
          <li>Misrepresent an item’s ownership.</li>
          <li>Claim an item is genuine when you know it is counterfeit.</li>
          <li>Hide significant defects.</li>
          <li>Use another person’s photographs without permission.</li>
          <li>Create fake listings.</li>
          <li>Create listings for items that do not exist.</li>
          <li>Manipulate information to deceive another user.</li>
        </ul>
      </>
    ),
  },

  {
    number: 15,
    title: "Multiple Listings",
    content: (
      <>
        <p>
          Users must not create excessive duplicate listings designed to manipulate search results
          or visibility.
        </p>

        <p>We may remove duplicate, misleading or abusive listings.</p>
      </>
    ),
  },

  {
    number: 16,
    title: "Communication Between Users",
    content: (
      <>
        <p>
          Swap Correct may provide messaging tools allowing users to communicate. Users must use
          these tools responsibly.
        </p>

        <p>You must not use the Platform to:</p>

        <ul>
          <li>Harass another person.</li>
          <li>Threaten another person.</li>
          <li>Extort another person.</li>
          <li>Defraud another person.</li>
          <li>Send malicious software.</li>
          <li>Send spam.</li>
          <li>Obtain passwords.</li>
          <li>Obtain financial information through deception.</li>
          <li>Distribute illegal content.</li>
          <li>Promote criminal activity.</li>
          <li>Distribute abusive or exploitative content.</li>
        </ul>
      </>
    ),
  },

  {
    number: 17,
    title: "Scams and Fraud",
    content: (
      <>
        <p>
          Swap Correct does not guarantee that all users are honest. Users should remain alert to
          potential scams.
        </p>

        <p>Warning signs may include:</p>

        <ul>
          <li>Pressure to complete an exchange immediately.</li>
          <li>Requests for sensitive personal information.</li>
          <li>Requests to move communication away from the Platform.</li>
          <li>Suspiciously valuable offers.</li>
          <li>Fake identity claims.</li>
          <li>Requests for passwords.</li>
          <li>Requests for financial information.</li>
          <li>Requests to send an item before receiving the agreed exchange.</li>
          <li>Requests to exchange prohibited items.</li>
        </ul>

        <p>
          If something appears suspicious, do not proceed with the exchange and report the matter to
          Swap Correct.
        </p>
      </>
    ),
  },

  {
    number: 18,
    title: "No Liability for User-to-User Losses",
    content: (
      <>
        <p>
          To the maximum extent permitted by applicable law, Swap Correct is not responsible for
          losses arising from exchanges arranged between users.
        </p>

        <p>This includes, where legally permissible:</p>

        <ul>
          <li>Loss of an item.</li>
          <li>Theft.</li>
          <li>Fraud.</li>
          <li>Scams.</li>
          <li>Misrepresentation by another user.</li>
          <li>Damaged items.</li>
          <li>Defective items.</li>
          <li>Missing items.</li>
          <li>Counterfeit items.</li>
          <li>Stolen items.</li>
          <li>Items not matching descriptions.</li>
          <li>Failure to complete an exchange.</li>
          <li>Failure to attend a meeting.</li>
          <li>Transportation losses.</li>
          <li>Delivery losses.</li>
          <li>Disputes over value.</li>
          <li>Disputes over ownership.</li>
          <li>Damage to property.</li>
          <li>Loss of money paid directly between users.</li>
          <li>Personal injury arising from an independently arranged exchange.</li>
        </ul>

        <p>Swap Correct does not guarantee that another user will honour an agreement.</p>

        <p>
          This clause does not exclude or limit any liability that cannot lawfully be excluded or
          limited under applicable law.
        </p>
      </>
    ),
  },

  {
    number: 19,
    title: "No Guarantee of Exchange Success",
    content: (
      <>
        <p>Swap Correct does not guarantee that:</p>

        <ul>
          <li>You will find an exchange partner.</li>
          <li>Another user will respond.</li>
          <li>Another user will accept your offer.</li>
          <li>An agreed exchange will occur.</li>
          <li>An item will be available when you contact the owner.</li>
          <li>Another user will attend an agreed meeting.</li>
          <li>An exchange will be satisfactory.</li>
        </ul>
      </>
    ),
  },

  {
    number: 20,
    title: "Physical Meetings",
    content: (
      <>
        <p>
          Users may independently arrange physical meetings to complete exchanges. Swap Correct does
          not supervise these meetings.
        </p>

        <p>Users should consider meeting:</p>

        <ul>
          <li>In public places.</li>
          <li>During daylight hours.</li>
          <li>In locations with other people present.</li>
          <li>At safe and appropriate exchange points.</li>
        </ul>

        <p>
          Users should tell someone they trust where they are going when meeting an unfamiliar
          person.
        </p>

        <p>If you feel unsafe, do not proceed with the exchange.</p>
      </>
    ),
  },

  {
    number: 21,
    title: "Exchanges at Private Addresses",
    content: (
      <>
        <p>Users should avoid unnecessarily sharing their home address.</p>

        <p>
          If a user chooses to arrange an exchange at a private residence, that decision is made
          independently by the participating users.
        </p>

        <p>
          Swap Correct is not responsible for events occurring at a private location to the extent
          permitted by law.
        </p>
      </>
    ),
  },

  {
    number: 22,
    title: "Delivery and Transport",
    content: (
      <>
        <p>
          Unless Swap Correct expressly provides delivery services, users are responsible for
          arranging delivery or transportation themselves.
        </p>

        <p>Users are responsible for agreeing:</p>

        <ul>
          <li>Who will transport the item.</li>
          <li>How the item will be packaged.</li>
          <li>Who bears transportation costs.</li>
          <li>When delivery will occur.</li>
          <li>What happens if the item is damaged during transportation.</li>
        </ul>

        <p>
          Swap Correct does not guarantee delivery or transportation arranged independently by
          users.
        </p>
      </>
    ),
  },

  {
    number: 23,
    title: "Value of Items",
    content: (
      <>
        <p>
          Swap Correct does not determine the monetary or exchange value of items. Users are
          responsible for determining whether an exchange is acceptable to them.
        </p>

        <p>
          An exchange may involve items of different perceived monetary values if the users
          voluntarily agree.
        </p>

        <p>Swap Correct does not guarantee that an exchange represents equal value.</p>
      </>
    ),
  },

  {
    number: 24,
    title: "No Money Required for Standard Exchanges",
    content: (
      <>
        <p>
          Swap Correct is designed around the principle that users can exchange possessions without
          purchasing them through the Platform.
        </p>

        <p>
          Users should not demand payment from another user as a condition of using a standard
          exchange feature unless such functionality is expressly authorised by Swap Correct.
        </p>

        <p>Swap Correct may introduce optional paid services in the future.</p>
      </>
    ),
  },

  {
    number: 25,
    title: "Payments and Optional Services",
    content: (
      <>
        <p>If Swap Correct introduces paid services, separate terms may apply.</p>

        <p>Such services could include:</p>

        <ul>
          <li>Promotional listings.</li>
          <li>Verification services.</li>
          <li>Premium accounts.</li>
          <li>Advertising.</li>
          <li>Delivery services.</li>
          <li>Other optional platform services.</li>
        </ul>

        <p>
          Where a paid service is introduced, the applicable price and terms will be presented
          before purchase where required by law.
        </p>
      </>
    ),
  },

  {
    number: 26,
    title: "Fees",
    content: (
      <>
        <p>The standard user-to-user exchange service may be free.</p>

        <p>
          However, Swap Correct reserves the right to introduce reasonable fees for optional
          services.
        </p>

        <p>
          Any applicable fee will be disclosed before the user becomes liable for it, subject to
          applicable law.
        </p>
      </>
    ),
  },

  {
    number: 27,
    title: "Reviews and Ratings",
    content: (
      <>
        <p>
          If Swap Correct provides reviews or ratings, users must provide honest and genuine
          feedback based on their actual experience.
        </p>

        <p>Users must not:</p>

        <ul>
          <li>Create fake reviews.</li>
          <li>Review themselves.</li>
          <li>Pay another person for a review.</li>
          <li>Threaten someone to obtain a favourable review.</li>
          <li>Manipulate ratings.</li>
          <li>Create multiple accounts to influence ratings.</li>
        </ul>

        <p>We may remove reviews that violate our policies or applicable law.</p>
      </>
    ),
  },

  {
    number: 28,
    title: "User Content",
    content: (
      <>
        <p>You retain ownership of content you upload to Swap Correct.</p>

        <p>
          However, by uploading content, you grant Swap Correct a non-exclusive, worldwide,
          royalty-free licence to use, reproduce, store, display and distribute that content as
          reasonably necessary to operate, promote, maintain and improve the Platform.
        </p>

        <p>
          This licence continues for as long as reasonably necessary for these purposes, subject to
          applicable law and our Privacy Policy.
        </p>

        <p>You confirm that you have the necessary rights to provide the content.</p>
      </>
    ),
  },

  {
    number: 29,
    title: "Copyright and Intellectual Property",
    content: (
      <>
        <p>
          The Swap Correct name, logo, design, software, branding, graphics, functionality and other
          Platform materials are owned by or licensed to Swap Correct unless otherwise stated.
        </p>

        <p>You must not:</p>

        <ul>
          <li>Copy the Platform.</li>
          <li>Reproduce our branding without permission.</li>
          <li>Reverse engineer the Platform where prohibited by law.</li>
          <li>Scrape the Platform for commercial purposes without permission.</li>
          <li>Reproduce our proprietary software.</li>
          <li>Use Swap Correct branding to imply an unauthorised partnership.</li>
        </ul>
      </>
    ),
  },

  {
    number: 30,
    title: "User Responsibility for Uploaded Content",
    content: (
      <>
        <p>You are responsible for the content you upload.</p>

        <p>You must not upload content that:</p>

        <ul>
          <li>Infringes copyright.</li>
          <li>Infringes trademarks.</li>
          <li>Infringes privacy rights.</li>
          <li>Defames another person.</li>
          <li>Contains unlawful material.</li>
          <li>Contains malicious software.</li>
          <li>Contains fraudulent information.</li>
          <li>Violates these Terms.</li>
        </ul>
      </>
    ),
  },

  {
    number: 31,
    title: "Reporting Content or Users",
    content: (
      <>
        <p>Users may report:</p>

        <ul>
          <li>Fraud.</li>
          <li>Scams.</li>
          <li>Illegal listings.</li>
          <li>Dangerous items.</li>
          <li>Harassment.</li>
          <li>Fake accounts.</li>
          <li>Copyright infringement.</li>
          <li>Counterfeit goods.</li>
          <li>Suspicious activity.</li>
          <li>Other Terms violations.</li>
        </ul>

        <p>We may investigate reports and take action where appropriate.</p>
      </>
    ),
  },

  {
    number: 32,
    title: "Moderation",
    content: (
      <>
        <p>Swap Correct may use human and automated systems to moderate content and detect:</p>

        <ul>
          <li>Spam.</li>
          <li>Fraud.</li>
          <li>Illegal content.</li>
          <li>Prohibited items.</li>
          <li>Malicious activity.</li>
          <li>Abuse.</li>
          <li>Policy violations.</li>
        </ul>

        <p>Moderation may result in content being:</p>

        <ul>
          <li>Removed.</li>
          <li>Restricted.</li>
          <li>Hidden.</li>
          <li>Demoted.</li>
          <li>Edited where legally and technically appropriate.</li>
          <li>Referred for investigation.</li>
        </ul>
      </>
    ),
  },

  {
    number: 33,
    title: "Account Suspension",
    content: (
      <>
        <p>We may suspend an account where we reasonably believe that:</p>

        <ul>
          <li>The user has violated these Terms.</li>
          <li>The user has engaged in fraud.</li>
          <li>The user has endangered other users.</li>
          <li>The account has been compromised.</li>
          <li>The user has listed prohibited items.</li>
          <li>The user has abused the reporting system.</li>
          <li>The user has repeatedly received credible complaints.</li>
          <li>Suspension is necessary to protect the Platform.</li>
          <li>Suspension is required by law.</li>
        </ul>

        <p>
          Where appropriate and legally permitted, we may notify the user of the reason for
          suspension.
        </p>
      </>
    ),
  },

  {
    number: 34,
    title: "Account Termination",
    content: (
      <>
        <p>We may terminate an account where appropriate, including where a user:</p>

        <ul>
          <li>Seriously or repeatedly breaches these Terms.</li>
          <li>Engages in fraudulent activity.</li>
          <li>Uses the Platform for illegal purposes.</li>
          <li>Threatens other users.</li>
          <li>Attempts to compromise Platform security.</li>
          <li>Circumvents a previous ban.</li>
          <li>Repeatedly lists prohibited items.</li>
          <li>Abuses Platform features.</li>
        </ul>

        <p>Users may also close their own accounts.</p>

        <p>
          Termination does not necessarily remove information that we are legally required or
          permitted to retain.
        </p>
      </>
    ),
  },

  {
    number: 35,
    title: "Removal of Listings",
    content: (
      <>
        <p>Swap Correct may remove a listing where we reasonably believe that it:</p>

        <ul>
          <li>Violates these Terms.</li>
          <li>Contains prohibited content.</li>
          <li>Involves a prohibited item.</li>
          <li>Is fraudulent.</li>
          <li>Infringes another person’s rights.</li>
          <li>Creates a security risk.</li>
          <li>Creates a legal risk.</li>
          <li>Is misleading.</li>
          <li>Is spam.</li>
        </ul>
      </>
    ),
  },

  {
    number: 36,
    title: "No Guarantee That the Platform Will Always Be Available",
    content: (
      <>
        <p>
          We aim to provide a reliable Platform, but we do not guarantee uninterrupted availability.
        </p>

        <p>The Platform may occasionally be unavailable because of:</p>

        <ul>
          <li>Maintenance.</li>
          <li>Software updates.</li>
          <li>Security incidents.</li>
          <li>Server problems.</li>
          <li>Internet outages.</li>
          <li>Third-party failures.</li>
          <li>Cyberattacks.</li>
          <li>Circumstances beyond our reasonable control.</li>
        </ul>
      </>
    ),
  },

  {
    number: 37,
    title: "Platform Changes",
    content: (
      <>
        <p>We may modify, suspend, replace or discontinue features of Swap Correct.</p>

        <p>We may:</p>

        <ul>
          <li>Add new features.</li>
          <li>Remove features.</li>
          <li>Change the interface.</li>
          <li>Change search functionality.</li>
          <li>Change moderation systems.</li>
          <li>Introduce optional paid services.</li>
          <li>Change technical requirements.</li>
        </ul>

        <p>Where legally required, we will provide appropriate notice of material changes.</p>
      </>
    ),
  },

  {
    number: 38,
    title: "Disclaimer of Warranties",
    content: (
      <>
        <p>
          To the maximum extent permitted by law, Swap Correct provides the Platform on an “as
          available” basis.
        </p>

        <p>We do not guarantee that:</p>

        <ul>
          <li>The Platform will always operate without interruption.</li>
          <li>Listings will always be accurate.</li>
          <li>Users will always behave honestly.</li>
          <li>Exchanges will be completed.</li>
          <li>Items will be genuine.</li>
          <li>Items will be safe.</li>
          <li>Users will honour their agreements.</li>
          <li>Content will always be available.</li>
          <li>The Platform will be completely free from errors or security threats.</li>
        </ul>

        <p>
          Nothing in these Terms excludes statutory rights or protections that cannot lawfully be
          excluded.
        </p>
      </>
    ),
  },

  {
    number: 39,
    title: "Limitation of Liability",
    content: (
      <>
        <p>
          To the maximum extent permitted by applicable law, Swap Correct will not be liable for
          losses that arise solely from:
        </p>

        <ul>
          <li>User-to-user exchanges.</li>
          <li>Conduct of another user.</li>
          <li>User-generated listings.</li>
          <li>Misrepresentations made by users.</li>
          <li>Fraud committed by users.</li>
          <li>Theft occurring during a user-arranged exchange.</li>
          <li>Damage to an item after it leaves the control of Swap Correct.</li>
          <li>Failure of users to attend an exchange.</li>
          <li>Independent transportation arrangements.</li>
          <li>Communications between users.</li>
          <li>Decisions made by users based on information supplied by other users.</li>
        </ul>

        <p>
          Nothing in these Terms excludes or limits liability that cannot lawfully be excluded or
          limited, including liability for death or personal injury caused by negligence where
          applicable, fraud or fraudulent misrepresentation, or any statutory rights or liability
          that cannot legally be excluded.
        </p>
      </>
    ),
  },

  {
    number: 40,
    title: "Your Responsibility for Your Decisions",
    content: (
      <>
        <p>You acknowledge that you use Swap Correct voluntarily.</p>

        <p>
          You are responsible for evaluating the risks associated with exchanging items with another
          person.
        </p>

        <p>
          You should not assume that Swap Correct has independently verified a person merely because
          that person has an account.
        </p>

        <p>
          Verification badges or similar features, if provided, should not be interpreted as a
          guarantee that a user is trustworthy or that an exchange will be successful.
        </p>
      </>
    ),
  },

  {
    number: 41,
    title: "Indemnity",
    content: (
      <>
        <p>
          To the extent permitted by law, you agree to compensate Swap Correct for reasonable
          losses, claims, liabilities, costs and expenses arising from your:
        </p>

        <ul>
          <li>Breach of these Terms.</li>
          <li>Unlawful use of the Platform.</li>
          <li>Fraudulent activity.</li>
          <li>Misuse of the Platform.</li>
          <li>Infringement of another person’s rights.</li>
          <li>Unauthorised content.</li>
          <li>Violation of another person’s privacy.</li>
          <li>Violation of intellectual property rights.</li>
        </ul>

        <p>
          This clause does not apply to the extent that the relevant loss was caused by Swap
          Correct’s own unlawful conduct.
        </p>
      </>
    ),
  },

  {
    number: 42,
    title: "Third-Party Services",
    content: (
      <>
        <p>Swap Correct may use third-party services, including:</p>

        <ul>
          <li>Hosting providers.</li>
          <li>Cloud providers.</li>
          <li>Analytics providers.</li>
          <li>Email services.</li>
          <li>Identity verification providers.</li>
          <li>Payment providers.</li>
          <li>Security providers.</li>
          <li>Mapping services.</li>
          <li>Communication providers.</li>
        </ul>

        <p>Third-party services may have their own terms and privacy policies.</p>

        <p>
          Swap Correct is not responsible for independent third-party services except where
          applicable law provides otherwise.
        </p>
      </>
    ),
  },

  {
    number: 43,
    title: "Third-Party Links",
    content: (
      <>
        <p>The Platform may contain links to websites operated by third parties.</p>

        <p>
          We do not control those websites and are not responsible for their content, availability,
          security or privacy practices.
        </p>

        <p>You access third-party websites at your own risk.</p>
      </>
    ),
  },

  {
    number: 44,
    title: "Privacy",
    content: (
      <>
        <p>Your use of Swap Correct is also subject to our Privacy Policy.</p>

        <p>Our Privacy Policy explains:</p>

        <ul>
          <li>What personal information we collect.</li>
          <li>How we use personal information.</li>
          <li>How we protect personal information.</li>
          <li>When we share information.</li>
          <li>Your data protection rights.</li>
        </ul>

        <p>
          The Privacy Policy forms part of the overall legal framework governing use of the
          Platform.
        </p>
      </>
    ),
  },

  {
    number: 45,
    title: "Data Protection",
    content: (
      <>
        <p>
          Swap Correct will process personal information in accordance with applicable data
          protection legislation.
        </p>

        <p>Users must also respect the privacy of other users.</p>

        <p>
          You must not collect, store, sell or misuse another user’s personal information without a
          lawful basis.
        </p>
      </>
    ),
  },

  {
    number: 46,
    title: "Security",
    content: (
      <>
        <p>You must not attempt to:</p>

        <ul>
          <li>Hack the Platform.</li>
          <li>Circumvent security measures.</li>
          <li>Access another person’s account.</li>
          <li>Introduce malicious software.</li>
          <li>Interfere with Platform infrastructure.</li>
          <li>Scrape data in violation of our rules.</li>
          <li>Conduct denial-of-service attacks.</li>
          <li>Reverse engineer systems where prohibited by law.</li>
        </ul>

        <p>We may report suspected criminal activity to appropriate authorities.</p>
      </>
    ),
  },

  {
    number: 47,
    title: "Acceptable Use",
    content: (
      <>
        <p>You agree to use Swap Correct only for lawful purposes.</p>

        <p>You must not use the Platform to:</p>

        <ul>
          <li>Commit fraud.</li>
          <li>Facilitate crime.</li>
          <li>Harass people.</li>
          <li>Threaten people.</li>
          <li>Discriminate unlawfully.</li>
          <li>Distribute malicious software.</li>
          <li>Sell prohibited goods.</li>
          <li>Launder money.</li>
          <li>Facilitate trafficking.</li>
          <li>Impersonate another person.</li>
          <li>Circumvent security.</li>
          <li>Manipulate listings.</li>
          <li>Manipulate reviews.</li>
          <li>Create fraudulent accounts.</li>
        </ul>
      </>
    ),
  },

  {
    number: 48,
    title: "Child Safety",
    content: (
      <>
        <p>Users must not use Swap Correct to exploit, abuse or endanger children.</p>

        <p>
          Any content involving child sexual exploitation or other serious abuse may be removed and
          reported to appropriate authorities where required or appropriate.
        </p>
      </>
    ),
  },

  {
    number: 49,
    title: "Disputes Between Users",
    content: (
      <>
        <p>
          If two users have a disagreement concerning an exchange, they should first attempt to
          resolve the matter directly and safely.
        </p>

        <p>Swap Correct may, at its discretion, assist with platform-related complaints.</p>

        <p>
          However, unless Swap Correct has expressly agreed to provide a dispute-resolution service,
          Swap Correct does not act as an arbitrator or judge between users.
        </p>

        <p>
          Swap Correct may take action against accounts where there is evidence of fraud, abuse or
          violation of these Terms.
        </p>
      </>
    ),
  },

  {
    number: 50,
    title: "No Guarantee of Dispute Resolution",
    content: (
      <>
        <p>Reporting a dispute to Swap Correct does not guarantee:</p>

        <ul>
          <li>A refund.</li>
          <li>Replacement of an item.</li>
          <li>Return of an item.</li>
          <li>Compensation.</li>
          <li>Recovery of property.</li>
          <li>Recovery of money.</li>
          <li>A particular outcome.</li>
        </ul>

        <p>We may investigate matters within our technical and operational ability.</p>
      </>
    ),
  },

  {
    number: 51,
    title: "Evidence and Records",
    content: (
      <>
        <p>Where permitted by law, Swap Correct may retain records relevant to:</p>

        <ul>
          <li>Account activity.</li>
          <li>Listings.</li>
          <li>Reports.</li>
          <li>Messages.</li>
          <li>Security incidents.</li>
          <li>Fraud investigations.</li>
          <li>Complaints.</li>
          <li>Terms violations.</li>
        </ul>

        <p>
          Such records may be used to protect users, enforce these Terms and comply with legal
          obligations.
        </p>
      </>
    ),
  },

  {
    number: 52,
    title: "Communications from Swap Correct",
    content: (
      <>
        <p>We may contact you regarding:</p>

        <ul>
          <li>Your account.</li>
          <li>Security.</li>
          <li>Listings.</li>
          <li>Exchanges.</li>
          <li>Reports.</li>
          <li>Platform changes.</li>
          <li>Legal notices.</li>
          <li>Important service announcements.</li>
        </ul>

        <p>
          Some communications are necessary for operation of the Platform and cannot necessarily be
          opted out of.
        </p>

        <p>Marketing communications will be handled in accordance with applicable law.</p>
      </>
    ),
  },

  {
    number: 53,
    title: "Changes to These Terms",
    content: (
      <>
        <p>We may update these Terms from time to time.</p>

        <p>Changes may be made because of:</p>

        <ul>
          <li>Changes in law.</li>
          <li>Changes to the Platform.</li>
          <li>New features.</li>
          <li>Security requirements.</li>
          <li>Changes to our business.</li>
          <li>Regulatory requirements.</li>
        </ul>

        <p>The updated Terms will be posted on the Platform.</p>

        <p>Where required by law, we will provide reasonable notice of significant changes.</p>

        <p>
          Your continued use of Swap Correct after the effective date of revised Terms may
          constitute acceptance where legally permissible.
        </p>
      </>
    ),
  },

  {
    number: 54,
    title: "Severability",
    content: (
      <>
        <p>
          If any provision of these Terms is found to be invalid, unlawful or unenforceable, the
          remaining provisions will continue to apply to the extent permitted by law.
        </p>

        <p>
          The invalid provision should, where legally possible, be interpreted or modified to
          achieve the closest lawful effect to the original intention.
        </p>
      </>
    ),
  },

  {
    number: 55,
    title: "No Waiver",
    content: (
      <>
        <p>
          If Swap Correct does not immediately enforce a provision of these Terms, this does not
          mean that we have permanently waived our right to enforce that provision.
        </p>
      </>
    ),
  },

  {
    number: 56,
    title: "Assignment",
    content: (
      <>
        <p>
          You may not transfer your rights or obligations under these Terms without our written
          consent where such consent is legally required.
        </p>

        <p>Swap Correct may transfer or assign its rights and obligations as part of:</p>

        <ul>
          <li>A business sale.</li>
          <li>Merger.</li>
          <li>Corporate restructuring.</li>
          <li>Acquisition.</li>
          <li>Transfer of the Platform.</li>
          <li>Other legitimate business transaction.</li>
        </ul>

        <p>All subject to applicable law.</p>
      </>
    ),
  },

  {
    number: 57,
    title: "Entire Agreement",
    content: (
      <>
        <p>
          These Terms, together with the Privacy Policy and any additional policies expressly
          incorporated into them, constitute the agreement between you and Swap Correct concerning
          your use of the Platform, subject to any mandatory legal rights.
        </p>
      </>
    ),
  },

  {
    number: 58,
    title: "Governing Law",
    content: (
      <>
        <p>
          Unless mandatory consumer protection law in your country requires otherwise, these Terms
          shall be governed by the laws of England and Wales.
        </p>

        <p>
          Where you are a consumer, you may also have mandatory legal rights under the laws of the
          country in which you live, and nothing in these Terms is intended to remove rights that
          cannot lawfully be removed.
        </p>
      </>
    ),
  },

  {
    number: 59,
    title: "Jurisdiction",
    content: (
      <>
        <p>
          Subject to any mandatory consumer rights applicable to you, the courts of England and
          Wales shall have jurisdiction over disputes relating to these Terms.
        </p>

        <p>
          Nothing in this clause prevents a consumer from relying on mandatory rights concerning
          where legal proceedings may be brought.
        </p>
      </>
    ),
  },

  {
    number: 60,
    title: "Contacting Swap Correct",
    content: (
      <>
        <p>
          If you have questions, complaints or concerns about the Platform or these Terms, contact:
        </p>

        <address className="not-italic leading-7">
          <strong>Swap Correct</strong>
          <br />
          [Legal Business Name]
          <br />
          [Registered Address]
          <br />
          [City]
          <br />
          [Postcode]
          <br />
          United Kingdom
          <br />
          Email: [support@yourdomain.com]
          <br />
          Legal/Privacy Email: [privacy@yourdomain.com]
        </address>
      </>
    ),
  },

  {
    number: 61,
    title: "Reporting a Scam or Prohibited Activity",
    content: (
      <>
        <p>If you believe another user is attempting to scam you:</p>

        <ol>
          <li>Stop communicating if you feel unsafe.</li>
          <li>Do not send money or personal information.</li>
          <li>Do not send the item.</li>
          <li>Preserve relevant messages and evidence.</li>
          <li>Report the account or listing to Swap Correct.</li>
          <li>Contact the police or relevant authority where appropriate.</li>
        </ol>

        <p>Swap Correct may investigate reports and take action in accordance with these Terms.</p>
      </>
    ),
  },

  {
    number: 62,
    title: "Important Limitation of the Swap Correct Role",
    content: (
      <>
        <p>
          You expressly acknowledge that Swap Correct is a technology platform designed to connect
          users. It is not ordinarily the owner, seller, buyer, manufacturer, carrier, insurer,
          guarantor or custodian of items listed by users.
        </p>

        <p>
          Unless expressly stated otherwise, Swap Correct does not take possession of items
          exchanged by users.
        </p>

        <p>
          The responsibility for determining whether to enter into an exchange remains with the
          users involved.
        </p>
      </>
    ),
  },

  {
    number: 63,
    title: "No Insurance or Guarantee",
    content: (
      <>
        <p>Unless expressly stated otherwise, Swap Correct does not provide insurance covering:</p>

        <ul>
          <li>Items.</li>
          <li>Exchanges.</li>
          <li>Theft.</li>
          <li>Loss.</li>
          <li>Damage.</li>
          <li>Personal property.</li>
          <li>Transportation.</li>
          <li>User conduct.</li>
        </ul>

        <p>Users are responsible for obtaining any insurance they consider appropriate.</p>
      </>
    ),
  },

  {
    number: 64,
    title: "Personal Safety Disclaimer",
    content: (
      <>
        <p>Meeting strangers involves inherent risks.</p>

        <p>
          Users should make their own safety decisions and should not rely on Swap Correct to
          guarantee their personal safety.
        </p>

        <p>
          If you believe a proposed exchange could put you or another person in danger, do not
          proceed.
        </p>

        <p>In an emergency, contact the appropriate emergency services.</p>
      </>
    ),
  },

  {
    number: 65,
    title: "Business Users and Traders",
    content: (
      <>
        <p>
          Swap Correct may permit businesses or professional traders to use the Platform. A business
          or trader must identify itself accurately where required by law.
        </p>

        <p>Business users may have additional legal obligations concerning:</p>

        <ul>
          <li>Consumer rights.</li>
          <li>Product safety.</li>
          <li>Descriptions.</li>
          <li>Advertising.</li>
          <li>Reviews.</li>
          <li>Unfair commercial practices.</li>
          <li>Tax.</li>
          <li>Trading standards.</li>
          <li>Product liability.</li>
        </ul>

        <p>
          Nothing in these Terms is intended to allow a business user to avoid legal obligations
          that apply to it.
        </p>
      </>
    ),
  },

  {
    number: 66,
    title: "Consumer Rights",
    content: (
      <>
        <p>
          Nothing in these Terms is intended to remove or reduce mandatory legal rights available to
          consumers.
        </p>

        <p>Where applicable, statutory rights and protections continue to apply.</p>

        <p>
          Any limitation of liability in these Terms applies only to the extent permitted by
          applicable law.
        </p>

        <p>
          UK consumer contract terms must be fair and transparent, and unfair terms may not be
          binding.
        </p>
      </>
    ),
  },

  {
    number: 67,
    title: "Product Safety",
    content: (
      <>
        <p>
          Users must not list products that they know, or reasonably should know, present an
          unacceptable safety risk or violate applicable product-safety laws.
        </p>

        <p>
          Where a safety concern is reported, Swap Correct may remove the listing and take further
          action.
        </p>

        <p>Users should report dangerous products promptly.</p>
      </>
    ),
  },

  {
    number: 68,
    title: "Recalls and Safety Notices",
    content: (
      <>
        <p>
          If a user becomes aware that an item listed on Swap Correct has been recalled or is
          subject to a serious safety warning, the user should immediately stop offering the item
          and notify Swap Correct where appropriate.
        </p>

        <p>Swap Correct may remove listings affected by safety recalls.</p>
      </>
    ),
  },

  {
    number: 69,
    title: "Prohibition on Platform Manipulation",
    content: (
      <>
        <p>Users must not artificially manipulate:</p>

        <ul>
          <li>Search results.</li>
          <li>Listing visibility.</li>
          <li>Reviews.</li>
          <li>Ratings.</li>
          <li>User engagement.</li>
          <li>Account popularity.</li>
          <li>Exchange statistics.</li>
        </ul>

        <p>
          This includes using bots, automated accounts or multiple accounts for improper purposes.
        </p>
      </>
    ),
  },

  {
    number: 70,
    title: "Third-Party Intellectual Property Claims",
    content: (
      <>
        <p>
          If you believe content on Swap Correct infringes your copyright, trademark or other
          intellectual property rights, you may contact us with sufficient information to
          investigate the complaint.
        </p>

        <p>We may remove or restrict allegedly infringing content where appropriate.</p>
      </>
    ),
  },

  {
    number: 71,
    title: "Force Majeure",
    content: (
      <>
        <p>
          Swap Correct will not be responsible for failure or delay caused by circumstances beyond
          our reasonable control, including:
        </p>

        <ul>
          <li>Natural disasters.</li>
          <li>War.</li>
          <li>Terrorism.</li>
          <li>Civil unrest.</li>
          <li>Government action.</li>
          <li>Major internet outages.</li>
          <li>Cyberattacks.</li>
          <li>Infrastructure failures.</li>
          <li>Power failures.</li>
          <li>Third-party service failures.</li>
          <li>Pandemics or similar events.</li>
          <li>Other events beyond reasonable control.</li>
        </ul>

        <p>This clause does not remove any mandatory legal rights.</p>
      </>
    ),
  },

  {
    number: 72,
    title: "Electronic Acceptance",
    content: (
      <>
        <p>
          By selecting “I Agree”, creating an account, listing an item, sending an exchange request
          or otherwise using Swap Correct after being given reasonable notice of these Terms, you
          acknowledge that you agree to these Terms to the extent permitted by applicable law.
        </p>
      </>
    ),
  },

  {
    number: 73,
    title: "Acknowledgement",
    content: (
      <>
        <p>By using Swap Correct, you acknowledge that:</p>

        <ol>
          <li>Swap Correct is primarily a platform connecting users.</li>
          <li>
            Items listed on the Platform are generally owned or controlled by users rather than Swap
            Correct.
          </li>
          <li>Users are responsible for assessing the people and items with whom they exchange.</li>
          <li>Exchanges are generally private arrangements between participating users.</li>
          <li>Swap Correct does not guarantee that an exchange will be completed.</li>
          <li>Swap Correct does not guarantee that another user is honest or trustworthy.</li>
          <li>
            Swap Correct does not guarantee the condition, authenticity, ownership or safety of
            every item.
          </li>
          <li>
            Swap Correct cannot guarantee that the Platform will be completely free from fraud,
            scams or misuse.
          </li>
          <li>Users should take reasonable precautions before completing an exchange.</li>
          <li>
            To the maximum extent permitted by law, Swap Correct is not responsible for losses
            arising from independent user-to-user exchanges.
          </li>
          <li>
            Nothing in these Terms removes legal rights or liabilities that cannot lawfully be
            excluded.
          </li>
        </ol>
      </>
    ),
  },

  {
    number: 74,
    title: "Final Agreement",
    content: (
      <>
        <p>These Terms establish the rules for using Swap Correct.</p>

        <p>
          The aim of Swap Correct is to provide a simple and accessible environment where people can
          give their unwanted possessions a second life by exchanging them with others.
        </p>

        <p>Users are expected to act honestly, respectfully and responsibly.</p>

        <p>
          By using Swap Correct, you agree to follow these Terms and any additional policies
          published by Swap Correct.
        </p>
      </>
    ),
  },
];

export default function TermsAndConditionsPage() {
  const isMobile = useIsMobile();

  return (
    <>
      {!isMobile && <Herosection />}

      <div className="min-h-screen bg-white text-slate-700">
        {/* Header */}
        <section className="border-b border-slate-200 bg-slate-50">
          <div className="mx-auto max-w-5xl px-6 py-16 lg:px-8">
            <div className="max-w-3xl">
              <p className="mb-4 text-sm font-semibold uppercase tracking-wider text-[#007AFF]">
                Legal
              </p>

              <h1 className="text-4xl font-bold tracking-tight text-slate-950 sm:text-5xl">
                Terms &amp; Conditions
              </h1>

              <div className="mt-6 flex flex-col gap-2 text-sm text-slate-500 sm:flex-row sm:gap-6">
                <span>
                  <strong className="text-slate-700">Last Updated:</strong> 23 September 2026
                </span>

                <span>
                  <strong className="text-slate-700">Effective Date:</strong> 23 September 2026
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Content */}
        <section className="mx-auto max-w-5xl px-6 py-12 lg:px-8 lg:py-16">
          {/* Intro notice */}
          <div className="mb-12 rounded-2xl border border-[#007AFF] p-6">
            <p className="text-sm leading-7 text-[#000]">
              Please read these Terms &amp; Conditions carefully before using Swap Correct. By
              accessing or using the Platform, you acknowledge that you have read, understood and
              agree to be bound by these Terms, subject to applicable law.
            </p>
          </div>

          <div className="space-y-14">
            {sections.map((section) => (
              <article
                key={section.number}
                id={`section-${section.number}`}
                className="scroll-mt-24"
              >
                <div className="mb-5 flex items-start gap-4">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#007AFF] text-sm font-bold text-[#fff]">
                    {section.number}
                  </span>

                  <h2 className="pt-1 text-2xl font-bold tracking-tight text-slate-950">
                    {section.title}
                  </h2>
                </div>

                <div
                  className="
                  space-y-5 pl-0 text-[15px] leading-7 text-slate-600
                  sm:pl-[52px]
                  [&_ol]:ml-6
                  [&_ol]:list-decimal
                  [&_ol]:space-y-2
                  [&_ul]:ml-6
                  [&_ul]:list-disc
                  [&_ul]:space-y-2
                  [&_li]:pl-1
                  [&_p]:max-w-4xl
                "
                >
                  {section.content}
                </div>
              </article>
            ))}
          </div>
        </section>
      </div>
    </>
  );
}
