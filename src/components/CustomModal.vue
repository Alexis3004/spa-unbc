<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

defineProps({
    maskClasses: {
        type: String,
        default: 'fixed top-0 left-0 table bg-black bg-opacity-50 z-40 h-full w-full'
    },
    wrapperClasses: {
        type: String,
        default: 'table-cell align-middle'
    },
    containerClasses: {
        type: String,
        default:
            'shadow-all rounded-md bg-transparent my-0 mx-auto w-fit max-w-screen h-fit max-h-screen text-xs md:text-sm select-none font-app'
    },
    headerClasses: {
        type: String,
        default: 'flex justify-center rounded-t-md bg-accent-color text-white py-2 px-4'
    },
    bodyClasses: {
        type: String,
        default: 'rounded-b-md bg-white py-8 px-12'
    }
})

const modalRef = ref()

const handleKey = (e) => {
    if (e.keyCode === 9) {
        const focusable = modalRef.value.querySelectorAll(
            'input:not([disabled]),button:not([disabled]),select:not([disabled]),textarea:not([disabled]),.checkmark:not([disabled])'
        )
        const Arrfocus = Array.from(focusable)
        if (focusable.length) {
            const first = focusable[0]
            const last = focusable[focusable.length - 1]
            const shift = e.shiftKey
            if (!Arrfocus.includes(e.target)) {
                first.focus()
                e.preventDefault()
            }
            if (shift) {
                if (e.target === first) {
                    // shift-tab pressed on first input in dialog
                    last.focus()
                    e.preventDefault()
                }
            }
            if (!shift) {
                if (e.target === last) {
                    // tab pressed on last input in dialog
                    first.focus()
                    e.preventDefault()
                }
            }
        }
    }
}

onMounted(() => {
    document.body.classList.add('modal-open')
    window.addEventListener('keydown', handleKey)
})

onUnmounted(() => {
    document.body.classList.remove('modal-open')
    window.removeEventListener('keydown', handleKey)
})
</script>

<template>
    <teleport to="#app">
        <transition
            enter-from-class="opacity-0"
            leave-to-class="opacity-0"
            enter-active-class="transition duration-300"
            leave-active-class="transition duration-300"
        >
            <div :class="maskClasses" ref="modalRef">
                <div :class="wrapperClasses">
                    <div :class="containerClasses">
                        <div :class="headerClasses">
                            <slot name="header"></slot>
                        </div>
                        <div :class="bodyClasses">
                            <slot name="body"></slot>
                        </div>
                    </div>
                </div>
            </div>
        </transition>
    </teleport>
</template>
