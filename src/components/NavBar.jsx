import { motion, useScroll, useTransform } from "framer-motion";
import { useState, useEffect } from "react";
import { HiArrowUp, HiOutlineDocumentText } from "react-icons/hi";
import { GiPalette } from "react-icons/gi";
import { useTheme } from "../context/ThemeContext";
import { setParticlesAttractor } from "../utils/particlesAttractor";

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

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
            document.body.style.position = "fixed";
            document.body.style.width = "100%";
        } else {
            document.body.style.overflow = "";
            document.body.style.position = "";
            document.body.style.width = "";
        }
    }, [isOpen]);

    const navItems = [
        { name: "Inicio", href: "#home" },
        { name: "Sobre Mí", href: "#about" },
        { name: "Tecnologías", href: "#technologies" },
        { name: "Proyectos", href: "#projects" },
        { name: "Contacto", href: "#contact" },
    ];

    const menuVariants = {
        open: {
            clipPath: "circle(150vmax at calc(100% - 40px) 40px)",
            transition: { type: "spring", stiffness: 20, restDelta: 2 },
        },
        closed: {
            clipPath: "circle(0vmax at calc(100% - 40px) 40px)",
            transition: { delay: 0.1, type: "spring", stiffness: 400, damping: 40 },
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

    // Función para manejar la navegación
    const handleNavClick = (e, href) => {
        e.preventDefault();
        
        const targetId = href.replace('#', '');
        const targetElement = document.getElementById(targetId);
        
        // Primero cerramos el menú y restauramos el scroll
        setIsOpen(false);
        
        // Esperamos un poco para que se restaure el scroll del body
        setTimeout(() => {
            if (targetElement) {
                const navHeight = 80; // Altura aproximada del navbar
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - navHeight;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth"
                });
            } else {
                window.scrollTo({ top: 0, behavior: "smooth" });
            }
        }, 100);
    };

    const goHome = (e) => {
        e?.preventDefault?.();
        setIsOpen(false);
        
        setTimeout(() => {
            window.scrollTo({ top: 0, behavior: "smooth" });
        }, 100);
    };

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
                className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-300 ${
                    scrolled ? "backdrop-blur-md shadow-lg" : ""
                }`}
            >
                <div className="container mx-auto px-6 py-4">
                    <div className="flex items-center justify-between">
                        {/* Botón tema */}
                        <div className="relative">
                            <button
                                onClick={() => setOpenTheme(!openTheme)}
                                className="w-10 h-10 rounded-full border-2 border-[var(--primary)] bg-transparent text-white flex items-center justify-center hover:bg-[var(--primary-soft)] transition-colors backdrop-blur-md cursor-pointer"
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
                                    className="absolute top-12 left-0 rounded-xl bg-slate-900 border border-white/10 shadow-xl p-3 z-[110]"
                                >
                                    <button
                                        onClick={() => {
                                            setTheme("purple");
                                            setOpenTheme(false);
                                        }}
                                        className={`w-full px-3 py-2 rounded-lg flex items-center gap-3 hover:bg-white/5 transition-colors ${
                                            theme === "purple" ? "bg-white/5" : ""
                                        }`}
                                        onMouseEnter={(e) => attractToTarget(e, 1.15)}
                                        onMouseLeave={stopAttractor}
                                        aria-label="Paleta morada"
                                    >
                                        <motion.span
                                            className="w-5 h-5 rounded-full border border-white/15 bg-clip-padding"
                                            style={{
                                                backgroundImage: "linear-gradient(90deg, #7c3aed, #ec4899)",
                                                backgroundSize: "200% 200%",
                                            }}
                                            animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
                                            transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
                                        />
                                    </button>

                                    <button
                                        onClick={() => {
                                            setTheme("green");
                                            setOpenTheme(false);
                                        }}
                                        className={`w-full px-3 py-2 rounded-lg flex items-center gap-3 hover:bg-white/5 transition-colors ${
                                            theme === "green" ? "bg-white/5" : ""
                                        }`}
                                        onMouseEnter={(e) => attractToTarget(e, 1.15)}
                                        onMouseLeave={stopAttractor}
                                        aria-label="Paleta verde"
                                    >
                                        <motion.span
                                            className="w-5 h-5 rounded-full border border-white/15 bg-clip-padding"
                                            style={{
                                                backgroundImage: "linear-gradient(90deg, #16a34a, #18dbce)",
                                                backgroundSize: "200% 200%",
                                            }}
                                            animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
                                            transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
                                        />
                                    </button>

                                    <button
                                        onClick={() => {
                                            setTheme("blue");
                                            setOpenTheme(false);
                                        }}
                                        className={`w-full px-3 py-2 rounded-lg flex items-center gap-3 hover:bg-white/5 transition-colors ${
                                            theme === "blue" ? "bg-white/5" : ""
                                        }`}
                                        onMouseEnter={(e) => attractToTarget(e, 1.15)}
                                        onMouseLeave={stopAttractor}
                                        onFocus={(e) => attractToTarget(e, 1.15)}
                                        onBlur={stopAttractor}
                                        aria-label="Paleta azul"
                                    >
                                        <motion.span
                                            className="w-5 h-5 rounded-full border border-white/15"
                                            style={{
                                                backgroundImage: "linear-gradient(90deg, #3b82f6, #38bdf8)",
                                                backgroundSize: "200% 200%",
                                            }}
                                            animate={{
                                                backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                                            }}
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
                                        onClick={(e) => handleNavClick(e, item.href)}
                                        className="text-gray-300 hover:text-white transition-colors font-medium relative group cursor-pointer"
                                        whileHover={{ scale: 1.05 }}
                                        onMouseEnter={(e) => attractToTarget(e, 1.1)}
                                        onMouseLeave={stopAttractor}
                                    >
                                        {item.name}
                                        <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[var(--primary)] group-hover:w-full transition-all duration-300" />
                                    </motion.a>
                                </motion.li>
                            ))}
                        </motion.ul>

                        {/* Mobile Menu Button */}
                        <motion.button
                            className="md:hidden z-[120] relative w-10 h-10 flex items-center justify-center"
                            onClick={() => setIsOpen(!isOpen)}
                            whileTap={{ scale: 0.9 }}
                            aria-label="Abrir menú"
                            onMouseEnter={(e) => attractToTarget(e, 1.2)}
                            onMouseLeave={stopAttractor}
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
                    </div>
                </div>
            </motion.nav>

            {/* Mobile Menu */}
            <motion.div
                className="fixed inset-0 bg-slate-900 md:hidden z-[110]"
                initial={false}
                animate={isOpen ? "open" : "closed"}
                variants={menuVariants}
                style={{ pointerEvents: isOpen ? "auto" : "none" }}
            >
                <motion.ul
                    className="min-h-screen flex flex-col items-center justify-center gap-8 px-6 py-20"
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
                                onClick={(e) => handleNavClick(e, item.href)}
                                className="text-3xl text-white font-bold hover:text-[var(--primary)] transition-colors cursor-pointer"
                                onMouseEnter={(e) => attractToTarget(e, 1.15)}
                                onMouseLeave={stopAttractor}
                            >
                                {item.name}
                            </a>
                        </motion.li>
                    ))}
                </motion.ul>
            </motion.div>

            {/* Botón flotante scroll to top */}
            <motion.button
                type="button"
                onClick={goHome}
                aria-label="Subir arriba"
                className="fixed bottom-6 right-6 z-[100] w-12 h-12 rounded-full bg-transparent border border-[var(--primary)] text-white flex items-center justify-center backdrop-blur-md transition-all duration-300 hover:bg-[var(--primary-soft)] cursor-pointer"
                style={{
                    pointerEvents: scrolled ? "auto" : "none", boxShadow: `0 14px 40px var(--primary-glow)`
                }}
                initial={{ opacity: 0, y: 12, scale: 0.95 }}
                animate={
                    scrolled
                        ? { opacity: 1, y: 0, scale: 1 }
                        : { opacity: 0, y: 12, scale: 0.95 }
                }
                transition={{ duration: 0.25, ease: "easeOut" }}
                whileHover={{
                    scale: 1.08,
                    y: -2,
                    boxShadow: "0 14px 40px var(--primary-glow)",
                }}
                whileTap={{ scale: 0.96 }}
                onMouseEnter={(e) => attractToTarget(e, 1.5)}
                onMouseLeave={stopAttractor}
            >
                <HiArrowUp className="text-xl" />
            </motion.button>
        </>
    );
};

export default NavBar;