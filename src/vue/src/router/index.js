import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        { path: '/', redirect: '/maxlength' },
        ...generateRoutes(['intro', 'virtualList/:type'], 'components'),
        ...generateRoutes(['maxlength', 'moreline', 'zoom', 'lazyload'])
    ]
})

function generateRoutes(keys, prefix = 'directives') {
    if (!Array.isArray(keys)) {
        throw new TypeError('keys is not array')
    }
    return keys.map((k) => {
        const name = k.split('/')[0]
        return {
            path: `/${k}`,
            name: name,
            // route level code-splitting
            // this generates a separate chunk (About.[hash].js) for this route
            // which is lazy-loaded when the route is visited.
            component: () => import(`../${prefix}/${name}/demo.vue`),
            props: true
        }
    })
}

export default router
