import { Challenge } from '@/types/challenge'

export const challenges: Challenge[] = [
  // ─── MÓDULO 1: Presencia Digital (días 1-7) ──────────────────────────
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
    alternatives: [
      { title: 'Apple Maps', description: 'Registra tu negocio en Apple Maps para usuarios iPhone', iconEmoji: '🍎' },
      { title: 'Waze', description: 'Aparece en Waze para conductores que buscan tu negocio', iconEmoji: '🧭' },
      { title: 'Yelp', description: 'Crea un perfil en Yelp si tu negocio es de comida o servicios', iconEmoji: '📋' },
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
    id: 'ch_007',
    slug: 'perfil-instagram-business',
    title: 'Crea tu perfil de Instagram Business',
    shortDescription: 'Pasa tu cuenta a Business para vender desde Instagram',
    longDescription:
      'Una cuenta de Instagram Business te da acceso a estadísticas, botón de contacto y herramientas de publicidad. Sin ella, estás limitando tu alcance y tus ventas en la red social más visual del mundo.',
    difficulty: 1,
    estimatedMinutes: 5,
    category: 'presencia',
    iconEmoji: '📱',
    badgeName: 'Instagram Pro',
    isActive: true,
    hasLesson: true,
    validationType: 'confirm',
    orderIndex: 3,
    steps: [
      {
        id: 'step_1',
        title: 'Abre Instagram en tu celular',
        description:
          'Si no tienes cuenta de negocio, usa tu cuenta personal. Desde ahí la convertiremos en Business.',
        actionType: 'external_link',
        actionUrl: 'https://www.instagram.com',
        buttonText: '✅ Abrí Instagram',
      },
      {
        id: 'step_2',
        title: 'Convierte tu cuenta a Business',
        description:
          'Ve a Configuración > Cuenta > Cambiar a cuenta profesional > Negocio. Selecciona la categoría que mejor describe tu negocio.',
        actionType: 'choice',
        buttonText: 'Ya cambié mi cuenta',
        choices: [
          { text: 'Seleccioné categoría de negocio', next: 'step_3' },
          { text: 'No encuentro la opción', next: 'step_3' },
          { text: 'Ya era cuenta Business', next: 'step_3' },
        ],
      },
      {
        id: 'step_3',
        title: 'Completa tu información de perfil',
        description:
          'Agrega nombre de negocio, categoría, dirección (si aplica), horario y botón de contacto (WhatsApp, email o llamada).',
        actionType: 'confirm',
        buttonText: '✅ Perfil completado',
      },
      {
        id: 'step_complete',
        title: '¡Desafío completado! 🎉',
        description:
          'Tu cuenta de Instagram Business está lista. Ahora puedes ver estadísticas de tus publicaciones y tener un botón de contacto directo.',
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
    id: 'ch_008',
    slug: 'enlace-directo-whatsapp',
    title: 'Configura el enlace directo de WhatsApp',
    shortDescription: 'Crea un link que abra un chat contigo al instante',
    longDescription:
      'Un enlace wa.me permite que cualquier persona te escriba por WhatsApp con un solo clic. Úsalo en tu bio de Instagram, tu firma de email, tu sitio web o tus anuncios.',
    difficulty: 1,
    estimatedMinutes: 3,
    category: 'presencia',
    iconEmoji: '🔗',
    badgeName: 'Link Activo',
    isActive: true,
    hasLesson: true,
    validationType: 'confirm',
    orderIndex: 5,
    steps: [
      {
        id: 'step_1',
        title: 'Ve a wa.me',
        description:
          'Abre wa.me en tu navegador. Es la herramienta oficial de Meta para crear enlaces de WhatsApp.',
        actionType: 'external_link',
        actionUrl: 'https://wa.me',
        buttonText: '✅ Abrí wa.me',
      },
      {
        id: 'step_2',
        title: 'Genera tu enlace',
        description:
          'Ingresa tu número de teléfono con código de país (ejemplo: 521234567890). Haz clic en "Continuar" para generar el enlace.',
        actionType: 'choice',
        buttonText: 'Generé mi enlace',
        choices: [
          { text: 'Generé el enlace básico', next: 'step_3' },
          { text: 'Agregué un mensaje predefinido', next: 'step_3' },
          { text: 'No pude generarlo', next: 'step_3' },
        ],
      },
      {
        id: 'step_3',
        title: 'Prueba tu enlace',
        description:
          'Copia el enlace y ábrelo en una pestaña nueva. Debería abrir WhatsApp con tu chat. Compártelo en tu bio de Instagram o en tu firma de email.',
        actionType: 'confirm',
        buttonText: '✅ Enlace probado y compartido',
      },
      {
        id: 'step_complete',
        title: '¡Desafío completado! 🎉',
        description:
          'Tu enlace directo de WhatsApp está listo. Ahora cualquier persona puede escribirte con un solo clic.',
        actionType: 'confirm',
        buttonText: '¡Compartir mi logro!',
      },
    ],
  },
  {
    id: 'ch_009',
    slug: 'landing-page-google-sites',
    title: 'Crea una landing page gratis con Google Sites',
    shortDescription: 'Ten tu propia página web en 5 minutos sin pagar nada',
    longDescription:
      'Una landing page es tu carta de presentación en internet. Google Sites te permite crear una página profesional gratis, ideal para mostrar tu negocio, productos o servicios.',
    difficulty: 2,
    estimatedMinutes: 7,
    category: 'presencia',
    iconEmoji: '🌐',
    badgeName: 'Página Web',
    isActive: true,
    hasLesson: true,
    validationType: 'confirm',
    orderIndex: 6,
    steps: [
      {
        id: 'step_1',
        title: 'Abre Google Sites',
        description:
          'Ve a sites.google.com y haz clic en el botón "+" para crear un sitio nuevo desde cero.',
        actionType: 'external_link',
        actionUrl: 'https://sites.google.com',
        buttonText: '✅ Abrí Google Sites',
      },
      {
        id: 'step_2',
        title: 'Agrega el contenido básico',
        description:
          'Agrega: nombre de tu negocio, una breve descripción (qué haces), tus horarios, un número de contacto y al menos una foto de tu producto o local.',
        actionType: 'choice',
        buttonText: 'Ya agregué el contenido',
        choices: [
          { text: 'Agregué texto, foto y contacto', next: 'step_3' },
          { text: 'Agregué solo texto y foto', next: 'step_3' },
          { text: 'Necesito ayuda con el diseño', next: 'step_3' },
        ],
      },
      {
        id: 'step_3',
        title: 'Publica tu sitio',
        description:
          'Haz clic en "Publicar" y elige un nombre para la URL. Comparte el enlace con un contacto para verificar que se vea bien.',
        actionType: 'confirm',
        buttonText: '✅ Sitio publicado',
      },
      {
        id: 'step_complete',
        title: '¡Desafío completado! 🎉',
        description:
          'Ya tienes tu propia página web. Compártela en tu bio de redes sociales y en tu firma de email.',
        actionType: 'confirm',
        buttonText: '¡Compartir mi logro!',
      },
    ],
  },
  {
    id: 'ch_010',
    slug: 'checkpoint-presencia-digital',
    title: 'CHECKPOINT: Revisa y optimiza tu presencia digital',
    shortDescription: 'Evalúa qué tan completo está tu perfil online',
    longDescription:
      'Es momento de pausar y revisar. ¿Todos tus canales están activos? ¿La información es consistente? Este checkpoint te ayuda a identificar qué te falta por mejorar.',
    difficulty: 1,
    estimatedMinutes: 5,
    category: 'presencia',
    iconEmoji: '🔍',
    badgeName: 'Presencia Completa',
    isActive: true,
    hasLesson: false,
    isCheckpoint: true,
    moduleName: 'presencia',
    validationType: 'confirm',
    orderIndex: 7,
    steps: [
      {
        id: 'step_1',
        title: 'Revisa tu presencia en Google',
        description:
          'Busca tu negocio en Google. ¿Apareces en Maps? ¿Tu información de contacto es correcta? ¿Tienes reseñas?',
        actionType: 'choice',
        buttonText: 'Revisé mi presencia en Google',
        choices: [
          { text: 'Todo está completo y correcto', next: 'step_2' },
          { text: 'Falta información por actualizar', next: 'step_2' },
          { text: 'No aparezco en Google aún', next: 'step_2' },
        ],
      },
      {
        id: 'step_2',
        title: 'Revisa tus redes sociales',
        description:
          'Verifica que tu perfil de Instagram y WhatsApp Business tengan foto, descripción, horario y contacto actualizados.',
        actionType: 'choice',
        buttonText: 'Revisé mis redes',
        choices: [
          { text: 'Todo está bien en redes', next: 'step_3' },
          { text: 'Necesito actualizar algo', next: 'step_3' },
          { text: 'Aún no tengo redes configuradas', next: 'step_3' },
        ],
      },
      {
        id: 'step_3',
        title: 'Haz una lista de pendientes',
        description:
          'Escribe 3 cosas concretas que necesitas mejorar en tu presencia digital. Ejemplo: actualizar foto, agregar horario, responder reseñas.',
        actionType: 'confirm',
        buttonText: '✅ Lista de pendientes lista',
      },
      {
        id: 'step_complete',
        title: '¡Módulo 1 completado! 🎉',
        description:
          'Completaste el módulo de Presencia Digital. Tu negocio ya tiene base online. En el siguiente módulo aprenderás a vender y cobrar.',
        actionType: 'confirm',
        buttonText: '¡Continuar al Módulo 2!',
      },
    ],
  },

  // ─── MÓDULO 2: Ventas y Pagos (días 8-14) ───────────────────────────
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
    orderIndex: 8,
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
    id: 'ch_011',
    slug: 'cobros-automaticos-mercadopago',
    title: 'Configura cobros automáticos con MercadoPago',
    shortDescription: 'Cobra por suscripciones o cuotas sin hacer nada manual',
    longDescription:
      'Si vendes servicios recurrentes o productos en cuotas, los cobros automáticos te ahorran tiempo y reducen la morosidad. Configúralos en MercadoPago en pocos pasos.',
    difficulty: 3,
    estimatedMinutes: 7,
    category: 'ventas',
    iconEmoji: '🔄',
    badgeName: 'Cobros Auto',
    isActive: true,
    hasLesson: true,
    validationType: 'confirm',
    orderIndex: 9,
    steps: [
      {
        id: 'step_1',
        title: 'Ingresa a tu panel de MercadoPago',
        description: 'Busca la sección de "Cobros" o "Suscripciones" dentro de tu cuenta de vendedor.',
        actionType: 'external_link',
        actionUrl: 'https://www.mercadopago.com.ar',
        buttonText: '✅ Entré a MercadoPago',
      },
      {
        id: 'step_2',
        title: 'Crea una suscripción o plan de cobro',
        description:
          'Define el monto, la frecuencia (mensual, semanal) y el nombre del servicio. Si prefieres, configura el pago en cuotas para un producto.',
        actionType: 'choice',
        buttonText: 'Configuré mi cobro',
        choices: [
          { text: 'Creé una suscripción mensual', next: 'step_3' },
          { text: 'Configuré pago en cuotas', next: 'step_3' },
          { text: 'Me confundí con las opciones', next: 'step_3' },
        ],
      },
      {
        id: 'step_3',
        title: 'Comparte el enlace de cobro',
        description:
          'Envía el enlace de la suscripción o cobro a un cliente de prueba. Verifica que el proceso de pago funcione correctamente.',
        actionType: 'confirm',
        buttonText: '✅ Cobro probado',
      },
      {
        id: 'step_complete',
        title: '¡Desafío completado! 🎉',
        description:
          'Tus cobros automáticos están configurados. Ahora puedes cobrar de forma recurrente sin pedir el dinero cada vez.',
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
    orderIndex: 10,
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
  {
    id: 'ch_012',
    slug: 'carrito-compras-simple',
    title: 'Crea un carrito de compras simple',
    shortDescription: 'Dale a tus clientes una forma fácil de comprar varios productos',
    longDescription:
      'Un carrito de compras permite que tus clientes seleccionen varios productos y paguen todo junto. Es ideal si vendes por WhatsApp o redes y quieres agilizar el proceso de venta.',
    difficulty: 3,
    estimatedMinutes: 8,
    category: 'ventas',
    iconEmoji: '🛒',
    badgeName: 'Mi Carrito',
    isActive: true,
    hasLesson: true,
    validationType: 'confirm',
    orderIndex: 11,
    steps: [
      {
        id: 'step_1',
        title: 'Elige una herramienta de carrito',
        description:
          'Puedes usar Tiendanube, Shopi o crear un formulario con Google Forms que funcione como carrito simple.',
        actionType: 'external_link',
        actionUrl: 'https://www.tiendanube.com',
        buttonText: '✅ Elegí mi herramienta',
      },
      {
        id: 'step_2',
        title: 'Agrega tus productos al carrito',
        description:
          'Sube al menos 3 productos con foto, nombre, precio y descripción. Organícalos por categoría si es posible.',
        actionType: 'choice',
        buttonText: 'Ya agregué mis productos',
        choices: [
          { text: 'Agregué 3+ productos con fotos', next: 'step_3' },
          { text: 'Agregué productos sin fotos todavía', next: 'step_3' },
          { text: 'Estoy usando Google Forms como carrito', next: 'step_3' },
        ],
      },
      {
        id: 'step_3',
        title: 'Prueba el proceso de compra',
        description:
          'Haz un pedido de prueba como si fueras un cliente. Verifica que el proceso sea claro y funcione bien.',
        actionType: 'confirm',
        buttonText: '✅ Carrito probado',
      },
      {
        id: 'step_complete',
        title: '¡Desafío completado! 🎉',
        description:
          'Tu carrito de compras está listo. Ahora tus clientes pueden comprar múltiples productos de forma sencilla.',
        actionType: 'confirm',
        buttonText: '¡Compartir mi logro!',
      },
    ],
  },
  {
    id: 'ch_013',
    slug: 'facturacion-electronica',
    title: 'Configura facturación electrónica básica',
    shortDescription: 'Emite facturas electrónicas para tus clientes',
    longDescription:
      'En muchos países es obligatorio facturar tus ventas. Configurar la facturación electrónica te da profesionalismo y cumple con la ley. Muchos sistemas son gratuitos para pequeños negocios.',
    difficulty: 3,
    estimatedMinutes: 7,
    category: 'ventas',
    iconEmoji: '📄',
    badgeName: 'Facturador',
    isActive: true,
    hasLesson: true,
    validationType: 'confirm',
    orderIndex: 12,
    steps: [
      {
        id: 'step_1',
        title: 'Investiga tu obligación fiscal',
        description:
          'Busca en el portal de impuestos de tu país si necesitas facturar electrónicamente. En muchos casos, los monotributistas o pequeños negocios tienen opciones gratuitas.',
        actionType: 'external_link',
        actionUrl: 'https://www.afip.gob.ar',
        buttonText: '✅ Investigué mi obligación',
      },
      {
        id: 'step_2',
        title: 'Elige un sistema de facturación',
        description:
          'Usa el sistema oficial de tu país o una app como Facturando, PyMe Factura o el portal de tu autoridad fiscal.',
        actionType: 'choice',
        buttonText: 'Elegí mi sistema',
        choices: [
          { text: 'Usaré el sistema oficial', next: 'step_3' },
          { text: 'Elegí una app de facturación', next: 'step_3' },
          { text: 'Necesito más información', next: 'step_3' },
        ],
      },
      {
        id: 'step_3',
        title: 'Emite tu primera factura de prueba',
        description:
          'Genera una factura con datos ficticios para practicar. Verifica que tenga todos los datos requeridos: nombre, monto, fecha y número de factura.',
        actionType: 'confirm',
        buttonText: '✅ Factura de prueba emitida',
      },
      {
        id: 'step_complete',
        title: '¡Desafío completado! 🎉',
        description:
          'Ya puedes emitir facturas electrónicas. Esto te da profesionalismo y cumple con la normativa fiscal.',
        actionType: 'confirm',
        buttonText: '¡Compartir mi logro!',
      },
    ],
  },
  {
    id: 'ch_014',
    slug: 'sistema-pedidos-whatsapp',
    title: 'Crea un sistema de pedidos por WhatsApp',
    shortDescription: 'Recibe y organiza pedidos de forma estructurada',
    longDescription:
      'Si tus clientes te escriben por WhatsApp para hacer pedidos, necesitas un sistema que te ayude a organizarlos. Te mostramos cómo crear un proceso claro y profesional.',
    difficulty: 2,
    estimatedMinutes: 5,
    category: 'ventas',
    iconEmoji: '📝',
    badgeName: 'Pedidos Listos',
    isActive: true,
    hasLesson: true,
    validationType: 'confirm',
    orderIndex: 13,
    steps: [
      {
        id: 'step_1',
        title: 'Crea un mensaje de pedido rápido',
        description:
          'En WhatsApp Business, ve a Herramientas de empresa > Mensajes rápidos. Crea uno con el formato: "Hola, quiero hacer un pedido:\n- Producto:\n- Cantidad:\n- Dirección:"',
        actionType: 'external_link',
        actionUrl: 'https://business.whatsapp.com',
        buttonText: '✅ Mensaje creado',
      },
      {
        id: 'step_2',
        title: 'Configura respuestas rápidas para pedidos',
        description:
          'Crea mensajes rápidos para confirmar pedidos, dar precios y comunicar estados de entrega (en preparación, enviado, entregado).',
        actionType: 'choice',
        buttonText: 'Configuré mis respuestas',
        choices: [
          { text: 'Creé 3+ mensajes para pedidos', next: 'step_3' },
          { text: 'Creé al menos 1 mensaje', next: 'step_3' },
          { text: 'No sé cómo crear mensajes rápidos', next: 'step_3' },
        ],
      },
      {
        id: 'step_3',
        title: 'Prueba el flujo completo',
        description:
          'Simula un pedido de prueba: envía el mensaje de pedido rápido, confirma el pedido y notifica el estado. Verifica que todo fluya.',
        actionType: 'confirm',
        buttonText: '✅ Sistema probado',
      },
      {
        id: 'step_complete',
        title: '¡Desafío completado! 🎉',
        description:
          'Tu sistema de pedidos por WhatsApp está listo. Ahora puedes recibir y organizar pedidos de forma profesional.',
        actionType: 'confirm',
        buttonText: '¡Compartir mi logro!',
      },
    ],
  },
  {
    id: 'ch_015',
    slug: 'checkpoint-ventas-pagos',
    title: 'CHECKPOINT: Revisa tu embudo de ventas',
    shortDescription: 'Evalúa tu proceso de cobro de principio a fin',
    longDescription:
      'Antes de seguir, revisa que todo tu proceso de ventas funcione. Desde que un cliente te escribe hasta que cobra y factura. Identifica los puntos débiles.',
    difficulty: 1,
    estimatedMinutes: 5,
    category: 'ventas',
    iconEmoji: '💰',
    badgeName: 'Ventas Completas',
    isActive: true,
    hasLesson: false,
    isCheckpoint: true,
    moduleName: 'ventas',
    validationType: 'confirm',
    orderIndex: 14,
    steps: [
      {
        id: 'step_1',
        title: 'Revisa tu proceso de venta',
        description:
          'Piensa en cómo un cliente te contacta, elige producto, paga y recibe. ¿Hay algún paso que se complique o retrase?',
        actionType: 'choice',
        buttonText: 'Revisé mi proceso',
        choices: [
          { text: 'Mi proceso está claro y fluido', next: 'step_2' },
          { text: 'Hay pasos que se complican', next: 'step_2' },
          { text: 'Necesito crear mi proceso desde cero', next: 'step_2' },
        ],
      },
      {
        id: 'step_2',
        title: 'Verifica tus herramientas de cobro',
        description:
          '¿Tienes link de pago? ¿Catálogo? ¿Sistema de pedidos? ¿Facturación? Marca cuáles ya tienes configurados.',
        actionType: 'choice',
        buttonText: 'Verifiqué mis herramientas',
        choices: [
          { text: 'Tengo todas las herramientas', next: 'step_3' },
          { text: 'Me faltan algunas', next: 'step_3' },
          { text: 'Solo tengo link de pago', next: 'step_3' },
        ],
      },
      {
        id: 'step_3',
        title: 'Define 3 mejoras concretas',
        description:
          'Escribe 3 acciones concretas para mejorar tu embudo de ventas. Ejemplo: agregar carrito, configurar facturación, crear mensajes rápidos.',
        actionType: 'confirm',
        buttonText: '✅ Mis 3 mejoras definidas',
      },
      {
        id: 'step_complete',
        title: '¡Módulo 2 completado! 🎉',
        description:
          'Completaste el módulo de Ventas y Pagos. Tu negocio ahora puede vender y cobrar de forma profesional. En el siguiente módulo aprenderás marketing.',
        actionType: 'confirm',
        buttonText: '¡Continuar al Módulo 3!',
      },
    ],
  },

  // ─── MÓDULO 3: Marketing (días 15-21) ───────────────────────────────
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
    orderIndex: 15,
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
    id: 'ch_016',
    slug: 'diseña-post-instagram-canva',
    title: 'Diseña un post para Instagram con Canva',
    shortDescription: 'Crea contenido visual profesional sin ser diseñador',
    longDescription:
      'Canva es una herramienta gratuita que te permite crear posts profesionales para Instagram en minutos. Un buen diseño aumenta el engagement y atrae más clientes.',
    difficulty: 2,
    estimatedMinutes: 7,
    category: 'marketing',
    iconEmoji: '🎨',
    badgeName: 'Diseñador',
    isActive: true,
    hasLesson: true,
    validationType: 'upload',
    orderIndex: 16,
    steps: [
      {
        id: 'step_1',
        title: 'Abre Canva y elige una plantilla',
        description:
          'Ve a canva.com, busca "post de Instagram" y elige una plantilla que se adapte a tu negocio. Puedes filtrar por industria.',
        actionType: 'external_link',
        actionUrl: 'https://www.canva.com',
        buttonText: '✅ Abrí Canva',
      },
      {
        id: 'step_2',
        title: 'Personaliza el diseño',
        description:
          'Cambia el texto por uno propio (ofrece algo concreto: "20% de descuento hoy"), sube tu logo o foto de producto y ajusta los colores a tu marca.',
        actionType: 'choice',
        buttonText: 'Ya personalicé el diseño',
        choices: [
          { text: 'Usé mi propio texto e imagen', next: 'step_3' },
          { text: 'Solo cambié el texto', next: 'step_3' },
          { text: 'Necesito ayuda con el diseño', next: 'step_3' },
        ],
      },
      {
        id: 'step_3',
        title: 'Descarga y publica en Instagram',
        description:
          'Descarga el diseño como imagen (PNG o JPG) y súbelo como publicación en Instagram. Agrega un caption llamativo y hashtags relevantes.',
        actionType: 'photo',
        buttonText: '📸 Subir mi diseño',
      },
      {
        id: 'step_complete',
        title: '¡Desafío completado! 🎉',
        description:
          'Tu primer post profesional está en Instagram. Repite este proceso semanalmente para mantener tu perfil activo.',
        actionType: 'confirm',
        buttonText: '¡Compartir mi logro!',
      },
    ],
  },
  {
    id: 'ch_017',
    slug: 'escribe-copys-redes',
    title: 'Escribe 3 copys para tus redes sociales',
    shortDescription: 'Aprende a escribir textos que vendan en redes',
    longDescription:
      'Un buen copy no es solo describir tu producto, es contar una historia que conecte con tu cliente. Te enseñamos la estructura básica para escribir textos que generen ventas.',
    difficulty: 2,
    estimatedMinutes: 5,
    category: 'marketing',
    iconEmoji: '✍️',
    badgeName: 'Copywriter',
    isActive: true,
    hasLesson: true,
    validationType: 'confirm',
    orderIndex: 17,
    steps: [
      {
        id: 'step_1',
        title: 'Aprende la estructura AIDA',
        description:
          'AIDA = Atención (gancho), Interés (problema), Deseo (solución) y Acción (qué hacer). Es la fórmula más usada en copywriting.',
        actionType: 'choice',
        buttonText: 'Entendí la estructura',
        choices: [
          { text: 'La entiendo y la aplicaré', next: 'step_2' },
          { text: 'Necesito un ejemplo', next: 'step_2' },
          { text: 'Ya la conocía', next: 'step_2' },
        ],
      },
      {
        id: 'step_2',
        title: 'Escribe tu primer copy',
        description:
          'Usa la estructura AIDA para escribir un copy sobre tu producto o servicio más vendido. Ejemplo: "¿Cansado de...? [Tu producto] te ofrece... ¡Escríbenos ahora!"',
        actionType: 'confirm',
        buttonText: '✅ Escribí mi primer copy',
      },
      {
        id: 'step_3',
        title: 'Escribe 2 copys más',
        description:
          'Escribe 2 copys adicionales para otros productos o servicios. Prueba diferentes tonos: uno formal y uno más casual.',
        actionType: 'confirm',
        buttonText: '✅ Escribí mis 3 copys',
      },
      {
        id: 'step_complete',
        title: '¡Desafío completado! 🎉',
        description:
          'Ya tienes 3 copys listos para usar. Publícalos en tus redes y mide cuál genera más interacción.',
        actionType: 'confirm',
        buttonText: '¡Compartir mi logro!',
      },
    ],
  },
  {
    id: 'ch_018',
    slug: 'calendario-contenido-semanal',
    title: 'Crea un calendario de contenido semanal',
    shortDescription: 'Planifica tus publicaciones para no perderte días',
    longDescription:
      'Un calendario de contenido te ayuda a publicar de forma constante sin estrés. Planifica una semana de publicaciones y verás cómo mejora tu presencia en redes.',
    difficulty: 2,
    estimatedMinutes: 7,
    category: 'marketing',
    iconEmoji: '📅',
    badgeName: 'Planificador',
    isActive: true,
    hasLesson: true,
    validationType: 'confirm',
    orderIndex: 18,
    steps: [
      {
        id: 'step_1',
        title: 'Crea tu calendario en Google Sheets',
        description:
          'Abre Google Sheets y crea una tabla con columnas: Día, Tipo de contenido, Texto, Imagen, Hora de publicación.',
        actionType: 'external_link',
        actionUrl: 'https://sheets.google.com',
        buttonText: '✅ Calendario creado',
      },
      {
        id: 'step_2',
        title: 'Planifica 5 publicaciones',
        description:
          'Llena el calendario con 5 publicaciones para la semana: 1 producto destacado, 1 testimonio de cliente, 1 post de valor (consejo), 1 detrás de cámaras y 1 oferta.',
        actionType: 'choice',
        buttonText: 'Planifiqué mis publicaciones',
        choices: [
          { text: 'Planifiqué 5 publicaciones completas', next: 'step_3' },
          { text: 'Planifiqué 3 por ahora', next: 'step_3' },
          { text: 'Solo tengo ideas generales', next: 'step_3' },
        ],
      },
      {
        id: 'step_3',
        title: 'Guarda y comparte tu calendario',
        description:
          'Si trabajas con alguien, comparte el calendario. Si trabajas solo, imprímelo o guárdalo en un lugar visible.',
        actionType: 'confirm',
        buttonText: '✅ Calendario listo',
      },
      {
        id: 'step_complete',
        title: '¡Desafío completado! 🎉',
        description:
          'Tu calendario de contenido semanal está listo. Publica según el plan y mantén tu perfil activo.',
        actionType: 'confirm',
        buttonText: '¡Compartir mi logro!',
      },
    ],
  },
  {
    id: 'ch_019',
    slug: 'campana-google-ads',
    title: 'Configura una campaña básica de Google Ads',
    shortDescription: 'Lleva tu negocio a la primera página de Google',
    longDescription:
      'Google Ads te permite aparecer en la primera búsqueda de Google para tu negocio. Con presupuesto pequeño puedes atraer clientes que buscan exactamente lo que vendes.',
    difficulty: 4,
    estimatedMinutes: 10,
    category: 'marketing',
    iconEmoji: '📢',
    badgeName: 'Publicista',
    isActive: true,
    hasLesson: true,
    validationType: 'confirm',
    orderIndex: 19,
    steps: [
      {
        id: 'step_1',
        title: 'Ingresa a Google Ads',
        description:
          'Ve a ads.google.com y crea una cuenta con tu Gmail. Es gratis registrarse, solo pagas cuando alguien hace clic en tu anuncio.',
        actionType: 'external_link',
        actionUrl: 'https://ads.google.com',
        buttonText: '✅ Creé mi cuenta',
      },
      {
        id: 'step_2',
        title: 'Crea tu primera campaña',
        description:
          'Selecciona "Crear campaña" > "Sin objetivo" > "Búsqueda". Elige palabras clave relacionadas con tu negocio (ej: "panadería cerca de mí").',
        actionType: 'choice',
        buttonText: 'Configuré mi campaña',
        choices: [
          { text: 'Seleccioné palabras clave específicas', next: 'step_3' },
          { text: 'Usé las sugerencias de Google', next: 'step_3' },
          { text: 'No sé qué palabras clave elegir', next: 'step_3' },
        ],
      },
      {
        id: 'step_3',
        title: 'Define tu presupuesto y lanza',
        description:
          'Establece un presupuesto diario bajo ($500-$1000 COP o equivalente) y lanza la campaña. Google te mostrará cuántas personas verán tu anuncio.',
        actionType: 'confirm',
        buttonText: '✅ Campaña lanzada',
      },
      {
        id: 'step_complete',
        title: '¡Desafío completado! 🎉',
        description:
          'Tu primera campaña de Google Ads está activa. Monitorea los resultados diariamente y ajusta las palabras clave según el rendimiento.',
        actionType: 'confirm',
        buttonText: '¡Compartir mi logro!',
      },
    ],
  },
  {
    id: 'ch_020',
    slug: 'lead-magnet-basico',
    title: 'Crea un lead magnet básico para captar clientes',
    shortDescription: 'Ofrece algo de valor a cambio del contacto de tus clientes',
    longDescription:
      'Un lead magnet es un recurso gratuito (guía, checklist, descuento) que ofreces a cambio del email o número de WhatsApp de un cliente potencial. Es la base del marketing por email.',
    difficulty: 3,
    estimatedMinutes: 8,
    category: 'marketing',
    iconEmoji: '🧲',
    badgeName: 'Captador',
    isActive: true,
    hasLesson: true,
    validationType: 'upload',
    orderIndex: 20,
    steps: [
      {
        id: 'step_1',
        title: 'Decide qué ofrecer',
        description:
          'Elige un lead magnet simple: una guía PDF, un checklist, un cupón de descuento o una mini consultoría gratuita.',
        actionType: 'choice',
        buttonText: 'Elegí mi lead magnet',
        choices: [
          { text: 'Ofreceré una guía o checklist', next: 'step_2' },
          { text: 'Ofreceré un cupón de descuento', next: 'step_2' },
          { text: 'Ofreceré una consultoría gratuita', next: 'step_2' },
        ],
      },
      {
        id: 'step_2',
        title: 'Crea tu lead magnet',
        description:
          'Si es guía/checklist, usa Canva para diseñar un PDF atractivo. Si es cupón, crea una imagen con el descuento. Mantenlo simple pero profesional.',
        actionType: 'external_link',
        actionUrl: 'https://www.canva.com',
        buttonText: '✅ Lead magnet creado',
      },
      {
        id: 'step_3',
        title: 'Configura la entrega',
        description:
          'Cuando alguien te escriba pidiendo el lead magnet, envíalo automáticamente con un mensaje de WhatsApp o guárdalo en Google Drive con enlace público.',
        actionType: 'confirm',
        buttonText: '✅ Entrega configurada',
      },
      {
        id: 'step_complete',
        title: '¡Desafío completado! 🎉',
        description:
          'Tu lead magnet está listo. Promuévelo en tus redes y empieza a captar contactos de clientes potenciales.',
        actionType: 'confirm',
        buttonText: '¡Compartir mi logro!',
      },
    ],
  },
  {
    id: 'ch_021',
    slug: 'checkpoint-marketing',
    title: 'CHECKPOINT: Analiza tu estrategia de marketing',
    shortDescription: 'Evalúa tu contenido y planifica los próximos pasos',
    longDescription:
      'Antes de seguir, revisa qué ha funcionado en tu marketing. ¿Qué publicaciones generaron más interacción? ¿Qué canales te traen más clientes? Analiza y ajusta.',
    difficulty: 1,
    estimatedMinutes: 5,
    category: 'marketing',
    iconEmoji: '📊',
    badgeName: 'Marketing Completo',
    isActive: true,
    hasLesson: false,
    isCheckpoint: true,
    moduleName: 'marketing',
    validationType: 'confirm',
    orderIndex: 21,
    steps: [
      {
        id: 'step_1',
        title: 'Revisa tus publicaciones recientes',
        description:
          'Mira tus últimas 5 publicaciones en Instagram u otras redes. ¿Cuál tuvo más likes, comentarios o compartidos? ¿Cuál no funcionó?',
        actionType: 'choice',
        buttonText: 'Revisé mis publicaciones',
        choices: [
          { text: 'Tengo publicaciones con buen engagement', next: 'step_2' },
          { text: 'Ninguna tuvo mucho engagement', next: 'step_2' },
          { text: 'Aún no he publicado nada', next: 'step_2' },
        ],
      },
      {
        id: 'step_2',
        title: 'Evalúa tus herramientas de marketing',
        description:
          '¿Tienes calendario de contenido? ¿Copys escritos? ¿Lead magnet? ¿Has usado Google Ads? Marca lo que ya tienes.',
        actionType: 'choice',
        buttonText: 'Evalué mis herramientas',
        choices: [
          { text: 'Tengo la mayoría de herramientas', next: 'step_3' },
          { text: 'Solo tengo algunas', next: 'step_3' },
          { text: 'Necesito empezar desde cero', next: 'step_3' },
        ],
      },
      {
        id: 'step_3',
        title: 'Planifica tu próxima semana de marketing',
        description:
          'Basándote en lo que aprendiste, escribe 3 acciones concretas para la próxima semana de marketing.',
        actionType: 'confirm',
        buttonText: '✅ Plan de marketing listo',
      },
      {
        id: 'step_complete',
        title: '¡Módulo 3 completado! 🎉',
        description:
          'Completaste el módulo de Marketing. Ya tienes contenido, copys, calendario y herramientas de captación. En el último módulo aprenderás a organizar y automatizar.',
        actionType: 'confirm',
        buttonText: '¡Continuar al Módulo 4!',
      },
    ],
  },

  // ─── MÓDULO 4: Herramientas (días 22-28) ────────────────────────────
  {
    id: 'ch_022',
    slug: 'organiza-google-drive',
    title: 'Organiza tu Google Drive para tu negocio',
    shortDescription: 'Ten todos tus archivos de negocio ordenados y accesibles',
    longDescription:
      'Un Drive desordenado te hace perder tiempo buscando archivos. Organiza tus fotos, documentos, facturas y contratos en carpetas claras. Ahorrarás horas cada mes.',
    difficulty: 1,
    estimatedMinutes: 5,
    category: 'herramientas',
    iconEmoji: '📁',
    badgeName: 'Organizado',
    isActive: true,
    hasLesson: true,
    validationType: 'confirm',
    orderIndex: 22,
    steps: [
      {
        id: 'step_1',
        title: 'Abre Google Drive',
        description:
          'Ve a drive.google.com. Si no tienes cuenta, crea una con tu Gmail. Es gratis con 15 GB de almacenamiento.',
        actionType: 'external_link',
        actionUrl: 'https://drive.google.com',
        buttonText: '✅ Abrí Google Drive',
      },
      {
        id: 'step_2',
        title: 'Crea la estructura de carpetas',
        description:
          'Crea estas carpetas: "Clientes", "Productos", "Facturas", "Marketing", "Legal". Dentro de "Productos" crea subcarpetas por categoría si vendes varios tipos.',
        actionType: 'choice',
        buttonText: 'Ya creé mis carpetas',
        choices: [
          { text: 'Creé las 5 carpetas principales', next: 'step_3' },
          { text: 'Creé 3 carpetas por ahora', next: 'step_3' },
          { text: 'Ya tenía carpetas organizadas', next: 'step_3' },
        ],
      },
      {
        id: 'step_3',
        title: 'Mueve archivos existentes',
        description:
          'Busca archivos sueltos en tu Drive y muévelos a la carpeta correcta. Empieza por las fotos de productos y las facturas.',
        actionType: 'confirm',
        buttonText: '✅ Archivos organizados',
      },
      {
        id: 'step_complete',
        title: '¡Desafío completado! 🎉',
        description:
          'Tu Google Drive está organizado. Ahora encontrarás cualquier archivo de tu negocio en segundos.',
        actionType: 'confirm',
        buttonText: '¡Compartir mi logro!',
      },
    ],
  },
  {
    id: 'ch_023',
    slug: 'respuestas-automaticas-whatsapp',
    title: 'Configura respuestas automáticas en WhatsApp',
    shortDescription: 'Responde al instante sin estar pegado al celular',
    longDescription:
      'Las respuestas automáticas de WhatsApp Business te permiten dar respuesta inmediata cuando no puedes atender. Tus clientes sabrán que su mensaje fue recibido.',
    difficulty: 1,
    estimatedMinutes: 4,
    category: 'herramientas',
    iconEmoji: '⚡',
    badgeName: 'Auto Responde',
    isActive: true,
    hasLesson: true,
    validationType: 'confirm',
    orderIndex: 23,
    steps: [
      {
        id: 'step_1',
        title: 'Abre WhatsApp Business',
        description:
          'Ve a Configuración > Herramientas de empresa > Mensajes fuera de horario y Mensajes de bienvenida.',
        actionType: 'external_link',
        actionUrl: 'https://business.whatsapp.com',
        buttonText: '✅ Abrí WhatsApp Business',
      },
      {
        id: 'step_2',
        title: 'Configura el mensaje de bienvenida',
        description:
          'Escribe un mensaje que se envíe cuando alguien te escriba por primera vez. Ejemplo: "¡Gracias por escribirnos! Te responderemos en breve. Mientras tanto, revisa nuestro catálogo."',
        actionType: 'confirm',
        buttonText: '✅ Mensaje de bienvenida listo',
      },
      {
        id: 'step_3',
        title: 'Configura el mensaje fuera de horario',
        description:
          'Escribe un mensaje para cuando te escriben fuera de tu horario laboral. Incluye tu horario y un número alternativo si aplica.',
        actionType: 'confirm',
        buttonText: '✅ Mensaje fuera de horario listo',
      },
      {
        id: 'step_complete',
        title: '¡Desafío completado! 🎉',
        description:
          'Tus respuestas automáticas están activas. Tus clientes recibirán respuesta al instante aunque no estés disponible.',
        actionType: 'confirm',
        buttonText: '¡Compartir mi logro!',
      },
    ],
  },
  {
    id: 'ch_024',
    slug: 'autenticacion-dos-pasos',
    title: 'Protege tus cuentas con autenticación de 2 pasos',
    shortDescription: 'Añade una capa extra de seguridad a tus cuentas',
    longDescription:
      'Si te hackean tu cuenta de WhatsApp o email, pierdes todo: clientes, contactos, información. La autenticación de 2 pasos es gratis y te protege en minutos.',
    difficulty: 2,
    estimatedMinutes: 5,
    category: 'herramientas',
    iconEmoji: '🔐',
    badgeName: 'Seguro',
    isActive: true,
    hasLesson: true,
    validationType: 'confirm',
    orderIndex: 24,
    steps: [
      {
        id: 'step_1',
        title: 'Actívala en WhatsApp Business',
        description:
          'Ve a Configuración > Cuenta > Verificación en dos pasos. Activa la opción y configura un PIN de 6 dígitos que recuerdes.',
        actionType: 'external_link',
        actionUrl: 'https://business.whatsapp.com',
        buttonText: '✅ WhatsApp protegido',
      },
      {
        id: 'step_2',
        title: 'Actívala en tu Gmail',
        description:
          'Ve a myaccount.google.com > Seguridad > Verificación en dos pasos. Sigue los pasos para activarla con tu número de celular.',
        actionType: 'external_link',
        actionUrl: 'https://myaccount.google.com/security',
        buttonText: '✅ Gmail protegido',
      },
      {
        id: 'step_3',
        title: 'Actívala en Instagram',
        description:
          'Ve a Configuración > Centro de cuentas > Contraseña y seguridad > Autenticación de dos factores. Actívala con tu número de celular.',
        actionType: 'confirm',
        buttonText: '✅ Instagram protegido',
      },
      {
        id: 'step_complete',
        title: '¡Desafío completado! 🎉',
        description:
          'Tus cuentas principales están protegidas con autenticación de 2 pasos. Ahora es mucho más difícil que un hacker acceda a ellas.',
        actionType: 'confirm',
        buttonText: '¡Compartir mi logro!',
      },
    ],
  },
  {
    id: 'ch_025',
    slug: 'google-analytics-web',
    title: 'Configura Google Analytics en tu web',
    shortDescription: 'Mide cuántas personas visitan tu página web',
    longDescription:
      'Google Analytics te dice cuántas personas visitan tu web, de dónde vienen y qué páginas ven. Sin estos datos, estás tomando decisiones a ciegas.',
    difficulty: 3,
    estimatedMinutes: 8,
    category: 'herramientas',
    iconEmoji: '📈',
    badgeName: 'Analista',
    isActive: true,
    hasLesson: true,
    validationType: 'confirm',
    orderIndex: 25,
    steps: [
      {
        id: 'step_1',
        title: 'Crea tu cuenta de Google Analytics',
        description:
          'Ve a analytics.google.com y crea una cuenta gratuita. Selecciona "Web" como plataforma e ingresa la URL de tu sitio.',
        actionType: 'external_link',
        actionUrl: 'https://analytics.google.com',
        buttonText: '✅ Cuenta creada',
      },
      {
        id: 'step_2',
        title: 'Obtén tu código de seguimiento',
        description:
          'Google Analytics te dará un código de seguimiento (tag). Cópialo — lo necesitarás para pegarlo en tu sitio web.',
        actionType: 'choice',
        buttonText: 'Obtuve mi código',
        choices: [
          { text: 'Copié el código correctamente', next: 'step_3' },
          { text: 'No sé dónde pegarlo', next: 'step_3' },
          { text: 'Mi web es en Google Sites', next: 'step_3' },
        ],
      },
      {
        id: 'step_3',
        title: 'Instala el código en tu web',
        description:
          'Pega el código en el <head> de tu sitio. Si usas Google Sites, ve a Configuración > Analítica y pega el ID de seguimiento.',
        actionType: 'confirm',
        buttonText: '✅ Código instalado',
      },
      {
        id: 'step_complete',
        title: '¡Desafío completado! 🎉',
        description:
          'Google Analytics está monitoreando tu web. En 24-48 horas verás datos reales de visitantes.',
        actionType: 'confirm',
        buttonText: '¡Compartir mi logro!',
      },
    ],
  },
  {
    id: 'ch_026',
    slug: 'plantilla-presupuesto-sheets',
    title: 'Crea una plantilla de presupuesto en Google Sheets',
    shortDescription: 'Controla tus ingresos y gastos de forma simple',
    longDescription:
      'Saber cuánto ganas y cuánto gastas es fundamental para crecer. Una hoja de cálculo simple te da control total sobre las finanzas de tu negocio.',
    difficulty: 2,
    estimatedMinutes: 7,
    category: 'herramientas',
    iconEmoji: '💹',
    badgeName: 'Finanzas',
    isActive: true,
    hasLesson: true,
    validationType: 'upload',
    orderIndex: 26,
    steps: [
      {
        id: 'step_1',
        title: 'Abre Google Sheets',
        description:
          'Ve a sheets.google.com y crea una hoja nueva en blanco. Nombrala "Presupuesto [Nombre de tu negocio]".',
        actionType: 'external_link',
        actionUrl: 'https://sheets.google.com',
        buttonText: '✅ Hoja creada',
      },
      {
        id: 'step_2',
        title: 'Crea las columnas de tu presupuesto',
        description:
          'Crea estas columnas: Fecha, Descripción, Tipo (Ingreso/Gasto), Categoría, Monto. Llena al menos 5 filas con transacciones reales o de ejemplo.',
        actionType: 'choice',
        buttonText: 'Ya creé las columnas',
        choices: [
          { text: 'Agregué 5+ transacciones reales', next: 'step_3' },
          { text: 'Agregué datos de ejemplo', next: 'step_3' },
          { text: 'Necesito ver un ejemplo primero', next: 'step_3' },
        ],
      },
      {
        id: 'step_3',
        title: 'Agrega una fórmula de total',
        description:
          'En una celda aparte, usa =SUMA() para calcular el total de ingresos, el total de gastos y la ganancia neta (ingresos - gastos).',
        actionType: 'confirm',
        buttonText: '✅ Fórmulas configuradas',
      },
      {
        id: 'step_complete',
        title: '¡Desafío completado! 🎉',
        description:
          'Tu plantilla de presupuesto está lista. Actualízala cada semana para mantener el control financiero de tu negocio.',
        actionType: 'confirm',
        buttonText: '¡Compartir mi logro!',
      },
    ],
  },
  {
    id: 'ch_027',
    slug: 'automatiza-tareas-zapier',
    title: 'Automatiza tareas con Zapier o IFTTT',
    shortDescription: 'Deja de hacer manualmente lo que puede hacerse solo',
    longDescription:
      'Zapier e IFTTT te permiten conectar aplicaciones y automatizar tareas repetitivas. Por ejemplo: cuando te llegue un email con "pedido", automáticamente crea una tarea en tu lista.',
    difficulty: 3,
    estimatedMinutes: 8,
    category: 'herramientas',
    iconEmoji: '🤖',
    badgeName: 'Automatizador',
    isActive: true,
    hasLesson: true,
    validationType: 'confirm',
    orderIndex: 27,
    steps: [
      {
        id: 'step_1',
        title: 'Crea una cuenta en Zapier o IFTTT',
        description:
          'Zapier es más potente pero de pago. IFTTT es gratuito y más simple para empezar. Elige uno y regístrate.',
        actionType: 'external_link',
        actionUrl: 'https://zapier.com',
        buttonText: '✅ Cuenta creada',
      },
      {
        id: 'step_2',
        title: 'Crea tu primera automatización',
        description:
          'En Zapier: crea un "Zap" como "Cuando me llegue un email con asunto X, enviar un mensaje de WhatsApp". En IFTTT: crea un "Applet" similar.',
        actionType: 'choice',
        buttonText: 'Creé mi automatización',
        choices: [
          { text: 'Conecté email con WhatsApp', next: 'step_3' },
          { text: 'Conecté Google Sheets con email', next: 'step_3' },
          { text: 'No sé qué automatizar', next: 'step_3' },
        ],
      },
      {
        id: 'step_3',
        title: 'Prueba tu automatización',
        description:
          'Activa la automatización y pruébala con un caso real. Verifica que se ejecute correctamente sin que hagas nada manual.',
        actionType: 'confirm',
        buttonText: '✅ Automatización probada',
      },
      {
        id: 'step_complete',
        title: '¡Desafío completado! 🎉',
        description:
          'Tu primera automatización está funcionando. Ahora dedica ese tiempo ahorrado a hacer crecer tu negocio.',
        actionType: 'confirm',
        buttonText: '¡Compartir mi logro!',
      },
    ],
  },
  {
    id: 'ch_028',
    slug: 'checkpoint-transformacion-digital',
    title: 'CHECKPOINT: Evalúa tu transformación digital',
    shortDescription: 'Mira todo lo que has logrado en 28 días',
    longDescription:
      'Llegaste al final. En 28 días pasaste de no tener presencia digital a tener una estrategia completa. Este checkpoint te ayuda a ver tu progreso y planificar el siguiente paso.',
    difficulty: 1,
    estimatedMinutes: 5,
    category: 'herramientas',
    iconEmoji: '🏆',
    badgeName: 'Transformación Completa',
    isActive: true,
    hasLesson: false,
    isCheckpoint: true,
    moduleName: 'herramientas',
    validationType: 'confirm',
    orderIndex: 28,
    steps: [
      {
        id: 'step_1',
        title: 'Revisa tu presencia digital',
        description:
          '¿Tu negocio aparece en Google? ¿Tienes redes sociales activas? ¿Tienes página web? Marca lo que ya tienes configurado.',
        actionType: 'choice',
        buttonText: 'Revisé mi presencia',
        choices: [
          { text: 'Tengo todo configurado', next: 'step_2' },
          { text: 'Tengo la mayoría de cosas', next: 'step_2' },
          { text: 'Solo tengo lo básico', next: 'step_2' },
        ],
      },
      {
        id: 'step_2',
        title: 'Revisa tu sistema de ventas',
        description:
          '¿Puedes cobrar por WhatsApp? ¿Tienes catálogo? ¿Facturas? ¿Tienes carrito o sistema de pedidos? Marca lo que ya tienes.',
        actionType: 'choice',
        buttonText: 'Revisé mis ventas',
        choices: [
          { text: 'Mi sistema de ventas está completo', next: 'step_3' },
          { text: 'Tengo algunas herramientas', next: 'step_3' },
          { text: 'Necesito mejorar varias cosas', next: 'step_3' },
        ],
      },
      {
        id: 'step_3',
        title: 'Escribe tu plan de crecimiento',
        description:
          'Basándote en todo lo aprendido, escribe 3 metas concretas para los próximos 30 días. Ejemplo: "Vender X por WhatsApp", "Conseguir Y seguidores", "Facturar Z".',
        actionType: 'confirm',
        buttonText: '✅ Mi plan listo',
      },
      {
        id: 'step_complete',
        title: '¡FELICIDADES! 🎉🏆',
        description:
          'Completaste Digitalízate. Tu negocio tiene presencia digital, sistema de ventas, estrategia de marketing y herramientas profesionales. Ahora sigue adelante y haz crecer tu negocio.',
        actionType: 'confirm',
        buttonText: '¡Celebra tu logro!',
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
