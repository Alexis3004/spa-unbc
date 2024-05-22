<script setup>
import { ref } from 'vue'
import CustomModal from '@/components/CustomModal.vue'

const props = defineProps({
    containerClasses: {
        type: String,
        default: ''
    },
    buttonClasses: {
        type: String,
        default:
            'flex justify-center items-center rounded-full text-white bg-default-button aspect-square w-6 hover:brightness-125 focus:brightness-125 disabled:bg-disabled-color disabled:hover:brightness-100 disabled:focus:brightness-100'
    },
    disabled: {
        type: Boolean,
        default: false
    },
    tooltip: {
        type: String,
        default: null
    },
    tooltipPosition: {
        type: String,
        default: 'auto'
    },
    showConfirmation: {
        type: Boolean,
        default: false
    },
    isMobile: {
        type: Boolean,
        default: false
    },
    dropdown: {
        type: Object,
        default: () => ({
            distance: 10,
            triggers: ['click'],
            autoHide: true,
            placement: 'bottom',
            theme: 'confirmation',
            disabled: false
        })
    },
    popperClasses: {
        type: String,
        default: 'relative flex flex-col p-4 w-64 font-app text-[#4B4B4B] text-sm gap-3'
    },
    popperModalClasses: {
        type: String,
        default:
            'relative flex flex-col justify-center items-center p-4 font-app text-[#4B4B4B] text-base gap-3'
    },
    questionClasses: {
        type: String,
        default: ''
    },
    decissionClasses: {
        type: String,
        default: 'flex flex-auto justify-content-around items-center gap-3 w-full'
    },
    confirmButtonClasses: {
        type: String,
        default:
            'flex flex-auto justify-center items-center rounded shadow-sm text-white bg-secondary-color px-3 h-8 hover:brightness-125 focus:brightness-125 disabled:bg-disabled-color disabled:hover:brightness-100 disabled:focus:brightness-100'
    },
    cancelButtonClasses: {
        type: String,
        default:
            'flex flex-auto justify-center items-center rounded shadow-sm border border-[#F2F2F2] text-black bg-white px-3 h-8 hover:brightness-125 focus:brightness-125 disabled:bg-disabled-color disabled:hover:brightness-100 disabled:focus:brightness-100'
    },
    confirmModalButtonClasses: {
        type: String,
        default:
            'w-full text-sm flex flex-auto justify-center items-center rounded shadow-sm text-white bg-secondary-color px-3 h-8 hover:brightness-125 focus:brightness-125 disabled:bg-disabled-color disabled:hover:brightness-100 disabled:focus:brightness-100'
    },
    cancelModalButtonClasses: {
        type: String,
        default:
            'w-full text-sm flex flex-auto justify-center items-center rounded shadow-sm border border-[#F2F2F2] text-black bg-white px-3 h-8 hover:brightness-125 focus:brightness-125 disabled:bg-disabled-color disabled:hover:brightness-100 disabled:focus:brightness-100'
    },
    questionText: {
        type: String,
        default: '¿Está seguro que desea realizar esta acción?'
    },
    confirmText: {
        type: String,
        default: 'Sí'
    },
    cancelText: {
        type: String,
        default: 'No'
    },
    modalClasses: {
        type: Object,
        default: () => ({
            headerClasses: '',
            bodyClasses: 'w-full bg-white p-3 rounded-md',
            containerClasses:
                'inset-0 overflow-y-auto rounded-md bg-transparent my-0 mx-auto text-xs md:text-sm select-none w-[80%] p-4 font-app'
        })
    }
})

const emit = defineEmits(['buttonClick', 'confirm', 'cancel'])

const isHover = ref(false)
const isModalOpen = ref(false)

const triggerClick = (e) => {
    if (props.disabled) return
    e.currentTarget.blur()
    if (props.isMobile && props.showConfirmation) isModalOpen.value = !isModalOpen.value
    emit('buttonClick', e)
}

const triggerMouseOver = () => {
    if (props.disabled) return
    isHover.value = true
}

const triggerMouseLeave = () => {
    if (props.disabled) return
    isHover.value = false
}

