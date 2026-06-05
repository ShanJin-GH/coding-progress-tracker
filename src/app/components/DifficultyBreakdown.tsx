import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

const data = [
  { name: "Easy", value: 142, color: "#16A34A", bg: "#DCFCE7", total: 620 },
  { name: "Medium", value: 87, color: "#D97706", bg: "#FEF3C7", total: 1595 },
  { name: "Hard", value: 18, color: "#EF4444", bg: "#FEE2E2", total: 597 },
];

interface TooltipProps {
  active?: boolean;
  payload?: Array<{ name: string; value: number; payload: typeof data[0] }>;
}

function CustomTooltip({ active, payload }: TooltipProps) {
  if (active && payload && payload.length) {
    const d = payload[0].payload;
    return (
      <div
        className="bg-white rounded-xl py-2 px-3"
        style={{ border: "1px solid #E2E8F0", boxShadow: "0 8px 24px rgba(0,0,0,0.10)" }}
      >
        <p style={{ fontSize: "13px", fontWeight: 700, color: d.color }}>{d.name}</p>
        <p className="text-[#0F172A]" style={{ fontSize: "20px", fontWeight: 800, lineHeight: 1.2 }}>{d.value}</p>
        <p className="text-[#94A3B8]" style={{ fontSize: "11px", fontWeight: 500 }}>of {d.total} total</p>
      </div>
    );
  }
  return null;
}

export function DifficultyBreakdown() {
  const total = data.reduce((s, d) => s + d.value, 0);

  return (
    <div
      className="bg-white rounded-2xl border border-[#E2E8F0] p-5"
      style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}
    >
      <div className="mb-4">
        <h3 className="text-[#0F172A]" style={{ fontSize: "16px", fontWeight: 700 }}>
          Difficulty Breakdown
        </h3>
        <p className="text-[#64748B] mt-0.5" style={{ fontSize: "13px", fontWeight: 500 }}>
          {total} problems solved across all levels
        </p>
      </div>

      <div className="flex items-center gap-4">
        <div style={{ height: 120, width: 120, flexShrink: 0 }}>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={34}
                outerRadius={54}
                paddingAngle={3}
                dataKey="value"
                strokeWidth={0}
              >
                {data.map((entry, i) => (
                  <Cell key={i} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="flex-1 space-y-2.5">
          {data.map((d) => {
            const pct = Math.round((d.value / d.total) * 100);
            return (
              <div key={d.name}>
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: d.color }} />
                    <span className="text-[#475569]" style={{ fontSize: "12px", fontWeight: 600 }}>{d.name}</span>
                  </div>
                  <span style={{ fontSize: "13px", fontWeight: 700, color: d.color }}>{d.value}</span>
                </div>
                <div className="h-1.5 bg-[#F1F5F9] rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-700"
                    style={{ width: `${pct}%`, background: d.color }}
                  />
                </div>
                <p className="text-[#CBD5E1] mt-0.5 text-right" style={{ fontSize: "10px", fontWeight: 500 }}>
                  {pct}% of {d.total}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
