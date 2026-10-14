import { Plus, Search, X } from 'lucide-vue-next';
import { computed, onMounted, reactive, ref } from 'vue';
import { conditionClass, conditionLabels } from '../../services/mock.service';
import { api } from '../../services/api.service';
const search = ref('');
const assets = ref([]);
const locations = ref([]);
const error = ref('');
const success = ref('');
const showForm = ref(false);
const saving = ref(false);
const statusFilter = ref('');
const emptyForm = () => ({
    code: '',
    type: '',
    brand: '',
    capacity: '',
    serialNumber: '',
    floor: '1',
    specificLocation: '',
    installedAt: '',
    serviceDueAt: '',
    inspectionIntervalDays: 30,
    notes: '',
});
const form = reactive(emptyForm());
const floorOptions = [1, 2, 3, 4, 5];
const floorLocation = (floor) => locations.value.find((location) => location.code === `LANTAI-${floor}`);
const locationName = (item) => {
    const location = locations.value.find((candidate) => candidate._id === item.locationId);
    return location ? location.name : item.locationName;
};
async function loadData() {
    try {
        const [assetResponse, locationResponse] = await Promise.all([api.getAssets(), api.getLocations()]);
        assets.value = assetResponse.data;
        locations.value = locationResponse;
    }
    catch (err) {
        error.value = err instanceof Error ? err.message : 'Inventaris gagal dimuat.';
    }
}
onMounted(loadData);
const filtered = computed(() => assets.value.filter((item) => {
    const matchesSearch = `${item.code} ${item.type} ${item.locationName}`.toLowerCase().includes(search.value.toLowerCase());
    const matchesStatus = !statusFilter.value || item.condition === statusFilter.value;
    return matchesSearch && matchesStatus;
}));
function openForm() {
    Object.assign(form, emptyForm());
    error.value = '';
    success.value = '';
    showForm.value = true;
}
function closeForm() {
    if (!saving.value)
        showForm.value = false;
}
async function submitForm() {
    error.value = '';
    success.value = '';
    saving.value = true;
    try {
        let location = floorLocation(form.floor);
        if (!location) {
            location = await api.createLocation({
                name: `Lantai ${form.floor}`,
                code: `LANTAI-${form.floor}`,
                description: `Lokasi APAR lantai ${form.floor}`,
            });
            locations.value.push(location);
        }
        await api.createAsset({
            code: form.code.trim(),
            type: form.type.trim(),
            brand: form.brand.trim(),
            capacity: form.capacity.trim() || undefined,
            serialNumber: form.serialNumber.trim() || undefined,
            locationId: location._id,
            specificLocation: form.specificLocation.trim() || undefined,
            installedAt: form.installedAt || undefined,
            serviceDueAt: form.serviceDueAt || undefined,
            inspectionIntervalDays: Number(form.inspectionIntervalDays),
            notes: form.notes.trim() || undefined,
        });
        await loadData();
        showForm.value = false;
        success.value = `APAR ${form.code} berhasil ditambahkan ke Lantai ${form.floor}.`;
    }
    catch (err) {
        error.value = err instanceof Error ? err.message : 'APAR gagal ditambahkan.';
    }
    finally {
        saving.value = false;
    }
}
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
/** @type {__VLS_StyleScopedClasses['asset-search']} */ ;
/** @type {__VLS_StyleScopedClasses['asset-search']} */ ;
/** @type {__VLS_StyleScopedClasses['modal-header']} */ ;
/** @type {__VLS_StyleScopedClasses['modal-header']} */ ;
/** @type {__VLS_StyleScopedClasses['modal-actions']} */ ;
/** @type {__VLS_StyleScopedClasses['assets-title']} */ ;
/** @type {__VLS_StyleScopedClasses['modal-card']} */ ;
// CSS variable injection 
// CSS variable injection end 
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "admin-page-title assets-title" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.h2, __VLS_intrinsicElements.h2)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({
    ...{ onClick: (__VLS_ctx.openForm) },
    ...{ class: "btn btn-primary" },
});
const __VLS_0 = {}.Plus;
/** @type {[typeof __VLS_components.Plus, ]} */ ;
// @ts-ignore
const __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0({
    size: (16),
}));
const __VLS_2 = __VLS_1({
    size: (16),
}, ...__VLS_functionalComponentArgsRest(__VLS_1));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "toolbar" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "asset-search" },
});
const __VLS_4 = {}.Search;
/** @type {[typeof __VLS_components.Search, ]} */ ;
// @ts-ignore
const __VLS_5 = __VLS_asFunctionalComponent(__VLS_4, new __VLS_4({
    size: (16),
}));
const __VLS_6 = __VLS_5({
    size: (16),
}, ...__VLS_functionalComponentArgsRest(__VLS_5));
__VLS_asFunctionalElement(__VLS_intrinsicElements.input)({
    ...{ class: "search-input" },
    placeholder: "Cari kode, tipe, atau lokasi...",
});
(__VLS_ctx.search);
__VLS_asFunctionalElement(__VLS_intrinsicElements.select, __VLS_intrinsicElements.select)({
    value: (__VLS_ctx.statusFilter),
    ...{ class: "filter-select" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.option, __VLS_intrinsicElements.option)({
    value: "",
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.option, __VLS_intrinsicElements.option)({
    value: "active",
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.option, __VLS_intrinsicElements.option)({
    value: "inactive",
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.option, __VLS_intrinsicElements.option)({
    value: "out_of_service",
});
if (__VLS_ctx.error && !__VLS_ctx.showForm) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "notice" },
        ...{ style: {} },
    });
    (__VLS_ctx.error);
}
if (__VLS_ctx.success) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "success-notice" },
    });
    (__VLS_ctx.success);
}
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "panel" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "table-wrap" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.table, __VLS_intrinsicElements.table)({
    ...{ class: "data-table" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.thead, __VLS_intrinsicElements.thead)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.tr, __VLS_intrinsicElements.tr)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.th, __VLS_intrinsicElements.th)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.th, __VLS_intrinsicElements.th)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.th, __VLS_intrinsicElements.th)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.th, __VLS_intrinsicElements.th)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.th, __VLS_intrinsicElements.th)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.th, __VLS_intrinsicElements.th)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.tbody, __VLS_intrinsicElements.tbody)({});
