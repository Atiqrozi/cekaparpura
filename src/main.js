import { createApp } from 'vue';
import { createRouter, createWebHistory } from 'vue-router';
import App from './App.vue';
import './styles.css';
import { hasAccessToken } from './services/api.service';
const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: '/', component: () => import('./pages/LandingPage.vue') },
        { path: '/panduan', component: () => import('./pages/GuidePage.vue') },
        { path: '/pemeriksaan/mulai', component: () => import('./pages/InspectionStartPage.vue') },
        { path: '/pemeriksaan/:id/checklist', component: () => import('./pages/ChecklistPage.vue') },
        { path: '/pemeriksaan/:id/review', component: () => import('./pages/ReviewPage.vue') },
        { path: '/pemeriksaan/:id/berhasil', component: () => import('./pages/SuccessPage.vue') },
        { path: '/pemeriksaan/:id/hasil', component: () => import('./pages/InspectionResultPage.vue') },
        { path: '/admin/login', component: () => import('./pages/admin/AdminLoginPage.vue') },
        { path: '/admin', component: () => import('./pages/admin/AdminDashboardPage.vue') },
        { path: '/admin/pemeriksaan', component: () => import('./pages/admin/AdminInspectionsPage.vue') },
        { path: '/admin/apar', component: () => import('./pages/admin/AdminAssetsPage.vue') },
        { path: '/admin/apar/tambah', redirect: '/admin/apar' },
        { path: '/admin/jadwal', component: () => import('./pages/admin/AdminSchedulePage.vue') },
        { path: '/admin/tindak-lanjut', component: () => import('./pages/admin/AdminCorrectiveActionsPage.vue') },
        { path: '/admin/pengguna', component: () => import('./pages/admin/AdminPlaceholderPage.vue'), props: { title: 'Data pengguna', description: 'Kelola pengguna dan peran akses aplikasi.' } },
        { path: '/admin/laporan', component: () => import('./pages/admin/AdminPlaceholderPage.vue'), props: { title: 'Laporan', description: 'Buat ringkasan pemeriksaan berdasarkan periode dan lokasi.' } },
        { path: '/admin/notifikasi', component: () => import('./pages/admin/AdminPlaceholderPage.vue'), props: { title: 'Notifikasi', description: 'Pemberitahuan jadwal, temuan, dan tindak lanjut.' } },
        { path: '/admin/pengaturan', component: () => import('./pages/admin/AdminPlaceholderPage.vue'), props: { title: 'Pengaturan', description: 'Atur lokasi, checklist, interval pemeriksaan, dan profil institusi.' } },
        { path: '/admin/profil', component: () => import('./pages/admin/AdminPlaceholderPage.vue'), props: { title: 'Profil admin', description: 'Kelola profil dan perubahan password.' } },
        { path: '/:pathMatch(.*)*', redirect: '/' },
    ],
});
router.beforeEach((to) => {
    if (to.path.startsWith('/admin') && to.path !== '/admin/login' && !hasAccessToken())
        return '/admin/login';
    if (to.path === '/admin/login' && hasAccessToken())
        return '/admin';
    return true;
});
createApp(App).use(router).mount('#app');
