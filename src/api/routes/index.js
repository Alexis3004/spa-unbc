import auth from '@/api/routes/auth/index.js'
import user from '@/api/routes/user/index.js'

const routes = {
    ...auth,
    ...user
}

const route = (name) => {
    if (!Object.keys(routes).includes(name)) {
        return console.error('No existe la ruta', name)
    }
    return `/${routes[name]}`
}

export default route
