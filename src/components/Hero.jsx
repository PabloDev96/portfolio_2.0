import { motion } from "framer-motion";
import { HiOutlineDocumentText } from "react-icons/hi";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { IoMdContact } from "react-icons/io";
import { FaLaptopCode } from "react-icons/fa6";
import { setParticlesAttractor } from "../utils/particlesAttractor";

const CV_URL = "/CV_PabloDíazGarcía.pdf";

const Hero = () => {
    const scrollToId = (id) => {
        const el = document.querySelector(id);
        if (el) {
            const navHeight = 80;
            const elementPosition = el.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - navHeight;

            window.scrollTo({
                top: offsetPosition,
                behavior: "smooth"
            });
        }
    };

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

    const socialLinks = [
        {
            name: "GitHub",
            icon: FaGithub,
            url: "https://github.com/PabloDev96"
        },
        {
            name: "LinkedIn",
            icon: FaLinkedin,
            url: "https://www.linkedin.com/in/pablo-d%C3%ADaz-garc%C3%ADa-344048350"
        },
    ];

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
                        className="text-xl md:text-2xl text-gray-300 mb-12"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                    >
                        Desarrollador Full Stack | Creador de Experiencias Digitales
                    </motion.p>

                    {/* Botones principales */}
                    <motion.div
                        className="flex gap-4 justify-center flex-wrap mb-12"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                    >
                        <motion.button
                            type="button"
                            onClick={() => scrollToId("#projects")}
                            className="inline-flex items-center gap-2 px-8 py-3 border-2 border-[var(--primary)] text-white rounded-full font-semibold text-lg hover:bg-[var(--primary-soft)] transition-colors"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            style={{ boxShadow: `0 14px 40px var(--primary-glow)` }}
                            onMouseEnter={(e) => attractToTarget(e, 1.45)}
                            onMouseLeave={stopAttractor}
                            onFocus={(e) => attractToTarget(e, 1.45)}
                            onBlur={stopAttractor}
                        >
                            <FaLaptopCode className="text-2xl" />
                            Ver Proyectos
                        </motion.button>

                        <motion.a
                            href={CV_URL}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 px-8 py-3 border-2 border-[var(--primary)] text-white rounded-full font-semibold text-lg hover:bg-[var(--primary-soft)] transition-colors"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            style={{ boxShadow: `0 14px 40px var(--primary-glow)` }}
                            onMouseEnter={(e) => attractToTarget(e, 1.35)}
                            onMouseLeave={stopAttractor}
                            onFocus={(e) => attractToTarget(e, 1.35)}
                            onBlur={stopAttractor}
                        >
                            <HiOutlineDocumentText className="text-2xl" />
                            Ver CV
                        </motion.a>

                        <motion.button
                            type="button"
                            onClick={() => scrollToId("#contact")}
                            className="inline-flex items-center gap-2 px-8 py-3 border-2 border-[var(--primary)] text-white rounded-full font-semibold text-lg hover:bg-[var(--primary-soft)] transition-colors"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            style={{ boxShadow: `0 14px 40px var(--primary-glow)` }}
                            onMouseEnter={(e) => attractToTarget(e, 1.35)}
                            onMouseLeave={stopAttractor}
                            onFocus={(e) => attractToTarget(e, 1.35)}
                            onBlur={stopAttractor}
                        >
                            <IoMdContact className="text-2xl" />
                            Contactar
                        </motion.button>
                    </motion.div>

                    {/* Redes sociales */}
                    <motion.div
                        className="flex gap-4 justify-center items-center flex-wrap"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.6 }}
                    >
                        {socialLinks.map((social, index) => {
                            const Icon = social.icon;
                            return (
                                <motion.a
                                    key={social.name}
                                    href={social.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-12 h-12 border-2 border-[var(--primary)] bg-transparent text-white flex items-center justify-center text-xl backdrop-blur-md hover:bg-[var(--primary-soft)] transition-colors"
                                    initial={{ opacity: 0, y: 20, borderRadius: "9999px" }}
                                    animate={{ opacity: 1, y: 0 }}
                                    whileHover={{ 
                                        scale: 1.08, 
                                        y: -2,
                                        borderRadius: "16px"
                                    }}
                                    whileTap={{ scale: 0.96 }}
                                    style={{ boxShadow: `0 14px 40px var(--primary-glow)` }}
                                    transition={{ 
                                        opacity: { duration: 0.5, delay: 0.7 + index * 0.1 },
                                        y: { duration: 0.5, delay: 0.7 + index * 0.1 },
                                        scale: { duration: 0.15, ease: "easeInOut" },
                                        borderRadius: { duration: 0.15, ease: "easeInOut" }
                                    }}
                                    aria-label={social.name}
                                    title={social.name}
                                    onMouseEnter={(e) => attractToTarget(e, 1.25)}
                                    onMouseLeave={stopAttractor}
                                    onFocus={(e) => attractToTarget(e, 1.25)}
                                    onBlur={stopAttractor}
                                >
                                    <Icon className="text-2xl" />
                                </motion.a>
                            );
                        })}
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default Hero;