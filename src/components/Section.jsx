import { motion } from "framer-motion";

export default function Section({ id, className = "", children }) {
  return (
    <motion.section id={id} className={`py-20 px-6 ${className}`}>
      {children}
    </motion.section>
  );
}
