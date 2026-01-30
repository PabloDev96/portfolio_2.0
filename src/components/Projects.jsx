import { useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence, LayoutGroup, useInView } from "framer-motion";
import Section from "./Section";
import { HiLink, HiInformationCircle, HiX, HiKey, HiUser, HiLockClosed, HiClipboardCopy, HiCheck } from "react-icons/hi";
import { setParticlesAttractor } from "../utils/particlesAttractor";

// Icons tech
import { FaReact, FaPhp, FaJs, FaCss3Alt } from "react-icons/fa";
import {
    SiFirebase,
    SiSpring,
    SiPostgresql,
    SiTailwindcss,
    SiMysql,
    SiWordpress,
} from "react-icons/si";

// Project icons
import { PiPlantFill } from "react-icons/pi";
import { HiWrench } from "react-icons/hi2";
import { HiNewspaper } from "react-icons/hi";
import { MdPets } from "react-icons/md";
import { BsKanbanFill } from "react-icons/bs";
import { RiUserStarFill } from "react-icons/ri";

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
    CSS: FaCss3Alt,
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
    CSS: "#264de4",
};

export default function Projects() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: false, margin: "-100px" });

    const [selected, setSelected] = useState(null);
    const [copiedField, setCopiedField] = useState(null);

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
                icon: HiWrench,
                credentials: {
                    user: "demo@isat.com",
                    password: "demo123"
                }
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
                icon: MdPets,
                credentials: {
                    user: "admin@pawshelt.com",
                    password: "admin123"
                }
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
                icon: BsKanbanFill,
                credentials: {
                    user: "demo@taskly.com",
                    password: "demo123"
                }
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
                icon: HiNewspaper,
            },
            {
                id: "portfolio-v1",
                title: "Portfolio (v1)",
                summary: "Mi primer portfolio personal para mostrar proyectos y habilidades.",
                details:
                    "Mi primer portfolio hecho con React, JavaScript y CSS. Permite escoger entre 3 versiones, habiendo una estandar y dos interactivas con mini juegos (space invaders y mario bros).",
                technologies: ["React", "JavaScript", "CSS"],
                color: "from-blue-500 to-cyan-500",
                link: "https://portfolio-oscx.vercel.app/",
                icon: RiUserStarFill,
            },
            {
                id: "huerto-app",
                title: "Huerto Manager",
                summary: "App para gestionar un huerto: cultivos, riegos y tareas.",
                details:
                    "Aplicación para la gestión de un huerto. Permite organizar parcelas, registrar cultivos, programar riegos, llevar un calendario de tareas y anotar observaciones/producción para mejorar el seguimiento del huerto.",
                technologies: ["React", "JavaScript", "Tailwind"],
                color: "from-green-500 to-emerald-500",
                link: "https://example.com",
                icon: PiPlantFill,
                credentials: {
                    user: "usuario@huerto.com",
                    password: "huerto123"
                }
            },
        ],
        []
    );

    const copyToClipboard = async (text, field) => {
        try {
            await navigator.clipboard.writeText(text);
            setCopiedField(field);
            setTimeout(() => setCopiedField(null), 2000);
        } catch (err) {
            console.error('Error al copiar:', err);
        }
    };

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
                                            className="bg-slate-900/70 backdrop-blur-sm rounded-2xl p-6 h-full border border-slate-700 overflow-hidden relative transition-shadow duration-300"
                                            style={{
                                                boxShadow: "0 0 0 rgba(0,0,0,0)",
                                            }}
                                            whileHover={{
                                                boxShadow: "0 0 30px var(--primary-glow)",
                                            }}
                                        >

                                            <motion.div layoutId={`badge-${p.id}`} className="relative z-10 flex justify-center">
                                                <div
                                                    className={`w-16 h-16 mb-4 bg-gradient-to-br ${p.color} rounded-xl flex items-center justify-center text-white text-2xl`}
                                                >
                                                    {p.icon && <p.icon className="text-3xl" />}
                                                </div>
                                            </motion.div>

                                            <motion.h3
                                                className="relative z-10 text-2xl font-bold mb-3 text-center bg-clip-text text-transparent"
                                                style={{
                                                    backgroundImage:
                                                        "linear-gradient(90deg, var(--primary), var(--accent))",
                                                    backgroundSize: "200% 200%",
                                                }}
                                                animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
                                                transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
                                            >
                                                {p.title}
                                            </motion.h3>

                                            <motion.p
                                                layoutId={`desc-${p.id}`}
                                                className="relative z-10 text-gray-300/80 mb-4 leading-relaxed text-center"
                                            >
                                                {p.summary}
                                            </motion.p>

                                            <div className="relative z-10 flex flex-wrap gap-3 justify-center">
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
                                        onClick={(e) => e.stopPropagation()}
                                    >
                                        <div
                                            className="absolute inset-0 bg-gradient-to-br from-[var(--primary)] to-[var(--accent)] opacity-10"
                                        />

                                        <div className="relative z-10 p-6 md:p-8">
                                            <motion.div
                                                layoutId={`badge-${selected.id}`}
                                                className="mb-4 flex justify-center"
                                            >
                                                <div
                                                    className={`w-16 h-16 bg-gradient-to-br ${selected.color} rounded-xl flex items-center justify-center text-white text-2xl`}
                                                >
                                                    {selected.icon && <selected.icon className="text-3xl" />}
                                                </div>
                                            </motion.div>

                                            <motion.h3
                                                className="text-3xl md:text-4xl font-bold mb-6 text-center bg-clip-text text-transparent"
                                                style={{
                                                    backgroundImage:
                                                        "linear-gradient(90deg, var(--primary), var(--accent))",
                                                    backgroundSize: "200% 200%",
                                                }}
                                                animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
                                                transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
                                            >
                                                {selected.title}
                                            </motion.h3>

                                            <motion.p
                                                className="text-gray-200/90 leading-relaxed mb-6 text-center"
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                transition={{ duration: 0.25, delay: 0.05 }}
                                            >
                                                {selected.details}
                                            </motion.p>

                                            <div className="flex flex-wrap gap-3 mb-8 justify-center">
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

                                            {/* Credenciales - si existen */}
                                            {selected.credentials && (
                                                <motion.div
                                                    className="mb-6 p-4 bg-slate-800/50 border border-slate-700/50 rounded-xl w-fit mx-auto"
                                                    initial={{ opacity: 0, y: 10 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    transition={{ duration: 0.3, delay: 0.1 }}
                                                >
                                                    <h4 className="text-sm font-semibold text-gray-300 mb-3 flex items-center gap-2">
                                                        <HiKey className="text-lg text-[var(--primary)]" />
                                                        Credenciales de prueba
                                                    </h4>
                                                    
                                                    <div className="space-y-2">
                                                        {/* Usuario */}
                                                        <div className="flex items-center gap-2">
                                                            <div className="flex-1 bg-slate-900/60 px-3 py-2 rounded-lg border border-slate-600/40 flex items-center gap-2">
                                                                <HiUser className="text-gray-400" />
                                                                <div>
                                                                    <div className="text-xs text-gray-400 mb-0.5">Usuario</div>
                                                                    <div className="text-sm text-white font-mono">{selected.credentials.user}</div>
                                                                </div>
                                                            </div>
                                                            <motion.button
                                                                type="button"
                                                                onClick={() => copyToClipboard(selected.credentials.user, 'user')}
                                                                className="px-3 py-2 bg-slate-700/50 hover:bg-slate-700 border border-slate-600/40 rounded-lg transition-colors"
                                                                whileHover={{ scale: 1.05 }}
                                                                whileTap={{ scale: 0.95 }}
                                                                title="Copiar usuario"
                                                            >
                                                                {copiedField === 'user' ? (
                                                                    <HiCheck className="text-green-400" />
                                                                ) : (
                                                                    <HiClipboardCopy className="text-gray-300" />
                                                                )}
                                                            </motion.button>
                                                        </div>
                                                        
                                                        {/* Contraseña */}
                                                        <div className="flex items-center gap-2">
                                                            <div className="flex-1 bg-slate-900/60 px-3 py-2 rounded-lg border border-slate-600/40 flex items-center gap-2">
                                                                <HiLockClosed className="text-gray-400" />
                                                                <div>
                                                                    <div className="text-xs text-gray-400 mb-0.5">Contraseña</div>
                                                                    <div className="text-sm text-white font-mono">{selected.credentials.password}</div>
                                                                </div>
                                                            </div>
                                                            <motion.button
                                                                type="button"
                                                                onClick={() => copyToClipboard(selected.credentials.password, 'password')}
                                                                className="px-3 py-2 bg-slate-700/50 hover:bg-slate-700 border border-slate-600/40 rounded-lg transition-colors"
                                                                whileHover={{ scale: 1.05 }}
                                                                whileTap={{ scale: 0.95 }}
                                                                title="Copiar contraseña"
                                                            >
                                                                {copiedField === 'password' ? (
                                                                    <HiCheck className="text-green-400" />
                                                                ) : (
                                                                    <HiClipboardCopy className="text-gray-300" />
                                                                )}
                                                            </motion.button>
                                                        </div>
                                                    </div>
                                                </motion.div>
                                            )}

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

                                            <motion.button
                                                type="button"
                                                onClick={() => setSelected(null)}
                                                className="absolute top-4 right-4 w-10 h-10 rounded-full border border-white/15 text-white/90 bg-white/5 hover:bg-white/10 flex items-center justify-center transition-colors"
                                                initial={{ rotate: 0, scale: 0 }}
                                                animate={{ rotate: 90, scale: 1 }}
                                                transition={{ duration: 0.6, ease: "easeOut" }}
                                                whileHover={{
                                                    scale: 1.1,
                                                    backgroundColor: "rgba(255, 255, 255, 0.15)"
                                                }}
                                                whileTap={{ scale: 0.9 }}
                                                aria-label="Cerrar modal"
                                                title="Cerrar"
                                            >
                                                <HiX className="text-xl" />
                                            </motion.button>
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