"use client";

import React from "react";
import { Job } from "@/app/data/jobs";
import { Button } from "../design-system";

/**
 * Job Modal Component
 * 
 * Displays full job description and skills in a modal overlay.
 * Follows design system: off-white background, deep red accent, no heavy shadows.
 */

interface JobModalProps {
  job: Job | null;
  isOpen: boolean;
  onClose: () => void;
  onSave: (jobId: string) => void;
  onApply: (url: string) => void;
  isSaved: boolean;
}

export function JobModal({ job, isOpen, onClose, onSave, onApply, isSaved }: JobModalProps) {
  if (!isOpen || !job) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-24">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black bg-opacity-30"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal Content */}
      <div className="relative bg-white rounded-[6px] w-full max-w-[640px] max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-[#D4D2CC] px-32 py-24 flex items-start justify-between">
          <div>
            <h2 className="font-serif text-2xl text-[#111111] mb-8">{job.title}</h2>
            <p className="text-base text-[#6B6B6B]">{job.company}</p>
          </div>
          <button
            onClick={onClose}
            className="text-[#6B6B6B] hover:text-[#111111] transition-colors duration-150 p-8"
            aria-label="Close modal"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        {/* Body */}
        <div className="px-32 py-24 space-y-24">
          {/* Key Details */}
          <div className="flex flex-wrap gap-16">
            <div>
              <span className="text-xs text-[#6B6B6B] uppercase tracking-wide">Location</span>
              <p className="text-sm text-[#111111]">{job.location}</p>
            </div>
            <div>
              <span className="text-xs text-[#6B6B6B] uppercase tracking-wide">Mode</span>
              <p className="text-sm text-[#111111]">{job.mode}</p>
            </div>
            <div>
              <span className="text-xs text-[#6B6B6B] uppercase tracking-wide">Experience</span>
              <p className="text-sm text-[#111111]">{job.experience} years</p>
            </div>
            <div>
              <span className="text-xs text-[#6B6B6B] uppercase tracking-wide">Salary</span>
              <p className="text-sm text-[#111111]">{job.salaryRange}</p>
            </div>
            <div>
              <span className="text-xs text-[#6B6B6B] uppercase tracking-wide">Source</span>
              <p className="text-sm text-[#111111]">{job.source}</p>
            </div>
          </div>

          {/* Description */}
          <div>
            <h3 className="font-serif text-lg text-[#111111] mb-12">Description</h3>
            <p className="text-base text-[#6B6B6B] leading-relaxed">{job.description}</p>
          </div>

          {/* Skills */}
          <div>
            <h3 className="font-serif text-lg text-[#111111] mb-12">Required Skills</h3>
            <div className="flex flex-wrap gap-8">
              {job.skills.map((skill) => (
                <span
                  key={skill}
                  className="px-16 py-8 text-sm bg-[#F7F6F3] text-[#111111] rounded-[6px]"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 bg-white border-t border-[#D4D2CC] px-32 py-24 flex items-center justify-end gap-12">
          <Button variant="secondary" onClick={() => onSave(job.id)}>
            {isSaved ? "Saved" : "Save Job"}
          </Button>
          <Button variant="primary" onClick={() => onApply(job.applyUrl)}>
            Apply Now
          </Button>
        </div>
      </div>
    </div>
  );
}
