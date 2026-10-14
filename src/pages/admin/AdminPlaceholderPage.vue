<script setup lang="ts">
import { ArrowRight, Construction } from 'lucide-vue-next'
defineProps<{ title: string; description: string }>()
</script>
<template><div class="admin-page-title"><h2>{{ title }}</h2><p>{{ description }}</p></div><div class="panel empty-state"><Construction :size="35" style="color:#19a8a0;margin-bottom:12px" /><h3 style="margin-bottom:8px">Modul siap diintegrasikan</h3><p style="margin:0 auto 18px;max-width:430px">Tampilan dan kontrak data modul ini menunggu endpoint backend yang disepakati. Navigasi sudah tersedia agar alur admin tetap konsisten.</p><button class="btn btn-secondary" @click="$router.push('/admin')">Kembali ke ringkasan <ArrowRight :size="15" /></button></div></template>
