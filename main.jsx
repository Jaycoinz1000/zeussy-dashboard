import React, { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  AlertTriangle,
  ArrowRight,
  BookOpen,
  Calendar,
  CheckCircle2,
  ChevronDown,
  Clock3,
  Crosshair,
  FileText,
  Filter,
  Landmark,
  Shield,
  Target,
  TrendingUp,
} from "lucide-react";

const coreRule =
  "Do not move to the next step if the current step is not defined.";

const instruments = [
  { symbol: "MES", note: "Primary equity index micro" },
  { symbol: "MGC", note: "Gold micro" },
  { symbol: "MCL", note: "Crude oil micro" },
  { symbol: "MNQ", note: "Do not trade", blocked: true },
];

const steps = [
  {
    id: 1,
    code: "HTF",
    title: "Higher-Timeframe Institutional Order Flow",
    accent: "cyan",
    summary:
      "Define the larger buy or sell program first. If HTF order flow is unclear, the trade is dead before it starts.",
    items: [
      "Identify buy program or sell program on monthly, weekly, and daily.",
      "Define the narrative: why should price expand in this direction?",
      "Note what the masses likely believe versus what the chart is actually saying.",
    ],
  },
  {
    id: 2,
    code: "DOL",
    title: "Draw on Liquidity",
    accent: "amber",
    summary:
      "Price needs a destination. Map the magnet before looking for the reversal origin.",
    items: [
      "Start with larger-cycle highs and lows, then refine into session and 90-minute draws.",
      "Use old PD arrays, imbalances, key levels, and larger opening prices.",
      "Move from bigger draw to smaller draw — not the other way around.",
    ],
  },
  {
    id: 3,
    code: "POI",
    title: "Point of Interest",
    accent: "orange",
    summary:
      "The reversal should come from a meaningful location. Mid-range hero entries are how traders get humbled.",
    items: [
      "For longs, expect sell-side to be taken first; for shorts, buy-side.",
      "Look for PD arrays, key levels, or opening-price breaches at the POI.",
      "POI only matters after HTF order flow and DOL are already defined.",
    ],
  },
  {
    id: 4,
    code: "TOI",
    title: "Time of Interest",
    accent: "violet",
    summary:
      "The 90-minute block gives structure. The macro window gives precision inside that block.",
    items: [
      "Use 90-minute session blocks to frame manipulation and delivery.",
      "Use XX:45 to XX:15 macro windows to refine when to focus.",
      "Macro time is a filter — not a reason to click buy or sell by itself.",
    ],
  },
  {
    id: 5,
    code: "SMT",
    title: "Smart Money Technique",
    accent: "pink",
    summary:
      "SMT is confirmation, not the whole strategy. By itself it means nothing.",
    items: [
      "Track big-cycle, small-cycle, or double SMT depending on the trade horizon.",
      "Use SMT only after HTF, DOL, POI, and TOI are already present.",
      "Treat SMT as evidence that manipulation may be ending.",
    ],
  },
  {
    id: 6,
    code: "CSD",
    title: "Change in State of Delivery",
    accent: "green",
    summary: "CSD is the proof stage. No CSD, no conviction.",
    items: [
      "Watch for displacement through prior imbalances.",
      "Watch for new opposing imbalances to form.",
      "Watch for breaker or mitigation block formation to confirm the swing.",
    ],
  },
];

