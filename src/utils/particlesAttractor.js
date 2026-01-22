export function setParticlesAttractor({ x, y, active, strength = 1 }) {
  window.dispatchEvent(
    new CustomEvent("particles:attractor", {
      detail: { x, y, active, strength },
    })
  );
}