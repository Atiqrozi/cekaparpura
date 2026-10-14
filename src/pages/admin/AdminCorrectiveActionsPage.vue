<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { Plus, ClipboardCheck } from 'lucide-vue-next'
import { api, type CorrectiveActionPriority, type CorrectiveActionRecord, type CorrectiveActionStatus, type InspectionRecord } from '../../services/api.service'

const actions = ref<CorrectiveActionRecord[]>([])
const inspections = ref<InspectionRecord[]>([])
const status = ref<CorrectiveActionStatus | ''>('')
const showForm = ref(false)
const loading = ref(true)
const saving = ref(false)
const error = ref('')
const form = ref({ inspectionId: '', title: '', description: '', priority: 'medium' as CorrectiveActionPriority, dueDate: '', assigneeName: '' })
const statusLabels: Record<CorrectiveActionStatus, string> = { open: 'Belum ditangani', in_progress: 'Sedang diproses', pending_verification: 'Menunggu verifikasi', completed: 'Selesai' }
const priorityLabels: Record<CorrectiveActionPriority, string> = { low: 'Rendah', medium: 'Sedang', high: 'Tinggi', critical: 'Kritis' }
const statusClass: Record<CorrectiveActionStatus, string> = { open: 'status-neutral', in_progress: 'status-warning', pending_verification: 'status-warning', completed: 'status-good' }
const filtered = computed(() => status.value ? actions.value.filter(item => item.status === status.value) : actions.value)

async function load() {
  loading.value = true
  try {
    const [actionResponse, inspectionResponse] = await Promise.all([api.getCorrectiveActions(), api.getInspections()])
    actions.value = actionResponse
    inspections.value = inspectionResponse.data
  } catch (err) { error.value = err instanceof Error ? err.message : 'Tindak lanjut gagal dimuat.' }
  finally { loading.value = false }
}
async function create() {
  if (!form.value.inspectionId || !form.value.title || !form.value.description || !form.value.dueDate) { error.value = 'Pemeriksaan, judul, deskripsi, dan tenggat wajib diisi.'; return }
  saving.value = true
  error.value = ''
  try {
    await api.createCorrectiveAction(form.value)
    showForm.value = false
    form.value = { inspectionId: '', title: '', description: '', priority: 'medium', dueDate: '', assigneeName: '' }
    await load()
  } catch (err) { error.value = err instanceof Error ? err.message : 'Tindak lanjut gagal dibuat.' }
  finally { saving.value = false }
}
async function updateStatus(item: CorrectiveActionRecord, nextStatus: CorrectiveActionStatus) {
  try { await api.updateCorrectiveActionStatus(item._id, nextStatus); await load() }
  catch (err) { error.value = err instanceof Error ? err.message : 'Status gagal diperbarui.' }
}
onMounted(load)
</script>

<template>
  <div class="admin-page-title" style="display:flex;justify-content:space-between;align-items:flex-start"><div><h2>Tindak lanjut temuan</h2><p>Kelola temuan pemeriksaan, penanggung jawab, dan progres penyelesaiannya.</p></div><button class="btn btn-primary" @click="showForm = !showForm"><Plus :size="16" /> Buat tindak lanjut</button></div>
  <div v-if="error" class="notice" style="margin-bottom:16px">{{ error }}</div>
  <div v-if="showForm" class="form-card" style="margin-bottom:20px"><h3 style="margin-bottom:18px">Buat tindak lanjut</h3><div class="form-grid"><div class="field full"><label for="action-inspection">Pemeriksaan <span class="required">*</span></label><select id="action-inspection" v-model="form.inspectionId"><option value="">Pilih pemeriksaan</option><option v-for="item in inspections" :key="item._id" :value="item._id">{{ item.reference }} — {{ item.aparSnapshot.code }} — {{ item.inspectorName }}</option></select></div><div class="field full"><label for="action-title">Judul temuan <span class="required">*</span></label><input id="action-title" v-model="form.title" placeholder="Contoh: Ganti segel pengaman" /></div><div class="field full"><label for="action-description">Deskripsi <span class="required">*</span></label><textarea id="action-description" v-model="form.description" placeholder="Jelaskan tindakan yang perlu dilakukan"></textarea></div><div class="field"><label for="action-priority">Prioritas</label><select id="action-priority" v-model="form.priority"><option value="low">Rendah</option><option value="medium">Sedang</option><option value="high">Tinggi</option><option value="critical">Kritis</option></select></div><div class="field"><label for="action-date">Tenggat <span class="required">*</span></label><input id="action-date" v-model="form.dueDate" type="date" /></div><div class="field full"><label for="action-assignee">Penanggung jawab</label><input id="action-assignee" v-model="form.assigneeName" placeholder="Nama penanggung jawab" /></div></div><div class="form-footer"><button class="btn btn-secondary" @click="showForm = false">Batal</button><button class="btn btn-primary" :disabled="saving" @click="create">{{ saving ? 'Menyimpan...' : 'Simpan tindak lanjut' }}</button></div></div>
  <div class="toolbar"><div style="display:flex;align-items:center;gap:8px;color:#718096"><ClipboardCheck :size="17" /> {{ loading ? 'Memuat temuan...' : `${filtered.length} temuan` }}</div><select v-model="status" class="filter-select"><option value="">Semua status</option><option value="open">Belum ditangani</option><option value="in_progress">Sedang diproses</option><option value="pending_verification">Menunggu verifikasi</option><option value="completed">Selesai</option></select></div>
  <div class="panel"><div class="table-wrap"><table class="data-table"><thead><tr><th>TEMUAN</th><th>APAR / PEMERIKSAAN</th><th>PRIORITAS</th><th>PENANGGUNG JAWAB</th><th>TENGGAT</th><th>STATUS</th><th>AKSI</th></tr></thead><tbody><tr v-for="item in filtered" :key="item._id"><td><strong>{{ item.title }}</strong><br /><small style="color:#718096">{{ item.description }}</small></td><td>{{ item.aparSnapshot.code }}<br /><small style="color:#718096">{{ item.inspectionReference }}</small></td><td>{{ priorityLabels[item.priority] }}</td><td>{{ item.assigneeName || 'Belum ditugaskan' }}</td><td>{{ new Date(item.dueDate).toLocaleDateString('id-ID') }}</td><td><span :class="['status-pill', statusClass[item.status]]">{{ statusLabels[item.status] }}</span></td><td><select v-if="item.status !== 'completed'" class="filter-select" style="font-size:12px" :value="item.status" @change="updateStatus(item, ($event.target as HTMLSelectElement).value as CorrectiveActionStatus)"><option value="open">Belum ditangani</option><option value="in_progress">Sedang diproses</option><option value="pending_verification">Menunggu verifikasi</option><option value="completed">Selesai</option></select><span v-else>—</span></td></tr></tbody></table><div v-if="!loading && !filtered.length" class="empty-state">Belum ada temuan.</div></div></div>
</template>
