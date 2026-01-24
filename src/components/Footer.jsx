import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { FaGithub, FaLinkedin, FaWhatsapp } from "react-icons/fa";
import {
    HiOutlineMail,
    HiOutlinePhone,
    HiOutlineDuplicate,
    HiOutlinePhoneOutgoing,
} from "react-icons/hi";
import { TbSend } from "react-icons/tb";
import { setParticlesAttractor } from "../utils/particlesAttractor";

const GITHUB_URL = "https://github.com/PabloDev96";
const LINKEDIN_URL =
    "https://www.linkedin.com/in/pablo-d%C3%ADaz-garc%C3%ADa-344048350";

const PHONE_NUMBER = "+34 659 103 719";
const PHONE_TEL = "+34659103719";
const EMAIL = "pablo.diazgar@gmail.com";

const WHATSAPP_URL = `https://wa.me/${PHONE_TEL.replace("+", "")}`;

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

function useOutsideClose(isOpen, onClose) {
    const ref = useRef(null);

    useEffect(() => {
        if (!isOpen) return;

        const onDown = (e) => {
            if (!ref.current) return;
            if (!ref.current.contains(e.target)) onClose();
        };

        window.addEventListener("mousedown", onDown);
        window.addEventListener("touchstart", onDown, { passive: true });

        return () => {
            window.removeEventListener("mousedown", onDown);
            window.removeEventListener("touchstart", onDown);
        };
    }, [isOpen, onClose]);

    return ref;
}

