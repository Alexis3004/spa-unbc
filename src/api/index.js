import axios from 'axios'
import config from '@/config'
import router from '@/router'
import { Toast, getAccessToken } from '@/helpers'

const api = axios.create({
    baseURL: config.api
})

api.defaults.withCredentials = true

api.interceptors.request.use(
    (config) => {
        const token = getAccessToken()
        if (token !== null) {
            config.headers.Authorization = `Bearer ${token}`
        }
        config.headers.Accept = 'application/json'
        config.headers['Content-Type'] = 'application/json'
        return config
    },
    (error) => {
        return Promise.reject(error)
    }
)

api.interceptors.response.use(
    (response) => {
        return response
    },
    async (error) => {
        if (error.response.status === 401) {
            if (['login', 'register'].includes(router.currentRoute.value.name)) throw error
            try {
                await window.Swal.fire({
                    position: 'center',
                    imageUrl: '',
                    imageHeight: 75,
                    html: `<div class="flex flex-col justify-center items-center text-text1-color gap-3"><span class="font-app-bold text-2xl">Sesión expirada</span><hr class="w-3/4 border-t border-accent-color"><span class="font-app text-base">Su sesión ha caducado</span></div>`,
                    showConfirmButton: false,
                    timer: 3000
                })
            } catch (err) {
                console.log(err)
            } finally {
                localStorage.removeItem('access_token')
                window.location.reload()
            }
        }
        if (error.response.status === 403) {
            Toast.fire({
                padding: '0.5em',
                iconHtml: `<svg xmlns="http://www.w3.org/2000/svg" width="35.854" height="35.854" viewBox="0 0 35.854 35.854" class="w-8 h-8 shrink-0"><g id="Grupo_5931" data-name="Grupo 5931" transform="translate(-1292 -312.573)"><g id="Grupo_5928" data-name="Grupo 5928" transform="translate(67 155.573)"><circle id="Elipse_2073" data-name="Elipse 2073" cx="17.927" cy="17.927" r="17.927" transform="translate(1225 157)" fill="#ae1717"></circle></g><path id="Icon_metro-blocked" data-name="Icon metro-blocked" d="M5.855,5.212A11.214,11.214,0,0,1,21.714,21.071,11.214,11.214,0,0,1,5.855,5.212Zm-.481,7.929a8.364,8.364,0,0,0,1.557,4.87L18.655,6.289A8.406,8.406,0,0,0,5.374,13.142Zm16.82,0a8.364,8.364,0,0,0-1.557-4.87L8.914,19.994a8.406,8.406,0,0,0,13.281-6.853Z" transform="translate(1296.143 317.358)" fill="#eddddd"></path></g></svg>`,
                html: '<div class="text-[#350C07]"><span class="font-app-bold text-2xl">No tiene permisos</span><br><span class="font-app">para ingresar a esta opción</span></div>',
                background: '#EBBCBB'
            })
        }
        return Promise.reject(error)
    }
)

export default api
