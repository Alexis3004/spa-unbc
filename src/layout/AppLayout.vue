<script setup>
import HeaderComponent from '@/components/HeaderComponent.vue'
import SidebarComponent from '@/components/SidebarComponent.vue'

import { useAppStore } from '@/stores/app.js'
import { storeToRefs } from 'pinia'
import { onBeforeMount, watch } from 'vue'

import { useRoute } from 'vue-router'

const router = useRoute()

const appStore = useAppStore()
const { isMobile } = storeToRefs(appStore)

onBeforeMount(() => {
    document.documentElement.style.setProperty(
        '--header-spacing-phone',
        appStore.configuration.layout.spacings.headerSpacingPhone
    )
    document.documentElement.style.setProperty(
        '--header-spacing-phone-rp',
        appStore.configuration.layout.spacings.headerSpacingPhoneRecientesPages
    )
    document.documentElement.style.setProperty(
        '--sidebar-spacing-phone',
        appStore.configuration.layout.spacings.sidebarSpacingPhone
    )
    document.documentElement.style.setProperty(
        '--header-spacing-laptop',
        appStore.configuration.layout.spacings.headerSpacingLaptop
    )
    document.documentElement.style.setProperty(
        '--sidebar-spacing-laptop',
        appStore.configuration.layout.spacings.sidebarSpacingLaptop
    )
    document.documentElement.style.setProperty(
        '--header-spacing-desktop',
        appStore.configuration.layout.spacings.headerSpacingDesktop
    )
    document.documentElement.style.setProperty(
        '--sidebar-spacing-desktop',
        appStore.configuration.layout.spacings.sidebarSpacingDesktop
    )
})

watch(isMobile, () => {
    const layoutConfiguration = router.meta.configuration
    if (layoutConfiguration) {
        Object.entries(layoutConfiguration).forEach(([key, value]) => {
            appStore.setConfiguration(key, value)
        })
    }
})
</script>
<template>
    <div
        :class="[
            'grid grid-areas-app-phone grid-cols-app-phone grid-rows-app-phone gap-0 min-h-screen title-color font-layout bg-cover bg-no-repeat bg-fixed laptop:grid-areas-app-laptop laptop:grid-cols-app-laptop laptop:grid-rows-app-laptop laptop:bg-right-top desktop:grid-cols-app-desktop desktop:grid-rows-app-desktop',
            appStore.configuration.layout.defaultBackground
                ? 'bg-primary-background'
                : 'bg-app-phone laptop:bg-app-laptop bg-header-laptop'
        ]"
    >
        <HeaderComponent />
        <SidebarComponent />
        <RouterView />
    </div>
</template>
