import { useState, useEffect, useRef } from "react";

const SCHOOLS = [
  { id: "uniben", name: "University of Benin", abbr: "UNIBEN", type: "University" },
  { id: "unilag", name: "University of Lagos", abbr: "UNILAG", type: "University" },
  { id: "ui", name: "University of Ibadan", abbr: "UI", type: "University" },
  { id: "abu", name: "Ahmadu Bello University", abbr: "ABU", type: "University" },
  { id: "oau", name: "Obafemi Awolowo University", abbr: "OAU", type: "University" },
  { id: "unn", name: "University of Nigeria Nsukka", abbr: "UNN", type: "University" },
  { id: "futa", name: "Federal University of Tech., Akure", abbr: "FUTA", type: "University" },
  { id: "lasu", name: "Lagos State University", abbr: "LASU", type: "University" },
  { id: "yabatech", name: "Yaba College of Technology", abbr: "YABATECH", type: "Polytechnic" },
  { id: "fpi", name: "Federal Polytechnic Ilaro", abbr: "FPI", type: "Polytechnic" },
  { id: "mapoly", name: "Moshood Abiola Polytechnic", abbr: "MAPOLY", type: "Polytechnic" },
  { id: "fceirr", name: "Federal College of Edu., Eha-Amufu", abbr: "FCE Eha-Amufu", type: "College of Education" },
  { id: "fceokene", name: "Federal College of Edu., Okene", abbr: "FCE Okene", type: "College of Education" },
];

const DEPARTMENTS = {
  University: ["Computer Science", "Electrical Engineering", "Medicine & Surgery", "Law", "Accounting", "Business Admin", "Mass Communication", "Economics", "Civil Engineering", "Pharmacy", "Nursing", "Architecture", "Physics", "Mathematics", "Chemistry", "Biology", "English & Literature", "Political Science", "Sociology", "Psychology"],
  Polytechnic: ["Computer Science", "Electrical/Electronics Engineering", "Mechanical Engineering", "Business Admin", "Accountancy", "Mass Communication", "Civil Engineering Technology", "Food Technology", "Science Laboratory Technology"],
  "College of Education": ["Computer Science Education", "Mathematics Education", "English Education", "Physics Education", "Chemistry Education", "Biology Education", "Social Studies Education", "Business Education", "Primary Education Studies"],
};

const LEVELS = ["100 Level", "200 Level", "300 Level", "400 Level", "500 Level", "HND 1", "HND 2", "NCE 1", "NCE 2", "NCE 3"];

const GOALS = [
  { id: "pass", label: "Just pass & move on", icon: "✅", xp: 50 },
  { id: "credit", label: "Get a solid 2:1 / Upper Credit", icon: "🎯", xp: 100 },
  { id: "first", label: "First Class / Distinction", icon: "🏆", xp: 200 },
  { id: "resit", label: "Clear a carryover / resit", icon: "💪", xp: 150 },
];

const STUDY_HOURS = ["1 hour/day", "2 hours/day", "3 hours/day", "4+ hours/day"];

const STEPS = ["Welcome", "School", "Department", "Level & Goal", "Exam Date", "Timetable"];

function ProgressBar({ step, total }) {
  return (
    <div style={{ display: "flex", gap: "6px", marginBottom: "32px" }}>
      {Array.from({ length: total }).map((_, i) => (
        <div key={i} style={{
          flex: 1, height: "4px", borderRadius: "99px",
          background: i < step ? "#C9A84C" : "rgba(255,255,255,0.12)",
          transition: "background 0.4s ease",
          boxShadow: i < step ? "0 0 8px rgba(201,168,76,0.6)" : "none"
        }} />
      ))}
    </div>
  );
}

