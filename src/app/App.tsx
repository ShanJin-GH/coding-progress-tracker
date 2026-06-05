import { useState } from "react";
import { Plus, Bell, Search, User } from "lucide-react";
import { Sidebar } from "./components/Sidebar";
import { StatCards } from "./components/StatCards";
import { DailyGoal } from "./components/DailyGoal";
import { WeeklyChart } from "./components/WeeklyChart";
import { DifficultyBreakdown } from "./components/DifficultyBreakdown";
import { ProblemTable } from "./components/ProblemTable";

{/* MARKER-MAKE-KIT-INVOKED */}

const pageContent: Record<
  string,
  { title: string; subtitle: string; content: React.ReactNode }
> = {};

function AddProblemModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/30 backdrop-blur-sm" onClick={onClose} />
      <div
        className="relative bg-white rounded-2xl p-6 w-full max-w-md"
        style={{ boxShadow: "0 24px 64px rgba(0,0,0,0.15)", border: "1px solid #E2E8F0" }}
      >
        <h2 className="text-[#0F172A] mb-1" style={{ fontSize: "20px", fontWeight: 700 }}>
          Add Problem
        </h2>
        <p className="text-[#64748B] mb-5" style={{ fontSize: "13px", fontWeight: 500 }}>
          Log a new LeetCode problem to your tracker
        </p>

        <div className="space-y-4">
          <div>
            <label className="block text-[#475569] mb-1.5" style={{ fontSize: "12px", fontWeight: 700 }}>
              Problem Title
            </label>
            <input
              className="w-full px-3.5 py-2.5 bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl outline-none focus:border-[#93C5FD] focus:ring-2 focus:ring-[#DBEAFE] transition-all"
              style={{ fontSize: "13px", fontWeight: 500, color: "#0F172A" }}
              placeholder="e.g. Two Sum"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-[#475569] mb-1.5" style={{ fontSize: "12px", fontWeight: 700 }}>
                Difficulty
              </label>
              <select
                className="w-full px-3.5 py-2.5 bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl outline-none focus:border-[#93C5FD] transition-all cursor-pointer"
                style={{ fontSize: "13px", fontWeight: 500, color: "#475569" }}
              >
                <option>Easy</option>
                <option>Medium</option>
                <option>Hard</option>
              </select>
            </div>
            <div>
              <label className="block text-[#475569] mb-1.5" style={{ fontSize: "12px", fontWeight: 700 }}>
                Status
              </label>
              <select
                className="w-full px-3.5 py-2.5 bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl outline-none focus:border-[#93C5FD] transition-all cursor-pointer"
                style={{ fontSize: "13px", fontWeight: 500, color: "#475569" }}
              >
                <option>Solved</option>
                <option>In Progress</option>
                <option>Not Started</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-[#475569] mb-1.5" style={{ fontSize: "12px", fontWeight: 700 }}>
              Notes (optional)
            </label>
            <textarea
              rows={3}
              className="w-full px-3.5 py-2.5 bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl outline-none focus:border-[#93C5FD] focus:ring-2 focus:ring-[#DBEAFE] transition-all resize-none"
              style={{ fontSize: "13px", fontWeight: 500, color: "#0F172A" }}
              placeholder="Approach, key insights, time complexity..."
            />
          </div>

          <div className="flex gap-3 pt-1">
            <button
              onClick={onClose}
              className="flex-1 py-2.5 bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl hover:bg-[#F1F5F9] transition-all"
              style={{ fontSize: "14px", fontWeight: 600, color: "#475569" }}
            >
              Cancel
            </button>
            <button
              onClick={onClose}
              className="flex-1 py-2.5 rounded-xl hover:opacity-90 active:scale-95 transition-all"
              style={{ fontSize: "14px", fontWeight: 700, color: "#ffffff", background: "linear-gradient(135deg, #3B82F6 0%, #2563EB 100%)" }}
            >
              Add Problem
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function DashboardPage({ onAddProblem }: { onAddProblem: () => void }) {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
        <div>
          <h1 className="text-[#0F172A]" style={{ fontSize: "28px", fontWeight: 800, lineHeight: 1.2 }}>
            Dashboard
          </h1>
          <p className="text-[#64748B] mt-1" style={{ fontSize: "14px", fontWeight: 500 }}>
            Your personalized LeetCode journey overview
          </p>
        </div>
        <button
          onClick={onAddProblem}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl hover:opacity-90 active:scale-95 transition-all duration-150 self-start flex-shrink-0"
          style={{
            background: "linear-gradient(135deg, #3B82F6 0%, #2563EB 100%)",
            color: "#ffffff",
            fontSize: "14px",
            fontWeight: 700,
            boxShadow: "0 4px 12px rgba(37,99,235,0.30)",
          }}
        >
          <Plus size={16} strokeWidth={2.5} />
          Add Problem
        </button>
      </div>

      {/* Stat Cards */}
      <StatCards />

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2">
          <WeeklyChart />
        </div>
        <div>
          <DifficultyBreakdown />
        </div>
      </div>

      {/* Daily Goal + Problem Table Row */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
        <div>
          <DailyGoal />
        </div>
        <div className="xl:col-span-2">
          <ProblemTable />
        </div>
      </div>
    </div>
  );
}

function PlaceholderPage({ title, subtitle, emoji }: { title: string; subtitle: string; emoji: string }) {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-[#0F172A]" style={{ fontSize: "28px", fontWeight: 800, lineHeight: 1.2 }}>
          {title}
        </h1>
        <p className="text-[#64748B] mt-1" style={{ fontSize: "14px", fontWeight: 500 }}>
          {subtitle}
        </p>
      </div>
      <div
        className="bg-white rounded-2xl border border-[#E2E8F0] p-16 flex flex-col items-center justify-center gap-4"
        style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}
      >
        <span style={{ fontSize: "56px" }}>{emoji}</span>
        <div className="text-center">
          <p className="text-[#0F172A]" style={{ fontSize: "18px", fontWeight: 700 }}>
            {title} coming soon
          </p>
          <p className="text-[#94A3B8] mt-1" style={{ fontSize: "14px", fontWeight: 500 }}>
            This section is under construction. Check back soon!
          </p>
        </div>
      </div>
    </div>
  );
}

const pages: Record<string, React.ReactNode> = {
  goals: <PlaceholderPage title="Goals & Targets" subtitle="Set and track your coding goals" emoji="🎯" />,
  schedule: <PlaceholderPage title="Schedule" subtitle="Plan your practice sessions" emoji="📅" />,
  progress: <PlaceholderPage title="Progress" subtitle="Visualize your growth over time" emoji="📈" />,
  problems: <PlaceholderPage title="All Problems" subtitle="Browse and manage your problem library" emoji="📚" />,
  settings: <PlaceholderPage title="Settings" subtitle="Customize your LeetTrack experience" emoji="⚙️" />,
};

export default function App() {
  const [activeNav, setActiveNav] = useState("dashboard");
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex" style={{ fontFamily: "'Manrope', sans-serif" }}>
      {/* Sidebar */}
      <Sidebar activeNav={activeNav} onNavChange={setActiveNav} />

      {/* Main Content */}
      <div className="flex-1 ml-64 flex flex-col min-h-screen">
        {/* Top Bar */}
        <header className="sticky top-0 z-20 bg-white/80 backdrop-blur-md border-b border-[#E2E8F0] px-6 py-3 flex items-center justify-between">
          <div className="relative">
            <Search size={15} color="#94A3B8" className="absolute left-3 top-1/2 -translate-y-1/2" strokeWidth={2.5} />
            <input
              placeholder="Search problems, topics..."
              className="pl-9 pr-4 py-2 bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl outline-none focus:border-[#93C5FD] focus:ring-2 focus:ring-[#DBEAFE] transition-all w-64"
              style={{ fontSize: "13px", fontWeight: 500, color: "#0F172A" }}
            />
          </div>

          <div className="flex items-center gap-2">
            <button className="w-9 h-9 flex items-center justify-center rounded-xl hover:bg-[#F8FAFC] transition-colors relative border border-[#E2E8F0]">
              <Bell size={16} color="#64748B" strokeWidth={2.5} />
              <span
                className="absolute top-2 right-2 w-1.5 h-1.5 rounded-full"
                style={{ background: "#EF4444" }}
              />
            </button>
            <div className="flex items-center gap-2 pl-2 pr-3 py-1.5 rounded-xl hover:bg-[#F8FAFC] transition-colors cursor-pointer border border-[#E2E8F0]">
              <div
                className="w-7 h-7 rounded-lg flex items-center justify-center"
                style={{ background: "linear-gradient(135deg, #DBEAFE 0%, #EFF6FF 100%)" }}
              >
                <User size={15} color="#2563EB" strokeWidth={2.5} />
              </div>
              <span className="text-[#0F172A]" style={{ fontSize: "13px", fontWeight: 600 }}>Alex Chen</span>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 px-6 py-6">
          {activeNav === "dashboard" ? (
            <DashboardPage onAddProblem={() => setModalOpen(true)} />
          ) : (
            pages[activeNav] ?? null
          )}
        </main>
      </div>

      <AddProblemModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </div>
  );
}
