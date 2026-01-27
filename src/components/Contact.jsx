import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import Section from "./Section";
import iphoneImg from "../assets/iphone.png";
import emailjs from '@emailjs/browser';

export default function Contact() {
    const ref = useRef(null);
    const formRef = useRef(null);
    const isInView = useInView(ref, { once: false, margin: "-100px" });
    
    const [status, setStatus] = useState('');
    const [loading, setLoading] = useState(false);

    const IPHONE_SCREEN = {
        x: 0.34,
        y: 0.18,
        w: 0.32,
        h: 0.68,
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setStatus('');

        try {
            await emailjs.sendForm(
                'service_zqvsruu',
                'template_ff49274',
                formRef.current,
                'bvTTpmCEjUkBtIc4i'
            );
            
            setStatus('success');
            formRef.current.reset();
            setTimeout(() => setStatus(''), 3000);
        } catch (error) {
            console.error('Error:', error);
            setStatus('error');
            setTimeout(() => setStatus(''), 3000);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Section id="contact">
            <div ref={ref} className="container mx-auto max-w-5xl px-6">
                {/* Header */}
                <motion.h2
                    className="text-5xl font-bold text-white text-center mb-8"
                    initial={{ opacity: 0, y: -50 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                >
                    <motion.span
                        className="bg-clip-text text-transparent"
                        style={{
                            backgroundImage:
                                "linear-gradient(90deg, var(--primary), var(--accent))",
                            backgroundSize: "200% 200%",
                        }}
                        animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
                        transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
                    >
                        Contacto
                    </motion.span>
                </motion.h2>

                <motion.p
                    className="text-gray-400 text-lg text-center"
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8, delay: 0.2 }}
                >
                    ¿Tienes un proyecto en mente o quieres trabajar conmigo? Escríbeme y
                    hablamos.
                </motion.p>

                {/* iPhone + Form overlay */}
                <motion.div
                    className="flex justify-center mt-2 overflow-visible"
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.7, delay: 0.3 }}
                >
                    <div
                        className="
                            relative
                            w-[90vw]
                            max-w-[450px]
                            sm:max-w-[520px]
                            md:max-w-[600px]
                            lg:max-w-[680px]
                            xl:max-w-[750px]
                        "
                        style={{ minWidth: '400px' }}
                    >
                        {/* Halo suave */}
                        <div
                            className="absolute inset-0 blur-2xl opacity-30 -z-10"
                            style={{
                                backgroundImage:
                                    "linear-gradient(90deg, var(--primary), var(--accent))",
                            }}
                        />

                        {/* Imagen iPhone */}
                        <img
                            src={iphoneImg}
                            alt="iPhone mockup"
                            className="w-full h-auto select-none pointer-events-none"
                            draggable={false}
                        />

                        {/* Pantalla (overlay) */}
                        <div
                            className="absolute"
                            style={{
                                left: `${IPHONE_SCREEN.x * 100}%`,
                                top: `${IPHONE_SCREEN.y * 100}%`,
                                width: `${IPHONE_SCREEN.w * 100}%`,
                                height: `${IPHONE_SCREEN.h * 100}%`,
                            }}
                        >
                            <motion.form
                                ref={formRef}
                                onSubmit={handleSubmit}
                                className="
                                    relative
                                    w-full h-full
                                    rounded-[22px] sm:rounded-[32px] md:rounded-[34px]
                                    px-2 py-3
                                    sm:px-5 sm:py-6
                                    md:px-6
                                    flex flex-col gap-2.5 sm:gap-4
                                    overflow-y-auto no-scrollbar
                                    bg-white/[0.18]
                                    backdrop-blur-2xl
                                    border border-white/30
                                    shadow-[0_20px_70px_rgba(0,0,0,0.45)]
                                "
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6 }}
                            >
                                {/* Highlight superior (brillo iOS) */}
                                <div
                                    className="pointer-events-none absolute -top-1/3 left-1/2 -translate-x-1/2 w-[180%] h-[70%] opacity-80"
                                    style={{
                                        background:
                                            "radial-gradient(circle at 50% 0%, rgba(255,255,255,0.55), rgba(255,255,255,0.18) 35%, rgba(255,255,255,0) 70%)",
                                    }}
                                />

                                {/* Header */}
                                <div className="relative text-center mb-0 sm:mb-1">
                                    <p className="text-white font-semibold text-[11px] sm:text-[15px] tracking-tight">
                                        Envíame un mensaje
                                    </p>
                                </div>

                                {/* Mensaje de estado */}
                                {status && (
                                    <motion.div
                                        initial={{ opacity: 0, y: -10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className={`text-center text-[10px] sm:text-xs py-1 px-1 rounded-lg ${
                                            status === 'success' 
                                                ? 'bg-green-500/20 text-green-200' 
                                                : 'bg-red-500/20 text-red-200'
                                        }`}
                                    >
                                        {status === 'success' ? 'Mensaje enviado' : 'Error al enviar'}
                                    </motion.div>
                                )}

                                {/* Campo Nombre */}
                                <div className="flex flex-col gap-0.5">
                                    <label className="text-[10px] sm:text-[13px] text-white/85 font-medium">
                                        Nombre
                                    </label>
                                    <input
                                        type="text"
                                        name="user_name"
                                        required
                                        placeholder="Tu nombre"
                                        className="
                                            px-2 py-1
                                            sm:px-4 sm:py-3
                                            rounded-xl sm:rounded-2xl
                                            bg-white/[0.18]
                                            backdrop-blur-xl
                                            border border-white/30
                                            text-white text-[10px] sm:text-sm
                                            placeholder:text-white/65
                                            shadow-[inset_0_1px_0_rgba(255,255,255,0.35)]
                                            focus:outline-none
                                            focus:ring-2 focus:ring-white/40
                                            transition
                                        "
                                    />
                                </div>

                                {/* Campo Email */}
                                <div className="flex flex-col gap-0.5">
                                    <label className="text-[10px] sm:text-[13px] text-white/85 font-medium">
                                        Email
                                    </label>
                                    <input
                                        type="email"
                                        name="user_email"
                                        required
                                        placeholder="tucorreo@email.com"
                                        className="
                                            px-2 py-1
                                            sm:px-4 sm:py-3
                                            rounded-xl sm:rounded-2xl
                                            bg-white/[0.18]
                                            backdrop-blur-xl
                                            border border-white/30
                                            text-white text-[10px] sm:text-sm
                                            placeholder:text-white/65
                                            shadow-[inset_0_1px_0_rgba(255,255,255,0.35)]
                                            focus:outline-none
                                            focus:ring-2 focus:ring-white/40
                                            transition
                                        "
                                    />
                                </div>

                                {/* Campo Mensaje */}
                                <div className="flex flex-col gap-0.5 flex-1">
                                    <label className="text-[10px] sm:text-[13px] text-white/85 font-medium">
                                        Mensaje
                                    </label>
                                    <textarea
                                        name="message"
                                        rows="3"
                                        required
                                        placeholder="Cuéntame sobre tu proyecto..."
                                        className="
                                            flex-1
                                            px-2 py-1
                                            sm:px-4 sm:py-3
                                            rounded-xl sm:rounded-2xl
                                            bg-white/[0.18]
                                            backdrop-blur-xl
                                            border border-white/30
                                            text-white text-[10px] sm:text-sm
                                            placeholder:text-white/65
                                            shadow-[inset_0_1px_0_rgba(255,255,255,0.35)]
                                            focus:outline-none
                                            focus:ring-2 focus:ring-white/40
                                            transition
                                            resize-none
                                        "
                                    />
                                </div>

                                {/* Botón iOS */}
                                <motion.button
                                    type="submit"
                                    disabled={loading}
                                    className="
                                        mt-1
                                        w-full
                                        px-2 py-1
                                        sm:px-6 sm:py-3
                                        rounded-xl sm:rounded-2xl
                                        font-semibold text-[12px] sm:text-sm text-white
                                        bg-[var(--primary)]
                                        shadow-[0_14px_44px_var(--primary-glow)]
                                        transition
                                        disabled:opacity-50 disabled:cursor-not-allowed
                                    "
                                    whileHover={!loading ? { scale: 1.03 } : {}}
                                    whileTap={!loading ? { scale: 0.96 } : {}}
                                >
                                    {loading ? 'Enviando...' : 'Enviar mensaje'}
                                </motion.button>

                            </motion.form>

                        </div>
                    </div>
                </motion.div>
            </div>
        </Section>
    );
}