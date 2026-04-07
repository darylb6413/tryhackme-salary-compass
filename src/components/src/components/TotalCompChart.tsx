import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
  Legend,
} from "recharts";
import { formatSalary } from "@/data/compensationData";

interface TotalCompChartProps {
  p25: number;
  p50: number;
  p75: number;
  bonusP25: number;
  bonusP50: number;
  bonusP75: number;
  equityP25: number;
  equityP50: number;
  equityP75: number;
  currencySymbol: string;
}

const COLORS = {
  base:   "hsl(var(--primary))",
  bonus:  "hsl(var(--percentile-mid))",
  equity: "hsl(var(--percentile-high))",
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const CustomTooltip = ({ active, payload, label, currencySymbol }: any) => {
  if (!active || !payload?.length) return null;
  const total = payload.reduce((s: number, p: { value: number }) => s + p.value, 0);
  return (
    <div className="bg-card border border-border rounded-xl p-4 shadow-lg text-sm">
      <p className="font-semibold text-foreground mb-2">{label}</p>
      {payload.map((p: { name: string; value: number; color: string }) => (
        <div key={p.name} className="flex justify-between gap-6 mb-1">
          <span className="flex items-center gap-2 text-muted-foreground">
            <span className="w-2.5 h-2.5 rounded-sm inline-block" style={{ background: p.color }} />
            {p.name}
          </span>
          <span className="font-medium text-foreground">
            {formatSalary(p.value, currencySymbol)}
          </span>
        </div>
      ))}
      <div className="border-t border-border mt-2 pt-2 flex justify-between font-semibold text-foreground">
        <span>Total</span>
        <span>{formatSalary(total, currencySymbol)}</span>
      </div>
    </div>
  );
};

export function TotalCompChart({
  p25, p50, p75,
  bonusP25, bonusP50, bonusP75,
  equityP25, equityP50, equityP75,
  currencySymbol,
}: TotalCompChartProps) {
  const data = [
    { name: "25th Percentile", Base: p25,  Bonus: bonusP25, Equity: equityP25 },
    { name: "50th Percentile", Base: p50,  Bonus: bonusP50, Equity: equityP50 },
    { name: "75th Percentile", Base: p75,  Bonus: bonusP75, Equity: equityP75 },
  ];

  const maxVal = Math.max(p75 + bonusP75 + equityP75);
  const yTickFormatter = (v: number) => {
    if (v >= 1_000_000) return `${currencySymbol}${(v / 1_000_000).toFixed(1)}M`;
    if (v >= 1_000)     return `${currencySymbol}${(v / 1_000).toFixed(0)}k`;
    return `${currencySymbol}${v}`;
  };

  return (
    <div className="bg-card rounded-xl border border-border p-6">
      <p className="text-xs text-muted-foreground uppercase tracking-wider font-medium mb-5">
        Total Compensation Breakdown
      </p>
      <ResponsiveContainer width="100%" height={260}>
        <BarChart data={data} barCategoryGap="30%" barGap={4}>
          <XAxis
            dataKey="name"
            tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            tickFormatter={yTickFormatter}
            tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }}
            axisLine={false}
            tickLine={false}
            domain={[0, Math.ceil(maxVal * 1.1)]}
            width={56}
          />
          <Tooltip
            content={<CustomTooltip currencySymbol={currencySymbol} />}
            cursor={{ fill: "hsl(var(--secondary))", radius: 6 }}
          />
          <Legend
            wrapperStyle={{ fontSize: 12, color: "hsl(var(--muted-foreground))" }}
            iconType="square"
            iconSize={10}
          />
          <Bar dataKey="Base"   stackId="a" fill={COLORS.base}   radius={[0, 0, 0, 0]} name="Base Salary">
            {data.map((_, i) => <Cell key={i} fill={COLORS.base} />)}
          </Bar>
          <Bar dataKey="Bonus"  stackId="a" fill={COLORS.bonus}  radius={[0, 0, 0, 0]} name="Bonus (est.)">
            {data.map((_, i) => <Cell key={i} fill={COLORS.bonus} />)}
          </Bar>
          <Bar dataKey="Equity" stackId="a" fill={COLORS.equity} radius={[4, 4, 0, 0]} name="Equity (ann.)">
            {data.map((_, i) => <Cell key={i} fill={COLORS.equity} />)}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
      <p className="text-xs text-muted-foreground mt-3">
        Bonus figures are estimated based on role type. Equity shown as approximate annual vesting value.
      </p>
    </div>
  );
}
