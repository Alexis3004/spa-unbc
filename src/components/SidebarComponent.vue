<script setup>
import UserComponent from '@/components/UserComponent.vue'
import CustomButton from '@/components/CustomButton.vue'

import { useAppStore } from '@/stores/app.js'
const appStore = useAppStore()

const getPathClass = (item) => {
    return `${item.pathClasses} ${
        item.id == appStore.sidebarSelection.id ? 'stroke-white' : 'stroke-fourth-color'
    } ${
        item.fill
            ? item.id == appStore.sidebarSelection.id
                ? 'fill-white'
                : 'fill-fourth-color'
            : 'fill-none'
    }`
}
</script>
<template>
    <aside
        class="fixed bottom-0 z-20 flex flex-col items-center justify-center w-full gap-3 px-3 overflow-hidden grid-in-sidebar bg-third-color rounded-t-3xl laptop:rounded-none laptop:inset-y-0 laptop:w-sidebar-laptop desktop:w-sidebar-desktop laptop:p-0"
    >
        <div v-if="appStore.configuration.sidebar.showUserMenu" class="hidden laptop:block">
            <UserComponent
                :showHi="false"
                :placement="'right-start'"
                :disabled="!appStore.navegacion"
            />
        </div>
        <div
            class="grid w-full mx-2 grid-areas-sidebar-phone laptop:grid-areas-sidebar-laptop grid-cols-sidebar-phone laptop:grid-cols-sidebar-laptop desktop:grid-cols-sidebar-desktop grid-rows-sidebar-phone laptop:grid-rows-sidebar-laptop desktop:grid-rows-sidebar-desktop h-sidebar-phone laptop:h-fit laptop:w-sidebar-laptop desktop:w-sidebar-desktop laptop:mx-0"
        >
            <button
                class="w-full"
                :class="[
                    `${item.classes}`,
                    item.id == appStore.sidebarSelection.id ? 'bg-primary-color' : 'bg-transparent'
                ]"
                v-for="(item, index) in appStore.sidebarItems"
                :key="index"
                @click="appStore.goToSidebarSelection(item)"
                :disabled="!appStore.navegacion"
            >
                <div class="flex items-center justify-center h-full">
                    <div class="w-fit">
                        <component
                            :is="item.icono"
                            :pathClasses="getPathClass(item)"
                            v-tooltip="{
                                content: item.nombre,
                                placement: 'bottom',
                                theme: 'info-tooltip'
                            }"
                        ></component>
                    </div>
                </div>
            </button>
        </div>
        <CustomButton
            v-if="!appStore.isMobile"
            containerClasses="absolute bottom-8"
            buttonClasses="hidden md:flex justify-center items-center py-1 px-3 rounded-md font-layout-light text-sm bg-fourth-color text-[#435371]"
            @buttonClick="appStore.logout()"
            :disabled="!appStore.navegacion"
        >
            <span>Salir</span>
        </CustomButton>
    </aside>
</template>

<style></style>
