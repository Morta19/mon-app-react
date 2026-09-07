import { useCallback, useRef } from "react";

/**
 * Effet tilt 3D léger (sans librairie) : applique une rotation
 * perspective à la carte selon la position du curseur.
 * Désactivé si l'utilisateur préfère réduire les animations.
 *
 * Usage :  const tiltRef = useTilt();  <article ref={tiltRef} className="tilt-card">
 */
export default function useTilt(maxDeg = 7) {
  const ref = useRef(null);

  const onMouseMove = useCallback(
    (event) => {
      const el = ref.current;
      if (!el) return;
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      const rect = el.getBoundingClientRect();
      const px = (event.clientX - rect.left) / rect.width - 0.5;
      const py = (event.clientY - rect.top) / rect.height - 0.5;

      // Le stagger de reveal n'a plus lieu d'être après le premier survol :
      // évite un retour au repos retardé au mouseleave.
      if (el.style.getPropertyValue("--reveal-delay")) {
        el.style.setProperty("--reveal-delay", "0ms");
      }
      el.classList.add("is-tilting");
      el.style.transform = `perspective(900px) rotateX(${(-py * maxDeg).toFixed(2)}deg) rotateY(${(px * maxDeg).toFixed(2)}deg) translateY(-6px)`;
    },
    [maxDeg],
  );

  const onMouseLeave = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    el.classList.remove("is-tilting");
    el.style.transform = "";
  }, []);

  return { ref, onMouseMove, onMouseLeave };
}