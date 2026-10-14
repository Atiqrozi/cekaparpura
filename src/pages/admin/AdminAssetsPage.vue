<script setup lang="ts">
import { Plus, Search, X } from 'lucide-vue-next'
import { computed, onMounted, reactive, ref } from 'vue'
import { conditionClass, conditionLabels } from '../../services/mock.service'
import { api, type ApiLocation } from '../../services/api.service'
import type { AparAsset } from '../../types'

const search = ref('')
const assets = ref<AparAsset[]>([])
const locations = ref<ApiLocation[]>([])
const error = ref('')
const success = ref('')
const showForm = ref(false)
const saving = ref(false)
const statusFilter = ref('')

const emptyForm = () => ({
  code: '',
  type: '',
  brand: '',
  capacity: '',
  serialNumber: '',
  floor: '1',
  specificLocation: '',
  installedAt: '',
  serviceDueAt: '',
  inspectionIntervalDays: 30,
  notes: '',
})
const form = reactive(emptyForm())

const floorOptions = [1, 2, 3, 4, 5]
const floorLocation = (floor: string) => locations.value.find((location) => location.code === `LANTAI-${floor}`)
const locationName = (item: AparAsset) => {
  const location = locations.value.find((candidate) => candidate._id === item.locationId)
  return location ? location.name : item.locationName
}

async function loadData() {
  try {
    const [assetResponse, locationResponse] = await Promise.all([api.getAssets(), api.getLocations()])
    assets.value = assetResponse.data
    locations.value = locationResponse
  } catch (err) {
    error.value = err instanceof Error ? err.message : 'Inventaris gagal dimuat.'
  }
}

onMounted(loadData)

const filtered = computed(() => assets.value.filter((item) => {
  const matchesSearch = `${item.code} ${item.type} ${item.locationName}`.toLowerCase().includes(search.value.toLowerCase())
  const matchesStatus = !statusFilter.value || item.condition === statusFilter.value
  return matchesSearch && matchesStatus
}))

function openForm() {
  Object.assign(form, emptyForm())
  error.value = ''
  success.value = ''
  showForm.value = true
}

function closeForm() {
  if (!saving.value) showForm.value = false
}

async function submitForm() {
  error.value = ''
  success.value = ''
  saving.value = true
  try {
    let location = floorLocation(form.floor)
    if (!location) {
      location = await api.createLocation({
        name: `Lantai ${form.floor}`,
        code: `LANTAI-${form.floor}`,
        description: `Lokasi APAR lantai ${form.floor}`,
      })
      locations.value.push(location)
    }

    await api.createAsset({
      code: form.code.trim(),
      type: form.type.trim(),
      brand: form.brand.trim(),
      capacity: form.capacity.trim() || undefined,
      serialNumber: form.serialNumber.trim() || undefined,
      locationId: location._id,
      specificLocation: form.specificLocation.trim() || undefined,
      installedAt: form.installedAt || undefined,
      serviceDueAt: form.serviceDueAt || undefined,
      inspectionIntervalDays: Number(form.inspectionIntervalDays),
      notes: form.notes.trim() || undefined,
    })
    await loadData()
    showForm.value = false
    success.value = `APAR ${form.code} berhasil ditambahkan ke Lantai ${form.floor}.`
  } catch (err) {
    error.value = err instanceof Error ? err.message : 'APAR gagal ditambahkan.'
  } finally {
    saving.value = false
  }
}
</script>

