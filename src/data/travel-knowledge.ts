// Base de conocimiento de destinos turísticos para RAG
export const travelKnowledge = [
  {
    destination: "París",
    country: "Francia",
    bestMonths: ["abril", "mayo", "septiembre", "octubre"],
    avgBudget: { low: 70, mid: 150, high: 300 },
    topAttractions: [
      "Torre Eiffel",
      "Museo del Louvre",
      "Catedral de Notre-Dame",
      "Arco del Triunfo",
      "Palacio de Versalles"
    ],
    cuisine: ["croissants", "queso", "vino", "macarons", "crêpes"],
    tips: "Compra el Paris Museum Pass para ahorrar en entradas. El metro es la forma más eficiente de moverse.",
    culture: "Ciudad del arte, moda y gastronomía. Rica historia desde época medieval hasta modernidad."
  },
  {
    destination: "Tokio",
    country: "Japón",
    bestMonths: ["marzo", "abril", "octubre", "noviembre"],
    avgBudget: { low: 80, mid: 180, high: 400 },
    topAttractions: [
      "Templo Senso-ji",
      "Torre de Tokio",
      "Palacio Imperial",
      "Shibuya Crossing",
      "Akihabara"
    ],
    cuisine: ["sushi", "ramen", "tempura", "okonomiyaki", "takoyaki"],
    tips: "Obtén un JR Pass si planeas viajar a otras ciudades. La puntualidad es sagrada.",
    culture: "Mezcla única de tradición milenaria y tecnología de vanguardia. Respeto y cortesía son fundamentales."
  },
  {
    destination: "Ciudad de México",
    country: "México",
    bestMonths: ["octubre", "noviembre", "diciembre", "enero", "febrero", "marzo"],
    avgBudget: { low: 400, mid: 800, high: 1800 }, // MXN pesos mexicanos por día
    topAttractions: [
      "Zócalo y Catedral Metropolitana",
      "Templo Mayor",
      "Museo Nacional de Antropología",
      "Palacio de Bellas Artes",
      "Xochimilco",
      "Casa Azul de Frida Kahlo",
      "Castillo de Chapultepec",
      "Coyoacán",
      "Teotihuacán"
    ],
    cuisine: [
      "tacos al pastor", 
      "chilaquiles", 
      "cochinita pibil", 
      "tamales", 
      "pozole", 
      "quesadillas", 
      "elote",
      "churros",
      "mezcal",
      "pulque"
    ],
    specificRestaurants: [
      "Pujol (Polanco) - Alta cocina mexicana - $2,500 MXN",
      "Quintonil (Polanco) - Cocina contemporánea - $2,800 MXN", 
      "Azul Histórico (Centro) - Cocina tradicional - $400 MXN",
      "El Cardenal (Centro) - Desayunos tradicionales - $180 MXN",
      "Contramar (Roma Norte) - Mariscos - $600 MXN",
      "Rosetta (Roma Norte) - Cocina italiana-mexicana - $450 MXN",
      "Café de Tacuba (Centro) - Cocina tradicional desde 1912 - $250 MXN",
      "Mercado de San Juan - Productos gourmet - $200 MXN",
      "La Casa de las Sirenas (Centro) - Vista al Zócalo - $350 MXN"
    ],
    neighborhoods: [
      "Centro Histórico - Arquitectura colonial, museos",
      "Roma Norte - Cafés, galerías, vida bohemia", 
      "Condesa - Parques, restaurantes, vida nocturna",
      "Polanco - Zona upscale, museos, shopping",
      "Coyoacán - Bohemio, mercados, Frida Kahlo",
      "Xochimilco - Trajineras, canales, tradición",
      "San Ángel - Colonial, mercados de sábado"
    ],
    tips: "Usa Uber/taxi de sitio por seguridad. El metro es eficiente pero evítalo en hora pico. Lleva efectivo para mercados. La altitud puede causar cansancio inicial.",
    culture: "Capital cultural de América Latina. Mezcla de civilización azteca, época colonial y modernidad. Centro de gastronomía, arte y tradiciones mexicanas."
  },
  {
    destination: "Cancún",
    country: "México",
    bestMonths: ["diciembre", "enero", "febrero", "marzo", "abril"],
    avgBudget: { low: 50, mid: 120, high: 250 },
    topAttractions: [
      "Chichén Itzá",
      "Tulum",
      "Isla Mujeres",
      "Xcaret",
      "Cenotes"
    ],
    cuisine: ["tacos", "ceviche", "cochinita pibil", "marquesitas", "guacamole"],
    tips: "Evita la temporada de huracanes (junio-noviembre). Los tours incluyen transporte desde hoteles.",
    culture: "Fusión de cultura maya antigua con turismo moderno. Calidez mexicana y playas paradisíacas."
  },
  {
    destination: "Barcelona",
    country: "España",
    bestMonths: ["mayo", "junio", "septiembre", "octubre"],
    avgBudget: { low: 60, mid: 130, high: 280 },
    topAttractions: [
      "Sagrada Familia",
      "Park Güell",
      "Las Ramblas",
      "Casa Batlló",
      "Barrio Gótico"
    ],
    cuisine: ["tapas", "paella", "crema catalana", "jamón ibérico", "pan con tomate"],
    tips: "Reserva entradas a Sagrada Familia con anticipación. El barrio Gótico es ideal para paseos a pie.",
    culture: "Arquitectura modernista de Gaudí, cultura catalana vibrante, playas urbanas y vida nocturna animada."
  },
  {
    destination: "Nueva York",
    country: "Estados Unidos",
    bestMonths: ["abril", "mayo", "septiembre", "octubre", "noviembre"],
    avgBudget: { low: 100, mid: 200, high: 500 },
    topAttractions: [
      "Estatua de la Libertad",
      "Central Park",
      "Times Square",
      "Empire State Building",
      "MoMA"
    ],
    cuisine: ["pizza", "bagels", "hot dogs", "cheesecake", "food trucks"],
    tips: "Usa el metro (subway) para moverte. Compra New York Pass para atracciones múltiples.",
    culture: "Melting pot cultural, capital mundial del arte, moda, finanzas y entretenimiento."
  },
  {
    destination: "Roma",
    country: "Italia",
    bestMonths: ["abril", "mayo", "septiembre", "octubre"],
    avgBudget: { low: 65, mid: 140, high: 300 },
    topAttractions: [
      "Coliseo",
      "Vaticano y Capilla Sixtina",
      "Fontana di Trevi",
      "Panteón",
      "Foro Romano"
    ],
    cuisine: ["pasta carbonara", "pizza romana", "gelato", "supplì", "cacio e pepe"],
    tips: "Reserva entrada al Vaticano con antelación. Muchas iglesias requieren vestimenta apropiada.",
    culture: "Cuna del Imperio Romano y centro del catolicismo. Historia viva en cada esquina."
  },
  {
    destination: "Londres",
    country: "Reino Unido",
    bestMonths: ["mayo", "junio", "julio", "agosto", "septiembre"],
    avgBudget: { low: 90, mid: 180, high: 400 },
    topAttractions: [
      "Torre de Londres",
      "British Museum",
      "Buckingham Palace",
      "London Eye",
      "Big Ben"
    ],
    cuisine: ["fish and chips", "sunday roast", "afternoon tea", "curry", "pie and mash"],
    tips: "Usa la Oyster Card para transporte público. Muchos museos tienen entrada gratuita.",
    culture: "Monarquía histórica, diversidad multicultural, teatro de clase mundial y arquitectura icónica."
  },
  {
    destination: "Bali",
    country: "Indonesia",
    bestMonths: ["abril", "mayo", "junio", "septiembre", "octubre"],
    avgBudget: { low: 30, mid: 80, high: 200 },
    topAttractions: [
      "Templo Tanah Lot",
      "Ubud y arrozales",
      "Playa Seminyak",
      "Templo Uluwatu",
      "Monte Batur"
    ],
    cuisine: ["nasi goreng", "satay", "babi guling", "rendang", "bebek betutu"],
    tips: "Alquila scooter para moverte. Respeta ceremonias religiosas locales.",
    culture: "Espiritualidad hindú balinesa, terrazas de arroz, templos ancestrales y hospitalidad única."
  },
  {
    destination: "Dubái",
    country: "Emiratos Árabes Unidos",
    bestMonths: ["noviembre", "diciembre", "enero", "febrero", "marzo"],
    avgBudget: { low: 100, mid: 250, high: 600 },
    topAttractions: [
      "Burj Khalifa",
      "Dubai Mall",
      "Palm Jumeirah",
      "Desierto safari",
      "Burj Al Arab"
    ],
    cuisine: ["shawarma", "hummus", "falafel", "kunafa", "dates"],
    tips: "Vestimenta conservadora en áreas públicas. El taxi/metro es eficiente.",
    culture: "Lujo moderno en el desierto, arquitectura futurista, shopping de clase mundial."
  },
  {
    destination: "Machu Picchu",
    country: "Perú",
    bestMonths: ["mayo", "junio", "julio", "agosto", "septiembre"],
    avgBudget: { low: 40, mid: 100, high: 250 },
    topAttractions: [
      "Ciudadela Inca",
      "Huayna Picchu",
      "Valle Sagrado",
      "Cusco",
      "Aguas Calientes"
    ],
    cuisine: ["ceviche", "lomo saltado", "cuy", "anticuchos", "pisco sour"],
    tips: "Aclimátate a la altitud en Cusco primero. Reserva entradas con meses de anticipación.",
    culture: "Patrimonio incaico milenario, arquitectura de piedra imposible, misticismo andino."
  },
  {
    destination: "Madrid",
    country: "España",
    bestMonths: ["mayo", "junio", "septiembre", "octubre"],
    avgBudget: { low: 55, mid: 120, high: 250 },
    topAttractions: [
      "Museo del Prado",
      "Palacio Real",
      "Parque del Retiro",
      "Plaza Mayor",
      "Reina Sofía"
    ],
    specificRestaurants: [
      "Sobrino de Botín (Casa Botín) - El restaurante más antiguo del mundo - 45€",
      "Mercado de San Miguel - Gastronomía variada - 15€",
      "Casa Lucio - Famoso por huevos estrellados - 35€",
      "Lhardy - Cocina tradicional madrileña desde 1839 - 50€",
      "Taberna La Bola - Cocido madrileño auténtico - 25€"
    ],
    neighborhoods: [
      "Malasaña - Bohemio, tiendas vintage, vida nocturna",
      "Chueca - LGBTQ+ friendly, restaurantes, bares",
      "La Latina - Tapas, mercado dominguero, ambiente castizo",
      "Salamanca - Zona elegante, shopping de lujo",
      "Lavapiés - Multicultural, arte urbano, alternativo"
    ],
    cuisine: ["tapas", "cocido madrileño", "bocadillo de calamares", "churros con chocolate", "tortilla española"],
    tips: "El Museo del Prado es gratis las últimas 2 horas del día. Los domingos muchos madrileños van al Rastro (mercado de pulgas).",
    culture: "Capital de España, centro político y cultural. Famosa por sus museos, vida nocturna y gastronomía tradicional."
  },
  {
    destination: "Buenos Aires",
    country: "Argentina",
    bestMonths: ["marzo", "abril", "mayo", "septiembre", "octubre", "noviembre"],
    avgBudget: { low: 30, mid: 70, high: 180 },
    topAttractions: [
      "Caminito en La Boca",
      "Plaza de Mayo",
      "San Telmo",
      "Puerto Madero",
      "Recoleta y Cementerio"
    ],
    specificRestaurants: [
      "Don Julio - Mejor parrilla de Palermo - $60",
      "La Cabrera - Parrilla gourmet - $45",
      "Café Tortoni - Histórico desde 1858 - $15",
      "El Obrero - Parrilla tradicional en La Boca - $25",
      "Tegui - Alta cocina argentina - $120"
    ],
    neighborhoods: [
      "Palermo - Trendy, restaurantes, vida nocturna",
      "San Telmo - Colonial, tango, mercados",
      "La Boca - Colorido, Caminito, fútbol",
      "Recoleta - Elegante, museos, cementerio",
      "Puerto Madero - Moderno, ríos, rascacielos"
    ],
    cuisine: ["asado", "empanadas", "milanesa", "dulce de leche", "mate"],
    tips: "Los restaurantes abren tarde (21:00). El tango es gratis los domingos en San Telmo. Usa subte (metro) o taxis.",
    culture: "París de Sudamérica. Fuerte influencia europea, especialmente italiana. Cuna del tango y pasión futbolística."
  }
];

// Función para buscar información relevante sobre un destino
export function getDestinationInfo(destination: string) {
  const normalizedQuery = destination.toLowerCase();
  return travelKnowledge.find(
    place => place.destination.toLowerCase().includes(normalizedQuery) ||
             place.country.toLowerCase().includes(normalizedQuery)
  );
}

// Función para obtener recomendaciones basadas en intereses
export function getRecommendationsByInterests(interests: string[]) {
  const recommendations = [];
  
  if (interests.includes('cultura') || interests.includes('historia')) {
    recommendations.push('Roma', 'París', 'Atenas', 'Jerusalén');
  }
  if (interests.includes('playa')) {
    recommendations.push('Cancún', 'Bali', 'Maldivas', 'Santorini');
  }
  if (interests.includes('aventura')) {
    recommendations.push('Machu Picchu', 'Nueva Zelanda', 'Islandia', 'Patagonia');
  }
  if (interests.includes('gastronomía')) {
    recommendations.push('Tokio', 'Barcelona', 'Bangkok', 'Lima');
  }
  if (interests.includes('aire libre')) {
    recommendations.push('Banff', 'Suiza', 'Costa Rica', 'Noruega');
  }
  
  return [...new Set(recommendations)];
}
