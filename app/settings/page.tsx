import { Card, CardHeader, CardTitle, CardDescription, CardContent, Input } from "../components/design-system";

/**
 * Settings Page
 * 
 * Preference fields (UI placeholders only):
 * - Role keywords
 * - Preferred locations
 * - Mode (Remote / Hybrid / Onsite)
 * - Experience level
 */

export default function SettingsPage() {
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
              <CardTitle>Role Preferences</CardTitle>
              <CardDescription>
                Define the roles you are looking for.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Input
                label="Role Keywords"
                placeholder="e.g. Product Manager, Senior Engineer"
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Location</CardTitle>
              <CardDescription>
                Where would you like to work?
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Input
                label="Preferred Locations"
                placeholder="e.g. San Francisco, Remote, London"
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Work Mode</CardTitle>
              <CardDescription>
                Select your preferred work arrangement.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-16">
                {["Remote", "Hybrid", "Onsite"].map((mode) => (
                  <label
                    key={mode}
                    className="flex items-center gap-12 px-16 py-12 border border-[#D4D2CC] rounded-[6px] cursor-pointer hover:bg-[#F7F6F3] transition-colors duration-150"
                  >
                    <input
                      type="radio"
                      name="workMode"
                      value={mode.toLowerCase()}
                      className="w-16 h-16 accent-[#8B0000]"
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
              <div className="flex flex-wrap gap-16">
                {["Entry", "Mid", "Senior", "Lead"].map((level) => (
                  <label
                    key={level}
                    className="flex items-center gap-12 px-16 py-12 border border-[#D4D2CC] rounded-[6px] cursor-pointer hover:bg-[#F7F6F3] transition-colors duration-150"
                  >
                    <input
                      type="radio"
                      name="experience"
                      value={level.toLowerCase()}
                      className="w-16 h-16 accent-[#8B0000]"
                    />
                    <span className="text-sm text-[#111111]">{level}</span>
                  </label>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
