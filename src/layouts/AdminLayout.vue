<script setup lang="ts">
import { BarChart3, Bell, ClipboardCheck, LayoutDashboard, LogOut, Menu, Package, Settings, Users, X } from 'lucide-vue-next'
import { ref } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import { clearAccessToken } from '../services/api.service'
const collapsed = ref(false)
const route = useRoute()
const links = [
  { to: '/admin', label: 'Ringkasan', icon: LayoutDashboard },
  { to: '/admin/pemeriksaan', label: 'Pemeriksaan', icon: ClipboardCheck },
  { to: '/admin/apar', label: 'Inventaris APAR', icon: Package },
  { to: '/admin/jadwal', label: 'Jadwal', icon: BarChart3 },
  { to: '/admin/tindak-lanjut', label: 'Tindak lanjut', icon: Bell },
  { to: '/admin/pengguna', label: 'Pengguna', icon: Users },
]
function logout() {
  clearAccessToken()
  window.location.href = '/admin/login'
}
</script>

<template>
  <div class="admin-shell">
    <aside :class="['sidebar', { collapsed }]">
      <div class="sidebar-top"><RouterLink to="/admin" class="brand brand-light"><span class="brand-mark admin-logo-mark"><img src="/Logo Pura.png" alt="Logo RS Korpri Pura Raharja" /></span><span v-if="!collapsed">APAR<span class="brand-accent">CHECK</span></span></RouterLink><button class="icon-button sidebar-toggle" @click="collapsed = !collapsed" :aria-label="collapsed ? 'Buka sidebar' : 'Ciutkan sidebar'"><X v-if="!collapsed" :size="18" /><Menu v-else :size="18" /></button></div>
      <div class="workspace" v-if="!collapsed"><span class="workspace-dot"></span><span>RS Korpri Pura Raharja</span><span class="chevron">⌄</span></div>
      <nav class="side-nav">
        <RouterLink v-for="link in links" :key="link.to" :to="link.to" :class="{ selected: route.path === link.to }"><component :is="link.icon" :size="18" /><span v-if="!collapsed">{{ link.label }}</span></RouterLink>
      </nav>
      <div class="sidebar-bottom"><RouterLink to="/admin/pengaturan"><Settings :size="18" /><span v-if="!collapsed">Pengaturan</span></RouterLink><button class="sidebar-link" @click="logout"><LogOut :size="18" /><span v-if="!collapsed">Keluar</span></button></div>
    </aside>
    <div class="admin-content"><header class="admin-topbar"><div><span class="eyebrow">Rabu, 14 Oktober 2026</span><h1>Selamat datang, Admin</h1></div><div class="topbar-actions"><button class="notification-button" aria-label="Notifikasi"><Bell :size="19" /><span></span></button><div class="avatar">AD</div><div class="admin-name">Administrator <small>⌄</small></div></div></header><main class="admin-main"><slot /></main></div>
  </div>
</template>
