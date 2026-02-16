import {
    motion,
    useMotionValue,
    transform,
    useInView,
    AnimatePresence,
    LayoutGroup,
} from "framer-motion";
import { useEffect, useMemo, useRef, useState } from "react";
import Section from "./Section";
import appleWatchImg from "../assets/applewatch.png";
import { HiX } from "react-icons/hi";
import {
    FaReact,
    FaPhp,
    FaJava,
    FaHtml5,
    FaCss3Alt,
    FaGitAlt,
    FaGithub,
    FaNpm,
    FaWordpress,
    FaLaravel,
    FaDocker,
} from "react-icons/fa";
import {
    SiJavascript,
    SiTailwindcss,
    SiSpring,
    SiMysql,
    SiPostman,
    SiIntellijidea,
    SiApache,
    SiPostgresql,
    SiFirebase,
    SiRedux,
    SiTypescript,
    SiVite,
    SiFramer,
    SiOpenai,
    SiMui,
    SiGooglegemini,
    SiClaude,
    SiApachemaven,
} from "react-icons/si";
import { BiLogoVisualStudio } from "react-icons/bi";

// Tecnologías con iconos, colores y experiencia (+ type para tabs)
const technologies = [
    { name: "HTML5", icon: FaHtml5, color: "#fff", bg: "#E34F26", type: "language", experience: "Maquetación y estructura semántica orientada a SEO en proyectos personales. En React lo utilizo mediante JSX como base del marcado HTML de la aplicación." },
    { name: "CSS3", icon: FaCss3Alt, color: "#fff", bg: "#1572B6", type: "language", experience: "Utilizado en varios proyectos, con especial foco en diseño responsive y correcta adaptación a distintos tamaños de pantalla." },
    { name: "Tailwind", icon: SiTailwindcss, color: "#fff", bg: "#06B6D4", type: "language", experience: "Lo utilizo como reemplazo de CSS puro para ganar productividad y agilidad en el desarrollo de mis proyectos, manteniendo estilos consistentes." },
    { name: "JavaScript", icon: SiJavascript, color: "#000", bg: "#F7DF1E", type: "language", experience: "Lo utilizo como base de React, encargándome de la lógica de frontend y del consumo de APIs." },
    { name: "TypeScript", icon: SiTypescript, color: "#fff", bg: "#3178C6", type: "language", experience: "Utilizado en la colaboración de un proyecto, con interés en profundizar su uso especialmente en entornos Node.js." },
    { name: "Java", icon: FaJava, color: "#fff", bg: "#007396", type: "language", experience: "Lo utilizo para el desarrollo de backend con Spring, creando APIs RESTful y gestionando entidades mediante clases." },
    { name: "PHP", icon: FaPhp, color: "#fff", bg: "#777BB4", type: "language", experience: "Desarrollo backend siguiendo el patrón MVC, creando modelos y endpoints." },
    { name: "MySQL", icon: SiMysql, color: "#fff", bg: "#4479A1", type: "language", experience: "Utilizada como base de datos relacional en distintos proyectos para almacenar y gestionar la información." },
    { name: "PostgreSQL", icon: SiPostgresql, color: "#fff", bg: "#4169E1", type: "language", experience: "La he utilizado en proyectos como base de datos relacional, con el objetivo de trabajar y probar distintas tecnologías de bases de datos." },
    { name: "Git", icon: FaGitAlt, color: "#fff", bg: "#F05032", type: "tool", experience: "Utilizado en todos mis proyectos como sistema de control de versiones." },
    { name: "GitHub", icon: FaGithub, color: "#000", bg: "#ffffff", type: "tool", experience: "Lo utilizo como repositorio remoto para gestionar proyectos y colaborar en equipo." },
    { name: "Apache", icon: SiApache, color: "#fff", bg: "#D22128", type: "tool", experience: "Lo he utilizado a través de XAMPP como servidor local para el desarrollo y ejecución de aplicaciones PHP." },
    { name: "Spring", icon: SiSpring, color: "#fff", bg: "#6DB33F", type: "language", experience: "Utilizado en backend para crear APIs, gestionar entidades y aplicar seguridad con JWT y Spring Security." },
    { name: "WordPress", icon: FaWordpress, color: "#fff", bg: "#21759B", type: "language", experience: "Utilizado para el desarrollo de webs sencillas, agilizando los tiempos de creación." },
    { name: "React", icon: FaReact, color: "#000", bg: "#61DAFB", type: "language", experience: "Es la librería que más utilizo para desarrollar aplicaciones SPA y frontends que consumen APIs de backends, como servicios creados con Spring." },
    { name: "Redux", icon: SiRedux, color: "#fff", bg: "#764ABC", type: "tool", experience: "Utilizado en una SPA para gestionar el estado global cuando la aplicación manejaba muchos datos simultáneamente." },
    { name: "Laravel", icon: FaLaravel, color: "#fff", bg: "#FF2D20", type: "language", experience: "Lo he utilizado en un curso de fundamentos para aprender la base del framework, aunque todavía no lo he aplicado en un proyecto real." },
    { name: "Vite", icon: SiVite, color: "#000", bg: "#646CFF", type: "tool", experience: "Lo utilizo como herramienta de desarrollo al crear proyectos React, encargándose del servidor de desarrollo y del proceso de build." },
    { name: "npm", icon: FaNpm, color: "#fff", bg: "#CB3837", type: "tool", experience: "Lo utilizo en todos mis proyectos JavaScript para la gestión de dependencias y ejecución de scripts." },
    { name: "Maven", icon: SiApachemaven, color: "#fff", bg: "#C71A36", type: "tool", experience: "Gestión de dependencias, build y ciclo de vida de proyectos Java con Maven." },
    { name: "Docker", icon: FaDocker, color: "#fff", bg: "#2496ED", type: "tool", experience: "Lo utilicé en una aplicación Spring para contenerizar el backend y poder desplegarlo en Render." },
    { name: "Postman", icon: SiPostman, color: "#fff", bg: "#FF6C37", type: "tool", experience: "Herramienta para probar APIs RESTful durante el desarrollo backend." },
    { name: "VS Code", icon: BiLogoVisualStudio, color: "#fff", bg: "#007ACC", type: "tool", experience: "Lo utilizo como editor principal para todos mis proyectos, excepto para desarrollo en Java." },
    { name: "IntelliJ", icon: SiIntellijidea, color: "#fff", bg: "#0071C5", type: "tool", experience: "Lo utilizo como IDE principal para el desarrollo en Java y Spring." },
    { name: "Framer Motion", icon: SiFramer, color: "#000", bg: "#FF0055", type: "tool", experience: "Lo utilizo en proyectos React para crear animaciones y transiciones en la interfaz de usuario." },
    { name: "Firebase", icon: SiFirebase, color: "#000", bg: "#FFCA28", type: "tool", experience: "Utilizado en SPAs para autenticación, Firestore, storage, functions y hosting." },
    { name: "Claude", icon: SiClaude, color: "#cf7336", bg: "#c6b0a2", type: "tool", experience: "Utilizado para generar código y resolver dudas durante el desarrollo." },
    { name: "ChatGPT", icon: SiOpenai, color: "#fff", bg: "#10A37F", type: "tool", experience: "Lo utilizo de forma general como asistente para resolver dudas, aprender conceptos y apoyar el desarrollo, no solo en programación." },
    { name: "Gemini", icon: SiGooglegemini, color: "#fff", bg: "#8E75B2", type: "tool", experience: "IA utilizada puntualmente para generar código e imágenes, resolver dudas y consultas sobre Firebase." },
    { name: "Material UI", icon: SiMui, color: "#fff", bg: "#007FFF", type: "tool", experience: "Utilizado en una SPA para la implementación de tablas y componentes de interfaz." },
];

