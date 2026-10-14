<script setup lang="ts">
import { Menu, X } from 'lucide-vue-next'
import { ref } from 'vue'
import { RouterLink } from 'vue-router'
const open = ref(false)
</script>

<template>
  <div class="public-shell">
    <header class="site-header">
      <RouterLink to="/" class="brand"><span class="brand-mark"><img src="/Logo Pura.png" alt="Logo Pura" /></span><span>APAR<span class="brand-accent">CHECK</span></span></RouterLink>
      <button class="icon-button mobile-only" aria-label="Buka menu" @click="open = !open"><X v-if="open" /><Menu v-else /></button>
      <nav :class="{ 'nav-open': open }">
        <RouterLink to="/panduan">Panduan</RouterLink>
        <RouterLink to="/admin/login" class="nav-admin">Login Admin <span>→</span></RouterLink>
      </nav>
    </header>
    <main><slot /></main>
    <footer class="site-footer"><span>© 2026 APAR Check</span><span>Sistem pemeriksaan keselamatan kerja</span></footer>
  </div>
</template>
