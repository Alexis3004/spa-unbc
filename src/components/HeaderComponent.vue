<script setup>
import { ref, computed } from 'vue'
import LogoUser from '@/components/icons/LogoUser.vue'
import UserComponent from '@/components/UserComponent.vue'
import CustomButton from '@/components/CustomButton.vue'
import { useRoute } from 'vue-router'

import dayjs from 'dayjs'
import 'dayjs/locale/es'
import { useAppStore } from '@/stores/app.js'

defineProps({
    classes: {
        type: String,
        default: ''
    },
    showToggleMenu: {
        type: Boolean,
        default: true
    },
    showTitle: {
        type: Boolean,
        default: true
    },
    showSearchInput: {
        type: Boolean,
        default: true
    },
    showUserMenu: {
        type: Boolean,
        default: true
    },
    showDate: {
        type: Boolean,
        default: false
    },
    disabled: {
        type: Boolean,
        default: false
    }
})

const appStore = useAppStore()

const router = useRoute()

const time = ref(dayjs())

const headerNanme = computed(() => {
    if (appStore.listSelection?.nombre) {
        // cuando una palabra venga envuelta en ** se le coloca la clase font-layout-bold
        const name = appStore.listSelection.nombre.replace(
            /\*\*(.*?)\*\*/g,
            '<span class="font-layout-bold">$1</span>'
        )
        return name
    }
    return ''
})
</script>
<template>
    <header
        :class="[
            'grid-in-header fixed z-20 top-0 inset-x-0 laptop:left-sidebar+sidemenu-laptop laptop:h-header-laptop desktop:left-sidebar+sidemenu-desktop desktop:h-header-desktop overflow-hidden',
            router.name == 'inicio-default' ? 'h-header-phone-rp' : 'h-header-phone',
            appStore.configuration.layout.defaultBackground
                ? 'bg-header-background'
                : 'bg-app-phone-header laptop:bg-app-laptop bg-cover bg-no-repeat bg-header-laptop'
        ]"
    >
        <div class="flex items-center justify-between h-full p-2 px-4 ml-9 laptop:m-0">
            <div class="flex items-center justify-start gap-3">
                <CustomButton
                    v-if="appStore.configuration.header.showBackButton"
                    buttonClasses="hidden laptop:flex justify-center items-center text-subtitle-color"
                    @buttonClick="appStore.goBack()"
                    :disabled="!appStore.navegacion"
                >
                    <template v-slot>
                        <span class="material-icons-outlined"> arrow_back </span>
                    </template>
                </CustomButton>
                <div
                    v-if="appStore.configuration.header.showTitle"
                    class="hidden text-2xl laptop:block text-title-color"
                >
                    <span class="font-layout" v-html="headerNanme"></span>
                    <span class="pl-1 font-layout-bold">{{
                        appStore.listSelection?.encabezado
                    }}</span>
                </div>
                <div v-if="appStore.configuration.header.showLogo" class="w-32">
                    <LogoUser width="100" height="100" />
                </div>
            </div>
            <div class="flex items-center justify-end gap-3">
                <div
                    v-if="appStore.configuration.header.showDate"
                    class="hidden text-sm laptop:block font-layout-light text-subtitle-color"
                >
                    {{ time.locale('es').format('dddd, D [de] MMMM [de] YYYY') }}
                </div>
                <UserComponent
                    v-if="appStore.configuration.header.showUserMenu"
                    :showHi="true"
                    :placement="'bottom-end'"
                    :disabled="!appStore.navegacion"
                />
            </div>
        </div>
    </header>
</template>
