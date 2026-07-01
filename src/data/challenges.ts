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
]

export function getChallengeBySlug(slug: string): Challenge | undefined {
  return challenges.find((c) => c.slug === slug)
}

export function getActiveChallenges(): Challenge[] {
  return challenges.filter((c) => c.isActive).sort((a, b) => a.orderIndex - b.orderIndex)
}