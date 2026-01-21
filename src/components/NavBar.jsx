import { motion, useScroll, useTransform } from "framer-motion";
import { useState, useEffect } from "react";
import { HiArrowUp, HiOutlineDocumentText } from "react-icons/hi";

const CV_URL = "/CV_PabloDíazGarcía.pdf"; // pon tu archivo en /public/cv.pdf

const NavBar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const { scrollY } = useScroll();

    const backgroundColor = useTransform(
        scrollY,
        [0, 100],
        ["rgba(15, 23, 42, 0)", "rgba(15, 23, 42, 0.95)"]
    );

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 50);
        window.addEventListener("scroll", handleScroll);
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
        open: { y: 0, opacity: 1, transition: { y: { stiffness: 1000, velocity: -100 } } },
        closed: { y: 50, opacity: 0, transition: { y: { stiffness: 1000 } } },
    };

    const listVariants = {
        open: { transition: { staggerChildren: 0.07, delayChildren: 0.2 } },
        closed: { transition: { staggerChildren: 0.05, staggerDirection: -1 } },
    };

    // Scroll suave al top/hero
    const goHome = (e) => {
        e.preventDefault();
        setIsOpen(false);
        const el = document.querySelector("#home");
        if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
        else window.scrollTo({ top: 0, behavior: "smooth" });
    };

    return (
        <motion.nav
            style={{ backgroundColor }}
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "backdrop-blur-md shadow-lg" : ""
                }`}
        >
            <div className="container mx-auto px-6 py-4">
                <div className="flex items-center justify-between">
                    {/* Botón "volver arriba" (reemplaza logo) */}
                    <motion.a
                        href="#home"
                        onClick={goHome}
                        aria-label="Volver arriba"
                        className="w-11 h-11 rounded-full border border-white/15 bg-white/5 text-white flex items-center justify-center backdrop-blur-md"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5 }}
                        whileHover={{ scale: 1.06, y: -1 }}
                        whileTap={{ scale: 0.98 }}
                        title="Volver arriba"
                    >
                        <HiArrowUp className="text-xl" />
                    </motion.a>

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
                                >
                                    {item.name}
                                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-purple-500 group-hover:w-full transition-all duration-300" />
                                </motion.a>
                            </motion.li>
                        ))}

                        <motion.li whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                            <a
                                href={CV_URL}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 px-6 py-2 bg-purple-600 text-white rounded-full font-semibold hover:bg-purple-700 transition-colors"
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
                            {/* Flecha arriba también en el menú móvil */}
                            <motion.li variants={itemVariants}>
                                <motion.a
                                    href="#home"
                                    onClick={goHome}
                                    className="w-14 h-14 rounded-full border border-white/15 bg-white/5 text-white flex items-center justify-center"
                                    whileHover={{ scale: 1.06 }}
                                    whileTap={{ scale: 0.98 }}
                                    aria-label="Volver arriba"
                                >
                                    <span className="text-2xl">↑</span>
                                </motion.a>
                            </motion.li>

                            {navItems.map((item) => (
                                <motion.li
                                    key={item.name}
                                    variants={itemVariants}
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    <a
                                        href={item.href}
                                        className="text-3xl text-white font-bold hover:text-purple-400 transition-colors"
                                        onClick={() => setIsOpen(false)}
                                    >
                                        {item.name}
                                    </a>
                                </motion.li>
                            ))}

                            <motion.li variants={itemVariants}>
                                <a
                                    href={CV_URL}
                                    download
                                    onClick={() => setIsOpen(false)}
                                    className="inline-flex items-center px-8 py-3 bg-purple-600 text-white rounded-full font-semibold text-xl"
                                >
                                    Descargar CV
                                </a>
                            </motion.li>
                        </motion.ul>
                    </motion.div>
                </div>
            </div>
        </motion.nav>
    );
};

export default NavBar;