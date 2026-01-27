import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Section from "./Section";
import iphoneImg from "../assets/iphone.png";

export default function Contact() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: false, margin: "-100px" });

    /**
     * Coordenadas del "área de pantalla" dentro del PNG (en %),
     * para que sea responsive al escalar la imagen.
     *
     * Ajustadas para iphone.png (1250x1250 aprox).
     * Si quieres afinar:
     *  - x/y mueven la pantalla
     *  - w/h cambian tamaño del área visible
     */
    const IPHONE_SCREEN = {
        x: 0.34,
        y: 0.18,
        w: 0.32,
        h: 0.68,
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
                    className="flex justify-center w-screen relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw]"
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.7, delay: 0.3 }}
                >
                    <div
  className="
    relative
    w-full
    max-w-[92vw]
    xs:max-w-[420px]
    sm:max-w-[420px]
    md:max-w-[520px]
    lg:max-w-[620px]
    xl:max-w-[700px]
    mx-auto
  "
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
                                onSubmit={(e) => e.preventDefault()}
                                className="
                                    relative
                                    w-full h-full
                                    rounded-[34px]
                                    px-4 py-5 sm:px-5
                                    flex flex-col gap-4
                                    overflow-y-auto no-scrollbar

                                    /* Glass */
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
                                <div className="relative text-center mb-2">
                                    <p className="text-white font-semibold text-[15px] tracking-tight">
                                        Envíame un mensaje
                                    </p>
                                </div>

                                {/* Campo */}
                                <div className="flex flex-col gap-1">
                                    <label className="text-[11px] text-white/85">Nombre</label>
                                    <input
                                        type="text"
                                        placeholder="Tu nombre"
                                        className="
                                        px-4 py-3 rounded-2xl
                                        bg-white/[0.18]
                                        backdrop-blur-xl
                                        border border-white/30
                                        text-white text-sm
                                        placeholder:text-white/65
                                        shadow-[inset_0_1px_0_rgba(255,255,255,0.35)]
                                        focus:outline-none
                                        focus:ring-2 focus:ring-white/40
                                        transition
                                    "
                                    />
                                </div>

                                <div className="flex flex-col gap-1">
                                    <label className="text-[11px] text-white/85">Email</label>
                                    <input
                                        type="email"
                                        placeholder="tucorreo@email.com"
                                        className="
                                        px-4 py-3 rounded-2xl
                                        bg-white/[0.18]
                                        backdrop-blur-xl
                                        border border-white/30
                                        text-white text-sm
                                        placeholder:text-white/65
                                        shadow-[inset_0_1px_0_rgba(255,255,255,0.35)]
                                        focus:outline-none
                                        focus:ring-2 focus:ring-white/40
                                        transition
                                    "
                                    />
                                </div>

                                <div className="flex flex-col gap-1 flex-1">
                                    <label className="text-[11px] text-white/85">Mensaje</label>
                                    <textarea
                                        rows="5"
                                        placeholder="Cuéntame sobre tu proyecto..."
                                        className="
                                        flex-1
                                        px-4 py-3 rounded-2xl
                                        bg-white/[0.18]
                                        backdrop-blur-xl
                                        border border-white/30
                                        text-white text-sm
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
                                    className="
                                        mt-2 w-full px-6 py-3 rounded-2xl
                                        font-semibold text-sm text-white
                                        bg-[var(--primary)]
                                        shadow-[0_14px_44px_var(--primary-glow)]
                                        transition
                                    "
                                    whileHover={{ scale: 1.03 }}
                                    whileTap={{ scale: 0.96 }}
                                >
                                    Enviar mensaje
                                </motion.button>

                            </motion.form>

                        </div>
                    </div>
                </motion.div>
            </div>
        </Section>
    );
}