"use client";

import React from "react";
import { Job } from "@/app/data/jobs";
import { Button, StatusBadge } from "../design-system";
import { cn } from "@/lib/utils";

/**
 * Job Card Component
 * 
 * Displays job information with View, Save, and Apply buttons.
 * Follows design system: off-white background, deep red accent, subtle borders.
 */

interface JobCardProps {
  job: Job;
  isSaved: boolean;
  onView: (job: Job) => void;
  onSave: (jobId: string) => void;
  onApply: (url: string) => void;
}

const sourceColors = {
  LinkedIn: "bg-[#0077B5] bg-opacity-10 text-[#0077B5]",
  Naukri: "bg-[#FF6B6B] bg-opacity-10 text-[#FF6B6B]",
  Indeed: "bg-[#2557A7] bg-opacity-10 text-[#2557A7]",
};

export function JobCard({ job, isSaved, onView, onSave, onApply }: JobCardProps) {
  const formatPostedTime = (days: number) => {
    if (days === 0) return "Today";
    if (days === 1) return "1 day ago";
    return `${days} days ago`;
  };

  return (
    <div className="bg-white border border-[#D4D2CC] rounded-[6px] p-24 transition-all duration-150 hover:border-[#8B0000]">
      {/* Header: Title & Company */}
      <div className="mb-16">
        <h3 className="font-serif text-xl text-[#111111] mb-8">{job.title}</h3>
        <p className="text-base text-[#6B6B6B]">{job.company}</p>
      </div>

      {/* Job Details */}
      <div className="flex flex-wrap gap-16 mb-16">
        <span className="text-sm text-[#6B6B6B]">{job.location}</span>
        <span className="text-sm text-[#6B6B6B]">•</span>
        <span className="text-sm text-[#6B6B6B]">{job.mode}</span>
        <span className="text-sm text-[#6B6B6B]">•</span>
        <span className="text-sm text-[#6B6B6B]">{job.experience} years</span>
      </div>

      {/* Salary */}
      <div className="mb-16">
        <span className="text-sm font-medium text-[#111111]">{job.salaryRange}</span>
      </div>

      {/* Skills */}
      <div className="flex flex-wrap gap-8 mb-24">
        {job.skills.slice(0, 3).map((skill) => (
          <span
            key={skill}
            className="px-12 py-6 text-xs bg-[#F7F6F3] text-[#6B6B6B] rounded-[6px]"
          >
            {skill}
          </span>
        ))}
        {job.skills.length > 3 && (
          <span className="px-12 py-6 text-xs text-[#6B6B6B]">
            +{job.skills.length - 3} more
          </span>
        )}
      </div>

      {/* Footer: Source, Posted Time, Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-16 pt-16 border-t border-[#E8E6E1]">
        <div className="flex items-center gap-16">
          <span className={cn("px-12 py-6 text-xs font-medium rounded-[6px]", sourceColors[job.source])}>
            {job.source}
          </span>
          <span className="text-sm text-[#6B6B6B]">{formatPostedTime(job.postedDaysAgo)}</span>
        </div>

        <div className="flex items-center gap-12">
          <Button variant="secondary" size="small" onClick={() => onView(job)}>
            View
          </Button>
          <Button
            variant={isSaved ? "primary" : "secondary"}
            size="small"
            onClick={() => onSave(job.id)}
          >
            {isSaved ? "Saved" : "Save"}
          </Button>
          <Button variant="primary" size="small" onClick={() => onApply(job.applyUrl)}>
            Apply
          </Button>
        </div>
      </div>
    </div>
  );
}
