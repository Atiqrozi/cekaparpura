<script setup lang="ts">
import { computed, ref } from 'vue'
import { ArrowLeft, ArrowRight } from 'lucide-vue-next'
import { useRouter } from 'vue-router'
import { checklistItems } from '../services/mock.service'
import { api } from '../services/api.service'
import type { ChecklistAnswer } from '../types'
const router = useRouter()
const items = ref(checklistItems.map(item => ({ ...item })))
const asset = ref<Awaited<ReturnType<typeof api.getAsset>> | null>(null)
api.getAsset(String(router.currentRoute.value.params.id)).then(value => { asset.value = value }).catch(() => { asset.value = null })
const notes = ref(sessionStorage.getItem('inspection-notes') || '')
const completed = computed(() => items.value.filter(item => item.answer !== null).length)
const progress = computed(() => Math.round(completed.value / items.value.length * 100))
function choose(index: number, answer: ChecklistAnswer) { items.value[index].answer = answer }
function next() { if (completed.value !== items.value.length) return; sessionStorage.setItem('inspection-checklist', JSON.stringify(items.value)); sessionStorage.setItem('inspection-notes', notes.value); router.push(`/pemeriksaan/${router.currentRoute.value.params.id}/review`) }
</script>

<template><div class="checklist-header"><div class="page-intro" style="margin:0"><span class="eyebrow">Langkah 2 dari 3</span><h1>Checklist kondisi APAR</h1><p>{{ asset?.code }} · {{ asset?.locationName }}</p></div><div class="progress-wrap"><div class="progress-text">{{ completed }}/{{ items.length }} selesai</div><div class="progress"><div :style="{ width: `${progress}%` }"></div></div></div></div><div v-for="(item, index) in items" :key="item.id" class="question-card"><span class="question-category">{{ item.category }}</span><div class="question-text">{{ index + 1 }}. {{ item.question }}</div><div class="answer-options"><button v-for="answer in [['good','Baik'],['bad','Jelek']]" :key="answer[0]" :class="['answer-option', { selected: item.answer === answer[0], danger: answer[0] === 'bad' }]" @click="choose(index, answer[0] as ChecklistAnswer)">{{ answer[1] }}</button></div></div><div class="question-card notes-card"><span class="question-category">Keterangan</span><label for="inspection-notes" class="notes-label">Keterangan pemeriksaan</label><p class="notes-hint">Tambahkan informasi kondisi APAR atau temuan lain yang perlu dicatat.</p><textarea id="inspection-notes" v-model="notes" class="notes-textarea" rows="4" maxlength="500" placeholder="Contoh: Kondisi APAR cukup baik dan dapat digunakan."></textarea><div class="notes-footer"><span>Opsional</span><span>{{ notes.length }}/500</span></div></div><div class="form-footer"><button class="btn btn-secondary" @click="router.push('/pemeriksaan/mulai')"><ArrowLeft :size="16" /> Kembali</button><button class="btn btn-primary" :disabled="completed !== items.length" :style="{ opacity: completed === items.length ? 1 : .5 }" @click="next">Review pemeriksaan <ArrowRight :size="16" /></button></div></template>

<style scoped>
.notes-card { padding-bottom: 20px; }
.notes-label { color: var(--navy); display: block; font-size: 15px; font-weight: 700; margin-top: 10px; }
.notes-hint { color: var(--muted); font-size: 12px; line-height: 1.5; margin: 6px 0 12px; }
.notes-textarea { background: #fbfdfd; border: 1px solid #d6e0e7; border-radius: 10px; color: var(--navy); display: block; font-size: 14px; line-height: 1.6; min-height: 112px; padding: 13px 14px; resize: vertical; transition: border-color .2s, box-shadow .2s; width: 100%; }
.notes-textarea::placeholder { color: #9aa8b5; }
.notes-textarea:focus { border-color: var(--teal); box-shadow: 0 0 0 3px #19a8a01a; outline: none; }
.notes-footer { color: #8a98a7; display: flex; font-size: 11px; justify-content: space-between; margin-top: 7px; }
</style>
