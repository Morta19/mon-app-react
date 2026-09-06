import React, { useEffect, useRef } from "react";
import {
  FaServer,
  FaMobileAlt,
  FaDesktop,
  FaDatabase,
  FaRobot,
} from "react-icons/fa";

const groups = [
  {
    title: "Backend",
    items: ["Python / Flask", "Java / Spring Boot", "C# / ASP.NET Core MVC"],
  },
  {
    title: "Frontend",
    items: ["JavaScript", "React", "Vue.js", "HTML5", "CSS3"],
  },
  { title: "Mobile", items: ["Dart / Flutter"] },
  { title: "Database", items: ["SQL"] },
  { title: "Web Scraping", items: ["Playwright", "Selenium"] },
  { title: "AI", items: ["YOLOv8"] },
];

const Skills = () => {
  const rootRef = useRef(null);

  useEffect(() => {
    const items = rootRef.current?.querySelectorAll(".card");
    if (!items) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((en) => {
          if (en.isIntersecting) en.target.classList.add("animate-rise");
        });
      },
      { threshold: 0.15 },
    );
    items.forEach((it) => io.observe(it));
    return () => io.disconnect();
  }, []);

  return (
    <section className="bg-[var(--bg)] text-[var(--ink)] py-20">
      <div className="max-w-6xl mx-auto px-6" ref={rootRef}>
        <header className="mb-10">
          <h3 className="font-mono text-[11px] tracking-widest text-[var(--accent)]">
            COMPETENCES
          </h3>
          <h2 className="font-display text-4xl mt-4">Compétences techniques</h2>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {groups.map((g) => (
            <div key={g.title} className="card p-6">
              <h4 className="font-display font-semibold mb-4 flex items-center gap-3">
                {g.title === "Backend" && <FaServer />}
                {g.title === "Frontend" && <FaDesktop />}
                {g.title === "Mobile" && <FaMobileAlt />}
                {g.title === "Database" && <FaDatabase />}
                {g.title === "Web Scraping" && <FaRobot />}
                {g.title}
              </h4>
              <div className="flex flex-wrap gap-3">
                {g.items.map((it) => (
                  <div
                    key={it}
                    className="tech-chip"
                    role="img"
                    aria-label={it}
                    title={it}
                  >
                    {it}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
