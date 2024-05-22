<script setup>
import { ref } from 'vue'
import { useElementSize } from '@vueuse/core'

defineProps({
    containerClasses: {
        type: String,
        default: 'grid w-full grid-cols-1 laptop:grid-cols-2 gap-4'
    },
    tableContainerClasses: {
        type: String,
        default:
            'col-span-full relative w-full overflow-x-auto shadow-all bg-white laptop:rounded-lg pb-2'
    },
    tableClasses: {
        type: String,
        default: 'min-w-full w-max laptop:w-full text-left'
    },
    tableHeaderClasses: {
        type: String,
        default: 'rounded-t-lg bg-accent-color text-white font-app-semibold'
    },
    tableBodyClasses: {
        type: String,
        default: 'bg-white text-black'
    },
    tableFooterClasses: {
        type: String,
        default: ''
    }
})

const containerRef = ref()
const { width, height } = useElementSize(containerRef)
</script>

<template>
    <div :class="containerClasses" ref="containerRef">
        <div :class="tableContainerClasses">
            <table :class="tableClasses">
                <slot name="colgroup"></slot>
                <thead :class="tableHeaderClasses">
                    <slot name="tableHeader"></slot>
                </thead>
                <tbody :class="tableBodyClasses">
                    <slot name="tableBody" :width="width" :height="height"></slot>
                </tbody>
                <tfoot :class="tableFooterClasses">
                    <slot name="tableFooter"></slot>
                </tfoot>
            </table>
        </div>
        <slot name="footer"></slot>
    </div>
</template>

<style></style>
