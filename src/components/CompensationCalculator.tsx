import { useState, useMemo } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { PercentileCard } from "@/components/PercentileCard";
import {
  countries,
  roles,
  departments,
  getCompensation,
  formatSalary,
} from "@/data/compensationData";
import { Globe, Briefcase, TrendingUp } from "lucide-react";

export function CompensationCalculator() {
  const [countryCode, setCountryCode] = useState<string>("");
  const [roleId, setRoleId] = useState<string>("");

  const selectedCountry = useMemo(
    () => countries.find((c) => c.code === countryCode),
    [countryCode]
  );
  const selectedRole = useMemo(
    () => roles.find((r) => r.id === roleId),
    [roleId]
  );

  const compensation = useMemo(() => {
    if (!selectedRole || !selectedCountry) return null;
    return getCompensation(selectedRole, selectedCountry);
  }, [selectedRole, selectedCountry]);

  return (
    <div className="w-full max-w-4xl mx-auto px-4">
      {/* Header */}
      <div className="text-center mb-10 animate-fade-up">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-secondary text-primary text-sm font-medium mb-6">
          <TrendingUp className="w-4 h-4" />
          Compensation Benchmarks
        </div>
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
          <span className="text-foreground">Know your </span>
          <span className="text-gradient">worth</span>
        </h1>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
          Explore compensation benchmarks across 35 countries for every role we
          hire at TryHackMe. Transparent, fair, and competitive.
        </p>
      </div>

      {/* Selectors */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10 animate-fade-up-delay">
        <div className="space-y-2">
          <label className="text-sm font-medium text-muted-foreground flex items-center gap-2">
            <Globe className="w-4 h-4 text-primary" />
            Country
          </label>
          <Select value={countryCode} onValueChange={setCountryCode}>
            <SelectTrigger className="h-12 bg-card border-border hover:border-primary/50 transition-colors">
              <SelectValue placeholder="Select a country" />
            </SelectTrigger>
            <SelectContent>
              {countries.map((c) => (
                <SelectItem key={c.code} value={c.code}>
                  {c.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-muted-foreground flex items-center gap-2">
            <Briefcase className="w-4 h-4 text-primary" />
            Role
          </label>
          <Select value={roleId} onValueChange={setRoleId}>
            <SelectTrigger className="h-12 bg-card border-border hover:border-primary/50 transition-colors">
              <SelectValue placeholder="Select a role" />
            </SelectTrigger>
            <SelectContent>
              {departments.map((dept) => (
                <SelectGroup key={dept}>
                  <SelectLabel className="text-primary/70 text-xs uppercase tracking-wider">
                    {dept}
                  </SelectLabel>
                  {roles
                    .filter((r) => r.department === dept)
                    .map((r) => (
                      <SelectItem key={r.id} value={r.id}>
                        {r.title}
                      </SelectItem>
                    ))}
                </SelectGroup>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Results */}
      {compensation && selectedRole && selectedCountry ? (
        <div className="animate-fade-up-delay-2">
          <div className="text-center mb-6">
            <p className="text-sm text-muted-foreground">
              Annual base salary for{" "}
              <span className="text-foreground font-medium">
                {selectedRole.title}
              </span>{" "}
              in{" "}
              <span className="text-foreground font-medium">
                {selectedCountry.name}
              </span>{" "}
              ({compensation.currency})
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <PercentileCard
              label="25th Percentile"
              value={formatSalary(
                compensation.p25,
                compensation.currencySymbol
              )}
              description="Entry-level range"
              tier="low"
            />
            <PercentileCard
              label="50th Percentile"
              value={formatSalary(
                compensation.p50,
                compensation.currencySymbol
              )}
              description="Market median"
              tier="mid"
              featured
            />
            <PercentileCard
              label="75th Percentile"
              value={formatSalary(
                compensation.p75,
                compensation.currencySymbol
              )}
              description="Above market"
              tier="high"
            />
          </div>

          {/* Visual bar */}
          <div className="mt-8 bg-card rounded-xl p-6 border border-border">
            <p className="text-xs text-muted-foreground uppercase tracking-wider mb-4 font-medium">
              Salary Range Distribution
            </p>
            <div className="relative h-3 bg-secondary rounded-full overflow-hidden">
              <div
                className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-percentile-low via-percentile-mid to-percentile-high opacity-80"
                style={{ width: "100%" }}
              />
            </div>
            <div className="flex justify-between mt-3 text-sm">
              <span className="text-percentile-low font-medium">
                {formatSalary(compensation.p25, compensation.currencySymbol)}
              </span>
              <span className="text-percentile-mid font-semibold">
                {formatSalary(compensation.p50, compensation.currencySymbol)}
              </span>
              <span className="text-percentile-high font-medium">
                {formatSalary(compensation.p75, compensation.currencySymbol)}
              </span>
            </div>
          </div>

          <p className="text-xs text-muted-foreground text-center mt-6">
            Benchmarks are indicative and based on market data. Actual offers
            may vary based on experience, skills, and other factors.
          </p>
        </div>
      ) : (
        <div className="text-center py-16 animate-fade-up-delay-2">
          <div className="w-16 h-16 rounded-2xl bg-secondary flex items-center justify-center mx-auto mb-4">
            <TrendingUp className="w-8 h-8 text-primary" />
          </div>
          <p className="text-muted-foreground">
            Select a country and role to view compensation benchmarks
          </p>
        </div>
      )}
    </div>
  );
}
