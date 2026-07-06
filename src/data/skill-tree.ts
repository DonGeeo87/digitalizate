export interface SkillNode {
  id: string
  name: string
  description: string
  iconEmoji: string
  level: number
  challengeSlugs: string[]
  xpRequired: number
}

export interface SkillBranch {
  id: string
  name: string
  description: string
  iconEmoji: string
  color: string
  nodes: SkillNode[]
}

export const SKILL_TREE: SkillBranch[] = [
  {
    id: 'presencia',
    name: 'Presencia Digital',
    description: 'Aparece en Google, configura redes, crea tu web',
    iconEmoji: '🌐',
    color: 'from-blue-500 to-cyan-500',
    nodes: [
      { id: 'pres-1', name: 'Google Maps', description: 'Tu negocio aparece en Google Maps', iconEmoji: '📍', level: 1, challengeSlugs: ['google-maps'], xpRequired: 100 },
      { id: 'pres-2', name: 'WhatsApp Business', description: 'Perfil profesional de WhatsApp', iconEmoji: '💬', level: 2, challengeSlugs: ['whatsapp-perfil'], xpRequired: 300 },
      { id: 'pres-3', name: 'Redes Sociales', description: 'Instagram y Facebook optimizados', iconEmoji: '📸', level: 3, challengeSlugs: ['instagram-perfil', 'facebook-pagina'], xpRequired: 600 },
      { id: 'pres-4', name: 'Web Profesional', description: 'Landing page de tu negocio', iconEmoji: '🖥️', level: 4, challengeSlugs: ['landing-basica'], xpRequired: 1000 },
      { id: 'pres-5', name: 'Reseñas y Reputación', description: 'Gestiona reseñas y reputación online', iconEmoji: '⭐', level: 5, challengeSlugs: ['gestion-resenas'], xpRequired: 1500 },
    ],
  },
  {
    id: 'ventas',
    name: 'Ventas y Pagos',
    description: 'Acepta pagos, automatiza cobros, vende online',
    iconEmoji: '🛒',
    color: 'from-emerald-500 to-teal-500',
    nodes: [
      { id: 'vent-1', name: 'Links de Pago', description: 'Crea links para cobrar', iconEmoji: '🔗', level: 1, challengeSlugs: ['link-pago'], xpRequired: 100 },
      { id: 'vent-2', name: 'Cobros Automáticos', description: 'Automatiza cobros recurrentes', iconEmoji: '🔄', level: 2, challengeSlugs: ['cobros-automaticos'], xpRequired: 300 },
      { id: 'vent-3', name: 'Catálogo Digital', description: 'Catálogo de productos online', iconEmoji: '📋', level: 3, challengeSlugs: ['catalogo-digital'], xpRequired: 600 },
      { id: 'vent-4', name: 'Tienda Online', description: 'Vende directamente desde tu web', iconEmoji: '🛍️', level: 4, challengeSlugs: ['tienda-online'], xpRequired: 1000 },
      { id: 'vent-5', name: 'Facturación Electrónica', description: 'Factura electrónica y boletas', iconEmoji: '📄', level: 5, challengeSlugs: ['facturacion-electronica'], xpRequired: 1500 },
    ],
  },
  {
    id: 'marketing',
    name: 'Marketing Digital',
    description: 'Crea contenido, atrae clientes, haz crecer tu marca',
    iconEmoji: '📢',
    color: 'from-orange-500 to-amber-500',
    nodes: [
      { id: 'mkt-1', name: 'Contenido Visual', description: 'Diseña posts para redes', iconEmoji: '🎨', level: 1, challengeSlugs: ['diseno-posts'], xpRequired: 100 },
      { id: 'mkt-2', name: 'Copywriting', description: 'Escribe textos que venden', iconEmoji: '✍️', level: 2, challengeSlugs: ['copywriting'], xpRequired: 300 },
      { id: 'mkt-3', name: 'Calendario Editorial', description: 'Planifica tu contenido semanal', iconEmoji: '📅', level: 3, challengeSlugs: ['calendario-contenido'], xpRequired: 600 },
      { id: 'mkt-4', name: 'Anuncios Digitales', description: 'Crea y optimiza campañas de ads', iconEmoji: '📊', level: 4, challengeSlugs: ['anuncios-digitales'], xpRequired: 1000 },
      { id: 'mkt-5', name: 'Email Marketing', description: 'Newsletter y automatización de emails', iconEmoji: '📧', level: 5, challengeSlugs: ['email-marketing'], xpRequired: 1500 },
    ],
  },
  {
    id: 'herramientas',
    name: 'Herramientas',
    description: 'Organiza, protege y optimiza tu negocio',
    iconEmoji: '🔧',
    color: 'from-purple-500 to-violet-500',
    nodes: [
      { id: 'herr-1', name: 'Drive y Docs', description: 'Organiza tus archivos en la nube', iconEmoji: '☁️', level: 1, challengeSlugs: ['organizar-drive'], xpRequired: 100 },
      { id: 'herr-2', name: 'Respuestas Automáticas', description: 'Configura chatbots y respuestas rápidas', iconEmoji: '🤖', level: 2, challengeSlugs: ['respuestas-automaticas'], xpRequired: 300 },
      { id: 'herr-3', name: 'Seguridad Digital', description: 'Protege tus cuentas y datos', iconEmoji: '🔒', level: 3, challengeSlugs: ['seguridad-digital'], xpRequired: 600 },
      { id: 'herr-4', name: 'Analítica', description: 'Mide resultados con datos', iconEmoji: '📈', level: 4, challengeSlugs: ['analitica-basica'], xpRequired: 1000 },
      { id: 'herr-5', name: 'Automatización', description: 'Automatiza tareas repetitivas', iconEmoji: '⚡', level: 5, challengeSlugs: ['automatizacion'], xpRequired: 1500 },
    ],
  },
]

export function getNodeStatus(
  node: SkillNode,
  nodeIndex: number,
  progress: Record<string, { status: string }>,
  previousNodeUnlocked: boolean,
): 'unlocked' | 'available' | 'locked' {
  const allCompleted = node.challengeSlugs.every(
    (slug) => progress[slug]?.status === 'completed',
  )
  if (allCompleted) return 'unlocked'
  if (nodeIndex === 0 || previousNodeUnlocked) return 'available'
  return 'locked'
}
