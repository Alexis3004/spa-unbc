<script setup>
import { RouterView } from 'vue-router'
import { ref, onMounted } from 'vue'

const colors = ref({
    primaryColor: '#01eca4',
    secondaryColor: '#2cd5d9',
    thirdColor: '#2cd6da',
    fourthColor: '#7699AE',

    accentColor: '#02b2ea',
    disabledColor: '#E6E6E6',
    primaryBackground: '#F5F5F5',
    loginBackground: '#C0D4E0',
    loginProducto: '#FFFFFF',
    logosBackground: '#FFFFFF',
    menuBackground: '#F6FAFC',
    menuSelectedBackground: '#E1F1FB',
    headerBackground: '#ECEDEE',
    sidebarBackground: '#9EC4DA',
    clockColor: '#AAC8D2',

    titleColor: '#233043',
    subtitleColor: '#8ca8b5',
    titleLoginColor: '#798488',
    subtitleLoginColor: '#7B879E',

    text1Color: '#233043',
    text2Color: '#000000',
    text3Color: '#ffffff',
    textLoginColor: '#5B667B',

    borderColor: '#8ca8b5'
})

onMounted(() => {
    document.documentElement.style.setProperty('--primary-color', colors.value.primaryColor)
    document.documentElement.style.setProperty('--secondary-color', colors.value.secondaryColor)
    document.documentElement.style.setProperty('--third-color', colors.value.thirdColor)
    document.documentElement.style.setProperty('--fourth-color', colors.value.fourthColor)
    document.documentElement.style.setProperty('--accent-color', colors.value.accentColor)
    document.documentElement.style.setProperty('--disabled-color', colors.value.disabledColor)
    document.documentElement.style.setProperty(
        '--primary-background',
        colors.value.primaryBackground
    )
    document.documentElement.style.setProperty('--login-background', colors.value.loginBackground)
    document.documentElement.style.setProperty('--login-producto', colors.value.loginProducto)
    document.documentElement.style.setProperty('--logos-background', colors.value.logosBackground)
    document.documentElement.style.setProperty('--menu-background', colors.value.menuBackground)
    document.documentElement.style.setProperty(
        '--menu-backgroundselected',
        colors.value.menuSelectedBackground
    )
    document.documentElement.style.setProperty('--header-background', colors.value.headerBackground)
    document.documentElement.style.setProperty(
        '--sidebar-background',
        colors.value.sidebarBackground
    )
    document.documentElement.style.setProperty('--clock-color', colors.value.clockColor)
    document.documentElement.style.setProperty('--title-color', colors.value.titleColor)
    document.documentElement.style.setProperty('--subtitle-color', colors.value.subtitleColor)
    document.documentElement.style.setProperty('--titleLogin-color', colors.value.titleLoginColor)
    document.documentElement.style.setProperty(
        '--subtitleLogin-color',
        colors.value.subtitleLoginColor
    )
    document.documentElement.style.setProperty('--text1-color', colors.value.text1Color)
    document.documentElement.style.setProperty('--text2-color', colors.value.text2Color)
    document.documentElement.style.setProperty('--text3-color', colors.value.text3Color)
    document.documentElement.style.setProperty('--textLogin-color', colors.value.textLoginColor)

    document.documentElement.style.setProperty('--border-color', colors.value.borderColor)
})
</script>

<template>
    <RouterView v-slot="{ Component }" appear>
        <Transition
            enter-active-class="duration-300 ease-out"
            enter-from-class="transform opacity-0"
            enter-to-class="opacity-100"
            leave-active-class="duration-200 ease-in"
            leave-from-class="opacity-100"
            leave-to-class="transform opacity-0"
        >
            <component :is="Component" />
        </Transition>
    </RouterView>
</template>
