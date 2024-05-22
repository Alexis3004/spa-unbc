<script setup>
import { ref } from 'vue'
import IconLogout from '@/components/icons/IconLogout.vue'
import { useAppStore } from '@/stores/app.js'
import { titleCase } from '@/helpers'

const appStore = useAppStore()

defineProps({
    placement: {
        type: String,
        default: 'auto'
    },
    showHi: {
        type: Boolean,
        default: false
    },
    disabled: {
        type: Boolean,
        default: false
    }
})

const isMenuShown = ref(false)
</script>
<template>
    <div>
        <VDropdown
            :triggers="['click']"
            :autoHide="true"
            @apply-show="isMenuShown = true"
            @apply-hide="isMenuShown = false"
            :distance="10"
            :placement="placement"
            theme="user-menu"
            :disabled="disabled"
        >
            <button class="flex items-center flex-auto w-full gap-2" :disabled="disabled">
                <div
                    class="relative flex items-center justify-center h-12 p-px border border-white rounded-full aspect-square"
                >
                    <div
                        class="flex items-end justify-center h-full overflow-hidden bg-white border border-gray-200 rounded-full aspect-square"
                    >
                        <div>
                            <i class="text-3xl text-gray-200 fas fa-user"></i>
                        </div>
                    </div>
                </div>
                <div
                    v-if="showHi"
                    class="items-center justify-start hidden gap-0 laptop:flex"
                    :class="[isMenuShown ? 'opacity-100' : 'opacity-30']"
                >
                    <span
                        >Hola,
                        <span class="font-layout-bold">{{
                            titleCase(appStore.user.name)
                        }}</span></span
                    >
                    <span
                        class="material-icons-outlined"
                        :class="[isMenuShown ? 'rotate-180' : '']"
                    >
                        arrow_drop_down
                    </span>
                </div>
            </button>
            <template #popper="{ hide }">
                <div class="bg-white w-72 font-layout">
                    <div class="relative w-full h-24">
                        <img
                            class="object-contain w-full h-full"
                            src="@/assets/images/background-user-menu.svg"
                        />
                        <div
                            class="absolute inset-1 flex justify-center items-center gap-3 px-3 bg-[#0088A8] bg-opacity-80"
                        >
                            <div
                                class="relative flex items-center justify-center h-12 p-px border border-white rounded-full aspect-square"
                            >
                                <div
                                    class="flex items-end justify-center h-full overflow-hidden bg-white border border-gray-200 rounded-full aspect-square"
                                >
                                    <div>
                                        <i class="text-3xl text-gray-200 fas fa-user"></i>
                                    </div>
                                </div>
                            </div>
                            <div class="text-white">
                                <div class="text-lg">
                                    {{
                                        titleCase(
                                            [appStore.user.name, appStore.user.last_name].join(' ')
                                        )
                                    }}
                                </div>
                                <div class="text-xs font-layout-light">
                                    {{ appStore.user.email }}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="mx-6 text-sm font-layout-light">
                        <button
                            class="w-full flex justify-start items-center gap-3 py-3 text-[#0088A8] border-t border-[#B5E9F0]"
                            @click="appStore.logout()"
                        >
                            <IconLogout />
                            <span>Cerrar sesión</span>
                        </button>
                    </div>
                </div>
            </template>
        </VDropdown>
    </div>
</template>

<style>
.v-popper--theme-user-menu .v-popper__inner {
    background: #fff;
    color: black;
    /* border-radius: 4px; */
    /* padding: 1px; */
    /* border: 1px solid #ddd; */
    box-shadow: 0 6px 30px rgba(0, 0, 0, 0.1);
    /* overflow: hidden; */
}

.v-popper--theme-user-menu .v-popper__arrow-inner {
    visibility: visible;
    border-color: #fff;
}

.v-popper--theme-user-menu .v-popper__arrow-outer {
    border-color: #ddd;
}

/* Transition */

.v-popper--theme-user-menu.v-popper__popper--hidden {
    visibility: hidden;
    opacity: 0;
    transition:
        opacity 0.15s,
        visibility 0.15s;
}

.v-popper--theme-user-menu.v-popper__popper--shown {
    visibility: visible;
    opacity: 1;
    transition: opacity 0.15s;
}

.v-popper--theme-user-menu.v-popper__popper--skip-transition {
    transition: none !important;
}
</style>
