"use client";

import React, { useState, useEffect } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, Input, Button } from "../components/design-system";
import { getUniqueLocations } from "../data/jobs";

/**
 * Settings Page
 * 
 * Preference fields with localStorage persistence:
 * - roleKeywords (comma-separated)
 * - preferredLocations (multi-select)
 * - preferredMode (checkboxes)
 * - experienceLevel (dropdown)
 * - skills (comma-separated)
 * - minMatchScore (slider 0-100, default 40)
 */

const PREFERENCES_KEY = "jobTrackerPreferences";

interface Preferences {
  roleKeywords: string;
  preferredLocations: string[];
  preferredMode: string[];
  experienceLevel: string;
  skills: string;
  minMatchScore: number;
}

const defaultPreferences: Preferences = {
  roleKeywords: "",
  preferredLocations: [],
  preferredMode: [],
  experienceLevel: "",
  skills: "",
  minMatchScore: 40,
};

const experienceOptions = [
  { value: "Fresher", label: "Fresher" },
  { value: "0-1", label: "0-1 years" },
  { value: "1-3", label: "1-3 years" },
  { value: "3-5", label: "3-5 years" },
];

const modeOptions = ["Remote", "Hybrid", "Onsite"];

export default function SettingsPage() {
  const [preferences, setPreferences] = useState<Preferences>(defaultPreferences);
  const [isSaved, setIsSaved] = useState(false);
  const locations = getUniqueLocations();

  // Load preferences from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem(PREFERENCES_KEY);
    if (saved) {
      try {
        setPreferences({ ...defaultPreferences, ...JSON.parse(saved) });
      } catch {
        setPreferences(defaultPreferences);
      }
    }
  }, []);

  const handleSave = () => {
    localStorage.setItem(PREFERENCES_KEY, JSON.stringify(preferences));
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2000);
  };

  const updatePreference = <K extends keyof Preferences>(key: K, value: Preferences[K]) => {
    setPreferences((prev) => ({ ...prev, [key]: value }));
    setIsSaved(false);
  };

  const toggleLocation = (location: string) => {
    setPreferences((prev) => {
      const current = prev.preferredLocations;
      const updated = current.includes(location)
        ? current.filter((l) => l !== location)
        : [...current, location];
      return { ...prev, preferredLocations: updated };
    });
    setIsSaved(false);
  };

  const toggleMode = (mode: string) => {
    setPreferences((prev) => {
      const current = prev.preferredMode;
      const updated = current.includes(mode)
        ? current.filter((m) => m !== mode)
        : [...current, mode];
      return { ...prev, preferredMode: updated };
    });
    setIsSaved(false);
  };

  return (
    <div className="max-w-[1200px] mx-auto px-24 py-40">
      <div className="max-w-[720px]">
        <h1 className="font-serif text-[2.5rem] leading-[1.2] text-[#111111] mb-16">
          Settings
        </h1>
        <p className="text-base text-[#6B6B6B] leading-relaxed mb-40">
          Configure your job preferences. These settings will be used to match you with relevant opportunities.
        </p>

        <div className="space-y-24">
          <Card>
            <CardHeader>
              <CardTitle>Role Keywords</CardTitle>
              <CardDescription>
                Enter keywords for roles you are looking for (comma-separated).
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Input
                label="Role Keywords"
                placeholder="e.g. SDE, Backend, React, Python"
                value={preferences.roleKeywords}
                onChange={(e) => updatePreference("roleKeywords", e.target.value)}
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Preferred Locations</CardTitle>
              <CardDescription>
                Select locations where you would like to work.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-12">
                {locations.map((location) => (
                  <label
                    key={location}
                    className={`flex items-center gap-8 px-12 py-8 border rounded-[6px] cursor-pointer transition-colors duration-150 ${
                      preferences.preferredLocations.includes(location)
                        ? "bg-[#8B0000] bg-opacity-10 border-[#8B0000] text-[#8B0000]"
                        : "border-[#D4D2CC] hover:bg-[#F7F6F3]"
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={preferences.preferredLocations.includes(location)}
                      onChange={() => toggleLocation(location)}
                      className="sr-only"
                    />
                    <span className="text-sm">{location}</span>
                  </label>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Preferred Work Mode</CardTitle>
              <CardDescription>
                Select your preferred work arrangements (multiple allowed).
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-16">
                {modeOptions.map((mode) => (
                  <label
                    key={mode}
                    className={`flex items-center gap-12 px-16 py-12 border rounded-[6px] cursor-pointer transition-colors duration-150 ${
                      preferences.preferredMode.includes(mode)
                        ? "bg-[#8B0000] bg-opacity-10 border-[#8B0000] text-[#8B0000]"
                        : "border-[#D4D2CC] hover:bg-[#F7F6F3]"
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={preferences.preferredMode.includes(mode)}
                      onChange={() => toggleMode(mode)}
                      className="sr-only"
                    />
                    <span className="text-sm text-[#111111]">{mode}</span>
                  </label>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Experience Level</CardTitle>
              <CardDescription>
                Select your target experience level.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <select
                value={preferences.experienceLevel}
                onChange={(e) => updatePreference("experienceLevel", e.target.value)}
                className="w-full px-16 py-12 bg-white border border-[#D4D2CC] rounded-[6px] text-sm text-[#111111] focus:outline-none focus:border-[#8B0000] focus:ring-2 focus:ring-[#8B0000] focus:ring-opacity-20"
              >
                <option value="">Select experience level</option>
                {experienceOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Your Skills</CardTitle>
              <CardDescription>
                Enter your skills (comma-separated) for better matching.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Input
                label="Skills"
                placeholder="e.g. React, Node.js, Python, SQL"
                value={preferences.skills}
                onChange={(e) => updatePreference("skills", e.target.value)}
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Minimum Match Score</CardTitle>
              <CardDescription>
                Set the minimum match score for job recommendations (0-100).
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-16">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-[#6B6B6B]">Threshold</span>
                  <span className="text-lg font-medium text-[#8B0000]">{preferences.minMatchScore}</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={preferences.minMatchScore}
                  onChange={(e) => updatePreference("minMatchScore", parseInt(e.target.value))}
                  className="w-full h-8 bg-[#E8E6E1] rounded-full appearance-none cursor-pointer accent-[#8B0000]"
                />
                <div className="flex justify-between text-xs text-[#6B6B6B]">
                  <span>0</span>
                  <span>25</span>
                  <span>50</span>
                  <span>75</span>
                  <span>100</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="pt-16">
            <Button variant="primary" onClick={handleSave}>
              {isSaved ? "Saved!" : "Save Preferences"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
