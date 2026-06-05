import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts";
import { TrendingUp } from "lucide-react";

const data = [
  { day: "Mon", solved: 4, easy: 2, medium: 1, hard: 1 },
  { day: "Tue", solved: 2, easy: 1, medium: 1, hard: 0 },
  { day: "Wed", solved: 6, easy: 3, medium: 2, hard: 1 },
  { day: "Thu", solved: 3, easy: 2, medium: 1, hard: 0 },
  { day: "Fri", solved: 5, easy: 2, medium: 2, hard: 1 },
  { day: "Sat", solved: 7, easy: 4, medium: 2, hard: 1 },
  { day: "Sun", solved: 3, easy: 1, medium: 2, hard: 0 },
];

const today = "Sun";

interface TooltipProps {
  active?: boolean;
  payload?: Array<{ value: number; payload: { day: string } }>;
  label?: string;
}

function CustomTooltip({ active, payload, label }: TooltipProps) {
  if (active && payload && payload.length) {
    return (
      <div
        className="bg-white rounded-xl py-2.5 px-3.5"
        style={{ border: "1px solid #E2E8F0", boxShadow: "0 8px 24px rgba(0,0,0,0.10)" }}
      >
        <p className="text-[#64748B] mb-1" style={{ fontSize: "11px", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em" }}>
          {label}
        </p>
        <p style={{ fontSize: "20px", fontWeight: 800, color: "#2563EB", lineHeight: 1.1 }}>
          {payload[0].value}
        </p>
        <p className="text-[#94A3B8]" style={{ fontSize: "11px", fontWeight: 500 }}>
          problems solved
        </p>
      </div>
    );
  }
  return null;
}

export function WeeklyChart() {
  const total = data.reduce((sum, d) => sum + d.solved, 0);
  const avg = (total / data.length).toFixed(1);

  return (
    <div
      className="bg-white rounded-2xl border border-[#E2E8F0] p-5"
      style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}
    >
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="text-[#0F172A]" style={{ fontSize: "16px", fontWeight: 700 }}>
            Weekly Activity
          </h3>
          <p className="text-[#64748B] mt-0.5" style={{ fontSize: "13px", fontWeight: 500 }}>
            This week's problem-solving activity
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="text-right">
            <div style={{ fontSize: "22px", fontWeight: 800, color: "#0F172A", lineHeight: 1.1 }}>{total}</div>
            <div className="text-[#64748B]" style={{ fontSize: "11px", fontWeight: 600 }}>total this week</div>
          </div>
          <div
            className="w-9 h-9 rounded-xl flex items-center justify-center"
            style={{ background: "#DBEAFE" }}
          >
            <TrendingUp size={18} color="#2563EB" strokeWidth={2.5} />
          </div>
        </div>
      </div>

      <div style={{ height: 160 }}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} barSize={28} margin={{ top: 0, right: 0, bottom: 0, left: -20 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" vertical={false} />
            <XAxis
              dataKey="day"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#94A3B8", fontSize: 12, fontWeight: 600, fontFamily: "Manrope" }}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#CBD5E1", fontSize: 11, fontWeight: 500, fontFamily: "Manrope" }}
            />
            <Tooltip content={<CustomTooltip />} cursor={{ fill: "#F8FAFC", radius: 8 }} />
            <Bar dataKey="solved" radius={[6, 6, 0, 0]}>
              {data.map((entry) => (
                <Cell
                  key={entry.day}
                  fill={entry.day === today ? "#2563EB" : "#BFDBFE"}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="flex items-center gap-4 mt-3 pt-3 border-t border-[#F1F5F9]">
        <div className="flex items-center gap-1.5">
          <div className="w-2.5 h-2.5 rounded-sm" style={{ background: "#2563EB" }} />
          <span className="text-[#64748B]" style={{ fontSize: "12px", fontWeight: 500 }}>Today</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-2.5 h-2.5 rounded-sm" style={{ background: "#BFDBFE" }} />
          <span className="text-[#64748B]" style={{ fontSize: "12px", fontWeight: 500 }}>Previous days</span>
        </div>
        <div className="ml-auto text-[#64748B]" style={{ fontSize: "12px", fontWeight: 500 }}>
          Avg: <span style={{ fontWeight: 700, color: "#0F172A" }}>{avg}</span>/day
        </div>
      </div>
    </div>
  );
}
