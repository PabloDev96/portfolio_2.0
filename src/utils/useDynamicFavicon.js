import { useEffect } from 'react';
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { FaLaptopCode } from "react-icons/fa6";

const generateFavicon = (color) => {
  // Renderiza el icono de React Icons a SVG estático
  const iconElement = React.createElement(FaLaptopCode, { color: color, size: '100%' });
  const iconMarkup = renderToStaticMarkup(iconElement);
  
  // Crea un SVG wrapper con viewBox para que escale correctamente
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
      ${iconMarkup}
    </svg>
  `;
  
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
};

export const useDynamicFavicon = (theme) => {
  useEffect(() => {
    // Pequeño delay para asegurar que las variables CSS se hayan actualizado
    const updateFavicon = () => {
      // Obtenemos el color de la variable CSS --primary
      const rootStyles = getComputedStyle(document.documentElement);
      const primaryColor = rootStyles.getPropertyValue('--primary').trim() || '#7c3aed';

      let link = document.querySelector("link[rel~='icon']");
      if (link) {
        link.href = generateFavicon(primaryColor);
      } else {
        // Si no existe el link, lo creamos
        link = document.createElement('link');
        link.rel = 'icon';
        link.type = 'image/svg+xml';
        link.href = generateFavicon(primaryColor);
        document.head.appendChild(link);
      }
    };

    // Ejecutamos inmediatamente
    updateFavicon();
    
    // Y también con un pequeño delay para asegurar que el DOM se actualizó
    const timeoutId = setTimeout(updateFavicon, 10);
    
    return () => clearTimeout(timeoutId);
  }, [theme]);
};