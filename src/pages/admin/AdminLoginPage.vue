<script setup lang="ts">
import { LockKeyhole, Mail, ArrowRight } from 'lucide-vue-next'
import { ref } from 'vue'
import { RouterLink, useRouter } from 'vue-router'
import { api, saveAccessToken } from '../../services/api.service'

const router = useRouter()
const email = ref('')
const password = ref('')
const error = ref('')
const sending = ref(false)

async function login() {
  if (!email.value || !password.value) {
    error.value = 'Email dan password wajib diisi.'
    return
  }
  sending.value = true
  error.value = ''
  try {
    const response = await api.login(email.value, password.value)
    saveAccessToken(response.accessToken)
    router.push('/admin')
  } catch (err) {
    error.value = err instanceof Error ? err.message : 'Login gagal. Silakan coba lagi.'
  } finally {
    sending.value = false
  }
}
</script>

<template>
  <main class="admin-login">
    <section class="admin-login-brand">
      <div class="admin-login-brand-content">
        <RouterLink to="/" class="login-brand">
          <span class="login-brand-mark"><img src="/Logo Pura.png" alt="Logo Pura" /></span>
          <span>APAR<span class="brand-accent">CHECK</span></span>
        </RouterLink>
        <div class="login-brand-copy">
          <span class="eyebrow">Sistem keselamatan kerja</span>
          <h1>Kelola pemeriksaan APAR dengan lebih mudah.</h1>
          <p>Monitor inventaris, jadwal pemeriksaan, dan tindak lanjut temuan dalam satu platform.</p>
        </div>
        <div class="login-brand-footer">© 2026 APAR Check · RS Korpri Pura Raharja</div>
      </div>
    </section>

    <section class="admin-login-form">
      <div class="login-form-inner">
        <span class="eyebrow">Panel administrator</span>
        <h2>Selamat datang kembali</h2>
        <p class="login-form-intro">Masuk untuk melanjutkan ke dashboard admin.</p>
        <div v-if="error" class="notice login-error">{{ error }}</div>
        <form @submit.prevent="login">
          <div class="field">
            <label for="email">Email</label>
            <div class="login-input-wrap">
              <Mail :size="17" />
              <input id="email" v-model="email" type="email" autocomplete="email" placeholder="admin@purabarutama.com" />
            </div>
          </div>
          <div class="field">
            <label for="password">Password</label>
            <div class="login-input-wrap">
              <LockKeyhole :size="17" />
              <input id="password" v-model="password" type="password" autocomplete="current-password" placeholder="Masukkan password" />
            </div>
          </div>
          <div class="login-options"><a href="#" @click.prevent> Lupa password?</a></div>
          <button class="btn btn-primary login-submit" type="submit" :disabled="sending">
            {{ sending ? 'Memproses...' : 'Masuk ke dashboard' }}
            <ArrowRight :size="16" />
          </button>
        </form>
        <RouterLink to="/" class="login-back">Kembali ke halaman utama</RouterLink>
      </div>
    </section>
  </main>
</template>
