<script setup>
import LogoUser from '@/components/icons/LogoUser.vue'
import { titleCase } from '@/helpers'
import { useAppStore } from '@/stores/app'
import { computed } from 'vue'

const rolMessage = computed(() => {
    return appStore.user.rol === 'admin' ? 'Administrador' : 'Usuario'
})

const appStore = useAppStore()
</script>
<template>
    <div class="relative flex-row items-center justify-start gap-3 laptop:flex">
        <div class="-ml-4 w-36">
            <LogoUser width="100" height="100" />
        </div>
        <div class="flex flex-col gap-2 mb-2">
            <div class="font-layout-bold text-[40px] laptop:text-6xl">
                {{
                    titleCase(
                        ['Hola', `${appStore.user.name} ${appStore.user.last_name}`].join(', ')
                    )
                }}
            </div>
            <div class="text-[#829095] laptop:text-xl uppercase">
                Eres un <b class="text-bold">{{ rolMessage }}</b> del sistema
            </div>
        </div>
    </div>
</template>

<style></style>
