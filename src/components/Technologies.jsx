import { motion, useMotionValue, transform, useInView } from "framer-motion";
import { useMemo, useRef, useState } from "react";
import Section from "./Section";
import {
    FaReact, FaNodeJs, FaPhp, FaJava, FaHtml5, FaCss3Alt,
    FaGitAlt, FaGithub, FaNpm, FaWordpress, FaLaravel, FaDocker
} from "react-icons/fa";
import {
    SiJavascript, SiTailwindcss, SiSpring, SiMysql,
    SiPostman, SiIntellijidea, SiApache, SiPostgresql, SiFirebase,
    SiRedux, SiTypescript, SiVite, SiFramer, SiOpenai, SiMui, SiGooglegemini,
    SiClaude
} from "react-icons/si";
import { BiLogoVisualStudio } from "react-icons/bi";

// Tecnologías con sus iconos, colores y experiencia
const technologies = [
    { name: "HTML5", icon: FaHtml5, color: "#fff", bg: "#E34F26", experience: "Más de 5 años creando estructuras web semánticas y accesibles." },
    { name: "CSS3", icon: FaCss3Alt, color: "#fff", bg: "#1572B6", experience: "Experto en diseño responsive, animaciones y Grid/Flexbox." },
    { name: "Tailwind", icon: SiTailwindcss, color: "#fff", bg: "#06B6D4", experience: "Framework CSS favorito para desarrollo rápido y consistente." },
    { name: "JavaScript", icon: SiJavascript, color: "#000", bg: "#F7DF1E", experience: "Lenguaje principal con dominio de ES6+, async/await y APIs modernas." },
    { name: "TypeScript", icon: SiTypescript, color: "#fff", bg: "#3178C6", experience: "Experiencia en proyectos escalables con tipado estático." },
    { name: "Java", icon: FaJava, color: "#fff", bg: "#007396", experience: "Desarrollo backend con Spring Boot y arquitecturas empresariales." },
    { name: "PHP", icon: FaPhp, color: "#fff", bg: "#777BB4", experience: "Desarrollo web dinámico y APIs RESTful." },
    { name: "MySQL", icon: SiMysql, color: "#fff", bg: "#4479A1", experience: "Diseño de bases de datos relacionales y optimización de queries." },
    { name: "PostgreSQL", icon: SiPostgresql, color: "#fff", bg: "#4169E1", experience: "Base de datos avanzada con experiencia en funciones y triggers." },
    { name: "Git", icon: FaGitAlt, color: "#fff", bg: "#F05032", experience: "Control de versiones con flujos de trabajo colaborativos." },
    { name: "GitHub", icon: FaGithub, color: "#000", bg: "#ffffff", experience: "Gestión de repositorios, CI/CD y colaboración en equipo." },
    { name: "Apache", icon: SiApache, color: "#fff", bg: "#D22128", experience: "Configuración de servidores web y virtual hosts." },
    { name: "Spring", icon: SiSpring, color: "#fff", bg: "#6DB33F", experience: "Framework Java para desarrollo de aplicaciones empresariales." },
    { name: "WordPress", icon: FaWordpress, color: "#fff", bg: "#21759B", experience: "Desarrollo de temas personalizados y plugins." },
    { name: "React", icon: FaReact, color: "#000", bg: "#61DAFB", experience: "Librería principal para desarrollo frontend con hooks y context." },
    { name: "Redux", icon: SiRedux, color: "#fff", bg: "#764ABC", experience: "Gestión de estado global en aplicaciones complejas." },
    { name: "Laravel", icon: FaLaravel, color: "#fff", bg: "#FF2D20", experience: "Framework PHP para desarrollo backend robusto y elegante." },
    { name: "Vite", icon: SiVite, color: "#000", bg: "#646CFF", experience: "Build tool moderno para desarrollo web ultrarápido." },
    { name: "npm", icon: FaNpm, color: "#fff", bg: "#CB3837", experience: "Gestión de dependencias y scripts en proyectos JavaScript." },
    { name: "Docker", icon: FaDocker, color: "#fff", bg: "#2496ED", experience: "Containerización de aplicaciones para desarrollo y producción." },
    { name: "Postman", icon: SiPostman, color: "#fff", bg: "#FF6C37", experience: "Testing y documentación de APIs RESTful." },
    { name: "VS Code", icon: BiLogoVisualStudio, color: "#fff", bg: "#007ACC", experience: "Editor principal con extensiones personalizadas." },
    { name: "IntelliJ", icon: SiIntellijidea, color: "#fff", bg: "#0071C5", experience: "IDE para desarrollo Java y Spring Boot." },
    { name: "Framer Motion", icon: SiFramer, color: "#000", bg: "#FF0055", experience: "Animaciones fluidas y interacciones en React." },
    { name: "Firebase", icon: SiFirebase, color: "#000", bg: "#FFCA28", experience: "Backend as a Service para autenticación y base de datos en tiempo real." },
    { name: "Claude", icon: SiClaude, color: "#cf7336", bg: "#c6b0a2", experience: "Asistente IA para desarrollo, debugging y aprendizaje." },
    { name: "ChatGPT", icon: SiOpenai, color: "#fff", bg: "#10A37F", experience: "IA conversacional para resolver problemas técnicos." },
    { name: "Gemini", icon: SiGooglegemini, color: "#fff", bg: "#8E75B2", experience: "IA de Google para análisis y generación de código." },
    { name: "Material UI", icon: SiMui, color: "#fff", bg: "#007FFF", experience: "Componentes React con diseño Material Design." },
];

