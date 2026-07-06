import { Challenge } from '@/types/challenge'

export const challenges: Challenge[] = [
  {
    id: 'ch_001',
    slug: 'aparece-en-google-maps',
    title: 'Aparece en Google Maps',
    shortDescription: 'Asegúrate de que tu negocio aparezca cuando te buscan en Google',
    longDescription:
      'El 86% de las personas busca un negocio en Google Maps antes de visitarlo. Si no apareces, estás perdiendo clientes sin saberlo. Este desafío te guiará paso a paso para que tu negocio sea visible en el mapa.',
    difficulty: 1,
    estimatedMinutes: 5,
    category: 'presencia',
    iconEmoji: '📍',
    badgeName: 'En el Mapa',
    isActive: true,
    hasLesson: true,
    validationType: 'confirm',
    orderIndex: 1,
    steps: [
      {
        id: 'step_1',
        title: 'Abre Google Maps en tu celular',
        description: 'Busca la aplicación verde y blanca. Si no la tienes, descárgala desde tu tienda de apps.',
        actionType: 'external_link',
        actionUrl: 'https://maps.google.com',
        buttonText: '✅ Lo abrí',
      },
      {
        id: 'step_2',
        title: 'Busca tu negocio',
        description: 'Escribe el nombre de tu negocio en la barra de búsqueda de Google Maps.',
        actionType: 'choice',
        buttonText: 'Ya lo busqué',
        choices: [
          { text: 'Sí, aparece con datos completos', next: 'step_4' },
          { text: 'Sí, pero sin foto ni horario', next: 'step_3' },
          { text: 'No aparece mi negocio', next: 'step_create_gmb' },
        ],
      },
      {
        id: 'step_3',
        title: 'Completa la información básica',
        description:
          'Toca "Sugerir un cambio" o "Editar perfil" y agrega al menos: horario de atención, número de teléfono y una foto de tu local.',
        actionType: 'confirm',
        buttonText: '✅ Información agregada',
      },
      {
        id: 'step_create_gmb',
        title: 'Crea tu ficha de Google Mi Negocio',
        description:
          'Ve a google.com/business y registra tu negocio. Es gratis y solo te tomará 5 minutos más. Vuelve cuando tengas tu ficha activa.',
        actionType: 'external_link',
        actionUrl: 'https://business.google.com',
        buttonText: '✅ Ya creé mi ficha',
      },
      {
        id: 'step_4',
        title: 'Comparte tu ubicación',
        description:
          'Abre tu negocio en Google Maps, toca "Compartir" y copia el enlace. Ese link es ORO: ponlo en tu WhatsApp, Instagram y web.',
        actionType: 'confirm',
        buttonText: '✅ Ya tengo mi link',
      },
      {
        id: 'step_complete',
        title: '¡Desafío completado! 🎉',
        description:
          'Ahora cualquier persona que busque tu negocio en Google Maps te va a encontrar. Esto es presencia digital real.',
        actionType: 'confirm',
        buttonText: '¡Compartir mi logro!',
      },
    ],
  },
  {
    id: 'ch_002',
    slug: 'configura-horario-whatsapp',
    title: 'Configura el horario de atención en WhatsApp Business',
    shortDescription: 'Que tus clientes sepan cuándo pueden escribirte',
    longDescription:
      'Configurar tu horario de atención en WhatsApp Business ayuda a que tus clientes sepan cuándo pueden esperar respuesta. Reduce la frustración y profesionaliza tu negocio.',
    difficulty: 1,
    estimatedMinutes: 3,
    category: 'presencia',
    iconEmoji: '🕐',
    badgeName: 'Horario Listo',
    isActive: true,
    hasLesson: true,
    validationType: 'confirm',
    orderIndex: 2,
    steps: [
      {
        id: 'step_1',
        title: 'Abre WhatsApp Business',
        description: 'Abre la aplicación de WhatsApp Business en tu celular.',
        actionType: 'external_link',
        actionUrl: 'https://business.whatsapp.com',
        buttonText: '✅ Lo abrí',
      },
      {
        id: 'step_2',
        title: 'Configura tu horario',
        description:
          'Ve a Configuración > Cuenta de empresa > Horario de atención. Activa los horarios y selecciona los días y horas que estás disponible.',
        actionType: 'choice',
        buttonText: 'Ya configuré mi horario',
        choices: [
          { text: 'Configuré lunes a viernes', next: 'step_3' },
          { text: 'Configuré solo sábados y domingos', next: 'step_3' },
          { text: 'No encuentro la opción', next: 'step_3' },
        ],
      },
      {
        id: 'step_3',
        title: 'Agrega un mensaje fuera de horario',
        description:
          'En la misma sección de horario, configura un mensaje automático que se envíe cuando te escriben fuera del horario laboral.',
        actionType: 'confirm',
        buttonText: '✅ Mensaje configurado',
      },
      {
        id: 'step_complete',
        title: '¡Desafío completado! 🎉',
        description:
          'Tu horario de atención ahora es visible para tus clientes. Esto genera confianza y profesionalismo.',
        actionType: 'confirm',
        buttonText: '¡Compartir mi logro!',
      },
    ],
  },
  {
    id: 'ch_003',
    slug: 'crea-link-de-pago',
    title: 'Crea tu primer link de pago con MercadoPago',
    shortDescription: 'Recibe pagos fácilmente con un enlace personalizado',
    longDescription:
      'Con un link de pago de MercadoPago puedes cobrar por WhatsApp, redes sociales o cualquier canal sin necesidad de tienda física. Es rápido, seguro y profesional.',
    difficulty: 2,
    estimatedMinutes: 5,
    category: 'ventas',
    iconEmoji: '💳',
    badgeName: 'Primer Pago',
    isActive: true,
    hasLesson: true,
    validationType: 'confirm',
    orderIndex: 3,
    steps: [
      {
        id: 'step_1',
        title: 'Ingresa a MercadoPago',
        description: 'Si no tienes cuenta, regístrate. Si ya tienes, ingresa a tu panel de vendedor.',
        actionType: 'external_link',
        actionUrl: 'https://www.mercadopago.com.ar',
        buttonText: '✅ Entré a MercadoPago',
      },
      {
        id: 'step_2',
        title: 'Crea tu primer link de pago',
        description:
          'En tu panel, busca "Crear link de pago" o "Cobrar". Escribe el nombre del producto, el precio y genera el enlace.',
        actionType: 'choice',
        buttonText: 'Ya creé el link',
        choices: [
          { text: 'Creé un link para un producto', next: 'step_3' },
          { text: 'Creé un link para varios productos', next: 'step_3' },
          { text: 'Me perdí en los pasos', next: 'step_3' },
        ],
      },
      {
        id: 'step_3',
        title: 'Comparte el link con un cliente',
        description:
          'Copia el link generado y envíalo por WhatsApp o redes sociales. Verifica que el cliente pueda ver la página de pago.',
        actionType: 'confirm',
        buttonText: '✅ Link compartido y probado',
      },
      {
        id: 'step_complete',
        title: '¡Desafío completado! 🎉',
        description:
          'Ya tienes un link de pago funcional. Puedes usarlo en cada venta que hagas por WhatsApp o redes.',
        actionType: 'confirm',
        buttonText: '¡Compartir mi logro!',
      },
    ],
  },
  {
    id: 'ch_004',
    slug: 'foto-de-perfil-profesional',
    title: 'Tómate una foto de perfil profesional para tu negocio',
    shortDescription: 'Una buena foto genera confianza desde el primer contacto',
    longDescription:
      'Tu foto de perfil es lo primero que ven tus clientes potenciales. Una foto profesional, aunque sea con celular, aumenta la confianza y las probabilidades de que te elijan.',
    difficulty: 1,
    estimatedMinutes: 5,
    category: 'presencia',
    iconEmoji: '📸',
    badgeName: 'Foto Pro',
    isActive: true,
    hasLesson: true,
    validationType: 'confirm',
    orderIndex: 4,
    steps: [
      {
        id: 'step_1',
        title: 'Prepárate para la foto',
        description:
          'Busca un fondo limpio o neutro, asegúrate de tener buena luz natural (junto a una ventana) y que se vea tu producto o local.',
        actionType: 'external_link',
        actionUrl: 'https://www.canva.com',
        buttonText: '✅ Listo para fotografiar',
      },
      {
        id: 'step_2',
        title: 'Tómate la foto',
        description:
          'Usa tu celular con la cámara frontal o pide a alguien que te tome la foto. Busca que se vea profesional pero cercana.',
        actionType: 'choice',
        buttonText: 'Ya tengo mi foto',
        choices: [
          { text: 'Es una foto mía o de mi equipo', next: 'step_3' },
          { text: 'Es una foto de mi local o producto', next: 'step_3' },
          { text: 'Quiero mejorarla con Canva', next: 'step_3' },
        ],
      },
      {
        id: 'step_3',
        title: 'Actualiza tu foto de perfil',
        description:
          'Sube la foto como perfil en WhatsApp Business, Google Mi Negocio y redes sociales. Usa la misma foto en todos los canales para ser reconocido.',
        actionType: 'confirm',
        buttonText: '✅ Foto actualizada',
      },
      {
        id: 'step_complete',
        title: '¡Desafío completado! 🎉',
        description:
          'Tu foto de perfil profesional ya está en todos tus canales. Los clientes ahora te reconocen al instante.',
        actionType: 'confirm',
        buttonText: '¡Compartir mi logro!',
      },
    ],
  },
  {
    id: 'ch_005',
    slug: 'responde-resenas-google',
    title: 'Responde 3 reseñas de Google',
    shortDescription: 'Responde a tus clientes en Google y genera más confianza',
    longDescription:
      'Responder reseñas en Google muestra que te importan tus clientes. Las empresas que responden reseñas reciben un 45% más de visitas. Es una acción simple con gran impacto.',
    difficulty: 1,
    estimatedMinutes: 4,
    category: 'marketing',
    iconEmoji: '⭐',
    badgeName: 'Responde',
    isActive: true,
    hasLesson: true,
    validationType: 'confirm',
    orderIndex: 5,
    steps: [
      {
        id: 'step_1',
        title: 'Abre tu ficha de Google',
        description: 'Busca tu negocio en Google Maps o entra a tu panel de Google Mi Negocio.',
        actionType: 'external_link',
        actionUrl: 'https://business.google.com',
        buttonText: '✅ Abrí mi ficha',
      },
      {
        id: 'step_2',
        title: 'Lee las reseñas de tus clientes',
        description:
          'Entra a la sección de reseñas y lee al menos 3 de ellas. Identifica cuáles son positivas y cuáles negativas.',
        actionType: 'choice',
        buttonText: 'Ya leí mis reseñas',
        choices: [
          { text: 'Tengo solo reseñas positivas', next: 'step_3' },
          { text: 'Tengo reseñas positivas y negativas', next: 'step_3' },
          { text: 'No tengo reseñas todavía', next: 'step_complete' },
        ],
      },
      {
        id: 'step_3',
        title: 'Responde cada reseña',
        description:
          'Escribe una respuesta breve y personalizada para cada reseña. Agradece las positivas y aborda las negativas con empatía y una solución.',
        actionType: 'confirm',
        buttonText: '✅ Respondí 3 reseñas',
      },
      {
        id: 'step_complete',
        title: '¡Desafío completado! 🎉',
        description:
          'Ahora tus clientes saben que los escuchas. Esto aumenta la confianza y atrae más visitas a tu negocio.',
        actionType: 'confirm',
        buttonText: '¡Compartir mi logro!',
      },
    ],
  },
  {
    id: 'ch_006',
    slug: 'catalogo-whatsapp',
    title: 'Sube 3 productos a tu catálogo de WhatsApp',
    shortDescription: 'Muestra tus productos directamente en WhatsApp',
    longDescription:
      'El catálogo de WhatsApp Business te permite mostrar tus productos o servicios directamente en la app. Tus clientes pueden ver precios, fotos y descripciones sin salir de WhatsApp.',
    difficulty: 2,
    estimatedMinutes: 8,
    category: 'ventas',
    iconEmoji: '📦',
    badgeName: 'Catálogo Activo',
    isActive: true,
    hasLesson: true,
    validationType: 'confirm',
    orderIndex: 6,
    steps: [
      {
        id: 'step_1',
        title: 'Abre tu catálogo en WhatsApp Business',
        description:
          'Ve a Configuración > Herramientas de empresa > Catálogo y toca "Agregar producto o servicio".',
        actionType: 'external_link',
        actionUrl: 'https://business.whatsapp.com',
        buttonText: '✅ Abrí mi catálogo',
      },
      {
        id: 'step_2',
        title: 'Sube tu primer producto',
        description:
          'Agrega una foto clara del producto, escribe un nombre descriptivo, el precio y una breve descripción. Repite esto 3 veces.',
        actionType: 'choice',
        buttonText: 'Ya subí mis productos',
        choices: [
          { text: 'Subí 3 productos con foto y precio', next: 'step_3' },
          { text: 'Subí productos pero sin precio', next: 'step_3' },
          { text: 'No sé cómo agregar fotos', next: 'step_3' },
        ],
      },
      {
        id: 'step_3',
        title: 'Comparte tu catálogo',
        description:
          'Envía el enlace de tu catálogo a un contacto de prueba. Verifica que se vean bien las fotos, precios y descripciones.',
        actionType: 'confirm',
        buttonText: '✅ Catálogo probado y compartido',
      },
      {
        id: 'step_complete',
        title: '¡Desafío completado! 🎉',
        description:
          'Tu catálogo de WhatsApp ya está activo. Ahora tus clientes pueden ver tus productos directamente en el chat.',
        actionType: 'confirm',
        buttonText: '¡Compartir mi logro!',
      },
    ],
  },
]

export function getChallengeBySlug(slug: string): Challenge | undefined {
  return challenges.find((c) => c.slug === slug)
}

export function getActiveChallenges(): Challenge[] {
  return challenges.filter((c) => c.isActive).sort((a, b) => a.orderIndex - b.orderIndex)
}