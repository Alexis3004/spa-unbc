<script setup>
import { computed, defineAsyncComponent } from 'vue'

const props = defineProps({
    containerClasses: {
        type: String,
        default: 'flex justify-center items-center'
    },
    iconClasses: {
        type: String,
        default: ''
    },
    library: {
        type: String,
        validator: (value) => {
            return [
                'FontAwesome',
                'MaterialIcons',
                'MaterialIconsOutlined',
                'Component',
                'SVG',
                ''
            ].includes(value)
        }
    },
    icon: {
        type: String,
        default: ''
    },
    properties: {
        type: Object,
        default: () => ({
            width: '100%',
            height: '100%'
        })
    }
})

const componentLoader = (icon) => {
    const component = defineAsyncComponent({
        loader: () => import(`@/components/icons/${icon}.vue`)
    })
    return component
}

const component = computed(() => {
    return componentLoader(props.icon) || null
})
</script>
<template>
    <div :class="containerClasses">
        <template v-if="library === 'FontAwesome'">
            <i :class="[icon, iconClasses]"></i>
        </template>
        <template v-else-if="library === 'MaterialIcons'">
            <span class="material-icons" :class="iconClasses">{{ icon }}</span>
        </template>
        <template v-else-if="library === 'MaterialIconsOutlined'">
            <span class="material-icons-outlined" :class="iconClasses">{{ icon }}</span>
        </template>
        <template v-else-if="library === 'Component'">
            <div :class="iconClasses">
                <component :is="component" v-bind="properties" :key="icon" />
            </div>
        </template>
    </div>
</template>
