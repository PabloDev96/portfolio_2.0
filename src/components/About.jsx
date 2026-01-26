import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import macbook from "../assets/macbook.png";
import yo from "../assets/yo.png";
import Section from "./Section";

const About = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: false, margin: "-100px" });
    const codeScrollRef = useRef(null);


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

    const [typed, setTyped] = useState("");
    const [showFinal, setShowFinal] = useState(false);

    const codeText = `import pablo from "/assets/pablo.png";

export default function AboutMe() {
  return (
    <div className="about">
      <p className="role">
        Desarrollador Web Full Stack
      </p>

      <p className="goal">
        Buscando mi primera oportunidad
      </p>
    </div>
  );
}`;

    // Velocidad de escritura (ms por caracter)
    const typingSpeed = 18;
    // Pausa al terminar antes de mostrar el “final”
    const endDelay = 600;

    useEffect(() => {
        // Reinicia si vuelve a entrar en vista (o si quieres solo una vez, cambia lógica)
        if (!isInView) return;

        let i = 0;
        setTyped("");
        setShowFinal(false);

        const interval = setInterval(() => {
            i += 1;
            setTyped(codeText.slice(0, i));

            if (i >= codeText.length) {
                clearInterval(interval);
                setTimeout(() => setShowFinal(true), endDelay);
            }
        }, typingSpeed);

        return () => clearInterval(interval);
    }, [isInView]);

    useEffect(() => {
        if (!codeScrollRef.current) return;
        codeScrollRef.current.scrollTop = codeScrollRef.current.scrollHeight;
    }, [typed]);

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
                        <motion.div
                            className="relative mx-auto max-w-md scale-100 lg:scale-135"
                            whileHover={{ scale: 1.03 }}
                        >
                            {/* Halo */}
                            <div
                                className="absolute inset-0 blur-2xl opacity-40 -z-10"
                                style={{
                                    backgroundImage: "linear-gradient(90deg, var(--primary), var(--accent))",
                                }}
                            />

                            {/* MacBook */}
                            <img src={macbook} alt="MacBook" className="w-full h-auto" />

                            {/* Pantalla (área donde va el contenido) */}
                            <div
                                className="
      absolute
      top-[12%]
      left-[14%]
      w-[72%]
      h-[68%]
      rounded-lg
      overflow-hidden
    "
                            >
                                <AnimatePresence mode="wait">
                                    {!showFinal ? (
                                        <motion.div
                                            key="typing"
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            exit={{ opacity: 0 }}
                                            className="w-full h-full bg-slate-950/90"
                                        >
                                            {/* “Editor” */}
                                            <div className="h-7 w-full bg-slate-900/80 flex items-center gap-2 px-3">
                                                <span className="w-2.5 h-2.5 rounded-full bg-red-400" />
                                                <span className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
                                                <span className="w-2.5 h-2.5 rounded-full bg-green-400" />
                                                <span className="ml-2 text-[10px] text-slate-300 font-medium">
                                                    AboutMe.jsx
                                                </span>
                                            </div>

                                            {/* Área scrolleable */}
                                            <div
                                                ref={codeScrollRef}
                                                className="h-[calc(100%-28px)] overflow-y-auto no-scrollbar"
                                            >

                                                <pre className="p-3 text-[10px] leading-relaxed text-slate-200 font-mono whitespace-pre-wrap">
                                                    {typed}
                                                    <span className="inline-block w-[7px] translate-y-[1px] bg-slate-200 ml-1 animate-pulse">
                                                        &nbsp;
                                                    </span>
                                                </pre>
                                            </div>
                                        </motion.div>
                                    ) : (
                                        <motion.div
                                            key="final"
                                            initial={{ opacity: 0, y: 6 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0 }}
                                            className="w-full h-full bg-slate-950/70 flex flex-col items-center justify-center text-center px-4"
                                        >
                                            <img
                                                src={yo}
                                                alt="Foto de Pablo Díaz"
                                                className="w-20 h-20 rounded-full object-cover mb-3 border-2"
                                                style={{ borderColor: "var(--primary)" }}
                                            />

                                            <p className="text-white text-xs leading-tight">
                                                Desarrollador Web{" "}
                                                <span style={{ color: "var(--primary)" }}>
                                                    Full Stack
                                                </span>
                                            </p>

                                            <p className="text-slate-300 text-[10px] mt-2">
                                                Buscando mi primera oportunidad
                                            </p>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
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
                            Soy desarrollador web Full Stack, con muchas ganas y motivación de seguir aprendiendo y creciendo profesionalmente. Me gusta crear aplicaciones web modernas centradas en resolver problemas reales y ofrecer una buena experiencia al usuario.
                        </motion.p>

                        <motion.p
                            className="text-gray-300 text-lg mb-8 leading-relaxed text-justify"
                            initial={{ opacity: 0, y: 20 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.8, delay: 0.3 }}
                        >
                            Actualmente trabajo principalmente en el desarrollo de SPA con React y Firebase, incluyendo un proyecto real para un negocio local. También he creado proyectos utilizando Spring Boot + React, además de trabajar con WordPress y PHP nativo, lo que me ha permitido conocer distintos enfoques y tecnologías.
                        </motion.p>

                        <motion.p
                            className="text-gray-300 text-lg mb-8 leading-relaxed text-justify"
                            initial={{ opacity: 0, y: 20 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.8, delay: 0.3 }}
                        >
                            Me considero una persona proactiva, constante y trabajadora. En este momento me encuentro en búsqueda de mi primera oportunidad laboral como desarrollador web, donde pueda seguir formándome, aportar valor y crecer como profesional.
                        </motion.p>

                    </div>
                </div>
            </div>
        </Section>
    );
};

export default About;