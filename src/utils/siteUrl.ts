/**
 * Configuración y resolución de la URL canónica del proyecto.
 * Permite cambiar de dominio mediante la variable de entorno NEXT_PUBLIC_SITE_URL.
 */

export const DEFAULT_SITE_URL = 'https://palabras-que-suman.netlify.app';

/**
 * Obtiene la URL base de la aplicación:
 * 1. Prioridad: Variable de entorno NEXT_PUBLIC_SITE_URL.
 * 2. Si se ejecuta en el navegador sobre un dominio remoto (producción), usa window.location.origin.
 * 3. Si se ejecuta en localhost o desarrollo local, usa DEFAULT_SITE_URL para que
 *    los códigos QR escaneados desde celulares apunten a la web accesible por internet.
 */
export function getSiteUrl(): string {
  const envUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (envUrl) {
    return envUrl.replace(/\/+$/, '');
  }

  if (typeof window !== 'undefined') {
    const origin = window.location.origin;
    const isLocalhost =
      origin.includes('localhost') ||
      origin.includes('127.0.0.1') ||
      origin.includes('0.0.0.0');

    if (!isLocalhost && origin) {
      return origin.replace(/\/+$/, '');
    }
  }

  return DEFAULT_SITE_URL;
}

/**
 * Obtiene la URL directa a la sección del formulario de escritura (#escribir).
 */
export function getWriteMessageUrl(): string {
  return `${getSiteUrl()}/#escribir`;
}
