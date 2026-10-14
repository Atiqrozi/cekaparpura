<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { Plus, CalendarClock } from 'lucide-vue-next'
import { api, type ScheduleRecord, type ScheduleStatus } from '../../services/api.service'
import type { AparAsset } from '../../types'

const schedules = ref<ScheduleRecord[]>([])
const assets = ref<AparAsset[]>([])
const status = ref<ScheduleStatus | ''>('')
const loading = ref(true)
const saving = ref(false)
const error = ref('')
const showForm = ref(false)
const form = ref({ aparId: '', locationName: '', scheduledFor: '', assignedTo: '', notes: '' })
const statusLabels: Record<ScheduleStatus, string> = { scheduled: 'Terjadwal', due_soon: 'Segera jatuh tempo', overdue: 'Terlambat', completed: 'Selesai' }
const statusClass: Record<ScheduleStatus, string> = { scheduled: 'status-neutral', due_soon: 'status-warning', overdue: 'status-danger', completed: 'status-good' }
const filtered = computed(() => status.value ? schedules.value.filter(item => item.status === status.value) : schedules.value)

async function load() {
  loading.value = true
  try {
    const [scheduleResponse, assetResponse] = await Promise.all([api.getSchedules(), api.getAssets()])
    schedules.value = scheduleResponse
    assets.value = assetResponse.data
  } catch (err) {
    error.value = err instanceof Error ? err.message : 'Jadwal gagal dimuat.'
  } finally { loading.value = false }
}
function selectAsset() {
  const selected = assets.value.find(item => item.id === form.value.aparId)
  if (selected) form.value.locationName = selected.locationName
}
async function create() {
  if (!form.value.aparId || !form.value.locationName || !form.value.scheduledFor) { error.value = 'APAR, lokasi, dan tanggal jadwal wajib diisi.'; return }
  saving.value = true
  error.value = ''
  try {
    await api.createSchedule(form.value)
    showForm.value = false
    form.value = { aparId: '', locationName: '', scheduledFor: '', assignedTo: '', notes: '' }
    await load()
  } catch (err) { error.value = err instanceof Error ? err.message : 'Jadwal gagal dibuat.' }
  finally { saving.value = false }
}
async function complete(item: ScheduleRecord) {
  try { await api.updateSchedule(item._id, { status: 'completed' }); await load() }
  catch (err) { error.value = err instanceof Error ? err.message : 'Jadwal gagal diperbarui.' }
}
onMounted(load)
</script>

<template>
  <div class="admin-page-title" style="display:flex;justify-content:space-between;align-items:flex-start"><div><h2>Jadwal pemeriksaan</h2><p>Kelola jadwal pemeriksaan APAR dan pantau keterlambatannya.</p></div><button class="btn btn-primary" @click="showForm = !showForm"><Plus :size="16" /> Buat jadwal</button></div>
  <div v-if="error" class="notice" style="margin-bottom:16px">{{ error }}</div>
  <div v-if="showForm" class="form-card" style="margin-bottom:20px"><h3 style="margin-bottom:18px">Buat jadwal pemeriksaan</h3><div class="form-grid"><div class="field"><label for="schedule-apar">APAR <span class="required">*</span></label><select id="schedule-apar" v-model="form.aparId" @change="selectAsset"><option value="">Pilih APAR</option><option v-for="item in assets" :key="item.id" :value="item.id">{{ item.code }} — {{ item.locationName }}</option></select></div><div class="field"><label for="schedule-date">Tanggal dan waktu <span class="required">*</span></label><input id="schedule-date" v-model="form.scheduledFor" type="datetime-local" /></div><div class="field full"><label for="schedule-location">Lokasi <span class="required">*</span></label><input id="schedule-location" v-model="form.locationName" placeholder="Lokasi pemeriksaan" /></div><div class="field"><label for="schedule-assignee">Petugas</label><input id="schedule-assignee" v-model="form.assignedTo" placeholder="Nama petugas" /></div><div class="field"><label for="schedule-notes">Catatan</label><input id="schedule-notes" v-model="form.notes" placeholder="Catatan tambahan" /></div></div><div class="form-footer"><button class="btn btn-secondary" @click="showForm = false">Batal</button><button class="btn btn-primary" :disabled="saving" @click="create">{{ saving ? 'Menyimpan...' : 'Simpan jadwal' }}</button></div></div>
  <div class="toolbar"><div style="display:flex;align-items:center;gap:8px;color:#718096"><CalendarClock :size="17" /> {{ loading ? 'Memuat jadwal...' : `${filtered.length} jadwal` }}</div><select v-model="status" class="filter-select"><option value="">Semua status</option><option value="scheduled">Terjadwal</option><option value="due_soon">Segera jatuh tempo</option><option value="overdue">Terlambat</option><option value="completed">Selesai</option></select></div>
  <div class="panel"><div class="table-wrap"><table class="data-table"><thead><tr><th>APAR</th><th>LOKASI</th><th>JADWAL</th><th>PETUGAS</th><th>STATUS</th><th>AKSI</th></tr></thead><tbody><tr v-for="item in filtered" :key="item._id"><td>{{ item.aparSnapshot.code }}<br /><small style="color:#8b99a6">{{ item.aparSnapshot.type }}</small></td><td>{{ item.locationName }}</td><td>{{ new Date(item.scheduledFor).toLocaleString('id-ID') }}</td><td>{{ item.assignedTo || 'Belum ditugaskan' }}</td><td><span :class="['status-pill', statusClass[item.status]]">{{ statusLabels[item.status] }}</span></td><td><button v-if="item.status !== 'completed'" class="btn btn-secondary" style="font-size:12px" @click="complete(item)">Tandai selesai</button><span v-else>—</span></td></tr></tbody></table><div v-if="!loading && !filtered.length" class="empty-state">Belum ada jadwal.</div></div></div>
</template>
