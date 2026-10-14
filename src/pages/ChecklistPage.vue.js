import { computed, ref } from 'vue';
import { ArrowLeft, ArrowRight } from 'lucide-vue-next';
import { useRouter } from 'vue-router';
import { checklistItems } from '../services/mock.service';
import { api } from '../services/api.service';
const router = useRouter();
const items = ref(checklistItems.map(item => ({ ...item })));
const asset = ref(null);
api.getAsset(String(router.currentRoute.value.params.id)).then(value => { asset.value = value; }).catch(() => { asset.value = null; });
const notes = ref(sessionStorage.getItem('inspection-notes') || '');
const completed = computed(() => items.value.filter(item => item.answer !== null).length);
const progress = computed(() => Math.round(completed.value / items.value.length * 100));
function choose(index, answer) { items.value[index].answer = answer; }
function next() { if (completed.value !== items.value.length)
    return; sessionStorage.setItem('inspection-checklist', JSON.stringify(items.value)); sessionStorage.setItem('inspection-notes', notes.value); router.push(`/pemeriksaan/${router.currentRoute.value.params.id}/review`); }
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
/** @type {__VLS_StyleScopedClasses['notes-textarea']} */ ;
/** @type {__VLS_StyleScopedClasses['notes-textarea']} */ ;
// CSS variable injection 
// CSS variable injection end 
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "checklist-header" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "page-intro" },
    ...{ style: {} },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
    ...{ class: "eyebrow" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.h1, __VLS_intrinsicElements.h1)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({});
(__VLS_ctx.asset?.code);
(__VLS_ctx.asset?.locationName);
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "progress-wrap" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "progress-text" },
});
(__VLS_ctx.completed);
(__VLS_ctx.items.length);
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "progress" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ style: ({ width: `${__VLS_ctx.progress}%` }) },
});
for (const [item, index] of __VLS_getVForSourceType((__VLS_ctx.items))) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        key: (item.id),
        ...{ class: "question-card" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
        ...{ class: "question-category" },
    });
    (item.category);
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "question-text" },
    });
    (index + 1);
    (item.question);
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "answer-options" },
    });
    for (const [answer] of __VLS_getVForSourceType(([['good', 'Baik'], ['bad', 'Jelek']]))) {
        __VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({
            ...{ onClick: (...[$event]) => {
                    __VLS_ctx.choose(index, answer[0]);
                } },
            key: (answer[0]),
            ...{ class: (['answer-option', { selected: item.answer === answer[0], danger: answer[0] === 'bad' }]) },
        });
        (answer[1]);
    }
}
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "question-card notes-card" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
    ...{ class: "question-category" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({
    for: "inspection-notes",
    ...{ class: "notes-label" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({
    ...{ class: "notes-hint" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.textarea, __VLS_intrinsicElements.textarea)({
    id: "inspection-notes",
    value: (__VLS_ctx.notes),
    ...{ class: "notes-textarea" },
    rows: "4",
    maxlength: "500",
    placeholder: "Contoh: Kondisi APAR cukup baik dan dapat digunakan.",
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "notes-footer" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({});
(__VLS_ctx.notes.length);
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "form-footer" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({
    ...{ onClick: (...[$event]) => {
            __VLS_ctx.router.push('/pemeriksaan/mulai');
        } },
    ...{ class: "btn btn-secondary" },
});
const __VLS_0 = {}.ArrowLeft;
/** @type {[typeof __VLS_components.ArrowLeft, ]} */ ;
// @ts-ignore
const __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0({
    size: (16),
}));
const __VLS_2 = __VLS_1({
    size: (16),
}, ...__VLS_functionalComponentArgsRest(__VLS_1));
__VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({
    ...{ onClick: (__VLS_ctx.next) },
    ...{ class: "btn btn-primary" },
    disabled: (__VLS_ctx.completed !== __VLS_ctx.items.length),
    ...{ style: ({ opacity: __VLS_ctx.completed === __VLS_ctx.items.length ? 1 : .5 }) },
});
const __VLS_4 = {}.ArrowRight;
/** @type {[typeof __VLS_components.ArrowRight, ]} */ ;
// @ts-ignore
const __VLS_5 = __VLS_asFunctionalComponent(__VLS_4, new __VLS_4({
    size: (16),
}));
const __VLS_6 = __VLS_5({
    size: (16),
}, ...__VLS_functionalComponentArgsRest(__VLS_5));
/** @type {__VLS_StyleScopedClasses['checklist-header']} */ ;
/** @type {__VLS_StyleScopedClasses['page-intro']} */ ;
/** @type {__VLS_StyleScopedClasses['eyebrow']} */ ;
/** @type {__VLS_StyleScopedClasses['progress-wrap']} */ ;
/** @type {__VLS_StyleScopedClasses['progress-text']} */ ;
/** @type {__VLS_StyleScopedClasses['progress']} */ ;
/** @type {__VLS_StyleScopedClasses['question-card']} */ ;
/** @type {__VLS_StyleScopedClasses['question-category']} */ ;
/** @type {__VLS_StyleScopedClasses['question-text']} */ ;
/** @type {__VLS_StyleScopedClasses['answer-options']} */ ;
/** @type {__VLS_StyleScopedClasses['selected']} */ ;
/** @type {__VLS_StyleScopedClasses['danger']} */ ;
/** @type {__VLS_StyleScopedClasses['answer-option']} */ ;
/** @type {__VLS_StyleScopedClasses['question-card']} */ ;
/** @type {__VLS_StyleScopedClasses['notes-card']} */ ;
/** @type {__VLS_StyleScopedClasses['question-category']} */ ;
/** @type {__VLS_StyleScopedClasses['notes-label']} */ ;
/** @type {__VLS_StyleScopedClasses['notes-hint']} */ ;
/** @type {__VLS_StyleScopedClasses['notes-textarea']} */ ;
/** @type {__VLS_StyleScopedClasses['notes-footer']} */ ;
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
            ArrowRight: ArrowRight,
            router: router,
            items: items,
            asset: asset,
            notes: notes,
            completed: completed,
            progress: progress,
            choose: choose,
            next: next,
        };
    },
});
export default (await import('vue')).defineComponent({
    setup() {
        return {};
    },
});
; /* PartiallyEnd: #4569/main.vue */
