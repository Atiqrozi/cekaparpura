<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
import { Search } from 'lucide-vue-next'
import { api, type InspectionRecord } from '../../services/api.service'
import { conditionClass, conditionLabels } from '../../services/mock.service'

const search = ref('')
const records = ref<InspectionRecord[]>([])
const error = ref('')
async function load() {
  try { records.value = (await api.getInspections(search.value)).data; error.value = '' }
  catch (err) { error.value = err instanceof Error ? err.message : 'Data pemeriksaan gagal dimuat.' }
}
onMounted(load)
watch(search, () => { void load() })
</script>

<template>
  <div class="admin-page-title"><h2>Data pemeriksaan</h2><p>Riwayat pemeriksaan APAR yang telah tercatat di sistem.</p></div>
  <div class="toolbar"><div style="position:relative"><Search :size="16" style="position:absolute;left:12px;top:12px;color:#91a0ad" /><input v-model="search" class="search-input" style="padding-left:36px" placeholder="Cari nomor, pemeriksa, atau kode APAR..." /></div></div>
  <div v-if="error" class="notice">{{ error }}</div>
  <div class="panel"><div class="table-wrap"><table class="data-table"><thead><tr><th>NO. PEMERIKSAAN</th><th>TANGGAL</th><th>PEMERIKSA</th><th>KODE APAR</th><th>LOKASI</th><th>HASIL</th></tr></thead>
    <tbody><tr v-for="item in records" :key="item._id"><td>{{ item.reference }}</td><td>{{ item.inspectedAt.slice(0, 10) }}</td><td>{{ item.inspectorName }}</td><td>{{ item.aparSnapshot.code }}</td><td>{{ item.locationName }}</td><td><span :class="['status-pill', conditionClass[item.overallCondition]]">{{ conditionLabels[item.overallCondition] }}</span></td></tr></tbody>
  </table><div v-if="!records.length && !error" class="empty-state">Tidak ada data pemeriksaan.</div></div></div>
</template>
