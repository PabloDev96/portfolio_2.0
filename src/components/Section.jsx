import { motion } from "framer-motion";

export default function Section({ id, className = "", children }) {
  return (
    <motion.section
      id={id}
      className={`py-20 px-6 ${className}`}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, amount: 0.15 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
    >
      {children}
    </motion.section>
  );
}