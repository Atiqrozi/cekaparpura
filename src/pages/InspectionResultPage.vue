<script setup lang="ts">
import { Printer } from 'lucide-vue-next'
import { ref } from 'vue'
import { RouterLink } from 'vue-router'
import { api } from '../services/api.service'
import { useRoute } from 'vue-router'
const route = useRoute()
const asset = ref<Awaited<ReturnType<typeof api.getAsset>> | null>(null)
api.getAsset(String(route.params.id)).then(value => { asset.value = value }).catch(() => { asset.value = null })
</script>
<template><div class="page-intro"><span class="eyebrow">Detail hasil</span><h1>Hasil pemeriksaan</h1><p>Ringkasan pemeriksaan {{ asset?.code || route.params.id }}.</p></div><div class="review-card"><div class="review-section"><h3>Informasi aset</h3><dl class="data-list"><div><dt>Kode APAR</dt><dd>{{ asset?.code || 'Tidak ditemukan' }}</dd></div><div><dt>Lokasi</dt><dd>{{ asset?.locationName || '—' }}</dd></div><div><dt>Pemeriksaan terakhir</dt><dd>{{ asset?.lastInspectionAt || 'Belum pernah diperiksa' }}</dd></div><div><dt>Status</dt><dd><span class="status-pill status-good">Tercatat</span></dd></div></dl></div><div class="notice">Hasil checklist digital merupakan dokumentasi inspeksi visual dan tidak menggantikan pemeriksaan teknis atau sertifikasi sesuai prosedur keselamatan.</div><div class="form-footer"><RouterLink to="/" class="btn btn-secondary">Kembali ke beranda</RouterLink><button class="btn btn-primary" onclick="window.print()"><Printer :size="16" /> Cetak hasil</button></div></div></template>
