import React from 'react';
import Link from 'next/link';

export default function TermsOfService() {
  return (
    <div className="min-h-screen bg-background text-foreground py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto prose dark:prose-invert">
        <h1 className="text-4xl font-bold mb-8">Terms of Service</h1>
        <p className="text-muted-foreground mb-4">Last updated: {new Date().toLocaleDateString()}</p>
        
        <h2 className="text-2xl font-semibold mt-8 mb-4">1. Agreement to Terms</h2>
        <p>By accessing or using Link Party, you agree to be bound by these Terms of Service and all applicable laws and regulations. If you do not agree with any of these terms, you are prohibited from using or accessing this site.</p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">2. Use License</h2>
        <p>Permission is granted to temporarily download one copy of the materials (information or software) on Link Party&apos;s website for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:</p>
        <ul className="list-disc pl-6 mb-4 mt-2">
          <li>modify or copy the materials;</li>
          <li>use the materials for any commercial purpose, or for any public display (commercial or non-commercial);</li>
          <li>attempt to decompile or reverse engineer any software contained on Link Party&apos;s website;</li>
          <li>remove any copyright or other proprietary notations from the materials; or</li>
          <li>transfer the materials to another person or &quot;mirror&quot; the materials on any other server.</li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 mb-4">3. Disclaimer</h2>
        <p>The materials on Link Party&apos;s website are provided on an &apos;as is&apos; basis. Link Party makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.</p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">4. Limitations</h2>
        <p>In no event shall Link Party or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on Link Party&apos;s website, even if Link Party or a Link Party authorized representative has been notified orally or in writing of the possibility of such damage.</p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">5. Revisions and Errata</h2>
        <p>The materials appearing on Link Party&apos;s website could include technical, typographical, or photographic errors. Link Party does not warrant that any of the materials on its website are accurate, complete or current. Link Party may make changes to the materials contained on its website at any time without notice.</p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">6. Governing Law</h2>
        <p>These terms and conditions are governed by and construed in accordance with the laws and you irrevocably submit to the exclusive jurisdiction of the courts in that State or location.</p>

        <div className="mt-12 pt-8 border-t border-border">
          <Link href="/" className="text-primary hover:underline">
            &larr; Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
