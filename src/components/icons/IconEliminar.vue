<script setup>
defineProps({
    fill: {
        type: String,
        default: '#233043'
    },
    width: {
        type: String,
        default: '12.023'
    },
    height: {
        type: String,
        default: '13.526'
    },
    viewBox: {
        type: String,
        default: '0 0 12.023 13.526'
    }
})
</script>

<template>
    <svg xmlns="http://www.w3.org/2000/svg" :width="width" :height="height" :viewBox="viewBox">
        <path
            id="delete_FILL1_wght400_GRAD0_opsz48"
            d="M9.9,19.526A1.156,1.156,0,0,1,8.77,18.4V7.691H8V6.564h3.532V6h4.96v.564h3.532V7.691h-.77V18.4a1.156,1.156,0,0,1-1.127,1.127Zm1.991-2.743h1.127v-7.5H11.889Zm3.119,0h1.127v-7.5H15.007Z"
            transform="translate(-8 -6)"
            :fill="fill"
        />
    </svg>
</template>
