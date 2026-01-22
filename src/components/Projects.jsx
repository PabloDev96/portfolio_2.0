import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import Section from "./Section";

const Projects = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: false, margin: "-100px" });
    const [hoveredIndex, setHoveredIndex] = useState(null);

    const projects = [
        {
            title: "iSat",
            description:
                "Aplicación interna para la gestión de un servicio técnico de reparaciones. Permite administrar reparaciones, clientes, stock, tickets, proformas, facturas e informes.",
            technologies: ["React", "Firebase"],
            color: "from-blue-500 to-cyan-500",
            link: "https://isat-demo.web.app/",
        },
        {
            title: "PawShelt",
            description:
                "App para la gestión interna de un refugio de animales. Permite llevar un control eficiente de animales, adopciones, citas y estadísticas con sistema de roles implementado.",
            technologies: ["React", "Spring", "PostgreSQL"],
            color: "from-purple-500 to-pink-500",
            link: "https://paw-shelt-frontend.vercel.app/",
        },
        {
            title: "Gestor de Tareas - Taskly",
            description:
                "Proyecto grupal donde desarrollé el backend (APIs para usuarios, proyectos y tareas) e integré con el frontend. La app permite crear y gestionar proyectos y tareas con vista Kanban (drag and drop), login, registro y control de accesos por roles.",
            technologies: ["php", "JavaScript", "Tailwind", "MySQL"],
            color: "from-purple-500 to-pink-500",
            link: "https://coral-mule-348004.hostingersite.com/",
        },
        {
            title: "ButtonPressGaming",
            description:
                "Página Web de noticias gaming creada mediante Wordpress usando Elementor y optimizada con Yoast SEO.",
            technologies: ["php", "JavaScript", "Tailwind", "MySQL"],
            color: "from-purple-500 to-pink-500",
            link: "https://buttonpressgaming.es/",
        },
    ];

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { staggerChildren: 0.15 } },
    };

    const cardVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
    };

    const openProject = (url) => {
        if (!url) return;
        window.open(url, "_blank", "noopener,noreferrer");
    };

    const openAllProjects = () => {
        window.open("https://github.com/tuusuario", "_blank", "noopener,noreferrer");
    };

    return (
        <Section id="projects" className="bg-slate-900">
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
                            backgroundImage: "linear-gradient(90deg, var(--primary), var(--accent))",
                            backgroundSize: "200% 200%",
                        }}
                        animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
                        transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
                    >
                        Proyectos
                    </motion.span>
                </motion.h2>
                <motion.div
                    className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
                    variants={containerVariants}
                    initial="hidden"
                    animate={isInView ? "visible" : "hidden"}
                >
                    {projects.map((project, index) => (
                        <motion.div
                            key={index}
                            variants={cardVariants}
                            whileHover={{ y: -10 }}
                            onHoverStart={() => setHoveredIndex(index)}
                            onHoverEnd={() => setHoveredIndex(null)}
                            className="relative group"
                        >
                            <motion.div
                                className="bg-slate-900 rounded-2xl p-6 h-full border border-slate-700 overflow-hidden relative"
                                animate={{
                                    borderColor:
                                        hoveredIndex === index ? "var(--primary)" : "#334155",
                                }}
                            >
                                <motion.div
                                    className={`absolute inset-0 bg-gradient-to-br ${project.color} opacity-0`}
                                    animate={{ opacity: hoveredIndex === index ? 0.1 : 0 }}
                                    transition={{ duration: 0.3 }}
                                />

                                <div className="relative z-10">
                                    <div
                                        className={`w-16 h-16 mb-4 bg-gradient-to-br ${project.color} rounded-xl flex items-center justify-center text-white text-2xl`}
                                    >
                                        💼
                                    </div>

                                    <h3 className="text-2xl font-bold text-white mb-3">
                                        {project.title}
                                    </h3>

                                    <p className="text-gray-400 mb-4 leading-relaxed">
                                        {project.description}
                                    </p>

                                    <div className="flex flex-wrap gap-2 mb-4">
                                        {project.technologies.map((tech, i) => (
                                            <motion.span
                                                key={i}
                                                className="px-3 py-1 bg-slate-800 border border-slate-600 text-[var(--primary)] text-sm rounded-full"
                                                whileHover={{ scale: 1.05 }}
                                            >
                                                {tech}
                                            </motion.span>
                                        ))}
                                    </div>

                                    <motion.button
                                        type="button"
                                        onClick={() => openProject(project.link)}
                                        className="text-[var(--primary)] font-semibold flex items-center gap-2"
                                        whileHover={{ x: 5 }}
                                        aria-label={`Ver más sobre ${project.title}`}
                                    >
                                        Ver más
                                        <motion.span
                                            animate={{ x: hoveredIndex === index ? 5 : 0 }}
                                            transition={{ duration: 0.3 }}
                                        >
                                            →
                                        </motion.span>
                                    </motion.button>
                                </div>
                            </motion.div>
                        </motion.div>
                    ))}
                </motion.div>

                <motion.div
                    className="text-center mt-16"
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8, delay: 0.8 }}
                >
                    <motion.button
                        type="button"
                        onClick={openAllProjects}
                        className="px-8 py-3 bg-[var(--primary)] text-white rounded-full font-semibold hover:bg-[var(--primary-hover)] transition-colors"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        Ver Todos los Proyectos
                    </motion.button>
                </motion.div>
            </div>
        </Section>
    );
};

export default Projects;