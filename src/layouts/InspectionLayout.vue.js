import { CircleCheck } from 'lucide-vue-next';
import { RouterLink, useRoute } from 'vue-router';
const route = useRoute();
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "inspection-shell" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.header, __VLS_intrinsicElements.header)({
    ...{ class: "inspection-header" },
});
const __VLS_0 = {}.RouterLink;
/** @type {[typeof __VLS_components.RouterLink, typeof __VLS_components.RouterLink, ]} */ ;
// @ts-ignore
const __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0({
    to: "/",
    ...{ class: "brand brand-light" },
}));
const __VLS_2 = __VLS_1({
    to: "/",
    ...{ class: "brand brand-light" },
}, ...__VLS_functionalComponentArgsRest(__VLS_1));
__VLS_3.slots.default;
__VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
    ...{ class: "brand-mark" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.img)({
    src: "/Logo Pura.png",
    alt: "Logo Pura",
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
    ...{ class: "brand-accent" },
});
var __VLS_3;
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "secure-label" },
});
const __VLS_4 = {}.CircleCheck;
/** @type {[typeof __VLS_components.CircleCheck, ]} */ ;
// @ts-ignore
const __VLS_5 = __VLS_asFunctionalComponent(__VLS_4, new __VLS_4({
    size: (16),
}));
const __VLS_6 = __VLS_5({
    size: (16),
}, ...__VLS_functionalComponentArgsRest(__VLS_5));
if (__VLS_ctx.route.path.includes('/checklist') || __VLS_ctx.route.path.includes('/review')) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "stepper" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "step done" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({});
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "step-line" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: (['step', __VLS_ctx.route.path.includes('review') ? 'done' : 'active']) },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({});
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "step-line" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: (['step', __VLS_ctx.route.path.includes('review') ? 'active' : '']) },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({});
}
__VLS_asFunctionalElement(__VLS_intrinsicElements.main, __VLS_intrinsicElements.main)({
    ...{ class: "inspection-main" },
});
var __VLS_8 = {};
/** @type {__VLS_StyleScopedClasses['inspection-shell']} */ ;
/** @type {__VLS_StyleScopedClasses['inspection-header']} */ ;
/** @type {__VLS_StyleScopedClasses['brand']} */ ;
/** @type {__VLS_StyleScopedClasses['brand-light']} */ ;
/** @type {__VLS_StyleScopedClasses['brand-mark']} */ ;
/** @type {__VLS_StyleScopedClasses['brand-accent']} */ ;
/** @type {__VLS_StyleScopedClasses['secure-label']} */ ;
/** @type {__VLS_StyleScopedClasses['stepper']} */ ;
/** @type {__VLS_StyleScopedClasses['step']} */ ;
/** @type {__VLS_StyleScopedClasses['done']} */ ;
/** @type {__VLS_StyleScopedClasses['step-line']} */ ;
/** @type {__VLS_StyleScopedClasses['step']} */ ;
/** @type {__VLS_StyleScopedClasses['step-line']} */ ;
/** @type {__VLS_StyleScopedClasses['step']} */ ;
/** @type {__VLS_StyleScopedClasses['inspection-main']} */ ;
// @ts-ignore
var __VLS_9 = __VLS_8;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            CircleCheck: CircleCheck,
            RouterLink: RouterLink,
            route: route,
        };
    },
});
const __VLS_component = (await import('vue')).defineComponent({
    setup() {
        return {};
    },
});
export default {};
; /* PartiallyEnd: #4569/main.vue */
