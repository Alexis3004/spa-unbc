<script setup>
defineProps({
    width: {
        type: String,
        default: '1em'
    },
    height: {
        type: String,
        default: '1em'
    },
    viewBox: {
        type: String,
        default: '0 0 24 24'
    }
})
</script>

<template>
    <svg xmlns="http://www.w3.org/2000/svg" :width="width" :height="height" :viewBox="viewBox">
        <path
            fill="currentColor"
            d="M17 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14c1.1 0 2-.9 2-2V7l-4-4zm-5 16c-1.66 0-3-1.34-3-3s1.34-3 3-3s3 1.34 3 3s-1.34 3-3 3zm3-10H5V5h10v4z"
        ></path>
    </svg>
</template>
