import { motion } from "framer-motion";
import { FaGithub, FaLinkedinIn, FaXTwitter } from "react-icons/fa6";
import { HiMail } from "react-icons/hi";

const Footer = () => {
  const socialLinks = [
    { name: "GitHub", icon: <FaGithub />, url: "https://github.com/TU_USUARIO" },
    { name: "LinkedIn", icon: <FaLinkedinIn />, url: "https://www.linkedin.com/in/TU_USUARIO/" },
    { name: "X", icon: <FaXTwitter />, url: "https://x.com/TU_USUARIO" },
    { name: "Email", icon: <HiMail />, url: "mailto:tu@email.com" },
  ];

  const quickLinks = [
    { name: "Inicio", href: "#home" },
    { name: "Sobre Mí", href: "#about" },
    { name: "Proyectos", href: "#projects" },
    { name: "Contacto", href: "#contact" },
  ];

  const goTop = () => {
    const el = document.querySelector("#home");
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    else window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-slate-950 text-white pt-16 pb-8 relative overflow-hidden">
      {/* Animated background gradient (tematizado) */}
      <motion.div
        className="absolute inset-0 opacity-20"
        animate={{
          background: [
            "radial-gradient(circle at 0% 0%, var(--primary) 0%, transparent 55%)",
            "radial-gradient(circle at 100% 100%, var(--accent) 0%, transparent 55%)",
            "radial-gradient(circle at 0% 100%, rgba(59,130,246,1) 0%, transparent 55%)",
            "radial-gradient(circle at 100% 0%, var(--primary) 0%, transparent 55%)",
            "radial-gradient(circle at 0% 0%, var(--primary) 0%, transparent 55%)",
          ],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
      />

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid md:grid-cols-3 gap-12 mb-12">
          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h3 className="text-xl font-bold mb-4">Sígueme</h3>

            <div className="flex gap-4">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.name}
                  href={social.url}
                  target={social.url.startsWith("mailto:") ? undefined : "_blank"}
                  rel={social.url.startsWith("mailto:") ? undefined : "noopener noreferrer"}
                  className="w-12 h-12 bg-slate-800 rounded-full flex items-center justify-center text-xl transition-colors"
                  style={{ boxShadow: "0 10px 30px rgba(0,0,0,0.25)" }}
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  whileTap={{ scale: 0.9 }}
                  title={social.name}
                  aria-label={social.name}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = "var(--primary)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = "";
                  }}
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>

            <motion.div
              className="mt-6"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <p className="text-gray-400 text-sm mb-2">¿Trabajemos juntos?</p>
              <motion.a
                href="mailto:tu@email.com"
                className="text-[var(--primary)] hover:text-[var(--primary-hover)] font-semibold"
                whileHover={{ scale: 1.05 }}
              >
                tu@email.com
              </motion.a>
            </motion.div>
          </motion.div>
        </div>

        {/* Divider */}
        <motion.div
          className="border-t border-slate-800 mb-8"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        />

        {/* Bottom */}
        <motion.div
          className="flex flex-col md:flex-row justify-between items-center gap-4"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <p className="text-gray-400 text-sm text-center md:text-left">
            © {new Date().getFullYear()} Pablo Díaz García | Desarrollador Web.
          </p>

          
        </motion.div>

        {/* Decorative */}
        <div className="absolute bottom-0 right-0 opacity-10">
          <motion.div
            className="text-9xl"
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          >
            ✨
          </motion.div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;