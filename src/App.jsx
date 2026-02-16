import Home from "./pages/Home";
import ParticlesBackground from "./components/ParticlesBackground";
import { useDynamicFavicon } from "./utils/useDynamicFavicon";
import { useTheme } from "./context/ThemeContext";

function App() {
  const { theme } = useTheme();
  useDynamicFavicon(theme);

  return (
    <div className="min-h-screen w-full overflow-x-hidden relative">
      {/* gradiente */}
      <div
        className="fixed inset-0 z-0 pointer-events-none"
        style={{
          backgroundImage: `
            radial-gradient(900px circle at 20% 15%, var(--primary-soft), transparent 60%),
            radial-gradient(800px circle at 80% 70%, var(--accent-soft), transparent 65%),
            linear-gradient(180deg, var(--bg), #000)
          `,
        }}
      />

      {/* partículas */}
      <ParticlesBackground density={30} maxParticles={1000} linkLines={false} />

      {/* contenido */}
      <div className="relative z-10 text-white">
        <Home />
      </div>
    </div>
  );
}

export default App;