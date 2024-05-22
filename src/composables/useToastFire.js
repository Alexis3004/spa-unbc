import { Toast } from '@/helpers'

const defaultConfig = {
    titulo: '',
    contenido: '',
    width: 'w-max phone:!w-[400px]',
    timer: 5000,
    iconClasses: 'w-8 h-auto shrink-0 flex items-start'
}

function succesAlert(config = defaultConfig) {
    if (!config) return
    config.titulo = config.titulo ? config.titulo : defaultConfig.titulo
    config.contenido = config.contenido ? config.contenido : defaultConfig.contenido
    config.width = config.width ? config.width : defaultConfig.width
    config.timer = config.timer ? config.timer : defaultConfig.timer
    config.iconClasses = config.iconClasses ? config.iconClasses : defaultConfig.iconClasses

    return Toast.fire({
        padding: '0',
        html: `
            <div class="text-[#07350C] grid grid-flow-row grid-cols-8 py-1 gap-x-2 mr-4">
                <div class="col-span-1 flex flex-auto flex-row items-start justify-center">
                    <svg class="${config.iconClasses ?? defaultConfig.iconClasses}" id="Grupo_5931" data-name="Grupo 5931" xmlns="http://www.w3.org/2000/svg" width="35.854" height="35.854" viewBox="0 0 35.854 35.854"><g id="Grupo_5928" data-name="Grupo 5928"><circle id="Elipse_2073" data-name="Elipse 2073" cx="17.927" cy="17.927" r="17.927" fill="#20600a"></circle><path id="Trazado_17514" data-name="Trazado 17514" d="M35.41,22.722,21.689,36.986,14.68,30.049" transform="translate(-7.118 -11.927)" fill="none" stroke="#c2e6c5" stroke-linejoin="round" stroke-width="3.5"></path></g></svg>
                </div>
                <span class="col-span-7 font-layout-bold text-2xl">
                    ${config.titulo ?? defaultConfig.titulo}
                </span>
                <div class="col-span-7 col-start-2">
                    <span class="font-layout">
                        ${config.contenido ?? defaultConfig.contenido}
                    </span>
                </div>
            </div>`,
        background: '#C2E6C5',
        timer: config.timer ?? defaultConfig.timer,
        customClass: {
            container: config.width ?? defaultConfig.width,
            htmlContainer: 'w-full',
            popup: '!flex items-center justify-start !bg-[#C2E6C5] p-2',
            closeButton: '!text-[#07350c] absolute top-1 right-1',
            timerProgressBar: '!bg-[#20600A] absolute right-0 bottom-0'
        }
    })
}

function failAlert(config = defaultConfig) {
    if (!config) return
    config.titulo = config.titulo ? config.titulo : defaultConfig.titulo
    config.contenido = config.contenido ? config.contenido : defaultConfig.contenido
    config.width = config.width ? config.width : defaultConfig.width
    config.timer = config.timer ? config.timer : defaultConfig.timer
    config.iconClasses = config.iconClasses ? config.iconClasses : defaultConfig.iconClasses

    return Toast.fire({
        padding: '0',
        html: `
        <div class="grid grid-flow-row grid-cols-8 py-1 gap-x-2 mr-4">
            <div class="col-span-1 flex flex-auto flex-row items-start justify-center">
                <svg class="${config.iconClasses ?? defaultConfig.iconClasses}" xmlns="http://www.w3.org/2000/svg" width="35.854" height="35.854" viewBox="0 0 35.854 35.854">
                    <g id="Grupo_5931" data-name="Grupo 5931" transform="translate(-1292 -312.573)">
                        <g id="Grupo_5928" data-name="Grupo 5928" transform="translate(67 155.573)">
                            <circle id="Elipse_2073" data-name="Elipse 2073" cx="17.927" cy="17.927" r="17.927" transform="translate(1225 157)" fill="#ae1717"/>
                        </g>
                        <path id="Icon_metro-blocked" data-name="Icon metro-blocked" d="M5.855,5.212A11.214,11.214,0,0,1,21.714,21.071,11.214,11.214,0,0,1,5.855,5.212Zm-.481,7.929a8.364,8.364,0,0,0,1.557,4.87L18.655,6.289A8.406,8.406,0,0,0,5.374,13.142Zm16.82,0a8.364,8.364,0,0,0-1.557-4.87L8.914,19.994a8.406,8.406,0,0,0,13.281-6.853Z" transform="translate(1296.143 317.358)" fill="#eddddd"/>
                    </g>
                </svg>
            </div>
            <span class="text-[#350C07] col-span-7 font-layout-bold text-2xl">
                ${config.titulo ?? defaultConfig.titulo}
            </span>
            <div class="text-[#350C07] col-span-7 col-start-2">
                <span class="font-layout">
                    ${config.contenido ?? defaultConfig.contenido}
                </span>
            </div>
        </div>`,
        background: '#f0dada',
        timer: config.timer ?? defaultConfig.timer,
        customClass: {
            container: config.width ?? defaultConfig.width,
            popup: `!flex items-start justify-start p-2`,
            htmlContainer: 'w-full',
            closeButton: '!text-[#B79C9B] absolute top-1 right-1',
            timerProgressBar: '!bg-[#ae1818] absolute right-0 bottom-0'
        }
    })
}

