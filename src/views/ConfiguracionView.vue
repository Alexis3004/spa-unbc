<script setup>
import { computed, onMounted, reactive, ref } from 'vue'
import IconTitleDescription from '@/components/IconTitleDescription.vue'
import CustomTable from '@/components/CustomTable.vue'
import CustomButton from '@/components/CustomButton.vue'
import PaginatorComponent from '@/components/PaginatorComponent.vue'
import IconSave from '@/components/icons/IconSave.vue'
import IconEdit from '@/components/icons/IconEdit.vue'
import IconEliminar from '@/components/icons/IconEliminar.vue'
import IconCancelar from '@/components/icons/IconCancelar.vue'
import CustomSelect from '@/components/CustomSelect.vue'
import CustomSearch from '@/components/CustomSearch.vue'
import { useAppStore } from '@/stores/app.js'
import { storeToRefs } from 'pinia'
import { debounce, titleCase } from '@/helpers'

import { succesAlert, deleteAlert, failAlert } from '@/composables/useToastFire'

const appStore = useAppStore()
const { users } = storeToRefs(appStore)

const filtros = reactive({
    page: 1,
    per_page: 10,
    sort: 'name',
    order: 'asc',
    search: ''
})

const editUser = ref(null)

const titulo = computed(() => {
    return 'Mantenimiento de usuarios'
})

const descripcion = computed(() => {
    return 'Administra los usuarios de la aplicación. Puedes editar y eliminar usuarios.'
})

const icono = computed(() => {
    return 'IconConfiguration'
})

const libreria = computed(() => {
    return 'Component'
})

const clasesIcono = computed(() => {
    return 'text-center w-12 laptop:w-16 text-4xl'
})

const changePaginator = (value) => {
    filtros.per_page = value.per_page
    filtros.page = value.current_page
    buscarResultados()
}

const buscarResultados = debounce(() => {
    appStore.consultarUsuarios(filtros)
}, 800)

const isOrderable = (column) => {
    return false
}

const editarUsuario = (usuario) => {
    editUser.value = usuario
    usuario.edit = true
}

const eliminarUsuario = async (usuario) => {
    const response = await window.Swal.fire({
        text: '¿Está seguro de eliminar este usuario?',
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#ffffff',
        confirmButtonText: 'SÍ',
        cancelButtonText: 'NO',
        customClass: {
            confirmButton: 'button',
            cancelButton: 'button'
        }
    })

    if (response.isConfirmed) {
        editUser.value = null
        try {
            await appStore.eliminarUsuario(usuario)
            buscarResultados()
            deleteAlert({
                titulo: 'Usuario eliminado',
                contenido: 'El usuario ha sido eliminado correctamente.'
            })
        } catch (error) {
            console.error(error)
            failAlert({
                titulo: 'Error al eliminar usuario',
                contenido: 'Ha ocurrido un error al eliminar el usuario.'
            })
        }
    }
}

const guardarUsuario = async (usuario) => {
    try {
        await appStore.guardarRol(usuario)
        buscarResultados()
        succesAlert({
            titulo: 'Usuario actualizado',
            contenido: 'El rol del usuario ha sido actualizado correctamente.'
        })
        editUser.value = null
    } catch (error) {
        console.error(error)
        failAlert({
            titulo: 'Error al actualizar usuario',
            contenido: 'Ha ocurrido un error al actualizar el rol del usuario.'
        })
    }
}

const cancelarUsuario = (usuario) => {
    usuario.rol = editUser.value.rol
    usuario.originalRol = editUser.value.originalRol
    usuario.edit = false
    editUser.value = null
}

const roles = [
    { id: 'admin', valor: 'Administrador' },
    { id: 'user', valor: 'Usuario' }
]

