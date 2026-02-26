import Link from "next/link";
import { Button } from "./components/design-system";

/**
 * Landing Page
 * 
 * Headline: "Stop Missing The Right Jobs."
 * Subtext: "Precision-matched job discovery delivered daily at 9AM."
 * CTA: "Start Tracking" → /settings
 */

export default function LandingPage() {
  return (
    <div className="min-h-[calc(100vh-64px)] flex flex-col items-center justify-center px-24">
      <div className="max-w-[720px] text-center">
        <h1 className="font-serif text-[3rem] md:text-[3.5rem] leading-[1.15] text-[#111111] mb-24">
          Stop Missing The Right Jobs.
        </h1>
        <p className="text-lg text-[#6B6B6B] leading-relaxed mb-40 max-w-[600px] mx-auto">
          Precision-matched job discovery delivered daily at 9AM.
        </p>
        <Link href="/settings">
          <Button variant="primary" size="default">
            Start Tracking
          </Button>
        </Link>
      </div>
    </div>
  );
}
