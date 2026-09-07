import { useCallback, useEffect, useRef, useState } from "react";

/**
 * Reveal-on-scroll générique.
 * Observe tous les éléments porteurs de [data-reveal] situés sous la ref
 * et leur ajoute la classe `.is-revealed` quand ils entrent dans le viewport.
 * Un MutationObserver surveille les ajouts dynamiques (contenu chargé async),
 * et la callback-ref se ré-attache si le conteneur est remonté
 * (ex: état de chargement qui remplace le contenu).
 *
 * Usage :
 *   const ref = useReveal();   // <div ref={ref}> … <div data-reveal>
 *   useReveal(existingRef);    // réutilise une ref objet existante
 */
export default function useReveal(externalRef) {
  const objRef = useRef(null);
  const [node, setNode] = useState(null);

  // Callback ref : notifie le composant à chaque (re)montage du conteneur.
  // C'est la valeur retournée par le hook (React l'appelle avec le nœud DOM),
  // ce qui gère aussi les montages tardifs (état de chargement, etc.).
  const attach = useCallback((el) => {
    objRef.current = el;
    setNode(el);
  }, []);

  useEffect(() => {
    const root = node ?? externalRef?.current ?? null;
    if (!root) return undefined;

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-revealed");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" },
    );

    const observeAll = () => {
      root
        .querySelectorAll("[data-reveal]:not(.is-revealed)")
        .forEach((el) => io.observe(el));
    };

    observeAll();
    const mo = new MutationObserver(observeAll);
    mo.observe(root, { childList: true, subtree: true });

    return () => {
      io.disconnect();
      mo.disconnect();
    };
  }, [node, externalRef]);

  // Toujours la callback ref (stable) : React l'appelle au montage du
  // conteneur, ce qui déclenche l'observation des [data-reveal].
  // objRef.current reste synchronisé pour un accès .current si besoin.
  return attach;
}
