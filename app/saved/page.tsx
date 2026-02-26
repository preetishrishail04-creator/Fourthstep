import { EmptyState } from "../components/design-system";

/**
 * Saved Page
 * 
 * Premium empty state for saved jobs.
 */

export default function SavedPage() {
  return (
    <div className="max-w-[1200px] mx-auto px-24 py-64">
      <div className="max-w-[720px]">
        <h1 className="font-serif text-[2.5rem] leading-[1.2] text-[#111111] mb-16">
          Saved Jobs
        </h1>
        <EmptyState
          title="No saved jobs yet"
          description="Jobs you save will appear here for quick access."
        />
      </div>
    </div>
  );
}
