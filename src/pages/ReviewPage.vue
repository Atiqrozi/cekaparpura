<script setup lang="ts">
import { computed, ref } from 'vue'
import { ArrowLeft, CheckCircle2, Send } from 'lucide-vue-next'
import { useRouter } from 'vue-router'
import { conditionLabels } from '../services/mock.service'
import { api } from '../services/api.service'
const router = useRouter()
const inspector = JSON.parse(sessionStorage.getItem('inspection-inspector') || '{"name":"Pemeriksa"}')
const items = JSON.parse(sessionStorage.getItem('inspection-checklist') || '[]')
const notes = sessionStorage.getItem('inspection-notes') || ''
const answers = items.map((item: { id: string; question: string; category: string; answer: string; notes?: string }) => ({
  questionId: item.id,
  question: item.question,
  category: item.category,
  answer: item.answer,
  notes: item.notes,
}))
const asset = ref<Awaited<ReturnType<typeof api.getAsset>> | null>(null)
api.getAsset(String(router.currentRoute.value.params.id)).then(value => { asset.value = value }).catch(() => { asset.value = null })
const confirmed = ref(false)
const sending = ref(false)
const error = ref('')
async function submit() {
  if (!confirmed.value || sending.value) return
  sending.value = true
  error.value = ''
  try {
    const response = await api.createInspection({
      aparId: String(router.currentRoute.value.params.id),
      inspectorName: inspector.name || 'Pemeriksa',
      locationName: inspector.location || asset.value?.locationName || 'Tidak diketahui',
      inspectedAt: new Date().toISOString(),
      answers,
      notes,
    })
    sessionStorage.setItem('inspection-reference', response.reference)
    router.push(`/pemeriksaan/${router.currentRoute.value.params.id}/berhasil`)
  } catch (err) {
    error.value = err instanceof Error ? err.message : 'Pemeriksaan gagal dikirim. Silakan coba lagi.'
  } finally {
    sending.value = false
  }
}
</script>

<template><div class="page-intro"><span class="eyebrow">Langkah 3 dari 3</span><h1>Review pemeriksaan</h1><p>Pastikan seluruh informasi dan jawaban sudah sesuai sebelum dikirim.</p></div><div class="review-card"><div v-if="error" class="notice" style="margin-bottom:16px">{{ error }}</div><div class="review-section"><h3>Informasi pemeriksaan</h3><dl class="data-list"><div><dt>Nama pemeriksa</dt><dd>{{ inspector.name }}</dd></div><div><dt>Tanggal</dt><dd>14 Oktober 2026</dd></div><div><dt>Lokasi</dt><dd>{{ inspector.location || asset?.locationName }}</dd></div><div><dt>APAR</dt><dd>{{ asset?.code }} · {{ asset?.type }}</dd></div></dl></div><div class="review-section"><h3>Jawaban checklist</h3><div v-for="item in items" :key="item.id" class="review-answer"><span>{{ item.question }}</span><span :class="['status-pill', item.answer === 'good' ? 'status-good' : 'status-danger']"><CheckCircle2 v-if="item.answer === 'good'" :size="12" /> {{ conditionLabels[item.answer] || 'Belum diisi' }}</span></div><div class="review-answer"><span>Keterangan</span><span>{{ notes || 'Tidak ada keterangan' }}</span></div></div><label class="submit-confirm"><input v-model="confirmed" type="checkbox" /> Saya telah memeriksa kembali data di atas dan memahami bahwa hasil ini akan dicatat sebagai dokumentasi pemeriksaan.</label><div class="form-footer"><button class="btn btn-secondary" @click="router.back()"><ArrowLeft :size="16" /> Ubah jawaban</button><button class="btn btn-primary" :disabled="!confirmed || sending" :style="{ opacity: confirmed && !sending ? 1 : .5 }" @click="submit"><Send :size="15" /> {{ sending ? 'Mengirim...' : 'Kirim pemeriksaan' }}</button></div></div></template>
