import type { AparAsset } from '../types'

const API_BASE_URL = (import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api/v1').replace(/\/$/, '')
const ACCESS_TOKEN_KEY = 'apar-access-token'

type ApiErrorBody = { message?: string | string[] }

export interface ApiLocation {
  _id: string
  name: string
  code: string
}

export interface LoginResponse {
  accessToken: string
  user: { id: string; email: string; name?: string; role: string }
}

export interface PaginatedResponse<T> {
  data: T[]
  meta: { page: number; limit: number; total: number; totalPages: number }
}

export interface InspectionRecord {
  _id: string
  reference: string
  aparId: string
  aparSnapshot: { code?: string; type?: string; capacity?: string }
  inspectorName: string
  locationName: string
  inspectedAt: string
  overallCondition: 'good' | 'needs_repair' | 'damaged'
  answers: Array<{ questionId: string; question: string; category: string; answer: string; notes?: string }>
}

export interface DashboardSummary {
  totalApar: number
  totalInspections: number
  conditionDistribution: Record<string, number>
  recentInspections: InspectionRecord[]
}

export type ScheduleStatus = 'scheduled' | 'due_soon' | 'overdue' | 'completed'
export interface ScheduleRecord {
  _id: string
  aparId: string
  aparSnapshot: { code?: string; type?: string; capacity?: string }
  locationName: string
  scheduledFor: string
  assignedTo?: string
  notes?: string
  status: ScheduleStatus
}

export type CorrectiveActionStatus = 'open' | 'in_progress' | 'pending_verification' | 'completed'
export type CorrectiveActionPriority = 'low' | 'medium' | 'high' | 'critical'
export interface CorrectiveActionRecord {
  _id: string
  inspectionId: string
  inspectionReference: string
  aparId: string
  aparSnapshot: { code?: string; type?: string }
  title: string
  description: string
  priority: CorrectiveActionPriority
  status: CorrectiveActionStatus
  assigneeName?: string
  dueDate: string
  completedAt?: string
}

function getToken() {
  return sessionStorage.getItem(ACCESS_TOKEN_KEY)
}

async function request<T>(path: string, options: RequestInit = {}): Promise<T> {
  const headers = new Headers(options.headers)
  headers.set('Content-Type', 'application/json')
  const token = getToken()
  if (token) headers.set('Authorization', `Bearer ${token}`)

  const response = await fetch(`${API_BASE_URL}${path}`, { ...options, headers })
  if (!response.ok) {
    let message = `Permintaan gagal (${response.status})`
    try {
      const body = (await response.json()) as ApiErrorBody
      if (body.message) message = Array.isArray(body.message) ? body.message.join(', ') : body.message
    } catch {
      // Keep the HTTP status message when the backend does not return JSON.
    }
    throw new Error(message)
  }
  return response.json() as Promise<T>
}

function mapAsset(asset: Record<string, unknown>): AparAsset {
  const location = typeof asset.locationId === 'object' && asset.locationId !== null
    ? (asset.locationId as { name?: string }).name
    : undefined
  const latestInspection = typeof asset.latestInspection === 'object' && asset.latestInspection !== null
    ? asset.latestInspection as { inspectedAt?: string; inspectorName?: string; overallCondition?: string }
    : null
  const inspectionCondition = latestInspection?.overallCondition
  const nextSchedule = typeof asset.nextSchedule === 'object' && asset.nextSchedule !== null
    ? asset.nextSchedule as { scheduledFor?: string }
    : null
  return {
    id: String(asset._id ?? asset.id),
    code: String(asset.code ?? ''),
    type: String(asset.type ?? ''),
    locationId: String(typeof asset.locationId === 'string' ? asset.locationId : ''),
    capacity: String(asset.capacity ?? ''),
    locationName: [location, asset.specificLocation].filter(Boolean).join(' · ') || String(asset.locationId ?? ''),
    condition: inspectionCondition === 'good' || inspectionCondition === 'needs_repair' || inspectionCondition === 'damaged'
      ? inspectionCondition
      : ['active', 'inactive', 'out_of_service'].includes(String(asset.operationalStatus))
        ? String(asset.operationalStatus) as AparAsset['condition']
        : 'not_inspected',
    lastInspectionAt: latestInspection?.inspectedAt ? String(latestInspection.inspectedAt) : null,
    lastInspectorName: latestInspection?.inspectorName ? String(latestInspection.inspectorName) : null,
    nextInspectionAt: nextSchedule?.scheduledFor ? String(nextSchedule.scheduledFor).slice(0, 10) : null,
  }
}

export const api = {
  login(email: string, password: string) {
    return request<LoginResponse>('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    })
  },
  getLocations() {
    return request<ApiLocation[]>('/locations')
  },
  createLocation(payload: { name: string; code: string; description?: string }) {
    return request<ApiLocation>('/locations', { method: 'POST', body: JSON.stringify(payload) })
  },
  async getAssets(search?: string) {
    const query = search ? `?search=${encodeURIComponent(search)}` : ''
    const response = await request<PaginatedResponse<Record<string, unknown>>>(`/apar${query}`)
    return { ...response, data: response.data.map(mapAsset) }
  },
  createAsset(payload: {
    code: string
    type: string
    brand: string
    capacity?: string
    serialNumber?: string
    locationId: string
    specificLocation?: string
    installedAt?: string
    serviceDueAt?: string
    inspectionIntervalDays?: number
    notes?: string
  }) {
    return request<Record<string, unknown>>('/apar', { method: 'POST', body: JSON.stringify(payload) }).then(mapAsset)
  },
  getAsset(id: string) {
    return request<Record<string, unknown>>(`/apar/${encodeURIComponent(id)}`).then(mapAsset)
  },
  createInspection(payload: {
    aparId: string
    inspectorName: string
    locationName: string
    inspectedAt: string
    answers: Array<{ questionId: string; question: string; category: string; answer: string; notes?: string }>
    notes?: string
  }) {
    return request<InspectionRecord>('/inspections', { method: 'POST', body: JSON.stringify(payload) })
  },
  getInspections(search?: string) {
    const query = search ? `?search=${encodeURIComponent(search)}` : ''
    return request<PaginatedResponse<InspectionRecord>>(`/inspections${query}`)
  },
  getDashboardSummary() {
    return request<DashboardSummary>('/dashboard/summary')
  },
  getSchedules(status?: ScheduleStatus) {
    const query = status ? `?status=${encodeURIComponent(status)}` : ''
    return request<ScheduleRecord[]>(`/schedules${query}`)
  },
  createSchedule(payload: { aparId: string; locationName: string; scheduledFor: string; assignedTo?: string; notes?: string }) {
    return request<ScheduleRecord>('/schedules', { method: 'POST', body: JSON.stringify(payload) })
  },
  updateSchedule(id: string, payload: { status?: ScheduleStatus; scheduledFor?: string; assignedTo?: string; notes?: string }) {
    return request<ScheduleRecord>(`/schedules/${encodeURIComponent(id)}`, { method: 'PATCH', body: JSON.stringify(payload) })
  },
  getCorrectiveActions(status?: CorrectiveActionStatus) {
    const query = status ? `?status=${encodeURIComponent(status)}` : ''
    return request<CorrectiveActionRecord[]>(`/corrective-actions${query}`)
  },
  createCorrectiveAction(payload: { inspectionId: string; title: string; description: string; priority: CorrectiveActionPriority; dueDate: string; assigneeName?: string }) {
    return request<CorrectiveActionRecord>('/corrective-actions', { method: 'POST', body: JSON.stringify(payload) })
  },
  updateCorrectiveActionStatus(id: string, status: CorrectiveActionStatus) {
    return request<CorrectiveActionRecord>(`/corrective-actions/${encodeURIComponent(id)}/status`, { method: 'PATCH', body: JSON.stringify({ status }) })
  },
}

export function saveAccessToken(token: string) {
  sessionStorage.setItem(ACCESS_TOKEN_KEY, token)
}

export function clearAccessToken() {
  sessionStorage.removeItem(ACCESS_TOKEN_KEY)
}

export function hasAccessToken() {
  return Boolean(getToken())
}
