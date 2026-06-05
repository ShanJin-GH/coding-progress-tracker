import { useState } from "react";
import { ChevronDown, Search, ExternalLink, BookmarkPlus, Star } from "lucide-react";

type Difficulty = "All" | "Easy" | "Medium" | "Hard";
type Status = "All" | "Solved" | "In Progress" | "Not Started";

const problems = [
  { id: 1, title: "Two Sum", difficulty: "Easy", status: "Solved", category: "Array", acceptance: "49.1%", starred: true },
  { id: 2, title: "Add Two Numbers", difficulty: "Medium", status: "Solved", category: "Linked List", acceptance: "41.2%", starred: false },
  { id: 3, title: "Longest Substring Without Repeating Characters", difficulty: "Medium", status: "Solved", category: "Sliding Window", acceptance: "34.6%", starred: true },
  { id: 4, title: "Median of Two Sorted Arrays", difficulty: "Hard", status: "In Progress", category: "Binary Search", acceptance: "38.5%", starred: false },
  { id: 5, title: "Longest Palindromic Substring", difficulty: "Medium", status: "Not Started", category: "DP", acceptance: "33.8%", starred: false },
  { id: 6, title: "Zigzag Conversion", difficulty: "Medium", status: "Solved", category: "String", acceptance: "45.9%", starred: false },
  { id: 7, title: "Reverse Integer", difficulty: "Medium", status: "Solved", category: "Math", acceptance: "27.4%", starred: true },
  { id: 8, title: "String to Integer (atoi)", difficulty: "Medium", status: "Not Started", category: "String", acceptance: "16.9%", starred: false },
  { id: 9, title: "Palindrome Number", difficulty: "Easy", status: "Solved", category: "Math", acceptance: "54.2%", starred: false },
  { id: 10, title: "Regular Expression Matching", difficulty: "Hard", status: "In Progress", category: "DP", acceptance: "28.1%", starred: false },
  { id: 11, title: "Container With Most Water", difficulty: "Medium", status: "In Progress", category: "Two Pointers", acceptance: "54.6%", starred: true },
  { id: 15, title: "3Sum", difficulty: "Medium", status: "Not Started", category: "Two Pointers", acceptance: "32.6%", starred: false },
  { id: 20, title: "Valid Parentheses", difficulty: "Easy", status: "Solved", category: "Stack", acceptance: "40.8%", starred: false },
  { id: 21, title: "Merge Two Sorted Lists", difficulty: "Easy", status: "Solved", category: "Linked List", acceptance: "62.3%", starred: false },
  { id: 42, title: "Trapping Rain Water", difficulty: "Hard", status: "Not Started", category: "Two Pointers", acceptance: "60.7%", starred: false },
];

const difficultyColor: Record<string, string> = { Easy: "#16A34A", Medium: "#D97706", Hard: "#EF4444" };
const difficultyBg: Record<string, string> = { Easy: "#DCFCE7", Medium: "#FEF3C7", Hard: "#FEE2E2" };
const statusColor: Record<string, string> = { Solved: "#16A34A", "In Progress": "#2563EB", "Not Started": "#94A3B8" };
const statusBg: Record<string, string> = { Solved: "#DCFCE7", "In Progress": "#DBEAFE", "Not Started": "#F1F5F9" };

