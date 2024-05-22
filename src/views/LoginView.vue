<script setup>
import { useRouter, RouterLink } from 'vue-router'
import { reactive, ref, computed, watch } from 'vue'

import CustomInput from '@/components/CustomInput.vue'
import CustomButton from '@/components/CustomButton.vue'
import LogoUser from '@/components/icons/LogoUser.vue'
import IconLoading from '@/components/icons/IconLoading.vue'

import useVuelidate from '@vuelidate/core'
import { required, email, helpers } from '@vuelidate/validators'

import { useAppStore } from '@/stores/app.js'

const appStore = useAppStore()

const router = useRouter()

const loading = ref(false)

const error = reactive({
    mostrar: false,
    message: ''
})

const notificacion = reactive({
    titulo: '',
    message: ''
})

const inputModel = reactive({
    email: '',
    password: ''
})

const rules = computed(() => ({
    email: {
        campoRequerido: helpers.withMessage('El campo email es requerido', required),
        email: helpers.withMessage('El campo email debe ser un correo válido', email)
    },
    password: {
        campoRequerido: helpers.withMessage('El campo contraseña es requerido', required)
    }
}))

const errors = computed(() => {
    const errorMessages = v$.value.$errors ?? []
    return errorMessages.map((error) => error.$message)
})

const v$ = useVuelidate(rules, inputModel)

const login = async () => {
    if (loading.value) return

    v$.value.$validate()
    if (v$.value.$invalid) {
        error.mostrar = true
        error.mensaje = errors.value[0]
        return
    }

    loading.value = true
    try {
        notificacion.titulo = 'Espere un momento...'
        notificacion.mensaje = 'Validando credenciales'

        await appStore.login(inputModel)

        notificacion.titulo = 'Ingresando...'
        notificacion.mensaje = ''
        await new Promise((resolve) => setTimeout(resolve, 1000))

        router.push({ name: 'home' })
    } catch (err) {
        error.mostrar = true
        error.mensaje = 'Los datos ingresados no son correctos'
    } finally {
        notificacion.titulo = ''
        notificacion.mensaje = ''
        loading.value = false
    }
}

watch(inputModel, () => {
    if (!error.mostrar) {
        return
    }
    error.mostrar = false
})
</script>

<template>
    <div
        class="grid grid-cols-1 laptop:grid-cols-2 h-screen grid-rows-[1fr_2fr] laptop:grid-rows-1 font-layout"
    >
        <div class="relative h-full overflow-hidden bg-login-background">
            <img
                class="absolute top-0 bottom-0 left-0 right-0 object-cover w-full h-full opacity-10"
                src="@/assets/images/login.png"
            />
            <div class="absolute text-[#02b2ea] bottom-10 left-8 laptop:left-20">
                <h1
                    class="text-5xl laptop:text-6xl desktop:text-7xl font-layout-bold laptop:mt-4 laptop:mb-2"
                >
                    <span>UNBC</span>
                </h1>
            </div>
        </div>
        <div class="flex items-center justify-center flex-auto h-full overflow-y-auto bg-white">
            <div class="relative w-full laptop:w-7/12 max-w-[460px] mx-6 my-4">
                <div class="flex items-center justify-center w-full h-auto mb-6">
                    <div class="w-36 laptop:w-48 desktop:w-80 laptop:mb-12">
                        <LogoUser width="100" height="100" />
                    </div>
                </div>
                <div>
                    <div class="mb-7 laptop:mb-8 desktop:mb-12">
                        <h3
                            class="text-4xl text-title-login-color laptop:text-4xl desktop:text-6xl font-layout-bold desktop:mb-2"
                        >
                            Bienvenido
                        </h3>
                        <span class="text-base text-subtitle-login-color desktop:text-lg"
                            >Por favor usa tus datos para iniciar sesión</span
                        >
                    </div>
                    <form @submit.prevent="login" class="text-subtitle-login-color">
                        <div>
                            <div class="flex flex-col mb-4 gap-y-5 laptop:gap-y-6 desktop:gap-y-10">
                                <CustomInput
                                    v-model="inputModel.email"
                                    containerClasses="error-border-b-container relative"
                                    inputClasses="focus:shadow-none focus:ring-0 focus:outline-0 font-inherit bg-white outline-0 border-b-2 border-[#E7E9EE] text-base desktop:text-xl placeholder:text-subtitle-login-color placeholder:text-base desktop:placeholder:text-xl placeholder:laptop:font-layout-semibold p-1 w-full h-8"
                                    :placeholder="'Email'"
                                    :disabled="loading"
                                    :error="v$.email.$error"
                                    @blur="v$.email.$touch()"
                                />
                                <CustomInput
                                    v-model="inputModel.password"
                                    containerClasses="error-border-b-container relative"
                                    inputClasses="focus:shadow-none focus:ring-0 focus:outline-0 font-inherit bg-white outline-0 border-b-2 border-[#E7E9EE] text-base desktop:text-xl placeholder:text-subtitle-login-color placeholder:text-base desktop:placeholder:text-xl placeholder:laptop:font-layout-semibold p-1 w-full h-8"
                                    :type="'password'"
                                    :placeholder="'Contraseña'"
                                    :disabled="loading"
                                    :error="v$.password.$error"
                                    @blur="v$.password.$touch()"
                                />
                            </div>
                            <div class="relative mb-10 laptop:mb-12">
                                <div
                                    v-if="error.mostrar"
                                    class="absolute text-xs text-white bg-[#FC5F53] rounded-md py-0.5 px-1.5"
                                >
                                    {{ error.mensaje }}
                                </div>
                            </div>
                            <div
                                class="flex items-center justify-between text-sm text-text-login-color laptop:font-layout-semibold desktop:text-lg mb-14"
                            >
                                <RouterLink :to="{ name: 'register' }">
                                    <span>¿No se ha registrado?</span>
                                </RouterLink>
                            </div>
                            <div class="flex justify-end gap-3 laptop:flex-row-reverse">
                                <div
                                    class="flex items-center justify-end gap-2 text-right laptop:flex-row-reverse laptop:text-left"
                                    v-if="loading"
                                >
                                    <div>
                                        <div v-if="notificacion.titulo" class="text-sm font-layout">
                                            {{ notificacion.titulo }}
                                        </div>
                                        <div
                                            v-if="notificacion.mensaje"
                                            class="text-xs font-layout-light"
                                        >
                                            {{ notificacion.mensaje }}
                                        </div>
                                    </div>
                                    <div>
                                        <IconLoading
                                            svgClasses="inline w-6 aspect-square text-[#D2E5F0] animate-spin fill-secondary-color"
                                        />
                                    </div>
                                </div>
                                <CustomButton
                                    containerClasses="flex justify-end laptop:justify-start"
                                    buttonClasses="flex justify-center items-center rounded-[14px] desktop:rounded-[25px] desktop:font-layout-semibold text-base desktop:text-xl text-white bg-secondary-color py-3 px-8 laptop:py-3 laptop:px-8 desktop:py-4 desktop:px-12"
                                >
                                    <span>Ingresar</span>
                                </CustomButton>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>
