"use client";

import Herosection from "@/components/shared/herosection";
import Link from "next/link";
import useIsMobile from "../../_hooks/useIsMobile";
import Navbar from "@/components/shared/navbar";

export default function About() {
  const isMobile = useIsMobile();

  return (
    <>
      {!isMobile && <Herosection />}

      <div className="w-[85%] mx-auto my-12 space-y-12 text-gray-800 leading-relaxed">
        {/* Header */}
        <div className="text-center space-y-3">
          <h1 className="text-4xl font-extrabold tracking-tight text-gray-900">
            ABOUT SWAP CORRECT
          </h1>
          <p className="text-xl font-semibold text-[#007AFF]">
            Swap What You Have. Find What You Need.
          </p>
        </div>

        {/* Intro */}
        <div className="space-y-4">
          <p className="text-base">
            Welcome to Swap Correct — a platform created to make it easier for people to exchange
            items they already own with other people who have something they need or want.
          </p>
          <p className="text-base">
            We believe that having something you no longer use does not necessarily mean it has lost
            its value.
          </p>
          <p className="text-base">Someone else may need it.</p>
          <p className="text-base">
            At the same time, you may be looking for something that another person already has but
            no longer needs.
          </p>
          <p className="text-base">Swap Correct brings these people together.</p>
          <p className="text-base pl-4 border-l-2 border-[#007AFF]">
            Instead of everything having to be bought and sold for money, Swap Correct creates a
            simple way for people to exchange useful items directly with one another.
          </p>
        </div>

        <hr className="border-gray-200" />

        {/* Our Idea */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-gray-900">OUR IDEA</h2>
          <p className="text-base">Every home contains items that are no longer being used.</p>
          <ul className="list-disc pl-6 space-y-1 text-base">
            <li>A piece of furniture sitting in a spare room.</li>
            <li>A phone that has been replaced.</li>
            <li>Clothes that no longer fit.</li>
            <li>Tools that are rarely used.</li>
            <li>Books that have already been read.</li>
            <li>Children’s items that have been outgrown.</li>
            <li>Electronics that are no longer needed.</li>
          </ul>
          <p className="text-base">
            At the same time, someone else may be searching for exactly those things.
          </p>
          <p className="text-base">
            The traditional approach is to sell the unwanted item, receive money and then use that
            money to purchase something else.
          </p>
          <p className="text-base">Swap Correct offers another option: exchange.</p>
          <p className="text-base pl-4 border-l-2 border-[#007AFF]">
            You may already have something that another person wants, while they have something you
            need.
          </p>
          <p className="text-base">That’s where the idea of Swap Correct begins.</p>
        </div>

        <hr className="border-gray-200" />

        {/* How Swap Correct Works */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-gray-900">HOW SWAP CORRECT WORKS</h2>
          <p className="text-base">Using Swap Correct is designed to be straightforward.</p>

          <div className="space-y-6 pl-2">
            <div>
              <h3 className="text-lg font-bold text-gray-900">1. CREATE YOUR ACCOUNT</h3>
              <p className="text-base">Create your Swap Correct account and build your profile.</p>
              <p className="text-base">
                Your profile helps other users understand who they are dealing with when considering
                an exchange.
              </p>
            </div>

            <hr className="border-gray-100" />

            <div>
              <h3 className="text-lg font-bold text-gray-900">2. LIST AN ITEM</h3>
              <p className="text-base">List something you own and would like to exchange.</p>
              <p className="text-base">
                Add photographs and provide an accurate description of the item.
              </p>
              <p className="text-base">
                You should explain its condition, any defects or damage, what is included and any
                other information another user should know.
              </p>
              <p className="text-base pl-4 border-l-2 border-[#007AFF] mt-2">
                The better the information you provide, the easier it is for someone to decide
                whether the item is right for them.
              </p>
            </div>

            <hr className="border-gray-100" />

            <div>
              <h3 className="text-lg font-bold text-gray-900">3. DISCOVER ITEMS</h3>
              <p className="text-base">Browse the items available on Swap Correct.</p>
              <p className="text-base">
                You can search for things you need or discover items you may not have considered
                before.
              </p>
              <p className="text-base pl-4 border-l-2 border-[#007AFF] mt-2">
                You may find something that is useful to you while the owner is interested in
                something you already have.
              </p>
            </div>

            <hr className="border-gray-100" />

            <div>
              <h3 className="text-lg font-bold text-gray-900">4. FIND A MATCH</h3>
              <p className="text-base">
                When you find an item you are interested in, look at the listing carefully. Consider
                the condition, description, photographs and the person offering the item. You can
                then communicate with the other user and discuss a possible exchange.
              </p>
            </div>

            <hr className="border-gray-100" />

            <div>
              <h3 className="text-lg font-bold text-gray-900">5. AGREE ON THE SWAP</h3>
              <p className="text-base mb-2">
                Both users should agree on exactly what will be exchanged before proceeding. For
                example:
              </p>
              <p className="font-semibold text-[#007AFF] mb-2">Your item → Their item</p>
              <p className="text-base">Both parties should be clear about:</p>
              <ul className="list-disc pl-6 space-y-1 text-base">
                <li>The items being exchanged</li>
                <li>Their condition</li>
                <li>Any included accessories</li>
                <li>Collection or delivery arrangements</li>
                <li>Who is responsible for delivery costs</li>
                <li>When the exchange will take place</li>
              </ul>
              <p className="text-base mt-2">
                A swap should only proceed when both users are comfortable with the agreement.
              </p>
            </div>
          </div>
        </div>

        <hr className="border-gray-200" />

        {/* Two Ways to Complete a Swap */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-gray-900">TWO WAYS TO COMPLETE A SWAP</h2>

          <div className="space-y-4">
            <h3 className="text-xl font-bold text-gray-900">IN-PERSON EXCHANGE</h3>
            <p className="text-base pl-4 border-l-2 border-[#007AFF]">
              If both users live close enough, they may choose to meet and exchange their items
              directly.
            </p>
            <p className="text-base">Where possible, choose a safe and public location.</p>
            <p className="text-base">
              Users should inspect the items before completing the exchange where practical.
              Personal safety should always come first.
            </p>
          </div>

          <hr className="border-gray-100" />

          <div className="space-y-4">
            <h3 className="text-xl font-bold text-gray-900">REMOTE EXCHANGE</h3>
            <p className="text-base">Not every swapper will live nearby.</p>
            <p className="text-base pl-4 border-l-2 border-[#007AFF]">
              If meeting is not practical, users may agree to exchange their items through postage
              or delivery.
            </p>
            <p className="text-base">
              Where the parties use the Swap Correct remote-swap arrangement, the visitor requesting
              the listed item sends their agreed item first.
            </p>
            <p className="text-base">
              Once the listed-item owner receives it, they send their agreed item in return.
            </p>
            <p className="text-base pl-4 border-l-2 border-[#007AFF]">
              Both parties should use suitable delivery services and keep proof of postage and
              tracking information.
            </p>
            <p className="text-base pl-4 border-l-2 border-[#007AFF]">
              Remote exchanges are arrangements between the users involved. Swap Correct does not
              normally take possession of, store or physically exchange the items.
            </p>
          </div>
        </div>

        <hr className="border-gray-200" />

        {/* What Makes Swap Correct Different? */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-gray-900">WHAT MAKES SWAP CORRECT DIFFERENT?</h2>

          <div className="space-y-4">
            <h3 className="text-lg font-bold text-gray-900">
              YOU DON’T ALWAYS NEED MONEY TO GET SOMETHING YOU NEED
            </h3>
            <p className="text-base pl-4 border-l-2 border-[#007AFF]">
              Money is useful, but it isn’t the only way people can exchange value. You may have
              something you no longer need that another person values. Someone else may have
              something you need but no longer want.
            </p>
            <p className="text-base">
              Swap Correct creates a place where those two needs can meet.
            </p>
          </div>

          <hr className="border-gray-100" />

          <div className="space-y-4">
            <h3 className="text-lg font-bold text-gray-900">GIVE UNUSED ITEMS A NEW PURPOSE</h3>
            <p className="text-base">
              Instead of leaving useful items unused, swapping can give them another life.
            </p>
            <p className="text-base">
              An item that has become unnecessary to one person may become valuable to someone else.
            </p>
            <p className="text-base pl-4 border-l-2 border-[#007AFF]">
              This can help people make better use of things they already have rather than
              automatically purchasing something new.
            </p>
          </div>

          <hr className="border-gray-100" />

          <div className="space-y-4">
            <h3 className="text-lg font-bold text-gray-900">A COMMUNITY BUILT AROUND EXCHANGE</h3>
            <p className="text-base">Swap Correct is more than a collection of listings.</p>
            <p className="text-base pl-4 border-l-2 border-[#007AFF]">
              It is a community of people offering things they already have and looking for things
              they actually need.
            </p>
            <p className="text-base">Every listing creates an opportunity for another person.</p>
            <p className="text-base">
              Every successful swap creates a connection between two users.
            </p>
          </div>

          <hr className="border-gray-100" />

          <div className="space-y-4">
            <h3 className="text-lg font-bold text-gray-900">USERS ARE IN CONTROL</h3>
            <p className="text-base">Swap Correct provides the platform.</p>
            <p className="text-base pl-4 border-l-2 border-[#007AFF]">
              Users decide what they want to offer, what they are interested in receiving and
              whether they want to proceed with an exchange.
            </p>
            <p className="text-base">You are not required to accept an offer.</p>
            <p className="text-base">You can ask questions.</p>
            <p className="text-base">You can negotiate the exchange.</p>
            <p className="text-base">You can decline an offer.</p>
            <p className="text-base">
              And, before the exchange is completed, you can decide not to proceed if you are no
              longer comfortable.
            </p>
          </div>
        </div>

        <hr className="border-gray-200" />

        {/* Safety */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-gray-900">SAFETY IS IMPORTANT TO US</h2>
          <p className="text-base">Person-to-person exchanges require common sense and care.</p>
          <p className="text-base">
            That’s why Swap Correct provides a Swap Safety Centre with practical guidance for users.
          </p>
          <p className="text-base">We encourage members to:</p>
          <ul className="list-disc pl-6 space-y-1 text-base">
            <li>Check listings carefully.</li>
            <li>Ask questions about condition and ownership.</li>
            <li>Protect personal information.</li>
            <li>Be cautious about suspicious behaviour.</li>
            <li>Use safe meeting locations.</li>
            <li>Keep delivery records.</li>
            <li>Report suspicious listings or users.</li>
            <li>Never feel pressured into completing a swap.</li>
          </ul>
          <p className="text-base">
            Swap Correct can provide safety tools, rules and reporting systems, but no online
            platform can eliminate every risk.
          </p>
          <p className="text-base">Users should always make their own informed decisions.</p>
        </div>

        <hr className="border-gray-200" />

        {/* Authenticity */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-gray-900">AUTHENTICITY AND HONEST LISTINGS</h2>
          <p className="text-base">Trust is an important part of swapping.</p>
          <p className="text-base">
            Users are expected to describe their items honestly and accurately. Items must not
            knowingly be counterfeit, stolen or unlawfully obtained.
          </p>
          <p className="text-base pl-4 border-l-2 border-[#007AFF]">
            Where appropriate, users may be asked to provide evidence relating to authenticity or
            ownership.
          </p>
          <p className="text-base pl-4 border-l-2 border-[#007AFF]">
            Swap Correct may remove listings or restrict accounts where there are reasonable
            concerns about counterfeit goods, fraud, prohibited items or misleading information.
          </p>
          <p className="text-base pl-4 border-l-2 border-[#007AFF]">
            However, the presence of an item on the platform does not automatically mean that Swap
            Correct has independently authenticated it.
          </p>
          <p className="text-base pl-4 border-l-2 border-[#007AFF]">
            Users should carry out appropriate checks before completing an exchange.
          </p>
        </div>

        <hr className="border-gray-200" />

        {/* What Can You Swap? */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-gray-900">WHAT CAN YOU SWAP?</h2>
          <p className="text-base">
            The types of items available will depend on the platform’s categories and rules.
            Examples may include:
          </p>
          <div className="space-y-3 pl-2">
            <div>
              <h3 className="font-bold text-gray-900">Electronics</h3>
              <p className="text-base">
                Phones, tablets, cameras, gaming equipment and other permitted technology.
              </p>
            </div>
            <div>
              <h3 className="font-bold text-gray-900">Home & Furniture</h3>
              <p className="text-base">
                Furniture, household equipment, decorations and useful home items.
              </p>
            </div>
            <div>
              <h3 className="font-bold text-gray-900">Fashion</h3>
              <p className="text-base">Clothing, shoes, bags and other permitted fashion items.</p>
            </div>
            <div>
              <h3 className="font-bold text-gray-900">Books & Media</h3>
              <p className="text-base">Books, games and other permitted media.</p>
            </div>
            <div>
              <h3 className="font-bold text-gray-900">Hobbies & Leisure</h3>
              <p className="text-base">
                Sports equipment, musical equipment, games, tools and hobby-related items.
              </p>
            </div>
            <div>
              <h3 className="font-bold text-gray-900">Children’s Items</h3>
              <p className="text-base">
                Suitable toys, clothing, books and other permitted children’s products.
              </p>
            </div>
          </div>
          <p className="text-base pl-4 border-l-2 border-[#007AFF]">
            The platform may introduce additional categories as Swap Correct grows.
          </p>
        </div>

        <hr className="border-gray-200" />

        {/* What Cannot Be Swapped? */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-gray-900">WHAT CANNOT BE SWAPPED?</h2>
          <p className="text-base">Not everything is suitable for a person-to-person exchange.</p>
          <p className="text-base pl-4 border-l-2 border-[#007AFF]">
            Swap Correct prohibits items that are illegal, stolen, counterfeit, dangerous or
            otherwise prohibited by its rules or applicable law.
          </p>
          <p className="text-base pl-4 border-l-2 border-[#007AFF]">
            This may include prohibited weapons, illegal drugs, fraudulent documents, stolen goods
            and other restricted or unlawful items.
          </p>
          <p className="text-base pl-4 border-l-2 border-[#007AFF]">
            Users are responsible for ensuring that their listings comply with the platform’s rules.
          </p>
        </div>

        <hr className="border-gray-200" />

        {/* The Role of Swap Correct */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-gray-900">THE ROLE OF SWAP CORRECT</h2>
          <p className="text-base pl-4 border-l-2 border-[#007AFF]">
            Swap Correct provides the technology and community environment that allows users to
            discover one another and arrange potential exchanges.
          </p>
          <p className="text-base">
            Unless Swap Correct expressly provides a particular service, it does not normally:
          </p>
          <ul className="list-disc pl-6 space-y-1 text-base">
            <li>Own the items listed by users;</li>
            <li>Take possession of users’ items;</li>
            <li>Determine the value of an item;</li>
            <li>Guarantee that a user is genuine;</li>
            <li>Guarantee that an item is genuine;</li>
            <li>Guarantee that an item is in a particular condition;</li>
            <li>Arrange independent delivery;</li>
            <li>Act as a party to every exchange.</li>
          </ul>
          <p className="text-base pl-4 border-l-2 border-[#007AFF]">
            The actual exchange is normally an arrangement between the users involved.
          </p>
        </div>

        <hr className="border-gray-200" />

        {/* Fair Exchange */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-gray-900">OUR APPROACH TO FAIR EXCHANGE</h2>
          <p className="text-base">There is no universal definition of an “equal” swap.</p>
          <p className="text-base">One person may value an item because they need it.</p>
          <p className="text-base">
            Another person may value an item because they no longer use it.
          </p>
          <p className="text-base">
            A swap does not necessarily need to have identical monetary value for both parties to
            consider it worthwhile.
          </p>
          <p className="text-base pl-4 border-l-2 border-[#007AFF]">
            What matters is that both users understand what they are exchanging and voluntarily
            agree to the arrangement.
          </p>
        </div>

        <hr className="border-gray-200" />

        {/* When a Swap Doesn't Work */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-gray-900">WHEN A SWAP DOESN’T WORK</h2>
          <p className="text-base">Not every proposed exchange will result in a successful swap.</p>
          <p className="text-base">Someone may decline an offer.</p>
          <p className="text-base">An item may no longer be available.</p>
          <p className="text-base">A delivery may be delayed.</p>
          <p className="text-base">
            A user may change their mind before the exchange is completed. Users should communicate
            clearly and respectfully when this happens.
          </p>
          <p className="text-base pl-4 border-l-2 border-[#007AFF]">
            If behaviour appears fraudulent, abusive or otherwise violates Swap Correct’s rules,
            users should report it.
          </p>
        </div>

        <hr className="border-gray-200" />

        {/* Building a Trusted Community */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-gray-900">BUILDING A TRUSTED COMMUNITY</h2>
          <p className="text-base">
            A successful swapping community depends on responsible participation. We encourage every
            member to:
          </p>
          <p className="text-base">List honestly.</p>
          <p className="text-base">Communicate clearly.</p>
          <p className="text-base">Respect other users.</p>
          <p className="text-base">Keep agreements.</p>
          <p className="text-base">Protect personal information.</p>
          <p className="text-base">Report suspicious activity.</p>
          <p className="text-base">Treat every exchange responsibly.</p>
          <p className="text-base pl-4 border-l-2 border-[#007AFF]">
            The more accurately people describe their items and the more respectfully they
            communicate, the better the experience can be for everyone.
          </p>
        </div>

        <hr className="border-gray-200" />

        {/* Vision */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-gray-900">OUR VISION</h2>
          <p className="text-base pl-4 border-l-2 border-[#007AFF]">
            We envision a platform where people look at what they already have before automatically
            thinking about what they need to buy.
          </p>
          <p className="text-base">A world where unused items can continue to be useful.</p>
          <p className="text-base">Where people can discover unexpected exchanges.</p>
          <p className="text-base pl-4 border-l-2 border-[#007AFF]">
            Where one person’s unwanted item can become another person’s valuable possession. And
            where communities can connect through something as simple as: “I have something you
            need. You have something I need.”
          </p>
          <p className="text-base">That is the idea behind Swap Correct.</p>
        </div>

        <hr className="border-gray-200" />

        {/* Closing / Welcome */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-gray-900">WELCOME TO SWAP CORRECT</h2>
          <p className="text-base">
            Whether you have one item sitting unused at home or you regularly enjoy discovering new
            things, Swap Correct gives you a place to explore the possibilities.
          </p>
          <p className="text-base">List something.</p>
          <p className="text-base">Find something.</p>
          <p className="text-base">Start a conversation.</p>
          <p className="text-base">Agree on an exchange.</p>
          <p className="text-base">
            And give your unused items another opportunity to be useful. SWAP WHAT YOU HAVE. FIND
            WHAT YOU NEED. Welcome to Swap Correct.
          </p>
        </div>

        {/* Useful Links */}
        {/* <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100 space-y-4">
        <h3 className="text-xl font-bold text-gray-900">Useful Links</h3>
        <div className="flex flex-wrap gap-3 text-sm font-medium">
          <Link href="/swaps" className="text-[#007AFF] hover:underline">
            [Start Swapping]
          </Link>
          <Link href="/items/create" className="text-[#007AFF] hover:underline">
            [List an Item]
          </Link>
          <Link href="/safety" className="text-[#007AFF] hover:underline">
            [Swap Safety Centre]
          </Link>
          <Link href="/faq" className="text-[#007AFF] hover:underline">
            [Frequently Asked Questions]
          </Link>
          <Link href="/authenticity-policy" className="text-[#007AFF] hover:underline">
            [Item Authenticity & Verification Policy]
          </Link>
          <Link href="/terms" className="text-[#007AFF] hover:underline">
            [Terms & Conditions]
          </Link>
          <Link href="/privacy" className="text-[#007AFF] hover:underline">
            [Privacy Policy]
          </Link>
          <Link href="/contact" className="text-[#007AFF] hover:underline">
            [Contact Us]
          </Link>
        </div>
      </div> */}
      </div>
    </>
  );
}
