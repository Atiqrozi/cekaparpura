<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { ArrowRight } from 'lucide-vue-next'
import { RouterLink, useRouter } from 'vue-router'
import { api } from '../services/api.service'
import type { AparAsset } from '../types'
const router = useRouter()
const assets = ref<AparAsset[]>([])
const loading = ref(true)
const name = ref('')
const location = ref('')
const asset = ref('')
const error = ref('')
onMounted(() => {
  sessionStorage.removeItem('inspection-inspector')
  sessionStorage.removeItem('inspection-checklist')
  sessionStorage.removeItem('inspection-notes')
  sessionStorage.removeItem('inspection-reference')
})
api.getAssets().then(response => { assets.value = response.data }).catch(err => { error.value = err instanceof Error ? err.message : 'Inventaris APAR gagal dimuat.' }).finally(() => { loading.value = false })
function start() {
  if (!name.value || !location.value || !asset.value) { error.value = 'Lengkapi semua field wajib sebelum melanjutkan.'; return }
  sessionStorage.setItem('inspection-inspector', JSON.stringify({ name: name.value, location: location.value, asset: asset.value }))
  router.push(`/pemeriksaan/${asset.value}/checklist`)
}
</script>

<template><div class="page-intro"><span class="eyebrow">Langkah 1 dari 3</span><h1>Data pemeriksaan</h1><p>Lengkapi informasi berikut sebelum memulai pemeriksaan.</p></div><div class="form-card"><div v-if="error" class="notice" style="margin-bottom:18px">{{ error }}</div><div class="form-grid"><div class="field full"><label for="name">Nama lengkap <span class="required">*</span></label><input id="name" v-model="name" placeholder="Masukkan nama lengkap" /></div><div class="field"><label for="date">Tanggal pemeriksaan <span class="required">*</span></label><input id="date" type="date" value="2026-10-14" /></div><div class="field"><label for="time">Waktu pemeriksaan <span class="required">*</span></label><input id="time" type="time" value="09:30" /></div><div class="field full"><label for="location">Lokasi pemeriksaan <span class="required">*</span></label><input id="location" v-model="location" placeholder="Masukkan lokasi pemeriksaan" /></div><div class="field full"><label for="asset">Kode APAR <span class="required">*</span></label><select id="asset" v-model="asset" :disabled="loading"><option value="">{{ loading ? 'Memuat inventaris...' : 'Pilih APAR dari inventaris' }}</option><option v-for="item in assets" :key="item.id" :value="item.id">{{ item.code }} — {{ item.locationName }}</option></select><span class="field-hint">Pilih APAR yang tersedia di inventaris. Jangan membuat kode baru tanpa konfirmasi admin.</span></div></div><div class="form-footer"><RouterLink to="/" class="btn btn-secondary">Kembali</RouterLink><button class="btn btn-primary" :disabled="loading || !assets.length" @click="start">Lanjut ke checklist <ArrowRight :size="16" /></button></div></div></template>
