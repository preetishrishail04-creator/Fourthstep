"use client";

import React, { useState, useEffect } from "react";
import { jobs, Job } from "../data/jobs";
import { JobCard, JobModal } from "../components/jobs";
import { EmptyState } from "../components/design-system";

/**
 * Saved Page
 * 
 * Displays saved jobs from localStorage.
 * Jobs persist after page reload.
 */

const SAVED_JOBS_KEY = "jnt_saved_jobs";

export default function SavedPage() {
  const [savedJobIds, setSavedJobIds] = useState<string[]>([]);
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Load saved jobs from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem(SAVED_JOBS_KEY);
    if (saved) {
      try {
        setSavedJobIds(JSON.parse(saved));
      } catch {
        setSavedJobIds([]);
      }
    }
  }, []);

  // Save to localStorage when savedJobIds changes
  useEffect(() => {
    localStorage.setItem(SAVED_JOBS_KEY, JSON.stringify(savedJobIds));
  }, [savedJobIds]);

  const savedJobs = jobs.filter((job) => savedJobIds.includes(job.id));

  const handleSaveJob = (jobId: string) => {
    setSavedJobIds((prev) => {
      if (prev.includes(jobId)) {
        return prev.filter((id) => id !== jobId);
      }
      return [...prev, jobId];
    });
  };

  const handleViewJob = (job: Job) => {
    setSelectedJob(job);
    setIsModalOpen(true);
  };

  const handleApply = (url: string) => {
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="max-w-[1200px] mx-auto px-24 py-40">
      <div className="mb-40">
        <h1 className="font-serif text-[2.5rem] leading-[1.2] text-[#111111] mb-16">
          Saved Jobs
        </h1>
        <p className="text-base text-[#6B6B6B] leading-relaxed max-w-[720px]">
          Jobs you have saved for quick access. These persist even after you close the browser.
        </p>
      </div>

      {savedJobs.length === 0 ? (
        <EmptyState
          title="No saved jobs yet"
          description="Jobs you save will appear here for quick access. Browse the dashboard to find and save jobs."
        />
      ) : (
        <>
          <div className="mb-24">
            <span className="text-sm text-[#6B6B6B]">
              {savedJobs.length} saved job{savedJobs.length !== 1 ? "s" : ""}
            </span>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24">
            {savedJobs.map((job) => (
              <JobCard
                key={job.id}
                job={job}
                isSaved={true}
                onView={handleViewJob}
                onSave={handleSaveJob}
                onApply={handleApply}
              />
            ))}
          </div>
        </>
      )}

      <JobModal
        job={selectedJob}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveJob}
        onApply={handleApply}
        isSaved={selectedJob ? savedJobIds.includes(selectedJob.id) : false}
      />
    </div>
  );
}
