import { motion, useMotionValue, transform } from "framer-motion";
import { useMemo, useRef } from "react";
import { 
    FaReact, FaNodeJs, FaPhp, FaJava, FaHtml5, FaCss3Alt, 
    FaGitAlt, FaGithub, FaNpm, FaWordpress, FaLaravel, FaDocker
} from "react-icons/fa";
import { 
    SiJavascript, SiTailwindcss, SiSpring, SiMysql, 
    SiPostman, SiIntellijidea, SiApache, SiPostgresql, SiFirebase,
    SiRedux, SiTypescript, SiVite, SiFramer
} from "react-icons/si";
import { BiLogoVisualStudio } from "react-icons/bi";

// Tecnologías con sus iconos y colores
const technologies = [
  { name: "HTML5", icon: FaHtml5, color: "#fff", bg: "#E34F26" },
  { name: "CSS3", icon: FaCss3Alt, color: "#fff", bg: "#1572B6" },
  { name: "Tailwind", icon: SiTailwindcss, color: "#fff", bg: "#06B6D4" },
  { name: "JavaScript", icon: SiJavascript, color: "#000", bg: "#F7DF1E" },
  { name: "TypeScript", icon: SiTypescript, color: "#fff", bg: "#3178C6" },
  { name: "Java", icon: FaJava, color: "#fff", bg: "#007396" },
  { name: "PHP", icon: FaPhp, color: "#fff", bg: "#777BB4" },
  { name: "MySQL", icon: SiMysql, color: "#fff", bg: "#4479A1" },
  { name: "PostgreSQL", icon: SiPostgresql, color: "#fff", bg: "#4169E1" },
  { name: "Git", icon: FaGitAlt, color: "#fff", bg: "#F05032" },
  { name: "GitHub", icon: FaGithub, color: "#000", bg: "#ffffff" },
  { name: "Apache", icon: SiApache, color: "#fff", bg: "#D22128" },
  { name: "Spring", icon: SiSpring, color: "#fff", bg: "#6DB33F" },
  { name: "WordPress", icon: FaWordpress, color: "#fff", bg: "#21759B" },
  { name: "React", icon: FaReact, color: "#000", bg: "#61DAFB" },
  { name: "Redux", icon: SiRedux, color: "#fff", bg: "#764ABC" },
  { name: "Laravel", icon: FaLaravel, color: "#fff", bg: "#FF2D20" },
  { name: "Vite", icon: SiVite, color: "#000", bg: "#646CFF" },
  { name: "npm", icon: FaNpm, color: "#fff", bg: "#CB3837" },
  { name: "Docker", icon: FaDocker, color: "#fff", bg: "#2496ED" },
  { name: "Postman", icon: SiPostman, color: "#fff", bg: "#FF6C37" },
  { name: "VS Code", icon: BiLogoVisualStudio, color: "#fff", bg: "#007ACC" },
  { name: "IntelliJ", icon: SiIntellijidea, color: "#fff", bg: "#0071C5" },
  { name: "Framer Motion", icon: SiFramer, color: "#000", bg: "#FF0055" },
  { name: "Firebase", icon: SiFirebase, color: "#000", bg: "#FFCA28" },
];

// Configuración (reducido proporcionalmente)
const icon = {
  margin: 12,
  size: 60
};

const device = {
  width: 220,
  height: 268
};

// Hook para transformar los iconos (adaptado del ejemplo)
function useIconTransform({ x, y, scale, planeX, planeY, xOffset, yOffset }) {
  const xScale = useRef(1);
  const yScale = useRef(1);

  const createScreenRange = (axis) => [
    -60,
    80,
    device[axis] - (icon.size + icon.margin) / 2 - 80,
    device[axis] - (icon.size + icon.margin) / 2 + 60
  ];

  const scaleRange = [0, 1, 1, 0];
  const xRange = createScreenRange("width");
  const yRange = createScreenRange("height");

  const mapScreenToXOffset = transform(xRange, [50, 0, 0, -50]);
  const mapScreenToYOffset = transform(yRange, [50, 0, 0, -50]);
  const mapScreenXToScale = transform(xRange, scaleRange);
  const mapScreenYToScale = transform(yRange, scaleRange);

  useMemo(() => {
    const transformFn = (v) => {
      const screenOffset = v + xOffset + 20;
      xScale.current = mapScreenXToScale(screenOffset);
      const newScale = Math.min(xScale.current, yScale.current);
      scale.set(newScale);
      x.set(mapScreenToXOffset(screenOffset));
    };

    // Aplicar transformación inicial
    transformFn(planeX.get());
    
    return planeX.on("change", transformFn);
  }, [planeX, scale, x, xOffset]);

  useMemo(() => {
    const transformFn = (v) => {
      const screenOffset = v + yOffset + 20;
      yScale.current = mapScreenYToScale(screenOffset);
      const newScale = Math.min(xScale.current, yScale.current);
      scale.set(newScale);
      y.set(mapScreenToYOffset(screenOffset));
    };

    // Aplicar transformación inicial
    transformFn(planeY.get());
    
    return planeY.on("change", transformFn);
  }, [planeY, scale, y, yOffset]);
}

// Componente Item (icono individual)
function Item({ row, col, planeX, planeY, tech }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const scale = useMotionValue(1);

  const xOffset =
    col * (icon.size + icon.margin) +
    (row % 2) * ((icon.size + icon.margin) / 2);
  const yOffset = row * icon.size;

  useIconTransform({ x, y, scale, planeX, planeY, xOffset, yOffset });

  const Icon = tech.icon;

  return (
    <motion.div
      style={{
        position: "absolute",
        left: xOffset,
        top: yOffset,
        x,
        y,
        scale,
        width: icon.size,
        height: icon.size,
        borderRadius: "50%",
        contain: "strict",
        background: tech.bg,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        boxShadow: `0 0 15px ${tech.bg}80`,
      }}
    >
      <Icon style={{ fontSize: "30px", color: tech.color }} />
    </motion.div>
  );
}

// Componente principal
const AppleWatchDock = () => {
  // Crear grid de 80 iconos repitiendo las tecnologías
  const grid = [];
  
  for (let row = 0; row < 10; row++) {
    for (let col = 0; col < 8; col++) {
      const index = (row * 8 + col) % technologies.length;
      grid.push({ 
        row, 
        col, 
        tech: technologies[index]
      });
    }
  }
  
  const x = useMotionValue(-135);
  const y = useMotionValue(-135);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="container mx-auto max-w-6xl text-center">
        <h2 className="text-5xl font-bold text-white text-center mb-12">
          Tecnologías &{" "}
          <span className="bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
            Herramientas
          </span>
        </h2>

        <p className="text-gray-400 mb-8">Arrastra para explorar</p>

        <div
          style={{
            width: device.width,
            height: device.height,
            margin: "0 auto",
            overflow: "hidden",
            background: "black",
            borderRadius: "50px",
            position: "relative",
            border: "2px solid #333",
          }}
        >
          <motion.div
            drag
            dragConstraints={{ left: -370, right: 10, top: -340, bottom: 10 }}
            style={{
              width: 600,
              height: 600,
              x,
              y,
              background: "transparent",
              cursor: "grab"
            }}
            whileTap={{ cursor: "grabbing" }}
          >
            {grid.map((item, index) => (
              <Item
                key={index}
                row={item.row}
                col={item.col}
                planeX={x}
                planeY={y}
                tech={item.tech}
              />
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default AppleWatchDock;