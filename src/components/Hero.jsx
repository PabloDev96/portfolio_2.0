import { motion } from "framer-motion";
import { setParticlesAttractor } from "../utils/particlesAttractor";

const Hero = () => {
    const scrollToId = (id) => {
        const el = document.querySelector(id);
        if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    };

    // ==== Partículas: helpers hover ====
    const attractToTarget = (e, strength = 1.35) => {
        const r = e.currentTarget.getBoundingClientRect();
        setParticlesAttractor({
            x: r.left + r.width / 2,
            y: r.top + r.height / 2,
            active: true,
            strength,
        });
    };

    const stopAttractor = () => setParticlesAttractor({ active: false });

    return (
        <section id="home" className="min-h-screen flex items-center justify-center relative">
            <div className="container mx-auto px-6 relative z-10">
                <div className="max-w-4xl mx-auto text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <motion.h1
                            className="text-6xl md:text-8xl font-bold text-white mb-6"
                            initial={{ opacity: 0, scale: 0.5 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.5 }}
                        >
                            Hola, soy{" "}
                            <motion.span
                                className="bg-clip-text text-transparent"
                                style={{
                                    backgroundImage:
                                        "linear-gradient(90deg, var(--primary), var(--accent))",
                                    backgroundSize: "200% 200%",
                                }}
                                animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
                                transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
                            >
                                Pablo Díaz
                            </motion.span>
                        </motion.h1>
                    </motion.div>

                    <motion.p
                        className="text-xl md:text-2xl text-gray-300 mb-8"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                    >
                        Desarrollador Full Stack | Creador de Experiencias Digitales
                    </motion.p>

                    <motion.div
                        className="flex gap-4 justify-center flex-wrap"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                    >
                        <motion.button
                            type="button"
                            onClick={() => scrollToId("#about")}
                            className="
                                    inline-flex items-center gap-2
                                    px-6 py-2
                                    rounded-full
                                    border-2 border-[var(--primary)]
                                    text-white font-semibold
                                    hover:bg-[var(--primary-soft)]
                                    transition-colors
                                "
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            style={{ boxShadow: `0 14px 40px var(--primary-glow)` }}
                            onMouseEnter={(e) => attractToTarget(e, 1.45)}
                            onMouseLeave={stopAttractor}
                            onFocus={(e) => attractToTarget(e, 1.45)}
                            onBlur={stopAttractor}
                        >
                            Sobre Mí
                        </motion.button>
                        
                        <motion.button
                            type="button"
                            onClick={() => scrollToId("#projects")}
                            className="
                                    inline-flex items-center gap-2
                                    px-6 py-2
                                    rounded-full
                                    border-2 border-[var(--primary)]
                                    text-white font-semibold
                                    hover:bg-[var(--primary-soft)]
                                    transition-colors
                                "
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            style={{ boxShadow: `0 14px 40px var(--primary-glow)` }}
                            onMouseEnter={(e) => attractToTarget(e, 1.45)}
                            onMouseLeave={stopAttractor}
                            onFocus={(e) => attractToTarget(e, 1.45)}
                            onBlur={stopAttractor}
                        >
                            Ver Proyectos
                        </motion.button>

                        <motion.button
                            type="button"
                            onClick={() => scrollToId("#contact")}
                            className="px-8 py-2 border-2 border-[var(--primary)] text-white rounded-full font-semibold hover:bg-[var(--primary-soft)] transition-colors"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            style={{ boxShadow: `0 14px 40px var(--primary-glow)` }}
                            onMouseEnter={(e) => attractToTarget(e, 1.35)}
                            onMouseLeave={stopAttractor}
                            onFocus={(e) => attractToTarget(e, 1.35)}
                            onBlur={stopAttractor}
                        >
                            Contactar
                        </motion.button>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default Hero;