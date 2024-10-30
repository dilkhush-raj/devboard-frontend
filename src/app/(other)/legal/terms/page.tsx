import Link from "next/link";
import {IoIosArrowRoundBack} from "react-icons/io";

const TermsOfService = () => (
  <main className="mx-auto flex max-w-screen-md flex-col gap-4 px-4 py-8">
    <Link href="/" className="text-blue-500 flex items-center gap-2">
      <span className="text-3xl">
        <IoIosArrowRoundBack />
      </span>
      Back
    </Link>
    <h1 className="text-3xl font-bold">Terms of Service</h1>

    <h2 className="text-2xl font-bold">1. Acceptance of Terms</h2>
    <p>
      By accessing or using DevBoard, you agree to be bound by these Terms of
      Service ("Terms"). If you do not agree to these Terms, you may not access
      or use the site.
    </p>

    <h2 className="text-2xl font-bold">2. Changes to Terms</h2>
    <p>
      DevBoard reserves the right to modify these Terms at any time. Changes
      will be effective immediately upon posting. Your continued use of the site
      constitutes acceptance of the revised Terms.
    </p>

    <h2 className="text-2xl font-bold">3. Use of the Site</h2>
    <p>
      You agree to use DevBoard for lawful purposes only. You are prohibited
      from posting or transmitting any content that is illegal, harmful,
      threatening, abusive, harassing, defamatory, vulgar, obscene, or otherwise
      objectionable.
    </p>

    <h2 className="text-2xl font-bold">4. User Content</h2>
    <p>
      By submitting content to DevBoard, you grant us a worldwide,
      non-exclusive, royalty-free license to use, reproduce, modify, and display
      your content. You retain all rights to your content and are responsible
      for it.
    </p>

    <h2 className="text-2xl font-bold">5. Account Security</h2>
    <p>
      You are responsible for maintaining the confidentiality of your account
      information and for all activities that occur under your account. Notify
      us immediately of any unauthorized use of your account.
    </p>

    <h2 className="text-2xl font-bold">6. Termination</h2>
    <p>
      We reserve the right to terminate or suspend your account and access to
      DevBoard at our sole discretion, without prior notice, for conduct that we
      believe violates these Terms or is harmful to other users of the site, us,
      or third parties, or for any other reason.
    </p>

    <h2 className="text-2xl font-bold">7. Disclaimer of Warranties</h2>
    <p>
      DevBoard is provided "as is" and "as available" without warranties of any
      kind, either express or implied. We do not warrant that the site will be
      uninterrupted or error-free.
    </p>

    <h2 className="text-2xl font-bold">8. Limitation of Liability</h2>
    <p>
      In no event shall DevBoard be liable for any indirect, incidental,
      special, consequential, or punitive damages, or any loss of profits or
      revenues, whether incurred directly or indirectly, or any loss of data,
      use, goodwill, or other intangible losses, resulting from your access to
      or use of or inability to access or use the site.
    </p>

    <h2 className="text-2xl font-bold">9. Governing Law</h2>
    <p>
      These Terms shall be governed by and construed in accordance with the laws
      of [Your Country/State], without regard to its conflict of law principles.
    </p>

    <h2 className="text-2xl font-bold">10. Contact Information</h2>
    <p>
      For any questions about these Terms, please contact us at
      dilkhush.code@gmail.com.
    </p>
  </main>
);

export default TermsOfService;
