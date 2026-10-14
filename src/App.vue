<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import PublicLayout from './layouts/PublicLayout.vue'
import InspectionLayout from './layouts/InspectionLayout.vue'
import AdminLayout from './layouts/AdminLayout.vue'

const route = useRoute()
const standalone = computed(() => route.path === '/admin/login')
const layout = computed(() => {
  if (route.path.startsWith('/admin') && !standalone.value) return AdminLayout
  if (route.path.startsWith('/pemeriksaan')) return InspectionLayout
  return PublicLayout
})
</script>

<template>
  <router-view v-if="standalone" />
  <component v-else :is="layout">
    <router-view />
  </component>
</template>