const timingBlocks = [
  {
    session: "Asia",
    blocks: [
      { name: "Asia Block 1", time: "7:30 PM – 9:00 PM", macros: ["7:45 PM – 8:15 PM", "8:45 PM – 9:15 PM"] },
      { name: "Asia Block 2", time: "9:00 PM – 10:30 PM", macros: ["9:45 PM – 10:15 PM"] },
      { name: "Asia Block 3", time: "10:30 PM – 12:00 AM", macros: ["10:45 PM – 11:15 PM", "11:45 PM – 12:15 AM"] },
    ],
  },
  {
    session: "London",
    blocks: [
      { name: "London Block 1", time: "2:30 AM – 4:00 AM", macros: ["2:45 AM – 3:15 AM", "3:45 AM – 4:15 AM"] },
      { name: "London Block 2", time: "4:00 AM – 5:30 AM", macros: ["4:45 AM – 5:15 AM"] },
      { name: "London Block 3", time: "5:30 AM – 7:00 AM", macros: ["5:45 AM – 6:15 AM", "6:45 AM – 7:15 AM"] },
    ],
  },
  {
    session: "NY AM",
    blocks: [
      { name: "NY AM Block 1", time: "7:00 AM – 8:30 AM", macros: ["7:45 AM – 8:15 AM"] },
      { name: "NY AM Block 2", time: "8:30 AM – 10:00 AM", macros: ["8:45 AM – 9:15 AM", "9:45 AM – 10:15 AM"] },
      { name: "NY AM Block 3", time: "10:00 AM – 11:30 AM", macros: ["10:45 AM – 11:15 AM"] },
    ],
  },
  {
    session: "NY PM",
    blocks: [
      { name: "NY PM Block 1", time: "11:30 AM – 1:00 PM", macros: ["11:45 AM – 12:15 PM", "12:45 PM – 1:15 PM"] },
      { name: "NY PM Block 2", time: "1:00 PM – 2:30 PM", macros: ["1:45 PM – 2:15 PM"] },
      { name: "NY PM Block 3", time: "2:30 PM – 4:00 PM", macros: ["2:45 PM – 3:15 PM", "3:45 PM – 4:15 PM"] },
    ],
  },
];

const dolOptions = [
  "Asia High", "Asia Low", "London High", "London Low", "AM High", "AM Low",
  "Previous Day High", "Previous Day Low", "Previous Week High", "Previous Week Low",
  "Previous Month High", "Previous Month Low", "Weekly Opening Gap", "Other"
];

const poiOptions = [
  "Breaker", "Mitigation Block", "Imbalance", "Imbalanced Price Range",
  "FVG", "Key Level", "Opening Price", "Other"
];

const journalFields = [
  "Day", "Market", "Session", "News Day", "SMR Time / Macro Window", "SMT",
  "Draw on Liquidity", "Point of Interest", "Entry Pattern", "90-Minute Block",
  "Market Structure", "HTF Order Flow", "Narrative Before Trade", "Entry Time",
  "Exit Time", "Hold Time", "Entry Price", "Stop Price", "Target Price",
  "Risk in Points", "Reward in Points", "Risk-Reward Ratio", "Contracts",
  "Result", "P&L ($)", "P&L (R)", "Execution Grade", "Mistake Made", "What I Did Well"
];

const riskRules = [
  "Trade MES, MGC, and MCL only.",
  "Do not trade MNQ.",
  "Maximum 2 trades per day.",
  "Fixed dollar risk per trade.",
  "Hard stop in place before entry.",
  "Stop after 2 losses.",
  "No widening stop after entry.",
  "No revenge trading.",
];

function colorClasses(accent) {
  const map = {
    cyan: "accent-cyan",
    amber: "accent-amber",
    orange: "accent-orange",
    violet: "accent-violet",
    pink: "accent-pink",
    green: "accent-green",
  };
  return map[accent] || "accent-cyan";
}

function SectionHeader({ icon: Icon, eyebrow, title, subtitle }) {
  return (
    <div className="section-header">
      <div className="eyebrow"><Icon size={16} /> <span>{eyebrow}</span></div>
      <h2>{title}</h2>
      <p>{subtitle}</p>
    </div>
  );
}