function XPBadge({ show, amount }) {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    if (show) { setVisible(true); setTimeout(() => setVisible(false), 1800); }
  }, [show]);
  return visible ? (
    <div style={{
      position: "fixed", top: "20px", right: "20px", zIndex: 9999,
      background: "linear-gradient(135deg, #C9A84C, #F0D080)",
      color: "#1a1a0e", fontWeight: 800, fontSize: "16px",
      padding: "10px 20px", borderRadius: "99px",
      animation: "xpPop 1.8s ease forwards",
      boxShadow: "0 4px 24px rgba(201,168,76,0.7)",
      fontFamily: "'Syne', sans-serif"
    }}>+{amount} XP 🔥</div>
  ) : null;
}

function SchoolCard({ school, selected, onClick }) {
  const typeColor = school.type === "University" ? "#4CAF8C" : school.type === "Polytechnic" ? "#5B9BD5" : "#D4845A";
  return (
    <div onClick={onClick} style={{
      border: selected ? "2px solid #C9A84C" : "2px solid rgba(255,255,255,0.08)",
      borderRadius: "14px", padding: "14px 18px", cursor: "pointer",
      background: selected ? "rgba(201,168,76,0.12)" : "rgba(255,255,255,0.04)",
      transition: "all 0.2s ease",
      display: "flex", alignItems: "center", gap: "12px",
      transform: selected ? "scale(1.02)" : "scale(1)",
      boxShadow: selected ? "0 0 20px rgba(201,168,76,0.2)" : "none"
    }}>
      <div style={{
        width: "42px", height: "42px", borderRadius: "10px",
        background: selected ? "#C9A84C" : "rgba(255,255,255,0.08)",
        display: "flex", alignItems: "center", justifyContent: "center",
        fontSize: "16px", fontWeight: 800, color: selected ? "#1a1a0e" : "#fff",
        fontFamily: "'Syne', sans-serif", flexShrink: 0
      }}>{school.abbr.slice(0, 2)}</div>
      <div>
        <div style={{ fontWeight: 700, fontSize: "14px", color: "#fff", fontFamily: "'Syne', sans-serif" }}>{school.name}</div>
        <div style={{ fontSize: "11px", color: typeColor, fontWeight: 600, marginTop: "2px" }}>{school.type} · {school.abbr}</div>
      </div>
      {selected && <div style={{ marginLeft: "auto", color: "#C9A84C", fontSize: "18px" }}>✓</div>}
    </div>
  );
}

function Chip({ label, selected, onClick }) {
  return (
    <div onClick={onClick} style={{
      padding: "10px 18px", borderRadius: "99px", cursor: "pointer",
      border: selected ? "2px solid #C9A84C" : "2px solid rgba(255,255,255,0.1)",
      background: selected ? "rgba(201,168,76,0.15)" : "rgba(255,255,255,0.04)",
      color: selected ? "#C9A84C" : "rgba(255,255,255,0.7)",
      fontWeight: 600, fontSize: "13px", transition: "all 0.2s ease",
      fontFamily: "'DM Sans', sans-serif",
      transform: selected ? "scale(1.04)" : "scale(1)",
    }}>{label}</div>
  );
}

function TimetableDay({ day, topics, emoji }) {
  const [revealed, setRevealed] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setRevealed(true), Math.random() * 600 + 200);
    return () => clearTimeout(t);
  }, []);
  return (
    <div style={{
      opacity: revealed ? 1 : 0,
      transform: revealed ? "translateY(0)" : "translateY(12px)",
      transition: "all 0.5s ease",
      background: "rgba(255,255,255,0.05)", borderRadius: "12px",
      padding: "14px 16px", border: "1px solid rgba(255,255,255,0.08)"
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "8px" }}>
        <span style={{ fontSize: "18px" }}>{emoji}</span>
        <span style={{ fontWeight: 700, fontSize: "13px", color: "#C9A84C", fontFamily: "'Syne', sans-serif" }}>{day}</span>
      </div>
      {topics.map((t, i) => (
        <div key={i} style={{
          fontSize: "12px", color: "rgba(255,255,255,0.65)",
          fontFamily: "'DM Sans', sans-serif",
          padding: "4px 0", borderBottom: i < topics.length - 1 ? "1px solid rgba(255,255,255,0.06)" : "none"
        }}>• {t}</div>
      ))}
    </div>
  );
}

