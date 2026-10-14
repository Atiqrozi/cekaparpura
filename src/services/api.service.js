const API_BASE_URL = (import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api/v1').replace(/\/$/, '');
const ACCESS_TOKEN_KEY = 'apar-access-token';
function getToken() {
    return sessionStorage.getItem(ACCESS_TOKEN_KEY);
}
async function request(path, options = {}) {
    const headers = new Headers(options.headers);
    headers.set('Content-Type', 'application/json');
    const token = getToken();
    if (token)
        headers.set('Authorization', `Bearer ${token}`);
    const response = await fetch(`${API_BASE_URL}${path}`, { ...options, headers });
    if (!response.ok) {
        let message = `Permintaan gagal (${response.status})`;
        try {
            const body = (await response.json());
            if (body.message)
                message = Array.isArray(body.message) ? body.message.join(', ') : body.message;
        }
        catch {
            // Keep the HTTP status message when the backend does not return JSON.
        }
        throw new Error(message);
    }
    return response.json();
}
function mapAsset(asset) {
    const location = typeof asset.locationId === 'object' && asset.locationId !== null
        ? asset.locationId.name
        : undefined;
    const latestInspection = typeof asset.latestInspection === 'object' && asset.latestInspection !== null
        ? asset.latestInspection
        : null;
    const inspectionCondition = latestInspection?.overallCondition;
    const nextSchedule = typeof asset.nextSchedule === 'object' && asset.nextSchedule !== null
        ? asset.nextSchedule
        : null;
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
                ? String(asset.operationalStatus)
                : 'not_inspected',
        lastInspectionAt: latestInspection?.inspectedAt ? String(latestInspection.inspectedAt) : null,
        lastInspectorName: latestInspection?.inspectorName ? String(latestInspection.inspectorName) : null,
        nextInspectionAt: nextSchedule?.scheduledFor ? String(nextSchedule.scheduledFor).slice(0, 10) : null,
    };
}
export const api = {
    login(email, password) {
        return request('/auth/login', {
            method: 'POST',
            body: JSON.stringify({ email, password }),
        });
    },
    getLocations() {
        return request('/locations');
    },
    createLocation(payload) {
        return request('/locations', { method: 'POST', body: JSON.stringify(payload) });
    },
    async getAssets(search) {
        const query = search ? `?search=${encodeURIComponent(search)}` : '';
        const response = await request(`/apar${query}`);
        return { ...response, data: response.data.map(mapAsset) };
    },
    createAsset(payload) {
        return request('/apar', { method: 'POST', body: JSON.stringify(payload) }).then(mapAsset);
    },
    getAsset(id) {
        return request(`/apar/${encodeURIComponent(id)}`).then(mapAsset);
    },
    createInspection(payload) {
        return request('/inspections', { method: 'POST', body: JSON.stringify(payload) });
    },
    getInspections(search) {
        const query = search ? `?search=${encodeURIComponent(search)}` : '';
        return request(`/inspections${query}`);
    },
    getDashboardSummary() {
        return request('/dashboard/summary');
    },
    getSchedules(status) {
        const query = status ? `?status=${encodeURIComponent(status)}` : '';
        return request(`/schedules${query}`);
    },
    createSchedule(payload) {
        return request('/schedules', { method: 'POST', body: JSON.stringify(payload) });
    },
    updateSchedule(id, payload) {
        return request(`/schedules/${encodeURIComponent(id)}`, { method: 'PATCH', body: JSON.stringify(payload) });
    },
    getCorrectiveActions(status) {
        const query = status ? `?status=${encodeURIComponent(status)}` : '';
        return request(`/corrective-actions${query}`);
    },
    createCorrectiveAction(payload) {
        return request('/corrective-actions', { method: 'POST', body: JSON.stringify(payload) });
    },
    updateCorrectiveActionStatus(id, status) {
        return request(`/corrective-actions/${encodeURIComponent(id)}/status`, { method: 'PATCH', body: JSON.stringify({ status }) });
    },
};
export function saveAccessToken(token) {
    sessionStorage.setItem(ACCESS_TOKEN_KEY, token);
}
export function clearAccessToken() {
    sessionStorage.removeItem(ACCESS_TOKEN_KEY);
}
export function hasAccessToken() {
    return Boolean(getToken());
}