function FilterDropdown<T extends string>({
  value,
  options,
  onChange,
  label,
}: {
  value: T;
  options: T[];
  onChange: (v: T) => void;
  label: string;
}) {
  const [open, setOpen] = useState(false);
  return (
    <div className="relative">
      <button
        onClick={() => setOpen((p) => !p)}
        className="flex items-center gap-2 px-3.5 py-2 bg-white border border-[#E2E8F0] rounded-xl hover:border-[#93C5FD] hover:shadow-sm transition-all duration-150"
        style={{ fontSize: "13px", fontWeight: 600, color: value !== (options[0] as string) ? "#2563EB" : "#475569" }}
      >
        <span>{label}: {value}</span>
        <ChevronDown size={14} strokeWidth={2.5} className={`transition-transform duration-200 ${open ? "rotate-180" : ""}`} />
      </button>
      {open && (
        <div
          className="absolute top-full left-0 mt-1.5 bg-white border border-[#E2E8F0] rounded-xl py-1.5 min-w-[140px] z-20"
          style={{ boxShadow: "0 8px 24px rgba(0,0,0,0.10)" }}
        >
          {options.map((opt) => (
            <button
              key={opt}
              onClick={() => { onChange(opt); setOpen(false); }}
              className="w-full text-left px-4 py-2 hover:bg-[#F8FAFC] transition-colors duration-100"
              style={{
                fontSize: "13px",
                fontWeight: opt === value ? 700 : 500,
                color: opt === value ? "#2563EB" : "#475569",
              }}
            >
              {opt}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export function ProblemTable() {
  const [difficulty, setDifficulty] = useState<Difficulty>("All");
  const [status, setStatus] = useState<Status>("All");
  const [search, setSearch] = useState("");
  const [starredMap, setStarredMap] = useState<Record<number, boolean>>(
    Object.fromEntries(problems.map((p) => [p.id, p.starred]))
  );

  const filtered = problems.filter((p) => {
    if (difficulty !== "All" && p.difficulty !== difficulty) return false;
    if (status !== "All" && p.status !== status) return false;
    if (search && !p.title.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  return (
    <div
      className="bg-white rounded-2xl border border-[#E2E8F0] overflow-hidden"
      style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}
    >
      {/* Filter Bar */}
      <div className="px-5 pt-5 pb-4 border-b border-[#F1F5F9]">
        <div className="flex flex-wrap items-center gap-3">
          {/* Search */}
          <div className="flex-1 min-w-[200px] relative">
            <Search size={15} color="#94A3B8" className="absolute left-3 top-1/2 -translate-y-1/2" strokeWidth={2.5} />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search problems..."
              className="w-full pl-9 pr-4 py-2 bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl outline-none focus:border-[#93C5FD] focus:ring-2 focus:ring-[#DBEAFE] transition-all duration-150"
              style={{ fontSize: "13px", fontWeight: 500, color: "#0F172A" }}
            />
          </div>
          <FilterDropdown
            value={difficulty}
            options={["All", "Easy", "Medium", "Hard"] as Difficulty[]}
            onChange={setDifficulty}
            label="Difficulty"
          />
          <FilterDropdown
            value={status}
            options={["All", "Solved", "In Progress", "Not Started"] as Status[]}
            onChange={setStatus}
            label="Status"
          />
          <div
            className="ml-auto px-3.5 py-2 rounded-xl"
            style={{ background: "#F8FAFC", border: "1px solid #E2E8F0" }}
          >
            <span className="text-[#64748B]" style={{ fontSize: "13px", fontWeight: 500 }}>
              <span style={{ fontWeight: 700, color: "#0F172A" }}>{filtered.length}</span> problems
            </span>
          </div>
        </div>
      </div>

      {/* Table Header */}
      <div className="grid grid-cols-[24px_1fr_110px_120px_100px_80px_36px] items-center gap-3 px-5 py-3 border-b border-[#F1F5F9]">
        {["", "Title", "Category", "Status", "Difficulty", "Acceptance", ""].map((col, i) => (
          <span key={i} className="text-[#94A3B8]" style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "0.05em", textTransform: "uppercase" }}>
            {col}
          </span>
        ))}
      </div>

      {/* Rows */}
      <div className="divide-y divide-[#F8FAFC]">
        {filtered.map((problem) => (
          <div
            key={problem.id}
            className="grid grid-cols-[24px_1fr_110px_120px_100px_80px_36px] items-center gap-3 px-5 py-3.5 hover:bg-[#FAFBFC] transition-colors duration-100 group"
          >
            {/* Star */}
            <button
              onClick={() => setStarredMap((prev) => ({ ...prev, [problem.id]: !prev[problem.id] }))}
              className="flex items-center justify-center transition-transform duration-150 hover:scale-110"
            >
              <Star
                size={14}
                strokeWidth={2}
                fill={starredMap[problem.id] ? "#D97706" : "none"}
                color={starredMap[problem.id] ? "#D97706" : "#CBD5E1"}
              />
            </button>

            {/* Title */}
            <div className="flex items-center gap-2 min-w-0">
              <span className="text-[#64748B] flex-shrink-0" style={{ fontSize: "12px", fontWeight: 500 }}>
                #{problem.id}
              </span>
              <span className="truncate text-[#0F172A] group-hover:text-[#2563EB] transition-colors duration-150 cursor-pointer" style={{ fontSize: "13px", fontWeight: 600 }}>
                {problem.title}
              </span>
              <ExternalLink size={12} color="#CBD5E1" className="opacity-0 group-hover:opacity-100 flex-shrink-0 transition-opacity duration-150" strokeWidth={2.5} />
            </div>

            {/* Category */}
            <span className="truncate text-[#64748B]" style={{ fontSize: "12px", fontWeight: 500 }}>
              {problem.category}
            </span>

            {/* Status */}
            <span
              className="inline-flex items-center px-2 py-1 rounded-lg w-fit"
              style={{ fontSize: "11px", fontWeight: 700, color: statusColor[problem.status], background: statusBg[problem.status] }}
            >
              {problem.status}
            </span>

            {/* Difficulty */}
            <span
              className="inline-flex items-center px-2 py-1 rounded-lg w-fit"
              style={{ fontSize: "11px", fontWeight: 700, color: difficultyColor[problem.difficulty], background: difficultyBg[problem.difficulty] }}
            >
              {problem.difficulty}
            </span>

            {/* Acceptance */}
            <span className="text-[#94A3B8]" style={{ fontSize: "12px", fontWeight: 500 }}>
              {problem.acceptance}
            </span>

            {/* Bookmark */}
            <button className="flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-150">
              <BookmarkPlus size={14} color="#94A3B8" strokeWidth={2.5} />
            </button>
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="py-16 flex flex-col items-center gap-3">
          <span style={{ fontSize: "32px" }}>🔍</span>
          <span className="text-[#94A3B8]" style={{ fontSize: "14px", fontWeight: 600 }}>No problems match your filters</span>
          <button
            onClick={() => { setDifficulty("All"); setStatus("All"); setSearch(""); }}
            className="text-[#2563EB] hover:underline"
            style={{ fontSize: "13px", fontWeight: 600 }}
          >
            Clear filters
          </button>
        </div>
      )}
    </div>
  );
}