function deleteAlert(config = defaultConfig) {
    if (!config) return
    config.titulo = config.titulo ? config.titulo : defaultConfig.titulo
    config.contenido = config.contenido ? config.contenido : defaultConfig.contenido
    config.width = config.width ? config.width : defaultConfig.width
    config.timer = config.timer ? config.timer : defaultConfig.timer
    config.iconClasses = config.iconClasses ? config.iconClasses : defaultConfig.iconClasses

    return Toast.fire({
        padding: '0',
        html: `
        <div class="grid grid-flow-row grid-cols-8 py-1 gap-x-2 mr-4">
            <div class="col-span-1 flex flex-auto flex-row items-start justify-center">
                <svg class="${config.iconClasses ?? defaultConfig.iconClasses}" xmlns="http://www.w3.org/2000/svg" width="35.854" height="35.854" viewBox="0 0 35.854 35.854">
                    <g id="Grupo_160780" data-name="Grupo 160780" transform="translate(-1292 -312.573)">
                        <g id="Grupo_5928" data-name="Grupo 5928" transform="translate(67 155.573)">
                            <circle id="Elipse_2073" data-name="Elipse 2073" cx="17.927" cy="17.927" r="17.927" transform="translate(1225 157)" fill="#ae1717"/>
                        </g>
                        <path id="Trazado_17598" data-name="Trazado 17598" d="M14.584,2a2.054,2.054,0,0,1,1.948,1.4l.558,1.676h3.368a1.027,1.027,0,1,1,0,2.054l0,.073-.89,12.47a3.081,3.081,0,0,1-3.073,2.861h-8.5A3.081,3.081,0,0,1,4.92,19.679L4.03,7.207q0-.036,0-.072a1.027,1.027,0,1,1,0-2.054H7.4L7.953,3.4A2.054,2.054,0,0,1,9.9,2h4.681ZM9.162,10.216a1.027,1.027,0,0,0-1.02.907l-.007.12V17.4a1.027,1.027,0,0,0,2.047.12l.007-.12V11.243A1.027,1.027,0,0,0,9.162,10.216Zm6.162,0A1.027,1.027,0,0,0,14.3,11.243V17.4a1.027,1.027,0,0,0,2.054,0V11.243A1.027,1.027,0,0,0,15.324,10.216Zm-.739-6.162H9.9L9.559,5.081h5.367l-.343-1.027Z" transform="translate(1297.685 318.23)" fill="#f0dada" fill-rule="evenodd"/>
                    </g>
                </svg>
            </div>
            <span class="text-[#350C07] col-span-7 font-layout-bold text-2xl">
                ${config.titulo ?? defaultConfig.titulo}
            </span>
            <div class="text-[#350C07] col-span-7 col-start-2">
                <span class="font-layout">
                    ${config.contenido ?? defaultConfig.contenido}
                </span>
            </div>
        </div>`,
        background: '#f0dada',
        timer: config.timer ?? defaultConfig.timer,
        customClass: {
            container: config.width ?? defaultConfig.width,
            htmlContainer: 'w-full',
            popup: `!flex items-start justify-start p-2`,
            closeButton: '!text-[#B79C9B] absolute top-1 right-1',
            timerProgressBar: '!bg-[#ae1818] absolute right-0 bottom-0'
        }
    })
}
export { succesAlert, failAlert, deleteAlert }
