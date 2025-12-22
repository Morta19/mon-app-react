import React from "react";
import {
  FaBriefcase,
  FaCalendar,
  FaMapMarkerAlt,
  FaAward,
  FaExternalLinkAlt,
  FaRobot,
  FaServer,
  FaLayerGroup,
} from "react-icons/fa";

const Experience = () => {
  const user = {
    experience: "2 ans",
    availability: "Disponible immédiatement",
    bio: "Expert Full-Stack spécialisé dans l'ingénierie de données et les architectures microservices. Je transforme des problématiques complexes en interfaces fluides et backends robustes.",

    experiences: [
      {
        id: 1,
        period: "Janv 2025 - Avr 2025",
        role: "Développeur Web Full-Stack",
        company: "Linio.io (USA)",
        location: "Remote",
        type: "Stage International",
        icon: <FaRobot className="text-cyan-400" />,
        color: "from-cyan-500/20 to-blue-500/20",
        description:
          "Ingénierie de solutions d'automatisation à grande échelle et développement d'interfaces réactives.",
        achievements: [
          "Architecture React & Flask haute performance",
          "Pipelines de scraping (Selenium/Playwright)",
          "Optimisation des performances de 40%",
        ],
        technologies: ["React", "Flask", "Selenium", "Playwright"],
      },
      {
        id: 2,
        period: "Juil 2025 - Août 2025",
        role: "Full-Stack Engineer",
        company: "Bacab Consulting",
        location: "Tunisie",
        type: "Stage",
        icon: <FaServer className="text-purple-400" />,
        color: "from-purple-500/20 to-pink-500/20",
        description:
          "Conception d'un écosystème de gestion de stock basé sur une architecture microservices.",
        achievements: [
          "Orchestration de microservices Flask",
          "Déploiement avec Docker & MySQL",
          "Interface Vue.js ultra-rapide",
        ],
        technologies: ["Flask", "Vue.js", "MySQL", "Docker"],
      },
    ],

    certifications: [
      {
        name: "Meilleur Projet Innovant",
        organization: "Projects Valley – IIT",
        date: "2024",
        url: "#",
      },
    ],
  };

  return (
    <section className="min-h-screen bg-[#050505] text-white py-24 relative overflow-hidden">
      {/* --- Effets de fond (Ambient Light) --- */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[120px] -z-0"></div>
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[120px] -z-0"></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* --- HEADER STYLE "MAGAZINE" --- */}
        <div className="flex flex-col mb-20">
          <div className="flex items-center gap-3 mb-4">
            <span className="h-[2px] w-10 bg-blue-500"></span>
            <span className="text-blue-500 font-mono tracking-widest uppercase text-sm">
              Mon Parcours
            </span>
          </div>
          <h2 className="text-6xl md:text-8xl font-black italic tracking-tighter leading-none">
            EXPERIENCE <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-zinc-100 to-zinc-500">
              & EVOLUTION.
            </span>
          </h2>
        </div>

        {/* --- BENTO GRID LAYOUT --- */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {/* Bloc Bio & Stats */}
          <div className="md:col-span-8 bg-zinc-900/30 border border-white/10 p-10 rounded-[2.5rem] backdrop-blur-xl flex flex-col justify-between">
            <p className="text-2xl md:text-3xl font-light leading-relaxed text-zinc-300 italic">
              "{user.bio}"
            </p>
            <div className="flex items-center gap-6 mt-12 pt-8 border-t border-white/5">
              <div>
                <p className="text-4xl font-black text-blue-500">
                  {user.experience}
                </p>
                <p className="text-xs uppercase tracking-widest text-zinc-500">
                  Expertise
                </p>
              </div>
              <div className="h-10 w-[1px] bg-white/10"></div>
              <div>
                <p className="text-sm font-bold text-green-400 uppercase tracking-tighter">
                  {user.availability}
                </p>
                <p className="text-xs uppercase tracking-widest text-zinc-500">
                  Statut actuel
                </p>
              </div>
            </div>
          </div>

          {/* Bloc Stack Principal (Visuel) */}
          <div className="md:col-span-4 bg-blue-600 rounded-[2.5rem] p-10 flex flex-col justify-between group overflow-hidden relative">
            <FaLayerGroup className="text-8xl absolute -right-5 -top-5 opacity-20 rotate-12 group-hover:rotate-0 transition-transform duration-500" />
            <h4 className="text-2xl font-bold relative z-10">
              Stack <br />
              Maîtrisé
            </h4>
            <div className="space-y-2 relative z-10">
              {[
                "Python / Flask",
                "React / Vue",
                "Scraping Expert",
                "Microservices",
              ].map((s) => (
                <div
                  key={s}
                  className="text-sm font-medium py-1 px-3 bg-white/20 rounded-lg w-fit"
                >
                  {s}
                </div>
              ))}
            </div>
          </div>

          {/* --- LES CARTES D'EXPÉRIENCE --- */}
          {user.experiences.map((exp) => (
            <div
              key={exp.id}
              className="md:col-span-6 bg-zinc-900/50 border border-white/5 p-8 rounded-[2.5rem] hover:border-blue-500/50 transition-all duration-500 group"
            >
              <div className="flex justify-between items-start mb-8">
                <div
                  className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${exp.color} flex items-center justify-center text-3xl shadow-lg`}
                >
                  {exp.icon}
                </div>
                <div className="text-right">
                  <div className="flex items-center gap-2 text-zinc-400 font-mono text-sm justify-end">
                    <FaCalendar className="text-xs" /> {exp.period}
                  </div>
                  <span className="text-[10px] text-blue-400 font-black uppercase tracking-widest">
                    {exp.type}
                  </span>
                </div>
              </div>

              <h4 className="text-3xl font-bold mb-1 group-hover:text-blue-400 transition-colors">
                {exp.role}
              </h4>
              <p className="text-zinc-500 font-medium mb-6 flex items-center gap-2">
                {exp.company} • {exp.location}
              </p>

              <div className="space-y-4 mb-8">
                {exp.achievements.map((a, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div className="mt-1.5 h-1.5 w-1.5 rounded-full bg-blue-500"></div>
                    <p className="text-sm text-zinc-300 leading-snug">{a}</p>
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap gap-2 pt-4 border-t border-white/5">
                {exp.technologies.map((t) => (
                  <span
                    key={t}
                    className="text-[10px] font-bold px-2 py-1 bg-white/5 rounded text-zinc-400 uppercase tracking-tighter"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          ))}

          {/* --- SECTION RECONNAISSANCE (LIGNE FINALE) --- */}
          <div className="md:col-span-12 bg-gradient-to-r from-zinc-900 to-transparent border border-white/5 p-8 rounded-[2.5rem] flex flex-col md:flex-row items-center justify-between gap-6 group">
            <div className="flex items-center gap-6">
              <div className="w-16 h-16 rounded-full bg-yellow-500/10 flex items-center justify-center text-yellow-500 text-3xl animate-pulse">
                <FaAward />
              </div>
              <div>
                <h4 className="text-2xl font-bold tracking-tight">
                  Projet Innovant de l'Année
                </h4>
                <p className="text-zinc-500">IIT - Projects Valley • 2024</p>
              </div>
            </div>
            <a
              href={user.certifications[0].url}
              className="px-8 py-4 bg-white text-black rounded-full font-bold flex items-center gap-2 hover:bg-blue-500 hover:text-white transition-all shadow-xl active:scale-95"
            >
              VOIR LE CERTIFICAT <FaExternalLinkAlt className="text-xs" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