for (const [item] of __VLS_getVForSourceType((__VLS_ctx.filtered))) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.tr, __VLS_intrinsicElements.tr)({
        key: (item.id),
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.td, __VLS_intrinsicElements.td)({});
    (item.code);
    __VLS_asFunctionalElement(__VLS_intrinsicElements.td, __VLS_intrinsicElements.td)({});
    (item.type);
    __VLS_asFunctionalElement(__VLS_intrinsicElements.br)({});
    __VLS_asFunctionalElement(__VLS_intrinsicElements.small, __VLS_intrinsicElements.small)({
        ...{ style: {} },
    });
    (item.capacity || '-');
    __VLS_asFunctionalElement(__VLS_intrinsicElements.td, __VLS_intrinsicElements.td)({});
    (__VLS_ctx.locationName(item));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.td, __VLS_intrinsicElements.td)({});
    if (item.lastInspectionAt) {
        (item.lastInspectionAt.slice(0, 10));
        __VLS_asFunctionalElement(__VLS_intrinsicElements.br)({});
        __VLS_asFunctionalElement(__VLS_intrinsicElements.small, __VLS_intrinsicElements.small)({
            ...{ style: {} },
        });
        (item.lastInspectorName || 'Pemeriksa');
    }
    else {
    }
    __VLS_asFunctionalElement(__VLS_intrinsicElements.td, __VLS_intrinsicElements.td)({});
    (item.nextInspectionAt || 'Belum ada jadwal perbaikan');
    __VLS_asFunctionalElement(__VLS_intrinsicElements.td, __VLS_intrinsicElements.td)({});
    __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
        ...{ class: (['status-pill', __VLS_ctx.conditionClass[item.condition]]) },
    });
    (__VLS_ctx.conditionLabels[item.condition]);
}
if (!__VLS_ctx.filtered.length) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "empty-state" },
    });
}
if (__VLS_ctx.showForm) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ onClick: (__VLS_ctx.closeForm) },
        ...{ class: "modal-backdrop" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.section, __VLS_intrinsicElements.section)({
        ...{ class: "modal-card" },
        role: "dialog",
        'aria-modal': "true",
        'aria-labelledby': "add-apar-title",
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "modal-header" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({});
    __VLS_asFunctionalElement(__VLS_intrinsicElements.h3, __VLS_intrinsicElements.h3)({
        id: "add-apar-title",
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({});
    __VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({
        ...{ onClick: (__VLS_ctx.closeForm) },
        ...{ class: "icon-button" },
        'aria-label': "Tutup form",
    });
    const __VLS_8 = {}.X;
    /** @type {[typeof __VLS_components.X, ]} */ ;
    // @ts-ignore
    const __VLS_9 = __VLS_asFunctionalComponent(__VLS_8, new __VLS_8({
        size: (18),
    }));
    const __VLS_10 = __VLS_9({
        size: (18),
    }, ...__VLS_functionalComponentArgsRest(__VLS_9));
    if (__VLS_ctx.error) {
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: "notice form-notice" },
        });
        (__VLS_ctx.error);
    }
    __VLS_asFunctionalElement(__VLS_intrinsicElements.form, __VLS_intrinsicElements.form)({
        ...{ onSubmit: (__VLS_ctx.submitForm) },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "form-grid" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "field" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({
        for: "apar-code",
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
        ...{ class: "required" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.input)({
        id: "apar-code",
        required: true,
        placeholder: "Contoh: APAR-L1-001",
    });
    (__VLS_ctx.form.code);
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "field" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({
        for: "apar-type",
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
        ...{ class: "required" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.input)({
        id: "apar-type",
        required: true,
        placeholder: "Contoh: Powder",
    });
    (__VLS_ctx.form.type);
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "field" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({
        for: "apar-brand",
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
        ...{ class: "required" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.input)({
        id: "apar-brand",
        required: true,
        placeholder: "Contoh: Servvo",
    });
    (__VLS_ctx.form.brand);
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "field" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({
        for: "apar-capacity",
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.input)({
        id: "apar-capacity",
        placeholder: "Contoh: 3 kg",
    });
    (__VLS_ctx.form.capacity);
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "field" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({
        for: "apar-serial",
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.input)({
        id: "apar-serial",
        placeholder: "Opsional",
    });
    (__VLS_ctx.form.serialNumber);
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "field" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({
        for: "apar-floor",
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
        ...{ class: "required" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.select, __VLS_intrinsicElements.select)({
        id: "apar-floor",
        value: (__VLS_ctx.form.floor),
        required: true,
    });
    for (const [floor] of __VLS_getVForSourceType((__VLS_ctx.floorOptions))) {
        __VLS_asFunctionalElement(__VLS_intrinsicElements.option, __VLS_intrinsicElements.option)({
            key: (floor),
            value: (String(floor)),
        });
        (floor);
    }
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "field full" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({
        for: "apar-location",
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.input)({
        id: "apar-location",
        placeholder: "Contoh: Koridor depan ruang administrasi",
    });
    (__VLS_ctx.form.specificLocation);
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "field" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({
        for: "apar-installed",
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.input)({
        id: "apar-installed",
        type: "date",
    });
    (__VLS_ctx.form.installedAt);
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "field" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({
        for: "apar-due",
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.input)({
        id: "apar-due",
        type: "date",
    });
    (__VLS_ctx.form.serviceDueAt);
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "field" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({
        for: "apar-interval",
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.input)({
        type: "number",
        min: "1",
        required: true,
    });
    (__VLS_ctx.form.inspectionIntervalDays);
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "field full" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({
        for: "apar-notes",
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.textarea, __VLS_intrinsicElements.textarea)({
        id: "apar-notes",
        value: (__VLS_ctx.form.notes),
        placeholder: "Keterangan tambahan bila ada",
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "modal-actions" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({
        ...{ onClick: (__VLS_ctx.closeForm) },
        type: "button",
        ...{ class: "btn btn-secondary" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({
        type: "submit",
        ...{ class: "btn btn-primary" },
        disabled: (__VLS_ctx.saving),
    });
    (__VLS_ctx.saving ? 'Menyimpan...' : 'Simpan APAR');
}
/** @type {__VLS_StyleScopedClasses['admin-page-title']} */ ;
/** @type {__VLS_StyleScopedClasses['assets-title']} */ ;
/** @type {__VLS_StyleScopedClasses['btn']} */ ;
/** @type {__VLS_StyleScopedClasses['btn-primary']} */ ;
/** @type {__VLS_StyleScopedClasses['toolbar']} */ ;
/** @type {__VLS_StyleScopedClasses['asset-search']} */ ;
/** @type {__VLS_StyleScopedClasses['search-input']} */ ;
/** @type {__VLS_StyleScopedClasses['filter-select']} */ ;
/** @type {__VLS_StyleScopedClasses['notice']} */ ;
/** @type {__VLS_StyleScopedClasses['success-notice']} */ ;
/** @type {__VLS_StyleScopedClasses['panel']} */ ;
/** @type {__VLS_StyleScopedClasses['table-wrap']} */ ;
/** @type {__VLS_StyleScopedClasses['data-table']} */ ;
/** @type {__VLS_StyleScopedClasses['status-pill']} */ ;
/** @type {__VLS_StyleScopedClasses['empty-state']} */ ;
/** @type {__VLS_StyleScopedClasses['modal-backdrop']} */ ;
/** @type {__VLS_StyleScopedClasses['modal-card']} */ ;
/** @type {__VLS_StyleScopedClasses['modal-header']} */ ;
/** @type {__VLS_StyleScopedClasses['icon-button']} */ ;
/** @type {__VLS_StyleScopedClasses['notice']} */ ;
/** @type {__VLS_StyleScopedClasses['form-notice']} */ ;
/** @type {__VLS_StyleScopedClasses['form-grid']} */ ;
/** @type {__VLS_StyleScopedClasses['field']} */ ;
/** @type {__VLS_StyleScopedClasses['required']} */ ;
/** @type {__VLS_StyleScopedClasses['field']} */ ;
/** @type {__VLS_StyleScopedClasses['required']} */ ;
/** @type {__VLS_StyleScopedClasses['field']} */ ;
/** @type {__VLS_StyleScopedClasses['required']} */ ;
/** @type {__VLS_StyleScopedClasses['field']} */ ;
/** @type {__VLS_StyleScopedClasses['field']} */ ;
/** @type {__VLS_StyleScopedClasses['field']} */ ;
/** @type {__VLS_StyleScopedClasses['required']} */ ;
/** @type {__VLS_StyleScopedClasses['field']} */ ;
/** @type {__VLS_StyleScopedClasses['full']} */ ;
/** @type {__VLS_StyleScopedClasses['field']} */ ;
/** @type {__VLS_StyleScopedClasses['field']} */ ;
/** @type {__VLS_StyleScopedClasses['field']} */ ;
/** @type {__VLS_StyleScopedClasses['field']} */ ;
/** @type {__VLS_StyleScopedClasses['full']} */ ;
/** @type {__VLS_StyleScopedClasses['modal-actions']} */ ;
/** @type {__VLS_StyleScopedClasses['btn']} */ ;
/** @type {__VLS_StyleScopedClasses['btn-secondary']} */ ;
/** @type {__VLS_StyleScopedClasses['btn']} */ ;
/** @type {__VLS_StyleScopedClasses['btn-primary']} */ ;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            Plus: Plus,
            Search: Search,
            X: X,
            conditionClass: conditionClass,
            conditionLabels: conditionLabels,
            search: search,
            error: error,
            success: success,
            showForm: showForm,
            saving: saving,
            statusFilter: statusFilter,
            form: form,
            floorOptions: floorOptions,
            locationName: locationName,
            filtered: filtered,
            openForm: openForm,
            closeForm: closeForm,
            submitForm: submitForm,
        };
    },
});
export default (await import('vue')).defineComponent({
    setup() {
        return {};
    },
});
; /* PartiallyEnd: #4569/main.vue */
