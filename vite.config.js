:root {
  color-scheme: dark;
  font-family: Inter, system-ui, Arial, sans-serif;
  background: #020617;
  color: #e2e8f0;
}

* { box-sizing: border-box; }
body { margin: 0; background: linear-gradient(180deg, #020617 0%, #0f172a 100%); color: #e2e8f0; }
button, input { font: inherit; }

.app-shell { min-height: 100vh; }
.container { max-width: 1280px; margin: 0 auto; padding: 32px 16px 48px; }

.hero, .card {
  background: rgba(15, 23, 42, 0.78);
  border: 1px solid #1e293b;
  border-radius: 24px;
  box-shadow: 0 24px 60px rgba(0,0,0,0.25);
}
.hero { padding: 24px; margin-bottom: 28px; }
.hero-grid, .two-col { display: grid; gap: 16px; }
.hero-grid { grid-template-columns: 1.35fr 0.65fr; }
.two-col { grid-template-columns: 0.95fr 1.05fr; }
.grid-2, .grid-3, .grid-4 { display: grid; gap: 16px; }
.grid-2 { grid-template-columns: repeat(2, minmax(0, 1fr)); }
.grid-3 { grid-template-columns: repeat(3, minmax(0, 1fr)); }
.grid-4 { grid-template-columns: repeat(4, minmax(0, 1fr)); }

.pill, .badge {
  display: inline-flex; align-items: center; gap: 8px;
  border-radius: 999px; padding: 6px 12px;
  font-size: 12px; font-weight: 600;
}
.pill { border: 1px solid rgba(34,211,238,0.35); color: #67e8f9; margin-bottom: 12px; }
.badge { background: rgba(15,23,42,0.95); border: 1px solid #334155; }
.badge-outline { background: transparent; }
.badge-green { background: rgba(16,185,129,0.15); color: #6ee7b7; border-color: rgba(16,185,129,0.35); }
.badge-red { background: rgba(239,68,68,0.15); color: #fca5a5; border-color: rgba(239,68,68,0.35); }
.badge-violet { background: rgba(139,92,246,0.16); color: #c4b5fd; border-color: rgba(139,92,246,0.32); }

h1 { margin: 0 0 12px; font-size: clamp(2rem, 5vw, 3rem); line-height: 1.05; }
h2, h3 { margin: 0; }
.hero-copy, .muted { color: #94a3b8; }
.small { font-size: 13px; }
.small-label, .step-code, .eyebrow {
  text-transform: uppercase; letter-spacing: 0.14em; font-size: 11px; color: #94a3b8;
}
.eyebrow { display: flex; align-items: center; gap: 8px; margin-bottom: 8px; }
.section-header { margin-bottom: 18px; }
.section-header p { margin: 8px 0 0; max-width: 820px; color: #94a3b8; }

.core-rule, .warning-box, .success-box {
  border-radius: 18px; padding: 16px; margin-top: 16px;
}
.core-rule { border: 1px solid rgba(239,68,68,0.28); background: rgba(127,29,29,0.22); }
.core-title { display: flex; align-items: center; gap: 8px; color: #fca5a5; font-weight: 700; margin-bottom: 8px; }
.warning-box { border: 1px solid rgba(239,68,68,0.28); background: rgba(127,29,29,0.18); color: #fecaca; }
.success-box { border: 1px solid rgba(16,185,129,0.28); background: rgba(6,78,59,0.22); color: #a7f3d0; }

.instrument-card h3, .card h3 { margin-bottom: 14px; }
.stack { display: flex; flex-direction: column; gap: 12px; }
.gap-lg { gap: 18px; }
.instrument-row, .mini-card, .check-row, .check-box-row, .footer-card {
  border: 1px solid #1e293b; background: rgba(2,6,23,0.55); border-radius: 18px;
}
.instrument-row, .check-row, .check-box-row, .footer-card {
  display: flex; align-items: flex-start; justify-content: space-between; gap: 12px; padding: 14px;
}
.instrument-row.blocked { border-color: rgba(239,68,68,0.24); background: rgba(127,29,29,0.14); }
.instrument-symbol { font-size: 18px; font-weight: 700; }

.tabs {
  display: grid; grid-template-columns: repeat(4, minmax(0,1fr));
  gap: 8px; margin-bottom: 22px; padding: 8px;
  border: 1px solid #1e293b; border-radius: 20px; background: rgba(15,23,42,0.7);
}
.tab {
  border: 0; border-radius: 14px; padding: 12px 14px; cursor: pointer;
  background: transparent; color: #94a3b8; font-weight: 700;
}
.tab.active { background: #0f172a; color: #e2e8f0; box-shadow: inset 0 0 0 1px #334155; }

.tab-panel { display: flex; flex-direction: column; gap: 18px; }
.card { padding: 20px; }
.card-header, .between, .top-gap {
  display: flex; align-items: center; justify-content: space-between; gap: 12px;
}
.card-header { margin-bottom: 12px; }
.card-header h3 { display: flex; align-items: center; gap: 8px; }
.top-gap { margin-bottom: 14px; }

.step-button {
  width: 100%; display: flex; align-items: center; gap: 12px; text-align: left;
  padding: 16px; border-radius: 18px; cursor: pointer;
  background: rgba(2,6,23,0.55); border: 1px solid #1e293b; color: #e2e8f0;
}
.step-id {
  width: 40px; height: 40px; display: grid; place-items: center;
  border-radius: 14px; border: 1px solid #334155; background: rgba(2,6,23,0.85);
  font-weight: 800;
}
.step-main { flex: 1; min-width: 0; }
.step-title { font-weight: 700; }
.arrow-down { display: flex; justify-content: center; padding: 4px 0; transform: rotate(90deg); color: #475569; }
.rotated { transform: rotate(180deg); }

.accent-cyan { border-color: rgba(34,211,238,0.35); background: rgba(8,47,73,0.25); }
.accent-amber { border-color: rgba(251,191,36,0.35); background: rgba(120,53,15,0.22); }
.accent-orange { border-color: rgba(249,115,22,0.35); background: rgba(124,45,18,0.22); }
.accent-violet { border-color: rgba(167,139,250,0.35); background: rgba(76,29,149,0.2); }
.accent-pink { border-color: rgba(244,114,182,0.35); background: rgba(131,24,67,0.2); }
.accent-green { border-color: rgba(52,211,153,0.35); background: rgba(6,78,59,0.2); }

.filter-row, .badge-wrap {
  display: flex; flex-wrap: wrap; gap: 10px;
}
.pill-button {
  border-radius: 999px; padding: 10px 14px; cursor: pointer;
  border: 1px solid #334155; background: rgba(15,23,42,0.7); color: #cbd5e1;
}
.pill-button.selected { border-color: #38bdf8; color: #e0f2fe; background: rgba(8,47,73,0.28); }

.check-row svg { color: #6ee7b7; margin-top: 2px; flex: 0 0 auto; }
.fake-box {
  width: 16px; height: 16px; border: 1px solid rgba(251,191,36,0.45);
  border-radius: 4px; flex: 0 0 auto; margin-top: 2px;
}
.mini-card { padding: 14px; }
.mini-title { font-weight: 700; margin-bottom: 4px; }
.search-input {
  min-width: 240px; border: 1px solid #334155; border-radius: 12px;
  background: rgba(2,6,23,0.72); color: #e2e8f0; padding: 10px 12px;
}
.footer-grid { margin-top: 22px; }
.footer-card { align-items: flex-start; }
.footer-card svg { color: #67e8f9; margin-top: 2px; }
.footer-title { font-weight: 700; margin-bottom: 4px; }

@media (max-width: 1100px) {
  .hero-grid, .two-col, .grid-4 { grid-template-columns: 1fr; }
  .grid-3 { grid-template-columns: repeat(2, minmax(0,1fr)); }
}
@media (max-width: 760px) {
  .tabs { grid-template-columns: repeat(2, minmax(0,1fr)); }
  .grid-2, .grid-3, .grid-4 { grid-template-columns: 1fr; }
  .search-input { min-width: 0; width: 100%; }
  .between, .top-gap { flex-direction: column; align-items: flex-start; }
}