export default function App() {
  const [activeTab, setActiveTab] = useState("flow");
  const [activeStep, setActiveStep] = useState(1);
  const [sessionFilter, setSessionFilter] = useState("All");
  const [journalSearch, setJournalSearch] = useState("");

  const filteredTiming = useMemo(() => {
    if (sessionFilter === "All") return timingBlocks;
    return timingBlocks.filter((s) => s.session === sessionFilter);
  }, [sessionFilter]);

  const filteredJournalFields = useMemo(() => {
    const q = journalSearch.trim().toLowerCase();
    if (!q) return journalFields;
    return journalFields.filter((field) => field.toLowerCase().includes(q));
  }, [journalSearch]);

  return (
    <div className="app-shell">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          className="hero"
        >
          <div className="hero-grid">
            <div>
              <div className="pill">Zeussy 90-Minute Cycle Dashboard</div>
              <h1>Protocol, timing, and journal — in one place</h1>
              <p className="hero-copy">
                Built from the six-step reversal sequence, your exact 90-minute blocks,
                macro windows, risk rules, and journal structure for MES, MGC, and MCL.
              </p>
              <div className="core-rule">
                <div className="core-title"><AlertTriangle size={16} /> Core rule</div>
                <p>{coreRule}</p>
              </div>
            </div>

            <div className="card instrument-card">
              <h3>Active instrument list</h3>
              <div className="stack">
                {instruments.map((item) => (
                  <div key={item.symbol} className={`instrument-row ${item.blocked ? "blocked" : ""}`}>
                    <div>
                      <div className="instrument-symbol">{item.symbol}</div>
                      <div className="muted small">{item.note}</div>
                    </div>
                    <span className={`badge ${item.blocked ? "badge-red" : "badge-green"}`}>
                      {item.blocked ? "Blocked" : "Trade"}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        <div className="tabs">
          {[
            { id: "flow", label: "Flow" },
            { id: "timing", label: "Timing" },
            { id: "risk", label: "Risk" },
            { id: "journal", label: "Journal" },
          ].map((tab) => (
            <button
              key={tab.id}
              className={`tab ${activeTab === tab.id ? "active" : ""}`}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {activeTab === "flow" && (
          <div className="tab-panel">
            <SectionHeader
              icon={Target}
              eyebrow="Six-step reversal sequence"
              title="Work the protocol in order"
              subtitle="Each step feeds the next. Skip one and the whole thing turns into an expensive opinion."
            />

            <div className="two-col">
              <div className="card">
                <div className="stack">
                  {steps.map((step, idx) => (
                    <div key={step.id}>
                      <button
                        onClick={() => setActiveStep(step.id)}
                        className={`step-button ${activeStep === step.id ? colorClasses(step.accent) : ""}`}
                      >
                        <div className="step-id">{step.id}</div>
                        <div className="step-main">
                          <div className="step-code">{step.code}</div>
                          <div className="step-title">{step.title}</div>
                        </div>
                        <ChevronDown className={activeStep === step.id ? "rotated" : ""} size={16} />
                      </button>
                      {idx < steps.length - 1 && (
                        <div className="arrow-down"><ArrowRight size={16} /></div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              <AnimatePresence mode="wait">
                {steps.filter((s) => s.id === activeStep).map((step) => (
                  <motion.div
                    key={step.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                  >
                    <div className="card">
                      <div className="card-header">
                        <span className={`badge badge-outline ${colorClasses(step.accent)}`}>{step.code}</span>
                        <h3>{step.title}</h3>
                      </div>
                      <p className="muted">{step.summary}</p>
                      <div className="grid-2">
                        {step.items.map((item) => (
                          <div key={item} className="mini-card">{item}</div>
                        ))}
                      </div>
                      <div className="warning-box">
                        <strong>Checkpoint:</strong> If this step is not defined, stop here.
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>
        )}

        {activeTab === "timing" && (
          <div className="tab-panel">
            <SectionHeader
              icon={Clock3}
              eyebrow="90-minute cycle + macros"
              title="Use the block for structure and the macro for precision"
              subtitle="Do not trade because it is macro time. Trade when the sequence is already defined and the time window supports it."
            />

            <div className="filter-row">
              {["All", "Asia", "London", "NY AM", "NY PM"].map((session) => (
                <button
                  key={session}
                  className={`pill-button ${sessionFilter === session ? "selected" : ""}`}
                  onClick={() => setSessionFilter(session)}
                >
                  {session}
                </button>
              ))}
            </div>

            <div className="grid-2">
              {filteredTiming.map((group) => (
                <div key={group.session} className="card">
                  <div className="card-header">
                    <h3><Calendar size={18} /> {group.session}</h3>
                  </div>
                  <div className="stack">
                    {group.blocks.map((block) => (
                      <div key={block.name} className="mini-card">
                        <div className="between">
                          <div>
                            <div className="mini-title">{block.name}</div>
                            <div className="muted small">{block.time}</div>
                          </div>
                          <span className="badge badge-violet">Macro-linked</span>
                        </div>
                        <div className="small-label">Macros under this block</div>
                        <div className="badge-wrap">
                          {block.macros.map((macro) => (
                            <span key={macro} className="badge badge-outline">{macro}</span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div className="card">
              <h3>How to use the timing model</h3>
              <div className="grid-4">
                {[
                  "Start with the active 90-minute block.",
                  "Check whether price is approaching or inside your POI during that block.",
                  "Use the macro window to refine when manipulation, SMT, and CSD may appear.",
                  "Only enter if the full sequence is already defined.",
                ].map((item, idx) => (
                  <div key={item} className="mini-card">
                    <div className="small-label">Step {idx + 1}</div>
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === "risk" && (
          <div className="tab-panel">
            <SectionHeader
              icon={Shield}
              eyebrow="Risk and execution discipline"
              title="Protect the account first"
              subtitle="A good setup without discipline still ends with you telling painful stories later."
            />

            <div className="two-col">
              <div className="card">
                <h3>Fixed rules</h3>
                <div className="stack">
                  {riskRules.map((rule) => (
                    <div key={rule} className="check-row">
                      <CheckCircle2 size={16} />
                      <span>{rule}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="card">
                <h3>Pre-trade checklist</h3>
                <div className="stack">
                  {[
                    "HTF bias confirmed?",
                    "DOL clearly mapped?",
                    "POI clearly mapped?",
                    "Correct 90-minute block active?",
                    "Macro window active or approaching?",
                    "SMT present?",
                    "CSD present?",
                    "Stop and target defined before entry?",
                    "Daily loss limit not breached?",
                    "Mindset calm enough to execute?",
                  ].map((item) => (
                    <div key={item} className="check-box-row">
                      <div className="fake-box" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "journal" && (
          <div className="tab-panel">
            <SectionHeader
              icon={BookOpen}
              eyebrow="Journal architecture"
              title="Standardize the notes so the review means something"
              subtitle="A journal should expose patterns, not just preserve emotions in high definition."
            />

            <div className="two-col journal-layout">
              <div className="card">
                <h3><Filter size={18} /> Journal tags</h3>
                <div className="stack gap-lg">
                  <div>
                    <div className="small-label">Draw on Liquidity</div>
                    <div className="badge-wrap">
                      {dolOptions.map((item) => (
                        <span key={item} className="badge badge-outline">{item}</span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <div className="small-label">Point of Interest</div>
                    <div className="badge-wrap">
                      {poiOptions.map((item) => (
                        <span key={item} className="badge badge-outline">{item}</span>
                      ))}
                    </div>
                  </div>
                  <div className="success-box">
                    A losing trade can still be an A trade if the protocol was followed. A winning trade can still be trash if you broke rules.
                  </div>
                </div>
              </div>

              <div className="card">
                <div className="between top-gap">
                  <h3><FileText size={18} /> Journal template fields</h3>
                  <input
                    className="search-input"
                    value={journalSearch}
                    onChange={(e) => setJournalSearch(e.target.value)}
                    placeholder="Filter fields..."
                  />
                </div>
                <div className="grid-3">
                  {filteredJournalFields.map((field) => (
                    <div key={field} className="mini-card">{field}</div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid-3 footer-grid"
        >
          <div className="card footer-card">
            <TrendingUp size={20} />
            <div>
              <div className="footer-title">Structure first</div>
              <p className="muted small">90-minute block = structure. Macro = precision inside the structure.</p>
            </div>
          </div>
          <div className="card footer-card">
            <Landmark size={20} />
            <div>
              <div className="footer-title">Location matters</div>
              <p className="muted small">Good timing in a bad location is still a bad trade. DOL and POI come before excitement.</p>
            </div>
          </div>
          <div className="card footer-card">
            <Crosshair size={20} />
            <div>
              <div className="footer-title">Execute only on proof</div>
              <p className="muted small">SMT plus CSD after the earlier steps are defined — that is when the trade gets permission.</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
