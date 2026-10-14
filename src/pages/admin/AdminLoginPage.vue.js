import { LockKeyhole, Mail, ArrowRight } from 'lucide-vue-next';
import { ref } from 'vue';
import { RouterLink, useRouter } from 'vue-router';
import { api, saveAccessToken } from '../../services/api.service';
const router = useRouter();
const email = ref('');
const password = ref('');
const error = ref('');
const sending = ref(false);
async function login() {
    if (!email.value || !password.value) {
        error.value = 'Email dan password wajib diisi.';
        return;
    }
    sending.value = true;
    error.value = '';
    try {
        const response = await api.login(email.value, password.value);
        saveAccessToken(response.accessToken);
        router.push('/admin');
    }
    catch (err) {
        error.value = err instanceof Error ? err.message : 'Login gagal. Silakan coba lagi.';
    }
    finally {
        sending.value = false;
    }
}
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
__VLS_asFunctionalElement(__VLS_intrinsicElements.main, __VLS_intrinsicElements.main)({
    ...{ class: "admin-login" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.section, __VLS_intrinsicElements.section)({
    ...{ class: "admin-login-brand" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "admin-login-brand-content" },
});
const __VLS_0 = {}.RouterLink;
/** @type {[typeof __VLS_components.RouterLink, typeof __VLS_components.RouterLink, ]} */ ;
// @ts-ignore
const __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0({
    to: "/",
    ...{ class: "login-brand" },
}));
const __VLS_2 = __VLS_1({
    to: "/",
    ...{ class: "login-brand" },
}, ...__VLS_functionalComponentArgsRest(__VLS_1));
__VLS_3.slots.default;
__VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
    ...{ class: "login-brand-mark" },
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
    ...{ class: "login-brand-copy" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
    ...{ class: "eyebrow" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.h1, __VLS_intrinsicElements.h1)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "login-brand-footer" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.section, __VLS_intrinsicElements.section)({
    ...{ class: "admin-login-form" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "login-form-inner" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
    ...{ class: "eyebrow" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.h2, __VLS_intrinsicElements.h2)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({
    ...{ class: "login-form-intro" },
});
if (__VLS_ctx.error) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "notice login-error" },
    });
    (__VLS_ctx.error);
}
__VLS_asFunctionalElement(__VLS_intrinsicElements.form, __VLS_intrinsicElements.form)({
    ...{ onSubmit: (__VLS_ctx.login) },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "field" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({
    for: "email",
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "login-input-wrap" },
});
const __VLS_4 = {}.Mail;
/** @type {[typeof __VLS_components.Mail, ]} */ ;
// @ts-ignore
const __VLS_5 = __VLS_asFunctionalComponent(__VLS_4, new __VLS_4({
    size: (17),
}));
const __VLS_6 = __VLS_5({
    size: (17),
}, ...__VLS_functionalComponentArgsRest(__VLS_5));
__VLS_asFunctionalElement(__VLS_intrinsicElements.input)({
    id: "email",
    type: "email",
    autocomplete: "email",
    placeholder: "admin@purabarutama.com",
});
(__VLS_ctx.email);
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "field" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({
    for: "password",
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "login-input-wrap" },
});
const __VLS_8 = {}.LockKeyhole;
/** @type {[typeof __VLS_components.LockKeyhole, ]} */ ;
// @ts-ignore
const __VLS_9 = __VLS_asFunctionalComponent(__VLS_8, new __VLS_8({
    size: (17),
}));
const __VLS_10 = __VLS_9({
    size: (17),
}, ...__VLS_functionalComponentArgsRest(__VLS_9));
__VLS_asFunctionalElement(__VLS_intrinsicElements.input)({
    id: "password",
    type: "password",
    autocomplete: "current-password",
    placeholder: "Masukkan password",
});
(__VLS_ctx.password);
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "login-options" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.a, __VLS_intrinsicElements.a)({
    ...{ onClick: () => { } },
    href: "#",
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({
    ...{ class: "btn btn-primary login-submit" },
    type: "submit",
    disabled: (__VLS_ctx.sending),
});
(__VLS_ctx.sending ? 'Memproses...' : 'Masuk ke dashboard');
const __VLS_12 = {}.ArrowRight;
/** @type {[typeof __VLS_components.ArrowRight, ]} */ ;
// @ts-ignore
const __VLS_13 = __VLS_asFunctionalComponent(__VLS_12, new __VLS_12({
    size: (16),
}));
const __VLS_14 = __VLS_13({
    size: (16),
}, ...__VLS_functionalComponentArgsRest(__VLS_13));
const __VLS_16 = {}.RouterLink;
/** @type {[typeof __VLS_components.RouterLink, typeof __VLS_components.RouterLink, ]} */ ;
// @ts-ignore
const __VLS_17 = __VLS_asFunctionalComponent(__VLS_16, new __VLS_16({
    to: "/",
    ...{ class: "login-back" },
}));
const __VLS_18 = __VLS_17({
    to: "/",
    ...{ class: "login-back" },
}, ...__VLS_functionalComponentArgsRest(__VLS_17));
__VLS_19.slots.default;
var __VLS_19;
/** @type {__VLS_StyleScopedClasses['admin-login']} */ ;
/** @type {__VLS_StyleScopedClasses['admin-login-brand']} */ ;
/** @type {__VLS_StyleScopedClasses['admin-login-brand-content']} */ ;
/** @type {__VLS_StyleScopedClasses['login-brand']} */ ;
/** @type {__VLS_StyleScopedClasses['login-brand-mark']} */ ;
/** @type {__VLS_StyleScopedClasses['brand-accent']} */ ;
/** @type {__VLS_StyleScopedClasses['login-brand-copy']} */ ;
/** @type {__VLS_StyleScopedClasses['eyebrow']} */ ;
/** @type {__VLS_StyleScopedClasses['login-brand-footer']} */ ;
/** @type {__VLS_StyleScopedClasses['admin-login-form']} */ ;
/** @type {__VLS_StyleScopedClasses['login-form-inner']} */ ;
/** @type {__VLS_StyleScopedClasses['eyebrow']} */ ;
/** @type {__VLS_StyleScopedClasses['login-form-intro']} */ ;
/** @type {__VLS_StyleScopedClasses['notice']} */ ;
/** @type {__VLS_StyleScopedClasses['login-error']} */ ;
/** @type {__VLS_StyleScopedClasses['field']} */ ;
/** @type {__VLS_StyleScopedClasses['login-input-wrap']} */ ;
/** @type {__VLS_StyleScopedClasses['field']} */ ;
/** @type {__VLS_StyleScopedClasses['login-input-wrap']} */ ;
/** @type {__VLS_StyleScopedClasses['login-options']} */ ;
/** @type {__VLS_StyleScopedClasses['btn']} */ ;
/** @type {__VLS_StyleScopedClasses['btn-primary']} */ ;
/** @type {__VLS_StyleScopedClasses['login-submit']} */ ;
/** @type {__VLS_StyleScopedClasses['login-back']} */ ;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            LockKeyhole: LockKeyhole,
            Mail: Mail,
            ArrowRight: ArrowRight,
            RouterLink: RouterLink,
            email: email,
            password: password,
            error: error,
            sending: sending,
            login: login,
        };
    },
});
export default (await import('vue')).defineComponent({
    setup() {
        return {};
    },
});
; /* PartiallyEnd: #4569/main.vue */
