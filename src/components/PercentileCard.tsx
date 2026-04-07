import { cn } from "@/lib/utils";

interface PercentileCardProps {
  label: string;
  value: string;
  description: string;
  tier: "low" | "mid" | "high";
  featured?: boolean;
}

export function PercentileCard({
  label,
  value,
  description,
  tier,
  featured,
}: PercentileCardProps) {
  return (
    <div
      className={cn(
        "relative rounded-xl border p-6 text-center transition-all duration-300",
        featured
          ? "bg-card border-primary/30 glow-border scale-[1.02]"
          : "bg-card border-border hover:border-primary/20"
      )}
    >
      {featured && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 bg-primary text-primary-foreground text-xs font-semibold rounded-full">
          Market Rate
        </div>
      )}
      <p className="text-xs text-muted-foreground uppercase tracking-wider font-medium mb-3">
        {label}
      </p>
      <p
        className={cn(
          "text-3xl font-bold tracking-tight mb-1",
          tier === "low" && "text-percentile-low",
          tier === "mid" && "text-primary",
          tier === "high" && "text-percentile-high"
        )}
      >
        {value}
      </p>
      <p className="text-sm text-muted-foreground">{description}</p>
    </div>
  );
}
