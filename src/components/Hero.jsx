import { motion } from "framer-motion";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 30 },
  show: {
    opacity: 1,
    y: 0,
    transition: { ease: "easeOut", duration: 0.8 },
  },
};

export default function Hero() {
  return (
    <section style={styles.hero}>
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        style={styles.content}
      >
        <motion.h1 variants={item}>
          Hola, soy <span style={styles.name}>Pablo</span>
        </motion.h1>

        <motion.p variants={item}>
          Frontend Developer especializado en React
        </motion.p>

        <motion.div variants={item} style={styles.buttons}>
          <motion.button whileHover={{ scale: 1.05 }}>
            Ver proyectos
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            style={styles.secondary}
          >
            Contacto
          </motion.button>
        </motion.div>
      </motion.div>
    </section>
  );
}

const styles = {
  hero: {
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "#0f172a",
    color: "white",
  },
  content: {
    textAlign: "center",
    maxWidth: 600,
  },
  name: {
    color: "#38bdf8",
  },
  buttons: {
    marginTop: 32,
    display: "flex",
    gap: 16,
    justifyContent: "center",
  },
  secondary: {
    background: "transparent",
    border: "1px solid white",
    color: "white",
  },
};