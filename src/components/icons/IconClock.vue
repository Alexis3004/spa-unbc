<script setup>
defineProps({
    width: {
        type: String,
        default: '11'
    },
    height: {
        type: String,
        default: '11'
    },
    viewBox: {
        type: String,
        default: '0 0 11 11'
    },
    classPath: {
        type: String,
        default: 'stroke-[#ff8303]'
    }
})
</script>
<template>
    <svg xmlns="http://www.w3.org/2000/svg" :width="width" :height="height" :viewBox="viewBox">
        <g id="Icon_feather-clock" data-name="Icon feather-clock" transform="translate(0.5 0.5)">
            <path
                id="Trazado_17456"
                data-name="Trazado 17456"
                d="M13,8A5,5,0,1,1,8,3,5,5,0,0,1,13,8Z"
                transform="translate(-3 -3)"
                fill="none"
                :class="classPath"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="1"
            />
            <path
                id="Trazado_17457"
                data-name="Trazado 17457"
                d="M18,9v3l2,1"
                transform="translate(-13 -7)"
                fill="none"
                :class="classPath"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="1"
            />
        </g>
    </svg>
</template>

<style></style>
