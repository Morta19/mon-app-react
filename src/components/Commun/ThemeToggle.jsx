import { FaSun, FaMoon } from "react-icons/fa";
import { useTheme } from "../../context/useTheme.jsx";

const ThemeToggle = ({ className = "" }) => {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";

  return (
    <button
      onClick={toggleTheme}
      aria-label={isDark ? "Passer en mode clair" : "Passer en mode sombre"}
      aria-pressed={isDark}
      title={isDark ? "Mode clair" : "Mode sombre"}
      className={`group relative w-9 h-9 shrink-0 rounded-full !border-0 !p-0 !bg-transparent text-[var(--ink)] flex items-center justify-center transition-all hover:!bg-[var(--accent)]/10 hover:scale-110 active:scale-90 ${className}`}
    >
      {isDark ? (
        <FaSun
          size={18}
          className="text-amber-400 drop-shadow-[0_0_6px_rgba(251,191,36,0.55)]"
        />
      ) : (
        <FaMoon size={18} className="text-slate-700 dark:text-slate-200" />
      )}
    </button>
  );
};

export default ThemeToggle;