const triggerConfirm = (e) => {
    if (props.disabled) return
    if (props.isMobile && props.showConfirmation) isModalOpen.value = !isModalOpen.value
    emit('confirm', e)
}

const triggerCancel = (e) => {
    if (props.isMobile && props.showConfirmation) isModalOpen.value = !isModalOpen.value
    if (props.disabled) return
    emit('cancel', e)
}
</script>

<template>
    <div :class="containerClasses" v-if="!showConfirmation">
        <button
            :class="buttonClasses"
            @click="triggerClick"
            @mouseover="triggerMouseOver"
            @mouseleave="triggerMouseLeave"
            :disabled="disabled"
            v-tooltip="{
                content: tooltip,
                placement: tooltipPosition,
                theme: 'info-tooltip'
            }"
        >
            <slot :isHover="isHover"></slot>
        </button>
    </div>

    <div :class="containerClasses" v-else-if="isMobile && showConfirmation">
        <button
            :class="buttonClasses"
            @click="triggerClick"
            @mouseover="triggerMouseOver"
            @mouseleave="triggerMouseLeave"
            :disabled="disabled"
            v-tooltip="{
                content: tooltip,
                placement: tooltipPosition,
                theme: 'info-tooltip'
            }"
        >
            <slot :isHover="isHover"></slot>
        </button>
        <CustomModal
            v-if="isModalOpen"
            :headerClasses="modalClasses.headerClasses"
            :bodyClasses="modalClasses.bodyClasses"
            :containerClasses="modalClasses.containerClasses"
        >
            <template #body>
                <div :class="popperModalClasses">
                    <div :class="questionClasses">
                        {{ questionText }}
                    </div>
                    <div :class="decissionClasses">
                        <button
                            v-close-popper
                            :class="confirmModalButtonClasses"
                            @click="triggerConfirm"
                            :disabled="disabled"
                        >
                            {{ confirmText }}
                        </button>
                        <button
                            v-close-popper
                            :class="cancelModalButtonClasses"
                            @click="triggerCancel"
                            :disabled="disabled"
                        >
                            {{ cancelText }}
                        </button>
                    </div>
                </div>
            </template>
        </CustomModal>
    </div>
    <VDropdown v-bind="dropdown" v-else>
        <div :class="containerClasses">
            <button
                :class="buttonClasses"
                @click="triggerClick"
                @mouseover="triggerMouseOver"
                @mouseleave="triggerMouseLeave"
                :disabled="disabled"
                v-tooltip="{
                    content: tooltip,
                    placement: tooltipPosition,
                    theme: 'info-tooltip'
                }"
            >
                <slot :isHover="isHover"></slot>
            </button>
        </div>

        <template #popper>
            <div :class="popperClasses">
                <div :class="questionClasses">
                    {{ questionText }}
                </div>
                <div :class="decissionClasses">
                    <button
                        v-close-popper
                        :class="confirmButtonClasses"
                        @click="triggerConfirm"
                        :disabled="disabled"
                    >
                        {{ confirmText }}
                    </button>
                    <button
                        v-close-popper
                        :class="cancelButtonClasses"
                        @click="triggerCancel"
                        :disabled="disabled"
                    >
                        {{ cancelText }}
                    </button>
                </div>
            </div>
        </template>
    </VDropdown>
</template>

<style>
.v-popper--theme-confirmation .v-popper__inner {
    background: #fff;
    color: black;
    border-radius: 4px;
    box-shadow: 0 -1px 18px rgba(0, 0, 0, 0.5);
}

.v-popper--theme-confirmation .v-popper__arrow-inner {
    visibility: visible;
    border-color: #fff;
}

.v-popper--theme-confirmation .v-popper__arrow-outer {
    border-color: #ddd;
}

/* Transition */
.v-popper--theme-confirmation.v-popper__popper--hidden {
    visibility: hidden;
    opacity: 0;
    transition:
        opacity 0.15s,
        visibility 0.15s;
}

.v-popper--theme-confirmation.v-popper__popper--shown {
    visibility: visible;
    opacity: 1;
    transition: opacity 0.15s;
}

.v-popper--theme-confirmation.v-popper__popper--skip-transition {
    transition: none !important;
}
</style>
