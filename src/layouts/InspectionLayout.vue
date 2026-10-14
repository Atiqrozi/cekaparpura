<script setup lang="ts">
import { CircleCheck } from 'lucide-vue-next'
import { RouterLink, useRoute } from 'vue-router'
const route = useRoute()
</script>

<template>
  <div class="inspection-shell">
    <header class="inspection-header">
      <RouterLink to="/" class="brand brand-light"><span class="brand-mark"><img src="/Logo Pura.png" alt="Logo Pura" /></span><span>APAR<span class="brand-accent">CHECK</span></span></RouterLink>
      <div class="secure-label"><CircleCheck :size="16" /> Data tersimpan sementara</div>
    </header>
    <div v-if="route.path.includes('/checklist') || route.path.includes('/review')" class="stepper">
      <div class="step done"><span>1</span> Data pemeriksa</div><div class="step-line"></div>
      <div :class="['step', route.path.includes('review') ? 'done' : 'active']"><span>2</span> Checklist</div><div class="step-line"></div>
      <div :class="['step', route.path.includes('review') ? 'active' : '']"><span>3</span> Review & kirim</div>
    </div>
    <main class="inspection-main"><slot /></main>
  </div>
</template>
