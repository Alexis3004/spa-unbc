<script setup>
import { computed } from 'vue'
import CustomSelect from '@/components/CustomSelect.vue'

const props = defineProps({
    descriptionContainerClasses: {
        type: String,
        default:
            'col-span-1 order-first md:order-2 flex items-center justify-center md:justify-start'
    },
    pagesContainerClasses: {
        type: String,
        default: 'col-span-1 order-last flex items-center justify-center md:justify-end gap-0'
    },
    modelValue: {
        type: Object,
        default: () => ({
            current_page: 1,
            last_page: 1,
            per_page: 10,
            per_page_ranges: [10, 25, 50, 100],
            from: 1,
            to: 1,
            total: 1,
            visible_pages: 3
        })
    },
    disabled: {
        type: Boolean,
        default: false
    }
})

const emit = defineEmits(['update:modelValue', 'selectPage'])

const visiblePages = computed(() => {
    if (props.modelValue.current_page === props.modelValue.last_page) {
        return Array.from({ length: props.modelValue.last_page }, (_, i) => i + 1).slice(
            -props.modelValue.visible_pages
        )
    }
    if (props.modelValue.current_page === 1) {
        return Array.from({ length: props.modelValue.last_page }, (_, i) => i + 1).slice(
            0,
            props.modelValue.visible_pages
        )
    }
    return Array.from({ length: props.modelValue.current_page + 1 }, (_, i) => i + 1).slice(
        -props.modelValue.visible_pages
    )
})

const elementLimit = computed({
    get() {
        return props.modelValue.to
    },
    set(value) {
        emit('update:modelValue', {
            ...props.modelValue,
            per_page: value,
            last_page: Math.ceil(props.modelValue.total / value),
            to: value,
            current_page: 1
        })
    }
})

const value = computed({
    get() {
        return props.modelValue.per_page
    },
    set(value) {
        emit('update:modelValue', {
            ...props.modelValue,
            per_page: value,
            current_page: 1
        })
    }
})

const elementRanges = computed(() => {
    return props.modelValue.per_page_ranges.map((ran) => ({
        id: ran,
        valor: ran
    }))
})

const goToPage = (page) => {
    if (page === props.modelValue.current_page) {
        return
    }
    if (page > props.modelValue.last_page) {
        return
    }
    if (page < 1) {
        return
    }
    emit('selectPage', { cantidad: elementLimit.value, page })
    emit('update:modelValue', { ...props.modelValue, current_page: page })
}
</script>
<template>
    <div :class="descriptionContainerClasses">
        <div class="items-center justify-start flex-auto hidden gap-2 md:flex">
            <span>Mostrando</span>
            <CustomSelect
                v-model="value"
                :options="elementRanges"
                :defaultOption="{
                    id: modelValue.to,
                    valor: modelValue.to,
                    visible: false
                }"
                :disabled="disabled"
            />
            <span>registros</span>
        </div>
        <div class="flex items-center justify-center flex-auto gap-2 mb-2 sm:hidden laptop:hidden">
            <span>Mostrar</span>
            <CustomSelect
                v-model="value"
                :options="elementRanges"
                :defaultOption="{ id: '', valor: '', visible: false }"
                :disabled="disabled"
            />
            <span>registros</span>
        </div>
    </div>
    <div :class="pagesContainerClasses">
        <button
            class="flex items-center h-8 px-2 bg-white border border-gray-200 rounded-l-lg text-secondary-color"
            @click="goToPage(1)"
            :disabled="disabled"
            v-tooltip="{ content: 'Primero', placement: 'auto', theme: 'info-tooltip' }"
        >
            Primero
        </button>
        <button
            class="flex items-center h-8 px-2 bg-white border border-gray-200 text-secondary-color"
            @click="goToPage(modelValue.current_page - 1)"
            :disabled="disabled"
            v-tooltip="{ content: 'Anterior', placement: 'auto', theme: 'info-tooltip' }"
        >
            <span class="material-icons" style="font-size: 16px">keyboard_double_arrow_left</span>
        </button>
        <button
            class="flex items-center h-8 px-2 border border-gray-200"
            :class="{
                'bg-secondary-color text-white': modelValue.current_page == pag,
                'bg-white text-secondary-color': modelValue.current_page != pag
            }"
            v-for="(pag, index) in visiblePages"
            :key="index"
            @click="goToPage(pag)"
            :disabled="disabled"
        >
            <span class="min-w-[12px]">{{ pag }}</span>
        </button>
        <button
            class="flex items-center h-8 px-2 bg-white border border-gray-200 text-secondary-color"
            @click="goToPage(modelValue.current_page + 1)"
            :disabled="disabled"
            v-tooltip="{ content: 'Siguiente', placement: 'auto', theme: 'info-tooltip' }"
        >
            <span class="material-icons" style="font-size: 16px">keyboard_double_arrow_right</span>
        </button>
        <button
            class="flex items-center h-8 px-2 bg-white border border-gray-200 rounded-r-lg text-secondary-color"
            @click="goToPage(modelValue.last_page)"
            :disabled="disabled"
            v-tooltip="{ content: 'Último', placement: 'auto', theme: 'info-tooltip' }"
        >
            Último
        </button>
    </div>
</template>

<style scoped></style>
