import { Target, CheckCircle2, Circle } from "lucide-react";

const solved = 3;
const target = 5;
const percentage = Math.round((solved / target) * 100);

const todayProblems = [
  { title: "Two Sum", difficulty: "Easy", solved: true },
  { title: "Valid Parentheses", difficulty: "Easy", solved: true },
  { title: "Longest Substring Without Repeating Characters", difficulty: "Medium", solved: true },
  { title: "Median of Two Sorted Arrays", difficulty: "Hard", solved: false },
  { title: "Container With Most Water", difficulty: "Medium", solved: false },
];

const difficultyColor: Record<string, string> = {
  Easy: "#16A34A",
  Medium: "#D97706",
  Hard: "#EF4444",
};

const difficultyBg: Record<string, string> = {
  Easy: "#DCFCE7",
  Medium: "#FEF3C7",
  Hard: "#FEE2E2",
};

export function DailyGoal() {
  return (
    <div
      className="bg-white rounded-2xl border border-[#E2E8F0] overflow-hidden"
      style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}
    >
      <div className="p-5 pb-4">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h3 className="text-[#0F172A]" style={{ fontSize: "16px", fontWeight: 700 }}>
              Daily Goal
            </h3>
            <p className="text-[#64748B] mt-0.5" style={{ fontSize: "13px", fontWeight: 500 }}>
              Keep your momentum going!
            </p>
          </div>
          <div
            className="w-10 h-10 rounded-2xl flex items-center justify-center flex-shrink-0"
            style={{ background: "linear-gradient(135deg, #DBEAFE 0%, #EFF6FF 100%)", border: "1px solid #BFDBFE" }}
          >
            <Target size={20} color="#2563EB" strokeWidth={2.5} />
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mb-3">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[#475569]" style={{ fontSize: "13px", fontWeight: 600 }}>
              {solved} / {target} problems
            </span>
            <span style={{ fontSize: "13px", fontWeight: 700, color: "#2563EB" }}>{percentage}%</span>
          </div>
          <div className="h-2.5 bg-[#F1F5F9] rounded-full overflow-hidden">
            <div
              className="h-full rounded-full transition-all duration-700"
              style={{
                width: `${percentage}%`,
                background: "linear-gradient(90deg, #3B82F6 0%, #2563EB 100%)",
              }}
            />
          </div>
          <div className="flex items-center justify-between mt-1.5">
            <span className="text-[#94A3B8]" style={{ fontSize: "11px", fontWeight: 500 }}>
              {target - solved} more to reach your goal
            </span>
            {solved >= target ? (
              <span className="text-[#16A34A]" style={{ fontSize: "11px", fontWeight: 600 }}>
                🎉 Goal achieved!
              </span>
            ) : (
              <span className="text-[#D97706]" style={{ fontSize: "11px", fontWeight: 600 }}>
                Keep going!
              </span>
            )}
          </div>
        </div>
      </div>

      <div className="px-5 pb-5">
        <p className="text-[#94A3B8] mb-2.5" style={{ fontSize: "11px", fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase" }}>
          Today's Problems
        </p>
        <div className="space-y-2">
          {todayProblems.map((problem, i) => (
            <div key={i} className="flex items-center gap-3 py-2 px-3 rounded-xl hover:bg-[#F8FAFC] transition-colors duration-150 cursor-pointer group">
              {problem.solved ? (
                <CheckCircle2 size={16} color="#16A34A" strokeWidth={2.5} className="flex-shrink-0" />
              ) : (
                <Circle size={16} color="#CBD5E1" strokeWidth={2} className="flex-shrink-0" />
              )}
              <span
                className="flex-1 truncate"
                style={{
                  fontSize: "13px",
                  fontWeight: 500,
                  color: problem.solved ? "#64748B" : "#0F172A",
                  textDecoration: problem.solved ? "line-through" : "none",
                }}
              >
                {problem.title}
              </span>
              <span
                className="px-2 py-0.5 rounded-lg flex-shrink-0"
                style={{
                  fontSize: "11px",
                  fontWeight: 700,
                  color: difficultyColor[problem.difficulty],
                  background: difficultyBg[problem.difficulty],
                }}
              >
                {problem.difficulty}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
