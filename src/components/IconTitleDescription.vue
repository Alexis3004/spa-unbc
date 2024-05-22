<script setup>
import IconSelector from '@/components/IconSelector.vue'

defineProps({
    containerClasses: {
        type: String,
        default: 'flex justify-start items-center gap-3 mb-3'
    },
    iconContainerClasses: {
        type: String,
        default:
            'flex flex-none justify-center items-center rounded-full bg-white aspect-square w-16 laptop:w-24'
    },
    iconClasses: {
        type: String,
        default: ''
    },
    textGroupClasses: {
        type: String,
        default: ''
    },
    titleClasses: {
        type: String,
        default: 'font-layout-bold text-4xl laptop:text-5xl text-title-color'
    },
    descriptionClasses: {
        type: String,
        default: 'text-base laptop:text-xl text-subtitle-color'
    },
    icon: {
        type: String,
        default: ''
    },
    library: {
        type: String,
        default: ''
    },
    title: {
        type: String,
        default: ''
    },
    description: {
        type: String,
        default: ''
    }
})
</script>
<template>
    <div :class="containerClasses">
        <div :class="iconContainerClasses">
            <IconSelector :library="library" :icon="icon" :iconClasses="iconClasses" />
        </div>
        <div :class="textGroupClasses">
            <div :class="titleClasses">
                {{ title }}
            </div>
            <div :class="descriptionClasses">
                {{ description }}
            </div>
        </div>
    </div>
</template>
