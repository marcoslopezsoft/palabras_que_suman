import { Country } from 'country-state-city';

export interface CountryOption {
  code: string;
  name: string;
  flag: string;
}

const regionNames = typeof Intl !== 'undefined' && Intl.DisplayNames 
  ? new Intl.DisplayNames(['es'], { type: 'region' }) 
  : null;

// Priority / featured countries for quick access
const PRIORITY_CODES = [
  'PY', 'AR', 'ES', 'UY', 'CL', 'BR', 'CO', 'MX', 'PE', 'US', 
  'BO', 'EC', 'VE', 'CR', 'PA', 'DO', 'GT', 'HN', 'SV', 'NI'
];

export const WORLD_COUNTRIES: CountryOption[] = (() => {
  try {
    const raw = Country.getAllCountries();
    const mapped = raw.map((c) => {
      let spanishName = c.name;
      if (regionNames) {
        try {
          spanishName = regionNames.of(c.isoCode) || c.name;
        } catch {
          spanishName = c.name;
        }
      }
      return {
        code: c.isoCode,
        name: spanishName,
        flag: c.flag || '🌍',
      };
    });

    const prioritySet = new Set(PRIORITY_CODES);
    const priorityList: CountryOption[] = [];
    const otherList: CountryOption[] = [];

    // Order priority items by PRIORITY_CODES order
    for (const code of PRIORITY_CODES) {
      const found = mapped.find((item) => item.code === code);
      if (found) priorityList.push(found);
    }

    for (const item of mapped) {
      if (!prioritySet.has(item.code)) {
        otherList.push(item);
      }
    }

    otherList.sort((a, b) => a.name.localeCompare(b.name, 'es'));

    return [...priorityList, ...otherList];
  } catch (err) {
    console.error('Error initializing WORLD_COUNTRIES:', err);
    return [
      { code: 'PY', name: 'Paraguay', flag: '🇵🇾' },
      { code: 'AR', name: 'Argentina', flag: '🇦🇷' },
      { code: 'ES', name: 'España', flag: '🇪🇸' },
      { code: 'UY', name: 'Uruguay', flag: '🇺🇾' },
      { code: 'CL', name: 'Chile', flag: '🇨🇱' },
      { code: 'CO', name: 'Colombia', flag: '🇨🇴' },
      { code: 'MX', name: 'México', flag: '🇲🇽' },
      { code: 'US', name: 'Estados Unidos', flag: '🇺🇸' },
    ];
  }
})();

export const POPULAR_CITIES_BY_COUNTRY: Record<string, string[]> = {
  PY: [
    'Asunción', 'Ciudad del Este', 'Encarnación', 'San Lorenzo', 'Luque', 
    'Capiatá', 'Lambaré', 'Fernando de la Mora', 'Limpio', 'Ñemby', 
    'Villarrica', 'Caacupé', 'Pilar', 'Coronel Oviedo', 'Pedro Juan Caballero', 'Concepción'
  ],
  AR: [
    'Buenos Aires', 'Córdoba', 'Rosario', 'Mendoza', 'La Plata', 
    'San Miguel de Tucumán', 'Mar del Plata', 'Salta', 'Santa Fe', 'San Juan', 
    'Resistencia', 'Neuquén', 'Bariloche', 'Posadas', 'Corrientes'
  ],
  ES: [
    'Madrid', 'Barcelona', 'Valencia', 'Sevilla', 'Zaragoza', 
    'Málaga', 'Murcia', 'Palma de Mallorca', 'Las Palmas', 'Bilbao', 
    'Alicante', 'Granada', 'San Sebastián', 'Santiago de Compostela'
  ],
  UY: [
    'Montevideo', 'Punta del Este', 'Salto', 'Paysandú', 'Maldonado', 
    'Rivera', 'Tacuarembó', 'Colonia del Sacramento'
  ],
  CL: [
    'Santiago', 'Valparaíso', 'Concepción', 'Viña del Mar', 'Antofagasta', 
    'Temuco', 'La Serena', 'Iquique', 'Puerto Montt'
  ],
  CO: [
    'Bogotá', 'Medellín', 'Cali', 'Barranquilla', 'Cartagena', 
    'Bucaramanga', 'Pereira', 'Santa Marta', 'Manizales'
  ],
  MX: [
    'Ciudad de México', 'Guadalajara', 'Monterrey', 'Puebla', 'Tijuana', 
    'León', 'Querétaro', 'Cancún', 'Mérida', 'Oaxaca'
  ],
  BR: [
    'São Paulo', 'Rio de Janeiro', 'Brasília', 'Salvador', 'Fortaleza', 
    'Belo Horizonte', 'Curitiba', 'Porto Alegre', 'Florianópolis', 'Foz do Iguaçu'
  ],
  PE: [
    'Lima', 'Arequipa', 'Trujillo', 'Chiclayo', 'Cusco', 'Piura', 'Iquitos'
  ],
  US: [
    'Miami', 'New York', 'Los Angeles', 'Chicago', 'Houston', 
    'San Antonio', 'San Diego', 'Dallas', 'Austin', 'San Francisco', 'Orlando'
  ],
  BO: ['La Paz', 'Santa Cruz de la Sierra', 'Cochabamba', 'Sucre', 'Tarija'],
  EC: ['Quito', 'Guayaquil', 'Cuenca', 'Manta', 'Ambato'],
  VE: ['Caracas', 'Maracaibo', 'Valencia', 'Barquisimeto', 'Mérida'],
  CR: ['San José', 'Alajuela', 'Cartago', 'Heredia', 'Puntarenas'],
  PA: ['Ciudad de Panamá', 'Colón', 'David', 'Santiago'],
};

