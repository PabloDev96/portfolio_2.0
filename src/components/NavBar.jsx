import { motion, useScroll, useTransform } from "framer-motion";
import { useState, useEffect } from "react";
import { HiArrowUp, HiOutlineDocumentText } from "react-icons/hi";
import { HiCog } from "react-icons/hi";
import { useTheme } from "../context/ThemeContext";
import { setParticlesAttractor } from "../utils/particlesAttractor";
import { GiPalette } from "react-icons/gi";
import { FaPalette } from "react-icons/fa";

const CV_URL = "/CV_PabloDíazGarcía.pdf";

const NavBar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const { scrollY } = useScroll();
    const { theme, setTheme } = useTheme();
    const [openTheme, setOpenTheme] = useState(false);

    const backgroundColor = useTransform(
        scrollY,
        [0, 100],
        ["rgba(15, 23, 42, 0)", "rgba(15, 23, 42, 0.95)"]
    );

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 50);
        window.addEventListener("scroll", handleScroll, { passive: true });
        handleScroll();
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const navItems = [
        { name: "Inicio", href: "#home" },
        { name: "Sobre Mí", href: "#about" },
        { name: "Proyectos", href: "#projects" },
        { name: "Contacto", href: "#contact" },
    ];

    const menuVariants = {
        open: {
            clipPath: "circle(1200px at calc(100% - 40px) 40px)",
            transition: { type: "spring", stiffness: 20, restDelta: 2 },
        },
        closed: {
            clipPath: "circle(0px at calc(100% - 40px) 40px)",
            transition: { delay: 0.2, type: "spring", stiffness: 400, damping: 40 },
        },
    };

    const itemVariants = {
        open: {
            y: 0,
            opacity: 1,
            transition: { y: { stiffness: 1000, velocity: -100 } },
        },
        closed: { y: 50, opacity: 0, transition: { y: { stiffness: 1000 } } },
    };

    const listVariants = {
        open: { transition: { staggerChildren: 0.07, delayChildren: 0.2 } },
        closed: { transition: { staggerChildren: 0.05, staggerDirection: -1 } },
    };

    const goHome = (e) => {
        e?.preventDefault?.();
        setIsOpen(false);
        const el = document.querySelector("#home");
        if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
        else window.scrollTo({ top: 0, behavior: "smooth" });
    };

    // ==== Partículas: helpers hover ====
    const attractToTarget = (e, strength = 1.25) => {
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
        <>
            <motion.nav
                style={{ backgroundColor }}
                className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "backdrop-blur-md shadow-lg" : ""
                    }`}
            >
                <div className="container mx-auto px-6 py-4">
                    <div className="flex items-center justify-between">
                        {/* Botón tema */}
                        <div className="relative">
                            <button
                                onClick={() => setOpenTheme(!openTheme)}
                                className="w-10 h-10 rounded-full border-2 border-[var(--primary)] bg-transparent text-white flex items-center justify-center hover:bg-[var(--primary-soft)] transition-colors backdrop-blur-md"
                                aria-label="Cambiar paleta"
                                onMouseEnter={(e) => attractToTarget(e, 1.2)}
                                onMouseLeave={stopAttractor}
                                onFocus={(e) => attractToTarget(e, 1.2)}
                                onBlur={stopAttractor}
                            >
                                <GiPalette className="text-lg" />
                            </button>

                            {openTheme && (
                                <motion.div
                                    initial={{ opacity: 0, y: -8 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0 }}
                                    className="absolute top-12 left-0 rounded-xl bg-slate-900 border border-white/10 shadow-xl p-3"
                                >

                                    {/* PURPLE */}
                                    <button
                                        onClick={() => {
                                            setTheme("purple");
                                            setOpenTheme(false);
                                        }}
                                        className={`w-full px-3 py-2 rounded-lg flex items-center gap-3 hover:bg-white/5 transition-colors ${theme === "purple" ? "bg-white/5" : ""
                                            }`}
                                        onMouseEnter={(e) => attractToTarget(e, 1.15)}
                                        onMouseLeave={stopAttractor}
                                        onFocus={(e) => attractToTarget(e, 1.15)}
                                        onBlur={stopAttractor}
                                        aria-label="Paleta morada"
                                    >
                                        <motion.span
                                            className="w-5 h-5 rounded-full border border-white/15 bg-clip-padding"
                                            style={{
                                                backgroundImage:
                                                    "linear-gradient(90deg, #7c3aed, #ec4899)",
                                                backgroundSize: "200% 200%",
                                            }}
                                            animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
                                            transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
                                        />
                                    </button>

                                    {/* GREEN */}
                                    <button
                                        onClick={() => {
                                            setTheme("green");
                                            setOpenTheme(false);
                                        }}
                                        className={`w-full px-3 py-2 rounded-lg flex items-center gap-3 hover:bg-white/5 transition-colors ${theme === "green" ? "bg-white/5" : ""
                                            }`}
                                        onMouseEnter={(e) => attractToTarget(e, 1.15)}
                                        onMouseLeave={stopAttractor}
                                        onFocus={(e) => attractToTarget(e, 1.15)}
                                        onBlur={stopAttractor}
                                        aria-label="Paleta verde"
                                    >
                                        <motion.span
                                            className="w-5 h-5 rounded-full border border-white/15 bg-clip-padding"
                                            style={{
                                                backgroundImage:
                                                    "linear-gradient(90deg, #16a34a, #18dbce)",
                                                backgroundSize: "200% 200%",
                                            }}
                                            animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
                                            transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
                                        />
                                    </button>
                                </motion.div>
                            )}
                        </div>

                        {/* Desktop Menu */}
                        <motion.ul
                            className="hidden md:flex items-center gap-8"
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                        >
                            {navItems.map((item, index) => (
                                <motion.li
                                    key={item.name}
                                    initial={{ opacity: 0, y: -20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5, delay: 0.1 * index }}
                                >
                                    <motion.a
                                        href={item.href}
                                        className="text-gray-300 hover:text-white transition-colors font-medium relative group"
                                        whileHover={{ scale: 1.05 }}
                                        onMouseEnter={(e) => attractToTarget(e, 1.1)}
                                        onMouseLeave={stopAttractor}
                                        onFocus={(e) => attractToTarget(e, 1.1)}
                                        onBlur={stopAttractor}
                                    >
                                        {item.name}
                                        <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[var(--primary)] group-hover:w-full transition-all duration-300" />
                                    </motion.a>
                                </motion.li>
                            ))}

                            <motion.li whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                                <a
                                    href={CV_URL}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="
                                    inline-flex items-center gap-2
                                    px-6 py-2
                                    rounded-full
                                    border-2 border-[var(--primary)]
                                    text-white font-semibold
                                    hover:bg-[var(--primary-soft)]
                                    transition-colors
                                "
                                    onMouseEnter={(e) => attractToTarget(e, 1.35)}
                                    onMouseLeave={stopAttractor}
                                    onFocus={(e) => attractToTarget(e, 1.35)}
                                    onBlur={stopAttractor}
                                >
                                    <HiOutlineDocumentText className="text-lg" />
                                    <span>Ver CV</span>
                                </a>
                            </motion.li>
                        </motion.ul>

                        {/* Mobile Menu Button */}
                        <motion.button
                            className="md:hidden z-50 relative w-10 h-10 flex items-center justify-center"
                            onClick={() => setIsOpen(!isOpen)}
                            whileTap={{ scale: 0.9 }}
                            aria-label="Abrir menú"
                            onMouseEnter={(e) => attractToTarget(e, 1.2)}
                            onMouseLeave={stopAttractor}
                            onFocus={(e) => attractToTarget(e, 1.2)}
                            onBlur={stopAttractor}
                        >
                            <div className="flex flex-col gap-1.5">
                                <motion.span
                                    className="w-6 h-0.5 bg-white"
                                    animate={isOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
                                />
                                <motion.span
                                    className="w-6 h-0.5 bg-white"
                                    animate={isOpen ? { opacity: 0 } : { opacity: 1 }}
                                />
                                <motion.span
                                    className="w-6 h-0.5 bg-white"
                                    animate={isOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }}
                                />
                            </div>
                        </motion.button>

                        {/* Mobile Menu */}
                        <motion.div
                            className="fixed inset-0 bg-slate-900 md:hidden"
                            initial={false}
                            animate={isOpen ? "open" : "closed"}
                            variants={menuVariants}
                        >
                            <motion.ul
                                className="flex flex-col items-center justify-center h-full gap-8"
                                variants={listVariants}
                            >
                                {navItems.map((item) => (
                                    <motion.li
                                        key={item.name}
                                        variants={itemVariants}
                                        whileHover={{ scale: 1.1 }}
                                        whileTap={{ scale: 0.95 }}
                                    >
                                        <a
                                            href={item.href}
                                            className="text-3xl text-white font-bold hover:text-[var(--primary)] transition-colors"
                                            onClick={() => setIsOpen(false)}
                                            onMouseEnter={(e) => attractToTarget(e, 1.15)}
                                            onMouseLeave={stopAttractor}
                                            onFocus={(e) => attractToTarget(e, 1.15)}
                                            onBlur={stopAttractor}
                                        >
                                            {item.name}
                                        </a>
                                    </motion.li>
                                ))}

                                <motion.li variants={itemVariants}>
                                    <a
                                        href={CV_URL}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        onClick={() => setIsOpen(false)}
                                        className="inline-flex items-center gap-3 px-8 py-3 bg-[var(--primary)] text-white rounded-full font-semibold text-xl hover:bg-[var(--primary-hover)] transition-colors"
                                        onMouseEnter={(e) => attractToTarget(e, 1.4)}
                                        onMouseLeave={stopAttractor}
                                        onFocus={(e) => attractToTarget(e, 1.4)}
                                        onBlur={stopAttractor}
                                    >
                                        <HiOutlineDocumentText className="text-2xl" />
                                        <span>Ver CV</span>
                                    </a>
                                </motion.li>
                            </motion.ul>
                        </motion.div>
                    </div>
                </div>
            </motion.nav>

            {/* Botón flotante (fuera del navbar) */}
            <motion.button
                type="button"
                onClick={goHome}
                aria-label="Subir arriba"
                className="fixed bottom-6 right-6 z-50 w-12 h-12 rounded-full bg-[var(--primary)] text-white shadow-lg flex items-center justify-center hover:bg-[var(--primary-hover)]"
                style={{
                    pointerEvents: scrolled ? "auto" : "none",
                    boxShadow: scrolled ? `0 14px 40px var(--primary-glow)` : undefined,
                }}
                initial={{ opacity: 0, y: 12, scale: 0.95 }}
                animate={
                    scrolled
                        ? { opacity: 1, y: 0, scale: 1 }
                        : { opacity: 0, y: 12, scale: 0.95 }
                }
                transition={{ duration: 0.2 }}
                whileHover={{ scale: 1.06 }}
                whileTap={{ scale: 0.95 }}
                onMouseEnter={(e) => attractToTarget(e, 1.5)}
                onMouseLeave={stopAttractor}
                onFocus={(e) => attractToTarget(e, 1.5)}
                onBlur={stopAttractor}
            >
                <HiArrowUp className="text-2xl" />
            </motion.button>
        </>
    );
};

export default NavBar;