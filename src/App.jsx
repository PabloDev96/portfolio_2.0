import Home from "./pages/Home";
import ParticlesBackground from "./components/ParticlesBackground";

function App() {
  return (
    <div className="min-h-screen bg-slate-900 text-white w-full overflow-x-hidden relative">
      {/* Fondo de partículas */}
      <ParticlesBackground density={30} maxParticles={1000 } linkLines={false} />

      {/* Contenido por encima */}
      <div className="relative z-10">
        <Home />
      </div>
    </div>
  );
}

export default App;