const PopoverButton = ({ label, icon, primaryHref, copyValue }) => {
    const [open, setOpen] = useState(false);
    const [isTouch, setIsTouch] = useState(false);
    const [copied, setCopied] = useState(false);

    const popRef = useOutsideClose(open, () => setOpen(false));

    useEffect(() => {
        const mq = window.matchMedia("(hover: none) and (pointer: coarse)");
        const update = () => setIsTouch(mq.matches);
        update();
        mq.addEventListener?.("change", update);
        return () => mq.removeEventListener?.("change", update);
    }, []);

    useEffect(() => {
        if (!copied) return;
        const t = setTimeout(() => setCopied(false), 1200);
        return () => clearTimeout(t);
    }, [copied]);

    const copy = async () => {
        try {
            await navigator.clipboard.writeText(copyValue);
            setCopied(true);
            setOpen(false);
        } catch {
            const ta = document.createElement("textarea");
            ta.value = copyValue;
            document.body.appendChild(ta);
            ta.select();
            document.execCommand("copy");
            document.body.removeChild(ta);
            setCopied(true);
            setOpen(false);
        }
    };

    const openLabel = label === "Teléfono" ? "Llamar" : "Enviar";
    const OpenIcon = label === "Teléfono" ? HiOutlinePhoneOutgoing : TbSend;

    return (
        <div
            className="relative"
            ref={popRef}
            onMouseEnter={!isTouch ? () => setOpen(true) : undefined}
            onMouseLeave={!isTouch ? () => setOpen(false) : undefined}
        >
            {/* Botón principal */}
            <motion.button
                type="button"
                onClick={isTouch ? () => setOpen((v) => !v) : undefined}
                className="
    w-12 h-12
    border-2 border-[var(--primary)]
    bg-transparent
    text-white
    flex items-center justify-center
    text-xl
    backdrop-blur-md
    hover:bg-[var(--primary-soft)]
    transition-colors
  "
                initial={{ borderRadius: "9999px" }}
                whileHover={{ scale: 1.08, y: -2, borderRadius: "16px" }}
                whileTap={{ scale: 0.96 }}
                transition={{
                    duration: 0.15,
                    ease: "easeInOut",
                }}
                aria-label={label}
                title={label}
                onMouseEnter={(e) => attractToTarget(e, 1.25)}
                onMouseLeave={stopAttractor}
                onFocus={(e) => attractToTarget(e, 1.25)}
                onBlur={stopAttractor}
            >
                {icon}
            </motion.button>

            {/* Toast copiado */}
            <AnimatePresence>
                {copied && (
                    <motion.div
                        initial={{ opacity: 0, y: 6, scale: 0.98 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 6, scale: 0.98 }}
                        transition={{ type: "spring", stiffness: 260, damping: 20 }}
                        className="absolute -top-10 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full text-xs text-white bg-slate-950/90 border border-white/10 shadow-lg"
                    >
                        Copiado
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Popover */}
            <AnimatePresence>
                {open && (
                    <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.98 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.98 }}
                        transition={{ type: "spring", stiffness: 260, damping: 22 }}
                        className="absolute bottom-14 left-1/2 -translate-x-1/2 w-52 rounded-xl bg-slate-900 border border-white/10 p-2 z-50"
                        style={{ boxShadow: "0 14px 40px rgba(0,0,0,0.45)" }}
                    >
                        <div className="text-xs text-gray-400 px-2 pb-2">{label}</div>

                        <a
                            href={primaryHref}
                            className="w-full flex items-center justify-between gap-2 px-3 py-2 rounded-lg text-sm text-white hover:bg-white/5"
                            onClick={() => setOpen(false)}
                        >
                            <span>{openLabel}</span>
                            <OpenIcon className="text-lg" />
                        </a>

                        <button
                            type="button"
                            onClick={copy}
                            className="w-full flex items-center justify-between gap-2 px-3 py-2 rounded-lg text-sm text-white hover:bg-white/5"
                        >
                            <span>Copiar</span>
                            <HiOutlineDuplicate className="text-lg" />
                        </button>

                        <div className="mt-2 px-3 py-2 rounded-lg bg-white/5 text-xs text-gray-300 break-all">
                            {copyValue}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

const ActionButton = ({ label, icon, href }) => (
    <motion.a
        href={href}
        target={href?.startsWith("http") ? "_blank" : undefined}
        rel={href?.startsWith("http") ? "noopener noreferrer" : undefined}
        className="
      w-12 h-12
      border-2 border-[var(--primary)]
      bg-transparent
      text-white
      flex items-center justify-center
      text-xl
      backdrop-blur-md
      hover:bg-[var(--primary-soft)]
      transition-colors
    "
        initial={{ borderRadius: "9999px" }}
        whileHover={{ scale: 1.08, y: -2, borderRadius: "16px" }}
        whileTap={{ scale: 0.96 }}
        transition={{
            duration: 0.15,
            ease: "easeInOut",
        }}
        aria-label={label}
        title={label}
        onMouseEnter={(e) => attractToTarget(e, 1.25)}
        onMouseLeave={stopAttractor}
        onFocus={(e) => attractToTarget(e, 1.25)}
        onBlur={stopAttractor}
    >
        {icon}
    </motion.a>
);

const Footer = () => {
    return (
        <footer className="py-10">
            <div className="container mx-auto px-6">
                <div className="flex items-center justify-center gap-4 flex-wrap">
                    <ActionButton label="GitHub" icon={<FaGithub />} href={GITHUB_URL} />
                    <ActionButton
                        label="LinkedIn"
                        icon={<FaLinkedin />}
                        href={LINKEDIN_URL}
                    />

                    <PopoverButton
                        label="Teléfono"
                        icon={<HiOutlinePhone />}
                        primaryHref={`tel:${PHONE_TEL}`}
                        copyValue={PHONE_NUMBER}
                    />

                    <PopoverButton
                        label="Email"
                        icon={<HiOutlineMail />}
                        primaryHref={`mailto:${EMAIL}`}
                        copyValue={EMAIL}
                    />

                    <ActionButton
                        label="WhatsApp"
                        icon={<FaWhatsapp />}
                        href={WHATSAPP_URL}
                    />
                </div>

                <p className="text-center text-xs text-gray-500 mt-6">
                    © {new Date().getFullYear()} Pablo Díaz García
                </p>
            </div>
        </footer>
    );
};

export default Footer;