<script setup>
import { onMounted, ref, onUnmounted } from 'vue'
import dayjs from 'dayjs'
import 'dayjs/locale/es'

const time = ref(dayjs())
const clock = ref(null)

onMounted(() => {
    clock.value = setInterval(() => {
        time.value = dayjs()
    }, 1000)
})

onUnmounted(() => {
    clearInterval(clock.value)
})
</script>
<template>
    <div class="border-l-2 border-solid border-clock-color pl-3">
        <div class="flex justify-start align-top text-text1-color font-layout-light">
            <span class="text-4xl">{{ time.format('hh:mm') }}</span>
            <span class="text-lg">{{ time.format('A') }}</span>
        </div>
        <div class="text-[#768D94] uppercase font-layout-semibold text-sm">
            <span>
                {{ time.locale('es').format('ddd DD MMM') }}
            </span>
        </div>
    </div>
</template>

<style></style>
