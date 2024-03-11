<route lang="json">
    {
        "meta": {
            "title": "元素外部点击"
        }
    }
</route>

<template>
    <div class="modal" v-click-outside="closeModal">
        I'm a modal.
    </div>
</template>

<script setup>
import vClickOutside from './clickOutside'
const closeModal = () => alert('Modal will be closed.')
</script>

<style scoped>
.modal {
    width: 400px;
    height: 200px;
    padding: 10px;
    font-size: 20px;
    font-weight: 700;
    border-radius: 10px;
    background-color: #efefef;
}
</style>