<template>
  <div class="admin-page-title assets-title">
    <div>
      <h2>Inventaris APAR</h2>
      <p>Kelola aset dan pantau kondisi APAR di setiap lokasi.</p>
    </div>
    <button class="btn btn-primary" @click="openForm"><Plus :size="16" /> Tambah APAR</button>
  </div>

  <div class="toolbar">
    <div class="asset-search">
      <Search :size="16" />
      <input v-model="search" class="search-input" placeholder="Cari kode, tipe, atau lokasi..." />
    </div>
    <select v-model="statusFilter" class="filter-select">
      <option value="">Semua status</option>
      <option value="active">Aktif</option>
      <option value="inactive">Tidak aktif</option>
      <option value="out_of_service">Dalam perbaikan</option>
    </select>
  </div>

  <div v-if="error && !showForm" class="notice" style="margin-bottom:16px">{{ error }}</div>
  <div v-if="success" class="success-notice">{{ success }}</div>

  <div class="panel">
    <div class="table-wrap">
      <table class="data-table">
        <thead><tr><th>KODE APAR</th><th>JENIS / KAPASITAS</th><th>LOKASI</th><th>PEMERIKSAAN TERAKHIR</th><th>JADWAL BERIKUTNYA</th><th>KONDISI</th></tr></thead>
        <tbody>
          <tr v-for="item in filtered" :key="item.id">
            <td>{{ item.code }}</td>
            <td>{{ item.type }}<br /><small style="color:#8b99a6">{{ item.capacity || '-' }}</small></td>
            <td>{{ locationName(item) }}</td>
            <td>
              <template v-if="item.lastInspectionAt">
                {{ item.lastInspectionAt.slice(0, 10) }}<br />
                <small style="color:#8b99a6">oleh {{ item.lastInspectorName || 'Pemeriksa' }}</small>
              </template>
              <template v-else>Belum pernah diperiksa</template>
            </td>
            <td>{{ item.nextInspectionAt || 'Belum ada jadwal perbaikan' }}</td>
            <td><span :class="['status-pill', conditionClass[item.condition]]">{{ conditionLabels[item.condition] }}</span></td>
          </tr>
        </tbody>
      </table>
      <div v-if="!filtered.length" class="empty-state">Belum ada aset APAR yang cocok.</div>
    </div>
  </div>

  <div v-if="showForm" class="modal-backdrop" @click.self="closeForm">
    <section class="modal-card" role="dialog" aria-modal="true" aria-labelledby="add-apar-title">
      <div class="modal-header">
        <div><h3 id="add-apar-title">Tambah APAR</h3><p>Daftarkan APAR baru ke inventaris.</p></div>
        <button class="icon-button" aria-label="Tutup form" @click="closeForm"><X :size="18" /></button>
      </div>
      <div v-if="error" class="notice form-notice">{{ error }}</div>
      <form @submit.prevent="submitForm">
        <div class="form-grid">
          <div class="field"><label for="apar-code">Kode APAR <span class="required">*</span></label><input id="apar-code" v-model="form.code" required placeholder="Contoh: APAR-L1-001" /></div>
          <div class="field"><label for="apar-type">Jenis APAR <span class="required">*</span></label><input id="apar-type" v-model="form.type" required placeholder="Contoh: Powder" /></div>
          <div class="field"><label for="apar-brand">Merek <span class="required">*</span></label><input id="apar-brand" v-model="form.brand" required placeholder="Contoh: Servvo" /></div>
          <div class="field"><label for="apar-capacity">Kapasitas</label><input id="apar-capacity" v-model="form.capacity" placeholder="Contoh: 3 kg" /></div>
          <div class="field"><label for="apar-serial">Nomor seri</label><input id="apar-serial" v-model="form.serialNumber" placeholder="Opsional" /></div>
          <div class="field"><label for="apar-floor">Lantai <span class="required">*</span></label><select id="apar-floor" v-model="form.floor" required><option v-for="floor in floorOptions" :key="floor" :value="String(floor)">Lantai {{ floor }}</option></select></div>
          <div class="field full"><label for="apar-location">Lokasi detail</label><input id="apar-location" v-model="form.specificLocation" placeholder="Contoh: Koridor depan ruang administrasi" /></div>
          <div class="field"><label for="apar-installed">Tanggal pemasangan</label><input id="apar-installed" v-model="form.installedAt" type="date" /></div>
          <div class="field"><label for="apar-due">Jadwal servis berikutnya</label><input id="apar-due" v-model="form.serviceDueAt" type="date" /></div>
          <div class="field"><label for="apar-interval">Interval pemeriksaan (hari)</label><input v-model.number="form.inspectionIntervalDays" type="number" min="1" required /></div>
          <div class="field full"><label for="apar-notes">Keterangan</label><textarea id="apar-notes" v-model="form.notes" placeholder="Keterangan tambahan bila ada"></textarea></div>
        </div>
        <div class="modal-actions"><button type="button" class="btn btn-secondary" @click="closeForm">Batal</button><button type="submit" class="btn btn-primary" :disabled="saving">{{ saving ? 'Menyimpan...' : 'Simpan APAR' }}</button></div>
      </form>
    </section>
  </div>
</template>

<style scoped>
.assets-title { align-items: flex-start; display: flex; justify-content: space-between; }
.asset-search { align-items: center; display: flex; gap: 10px; }
.asset-search > svg { color: #91a0ad; margin-left: 12px; position: absolute; }
.asset-search .search-input { padding-left: 36px; }
.success-notice { background: #e3f6ed; border: 1px solid #b7e5d0; border-radius: 8px; color: #168257; font-size: 12px; margin-bottom: 16px; padding: 12px; }
.modal-backdrop { align-items: center; background: #0c274280; display: flex; inset: 0; justify-content: center; padding: 24px; position: fixed; z-index: 20; }
.modal-card { background: #fff; border-radius: 14px; box-shadow: 0 24px 60px #0c274233; max-height: calc(100vh - 48px); max-width: 760px; overflow-y: auto; padding: 26px; width: 100%; }
.modal-header { align-items: flex-start; display: flex; justify-content: space-between; margin-bottom: 22px; }
.modal-header h3 { color: var(--navy); font-size: 21px; }
.modal-header p { color: var(--muted); font-size: 13px; margin: 6px 0 0; }
.form-notice { margin-bottom: 16px; }
.modal-actions { display: flex; gap: 10px; justify-content: flex-end; margin-top: 24px; }
.modal-actions .btn:disabled { cursor: wait; opacity: .65; }
@media (max-width: 700px) { .assets-title { gap: 18px; flex-direction: column; } .modal-card { padding: 20px; } .form-grid { grid-template-columns: 1fr; } .field.full { grid-column: auto; } }
</style>
