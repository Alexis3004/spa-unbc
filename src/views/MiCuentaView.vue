<script setup>
import { computed, reactive, markRaw, ref, watch } from 'vue'
import IconTitleDescription from '@/components/IconTitleDescription.vue'
import CustomInput from '@/components/CustomInput.vue'
import CustomButton from '@/components/CustomButton.vue'
import IconLoading from '@/components/icons/IconLoading.vue'

import { useAppStore } from '@/stores/app.js'
import useVuelidate from '@vuelidate/core'
import { email, helpers, required, sameAs, minLength } from '@vuelidate/validators'

import { succesAlert } from '@/composables/useToastFire'

const appStore = useAppStore()

// clonar el usuario del appStore
const user = reactive({
    ...markRaw(appStore.user),
    password: '',
    new_password: '',
    confirmation_password: ''
})

const titulo = computed(() => {
    return 'Actualizar datos de la cuenta'
})

const descripcion = computed(() => {
    return 'Mantén tus datos actualizados para que podamos brindarte un mejor servicio'
})
const icono = computed(() => {
    return 'IconUser'
})
const libreria = computed(() => {
    return 'Component'
})

const clasesIcono = computed(() => {
    return 'text-center w-10 laptop:w-12 text-3xl'
})

const loading = ref(false)

const error = reactive({
    mostrar: false,
    mensaje: ''
})

const notificacion = reactive({
    titulo: '',
    mensaje: ''
})

const rules = computed(() => ({
    name: {
        requerido: helpers.withMessage('El campo nombre es requerido', required)
    },
    last_name: {
        requerido: helpers.withMessage('El campo apellido es requerido', required)
    },
    phone: {
        requerido: helpers.withMessage('El campo teléfono es requerido', required),
        phone: helpers.withMessage('El campo teléfono debe ser un número válido', (value) => {
            const phoneRegex = /^[0-9]{10}$/
            return phoneRegex.test(value)
        })
    },
    email: {
        requerido: helpers.withMessage('El campo email es requerido', required),
        email: helpers.withMessage('El campo email debe ser un correo válido', email)
    },
    password: {
        requerido: helpers.withMessage('El campo contraseña es requerido', required)
    },
    new_password: {
        minLength: helpers.withMessage(
            'El tamaño mínimo de la contraseña es de 8 caracteres',
            minLength(8)
        )
    },
    confirmation_password: {
        minLength: helpers.withMessage(
            'El tamaño mínimo de la contraseña es de 8 caracteres',
            minLength(8)
        ),
        sameAs: helpers.withMessage('Las contraseñas no coinciden', sameAs(user.new_password))
    }
}))

const errors = computed(() => {
    const errorMessages = v$.value.$errors ?? []
    return errorMessages.map((error) => error.$message)
})

const v$ = useVuelidate(rules, user)

const update = async () => {
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
        notificacion.mensaje = 'Actualizando datos de la cuenta'

        const response = await appStore.update(user)

        notificacion.titulo = 'Actualizando información...'
        notificacion.mensaje = ''

        console.log(response)

        user.name = response.user.name
        user.last_name = response.user.last_name
        user.phone = response.user.phone
        user.email = response.user.email
        user.password = ''
        user.new_password = ''
        user.confirmation_password = ''

        v$.value.$reset()

        succesAlert({
            titulo: 'Datos actualizados',
            contenido: 'Los datos de la cuenta se actualizaron correctamente.'
        })
    } catch (err) {
        console.log(err)
        error.mostrar = true
        if (err.response && err.response.data) {
            error.mensaje = err.response.data.message
            return
        }
        error.mensaje = 'Se produjo un error al actualizar los datos.'
    } finally {
        notificacion.titulo = ''
        notificacion.mensaje = ''
        loading.value = false
    }
}

watch(user, () => {
    if (!error.mostrar) {
        return
    }
    error.mostrar = false
})
</script>

