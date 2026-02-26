"use client";

import React, { useState, useEffect, useMemo } from "react";
import { jobs, Job, getUniqueLocations, getUniqueModes, getUniqueExperiences, getUniqueSources } from "../data/jobs";
import { JobCard, JobModal, FilterBar } from "../components/jobs";
import { EmptyState } from "../components/design-system";

/**
 * Dashboard Page
 * 
 * Displays job cards with filtering and search capabilities.
 * Saved jobs are stored in localStorage.
 */

const SAVED_JOBS_KEY = "jnt_saved_jobs";

export default function DashboardPage() {
  const [savedJobIds, setSavedJobIds] = useState<string[]>([]);
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filters, setFilters] = useState({
    keyword: "",
    location: "",
    mode: "",
    experience: "",
    source: "",
    sort: "latest",
  });

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

  const handleFilterChange = (key: string, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

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

  const filteredJobs = useMemo(() => {
    let result = [...jobs];

    // Keyword filter
    if (filters.keyword) {
      const keyword = filters.keyword.toLowerCase();
      result = result.filter(
        (job) =>
          job.title.toLowerCase().includes(keyword) ||
          job.company.toLowerCase().includes(keyword)
      );
    }

    // Location filter
    if (filters.location) {
      result = result.filter((job) => job.location === filters.location);
    }

    // Mode filter
    if (filters.mode) {
      result = result.filter((job) => job.mode === filters.mode);
    }

    // Experience filter
    if (filters.experience) {
      result = result.filter((job) => job.experience === filters.experience);
    }

    // Source filter
    if (filters.source) {
      result = result.filter((job) => job.source === filters.source);
    }

    // Sort
    switch (filters.sort) {
      case "latest":
        result.sort((a, b) => a.postedDaysAgo - b.postedDaysAgo);
        break;
      case "oldest":
        result.sort((a, b) => b.postedDaysAgo - a.postedDaysAgo);
        break;
      case "salary-high":
        // Simple sort by extracting first number from salary range
        result.sort((a, b) => {
          const getFirstNum = (s: string) => {
            const match = s.match(/\d+/);
            return match ? parseInt(match[0]) : 0;
          };
          return getFirstNum(b.salaryRange) - getFirstNum(a.salaryRange);
        });
        break;
      case "salary-low":
        result.sort((a, b) => {
          const getFirstNum = (s: string) => {
            const match = s.match(/\d+/);
            return match ? parseInt(match[0]) : 0;
          };
          return getFirstNum(a.salaryRange) - getFirstNum(b.salaryRange);
        });
        break;
    }

    return result;
  }, [filters]);

  return (
    <div className="max-w-[1200px] mx-auto px-24 py-40">
      <div className="mb-40">
        <h1 className="font-serif text-[2.5rem] leading-[1.2] text-[#111111] mb-16">
          Dashboard
        </h1>
        <p className="text-base text-[#6B6B6B] leading-relaxed max-w-[720px]">
          Browse and filter job opportunities. Save jobs to review later or apply directly.
        </p>
      </div>

      <FilterBar
        filters={filters}
        onFilterChange={handleFilterChange}
        locations={getUniqueLocations()}
        modes={getUniqueModes()}
        experiences={getUniqueExperiences()}
        sources={getUniqueSources()}
      />

      {filteredJobs.length === 0 ? (
        <div className="text-center py-64">
          <p className="text-lg text-[#6B6B6B]">No jobs match your search.</p>
        </div>
      ) : (
        <>
          <div className="mb-24">
            <span className="text-sm text-[#6B6B6B]">
              Showing {filteredJobs.length} of {jobs.length} jobs
            </span>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24">
            {filteredJobs.map((job) => (
              <JobCard
                key={job.id}
                job={job}
                isSaved={savedJobIds.includes(job.id)}
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
