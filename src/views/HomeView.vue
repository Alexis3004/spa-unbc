<script setup>
import { onMounted, onUnmounted } from 'vue'
import WelcomeComponent from '@/components/WelcomeComponent.vue'

import ClockComponent from '@/components/ClockComponent.vue'

import { useAppStore } from '@/stores/app.js'

const appStore = useAppStore()

onMounted(() => {
    document.documentElement.style.setProperty('--header-spacing-laptop', '0rem')
    document.documentElement.style.setProperty('--header-spacing-desktop', '0rem')
})

onUnmounted(() => {
    document.documentElement.style.setProperty(
        '--header-spacing-laptop',
        appStore.configuration.layout.spacings.headerSpacingDesktop
    )
    document.documentElement.style.setProperty(
        '--header-spacing-desktop',
        appStore.configuration.layout.spacings.headerSpacingDesktop
    )
})
</script>

<template>
    <div class="font-layout">
        <div class="items-center justify-between hidden mb-8 laptop:flex">
            <ClockComponent />
        </div>
        <div class="mb-8">
            <WelcomeComponent />
        </div>
    </div>
</template>
