import { LessonContent } from '@/types/lesson'

export const lessons: LessonContent[] = [
  // ─── DESAFÍO 1: Aparece en Google Maps ───
  {
    challengeSlug: 'aparece-en-google-maps',
    title: 'Por qué Google Maps importa para tu negocio',
    introHook: '¿Sabías que el 86% de las personas busca un negocio en Google Maps antes de visitarlo? Si no apareces, estás perdiendo clientes sin saberlo.',
    keyPoints: [
      {
        icon: '📍',
        title: 'Google Mi Negocio es gratis',
        text: 'Crear tu ficha en Google Mi Negocio no cuesta nada. Solo necesitas verificar tu negocio y completar tu perfil con datos reales.',
      },
      {
        icon: '🔍',
        title: 'Los clientes te buscan por nombre o categoría',
        text: 'Cuando alguien busca "panadería cerca de mí" o tu nombre, Google muestra los negocios más relevantes. Sin ficha, no existes.',
      },
      {
        icon: '⭐',
        title: 'Las reseñas te dan prioridad',
        text: 'Google prioriza negocios con más reseñas y mejores calificaciones. Pedir reseñas a clientes satisfechos es una estrategia poderosa.',
      },
    ],
    summary: 'Recuerda: Google Maps es tu vitrina digital más importante. Crear tu ficha es el primer paso para que los clientes te encuentren.',
    quiz: [
      {
        id: 'q1',
        type: 'true_false',
        question: 'Crear una ficha en Google Mi Negocio tiene un costo mensual.',
        options: ['Verdadero', 'Falso'],
        correctIndex: 1,
        explanation: 'Google Mi Negocio es completamente gratis. Solo necesitas verificar que eres el dueño del negocio.',
      },
      {
        id: 'q2',
        type: 'multiple_choice',
        question: '¿Cuál es el primer paso para que tu negocio aparezca en Google Maps?',
        options: [
          'Crear un sitio web',
          'Crear una ficha en Google Mi Negocio',
          'Tener redes sociales activas',
          'Publicar anuncios en Google',
        ],
        correctIndex: 1,
        explanation: 'Lo primero es crear tu ficha en Google Mi Negocio (google.com/business). Sin ella, tu negocio no aparece en el mapa.',
      },
      {
        id: 'q3',
        type: 'fill_blank',
        question: 'Completa: Si tu negocio no aparece en ___, estás perdiendo clientes.',
        sentence: 'Si tu negocio no aparece en ___, estás perdiendo clientes.',
        blankAnswer: 'Google Maps',
        explanation: 'Google Maps es donde la mayoría de personas buscan negocios locales antes de visitarlos.',
      },
      {
        id: 'q4',
        type: 'order_steps',
        question: 'Ordena los pasos para configurar tu presencia en Google Maps:',
        options: [
          'Verificar tu negocio',
          'Crear ficha en Google Mi Negocio',
          'Agregar horario, teléfono y fotos',
          'Compartir tu link de ubicación',
        ],
        correctOrder: [
          'Crear ficha en Google Mi Negocio',
          'Verificar tu negocio',
          'Agregar horario, teléfono y fotos',
          'Compartir tu link de ubicación',
        ],
        explanation: 'Primero creas la ficha, luego la verificas, completas los datos y finalmente compartes tu link para que los clientes te encuentren.',
      },
    ],
  },

  // ─── DESAFÍO 2: Horario en WhatsApp ───
  {
    challengeSlug: 'configura-horario-whatsapp',
    title: 'WhatsApp Business: más que un chat',
    introHook: '¿Sabías que el 70% de las personas prefiere escribir por WhatsApp antes de llamar? Configurar tu horario profesionaliza tu negocio.',
    keyPoints: [
      {
        icon: '⏰',
        title: 'El horario genera confianza',
        text: 'Cuando tus clientes ven tu horario de atención, saben cuándo esperar respuesta. Reduce la frustración y mejora la experiencia.',
      },
      {
        icon: '🤖',
        title: 'Los mensajes automáticos ahorran tiempo',
        text: 'Configura un mensaje fuera de horario para que tus clientes sepan que recibiste su mensaje y responderás pronto.',
      },
      {
        icon: '💼',
        title: 'WhatsApp Business ≠ WhatsApp normal',
        text: 'WhatsApp Business tiene herramientas gratuitas diseñadas para negocios: catálogo, respuestas rápidas, etiquetas y estadísticas.',
      },
    ],
    summary: 'Recuerda: Configurar tu horario y mensaje automático profesionaliza tu negocio y genera confianza desde el primer contacto.',
    quiz: [
      {
        id: 'q1',
        type: 'true_false',
        question: 'El 70% de las personas prefiere escribir por WhatsApp antes de llamar.',
        options: ['Verdadero', 'Falso'],
        correctIndex: 0,
        explanation: 'Estudios recientes muestran que la mayoría de personas prefiere comunicación por mensajería sobre llamadas telefónicas.',
      },
      {
        id: 'q2',
        type: 'multiple_choice',
        question: '¿Qué herramienta de WhatsApp Business te permite mostrar tus productos directamente en la app?',
        options: [
          'Estado de WhatsApp',
          'Catálogo',
          'Grupos de difusión',
          'Mensajes de voz',
        ],
        correctIndex: 1,
        explanation: 'El catálogo de WhatsApp Business te permite mostrar productos con fotos, precios y descripciones sin salir de la app.',
      },
      {
        id: 'q3',
        type: 'fill_blank',
        question: 'Completa: Configurar un mensaje ___ te permite responder automáticamente cuando estás fuera del horario.',
        sentence: 'Configurar un mensaje ___ te permite responder automáticamente cuando estás fuera del horario.',
        blankAnswer: 'automático',
        explanation: 'Los mensajes automáticos fuera de horario hacen que tus clientes sepan que recibirán respuesta pronto.',
      },
      {
        id: 'q4',
        type: 'true_false',
        question: 'WhatsApp Business y WhatsApp normal son la misma aplicación.',
        options: ['Verdadero', 'Falso'],
        correctIndex: 1,
        explanation: 'Son aplicaciones diferentes. WhatsApp Business tiene herramientas adicionales para negocios como catálogo, respuestas rápidas y estadísticas.',
      },
    ],
  },

  // ─── DESAFÍO 3: Link de pago ───
  {
    challengeSlug: 'crea-link-de-pago',
    title: 'Cobra online sin tienda física',
    introHook: '¿Sabías que puedes cobrar por WhatsApp sin tener tienda física? Un link de pago te permite vender por cualquier canal digital.',
    keyPoints: [
      {
        icon: '💳',
        title: 'Los links de pago son seguros',
        text: 'MercadoPago, Stripe y otros proveedores manejan la seguridad del pago. Tú solo envías el link y el cliente paga con tarjeta, OAPP o transferencia.',
      },
      {
        icon: '📱',
        title: 'Funciona por WhatsApp, Instagram y más',
        text: 'Puedes enviar tu link de pago por WhatsApp, redes sociales, email o incluso imprimirlo en un QR para tu local.',
      },
      {
        icon: '🔒',
        title: 'La confianza se construye con profesionales',
        text: 'Un link de pago personalizado se ve más profesional que pedir una transferencia bancaria directa. Genera confianza.',
      },
    ],
    summary: 'Recuerda: Un link de pago profesionaliza tu negocio y te permite cobrar por cualquier canal digital de forma segura.',
    quiz: [
      {
        id: 'q1',
        type: 'true_false',
        question: 'Necesitas una tienda física para crear links de pago.',
        options: ['Verdadero', 'Falso'],
        correctIndex: 1,
        explanation: 'Los links de pago funcionan 100% online. Puedes cobrar por WhatsApp, redes sociales o cualquier canal digital sin tienda física.',
      },
      {
        id: 'q2',
        type: 'multiple_choice',
        question: '¿Cuál es la ventaja principal de un link de pago sobre una transferencia bancaria?',
        options: [
          'Es más rápido de crear',
          'El cliente paga con tarjeta u OAPP sin datos bancarios',
          'No comisiona',
          'Funciona sin internet',
        ],
        correctIndex: 1,
        explanation: 'El link de pago permite al cliente pagar con tarjeta, OAPP o transferencia sin necesidad de compartir datos bancarios.',
      },
      {
        id: 'q3',
        type: 'order_steps',
        question: 'Ordena los pasos para cobrar con un link de pago:',
        options: [
          'Envía el link al cliente',
          'Crea una cuenta en MercadoPago',
          'Crea el link de pago con precio y descripción',
          'Verifica que el cliente pudo pagar',
        ],
        correctOrder: [
          'Crea una cuenta en MercadoPago',
          'Crea el link de pago con precio y descripción',
          'Envía el link al cliente',
          'Verifica que el cliente pudo pagar',
        ],
        explanation: 'Primero necesitas una cuenta, luego creas el link con los datos del producto, lo envías al cliente y verificas el pago.',
      },
      {
        id: 'q4',
        type: 'fill_blank',
        question: 'Completa: Un link de pago profesional genera más ___ que una transferencia bancaria directa.',
        sentence: 'Un link de pago profesional genera más ___ que una transferencia bancaria directa.',
        blankAnswer: 'confianza',
        explanation: 'La profesionalidad del proceso de pago genera confianza en el cliente, lo que aumenta las probabilidades de compra.',
      },
    ],
  },

  // ─── DESAFÍO 4: Foto de perfil ───
  {
    challengeSlug: 'foto-de-perfil-profesional',
    title: 'Tu foto es tu primera impresión digital',
    introHook: '¿Sabías que los usuarios forman una opinión sobre tu negocio en 0.05 segundos? Una buena foto de perfil puede marcar la diferencia.',
    keyPoints: [
      {
        icon: '📸',
        title: 'La luz natural es tu mejor aliada',
        text: 'Una foto junto a una ventana con luz natural se ve profesional sin necesidad de equipo costoso. Solo necesitas tu celular.',
      },
      {
        icon: '🎯',
        title: 'Consistencia en todos los canales',
        text: 'Usa la misma foto de perfil en WhatsApp Business, Google Mi Negocio, Instagram y todas tus redes. Esto genera reconocimiento.',
      },
      {
        icon: '✨',
        title: 'Un fondo limpio marca la diferencia',
        text: 'Un fondo neutro o limpio hace que tu foto se vea profesional. Evita fondos desordenados o con mucha distractión.',
      },
    ],
    summary: 'Recuerda: Tu foto de perfil es lo primero que ven tus clientes. Una foto profesional con buena luz y fondo limpio genera confianza.',
    quiz: [
      {
        id: 'q1',
        type: 'true_false',
        question: 'Los usuarios forman una opinión sobre tu negocio en 0.05 segundos.',
        options: ['Verdadero', 'Falso'],
        correctIndex: 0,
        explanation: 'Estudios muestran que la primera impresión visual se forma en milisegundos. Tu foto de perfil es crucial.',
      },
      {
        id: 'q2',
        type: 'multiple_choice',
        question: '¿Cuál es la mejor fuente de luz para una foto profesional con celular?',
        options: [
          'Flash del celular',
          'Luz artificial de techo',
          'Luz natural junto a una ventana',
          'Luz de neón',
        ],
        correctIndex: 2,
        explanation: 'La luz natural junto a una ventana es la mejor opción: es suave, gratuita y hace que tu foto se vea profesional.',
      },
      {
        id: 'q3',
        type: 'fill_blank',
        question: 'Completa: Usa la misma foto en todos los canales para generar ___.',
        sentence: 'Usa la misma foto en todos los canales para generar ___.',
        blankAnswer: 'reconocimiento',
        explanation: 'La consistencia visual en todos los canales ayuda a que los clientes te reconozcan al instante.',
      },
      {
        id: 'q4',
        type: 'true_false',
        question: 'Es mejor usar diferentes fotos en cada red social para verse más variado.',
        options: ['Verdadero', 'Falso'],
        correctIndex: 1,
        explanation: 'Usar la misma foto en todos los canales genera reconocimiento y profesionalismo. La consistencia es clave.',
      },
    ],
  },

  // ─── DESAFÍO 5: Responder reseñas ───
  {
    challengeSlug: 'responde-resenas-google',
    title: 'Las reseñas son tu reputación digital',
    introHook: '¿Sabías que las empresas que responden reseñas reciben un 45% más de visitas? Responder no es opcional, es estrategia.',
    keyPoints: [
      {
        icon: '⭐',
        title: 'Responder genera más confianza',
        text: 'Cuando potenciales clientes ven que respondes reseñas, saben que te importa la experiencia de tus clientes.',
      },
      {
        icon: '💬',
        title: 'Las reseñas negativas son oportunidades',
        text: 'Responder una reseña negativa con empatía y una solución puede convertir un cliente enojado en uno leal.',
      },
      {
        icon: '📈',
        title: 'Las reseñas mejoran tu ranking',
        text: 'Google prioriza negocios con más reseñas y mejores calificaciones. Más reseñas = más visibilidad.',
      },
    ],
    summary: 'Recuerda: Responder reseñas (positivas y negativas) demuestra que te importan tus clientes y mejora tu ranking en Google.',
    quiz: [
      {
        id: 'q1',
        type: 'true_false',
        question: 'Las empresas que responden reseñas reciben un 45% más de visitas.',
        options: ['Verdadero', 'Falso'],
        correctIndex: 0,
        explanation: 'Estudios de Google muestran que responder reseñas aumenta significativamente las visitas a tu negocio.',
      },
      {
        id: 'q2',
        type: 'multiple_choice',
        question: '¿Cómo debes responder una reseña negativa?',
        options: [
          'Ignorarla para que desaparezca',
          'Eliminarla desde tu perfil',
          'Responder con empatía y ofrecer una solución',
          'Pedir a amigos que la reporten',
        ],
        correctIndex: 2,
        explanation: 'Responder con empatía y una solución demuestra profesionalismo y puede convertir un cliente enojado en uno leal.',
      },
      {
        id: 'q3',
        type: 'fill_blank',
        question: 'Completa: Las reseñas mejoran tu ___ en Google.',
        sentence: 'Las reseñas mejoran tu ___ en Google.',
        blankAnswer: 'ranking',
        explanation: 'Google prioriza negocios con más reseñas y mejores calificaciones en los resultados de búsqueda.',
      },
      {
        id: 'q4',
        type: 'order_steps',
        question: 'Ordena los pasos para gestionar reseñas de Google:',
        options: [
          'Escribe una respuesta personalizada',
          'Lee cada reseña atentamente',
          'Abre tu ficha de Google Mi Negocio',
          'Identifica reseñas positivas y negativas',
        ],
        correctOrder: [
          'Abre tu ficha de Google Mi Negocio',
          'Lee cada reseña atentamente',
          'Identifica reseñas positivas y negativas',
          'Escribe una respuesta personalizada',
        ],
        explanation: 'Primero accedes a tu ficha, lees las reseñas, las clasificas y luego escribes respuestas personalizadas para cada una.',
      },
    ],
  },

  // ─── DESAFÍO 6: Catálogo WhatsApp ───
  {
    challengeSlug: 'catalogo-whatsapp',
    title: 'Tu tienda virtual en el bolsillo',
    introHook: '¿Sabías que el catálogo de WhatsApp Business te permite vender sin sitio web? Tus clientes pueden ver productos, precios y fotos directamente en el chat.',
    keyPoints: [
      {
        icon: '📦',
        title: 'Tu catálogo es tu tienda 24/7',
        text: 'Los clientes pueden ver tus productos a cualquier hora, sin necesidad de escribirte. EstoReduce la carga de consultas.',
      },
      {
        icon: '💰',
        title: 'Incluir precios genera más ventas',
        text: 'Los productos con precios visibles tienen más probabilidades de generar ventas. Los clientes comparan antes de escribir.',
      },
      {
        icon: '📸',
        title: 'Las fotos de calidad venden',
        text: 'Un producto con foto clara y profesional se vende 3 veces más que uno sin foto. Invierte en buenas imágenes.',
      },
    ],
    summary: 'Recuerda: Tu catálogo de WhatsApp es tu tienda virtual. Sube productos con fotos claras, precios visibles y descripciones atractivas.',
    quiz: [
      {
        id: 'q1',
        type: 'true_false',
        question: 'El catálogo de WhatsApp Business permite vender sin sitio web.',
        options: ['Verdadero', 'Falso'],
        correctIndex: 0,
        explanation: 'El catálogo funciona como una tienda virtual integrada en WhatsApp. Los clientes pueden ver productos, precios y fotos sin salir de la app.',
      },
      {
        id: 'q2',
        type: 'multiple_choice',
        question: '¿Qué elemento es más importante en una foto de producto?',
        options: [
          'Que sea oscura y artística',
          'Que sea clara y muestre bien el producto',
          'Que tenga muchos filtros',
          'Que sea una imagen de stock',
        ],
        correctIndex: 1,
        explanation: 'Las fotos claras que muestran bien el producto generan más confianza y ventas. La claridad es clave.',
      },
      {
        id: 'q3',
        type: 'fill_blank',
        question: 'Completa: Los productos con precios ___ tienen más probabilidades de generar ventas.',
        sentence: 'Los productos con precios ___ tienen más probabilidades de generar ventas.',
        blankAnswer: 'visibles',
        explanation: 'Incluir precios en tu catálogo genera más confianza y facilita la decisión de compra del cliente.',
      },
      {
        id: 'q4',
        type: 'true_false',
        question: 'Es mejor no poner precios en el catálogo para que los clientes pregunten.',
        options: ['Verdadero', 'Falso'],
        correctIndex: 1,
        explanation: 'Los precios visibles generan más ventas porque los clientes pueden comparar y decidir sin fricción. La transparencia genera confianza.',
      },
    ],
  },
]

export function getLessonBySlug(slug: string): LessonContent | undefined {
  return lessons.find((l) => l.challengeSlug === slug)
}
