import React from "react";
import {
  FaServer,
  FaMobileAlt,
  FaDesktop,
  FaDatabase,
  FaRobot,
  FaSpider,
} from "react-icons/fa";
import useReveal from "../../hooks/useReveal";

const groups = [
  {
    title: "Backend",
    icon: <FaServer />,
    items: [
      { name: "Python / Flask", level: 85 },
      { name: "Java / Spring Boot", level: 75 },
      { name: "C# / ASP.NET Core MVC", level: 70 },
    ],
  },
  {
    title: "Frontend",
    icon: <FaDesktop />,
    items: [
      { name: "JavaScript", level: 85 },
      { name: "React", level: 85 },
      { name: "Vue.js", level: 75 },
      { name: "HTML5 / CSS3", level: 90 },
    ],
  },
  {
    title: "Mobile",
    icon: <FaMobileAlt />,
    items: [{ name: "Dart / Flutter", level: 65 }],
  },
  {
    title: "Database",
    icon: <FaDatabase />,
    items: [{ name: "SQL", level: 80 }],
  },
  {
    title: "Web Scraping",
    icon: <FaSpider />,
    items: [
      { name: "Playwright", level: 80 },
      { name: "Selenium", level: 78 },
    ],
  },
  {
    title: "IA",
    icon: <FaRobot />,
    items: [{ name: "YOLOv8", level: 70 }],
  },
];

const Skills = () => {
  const rootRef = useReveal();

  return (
    <section className="bg-[var(--bg)] text-[var(--ink)] py-24 relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-6" ref={rootRef}>
        <header className="mb-16" data-reveal="up">
          <p className="eyebrow mb-4">COMPÉTENCES</p>
          <h2 className="display-lg mb-6">
            Ce que je <span className="text-gradient-gold">construis</span>.
          </h2>
          <hr className="section-rule w-40" />
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {groups.map((g, gi) => (
            <div
              key={g.title}
              className="card p-7 group"
              data-reveal="up"
              style={{ "--reveal-delay": `${gi * 70}ms` }}
            >
              <div className="flex items-center gap-3 mb-6">
                <span
                  className="flex h-10 w-10 items-center justify-center rounded-lg border border-[var(--line)] bg-[var(--surface-3)] text-[var(--accent)] transition-transform duration-300 group-hover:scale-110"
                  aria-hidden="true"
                >
                  {g.icon}
                </span>
                <h4 className="font-display text-lg font-semibold tracking-tight">
                  {g.title}
                </h4>
              </div>

              <ul className="space-y-4">
                {g.items.map((item) => (
                  <li key={item.name}>
                    <div className="flex items-baseline justify-between gap-3 mb-1.5">
                      <span className="text-sm font-medium text-[var(--ink)]">
                        {item.name}
                      </span>
                      <span
                        className="font-mono text-[11px] text-[var(--ink-muted)]"
                        aria-hidden="true"
                      >
                        {item.level}%
                      </span>
                    </div>
                    <div
                      className="skill-bar"
                      role="meter"
                      aria-valuenow={item.level}
                      aria-valuemin={0}
                      aria-valuemax={100}
                      aria-label={`Niveau ${item.name}`}
                    >
                      <span
                        className="skill-bar__fill"
                        style={{ "--level": `${item.level}%` }}
                      ></span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
