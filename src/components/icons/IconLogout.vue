<script setup>
defineProps({
    width: {
        type: String,
        default: '18.5'
    },
    height: {
        type: String,
        default: '18.5'
    },
    viewBox: {
        type: String,
        default: '0 0 18.5 18.5'
    },
    color: {
        type: String,
        default: '#0088a8'
    },
    colorAccent: {
        type: String,
        default: '#fff'
    }
})
</script>
<template>
    <svg xmlns="http://www.w3.org/2000/svg" :width="width" :height="height" :viewBox="viewBox">
        <path
            id="path"
            d="M633.3,1046a2.051,2.051,0,0,0-2,2v14a2.051,2.051,0,0,0,2,2h14a1.816,1.816,0,0,0,1.4-.6,1.974,1.974,0,0,0,.6-1.4v-4h-2v4h-14v-14h14v4h2v-4a2.051,2.051,0,0,0-2-2Zm8.9,12.6-2.6-2.6h9.7v-2h-9.7l2.6-2.6-1.4-1.4-5,5,5,5Z"
            transform="translate(-631.05 -1045.75)"
            :fill="color"
            :stroke="colorAccent"
            stroke-width="0.5"
        />
    </svg>
</template>

<style></style>
