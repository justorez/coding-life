import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        { path: '/', redirect: '/maxlength' },
        ...generateRoutes(['intro'], 'components'),
        ...generateRoutes(['maxlength', 'moreline', 'zoom', 'lazyload']),
    ]
})

console.log(router)

function generateRoutes(keys, prefix = 'directives') {
    if (!Array.isArray(keys)) {
        throw new TypeError('keys is not array')
    }
    return keys.map((k) => {
        return {
            path: `/${k}`,
            name: k,
            // route level code-splitting
            // this generates a separate chunk (About.[hash].js) for this route
            // which is lazy-loaded when the route is visited.
            component: () => import(`../${prefix}/${k}/demo.vue`)
        }
    })
}

export default router