onMounted(() => {
    const user = appStore.user
    if (user && user.rol === 'user') {
        appStore.goBack()
    }
    buscarResultados()
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

        <div class="w-full my-3">
            <CustomSearch
                v-if="editUser == null"
                v-model.trim="filtros.search"
                @update:modelValue="buscarResultados"
                containerClasses="relative border border-black rounded-full shadow-sm w-full laptop:w-1/2"
            />
        </div>

        <CustomTable>
            <template v-slot:tableHeader>
                <tr>
                    <th scope="col" class="w-2/12 px-2 py-2 bg-accent-color">Rol</th>
                    <th scope="col" class="w-3/12 px-2 py-4">
                        <div class="flex items-center justify-start gap-2">
                            Nombre completo
                            <div v-if="isOrderable('Nombre')" class="flex flex-col gap-2.5">
                                <CustomButton buttonClasses="flex" @buttonClick="orderBy('Nombre')">
                                    <i class="fas fa-chevron-up fa-2xs"></i>
                                </CustomButton>
                                <CustomButton
                                    buttonClasses="flex"
                                    @buttonClick="orderBy('Nombre', false)"
                                >
                                    <i class="fas fa-chevron-down fa-2xs"></i>
                                </CustomButton>
                            </div>
                        </div>
                    </th>
                    <th scope="col" class="w-2/12 px-2 py-4">
                        <div class="flex items-center justify-start gap-2">
                            email
                            <div v-if="isOrderable('email')" class="flex flex-col gap-2.5">
                                <CustomButton buttonClasses="flex" @buttonClick="orderBy('email')">
                                    <i class="fas fa-chevron-up fa-2xs"></i>
                                </CustomButton>
                                <CustomButton
                                    buttonClasses="flex"
                                    @buttonClick="orderBy('email', false)"
                                >
                                    <i class="fas fa-chevron-down fa-2xs"></i>
                                </CustomButton>
                            </div>
                        </div>
                    </th>
                    <th scope="col" class="w-2/12 px-2 py-4">Telefono</th>
                    <th scope="col" class="w-1/12 px-2 py-4">
                        <div class="flex items-center justify-start gap-2">Creado</div>
                    </th>
                    <th scope="col" class="w-1/12 px-2 py-4">
                        <div class="flex items-center justify-start gap-2">Actualizado</div>
                    </th>
                    <th scope="col" class="w-1/12 px-2 py-4">
                        <div class="flex items-center justify-start gap-2">Acciones</div>
                    </th>
                </tr>
            </template>
            <template #tableBody="slotProps">
                <template v-if="users.data.length == 0">
                    <tr>
                        <td colspan="100%" class="p-0">
                            <div
                                class="sticky left-0 p-4 my-2 bg-white laptop:w-full"
                                :style="{
                                    width: slotProps.width + 'px'
                                }"
                            >
                                <div class="flex items-center justify-center flex-auto">
                                    <i class="text-red-500 fas fa-exclamation-triangle"></i
                                    ><span class="pl-2">No se encontraron registros</span>
                                </div>
                            </div>
                        </td>
                    </tr>
                </template>
                <template v-for="usuario in users.data" :key="usuario.id">
                    <tr :class="['even:bg-white odd:bg-[#f8f8f8]']">
                        <td class="px-2 py-2">
                            <template v-if="usuario.edit == false">
                                {{ titleCase(usuario.rol) }}
                            </template>
                            <template v-else>
                                <CustomSelect
                                    :defaultOption="{}"
                                    v-model="usuario.originalRol"
                                    :options="roles"
                                />
                            </template>
                        </td>
                        <td class="px-2 py-2 font-app-semibold">
                            {{ titleCase([usuario.name, usuario.last_name].join(' ')) }}
                        </td>
                        <td class="px-2 py-2">
                            <div class="flex flex-auto break-all font-app-semibold">
                                {{ usuario.email }}
                            </div>
                        </td>
                        <td class="px-2 py-2">
                            {{ usuario.phone }}
                        </td>
                        <td class="px-2 py-2">
                            {{ titleCase(usuario.creado) }}
                        </td>
                        <td class="px-2 py-2 font-app-semibold">
                            {{ titleCase(usuario.actualizado) }}
                        </td>
                        <td class="px-2 py-2">
                            <div class="flex items-center justify-start gap-2">
                                <CustomButton
                                    buttonClasses="flex"
                                    @buttonClick="eliminarUsuario(usuario)"
                                >
                                    <IconEliminar fill="#FF0000" width="25" height="25" />
                                </CustomButton>
                                <CustomButton
                                    buttonClasses="flex"
                                    @buttonClick="editarUsuario(usuario)"
                                    v-if="usuario.edit == false"
                                >
                                    <IconEdit width="25" height="25" />
                                </CustomButton>
                                <template v-else>
                                    <CustomButton
                                        buttonClasses="flex"
                                        @buttonClick="guardarUsuario(usuario)"
                                    >
                                        <IconSave width="25" height="25" />
                                    </CustomButton>
                                    <CustomButton
                                        buttonClasses="flex"
                                        @buttonClick="cancelarUsuario(usuario)"
                                    >
                                        <IconCancelar width="25" height="25" />
                                    </CustomButton>
                                </template>
                            </div>
                        </td>
                    </tr>
                </template>
            </template>
            <template v-slot:footer>
                <PaginatorComponent
                    v-model="users"
                    @update:modelValue="(value) => changePaginator(value)"
                    pagesContainerClasses="col-span-2 md:col-span-1 flex items-center justify-center md:justify-end text-sm"
                    descriptionContainerClasses="col-span-2 md:col-span-1 flex items-center justify-center lg:justify-start  text-sm"
                />
            </template>
        </CustomTable>
    </div>
</template>
