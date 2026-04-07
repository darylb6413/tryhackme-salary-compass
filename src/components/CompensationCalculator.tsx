import { useState, useMemo } from "react";
import {
  Select, SelectContent, SelectGroup, SelectItem,
  SelectLabel, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PercentileCard } from "@/components/PercentileCard";
import { TotalCompChart } from "@/components/TotalCompChart";
import {
  countries, roles, departments, levels,
  getCompensation, formatSalary,
} from "@/data/compensationData";
import { Globe, Briefcase, TrendingUp, BarChart3, Layers } from "lucide-react";

export function CompensationCalculator() {
  const [countryCode, setCountryCode] = useState<string>("");
  const [roleId,      setRoleId]      = useState<string>("");
  const [levelId,     setLevelId]     = useState<string>("mid");
  const [view,        setView]        = useState<"base" | "total">("base");

  const selectedCountry = useMemo(() => countries.find((c) => c.code === countryCode), [countryCode]);
  const selectedRole    = useMemo(() => roles.find((r) => r.id === roleId),            [roleId]);
  const selectedLevel   = useMemo(() => levels.find((l) => l.id === levelId)!,        [levelId]);

  const compensation = useMemo(() => {
    if (!selectedRole || !selectedCountry) return null;
    return getCompensation(selectedRole, selectedCountry, selectedLevel);
  }, [selectedRole, selectedCountry, selectedLevel]);

  const hasSelection = !!selectedRole && !!selectedCountry;

  return (
    <div className="w-full max-w-4xl mx-auto px-4">

      {/* ── Header ── */}
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
          Explore compensation benchmarks across 35 countries for every role we hire at TryHackMe.
          Transparent, fair, and competitive.
        </p>
      </div>

      {/* ── Selectors ── */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6 animate-fade-up-delay">

        {/* Country */}
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
                <SelectItem key={c.code} value={c.code}>{c.name}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Role */}
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
                  {roles.filter((r) => r.department === dept).map((r) => (
                    <SelectItem key={r.id} value={r.id}>{r.title}</SelectItem>
                  ))}
                </SelectGroup>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Level */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-muted-foreground flex items-center gap-2">
            <Layers className="w-4 h-4 text-primary" />
            Level
          </label>
          <Select value={levelId} onValueChange={setLevelId}>
            <SelectTrigger className="h-12 bg-card border-border hover:border-primary/50 transition-colors">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {levels.map((l) => (
                <SelectItem key={l.id} value={l.id}>{l.label}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* ── Results ── */}
      {hasSelection && compensation ? (
        <div className="animate-fade-up-delay-2 space-y-6">

          {/* Context line */}
          <div className="text-center">
            <p className="text-sm text-muted-foreground">
              <span className="text-foreground font-medium">{selectedLevel.label}</span>
              {" "}{selectedRole!.title}{" "}
              in{" "}
              <span className="text-foreground font-medium">{selectedCountry!.name}</span>
              {" "}({compensation.currency})
            </p>
          </div>

          {/* View toggle */}
          <div className="flex justify-center">
            <Tabs value={view} onValueChange={(v) => setView(v as "base" | "total")}>
              <TabsList className="bg-secondary">
                <TabsTrigger value="base"  className="gap-1.5 text-xs">
                  <TrendingUp className="w-3.5 h-3.5" /> Base Salary
                </TabsTrigger>
                <TabsTrigger value="total" className="gap-1.5 text-xs">
                  <BarChart3 className="w-3.5 h-3.5" /> Total Comp
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>

          {view === "base" ? (
            <>
              {/* Percentile cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <PercentileCard
                  label="25th Percentile"
                  value={formatSalary(compensation.p25, compensation.currencySymbol)}
                  description="Entry-level range"
                  tier="low"
                />
                <PercentileCard
                  label="50th Percentile"
                  value={formatSalary(compensation.p50, compensation.currencySymbol)}
                  description="Market median"
                  tier="mid"
                  featured
                />
                <PercentileCard
                  label="75th Percentile"
                  value={formatSalary(compensation.p75, compensation.currencySymbol)}
                  description="Above market"
                  tier="high"
                />
              </div>

              {/* Gradient range bar */}
              <div className="bg-card rounded-xl p-6 border border-border">
                <p className="text-xs text-muted-foreground uppercase tracking-wider mb-4 font-medium">
                  Salary Range Distribution
                </p>
                <div className="relative h-3 bg-secondary rounded-full overflow-hidden">
                  <div className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-percentile-low via-percentile-mid to-percentile-high opacity-80 w-full" />
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
            </>
          ) : (
            <>
              {/* Total comp summary cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {(["p25", "p50", "p75"] as const).map((p, i) => {
                  const base   = compensation[p];
                  const bonus  = compensation[`bonus${p.toUpperCase().replace("P","P") as "P25"|"P50"|"P75"}`
                                   .replace("BONUSP","bonusP") as keyof typeof compensation] as number;
                  const equity = compensation[`equity${p.slice(1).toUpperCase()}` as keyof typeof compensation] as number;

                  // cleaner lookups
                  const bonusVal  = [compensation.bonusP25, compensation.bonusP50, compensation.bonusP75][i];
                  const equityVal = [compensation.equityP25, compensation.equityP50, compensation.equityP75][i];
                  const total     = base + bonusVal + equityVal;
                  const tiers     = ["low", "mid", "high"] as const;
                  const labels    = ["25th Percentile", "50th Percentile", "75th Percentile"];

                  void bonus; void equity; // suppress unused

                  return (
                    <PercentileCard
                      key={p}
                      label={labels[i]}
                      value={formatSalary(total, compensation.currencySymbol)}
                      description={`Base + Bonus + Equity`}
                      tier={tiers[i]}
                      featured={i === 1}
                    />
                  );
                })}
              </div>

              {/* Stacked bar chart */}
              <TotalCompChart
                p25={compensation.p25} p50={compensation.p50} p75={compensation.p75}
                bonusP25={compensation.bonusP25} bonusP50={compensation.bonusP50} bonusP75={compensation.bonusP75}
                equityP25={compensation.equityP25} equityP50={compensation.equityP50} equityP75={compensation.equityP75}
                currencySymbol={compensation.currencySymbol}
              />
            </>
          )}

          <p className="text-xs text-muted-foreground text-center">
            Benchmarks are indicative and based on market data. Actual offers may vary based on
            experience, skills, and other factors.
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
