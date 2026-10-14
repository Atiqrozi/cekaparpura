import { computed } from 'vue';
import { useRoute } from 'vue-router';
import PublicLayout from './layouts/PublicLayout.vue';
import InspectionLayout from './layouts/InspectionLayout.vue';
import AdminLayout from './layouts/AdminLayout.vue';
const route = useRoute();
const standalone = computed(() => route.path === '/admin/login');
const layout = computed(() => {
    if (route.path.startsWith('/admin') && !standalone.value)
        return AdminLayout;
    if (route.path.startsWith('/pemeriksaan'))
        return InspectionLayout;
    return PublicLayout;
});
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
if (__VLS_ctx.standalone) {
    const __VLS_0 = {}.RouterView;
    /** @type {[typeof __VLS_components.RouterView, typeof __VLS_components.routerView, ]} */ ;
    // @ts-ignore
    const __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0({}));
    const __VLS_2 = __VLS_1({}, ...__VLS_functionalComponentArgsRest(__VLS_1));
    var __VLS_4 = {};
    var __VLS_3;
}
else {
    const __VLS_5 = ((__VLS_ctx.layout));
    // @ts-ignore
    const __VLS_6 = __VLS_asFunctionalComponent(__VLS_5, new __VLS_5({}));
    const __VLS_7 = __VLS_6({}, ...__VLS_functionalComponentArgsRest(__VLS_6));
    var __VLS_9 = {};
    __VLS_8.slots.default;
    const __VLS_10 = {}.RouterView;
    /** @type {[typeof __VLS_components.RouterView, typeof __VLS_components.routerView, ]} */ ;
    // @ts-ignore
    const __VLS_11 = __VLS_asFunctionalComponent(__VLS_10, new __VLS_10({}));
    const __VLS_12 = __VLS_11({}, ...__VLS_functionalComponentArgsRest(__VLS_11));
    var __VLS_8;
}
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            standalone: standalone,
            layout: layout,
        };
    },
});
export default (await import('vue')).defineComponent({
    setup() {
        return {};
    },
});
; /* PartiallyEnd: #4569/main.vue */
