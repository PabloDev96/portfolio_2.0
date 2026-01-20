import { motion } from "framer-motion";

export default function Navbar() {
  return (
    <motion.nav
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      style={styles.nav}
    >
      <strong>Pablo</strong>
      <ul style={styles.menu}>
        {["About", "Projects", "Contact"].map((item) => (
          <motion.li key={item} whileHover={{ y: -2 }}>
            {item}
          </motion.li>
        ))}
      </ul>
    </motion.nav>
  );
}

const styles = {
  nav: {
    position: "fixed",
    top: 0,
    width: "100%",
    padding: "16px 40px",
    display: "flex",
    justifyContent: "space-between",
    backdropFilter: "blur(10px)",
    background: "rgba(15,23,42,.7)",
    color: "white",
    zIndex: 10,
  },
  menu: {
    display: "flex",
    gap: 24,
    listStyle: "none",
  },
};