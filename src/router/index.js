import { createRouter, createWebHistory } from 'vue-router'
import { validateUser, getSlug } from '@/helpers'
import { useAppStore } from '@/stores/app.js'
import HomeView from '../views/HomeView.vue'

const AppLayout = () => import('@/layout/AppLayout.vue')
const MainLayout = () => import('@/layout/MainLayout.vue')
const ConfiguracionView = () => import('@/views/ConfiguracionView.vue')
const MiCuentaView = () => import('@/views/MiCuentaView.vue')

const routes = [
    {
        path: '',
        component: AppLayout,
        redirect: { name: 'home' },
        meta: {
            requiresAuth: true,
            sidebar: 'Inicio'
        },
        children: [
            {
                path: '/home',
                name: 'home',
                component: MainLayout,
                meta: {
                    title: 'Inicio',
                    sidebar: 'Inicio',
                    configuration: {
                        layout: {
                            defaultBackground: true
                        },
                        header: {
                            show: true,
                            showBackButton: false,
                            showLogo: false,
                            showTitle: false,
                            showDate: false,
                            showUserMenu: [true, false],
                            showWelcome: false
                        },
                        sidebar: {
                            showUserMenu: [false, true]
                        }
                    }
                },
                redirect: { name: 'home-default' },
                children: [
                    {
                        path: '',
                        name: 'home-default',
                        meta: {
                            title: 'Inicio',
                            configuration: {
                                layout: {
                                    defaultBackground: false
                                },
                                header: {
                                    show: false,
                                    showBackButton: false,
                                    showLogo: true,
                                    showTitle: false,
                                    showDate: true,
                                    showUserMenu: true,
                                    showWelcome: false
                                },
                                sidebar: {
                                    showUserMenu: true
                                }
                            }
                        },
                        component: HomeView
                    }
                ]
            },
            {
                path: '/configuracion',
                name: 'configuracion',
                component: MainLayout,
                meta: {
                    title: 'Configuración',
                    sidebar: 'Configuración',
                    configuration: {
                        layout: {
                            defaultBackground: true
                        },
                        header: {
                            show: true,
                            showBackButton: true,
                            showLogo: false,
                            showTitle: true,
                            showDate: true,
                            showUserMenu: true,
                            showWelcome: false
                        },
                        sidebar: {
                            showUserMenu: true
                        }
                    }
                },
                redirect: { name: 'configuracion-default' },
                children: [
                    {
                        path: '',
                        name: 'configuracion-default',
                        meta: { title: 'Configuración', id: 2 },
                        component: ConfiguracionView
                    }
                ]
            },
            {
                path: '/mi-cuenta',
                name: 'mi-cuenta',
                component: MainLayout,
                meta: {
                    title: 'Mi cuenta',
                    sidebar: 'Mi cuenta',
                    configuration: {
                        layout: {
                            defaultBackground: true
                        },
                        header: {
                            show: true,
                            showBackButton: true,
                            showLogo: false,
                            showTitle: true,
                            showDate: true,
                            showUserMenu: true,
                            showWelcome: true
                        },
                        sidebar: {
                            showUserMenu: true
                        }
                    }
                },
                redirect: { name: 'mi-cuenta-default' },
                children: [
                    {
                        path: '',
                        name: 'mi-cuenta-default',
                        meta: { title: 'Mi cuenta', id: 3 },
                        component: MiCuentaView
                    }
                ]
            }
        ]
    },
    {
        path: '/login',
        name: 'login',
        component: () => import('@/views/LoginView.vue')
    },
    {
        path: '/register',
        name: 'register',
        component: () => import('@/views/RegisterView.vue')
    },

    // default
    {
        path: '/:pathMatch(.*)*',
        name: 'NotFound',
        redirect: { name: 'home' }
    }
]

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes,
    scrollBehavior() {
        return { top: 0 }
    }
})

router.beforeEach(async (to) => {
    const isAuthenticated = validateUser()
    if (to.meta.requiresAuth && !isAuthenticated) {
        return { name: 'login' }
    }

    if (isAuthenticated && (to.name === 'login' || to.name === 'register')) {
        return { name: 'home' }
    }

    if (!to.meta.requiresAuth) {
        return true
    }

    const appStore = useAppStore()
    if (!appStore.user) {
        await appStore.consultarUsuario()
    }
})

router.beforeResolve(async (to) => {
    const appStore = useAppStore()
    appStore.unlockNavigation()

    if (!to.meta.requiresAuth) {
        return
    }

    const layoutConfiguration = to.meta.configuration
    if (layoutConfiguration) {
        Object.entries(layoutConfiguration).forEach(([key, value]) => {
            appStore.setConfiguration(key, value)
        })
    }

    if (to.meta.sidebar) {
        const sidebarItem = appStore.sidebarItems.find(
            (item) => getSlug(item.nombre) == getSlug(to.meta.sidebar)
        )
        appStore.setSidebarSelection(sidebarItem)
    }

    if (to.meta.id) {
        const listItem = appStore.sidebarItems.find((item) => item.id == to.meta.id)

        appStore.setListSelection(listItem)
    }
})

export default router
