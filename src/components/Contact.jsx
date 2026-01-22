import { motion } from "framer-motion";
import Section from "./Section";

export default function Contact() {
    return (
        <Section id="contact" className="bg-slate-900">
            <div className="container mx-auto max-w-3xl">
                {/* Header */}
                <motion.div
                    className="text-center mb-12"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                >
                    <motion.h2
                        className="text-4xl md:text-5xl font-bold text-white mb-4"
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        viewport={{ once: false }}
                    >
                        <motion.span
                            className="bg-clip-text text-transparent"
                            style={{
                                backgroundImage: "linear-gradient(90deg, var(--primary), var(--accent))",
                                backgroundSize: "200% 200%",
                            }}
                            animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
                            transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
                        >
                            Contacto
                        </motion.span>
                    </motion.h2>
                            
                    <p className="text-gray-400 text-lg">
                        ¿Tienes un proyecto en mente o quieres trabajar conmigo? Escríbeme y
                        hablamos.
                    </p>
                </motion.div>

                {/* Form */}
                <motion.form
                    className="bg-slate-800/60 backdrop-blur-md rounded-2xl p-8 border border-slate-700 shadow-lg flex flex-col gap-6"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7 }}
                    viewport={{ once: true }}
                    onSubmit={(e) => e.preventDefault()}
                >
                    <div className="flex flex-col gap-2">
                        <label className="text-sm text-gray-300">Nombre</label>
                        <input
                            type="text"
                            placeholder="Tu nombre"
                            className="px-4 py-3 rounded-lg bg-slate-900 border border-slate-700 text-white focus:outline-none focus:border-[var(--primary)] transition-colors"
                        />
                    </div>

                    <div className="flex flex-col gap-2">
                        <label className="text-sm text-gray-300">Email</label>
                        <input
                            type="email"
                            placeholder="tucorreo@email.com"
                            className="px-4 py-3 rounded-lg bg-slate-900 border border-slate-700 text-white focus:outline-none focus:border-[var(--primary)] transition-colors"
                        />
                    </div>

                    <div className="flex flex-col gap-2">
                        <label className="text-sm text-gray-300">Mensaje</label>
                        <textarea
                            rows="5"
                            placeholder="Cuéntame sobre tu proyecto..."
                            className="px-4 py-3 rounded-lg bg-slate-900 border border-slate-700 text-white focus:outline-none focus:border-[var(--primary)] transition-colors resize-none"
                        />
                    </div>

                    <motion.button
                        type="submit"
                        className="mt-4 self-center px-8 py-3 bg-[var(--primary)] text-white rounded-full font-semibold text-lg hover:bg-[var(--primary-hover)] transition-colors shadow-lg"
                        style={{ boxShadow: `0 14px 40px var(--primary-glow)` }}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        Enviar mensaje
                    </motion.button>
                </motion.form>
            </div>
        </Section>
    );
}