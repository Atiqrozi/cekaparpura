<script setup lang="ts">
import { Check, Printer } from 'lucide-vue-next'
import { RouterLink } from 'vue-router'
const reference = sessionStorage.getItem('inspection-reference') || 'INS-000000'
</script>
<template><div class="success-page"><div class="success-icon"><Check :size="35" /></div><span class="eyebrow">Pemeriksaan berhasil dikirim</span><h1 style="font-size:32px;margin:12px 0">Terima kasih, data tersimpan.</h1><p class="hero-copy" style="margin:auto;font-size:14px">Hasil pemeriksaan telah tercatat. Simpan nomor referensi berikut untuk melihat detailnya kembali.</p><div class="reference">{{ reference }}</div><div class="hero-actions" style="justify-content:center"><RouterLink to="/" class="btn btn-primary">Kembali ke beranda</RouterLink><button class="btn btn-secondary" onclick="window.print()"><Printer :size="16" /> Cetak bukti</button></div></div></template>
