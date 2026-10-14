import { BarChart3, Bell, ClipboardCheck, LayoutDashboard, LogOut, Menu, Package, Settings, Users, X } from 'lucide-vue-next';
import { ref } from 'vue';
import { RouterLink, useRoute } from 'vue-router';
import { clearAccessToken } from '../services/api.service';
const collapsed = ref(false);
const route = useRoute();
const links = [
    { to: '/admin', label: 'Ringkasan', icon: LayoutDashboard },
    { to: '/admin/pemeriksaan', label: 'Pemeriksaan', icon: ClipboardCheck },
    { to: '/admin/apar', label: 'Inventaris APAR', icon: Package },
    { to: '/admin/jadwal', label: 'Jadwal', icon: BarChart3 },
    { to: '/admin/tindak-lanjut', label: 'Tindak lanjut', icon: Bell },
    { to: '/admin/pengguna', label: 'Pengguna', icon: Users },
];
function logout() {
    clearAccessToken();
    window.location.href = '/admin/login';
}
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "admin-shell" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.aside, __VLS_intrinsicElements.aside)({
    ...{ class: (['sidebar', { collapsed: __VLS_ctx.collapsed }]) },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "sidebar-top" },
});
const __VLS_0 = {}.RouterLink;
/** @type {[typeof __VLS_components.RouterLink, typeof __VLS_components.RouterLink, ]} */ ;
// @ts-ignore
const __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0({
    to: "/admin",
    ...{ class: "brand brand-light" },
}));
const __VLS_2 = __VLS_1({
    to: "/admin",
    ...{ class: "brand brand-light" },
}, ...__VLS_functionalComponentArgsRest(__VLS_1));
__VLS_3.slots.default;
__VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
    ...{ class: "brand-mark admin-logo-mark" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.img)({
    src: "/Logo Pura.png",
    alt: "Logo RS Korpri Pura Raharja",
});
if (!__VLS_ctx.collapsed) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({});
    __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
        ...{ class: "brand-accent" },
    });
}
var __VLS_3;
__VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({
    ...{ onClick: (...[$event]) => {
            __VLS_ctx.collapsed = !__VLS_ctx.collapsed;
        } },
    ...{ class: "icon-button sidebar-toggle" },
    'aria-label': (__VLS_ctx.collapsed ? 'Buka sidebar' : 'Ciutkan sidebar'),
});
if (!__VLS_ctx.collapsed) {
    const __VLS_4 = {}.X;
    /** @type {[typeof __VLS_components.X, ]} */ ;
    // @ts-ignore
    const __VLS_5 = __VLS_asFunctionalComponent(__VLS_4, new __VLS_4({
        size: (18),
    }));
    const __VLS_6 = __VLS_5({
        size: (18),
    }, ...__VLS_functionalComponentArgsRest(__VLS_5));
}
else {
    const __VLS_8 = {}.Menu;
    /** @type {[typeof __VLS_components.Menu, ]} */ ;
    // @ts-ignore
    const __VLS_9 = __VLS_asFunctionalComponent(__VLS_8, new __VLS_8({
        size: (18),
    }));
    const __VLS_10 = __VLS_9({
        size: (18),
    }, ...__VLS_functionalComponentArgsRest(__VLS_9));
}
if (!__VLS_ctx.collapsed) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "workspace" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
        ...{ class: "workspace-dot" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({});
    __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
        ...{ class: "chevron" },
    });
}
__VLS_asFunctionalElement(__VLS_intrinsicElements.nav, __VLS_intrinsicElements.nav)({
    ...{ class: "side-nav" },
});
for (const [link] of __VLS_getVForSourceType((__VLS_ctx.links))) {
    const __VLS_12 = {}.RouterLink;
    /** @type {[typeof __VLS_components.RouterLink, typeof __VLS_components.RouterLink, ]} */ ;
    // @ts-ignore
    const __VLS_13 = __VLS_asFunctionalComponent(__VLS_12, new __VLS_12({
        key: (link.to),
        to: (link.to),
        ...{ class: ({ selected: __VLS_ctx.route.path === link.to }) },
    }));
    const __VLS_14 = __VLS_13({
        key: (link.to),
        to: (link.to),
        ...{ class: ({ selected: __VLS_ctx.route.path === link.to }) },
    }, ...__VLS_functionalComponentArgsRest(__VLS_13));
    __VLS_15.slots.default;
    const __VLS_16 = ((link.icon));
    // @ts-ignore
    const __VLS_17 = __VLS_asFunctionalComponent(__VLS_16, new __VLS_16({
        size: (18),
    }));
    const __VLS_18 = __VLS_17({
        size: (18),
    }, ...__VLS_functionalComponentArgsRest(__VLS_17));
    if (!__VLS_ctx.collapsed) {
        __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({});
        (link.label);
    }
    var __VLS_15;
}
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "sidebar-bottom" },
});
const __VLS_20 = {}.RouterLink;
/** @type {[typeof __VLS_components.RouterLink, typeof __VLS_components.RouterLink, ]} */ ;
// @ts-ignore
const __VLS_21 = __VLS_asFunctionalComponent(__VLS_20, new __VLS_20({
    to: "/admin/pengaturan",
}));
const __VLS_22 = __VLS_21({
    to: "/admin/pengaturan",
}, ...__VLS_functionalComponentArgsRest(__VLS_21));
__VLS_23.slots.default;
const __VLS_24 = {}.Settings;
/** @type {[typeof __VLS_components.Settings, ]} */ ;
// @ts-ignore
const __VLS_25 = __VLS_asFunctionalComponent(__VLS_24, new __VLS_24({
    size: (18),
}));
const __VLS_26 = __VLS_25({
    size: (18),
}, ...__VLS_functionalComponentArgsRest(__VLS_25));
if (!__VLS_ctx.collapsed) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({});
}
var __VLS_23;
__VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({
    ...{ onClick: (__VLS_ctx.logout) },
    ...{ class: "sidebar-link" },
});
const __VLS_28 = {}.LogOut;
/** @type {[typeof __VLS_components.LogOut, ]} */ ;
// @ts-ignore
const __VLS_29 = __VLS_asFunctionalComponent(__VLS_28, new __VLS_28({
    size: (18),
}));
const __VLS_30 = __VLS_29({
    size: (18),
}, ...__VLS_functionalComponentArgsRest(__VLS_29));
if (!__VLS_ctx.collapsed) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({});
}
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "admin-content" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.header, __VLS_intrinsicElements.header)({
    ...{ class: "admin-topbar" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
    ...{ class: "eyebrow" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.h1, __VLS_intrinsicElements.h1)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "topbar-actions" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({
    ...{ class: "notification-button" },
    'aria-label': "Notifikasi",
});
const __VLS_32 = {}.Bell;
/** @type {[typeof __VLS_components.Bell, ]} */ ;
// @ts-ignore
const __VLS_33 = __VLS_asFunctionalComponent(__VLS_32, new __VLS_32({
    size: (19),
}));
const __VLS_34 = __VLS_33({
    size: (19),
}, ...__VLS_functionalComponentArgsRest(__VLS_33));
__VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "avatar" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "admin-name" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.small, __VLS_intrinsicElements.small)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.main, __VLS_intrinsicElements.main)({
    ...{ class: "admin-main" },
});
var __VLS_36 = {};
/** @type {__VLS_StyleScopedClasses['admin-shell']} */ ;
/** @type {__VLS_StyleScopedClasses['collapsed']} */ ;
/** @type {__VLS_StyleScopedClasses['sidebar']} */ ;
/** @type {__VLS_StyleScopedClasses['sidebar-top']} */ ;
/** @type {__VLS_StyleScopedClasses['brand']} */ ;
/** @type {__VLS_StyleScopedClasses['brand-light']} */ ;
/** @type {__VLS_StyleScopedClasses['brand-mark']} */ ;
/** @type {__VLS_StyleScopedClasses['admin-logo-mark']} */ ;
/** @type {__VLS_StyleScopedClasses['brand-accent']} */ ;
/** @type {__VLS_StyleScopedClasses['icon-button']} */ ;
/** @type {__VLS_StyleScopedClasses['sidebar-toggle']} */ ;
/** @type {__VLS_StyleScopedClasses['workspace']} */ ;
/** @type {__VLS_StyleScopedClasses['workspace-dot']} */ ;
/** @type {__VLS_StyleScopedClasses['chevron']} */ ;
/** @type {__VLS_StyleScopedClasses['side-nav']} */ ;
/** @type {__VLS_StyleScopedClasses['selected']} */ ;
/** @type {__VLS_StyleScopedClasses['sidebar-bottom']} */ ;
/** @type {__VLS_StyleScopedClasses['sidebar-link']} */ ;
/** @type {__VLS_StyleScopedClasses['admin-content']} */ ;
/** @type {__VLS_StyleScopedClasses['admin-topbar']} */ ;
/** @type {__VLS_StyleScopedClasses['eyebrow']} */ ;
/** @type {__VLS_StyleScopedClasses['topbar-actions']} */ ;
/** @type {__VLS_StyleScopedClasses['notification-button']} */ ;
/** @type {__VLS_StyleScopedClasses['avatar']} */ ;
/** @type {__VLS_StyleScopedClasses['admin-name']} */ ;
/** @type {__VLS_StyleScopedClasses['admin-main']} */ ;
// @ts-ignore
var __VLS_37 = __VLS_36;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            Bell: Bell,
            LogOut: LogOut,
            Menu: Menu,
            Settings: Settings,
            X: X,
            RouterLink: RouterLink,
            collapsed: collapsed,
            route: route,
            links: links,
            logout: logout,
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
