import { Job } from "../data/jobs";

export interface Preferences {
  roleKeywords: string;
  preferredLocations: string[];
  preferredMode: string[];
  experienceLevel: string;
  skills: string;
  minMatchScore: number;
}

/**
 * Match Score Engine
 * 
 * Scoring Rules (exact specification):
 * +25 if any roleKeyword appears in job.title (case-insensitive)
 * +15 if any roleKeyword appears in job.description
 * +15 if job.location matches preferredLocations
 * +10 if job.mode matches preferredMode
 * +10 if job.experience matches experienceLevel
 * +15 if overlap between job.skills and user.skills (any match)
 * +5 if postedDaysAgo <= 2
 * +5 if source is LinkedIn
 * 
 * Cap score at 100.
 */

export function calculateMatchScore(job: Job, preferences: Preferences): number {
  let score = 0;

  // Parse role keywords (comma-separated)
  const roleKeywords = preferences.roleKeywords
    .split(",")
    .map((k) => k.trim().toLowerCase())
    .filter((k) => k.length > 0);

  // Parse user skills (comma-separated)
  const userSkills = preferences.skills
    .split(",")
    .map((s) => s.trim().toLowerCase())
    .filter((s) => s.length > 0);

  // +25 if any roleKeyword appears in job.title
  if (roleKeywords.length > 0) {
    const titleLower = job.title.toLowerCase();
    const hasKeywordInTitle = roleKeywords.some((keyword) =>
      titleLower.includes(keyword)
    );
    if (hasKeywordInTitle) {
      score += 25;
    }

    // +15 if any roleKeyword appears in job.description
    const descLower = job.description.toLowerCase();
    const hasKeywordInDesc = roleKeywords.some((keyword) =>
      descLower.includes(keyword)
    );
    if (hasKeywordInDesc) {
      score += 15;
    }
  }

  // +15 if job.location matches preferredLocations
  if (
    preferences.preferredLocations.length > 0 &&
    preferences.preferredLocations.includes(job.location)
  ) {
    score += 15;
  }

  // +10 if job.mode matches preferredMode
  if (
    preferences.preferredMode.length > 0 &&
    preferences.preferredMode.includes(job.mode)
  ) {
    score += 10;
  }

  // +10 if job.experience matches experienceLevel
  if (
    preferences.experienceLevel &&
    job.experience === preferences.experienceLevel
  ) {
    score += 10;
  }

  // +15 if overlap between job.skills and user.skills (any match)
  if (userSkills.length > 0) {
    const jobSkillsLower = job.skills.map((s) => s.toLowerCase());
    const hasSkillMatch = userSkills.some((userSkill) =>
      jobSkillsLower.some((jobSkill) => jobSkill.includes(userSkill) || userSkill.includes(jobSkill))
    );
    if (hasSkillMatch) {
      score += 15;
    }
  }

  // +5 if postedDaysAgo <= 2
  if (job.postedDaysAgo <= 2) {
    score += 5;
  }

  // +5 if source is LinkedIn
  if (job.source === "LinkedIn") {
    score += 5;
  }

  // Cap score at 100
  return Math.min(score, 100);
}

/**
 * Get match score color based on score range
 * 80-100: green
 * 60-79: amber
 * 40-59: neutral
 * <40: subtle grey
 */
export function getMatchScoreColor(score: number): string {
  if (score >= 80) {
    return "bg-[#5A7D5A] bg-opacity-15 text-[#5A7D5A]"; // green
  }
  if (score >= 60) {
    return "bg-[#B8860B] bg-opacity-15 text-[#B8860B]"; // amber
  }
  if (score >= 40) {
    return "bg-[#E8E6E1] text-[#6B6B6B]"; // neutral
  }
  return "bg-[#F7F6F3] text-[#9B9B9B]"; // subtle grey
}

/**
 * Load preferences from localStorage
 */
export function loadPreferences(): Preferences | null {
  if (typeof window === "undefined") return null;
  
  const saved = localStorage.getItem("jobTrackerPreferences");
  if (saved) {
    try {
      return JSON.parse(saved);
    } catch {
      return null;
    }
  }
  return null;
}

/**
 * Check if preferences are set
 */
export function hasPreferences(): boolean {
  const prefs = loadPreferences();
  if (!prefs) return false;
  
  // Check if at least one preference field has a value
  return (
    prefs.roleKeywords.trim().length > 0 ||
    prefs.preferredLocations.length > 0 ||
    prefs.preferredMode.length > 0 ||
    prefs.experienceLevel.trim().length > 0 ||
    prefs.skills.trim().length > 0
  );
}
