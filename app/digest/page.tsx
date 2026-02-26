import { EmptyState } from "../components/design-system";

/**
 * Digest Page
 * 
 * Premium empty state indicating future daily summary feature.
 */

export default function DigestPage() {
  return (
    <div className="max-w-[1200px] mx-auto px-24 py-64">
      <div className="max-w-[720px]">
        <h1 className="font-serif text-[2.5rem] leading-[1.2] text-[#111111] mb-16">
          Daily Digest
        </h1>
        <EmptyState
          title="Digest coming soon"
          description="Your daily 9AM summary of matched jobs will appear here."
        />
      </div>
    </div>
  );
}