const icon = { margin: 12, size: 60 };
const device = { width: 220, height: 268 };

// Imagen Apple Watch grande (1200x1200) + screen box
const watchImg = {
    size: 1200,
    screen: { x: 360, y: 300, w: 480, h: 600 },
};

const watchScale = device.height / watchImg.screen.h;
const watchDisplaySize = Math.round(watchImg.size * watchScale);
const screenLeft = Math.round(watchImg.screen.x * watchScale);
const screenTop = Math.round(watchImg.screen.y * watchScale);

// Hook para transformar los iconos
function useIconTransform({ x, y, scale, planeX, planeY, xOffset, yOffset }) {
    const xScale = useRef(1);
    const yScale = useRef(1);

    const createScreenRange = (axis) => [
        -60,
        80,
        device[axis] - (icon.size + icon.margin) / 2 - 80,
        device[axis] - (icon.size + icon.margin) / 2 + 60,
    ];

    const scaleRange = [0, 1, 1, 0];
    const xRange = createScreenRange("width");
    const yRange = createScreenRange("height");

    const mapScreenToXOffset = transform(xRange, [50, 0, 0, -50]);
    const mapScreenToYOffset = transform(yRange, [50, 0, 0, -50]);
    const mapScreenXToScale = transform(xRange, scaleRange);
    const mapScreenYToScale = transform(yRange, scaleRange);

    useMemo(() => {
        const transformFn = (v) => {
            const screenOffset = v + xOffset + 20;
            xScale.current = mapScreenXToScale(screenOffset);
            const newScale = Math.min(xScale.current, yScale.current);
            scale.set(newScale);
            x.set(mapScreenToXOffset(screenOffset));
        };

        transformFn(planeX.get());
        return planeX.on("change", transformFn);
    }, [planeX, scale, x, xOffset, mapScreenXToScale, mapScreenToXOffset]);

    useMemo(() => {
        const transformFn = (v) => {
            const screenOffset = v + yOffset + 20;
            yScale.current = mapScreenYToScale(screenOffset);
            const newScale = Math.min(xScale.current, yScale.current);
            scale.set(newScale);
            y.set(mapScreenToYOffset(screenOffset));
        };

        transformFn(planeY.get());
        return planeY.on("change", transformFn);
    }, [planeY, scale, y, yOffset, mapScreenYToScale, mapScreenToYOffset]);
}

