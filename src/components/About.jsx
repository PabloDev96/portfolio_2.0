import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Section from "./Section";

const About = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: false, margin: "-100px" });

    const skills = [
        { name: "React", level: 90 },
        { name: "JavaScript", level: 85 },
        { name: "Node.js", level: 80 },
        { name: "CSS/Tailwind", level: 88 },
        { name: "MongoDB", level: 75 },
        { name: "Git", level: 82 },
    ];

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
    };

    const itemVariants = {
        hidden: { opacity: 0, x: -50 },
        visible: { opacity: 1, x: 0, transition: { duration: 0.5 } },
    };

    return (
        <Section id="about" className="min-h-screen bg-slate-900">
            <div ref={ref} className="container mx-auto max-w-6xl">
                <motion.h2
                    className="text-5xl font-bold text-white text-center mb-16"
                    initial={{ opacity: 0, y: -50 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                >
                    Sobre{" "}
                    <motion.span
                        className="bg-clip-text text-transparent"
                        style={{
                            backgroundImage: "linear-gradient(90deg, var(--primary), var(--accent))",
                            backgroundSize: "200% 200%",
                        }}
                        animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
                        transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
                    >
                        Mí
                    </motion.span>
                </motion.h2>

                <div className="grid md:grid-cols-2 gap-12 items-center">
                    <motion.div
                        initial={{ opacity: 0, x: -100 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.8 }}
                    >
                        <motion.div className="relative w-80 h-80 mx-auto" whileHover={{ scale: 1.05 }}>
                            {/* Halo dinámico */}
                            <div
                                className="absolute inset-0 rounded-2xl blur-xl opacity-50"
                                style={{
                                    backgroundImage:
                                        "linear-gradient(90deg, var(--primary), var(--accent))",
                                }}
                            />
                            <div className="relative w-full h-full bg-slate-800 rounded-2xl flex items-center justify-center text-white text-6xl">
                                👨‍💻
                            </div>
                        </motion.div>
                    </motion.div>

                    <div>
                        <motion.p
                            className="text-gray-300 text-lg mb-6 leading-relaxed"
                            initial={{ opacity: 0, y: 20 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.8, delay: 0.2 }}
                        >
                            Soy un desarrollador apasionado por crear experiencias web increíbles.
                            Me especializo en desarrollar aplicaciones modernas, responsivas y
                            accesibles utilizando las últimas tecnologías.
                        </motion.p>

                        <motion.p
                            className="text-gray-300 text-lg mb-8 leading-relaxed"
                            initial={{ opacity: 0, y: 20 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.8, delay: 0.3 }}
                        >
                            Con experiencia en desarrollo full-stack, me encanta resolver problemas
                            complejos y convertir ideas en realidad digital.
                        </motion.p>

                        <motion.div
                            variants={containerVariants}
                            initial="hidden"
                            animate={isInView ? "visible" : "hidden"}
                        >
                            <h3 className="text-2xl font-bold text-white mb-6">Habilidades</h3>

                            {skills.map((skill, index) => (
                                <motion.div key={skill.name} variants={itemVariants} className="mb-4">
                                    <div className="flex justify-between mb-2">
                                        <span className="text-gray-300 font-semibold">{skill.name}</span>
                                        <span className="text-[var(--primary)]">{skill.level}%</span>
                                    </div>

                                    <div className="w-full bg-slate-700 rounded-full h-3 overflow-hidden">
                                        <motion.div
                                            className="h-full"
                                            style={{
                                                backgroundImage:
                                                    "linear-gradient(90deg, var(--primary), var(--accent))",
                                            }}
                                            initial={{ width: 0 }}
                                            animate={isInView ? { width: `${skill.level}%` } : { width: 0 }}
                                            transition={{ duration: 1, delay: index * 0.1 + 0.5 }}
                                        />
                                    </div>
                                </motion.div>
                            ))}
                        </motion.div>
                    </div>
                </div>
            </div>
        </Section>
    );
};

export default About;