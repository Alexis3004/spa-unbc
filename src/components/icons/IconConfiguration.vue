<script setup>
defineProps({
    width: {
        type: String,
        default: '33.73'
    },
    height: {
        type: String,
        default: '33.73'
    },
    viewBox: {
        type: String,
        default: '0 0 33.73 33.73'
    },
    pathClasses: {
        type: String,
        default: 'fill-none stroke-fourth-color stroke-linecap-round stroke-linejoin-round stroke-2'
    }
})
</script>
<template>
    <svg xmlns="http://www.w3.org/2000/svg" :width="width" :height="height" :viewBox="viewBox">
        <g id="Icon_feather-settings" data-name="Icon feather-settings" transform="translate(0 0)">
            <path
                id="Trazado_16991"
                :class="pathClasses"
                data-name="Trazado 16991"
                d="M22.093,17.8a4.3,4.3,0,1,1-4.3-4.3A4.3,4.3,0,0,1,22.093,17.8Z"
                transform="translate(-0.931 -0.931)"
            />
            <path
                id="Trazado_16992"
                :class="pathClasses"
                data-name="Trazado 16992"
                d="M27.2,21.055a2.3,2.3,0,0,0,.461,2.542l.084.084a2.8,2.8,0,1,1-3.953,3.953l-.084-.084A2.323,2.323,0,0,0,19.77,29.2v.237a2.794,2.794,0,1,1-5.587,0v-.126A2.3,2.3,0,0,0,12.675,27.2a2.3,2.3,0,0,0-2.542.461l-.084.084A2.8,2.8,0,1,1,6.1,23.793l.084-.084A2.323,2.323,0,0,0,4.531,19.77H4.294a2.794,2.794,0,1,1,0-5.587h.126a2.3,2.3,0,0,0,2.109-1.509,2.3,2.3,0,0,0-.461-2.542l-.084-.084A2.8,2.8,0,1,1,9.937,6.1l.084.084a2.3,2.3,0,0,0,2.542.461h.112a2.3,2.3,0,0,0,1.4-2.109V4.294a2.794,2.794,0,0,1,5.587,0v.126c0,.919,1.4,2.109,1.4,2.109s1.869.2,2.542-.461l.084-.084a2.8,2.8,0,1,1,3.953,3.953l-.084.084a2.3,2.3,0,0,0-.461,2.542v.112a2.3,2.3,0,0,0,2.109,1.4h.237a2.794,2.794,0,1,1,0,5.587h-.126a2.3,2.3,0,0,0-2.109,1.4Z"
                transform="translate(0 0)"
            />
        </g>
    </svg>
</template>
