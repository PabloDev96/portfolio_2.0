import { motion } from "framer-motion";

export default function Section({ children, id }) {
  return (
    <motion.section
      id={id}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      style={styles.section}
    >
      {children}
    </motion.section>
  );
}

const styles = {
  section: {
    minHeight: "100vh",
    padding: "120px 40px",
    background: "#020617",
    color: "white",
  },
};