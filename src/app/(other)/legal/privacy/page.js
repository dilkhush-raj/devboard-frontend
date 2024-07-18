import Link from "next/link";
import {IoIosArrowRoundBack} from "react-icons/io";

const PrivacyPolicy = () => (
  <main className="mx-auto flex max-w-screen-md flex-col gap-4 px-4 py-8">
    <Link href="/" className="text-blue-500 flex items-center gap-2">
      <span className="text-3xl">
        <IoIosArrowRoundBack />
      </span>
      Back
    </Link>
    <h1 className="text-3xl font-bold">Privacy Policy</h1>

    <p className="">
      This Privacy Policy describes how DevBoard ("we," "us," or "our")
      collects, uses, and discloses your information when you use our platform
      (the "Service").
    </p>

    <h2 className="text-2xl font-bold">Information We Collect</h2>

    <p className="">
      We collect several different types of information for various purposes to
      improve our Service to you.
    </p>

    <ul className="list-disc pl-4">
      <li>
        <b>Personal Information:</b> While using our Service, we may ask you to
        provide certain personally identifiable information that can be used to
        contact or identify you ("Personal Information"). This may include:
        <ul className="list-disc pl-4">
          <li>Email address</li>
          <li>Username</li>
          <li>(Optional) Profile picture</li>
        </ul>
      </li>
      <li>
        <b>Non-Personal Information:</b> We also collect non-personal
        information that does not directly identify an individual. This may
        include:
        <ul className="list-disc pl-4">
          <li>
            Usage data: Information about your visit, such as browser type,
            operating system, referral page, IP address, access times, and pages
            viewed.
          </li>
          <li>
            Content data: Information about the content you create and share on
            DevBoard, such as blog posts, articles, questions, and answers.
          </li>
          <li>
            Engagement data: Information about your activity on DevBoard, such
            as likes, comments, shares, and credits earned.
          </li>
        </ul>
      </li>
    </ul>

    <h2 className="text-2xl font-bold">Use of Collected Information</h2>

    <p className="">We use the collected information for various purposes:</p>

    <ul className="list-disc pl-4">
      <li>To provide and maintain the Service</li>
      <li>To improve and personalize the Service</li>
      <li>To develop new features and functionalities</li>
      <li>
        To send you information about important updates, announcements, and
        promotions (with your consent)
      </li>
      <li>To analyze how users utilize the Service</li>
      <li>To detect, prevent, and address technical issues</li>
      <li>To fulfill any other purposes outlined in this Privacy Policy</li>
    </ul>

    {/* Add sections for Disclosure of Information, Data Retention, Your Rights, Children's Privacy, Changes to This Privacy Policy, and Contact Us following the same structure as the TermsOfService example */}

    {/* Remember to replace [Your Country/State] with the actual location */}
    <p className="mt-4 text-sm text-gray-500">
      This Privacy Policy is effective as of 15 July 2024. We may update it from
      time to time.
    </p>
  </main>
);

export default PrivacyPolicy;
