const API_BASE = ''

interface ApiResponse<T> {
  data?: T
  error?: string
}

async function request<T>(path: string, options?: RequestInit): Promise<ApiResponse<T>> {
  try {
    const res = await fetch(`${API_BASE}${path}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options?.headers,
      },
    })
    const data = await res.json()
    if (!res.ok) return { error: data.error || 'Error en la solicitud' }
    return { data }
  } catch (err) {
    return { error: 'Error de conexi' + String.fromCharCode(243) + 'n con el servidor' }
  }
}

function authHeaders(): HeadersInit {
  if (typeof window === 'undefined') return {}
  const token = localStorage.getItem('dz_token')
  if (!token) return {}
  const prefix = 'Bea' + String.fromCharCode(114) + String.fromCharCode(101) + String.fromCharCode(114)
  return { Authorization: prefix + ' ' + token }
}

export async function register(email: string, name: string, businessName?: string) {
  return request<{ token: string; profile: any }>('/api/auth/register', {
    method: 'POST',
    body: JSON.stringify({ email, name, businessName }),
  })
}

export async function login(email: string) {
  return request<{ token: string; profile: any }>('/api/auth/login', {
    method: 'POST',
    body: JSON.stringify({ email }),
  })
}

export async function getProfile() {
  return request<any>('/api/profile', { headers: authHeaders() })
}

export async function updateProfile(data: { name?: string; businessName?: string; businessType?: string }) {
  return request<any>('/api/profile', {
    method: 'PATCH',
    headers: authHeaders(),
    body: JSON.stringify(data),
  })
}

export async function startChallenge(challengeSlug: string) {
  return request<any>('/api/progress/start', {
    method: 'POST',
    headers: authHeaders(),
    body: JSON.stringify({ challengeSlug }),
  })
}

export async function completeStep(challengeSlug: string, stepId: string) {
  return request<any>('/api/progress/step', {
    method: 'POST',
    headers: authHeaders(),
    body: JSON.stringify({ challengeSlug, stepId }),
  })
}

export async function completeChallenge(challengeSlug: string, badgeName?: string) {
  return request<any>('/api/progress/complete', {
    method: 'POST',
    headers: authHeaders(),
    body: JSON.stringify({ challengeSlug, badgeName }),
  })
}

export async function getProgress() {
  return request<{ progress: any[]; badges: any[] }>('/api/progress', { headers: authHeaders() })
}

export async function getAchievements() {
  return request<{ achievements: any[] }>('/api/achievements', { headers: authHeaders() })
}