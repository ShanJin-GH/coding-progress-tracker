import { Flame, CheckCircle2, TrendingUp, Clock } from "lucide-react";

const stats = [
  {
    label: "Current Streak",
    value: "14",
    unit: "days",
    icon: Flame,
    iconBg: "#FEF3C7",
    iconColor: "#D97706",
    valuColor: "#D97706",
    trend: "+2 this week",
    trendUp: true,
  },
  {
    label: "Solved Today",
    value: "3",
    unit: "problems",
    icon: CheckCircle2,
    iconBg: "#DCFCE7",
    iconColor: "#16A34A",
    valuColor: "#16A34A",
    trend: "Goal: 5/day",
    trendUp: true,
  },
  {
    label: "Total Solved",
    value: "247",
    unit: "all time",
    icon: TrendingUp,
    iconBg: "#DBEAFE",
    iconColor: "#2563EB",
    valuColor: "#2563EB",
    trend: "+12 this month",
    trendUp: true,
  },
  {
    label: "In Progress",
    value: "8",
    unit: "problems",
    icon: Clock,
    iconBg: "#F3E8FF",
    iconColor: "#9333EA",
    valuColor: "#9333EA",
    trend: "3 due this week",
    trendUp: false,
  },
];

export function StatCards() {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat) => {
        const Icon = stat.icon;
        return (
          <div
            key={stat.label}
            className="bg-white rounded-2xl p-5 border border-[#E2E8F0] hover:shadow-md transition-all duration-200 cursor-default group"
            style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-[#64748B]" style={{ fontSize: "13px", fontWeight: 600 }}>
                {stat.label}
              </span>
              <div
                className="w-8 h-8 rounded-xl flex items-center justify-center transition-transform duration-200 group-hover:scale-110"
                style={{ background: stat.iconBg }}
              >
                <Icon size={16} color={stat.iconColor} strokeWidth={2.5} />
              </div>
            </div>
            <div className="flex items-baseline gap-1.5 mb-1.5">
              <span style={{ fontSize: "28px", fontWeight: 800, color: stat.valuColor, lineHeight: 1 }}>
                {stat.value}
              </span>
              <span className="text-[#94A3B8]" style={{ fontSize: "12px", fontWeight: 500 }}>
                {stat.unit}
              </span>
            </div>
            <div className="flex items-center gap-1">
              <span
                className="inline-flex items-center"
                style={{ fontSize: "11px", fontWeight: 600, color: stat.trendUp ? "#16A34A" : "#D97706" }}
              >
                {stat.trend}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
