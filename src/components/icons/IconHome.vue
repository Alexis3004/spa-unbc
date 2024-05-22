<script setup>
defineProps({
    width: {
        type: String,
        default: '28.691'
    },
    height: {
        type: String,
        default: '30.232'
    },
    viewBox: {
        type: String,
        default: '0 0 28.691 30.232'
    },
    pathClasses: {
        type: String,
        default: 'fill-none stroke-fourth-color stroke-linecap-round stroke-linejoin-round stroke-2'
    }
})
</script>
<template>
    <svg xmlns="http://www.w3.org/2000/svg" :width="width" :height="height" :viewBox="viewBox">
        <g id="iconfinder_jee-66_2180674" transform="translate(1.5 1.66)">
            <g id="Grupo_350" data-name="Grupo 350" transform="translate(-0.702 -1.596)">
                <path
                    id="Trazado_372"
                    :class="pathClasses"
                    data-name="Trazado 372"
                    d="M39.979,26.911l.114,13.9a1.272,1.272,0,0,1-1.29,1.253h-23a1.272,1.272,0,0,1-1.29-1.253l-.114-13.9a2.072,2.072,0,0,1,.634-1.486L26.313,15.361a1.317,1.317,0,0,1,1.824,0L39.345,25.425A2.072,2.072,0,0,1,39.979,26.911Z"
                    transform="translate(-13.7 -13.398)"
                />
            </g>
        </g>
    </svg>
</template>