function Item({ row, col, planeX, planeY, tech, onTechClick }) {
    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const scale = useMotionValue(1);

    const xOffset =
        col * (icon.size + icon.margin) +
        (row % 2) * ((icon.size + icon.margin) / 2);
    const yOffset = row * icon.size;

    useIconTransform({ x, y, scale, planeX, planeY, xOffset, yOffset });

    const Icon = tech.icon;

    return (
        <motion.div
            onClick={() => onTechClick(tech)}
            style={{
                position: "absolute",
                left: xOffset,
                top: yOffset,
                x,
                y,
                scale,
                width: icon.size,
                height: icon.size,
                borderRadius: "50%",
                contain: "strict",
                background: tech.bg,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: `0 0 15px ${tech.bg}80`,
                cursor: "pointer",
            }}
        >
            <Icon style={{ fontSize: "30px", color: tech.color }} />
        </motion.div>
    );
}

export default function Technologies() {
    const [selectedTech, setSelectedTech] = useState(null);
    const [viewMode, setViewMode] = useState("watch");
    const [activeTab, setActiveTab] = useState("language");

    const ref = useRef(null);
    const isInView = useInView(ref, { once: false, margin: "-100px" });

    // AppleWatch grid
    const grid = [];
    for (let row = 0; row < 10; row++) {
        for (let col = 0; col < 8; col++) {
            const index = (row * 8 + col) % technologies.length;
            grid.push({ row, col, tech: technologies[index] });
        }
    }

    const x = useMotionValue(-135);
    const y = useMotionValue(-135);

    const closeModal = () => setSelectedTech(null);

    const languages = useMemo(
        () => technologies.filter((t) => t.type === "language"),
        []
    );
    const tools = useMemo(
        () => technologies.filter((t) => t.type === "tool"),
        []
    );
    const tabItems = activeTab === "language" ? languages : tools;

    // Cerrar modal al cambiar vista/tab
    useEffect(() => {
        setSelectedTech(null);
    }, [viewMode, activeTab]);

    useEffect(() => {
        if (!selectedTech) return;

        const onKey = (e) => e.key === "Escape" && setSelectedTech(null);
        window.addEventListener("keydown", onKey);

        const prev = document.body.style.overflow;
        document.body.style.overflow = "hidden";

        return () => {
            window.removeEventListener("keydown", onKey);
            document.body.style.overflow = prev || "";
        };
    }, [selectedTech]);

    return (
        <Section id="technologies">
            <div ref={ref} className="container mx-auto max-w-6xl">
                <motion.h2
                    className="text-5xl font-bold text-white text-center mb-12"
                    initial={{ opacity: 0, y: -50 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                >
                    <motion.span
                        className="bg-clip-text text-transparent"
                        style={{
                            backgroundImage:
                                "linear-gradient(90deg, var(--primary), var(--accent))",
                            backgroundSize: "200% 200%",
                        }}
                        animate={{
                            backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                        }}
                        transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
                    >
                        Tecnologías
                    </motion.span>{" "}
                    &{" "}
                    <motion.span
                        className="bg-clip-text text-transparent"
                        style={{
                            backgroundImage:
                                "linear-gradient(90deg, var(--primary), var(--accent))",
                            backgroundSize: "200% 200%",
                        }}
                        animate={{
                            backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                        }}
                        transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
                    >
                        Herramientas
                    </motion.span>
                </motion.h2>

                <motion.p
                    className="text-gray-400 mb-6 text-center"
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8, delay: 0.2 }}
                >
                    {viewMode === "watch"
                        ? "Arrastra y selecciona para saber más"
                        : "Selecciona una card para saber más"}
                </motion.p>

                {/* Switch view + tabs */}
                <div className="flex flex-col items-center gap-4 mb-8">

                    {/* VIEW SWITCH */}
                    <div className="relative inline-flex rounded-full p-[2px] bg-gradient-to-r from-[var(--primary)] to-[var(--accent)]">
                        <div className="inline-flex rounded-full bg-slate-950/80 backdrop-blur-md p-1">
                            <button
                                onClick={() => setViewMode("watch")}
                                className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 cursor-pointer
          ${viewMode === "watch"
                                        ? "bg-gradient-to-r from-[var(--primary)] to-[var(--accent)] text-white shadow-[0_0_18px_var(--primary-glow)]"
                                        : "text-gray-300 hover:text-white"
                                    }`}
                            >
                                Apple Watch
                            </button>

                            <button
                                onClick={() => setViewMode("cards")}
                                className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 cursor-pointer
          ${viewMode === "cards"
                                        ? "bg-gradient-to-r from-[var(--primary)] to-[var(--accent)] text-white shadow-[0_0_18px_var(--primary-glow)]"
                                        : "text-gray-300 hover:text-white"
                                    }`}
                            >
                                Cards
                            </button>
                        </div>
                    </div>

                    {viewMode === "cards" && (
                        <div className="relative inline-flex rounded-xl p-[2px] bg-gradient-to-r from-[var(--primary)] to-[var(--accent)]">
                            <div className="relative inline-flex rounded-xl bg-slate-950/90 backdrop-blur-md p-1">
                                <button
                                    onClick={() => setActiveTab("language")}
                                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 cursor-pointer
          ${activeTab === "language"
                                            ? "bg-gradient-to-r from-[var(--primary)] to-[var(--accent)] text-white shadow-[0_0_18px_var(--primary-glow)]"
                                            : "text-gray-300 hover:text-white"
                                        }`}
                                >
                                    Lenguajes & Frameworks
                                </button>

                                <button
                                    onClick={() => setActiveTab("tool")}
                                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 cursor-pointer
          ${activeTab === "tool"
                                            ? "bg-gradient-to-r from-[var(--primary)] to-[var(--accent)] text-white shadow-[0_0_18px_var(--primary-glow)]"
                                            : "text-gray-300 hover:text-white"
                                        }`}
                                >
                                    Herramientas
                                </button>
                            </div>
                        </div>
                    )}
                </div>

                <LayoutGroup>
                    {/* Content */}
                    {viewMode === "watch" ? (
                        <div className="flex justify-center">
                            {/* Wrapper responsive: en móvil escala el conjunto */}
                            <div className="w-fit mx-auto">
                                <div
                                    className="relative origin-top sm:transform-none"
                                    style={{
                                        width: watchDisplaySize,
                                        height: watchDisplaySize * 0.65,
                                    }}
                                >
                                    <div
                                        className="sm:scale-100"
                                        style={{
                                            width: watchDisplaySize,
                                            height: watchDisplaySize,
                                            transform: "scale(0.65)",
                                            transformOrigin: "top center",
                                        }}
                                    >
                                        <img
                                            src={appleWatchImg}
                                            alt="Apple Watch"
                                            className="w-full h-full object-contain select-none pointer-events-none translate-x-[8px]"
                                            draggable={false}
                                        />

                                        {/* Pantalla: tu menú (sin tocar device) */}
                                        <div
                                            className="absolute"
                                            style={{
                                                left: screenLeft,
                                                top: screenTop,
                                                width: device.width,
                                                height: device.height,
                                            }}
                                        >
                                            <div
                                                style={{
                                                    width: device.width,
                                                    height: device.height,
                                                    overflow: "hidden",
                                                    background: "black",
                                                    borderRadius: "50px",
                                                    position: "relative",
                                                }}
                                            >
                                                <motion.div
                                                    drag
                                                    dragConstraints={{
                                                        left: -390,
                                                        right: 30,
                                                        top: -360,
                                                        bottom: 30,
                                                    }}
                                                    style={{
                                                        width: 600,
                                                        height: 600,
                                                        x,
                                                        y,
                                                        background: "transparent",
                                                        cursor: "grab",
                                                    }}
                                                    whileTap={{ cursor: "grabbing" }}
                                                >
                                                    {grid.map((item, index) => (
                                                        <Item
                                                            key={index}
                                                            row={item.row}
                                                            col={item.col}
                                                            planeX={x}
                                                            planeY={y}
                                                            tech={item.tech}
                                                            onTechClick={setSelectedTech}
                                                        />
                                                    ))}
                                                </motion.div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ) : (
                        // Vista Cards pequeñas (logo + nombre) + modal al click con animación
                        <motion.div
                            key={`tech-grid-${activeTab}`}
                            className="max-w-5xl mx-auto px-4"
                            initial="hidden"
                            animate={isInView ? "visible" : "hidden"}
                            variants={{
                                hidden: { opacity: 0 },
                                visible: { opacity: 1, transition: { staggerChildren: 0.07 } },
                            }}
                        >
                            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
                                {tabItems.map((tech) => {
                                    const Icon = tech.icon;

                                    return (
                                        <motion.div
                                            key={tech.name}
                                            className="relative h-full"
                                            variants={{
                                                hidden: { opacity: 0, y: 18 },
                                                visible: { opacity: 1, y: 0, transition: { duration: 0.35 } },
                                            }}
                                        >
                                            {/* Wrapper con hover (igual que Projects) */}
                                            <motion.div
                                                className="h-full"
                                                whileHover={{ y: -8 }}
                                                transition={{ duration: 0.2 }}
                                            >
                                                <motion.button
                                                    type="button"
                                                    onClick={() => setSelectedTech(tech)}
                                                    className="text-left w-full h-full block cursor-pointer"
                                                >
                                                    <motion.div
                                                        layoutId={`tech-card-${tech.name}`}
                                                        className="bg-slate-900/70 backdrop-blur-sm rounded-2xl p-5 h-full border border-slate-700 overflow-hidden relative transition-shadow duration-300"
                                                        style={{ boxShadow: "0 0 0 rgba(0,0,0,0)" }}
                                                        whileHover={{ boxShadow: "0 0 30px var(--primary-glow)" }}
                                                    >
                                                        {/* Overlay sutil (como Projects) */}
                                                        <div className="absolute inset-0 bg-gradient-to-br from-[var(--primary)] to-[var(--accent)] opacity-10" />

                                                        {/* Toque del color de la tech (radial suave) */}
                                                        <div
                                                            className="absolute inset-0 opacity-20"
                                                            style={{
                                                                background: `radial-gradient(circle at 30% 20%, ${tech.bg}55, transparent 55%)`,
                                                            }}
                                                        />

                                                        <div className="relative z-10">
                                                            {/* Badge centrado (mismo lenguaje que Projects) */}
                                                            <motion.div
                                                                layoutId={`tech-icon-${tech.name}`}
                                                                className="flex justify-center"
                                                            >
                                                                <div
                                                                    className="w-14 h-14 mb-4 rounded-xl flex items-center justify-center"
                                                                    style={{ background: tech.bg }}
                                                                >
                                                                    <tech.icon style={{ fontSize: "28px", color: tech.color }} />
                                                                </div>
                                                            </motion.div>

                                                            {/* Título con gradiente animado como Projects */}
                                                            <motion.h3
                                                                layoutId={`tech-title-${tech.name}`}
                                                                className="text-base font-bold text-center bg-clip-text text-transparent"
                                                                style={{
                                                                    backgroundImage:
                                                                        "linear-gradient(90deg, var(--primary), var(--accent))",
                                                                }}
                                                            >
                                                                {tech.name}
                                                            </motion.h3>
                                                        </div>
                                                    </motion.div>
                                                </motion.button>
                                            </motion.div>
                                        </motion.div>
                                    );
                                })}
                            </div>
                        </motion.div>
                    )}

                    {/* Modal animado tipo Projects (para watch + cards) */}
                    <AnimatePresence>
                        {selectedTech && (
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
                                    onClick={closeModal}
                                >
                                    <motion.div
                                        layoutId={`tech-card-${selectedTech.name}`}
                                        className="w-full max-w-2xl rounded-2xl overflow-hidden relative backdrop-blur-md border"
                                        style={{
                                            borderColor: `${selectedTech.bg}55`,
                                            boxShadow: "0 18px 70px rgba(0,0,0,0.6)",
                                            background: "rgba(2, 6, 23, 0.88)", // slate-950/90 vibe
                                        }}
                                        onClick={(e) => e.stopPropagation()}
                                    >
                                        {/* Fondo */}
                                        <div
                                            className="absolute inset-0"
                                            style={{
                                                background: `linear-gradient(135deg, ${selectedTech.bg}22, ${selectedTech.bg}08)`,
                                            }}
                                        />

                                        <div className="relative z-10 p-6 md:p-8">
                                            <div className="flex items-center gap-4 mb-4">
                                                <motion.div
                                                    layoutId={`tech-icon-${selectedTech.name}`}
                                                    className="w-16 h-16 rounded-full flex items-center justify-center"
                                                    style={{ background: selectedTech.bg }}
                                                >
                                                    <selectedTech.icon
                                                        style={{
                                                            fontSize: "32px",
                                                            color: selectedTech.color,
                                                        }}
                                                    />
                                                </motion.div>

                                                <motion.h3
                                                    layoutId={`tech-title-${selectedTech.name}`}
                                                    className="text-3xl md:text-4xl font-bold text-white"
                                                >
                                                    {selectedTech.name}
                                                </motion.h3>
                                            </div>

                                            <motion.p
                                                className="text-gray-200/90 leading-relaxed text-center"
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                transition={{ duration: 0.25, delay: 0.05 }}
                                            >
                                                {selectedTech.experience}
                                            </motion.p>

                                            <motion.button
                                                type="button"
                                                onClick={closeModal}
                                                className="absolute top-4 right-4 w-10 h-10 rounded-full border border-white/15 text-white/90 bg-white/5 hover:bg-white/10 flex items-center justify-center transition-colors cursor-pointer"
                                                initial={{ rotate: 0, scale: 0 }}
                                                animate={{ rotate: 90, scale: 1 }}
                                                exit={{ scale: 0, opacity: 0 }}
                                                transition={{ duration: 0.6, ease: "easeOut" }}
                                                whileHover={{ scale: 1.1 }}
                                                whileTap={{ scale: 0.92 }}
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