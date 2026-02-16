import { useEffect, useRef } from "react";

const clamp = (v, min, max) => Math.max(min, Math.min(max, v));

export default function ParticlesBackground({
    density = 1.8,           // <--- sube/baja cantidad (1.8 = muchas)
    maxParticles = 260,      // <--- límite para no freír el PC
    interactionRadius = 100,
    linkRadius = 120,
    linkLines = true,
}) {
    const canvasRef = useRef(null);
    const rafRef = useRef(null);
    const mouseRef = useRef({ x: -9999, y: -9999, down: false });
    const attractor = { x: -9999, y: -9999, active: false, strength: 1 };

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d", { alpha: true });
        if (!ctx) return;

        let w = 0;
        let h = 0;
        let dpr = Math.max(1, Math.min(2, window.devicePixelRatio || 1));

        const getTheme = () => {
            const root = document.documentElement;
            const styles = getComputedStyle(root);
            const primary = styles.getPropertyValue("--primary").trim() || "#7c3aed";
            const soft = styles.getPropertyValue("--primary-soft").trim() || "rgba(124,58,237,0.15)";
            return { primary, soft };
        };

        let theme = getTheme();

        const resize = () => {
            w = window.innerWidth;
            h = window.innerHeight;
            dpr = Math.max(1, Math.min(2, window.devicePixelRatio || 1));

            canvas.width = Math.floor(w * dpr);
            canvas.height = Math.floor(h * dpr);
            canvas.style.width = `${w}px`;
            canvas.style.height = `${h}px`;
            ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        };

        resize();

        // Cantidad: basada en el área + density
        const area = w * h;
        const baseCount = area / 9000; // menor divisor = más partículas
        const count = clamp(Math.floor(baseCount * density), 60, maxParticles);

        const rand = (a, b) => a + Math.random() * (b - a);

        const particles = Array.from({ length: count }, () => ({
            x: rand(0, w),
            y: rand(0, h),
            vx: rand(-0.35, 0.35),
            vy: rand(-0.35, 0.35),
            r: rand(0.9, 1.8),         // puntos pequeños
            a: rand(0.25, 0.8),        // alpha individual
            seed: Math.random() * 1000,
        }));

        const onMove = (e) => {
            mouseRef.current.x = e.clientX;
            mouseRef.current.y = e.clientY;
        };
        const onDown = () => (mouseRef.current.down = true);
        const onUp = () => (mouseRef.current.down = false);
        const onLeave = () => {
            mouseRef.current.x = -9999;
            mouseRef.current.y = -9999;
            mouseRef.current.down = false;
        };

        window.addEventListener("mousemove", onMove, { passive: true });
        window.addEventListener("mousedown", onDown, { passive: true });
        window.addEventListener("mouseup", onUp, { passive: true });
        window.addEventListener("mouseleave", onLeave);

        const onAttractor = (e) => {
            const { x, y, active, strength } = e.detail || {};
            attractor.x = typeof x === "number" ? x : -9999;
            attractor.y = typeof y === "number" ? y : -9999;
            attractor.active = !!active;
            attractor.strength = typeof strength === "number" ? strength : 1;
        };

        window.addEventListener("particles:attractor", onAttractor);

        // Actualiza colores al cambiar data-theme
        const obs = new MutationObserver(() => {
            theme = getTheme();
        });
        obs.observe(document.documentElement, {
            attributes: true,
            attributeFilter: ["data-theme"],
        });

        const tick = () => {
            ctx.clearRect(0, 0, w, h);

            const mx = mouseRef.current.x;
            const my = mouseRef.current.y;

            // LÍNEAS (opcional)
            if (linkLines) {
                for (let i = 0; i < particles.length; i++) {
                    for (let j = i + 1; j < particles.length; j++) {
                        const a = particles[i];
                        const b = particles[j];
                        const dx = a.x - b.x;
                        const dy = a.y - b.y;
                        const d = Math.sqrt(dx * dx + dy * dy);

                        if (d < linkRadius) {
                            const alpha = (1 - d / linkRadius) * 0.22;
                            ctx.strokeStyle = theme.primary;
                            ctx.globalAlpha = alpha;
                            ctx.lineWidth = 1;
                            ctx.beginPath();
                            ctx.moveTo(a.x, a.y);
                            ctx.lineTo(b.x, b.y);
                            ctx.stroke();
                        }
                    }
                }
                ctx.globalAlpha = 1;
            }

            // PARTÍCULAS
            for (const p of particles) {
                // drift suave
                p.vx += Math.sin((p.seed + performance.now() * 0.001) * 0.12) * 0.0009;
                p.vy += Math.cos((p.seed + performance.now() * 0.001) * 0.12) * 0.0009;

                // Interacción: mouse repele; click atrae (opcional)
                const dx = p.x - mx;
                const dy = p.y - my;
                const dist = Math.sqrt(dx * dx + dy * dy);

                if (dist < interactionRadius) {
                    const forceBase = (1 - dist / interactionRadius) * 0.9;
                    const force = mouseRef.current.down ? -forceBase : forceBase; // click = atrae
                    const nx = dx / (dist || 1);
                    const ny = dy / (dist || 1);
                    p.vx += nx * force * 0.09;
                    p.vy += ny * force * 0.09;
                }

                // Atracción a un “objetivo” (hover de botones)
                if (attractor.active) {
                    const ax = p.x - attractor.x;
                    const ay = p.y - attractor.y;
                    const ad = Math.sqrt(ax * ax + ay * ay);

                    // radio un poco menor que el del ratón, ajustable
                    const AR = 160;

                    if (ad < AR) {
                        const pull = (1 - ad / AR) * 0.8 * attractor.strength; // fuerza
                        const nx = ax / (ad || 1);
                        const ny = ay / (ad || 1);

                        // como queremos que se ACERQUEN, restamos (atraer hacia attractor)
                        p.vx -= nx * pull * 0.10;
                        p.vy -= ny * pull * 0.10;
                    }
                }

                // fricción
                p.vx *= 0.985;
                p.vy *= 0.985;
                p.vx = clamp(p.vx, -1.6, 1.6);
                p.vy = clamp(p.vy, -1.6, 1.6);

                p.x += p.vx;
                p.y += p.vy;

                // wrap (sale por un lado, entra por el otro)
                if (p.x < -10) p.x = w + 10;
                if (p.x > w + 10) p.x = -10;
                if (p.y < -10) p.y = h + 10;
                if (p.y > h + 10) p.y = -10;

                // dibuja punto con color del tema (usamos primary)
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
                ctx.fillStyle = theme.primary;
                ctx.globalAlpha = p.a * 0.55; // opacity general
                ctx.fill();
                ctx.globalAlpha = 1;
            }

            rafRef.current = requestAnimationFrame(tick);
        };

        rafRef.current = requestAnimationFrame(tick);

        window.addEventListener("resize", resize, { passive: true });

        return () => {
            if (rafRef.current) cancelAnimationFrame(rafRef.current);
            window.removeEventListener("resize", resize);
            window.removeEventListener("mousemove", onMove);
            window.removeEventListener("mousedown", onDown);
            window.removeEventListener("mouseup", onUp);
            window.removeEventListener("mouseleave", onLeave);
            window.removeEventListener("particles:attractor", onAttractor);
            obs.disconnect();
        };
    }, [density, maxParticles, interactionRadius, linkRadius, linkLines]);

    return (
        <canvas
            ref={canvasRef}
            className="fixed inset-0 z-[1] pointer-events-none"
            aria-hidden="true"
        />
    );
}