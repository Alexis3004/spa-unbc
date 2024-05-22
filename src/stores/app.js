import { markRaw } from 'vue'
import route from '@/api/routes'
import api from '@/api'
import { getSlug } from '@/helpers'
import { StorageSerializers, useStorage, breakpointsTailwind, useBreakpoints } from '@vueuse/core'
import IconHome from '@/components/icons/IconHome.vue'
import IconConfiguration from '@/components/icons/IconConfiguration.vue'
import IconUser from '@/components/icons/IconUser.vue'

import { defineStore } from 'pinia'
import { data } from 'autoprefixer'

export const useAppStore = defineStore('app', {
    state: () => ({
        loadings: {
            usuario: false
        },
        configuration: {
            layout: {
                spacings: {
                    headerSpacingPhone: '4rem',
                    headerSpacingPhoneRecientesPages: '6rem',
                    sidebarSpacingPhone: '4.5rem',
                    headerSpacingLaptop: '4.5rem',
                    sidebarSpacingLaptop: '4.5rem',
                    headerSpacingDesktop: '5rem',
                    sidebarSpacingDesktop: '5.75rem'
                },
                showDefaultBackground: true
            },
            header: {
                show: true,
                showBackButton: false,
                showLogo: false,
                showTitle: false,
                showUserMenu: false,
                showDate: false,
                showWelcome: false
            },
            sidebar: {
                showUserMenu: false
            }
        },
        isMobile: useBreakpoints(breakpointsTailwind).smallerOrEqual('xl'),
        accessToken: useStorage('access_token', null, undefined, {
            serializer: StorageSerializers.string
        }),
        navegacion: true,
        sidebarSelection: null,
        listSelection: null,
        user: null,
        sidebarItems: [
            {
                id: 1,
                nombre: 'Inicio',
                classes: 'grid-in-home',
                pathClasses: 'stroke-[3]',
                fill: false,
                icono: markRaw(IconHome),
                titulo: 'MÓDULOS',
                cantidad: false,
                default: {
                    id: null,
                    nombre: 'Recientes',
                    descripcion: 'Opciones recientes',
                    icono: 'IconClock',
                    tipo_icono: 'Component'
                }
            },
            {
                id: 2,
                nombre: 'Configuración',
                classes: 'grid-in-configuration',
                pathClasses: 'stroke-[3]',
                fill: false,
                icono: markRaw(IconConfiguration),
                titulo: 'MÓDULOS',
                cantidad: false,
                default: {
                    id: null,
                    nombre: 'Configuración'
                }
            },
            {
                id: 3,
                nombre: 'Mi cuenta',
                classes: 'grid-in-account',
                pathClasses: 'stroke-1',
                fill: true,
                icono: markRaw(IconUser),
                titulo: 'MÓDULOS',
                cantidad: false,
                default: {
                    id: null,
                    nombre: 'Configuración'
                }
            }
        ],
        users: {
            current_page: 1,
            data: [],
            first_page_url: '',
            from: 1,
            last_page: 1,
            last_page_url: '',
            links: [],
            next_page_url: null,
            path: '',
            per_page: 10,
            prev_page_url: null,
            to: 2,
            total: 2,
            per_page_ranges: [10, 25, 50, 100]
        }
    }),

    actions: {
        login(data) {
            return new Promise((resolve, reject) => {
                api.post(route('auth.login'), data)
                    .then((response) => {
                        this.accessToken = response.data.token
                        this.user = response.data.user
                        resolve(response.data)
                    })
                    .catch((err) => {
                        reject(err)
                    })
            })
        },
        register(data) {
            return new Promise((resolve, reject) => {
                api.post(route('user.store'), data)
                    .then((response) => {
                        resolve(response.data)
                    })
                    .catch((err) => {
                        reject(err)
                    })
            })
        },
        async logout() {
            try {
                const response = await api.delete(route('auth.logout'))
                localStorage.removeItem('access_token')
                window.location.reload()
                return response.data.estado
            } catch (err) {
                console.log(err)
                return false
            }
        },
        update(data) {
            return new Promise((resolve, reject) => {
                api.put(route('user.update'), data)
                    .then((response) => {
                        this.user = response.data.user
                        resolve(response.data)
                    })
                    .catch((err) => {
                        reject(err)
                    })
            })
        },
        async consultarUsuario() {
            if (this.loadings.usuario) return
            this.loadings.usuario = true
            try {
                const response = await api.get(route('user.get-user'))
                this.user = response.data.user
            } catch (err) {
                console.log(err)
            } finally {
                this.loadings.usuario = false
            }
        },
        consultarUsuarios(filtros) {
            return new Promise((resolve, reject) => {
                api.get(route('user.index'), {
                    params: filtros
                })
                    .then((response) => {
                        this.users = { ...this.users, ...response.data.users }
                        resolve(response.data)
                    })
                    .catch((err) => {
                        reject(err)
                    })
            })
        },
        guardarRol(usuario) {
            return new Promise((resolve, reject) => {
                api.patch(`${route('user.update-role')}/${usuario.id}`, {
                    rol: usuario.originalRol
                })
                    .then((response) => {
                        resolve(response.data)
                    })
                    .catch((err) => {
                        reject(err)
                    })
            })
        },
        eliminarUsuario(usuario) {
            return new Promise((resolve, reject) => {
                api.delete(`${route('user.destroy')}/${usuario.id}`)
                    .then((response) => {
                        resolve(response.data)
                    })
                    .catch((err) => {
                        reject(err)
                    })
            })
        },
        lockNavigation() {
            this.navegacion = false
        },
        unlockNavigation() {
            this.navegacion = true
        },
        getConfigurationValue(value) {
            if (Array.isArray(value)) {
                return this.isMobile ? value[0] : value[value.length - 1]
            }
            return value
        },
        setConfiguration(entry, data) {
            Object.entries(data).forEach(([key, value]) => {
                this.configuration[entry][key] = this.getConfigurationValue(value)
            })
        },
        setSidebarSelection(item) {
            this.sidebarSelection = item
        },
        goToSidebarSelection(item) {
            if (!this.navegacion) return
            const route = getSlug(`/${item.nombre}`)
            this.router.push({ path: route })
        },
        goBack() {
            this.router.go(-1)
        },
        setListSelection(item) {
            this.listSelection = item
        }
    },
    getters: {}
})
