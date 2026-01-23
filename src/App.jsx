import Home from "./pages/Home";
import ParticlesBackground from "./components/ParticlesBackground";
import { useDynamicFavicon } from "./utils/useDynamicFavicon";
import { useTheme } from "./context/ThemeContext";

function App() {
  const { theme } = useTheme(); // Asumiendo que tienes este contexto
  
  // Actualiza el favicon cuando cambia el tema
  useDynamicFavicon(theme);

  return (
    <div className="min-h-screen bg-slate-900 text-white w-full overflow-x-hidden relative">
      {/* Fondo de partículas */}
      <ParticlesBackground density={30} maxParticles={1000} linkLines={false} />

      {/* Contenido por encima */}
      <div className="relative z-10">
        <Home />
      </div>
    </div>
  );
}

export default App;