export default function ExamPadiOnboarding() {
  const [step, setStep] = useState(0);
  const [xpEvent, setXpEvent] = useState({ show: false, amount: 0 });
  const [totalXP, setTotalXP] = useState(0);
  const [school, setSchool] = useState(null);
  const [dept, setDept] = useState("");
  const [deptSearch, setDeptSearch] = useState("");
  const [level, setLevel] = useState("");
  const [goal, setGoal] = useState(null);
  const [studyHours, setStudyHours] = useState("");
  const [examDate, setExamDate] = useState("");
  const [reminderSMS, setReminderSMS] = useState(true);
  const [reminderEmail, setReminderEmail] = useState(true);
  const [phone, setPhone] = useState("");
  const [generating, setGenerating] = useState(false);
  const [timetable, setTimetable] = useState(null);

  const awardXP = (amount) => {
    setTotalXP(p => p + amount);
    setXpEvent({ show: true, amount });
    setTimeout(() => setXpEvent({ show: false, amount: 0 }), 100);
  };

  const schoolType = school ? SCHOOLS.find(s => s.id === school)?.type : null;
  const deptList = schoolType ? DEPARTMENTS[schoolType] : [];
  const filteredDepts = deptList.filter(d => d.toLowerCase().includes(deptSearch.toLowerCase()));

  const canProceed = () => {
    if (step === 1) return !!school;
    if (step === 2) return !!dept;
    if (step === 3) return !!level && !!goal && !!studyHours;
    if (step === 4) return !!examDate;
    return true;
  };

  const next = () => {
    if (!canProceed()) return;
    if (step === 1) awardXP(25);
    if (step === 2) awardXP(25);
    if (step === 3) { const g = GOALS.find(g => g.id === goal); awardXP(g?.xp || 50); }
    if (step === 4) {
      awardXP(50);
      setGenerating(true);
      setTimeout(() => {
        setGenerating(false);
        setTimetable(generateTimetable());
        setStep(5);
      }, 2200);
      return;
    }
    if (step < 5) setStep(s => s + 1);
  };

  const generateTimetable = () => {
    const days = [
      { day: "Monday", emoji: "📘", topics: ["Introduction & Key Definitions", "Past Question Review (2019-2020)"] },
      { day: "Tuesday", emoji: "🧠", topics: ["Core Theory — High-Impact Topics (80/20)", "Flashcard Drill — 20 mins"] },
      { day: "Wednesday", emoji: "✍️", topics: ["Practice Problems + AI Feedback", "Teach the AI Mode (15 mins)"] },
      { day: "Thursday", emoji: "🔁", topics: ["Spaced Repetition Review", "Past Question Simulation"] },
      { day: "Friday", emoji: "🎯", topics: ["Full Mock Exam Session", "Skillometer Check — Track Gaps"] },
      { day: "Saturday", emoji: "💪", topics: ["Weak Area Deep Dive", "Extra Practice — Hard Questions"] },
      { day: "Sunday", emoji: "😌", topics: ["Light Review Only", "Rest + Reflect"] },
    ];
    return days;
  };

  const selectedGoal = GOALS.find(g => g.id === goal);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@600;700;800&family=DM+Sans:wght@400;500;600&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { background: #0e0e0e; }
        @keyframes xpPop {
          0% { opacity: 0; transform: translateY(10px) scale(0.8); }
          15% { opacity: 1; transform: translateY(0) scale(1.1); }
          80% { opacity: 1; transform: translateY(0) scale(1); }
          100% { opacity: 0; transform: translateY(-10px) scale(0.9); }
        }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.4; }
        }
        .step-enter { animation: fadeUp 0.45s ease forwards; }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: rgba(201,168,76,0.3); border-radius: 99px; }
        input[type="date"]::-webkit-calendar-picker-indicator { filter: invert(1) opacity(0.4); cursor: pointer; }
      `}</style>

      <XPBadge show={xpEvent.show} amount={xpEvent.amount} />

      <div style={{
        minHeight: "100vh", background: "#0C0C0C",
        backgroundImage: "radial-gradient(ellipse at 20% 20%, rgba(30,80,40,0.18) 0%, transparent 60%), radial-gradient(ellipse at 80% 80%, rgba(100,70,10,0.15) 0%, transparent 60%)",
        display: "flex", flexDirection: "column", alignItems: "center",
        justifyContent: "flex-start", padding: "24px 16px 48px",
        fontFamily: "'DM Sans', sans-serif"
      }}>
        {/* Header */}
        <div style={{ width: "100%", maxWidth: "520px", display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "28px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <div style={{
              width: "36px", height: "36px", borderRadius: "10px",
              background: "linear-gradient(135deg, #1E7A3C, #2EA855)",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: "18px"
            }}>📚</div>
            <span style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: "18px", color: "#fff", letterSpacing: "-0.3px" }}>ExamPadi</span>
          </div>
          {totalXP > 0 && (
            <div style={{
              background: "rgba(201,168,76,0.12)", border: "1px solid rgba(201,168,76,0.3)",
              borderRadius: "99px", padding: "6px 14px",
              fontSize: "13px", fontWeight: 700, color: "#C9A84C",
              fontFamily: "'Syne', sans-serif"
            }}>⚡ {totalXP} XP</div>
          )}
        </div>

        {/* Card */}
        <div style={{
          width: "100%", maxWidth: "520px",
          background: "rgba(255,255,255,0.035)",
          border: "1px solid rgba(255,255,255,0.08)",
          borderRadius: "24px", padding: "32px 28px",
          backdropFilter: "blur(12px)",
          boxShadow: "0 24px 80px rgba(0,0,0,0.5)"
        }}>
          {step < 5 && <ProgressBar step={step} total={5} />}

          {/* STEP 0: Welcome */}
          {step === 0 && (
            <div className="step-enter">
              <div style={{ fontSize: "48px", marginBottom: "16px" }}>👋</div>
              <h1 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: "28px", color: "#fff", lineHeight: 1.2, marginBottom: "12px" }}>
                Oya, let's get you ready<br />
                <span style={{ color: "#C9A84C" }}>for your exams.</span>
              </h1>
              <p style={{ color: "rgba(255,255,255,0.55)", fontSize: "15px", lineHeight: 1.6, marginBottom: "28px" }}>
                ExamPadi uses AI to build your personal study plan, drill you with past questions, and keep you on track — all the way to exam day. 🇳🇬
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: "10px", marginBottom: "28px" }}>
                {[["🏆", "Gamified learning — earn XP, build streaks"],["🤖", "AI tutor that never just gives you answers"],["📱", "SMS + email reminders so you never slack"]].map(([icon, text]) => (
                  <div key={text} style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                    <span style={{ fontSize: "20px" }}>{icon}</span>
                    <span style={{ color: "rgba(255,255,255,0.65)", fontSize: "14px" }}>{text}</span>
                  </div>
                ))}
              </div>
              <button onClick={() => { awardXP(10); setStep(1); }} style={{
                width: "100%", padding: "16px", borderRadius: "14px",
                background: "linear-gradient(135deg, #1E7A3C, #2EA855)",
                color: "#fff", fontWeight: 800, fontSize: "16px",
                fontFamily: "'Syne', sans-serif", border: "none", cursor: "pointer",
                boxShadow: "0 4px 24px rgba(30,122,60,0.4)", letterSpacing: "0.3px"
              }}>Let's Go 🚀</button>
              <p style={{ textAlign: "center", color: "rgba(255,255,255,0.3)", fontSize: "12px", marginTop: "14px" }}>3-day free trial · No credit card needed</p>
            </div>
          )}

          {/* STEP 1: School */}
          {step === 1 && (
            <div className="step-enter">
              <div style={{ marginBottom: "4px", fontSize: "12px", fontWeight: 600, color: "rgba(255,255,255,0.35)", letterSpacing: "1.5px" }}>STEP 1 OF 5</div>
              <h2 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: "22px", color: "#fff", marginBottom: "6px" }}>Which school are you in? 🏫</h2>
              <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "13px", marginBottom: "20px" }}>We'll tailor your experience to your institution.</p>
              <div style={{ display: "flex", flexDirection: "column", gap: "8px", maxHeight: "380px", overflowY: "auto", paddingRight: "4px" }}>
                {SCHOOLS.map(s => (
                  <SchoolCard key={s.id} school={s} selected={school === s.id} onClick={() => setSchool(s.id)} />
                ))}
              </div>
            </div>
          )}

          {/* STEP 2: Department */}
          {step === 2 && (
            <div className="step-enter">
              <div style={{ marginBottom: "4px", fontSize: "12px", fontWeight: 600, color: "rgba(255,255,255,0.35)", letterSpacing: "1.5px" }}>STEP 2 OF 5</div>
              <h2 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: "22px", color: "#fff", marginBottom: "6px" }}>Your department? 📖</h2>
              <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "13px", marginBottom: "16px" }}>So we can load the right courses and past questions.</p>
              <input
                value={deptSearch} onChange={e => setDeptSearch(e.target.value)}
                placeholder="Search your department..."
                style={{
                  width: "100%", padding: "12px 16px", borderRadius: "12px",
                  background: "rgba(255,255,255,0.06)", border: "1.5px solid rgba(255,255,255,0.1)",
                  color: "#fff", fontSize: "14px", marginBottom: "12px", outline: "none",
                  fontFamily: "'DM Sans', sans-serif"
                }}
              />
              <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", maxHeight: "300px", overflowY: "auto" }}>
                {filteredDepts.map(d => (
                  <Chip key={d} label={d} selected={dept === d} onClick={() => setDept(d)} />
                ))}
              </div>
            </div>
          )}

          {/* STEP 3: Level + Goal */}
          {step === 3 && (
            <div className="step-enter">
              <div style={{ marginBottom: "4px", fontSize: "12px", fontWeight: 600, color: "rgba(255,255,255,0.35)", letterSpacing: "1.5px" }}>STEP 3 OF 5</div>
              <h2 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: "22px", color: "#fff", marginBottom: "20px" }}>Level & your target 🎯</h2>
              <p style={{ fontWeight: 600, fontSize: "13px", color: "rgba(255,255,255,0.5)", marginBottom: "10px" }}>Current Level</p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", marginBottom: "24px" }}>
                {LEVELS.map(l => <Chip key={l} label={l} selected={level === l} onClick={() => setLevel(l)} />)}
              </div>
              <p style={{ fontWeight: 600, fontSize: "13px", color: "rgba(255,255,255,0.5)", marginBottom: "10px" }}>What's your goal?</p>
              <div style={{ display: "flex", flexDirection: "column", gap: "10px", marginBottom: "24px" }}>
                {GOALS.map(g => (
                  <div key={g.id} onClick={() => setGoal(g.id)} style={{
                    padding: "14px 18px", borderRadius: "14px", cursor: "pointer",
                    border: goal === g.id ? "2px solid #C9A84C" : "2px solid rgba(255,255,255,0.08)",
                    background: goal === g.id ? "rgba(201,168,76,0.1)" : "rgba(255,255,255,0.04)",
                    display: "flex", alignItems: "center", justifyContent: "space-between",
                    transition: "all 0.2s"
                  }}>
                    <span style={{ fontSize: "14px", color: "#fff", fontFamily: "'DM Sans', sans-serif" }}>{g.icon} {g.label}</span>
                    <span style={{ fontSize: "11px", fontWeight: 700, color: "#C9A84C" }}>+{g.xp} XP</span>
                  </div>
                ))}
              </div>
              <p style={{ fontWeight: 600, fontSize: "13px", color: "rgba(255,255,255,0.5)", marginBottom: "10px" }}>Daily study time?</p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                {STUDY_HOURS.map(h => <Chip key={h} label={h} selected={studyHours === h} onClick={() => setStudyHours(h)} />)}
              </div>
            </div>
          )}

          {/* STEP 4: Exam Date + Reminders */}
          {step === 4 && (
            <div className="step-enter">
              <div style={{ marginBottom: "4px", fontSize: "12px", fontWeight: 600, color: "rgba(255,255,255,0.35)", letterSpacing: "1.5px" }}>STEP 4 OF 5</div>
              <h2 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: "22px", color: "#fff", marginBottom: "6px" }}>When's your first exam? 📅</h2>
              <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "13px", marginBottom: "20px" }}>We'll count down and intensify your prep as the date gets closer.</p>
              <input
                type="date" value={examDate} onChange={e => setExamDate(e.target.value)}
                style={{
                  width: "100%", padding: "14px 16px", borderRadius: "12px",
                  background: "rgba(255,255,255,0.06)", border: "1.5px solid rgba(255,255,255,0.12)",
                  color: "#fff", fontSize: "15px", fontFamily: "'DM Sans', sans-serif",
                  outline: "none", marginBottom: "28px"
                }}
              />
              <p style={{ fontWeight: 700, fontSize: "14px", color: "#fff", marginBottom: "14px", fontFamily: "'Syne', sans-serif" }}>🔔 Study Reminders</p>
              <div style={{ display: "flex", flexDirection: "column", gap: "12px", marginBottom: "24px" }}>
                {[
                  { key: "sms", val: reminderSMS, set: setReminderSMS, icon: "📱", label: "SMS Reminders", sub: "Via Hollatags — works even on 2G" },
                  { key: "email", val: reminderEmail, set: setReminderEmail, icon: "📧", label: "Email Reminders", sub: "Daily study prompts & weekly reports" }
                ].map(r => (
                  <div key={r.key} onClick={() => r.set(v => !v)} style={{
                    padding: "14px 18px", borderRadius: "14px", cursor: "pointer",
                    border: r.val ? "2px solid rgba(201,168,76,0.4)" : "2px solid rgba(255,255,255,0.08)",
                    background: r.val ? "rgba(201,168,76,0.07)" : "rgba(255,255,255,0.03)",
                    display: "flex", alignItems: "center", gap: "14px", transition: "all 0.2s"
                  }}>
                    <span style={{ fontSize: "22px" }}>{r.icon}</span>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontWeight: 600, fontSize: "14px", color: "#fff" }}>{r.label}</div>
                      <div style={{ fontSize: "12px", color: "rgba(255,255,255,0.4)" }}>{r.sub}</div>
                    </div>
                    <div style={{
                      width: "44px", height: "24px", borderRadius: "99px",
                      background: r.val ? "#2EA855" : "rgba(255,255,255,0.12)",
                      position: "relative", transition: "background 0.3s", flexShrink: 0
                    }}>
                      <div style={{
                        width: "18px", height: "18px", borderRadius: "50%", background: "#fff",
                        position: "absolute", top: "3px",
                        left: r.val ? "23px" : "3px", transition: "left 0.3s"
                      }} />
                    </div>
                  </div>
                ))}
              </div>
              {(reminderSMS || reminderEmail) && (
                <input
                  value={phone} onChange={e => setPhone(e.target.value)}
                  placeholder="📞 Phone number (e.g. 08012345678)"
                  style={{
                    width: "100%", padding: "12px 16px", borderRadius: "12px",
                    background: "rgba(255,255,255,0.06)", border: "1.5px solid rgba(255,255,255,0.1)",
                    color: "#fff", fontSize: "14px", outline: "none", fontFamily: "'DM Sans', sans-serif"
                  }}
                />
              )}
            </div>
          )}

          {/* STEP 5: Timetable */}
          {step === 5 && timetable && (
            <div className="step-enter">
              <div style={{ textAlign: "center", marginBottom: "24px" }}>
                <div style={{ fontSize: "40px", marginBottom: "10px" }}>🎉</div>
                <h2 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: "22px", color: "#fff", marginBottom: "6px" }}>
                  Your study plan is ready!
                </h2>
                <p style={{ color: "rgba(255,255,255,0.45)", fontSize: "13px" }}>
                  Built for <span style={{ color: "#C9A84C" }}>{SCHOOLS.find(s => s.id === school)?.abbr}</span> · {dept} · {level}
                </p>
                {selectedGoal && (
                  <div style={{
                    display: "inline-flex", alignItems: "center", gap: "8px",
                    background: "rgba(201,168,76,0.1)", border: "1px solid rgba(201,168,76,0.3)",
                    borderRadius: "99px", padding: "6px 16px", marginTop: "10px",
                    fontSize: "13px", color: "#C9A84C", fontWeight: 600
                  }}>
                    {selectedGoal.icon} Goal: {selectedGoal.label}
                  </div>
                )}
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "8px", marginBottom: "24px" }}>
                {timetable.map((day, i) => <TimetableDay key={i} {...day} />)}
              </div>
              <div style={{
                background: "rgba(30,122,60,0.12)", border: "1px solid rgba(46,168,85,0.25)",
                borderRadius: "14px", padding: "16px", marginBottom: "20px",
                display: "flex", alignItems: "center", gap: "12px"
              }}>
                <span style={{ fontSize: "28px" }}>⚡</span>
                <div>
                  <div style={{ fontWeight: 700, fontSize: "14px", color: "#2EA855", fontFamily: "'Syne', sans-serif" }}>Total XP Earned: {totalXP} XP</div>
                  <div style={{ fontSize: "12px", color: "rgba(255,255,255,0.4)" }}>You're already ahead. Keep the streak going!</div>
                </div>
              </div>
              <button style={{
                width: "100%", padding: "16px", borderRadius: "14px",
                background: "linear-gradient(135deg, #1E7A3C, #2EA855)",
                color: "#fff", fontWeight: 800, fontSize: "16px",
                fontFamily: "'Syne', sans-serif", border: "none", cursor: "pointer",
                boxShadow: "0 4px 24px rgba(30,122,60,0.4)"
              }}>Enter ExamPadi 📚</button>
            </div>
          )}

          {/* Generating state */}
          {generating && (
            <div style={{ textAlign: "center", padding: "40px 0" }}>
              <div style={{
                width: "52px", height: "52px", borderRadius: "50%",
                border: "3px solid rgba(255,255,255,0.1)",
                borderTop: "3px solid #C9A84C",
                animation: "spin 0.8s linear infinite",
                margin: "0 auto 20px"
              }} />
              <p style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: "16px", color: "#fff", marginBottom: "6px" }}>Building your timetable...</p>
              <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "13px", animation: "pulse 1.5s ease infinite" }}>Analysing 80/20 topics for {dept}</p>
            </div>
          )}

          {/* CTA Button */}
          {step > 0 && step < 5 && !generating && (
            <button onClick={next} style={{
              width: "100%", padding: "16px", borderRadius: "14px", marginTop: "24px",
              background: canProceed()
                ? "linear-gradient(135deg, #1E7A3C, #2EA855)"
                : "rgba(255,255,255,0.06)",
              color: canProceed() ? "#fff" : "rgba(255,255,255,0.25)",
              fontWeight: 800, fontSize: "15px",
              fontFamily: "'Syne', sans-serif", border: "none",
              cursor: canProceed() ? "pointer" : "not-allowed",
              transition: "all 0.2s",
              boxShadow: canProceed() ? "0 4px 20px rgba(30,122,60,0.35)" : "none"
            }}>
              {step === 4 ? "Generate My Timetable ✨" : "Continue →"}
            </button>
          )}

          {step > 0 && step < 5 && !generating && (
            <button onClick={() => setStep(s => s - 1)} style={{
              width: "100%", padding: "12px", marginTop: "10px", borderRadius: "12px",
              background: "transparent", border: "none", color: "rgba(255,255,255,0.3)",
              fontSize: "13px", cursor: "pointer", fontFamily: "'DM Sans', sans-serif"
            }}>← Back</button>
          )}
        </div>
      </div>
    </>
  );
}
