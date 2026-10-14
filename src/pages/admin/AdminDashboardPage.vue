<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { ArrowUpRight, CheckCircle2 } from 'lucide-vue-next'
import { api, type DashboardSummary } from '../../services/api.service'
import { conditionClass, conditionLabels } from '../../services/mock.service'

const summary = ref<DashboardSummary | null>(null)
const error = ref('')
onMounted(async () => {
  try { summary.value = await api.getDashboardSummary() }
  catch (err) { error.value = err instanceof Error ? err.message : 'Ringkasan dashboard gagal dimuat.' }
})
</script>

<template>
  <div class="dashboard-title"><div><h2>Ringkasan aktivitas</h2><p>Pantau kondisi APAR dan pemeriksaan di seluruh lokasi.</p></div></div>
  <div v-if="error" class="notice">{{ error }}</div>
  <div class="kpi-grid">
    <div class="kpi-card"><span class="kpi-label">Total APAR terdaftar</span><div class="kpi-value">{{ summary?.totalApar ?? '—' }}</div></div>
    <div class="kpi-card"><span class="kpi-label">Pemeriksaan tercatat</span><div class="kpi-value">{{ summary?.totalInspections ?? '—' }}</div></div>
    <div class="kpi-card"><span class="kpi-label">Kondisi baik</span><div class="kpi-value">{{ summary?.conditionDistribution.good ?? 0 }}</div></div>
    <div class="kpi-card"><span class="kpi-label">Perlu perhatian</span><div class="kpi-value">{{ (summary?.conditionDistribution.needs_repair ?? 0) + (summary?.conditionDistribution.damaged ?? 0) }}</div></div>
  </div>
  <div class="panel recent-panel">
    <div class="panel-heading"><h2>Pemeriksaan terbaru</h2><a href="/admin/pemeriksaan">Lihat semua <ArrowUpRight :size="13" /></a></div>
    <div class="table-wrap"><table class="data-table"><thead><tr><th>NO. PEMERIKSAAN</th><th>TANGGAL</th><th>PEMERIKSA</th><th>APAR</th><th>LOKASI</th><th>HASIL</th></tr></thead>
      <tbody><tr v-for="item in summary?.recentInspections || []" :key="item._id"><td>{{ item.reference }}</td><td>{{ item.inspectedAt.slice(0, 10) }}</td><td>{{ item.inspectorName }}</td><td>{{ item.aparSnapshot.code }}</td><td>{{ item.locationName }}</td><td><span :class="['status-pill', conditionClass[item.overallCondition]]">{{ conditionLabels[item.overallCondition] }}</span></td></tr></tbody>
    </table><div v-if="summary && !summary.recentInspections.length" class="empty-state">Belum ada pemeriksaan.</div></div>
  </div>
  <div class="panel"><div class="panel-heading"><h2>Distribusi kondisi</h2><a href="/admin/apar">Lihat aset <ArrowUpRight :size="13" /></a></div>
    <div class="legend"><div class="legend-item"><i class="legend-dot" style="background:#1dad9e"></i> Baik <b>{{ summary?.conditionDistribution.good ?? 0 }}</b></div><div class="legend-item"><i class="legend-dot" style="background:#f5b941"></i> Perlu perbaikan <b>{{ summary?.conditionDistribution.needs_repair ?? 0 }}</b></div><div class="legend-item"><i class="legend-dot" style="background:#ef6255"></i> Rusak / kritis <b>{{ summary?.conditionDistribution.damaged ?? 0 }}</b></div></div>
  </div>
</template>
