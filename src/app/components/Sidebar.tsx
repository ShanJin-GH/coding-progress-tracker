import { useState } from "react";
import {
  LayoutDashboard,
  Target,
  Calendar,
  BarChart3,
  ListChecks,
  Settings,
  TrendingUp,
  Flame,
  CheckCircle2,
} from "lucide-react";

const navItems = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { id: "goals", label: "Goals & Targets", icon: Target },
  { id: "schedule", label: "Schedule", icon: Calendar },
  { id: "progress", label: "Progress", icon: BarChart3 },
  { id: "problems", label: "All Problems", icon: ListChecks },
  { id: "settings", label: "Settings", icon: Settings },
];

const todayStats = [
  { label: "Solved Today", value: "3", icon: CheckCircle2, color: "#16A34A" },
  { label: "Current Streak", value: "14", icon: Flame, color: "#D97706" },
  { label: "Total Solved", value: "247", icon: TrendingUp, color: "#2563EB" },
];

interface SidebarProps {
  activeNav: string;
  onNavChange: (id: string) => void;
}

export function Sidebar({ activeNav, onNavChange }: SidebarProps) {
  return (
    <aside className="fixed left-0 top-0 h-screen w-64 flex flex-col bg-white border-r border-[#E2E8F0] z-30 overflow-y-auto">
      {/* Logo & Brand */}
      <div className="px-5 pt-6 pb-5">
        <div className="flex items-center gap-3">
          <div
            className="w-9 h-9 rounded-xl flex items-center justify-center shadow-sm flex-shrink-0"
            style={{ background: "linear-gradient(135deg, #16A34A 0%, #15803D 100%)" }}
          >
            <TrendingUp size={18} color="#ffffff" strokeWidth={2.5} />
          </div>
          <div>
            <div className="text-[#0F172A] leading-tight" style={{ fontSize: "16px", fontWeight: 700 }}>
              LeetTrack
            </div>
            <div className="text-[#64748B]" style={{ fontSize: "11px", fontWeight: 500 }}>
              Track your coding journey
            </div>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="mx-4 h-px bg-[#E2E8F0]" />

      {/* Navigation */}
      <nav className="flex-1 px-3 pt-4 pb-4 space-y-0.5">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeNav === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onNavChange(item.id)}
              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-150 cursor-pointer text-left group relative"
              style={{
                background: isActive ? "#EFF6FF" : "transparent",
                color: isActive ? "#2563EB" : "#475569",
              }}
            >
              {isActive && (
                <span
                  className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 rounded-r-full"
                  style={{ background: "#2563EB" }}
                />
              )}
              <Icon
                size={18}
                strokeWidth={isActive ? 2.5 : 2}
                color={isActive ? "#2563EB" : "#94A3B8"}
                className="transition-colors duration-150 flex-shrink-0"
              />
              <span
                style={{
                  fontSize: "14px",
                  fontWeight: isActive ? 600 : 500,
                }}
              >
                {item.label}
              </span>
            </button>
          );
        })}
      </nav>

      {/* Today's Progress Widget */}
      <div className="mx-3 mb-5">
        <div
          className="rounded-2xl p-4"
          style={{ background: "linear-gradient(135deg, #EFF6FF 0%, #DBEAFE 100%)", border: "1px solid #BFDBFE" }}
        >
          <div className="flex items-center gap-2 mb-3">
            <div
              className="w-6 h-6 rounded-lg flex items-center justify-center"
              style={{ background: "#2563EB" }}
            >
              <BarChart3 size={13} color="#ffffff" strokeWidth={2.5} />
            </div>
            <span className="text-[#1D4ED8]" style={{ fontSize: "12px", fontWeight: 700 }}>
              Today's Progress
            </span>
          </div>
          <div className="space-y-2">
            {todayStats.map((stat) => {
              const Icon = stat.icon;
              return (
                <div key={stat.label} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Icon size={13} color={stat.color} strokeWidth={2.5} />
                    <span className="text-[#475569]" style={{ fontSize: "12px", fontWeight: 500 }}>
                      {stat.label}
                    </span>
                  </div>
                  <span style={{ fontSize: "13px", fontWeight: 700, color: stat.color }}>{stat.value}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </aside>
  );
}
