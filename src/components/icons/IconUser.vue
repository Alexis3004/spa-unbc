<script setup>
defineProps({
    width: {
        type: String,
        default: '30.731'
    },
    height: {
        type: String,
        default: '31.215'
    },
    viewBox: {
        type: String,
        default: '0 0 30.731 31.215'
    },
    pathClasses: {
        type: String,
        default: 'fill-fourth-color stroke-fourth-color stroke-linecap-round stroke-linejoin-round stroke-1'
    }
})
</script>
<template>
    <svg xmlns="http://www.w3.org/2000/svg" :width="width" :height="height" :viewBox="viewBox">
        <g id="Grupo_5741" data-name="Grupo 5741" transform="translate(0.288 0.25)">
            <path
                id="Trazado_1"
                :class="pathClasses"
                data-name="Trazado 1"
                d="M9.905,2.913A6.992,6.992,0,1,0,16.9,9.905,7,7,0,0,0,9.905,2.913M9.905,0A9.905,9.905,0,1,1,0,9.905,9.905,9.905,0,0,1,9.905,0Z"
                transform="translate(5.172)"
            />
            <path
                id="Trazado_1-2"
                :class="pathClasses"
                data-name="Trazado 1"
                d="M78.268,37.383l0-.012-2.69-.447a9.58,9.58,0,0,1,2.575-4.678,12.872,12.872,0,0,1,4.639-3.05,24.114,24.114,0,0,1,15.817,0,12.67,12.67,0,0,1,4.608,3.056,9.457,9.457,0,0,1,2.52,4.688l-2.7.413,0,.012A7.111,7.111,0,0,0,101.118,34c-2.182-2.232-5.782-3.412-10.409-3.412s-8.25,1.182-10.466,3.42A7.244,7.244,0,0,0,78.268,37.383Z"
                transform="translate(-75.58 -6.653)"
            />
        </g>
    </svg>
</template>
