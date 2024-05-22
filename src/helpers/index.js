import Swal from 'sweetalert2/dist/sweetalert2'

const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    showCloseButton: true,
    didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
    },
    customClass: {
        container: '!w-max',
        popup: '!flex !items-start !justify-start !bg-[#F0DADA] p-2',
        header: '...',
        title: '...',
        closeButton: '!text-[#B89D9B] absolute top-0 right-0',
        icon: '!border-0',
        image: '!my-4',
        htmlContainer: '...',
        input: '...',
        inputLabel: '...',
        validationMessage: '...',
        actions: '...',
        confirmButton: '...',
        denyButton: '...',
        cancelButton: '...',
        loader: '...',
        footer: '....',
        timerProgressBar: '!bg-[#AE1717] absolute right-0 bottom-0'
    }
})

const validateUser = () => {
    let isAuthenticated = false

    const token = localStorage.getItem('access_token')
    if (token !== null) {
        isAuthenticated = token !== ''
    }
    return isAuthenticated
}

const getAccessToken = () => {
    const token = localStorage.getItem('access_token')
    if (token) {
        return token
    }
    return null
}

const titleCase = (string) => {
    const words = string?.trim()?.split(' ')

    const name = []

    words?.forEach((word) => {
        const lower = word.toLowerCase()
        name.push(word.charAt(0).toUpperCase() + lower.slice(1))
    })

    return name.join(' ')
}

const wordInSentence = (sentence, word) => {
    const sentenceClean = sentence
        .toLowerCase()
        .replace('ñ', '#')
        .trim()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
    const wordClean = word
        .toLowerCase()
        .replace('ñ', '#')
        .trim()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
    return sentenceClean.includes(wordClean)
}

const removeAccents = (str) => str.normalize('NFD').replace(/[\u0300-\u036f]/g, '')

const getSlug = (nombre) => removeAccents(`${nombre.toLowerCase().replaceAll(' ', '-')}`)

const debounce = (fn, delay = 300) => {
    let timeoutId

    return (...args) => {
        // cancel the previous timer
        if (timeoutId) {
            clearTimeout(timeoutId)
        }
        // setup a new timer
        timeoutId = setTimeout(() => {
            fn.apply(null, args)
        }, delay)
    }
}

export { validateUser, Toast, getAccessToken, titleCase, wordInSentence, getSlug, debounce }
