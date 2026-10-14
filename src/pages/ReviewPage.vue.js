import { ref } from 'vue';
import { ArrowLeft, CheckCircle2, Send } from 'lucide-vue-next';
import { useRouter } from 'vue-router';
import { conditionLabels } from '../services/mock.service';
import { api } from '../services/api.service';
const router = useRouter();
const inspector = JSON.parse(sessionStorage.getItem('inspection-inspector') || '{"name":"Pemeriksa"}');
const items = JSON.parse(sessionStorage.getItem('inspection-checklist') || '[]');
const notes = sessionStorage.getItem('inspection-notes') || '';
const answers = items.map((item) => ({
    questionId: item.id,
    question: item.question,
    category: item.category,
    answer: item.answer,
    notes: item.notes,
}));
const asset = ref(null);
api.getAsset(String(router.currentRoute.value.params.id)).then(value => { asset.value = value; }).catch(() => { asset.value = null; });
const confirmed = ref(false);
const sending = ref(false);
const error = ref('');
async function submit() {
    if (!confirmed.value || sending.value)
        return;
    sending.value = true;
    error.value = '';
    try {
        const response = await api.createInspection({
            aparId: String(router.currentRoute.value.params.id),
            inspectorName: inspector.name || 'Pemeriksa',
            locationName: inspector.location || asset.value?.locationName || 'Tidak diketahui',
            inspectedAt: new Date().toISOString(),
            answers,
            notes,
        });
        sessionStorage.setItem('inspection-reference', response.reference);
        router.push(`/pemeriksaan/${router.currentRoute.value.params.id}/berhasil`);
    }
    catch (err) {
        error.value = err instanceof Error ? err.message : 'Pemeriksaan gagal dikirim. Silakan coba lagi.';
    }
    finally {
        sending.value = false;
    }
}
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "page-intro" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
    ...{ class: "eyebrow" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.h1, __VLS_intrinsicElements.h1)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "review-card" },
});
if (__VLS_ctx.error) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "notice" },
        ...{ style: {} },
    });
    (__VLS_ctx.error);
}
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "review-section" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.h3, __VLS_intrinsicElements.h3)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.dl, __VLS_intrinsicElements.dl)({
    ...{ class: "data-list" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.dt, __VLS_intrinsicElements.dt)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.dd, __VLS_intrinsicElements.dd)({});
(__VLS_ctx.inspector.name);
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.dt, __VLS_intrinsicElements.dt)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.dd, __VLS_intrinsicElements.dd)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.dt, __VLS_intrinsicElements.dt)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.dd, __VLS_intrinsicElements.dd)({});
(__VLS_ctx.inspector.location || __VLS_ctx.asset?.locationName);
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.dt, __VLS_intrinsicElements.dt)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.dd, __VLS_intrinsicElements.dd)({});
(__VLS_ctx.asset?.code);
(__VLS_ctx.asset?.type);
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "review-section" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.h3, __VLS_intrinsicElements.h3)({});
for (const [item] of __VLS_getVForSourceType((__VLS_ctx.items))) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        key: (item.id),
        ...{ class: "review-answer" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({});
    (item.question);
    __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
        ...{ class: (['status-pill', item.answer === 'good' ? 'status-good' : 'status-danger']) },
    });
    if (item.answer === 'good') {
        const __VLS_0 = {}.CheckCircle2;
        /** @type {[typeof __VLS_components.CheckCircle2, ]} */ ;
        // @ts-ignore
        const __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0({
            size: (12),
        }));
        const __VLS_2 = __VLS_1({
            size: (12),
        }, ...__VLS_functionalComponentArgsRest(__VLS_1));
    }
    (__VLS_ctx.conditionLabels[item.answer] || 'Belum diisi');
}
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "review-answer" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({});
(__VLS_ctx.notes || 'Tidak ada keterangan');
__VLS_asFunctionalElement(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({
    ...{ class: "submit-confirm" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.input)({
    type: "checkbox",
});
(__VLS_ctx.confirmed);
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "form-footer" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({
    ...{ onClick: (...[$event]) => {
            __VLS_ctx.router.back();
        } },
    ...{ class: "btn btn-secondary" },
});
const __VLS_4 = {}.ArrowLeft;
/** @type {[typeof __VLS_components.ArrowLeft, ]} */ ;
// @ts-ignore
const __VLS_5 = __VLS_asFunctionalComponent(__VLS_4, new __VLS_4({
    size: (16),
}));
const __VLS_6 = __VLS_5({
    size: (16),
}, ...__VLS_functionalComponentArgsRest(__VLS_5));
__VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({
    ...{ onClick: (__VLS_ctx.submit) },
    ...{ class: "btn btn-primary" },
    disabled: (!__VLS_ctx.confirmed || __VLS_ctx.sending),
    ...{ style: ({ opacity: __VLS_ctx.confirmed && !__VLS_ctx.sending ? 1 : .5 }) },
});
const __VLS_8 = {}.Send;
/** @type {[typeof __VLS_components.Send, ]} */ ;
// @ts-ignore
const __VLS_9 = __VLS_asFunctionalComponent(__VLS_8, new __VLS_8({
    size: (15),
}));
const __VLS_10 = __VLS_9({
    size: (15),
}, ...__VLS_functionalComponentArgsRest(__VLS_9));
(__VLS_ctx.sending ? 'Mengirim...' : 'Kirim pemeriksaan');
/** @type {__VLS_StyleScopedClasses['page-intro']} */ ;
/** @type {__VLS_StyleScopedClasses['eyebrow']} */ ;
/** @type {__VLS_StyleScopedClasses['review-card']} */ ;
/** @type {__VLS_StyleScopedClasses['notice']} */ ;
/** @type {__VLS_StyleScopedClasses['review-section']} */ ;
/** @type {__VLS_StyleScopedClasses['data-list']} */ ;
/** @type {__VLS_StyleScopedClasses['review-section']} */ ;
/** @type {__VLS_StyleScopedClasses['review-answer']} */ ;
/** @type {__VLS_StyleScopedClasses['status-pill']} */ ;
/** @type {__VLS_StyleScopedClasses['review-answer']} */ ;
/** @type {__VLS_StyleScopedClasses['submit-confirm']} */ ;
/** @type {__VLS_StyleScopedClasses['form-footer']} */ ;
/** @type {__VLS_StyleScopedClasses['btn']} */ ;
/** @type {__VLS_StyleScopedClasses['btn-secondary']} */ ;
/** @type {__VLS_StyleScopedClasses['btn']} */ ;
/** @type {__VLS_StyleScopedClasses['btn-primary']} */ ;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            ArrowLeft: ArrowLeft,
            CheckCircle2: CheckCircle2,
            Send: Send,
            conditionLabels: conditionLabels,
            router: router,
            inspector: inspector,
            items: items,
            notes: notes,
            asset: asset,
            confirmed: confirmed,
            sending: sending,
            error: error,
            submit: submit,
        };
    },
});
export default (await import('vue')).defineComponent({
    setup() {
        return {};
    },
});
; /* PartiallyEnd: #4569/main.vue */
