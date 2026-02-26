import { EmptyState } from "../components/design-system";

/**
 * Dashboard Page
 * 
 * Clean empty state indicating data will be loaded in next step.
 */

export default function DashboardPage() {
  return (
    <div className="max-w-[1200px] mx-auto px-24 py-64">
      <EmptyState
        title="No jobs yet"
        description="In the next step, you will load a realistic dataset."
      />
    </div>
  );
}