<template>
    <div class="h-full font-layout">
        <IconTitleDescription
            :title="titulo"
            :description="descripcion"
            :icon="icono"
            :library="libreria"
            :iconClasses="clasesIcono"
        />

        <form @submit.prevent="update" class="text-subtitle-login-color">
            <div>
                <div class="flex flex-col mb-4 gap-y-5 laptop:gap-y-6 desktop:gap-y-10">
                    <CustomInput
                        v-model="user.name"
                        containerClasses="error-border-b-container relative"
                        inputClasses="focus:shadow-none focus:ring-0 focus:outline-0 font-inherit bg-white outline-0 border-b-2 border-[#E7E9EE] text-base desktop:text-xl placeholder:text-subtitle-login-color placeholder:text-base desktop:placeholder:text-xl placeholder:laptop:font-layout-semibold p-1 w-full h-8"
                        :placeholder="'Nombre'"
                        :disabled="loading"
                        :error="v$.name.$error"
                        @blur="v$.name.$touch()"
                    />
                    <CustomInput
                        v-model="user.last_name"
                        containerClasses="error-border-b-container relative"
                        inputClasses="focus:shadow-none focus:ring-0 focus:outline-0 font-inherit bg-white outline-0 border-b-2 border-[#E7E9EE] text-base desktop:text-xl placeholder:text-subtitle-login-color placeholder:text-base desktop:placeholder:text-xl placeholder:laptop:font-layout-semibold p-1 w-full h-8"
                        :placeholder="'Apellido'"
                        :disabled="loading"
                        :error="v$.last_name.$error"
                        @blur="v$.last_name.$touch()"
                    />
                    <CustomInput
                        v-model="user.phone"
                        containerClasses="error-border-b-container relative"
                        inputClasses="focus:shadow-none focus:ring-0 focus:outline-0 font-inherit bg-white outline-0 border-b-2 border-[#E7E9EE] text-base desktop:text-xl placeholder:text-subtitle-login-color placeholder:text-base desktop:placeholder:text-xl placeholder:laptop:font-layout-semibold p-1 w-full h-8"
                        :type="'tel'"
                        :placeholder="'Teléfono'"
                        :disabled="loading"
                        :error="v$.phone.$error"
                        @blur="v$.phone.$touch()"
                    />
                    <CustomInput
                        v-model="user.email"
                        containerClasses="error-border-b-container relative"
                        inputClasses="focus:shadow-none focus:ring-0 focus:outline-0 font-inherit bg-white outline-0 border-b-2 border-[#E7E9EE] text-base desktop:text-xl placeholder:text-subtitle-login-color placeholder:text-base desktop:placeholder:text-xl placeholder:laptop:font-layout-semibold p-1 w-full h-8"
                        :type="'email'"
                        :placeholder="'Email'"
                        :disabled="loading"
                        :error="v$.email.$error"
                        @blur="v$.email.$touch()"
                    />
                    <CustomInput
                        v-model="user.password"
                        containerClasses="error-border-b-container relative"
                        inputClasses="focus:shadow-none focus:ring-0 focus:outline-0 font-inherit bg-white outline-0 border-b-2 border-[#E7E9EE] text-base desktop:text-xl placeholder:text-subtitle-login-color placeholder:text-base desktop:placeholder:text-xl placeholder:laptop:font-layout-semibold p-1 w-full h-8"
                        :type="'password'"
                        :placeholder="'Contraseña'"
                        :disabled="loading"
                        :error="v$.password.$error"
                        @blur="v$.password.$touch()"
                    />
                    <CustomInput
                        v-model="user.new_password"
                        containerClasses="error-border-b-container relative"
                        inputClasses="focus:shadow-none focus:ring-0 focus:outline-0 font-inherit bg-white outline-0 border-b-2 border-[#E7E9EE] text-base desktop:text-xl placeholder:text-subtitle-login-color placeholder:text-base desktop:placeholder:text-xl placeholder:laptop:font-layout-semibold p-1 w-full h-8"
                        :type="'password'"
                        :placeholder="'Nueva Contraseña'"
                        :disabled="loading"
                        :error="v$.new_password.$error"
                        @blur="v$.new_password.$touch()"
                    />
                    <CustomInput
                        v-model="user.confirmation_password"
                        containerClasses="error-border-b-container relative"
                        inputClasses="focus:shadow-none focus:ring-0 focus:outline-0 font-inherit bg-white outline-0 border-b-2 border-[#E7E9EE] text-base desktop:text-xl placeholder:text-subtitle-login-color placeholder:text-base desktop:placeholder:text-xl placeholder:laptop:font-layout-semibold p-1 w-full h-8"
                        :type="'password'"
                        :placeholder="'Confirme Contraseña'"
                        :disabled="loading"
                        :error="v$.confirmation_password.$error"
                        @blur="v$.confirmation_password.$touch()"
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
                <div class="flex justify-end gap-3 laptop:flex-row-reverse">
                    <div
                        class="flex items-center justify-end gap-2 text-right laptop:flex-row-reverse laptop:text-left"
                        v-if="loading"
                    >
                        <div>
                            <div v-if="notificacion.titulo" class="text-sm font-layout">
                                {{ notificacion.titulo }}
                            </div>
                            <div v-if="notificacion.mensaje" class="text-xs font-layout-light">
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
                        <span>Actualizar datos</span>
                    </CustomButton>
                </div>
            </div>
        </form>
    </div>
</template>

<style></style>
