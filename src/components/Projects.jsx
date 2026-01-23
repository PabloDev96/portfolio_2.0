import { useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence, LayoutGroup, useInView } from "framer-motion";
import Section from "./Section";
import { HiLink, HiInformationCircle } from "react-icons/hi";
import { setParticlesAttractor } from "../utils/particlesAttractor";

// Icons tech
import { FaReact, FaPhp, FaJs } from "react-icons/fa";
import {
    SiFirebase,
    SiSpring,
    SiPostgresql,
    SiTailwindcss,
    SiMysql,
    SiWordpress,
} from "react-icons/si";

const techIcons = {
    React: FaReact,
    Firebase: SiFirebase,
    Spring: SiSpring,
    PostgreSQL: SiPostgresql,
    php: FaPhp,
    JavaScript: FaJs,
    Tailwind: SiTailwindcss,
    MySQL: SiMysql,
    WordPress: SiWordpress,
};

const techColors = {
    React: "#61DAFB",
    Firebase: "#FFCA28",
    Spring: "#6DB33F",
    PostgreSQL: "#336791",
    php: "#777BB4",
    JavaScript: "#F7DF1E",
    Tailwind: "#38BDF8",
    MySQL: "#00758F",
    WordPress: "#21759B",
};

export default function Projects() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: false, margin: "-100px" });

    const [selected, setSelected] = useState(null);

    const projects = useMemo(
        () => [
            {
                id: "isat",
                title: "iSat",
                summary: "App interna de gestión para servicio técnico de reparaciones.",
                details:
                    "Aplicación interna para la gestión de un servicio técnico de reparaciones. Permite administrar reparaciones, clientes, stock, tickets, proformas, facturas e informes.",
                technologies: ["React", "Firebase"],
                color: "from-blue-500 to-cyan-500",
                link: "https://isat-demo.web.app/",
            },
            {
                id: "pawshelt",
                title: "PawShelt",
                summary: "Aplicación para la gestión de un refugio de animales.",
                details:
                    "App para la gestión interna de un refugio de animales. Permite llevar un control eficiente de animales, adopciones, citas y estadísticas con sistema de roles implementado.",
                technologies: ["React", "Spring", "PostgreSQL"],
                color: "from-purple-500 to-pink-500",
                link: "https://paw-shelt-frontend.vercel.app/",
            },
            {
                id: "taskly",
                title: "Gestor de Tareas - Taskly",
                summary: "Gestión de proyectos y tareas con vista Kanban.",
                details:
                    "Proyecto grupal donde desarrollé el backend (APIs para usuarios, proyectos y tareas) e integré con el frontend. La app permite crear y gestionar proyectos y tareas con vista Kanban (drag and drop), login, registro y control de accesos por roles.",
                technologies: ["php", "JavaScript", "Tailwind", "MySQL"],
                color: "from-purple-500 to-pink-500",
                link: "https://coral-mule-348004.hostingersite.com/",
            },
            {
                id: "bpg",
                title: "ButtonPressGaming",
                summary: "Web de noticias gaming con WordPress + SEO.",
                details:
                    "Página Web de noticias gaming creada mediante WordPress usando Elementor y optimizada con Yoast SEO.",
                technologies: ["WordPress"],
                color: "from-purple-500 to-pink-500",
                link: "https://buttonpressgaming.es/",
            },
        ],
        []
    );

    // ===== Partículas: attractor =====
    const attractToTarget = (e, strength = 1.2) => {
        const r = e.currentTarget.getBoundingClientRect();
        setParticlesAttractor({
            x: r.left + r.width / 2,
            y: r.top + r.height / 2,
            active: true,
            strength,
        });
    };
    const stopAttractor = () => setParticlesAttractor({ active: false });

    // ESC + bloquear scroll modal
    useEffect(() => {
        if (!selected) return;

        const onKey = (e) => e.key === "Escape" && setSelected(null);
        window.addEventListener("keydown", onKey);

        const prev = document.body.style.overflow;
        document.body.style.overflow = "hidden";

        return () => {
            window.removeEventListener("keydown", onKey);
            document.body.style.overflow = prev || "";
        };
    }, [selected]);

    const openLink = (url) => window.open(url, "_blank", "noopener,noreferrer");

    return (
        <Section id="projects">
            <div ref={ref} className="container mx-auto max-w-7xl">
                <motion.h2
                    className="text-5xl font-bold text-white text-center mb-16"
                    initial={{ opacity: 0, y: -50 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                >
                    Mis{" "}
                    <motion.span
                        className="bg-clip-text text-transparent"
                        style={{
                            backgroundImage:
                                "linear-gradient(90deg, var(--primary), var(--accent))",
                            backgroundSize: "200% 200%",
                        }}
                        animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
                        transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
                    >
                        Proyectos
                    </motion.span>
                </motion.h2>

                <LayoutGroup>
                    {/* GRID */}
                    <motion.div
                        className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
                        initial="hidden"
                        animate={isInView ? "visible" : "hidden"}
                        variants={{
                            hidden: { opacity: 0 },
                            visible: { opacity: 1, transition: { staggerChildren: 0.12 } },
                        }}
                    >
                        {projects.map((p) => (
                            <motion.div
                                key={p.id}
                                className="relative h-full"
                                variants={{
                                    hidden: { opacity: 0, y: 24 },
                                    visible: { opacity: 1, y: 0, transition: { duration: 0.45 } },
                                }}
                            >
                                {/* Wrapper con hover - NO clicable */}
                                <motion.div
                                    className="h-full"
                                    whileHover={{ y: -8 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    {/* Card clicable */}
                                    <motion.button
                                        type="button"
                                        onClick={() => setSelected(p)}
                                        className="text-left w-full h-full block"
                                    >
                                        <motion.div
                                            layoutId={`card-${p.id}`}
                                            className="bg-slate-900/70 backdrop-blur-sm rounded-2xl p-6 h-full border border-slate-700 overflow-hidden relative"
                                        >
                                            <div
                                                className={`absolute inset-0 bg-gradient-to-br ${p.color} opacity-0 hover:opacity-10 transition-opacity`}
                                            />

                                            <motion.div layoutId={`badge-${p.id}`} className="relative z-10">
                                                <div
                                                    className={`w-16 h-16 mb-4 bg-gradient-to-br ${p.color} rounded-xl flex items-center justify-center text-white text-2xl`}
                                                >
                                                    💼
                                                </div>
                                            </motion.div>

                                            <motion.h3
                                                layoutId={`title-${p.id}`}
                                                className="relative z-10 text-2xl font-bold text-white mb-3"
                                            >
                                                {p.title}
                                            </motion.h3>

                                            <motion.p
                                                layoutId={`desc-${p.id}`}
                                                className="relative z-10 text-gray-300/80 mb-4 leading-relaxed"
                                            >
                                                {p.summary}
                                            </motion.p>

                                            <div className="relative z-10 flex flex-wrap gap-3">
                                                {p.technologies.map((t) => {
                                                    const Icon = techIcons[t];
                                                    const color = techColors[t] || "var(--primary)";
                                                    return (
                                                        <div
                                                            key={`${p.id}-${t}`}
                                                            className="w-10 h-10 rounded-full bg-slate-800/70 border border-slate-600 flex items-center justify-center backdrop-blur-md"
                                                            title={t}
                                                            aria-label={t}
                                                        >
                                                            {Icon ? (
                                                                <Icon
                                                                    className="text-xl"
                                                                    style={{
                                                                        color,
                                                                        filter:
                                                                            "drop-shadow(0 6px 14px rgba(0,0,0,0.35))",
                                                                    }}
                                                                />
                                                            ) : null}
                                                        </div>
                                                    );
                                                })}
                                            </div>
                                        </motion.div>
                                    </motion.button>

                                    {/* Botón INFO - DENTRO del wrapper con hover */}
                                    <AnimatePresence>
                                        {selected?.id !== p.id && (
                                            <motion.button
                                                type="button"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    setSelected(p);
                                                }}
                                                className="absolute top-4 right-4 w-10 h-10 rounded-full bg-transparent border border-[var(--primary)] text-white flex items-center justify-center backdrop-blur-md hover:bg-[var(--primary-soft)] transition-colors z-20 pointer-events-auto"
                                                whileHover={{
                                                    scale: 1.08,
                                                    y: -1,
                                                    boxShadow: "0 12px 32px var(--primary-glow)",
                                                }}
                                                whileTap={{ scale: 0.96 }}
                                                initial={{ opacity: 1 }}
                                                exit={{ opacity: 0, transition: { duration: 0.15 } }}
                                                aria-label={`Más info de ${p.title}`}
                                                title="Más información"
                                                onMouseEnter={(e) => attractToTarget(e, 1.15)}
                                                onMouseLeave={stopAttractor}
                                                onFocus={(e) => attractToTarget(e, 1.15)}
                                                onBlur={stopAttractor}
                                            >
                                                <HiInformationCircle className="text-xl" />
                                            </motion.button>
                                        )}
                                    </AnimatePresence>

                                    {/* Botón LINK - DENTRO del wrapper con hover */}
                                    <AnimatePresence>
                                        {selected?.id !== p.id && (
                                            <motion.button
                                                type="button"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    openLink(p.link);
                                                }}
                                                className="absolute bottom-4 right-4 w-10 h-10 rounded-full bg-transparent border border-[var(--primary)] text-white flex items-center justify-center backdrop-blur-md hover:bg-[var(--primary-soft)] transition-colors z-20 pointer-events-auto"
                                                whileHover={{
                                                    scale: 1.08,
                                                    y: -2,
                                                    boxShadow: "0 14px 40px var(--primary-glow)",
                                                }}
                                                whileTap={{ scale: 0.96 }}
                                                initial={{ opacity: 1 }}
                                                exit={{ opacity: 0, transition: { duration: 0.15 } }}
                                                aria-label="Abrir proyecto"
                                                title="Abrir proyecto"
                                                onMouseEnter={(e) => attractToTarget(e, 1.25)}
                                                onMouseLeave={stopAttractor}
                                                onFocus={(e) => attractToTarget(e, 1.25)}
                                                onBlur={stopAttractor}
                                            >
                                                <HiLink className="text-lg" />
                                            </motion.button>
                                        )}
                                    </AnimatePresence>
                                </motion.div>
                            </motion.div>
                        ))}
                    </motion.div>

                    {/* MODAL */}
                    <AnimatePresence>
                        {selected && (
                            <>
                                {/* Backdrop */}
                                <motion.div
                                    className="fixed inset-0 z-[9998] bg-black/55"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                />

                                <motion.div
                                    className="fixed inset-0 z-[9999] flex items-center justify-center p-4"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    onClick={() => setSelected(null)}
                                >
                                    <motion.div
                                        layoutId={`card-${selected.id}`}
                                        className="w-full max-w-2xl bg-slate-950/90 border border-slate-700 rounded-2xl overflow-hidden relative backdrop-blur-md"
                                        style={{ boxShadow: "0 18px 70px rgba(0,0,0,0.6)" }}
                                        onClick={(e) => e.stopPropagation()}
                                    >
                                        <div
                                            className={`absolute inset-0 bg-gradient-to-br ${selected.color} opacity-10`}
                                        />

                                        <div className="relative z-10 p-6 md:p-8">
                                            <motion.div
                                                layoutId={`badge-${selected.id}`}
                                                className="mb-4"
                                            >
                                                <div
                                                    className={`w-16 h-16 bg-gradient-to-br ${selected.color} rounded-xl flex items-center justify-center text-white text-2xl`}
                                                >
                                                    💼
                                                </div>
                                            </motion.div>

                                            <motion.h3
                                                layoutId={`title-${selected.id}`}
                                                className="text-3xl md:text-4xl font-bold text-white mb-3"
                                            >
                                                {selected.title}
                                            </motion.h3>

                                            <motion.p
                                                className="text-gray-200/90 leading-relaxed mb-6"
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                transition={{ duration: 0.25, delay: 0.05 }}
                                            >
                                                {selected.details}
                                            </motion.p>

                                            <div className="flex flex-wrap gap-3 mb-8">
                                                {selected.technologies.map((t) => {
                                                    const Icon = techIcons[t];
                                                    const color = techColors[t] || "var(--primary)";
                                                    return (
                                                        <div
                                                            key={`${selected.id}-modal-${t}`}
                                                            className="w-11 h-11 rounded-full bg-slate-800/60 border border-white/10 flex items-center justify-center"
                                                            title={t}
                                                        >
                                                            {Icon ? <Icon className="text-2xl" style={{ color }} /> : null}
                                                        </div>
                                                    );
                                                })}
                                            </div>

                                            {/* Link: fixed abajo-dcha del contenedor */}
                                            <motion.button
                                                type="button"
                                                onClick={() => openLink(selected.link)}
                                                className="absolute bottom-5 right-5 w-12 h-12 rounded-full bg-transparent border-2 border-[var(--primary)] text-white flex items-center justify-center backdrop-blur-md hover:bg-[var(--primary-soft)] transition-colors"
                                                whileHover={{
                                                    scale: 1.08,
                                                    y: -2,
                                                    boxShadow: "0 14px 40px var(--primary-glow)",
                                                }}
                                                whileTap={{ scale: 0.96 }}
                                                aria-label="Abrir proyecto"
                                                title="Abrir proyecto"
                                                onMouseEnter={(e) => attractToTarget(e, 1.25)}
                                                onMouseLeave={stopAttractor}
                                                onFocus={(e) => attractToTarget(e, 1.25)}
                                                onBlur={stopAttractor}
                                            >
                                                <HiLink className="text-xl" />
                                            </motion.button>

                                            <button
                                                type="button"
                                                onClick={() => setSelected(null)}
                                                className="absolute top-4 right-4 px-3 py-1.5 rounded-full border border-white/15 text-white/90 bg-white/5 hover:bg-white/10"
                                            >
                                                Cerrar
                                            </button>
                                        </div>
                                    </motion.div>
                                </motion.div>
                            </>
                        )}
                    </AnimatePresence>
                </LayoutGroup>
            </div>
        </Section>
    );
}