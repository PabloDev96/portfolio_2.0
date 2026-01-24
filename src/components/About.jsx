import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import yo from "../assets/yo.png";
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
        <Section id="about" className="min-h-screen">
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
                            <div className="relative w-full h-full bg-slate-800 rounded-2xl overflow-hidden">
                                <img
                                    src={yo}
                                    alt="Foto de perfil de Pablo Díaz"
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        </motion.div>
                    </motion.div>

                    <div>
                        <motion.p
                            className="text-gray-300 text-lg mb-6 leading-relaxed text-justify"
                            initial={{ opacity: 0, y: 20 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.8, delay: 0.2 }}
                        >
                            Soy desarrollador web con enfoque FullStack y una fuerte motivación por seguir creciendo en este sector. Me apasiona crear soluciones funcionales y modernas que resuelvan problemas reales. Durante mi formación y experiencia práctica he trabajado con tecnologías como PHP, Java, MySQL, JavaScript y Tailwind, combinando conocimientos técnicos con una mentalidad proactiva y resolutiva. Actualmente me estoy especializando en frameworks como React y Spring Boot, con el objetivo de construir proyectos escalables y de alto impacto. Busco continuamente nuevos retos que me permitan aprender, aportar valor y evolucionar como profesional.
                        </motion.p>

                        <motion.p
                            className="text-gray-300 text-lg mb-8 leading-relaxed text-justify"
                            initial={{ opacity: 0, y: 20 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.8, delay: 0.3 }}
                        >
                            Con experiencia en desarrollo full-stack, me encanta resolver problemas
                            complejos y convertir ideas en realidad digital.
                        </motion.p>

                    </div>
                </div>
            </div>
        </Section>
    );
};

export default About;