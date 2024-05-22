<script setup>
import { useAppStore } from '@/stores/app.js'
import { computed } from 'vue'
const appStore = useAppStore()

const nombre = computed(() => {
    if (appStore.listSelection?.nombre) {
        // cuando una palabra venga envuelta en ** se le coloca la clase font-app-bold
        const nombre = appStore.listSelection.nombre.replace(
            /\*\*(.*?)\*\*/g,
            '<span class="font-app-bold">$1</span>'
        )
        return nombre
    }
    return ''
})
</script>
<template>
    <main class="m-4 grid-in-section laptop:mx-12 font-app">
        <div class="flex items-center justify-start flex-auto gap-3 laptop:hidden">
            <div v-if="appStore.configuration.header.showTitle" class="text-2xl text-title-color">
                <span class="font-app" v-html="nombre"></span><br />
                <span class="font-app-bold">{{ appStore.listSelection?.encabezado }}</span>
            </div>
        </div>
        <router-view v-slot="{ Component, route }">
            <transition
                enter-active-class="duration-300 ease-in delay-200"
                enter-from-class="transform opacity-0"
                enter-to-class="opacity-100"
                leave-active-class="duration-200 ease-out"
                leave-from-class="opacity-100"
                leave-to-class="transform opacity-0"
            >
                <!-- mode="out-in" -->
                <component :is="Component" :key="route.path" />
            </transition>
        </router-view>
    </main>
</template>
