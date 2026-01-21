import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

const Services = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const services = [
    {
      icon: '🎨',
      title: 'Diseño Web',
      description: 'Diseños modernos y atractivos que capturan la esencia de tu marca y convierten visitantes en clientes.',
      color: 'from-pink-500 to-rose-500',
    },
    {
      icon: '💻',
      title: 'Desarrollo Frontend',
      description: 'Interfaces interactivas y responsivas utilizando las últimas tecnologías como React, Vue y Angular.',
      color: 'from-blue-500 to-cyan-500',
    },
    {
      icon: '⚙️',
      title: 'Desarrollo Backend',
      description: 'APIs robustas y escalables con Node.js, Express, y bases de datos relacionales y no relacionales.',
      color: 'from-green-500 to-emerald-500',
    },
    {
      icon: '📱',
      title: 'Apps Móviles',
      description: 'Aplicaciones móviles nativas y multiplataforma para iOS y Android con React Native.',
      color: 'from-purple-500 to-indigo-500',
    },
    {
      icon: '🚀',
      title: 'Optimización',
      description: 'Mejora del rendimiento web, SEO y experiencia de usuario para resultados excepcionales.',
      color: 'from-orange-500 to-amber-500',
    },
    {
      icon: '🛠️',
      title: 'Mantenimiento',
      description: 'Soporte continuo, actualizaciones y mejoras para mantener tu proyecto siempre actualizado.',
      color: 'from-teal-500 to-cyan-500',
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.5,
        ease: "easeOut"
      }
    },
  };

  return (
    <section ref={ref} id="services" className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 py-20 px-6">
      <div className="container mx-auto max-w-7xl">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: -50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <motion.h2 
            className="text-5xl font-bold text-white mb-4"
            animate={isInView ? { scale: [0.9, 1] } : {}}
            transition={{ duration: 0.5 }}
          >
            Mis <span className="bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent">Servicios</span>
          </motion.h2>
          <motion.p
            className="text-gray-400 text-lg max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Soluciones completas de desarrollo web para llevar tu negocio al siguiente nivel
          </motion.p>
        </motion.div>

        <motion.div
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {services.map((service, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ 
                y: -10,
                transition: { duration: 0.2 }
              }}
              className="group"
            >
              <div className="bg-slate-900 rounded-2xl p-8 h-full border border-slate-700 hover:border-purple-500 transition-all duration-300 relative overflow-hidden">
                {/* Gradient overlay on hover */}
                <motion.div
                  className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}
                />

                <div className="relative z-10">
                  {/* Icon with animated background */}
                  <motion.div
                    className="relative mb-6"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ duration: 0.3 }}
                  >
                    <motion.div
                      className={`w-20 h-20 bg-gradient-to-br ${service.color} rounded-2xl flex items-center justify-center text-4xl shadow-lg`}
                      animate={{
                        boxShadow: [
                          '0 10px 30px rgba(168, 85, 247, 0.3)',
                          '0 10px 40px rgba(236, 72, 153, 0.4)',
                          '0 10px 30px rgba(168, 85, 247, 0.3)',
                        ],
                      }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      {service.icon}
                    </motion.div>
                  </motion.div>

                  <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-purple-400 transition-colors">
                    {service.title}
                  </h3>

                  <p className="text-gray-400 leading-relaxed">
                    {service.description}
                  </p>

                  {/* Animated arrow */}
                  <motion.div
                    className="mt-6 text-purple-400 font-semibold flex items-center gap-2"
                    initial={{ x: 0 }}
                    whileHover={{ x: 5 }}
                  >
                    Ver más 
                    <motion.span
                      animate={{ x: [0, 5, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >
                      →
                    </motion.span>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <motion.button
            className="px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-full font-semibold text-lg shadow-lg hover:shadow-purple-500/50 transition-all"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            ¡Hablemos de tu proyecto!
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default Services;