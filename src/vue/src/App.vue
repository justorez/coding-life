<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
    <header>
        <img
            alt="Vue logo"
            class="logo"
            src="@/assets/logo.svg"
            width="125"
            height="125"
        />

        <div class="wrapper">
            <nav>
                <RouterLink to="/intro">引导页</RouterLink>
                <RouterLink to="/maxlength">输入框限制长度</RouterLink>
                <RouterLink to="/moreline">文本展开收起</RouterLink>
                <RouterLink to="/zoom">缩放拖动</RouterLink>
                <RouterLink to="/lazyload">图片懒加载</RouterLink>
                <RouterLink to="/virtualList/fixed">虚拟列表-固定高度</RouterLink>
                <RouterLink to="/virtualList/dynamic">虚拟列表-动态高度</RouterLink>
            </nav>
        </div>
    </header>

    <!-- 可设置 key=$route.fullPath 阻止动态路由的组件复用 -->
    <RouterView />
</template>

<style scoped>
header {
    max-height: 100vh;
    margin-bottom: 2rem;
    line-height: 1.5;
}

.logo {
    display: block;
    margin: 0 auto 2rem;
}

nav {
    width: 100%;
    margin-top: 2rem;
    text-align: center;
    font-size: 1.1rem;
    font-weight: 700;
}

nav a.router-link-exact-active {
    color: var(--color-text);
}

nav a.router-link-exact-active:hover {
    background-color: transparent;
}

nav a {
    display: inline-block;
    padding: 2px 1rem;
    border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
    border: 0;
}

@media (min-width: 1024px) {
    header {
        display: flex;
        place-items: center;
        margin-bottom: 0;
        padding-right: calc(var(--section-gap) / 2);
    }

    .logo {
        margin: 0;
        margin-right: 10px;
    }

    header .wrapper {
        display: flex;
        place-items: center;
        flex-wrap: wrap;
    }

    nav {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        margin: auto;
        padding: 1rem 0;
        text-align: left;
    }
    nav a {
        border: 0;
    }
    nav a.router-link-exact-active {
        padding-left: 0;
    }
}
</style>