// Configuración
const icon = { margin: 12, size: 60 };
const device = { width: 220, height: 268 };

// Hook para transformar los iconos
function useIconTransform({ x, y, scale, planeX, planeY, xOffset, yOffset }) {
    const xScale = useRef(1);
    const yScale = useRef(1);

    const createScreenRange = (axis) => [
        -60,
        80,
        device[axis] - (icon.size + icon.margin) / 2 - 80,
        device[axis] - (icon.size + icon.margin) / 2 + 60
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
    }, [planeX, scale, x, xOffset]);

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
    }, [planeY, scale, y, yOffset]);
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

    const ref = useRef(null);
    const isInView = useInView(ref, { once: false, margin: "-100px" });

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
                        animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
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
                        animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
                        transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
                    >
                        Herramientas
                    </motion.span>
                </motion.h2>

                <motion.p
                    className="text-gray-400 mb-8 text-center"
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8, delay: 0.2 }}
                >
                    Arrastra y selecciona para saber más
                </motion.p>

                {/* Dock */}
                <div className="flex justify-center">
                    <div
                        style={{
                            width: device.width,
                            height: device.height,
                            overflow: "hidden",
                            background: "black",
                            borderRadius: "50px",
                            position: "relative",
                            border: "2px solid #333",
                        }}
                    >
                        <motion.div
                            drag
                            dragConstraints={{ left: -390, right: 30, top: -360, bottom: 30 }}
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

                {/* Modal */}
                {selectedTech && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 20 }}
                        className="mt-8 px-4 max-w-2xl mx-auto"
                    >
                        <div
                            className="p-6 rounded-2xl border-2 relative"
                            style={{
                                background: `linear-gradient(135deg, ${selectedTech.bg}20, ${selectedTech.bg}05)`,
                                borderColor: selectedTech.bg,
                            }}
                        >
                            <button
                                onClick={closeModal}
                                className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
                            >
                                ✕
                            </button>

                            <div className="flex items-center gap-4 mb-4">
                                <div
                                    className="w-16 h-16 rounded-full flex items-center justify-center"
                                    style={{ background: selectedTech.bg }}
                                >
                                    <selectedTech.icon
                                        style={{ fontSize: "32px", color: selectedTech.color }}
                                    />
                                </div>
                                <h3 className="text-3xl font-bold text-white">{selectedTech.name}</h3>
                            </div>

                            <p className="text-gray-300 text-lg leading-relaxed">
                                {selectedTech.experience}
                            </p>
                        </div>
                    </motion.div>
                )}
            </div>
        </Section>
    );
}