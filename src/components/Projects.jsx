import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState } from 'react';

const Projects = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const projects = [
    {
      title: 'E-Commerce Platform',
      description: 'Plataforma completa de comercio electrónico con carrito de compras, pasarela de pago y panel de administración.',
      technologies: ['React', 'Node.js', 'MongoDB', 'Stripe'],
      color: 'from-blue-500 to-cyan-500',
    },
    {
      title: 'App de Gestión de Tareas',
      description: 'Aplicación colaborativa para gestión de proyectos con funciones en tiempo real y notificaciones.',
      technologies: ['React', 'Firebase', 'Tailwind CSS'],
      color: 'from-purple-500 to-pink-500',
    },
    {
      title: 'Dashboard Analytics',
      description: 'Dashboard interactivo con visualización de datos en tiempo real y múltiples gráficos personalizables.',
      technologies: ['React', 'D3.js', 'Express', 'PostgreSQL'],
      color: 'from-green-500 to-emerald-500',
    },
    {
      title: 'Red Social',
      description: 'Plataforma social con sistema de posts, comentarios, likes y mensajería instantánea.',
      technologies: ['React', 'Socket.io', 'Node.js', 'MySQL'],
      color: 'from-orange-500 to-red-500',
    },
    {
      title: 'Portfolio Interactivo',
      description: 'Portfolio personal con animaciones avanzadas y efectos 3D utilizando Three.js.',
      technologies: ['React', 'Three.js', 'Framer Motion'],
      color: 'from-indigo-500 to-purple-500',
    },
    {
      title: 'App de Clima',
      description: 'Aplicación meteorológica con pronósticos detallados, mapas interactivos y alertas personalizadas.',
      technologies: ['React', 'OpenWeather API', 'Mapbox'],
      color: 'from-sky-500 to-blue-500',
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5 }
    },
  };

  return (
    <section ref={ref} className="min-h-screen bg-slate-800 py-20 px-6">
      <div className="container mx-auto max-w-7xl">
        <motion.h2
          className="text-5xl font-bold text-white text-center mb-16"
          initial={{ opacity: 0, y: -50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          Mis <span className="text-purple-500">Proyectos</span>
        </motion.h2>

        <motion.div
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {projects.map((project, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              whileHover={{ y: -10 }}
              onHoverStart={() => setHoveredIndex(index)}
              onHoverEnd={() => setHoveredIndex(null)}
              className="relative group"
            >
              <motion.div
                className="bg-slate-900 rounded-2xl p-6 h-full border border-slate-700 overflow-hidden relative"
                animate={{
                  borderColor: hoveredIndex === index ? '#a855f7' : '#334155',
                }}
              >
                {/* Gradient background on hover */}
                <motion.div
                  className={`absolute inset-0 bg-gradient-to-br ${project.color} opacity-0`}
                  animate={{
                    opacity: hoveredIndex === index ? 0.1 : 0,
                  }}
                  transition={{ duration: 0.3 }}
                />

                <div className="relative z-10">
                  <div className={`w-16 h-16 mb-4 bg-gradient-to-br ${project.color} rounded-xl flex items-center justify-center text-white text-2xl`}>
                    💼
                  </div>

                  <h3 className="text-2xl font-bold text-white mb-3">
                    {project.title}
                  </h3>

                  <p className="text-gray-400 mb-4 leading-relaxed">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.technologies.map((tech, i) => (
                      <motion.span
                        key={i}
                        className="px-3 py-1 bg-slate-800 border border-slate-600 text-purple-400 text-sm rounded-full"
                        whileHover={{ scale: 1.05 }}
                      >
                        {tech}
                      </motion.span>
                    ))}
                  </div>

                  <motion.button
                    className="text-purple-400 font-semibold flex items-center gap-2 group"
                    whileHover={{ x: 5 }}
                  >
                    Ver más 
                    <motion.span
                      animate={{ x: hoveredIndex === index ? 5 : 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      →
                    </motion.span>
                  </motion.button>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <motion.button
            className="px-8 py-3 bg-purple-600 text-white rounded-full font-semibold hover:bg-purple-700 transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Ver Todos los Proyectos
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;