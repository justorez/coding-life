<template>
    <div class="box">
            <input
                type="text"
                v-model="inputVal"
                v-maxlength="maxlen"
                :placeholder="`最大字符数 ${maxlen}，中文字符算 2 个`"
            />
        </div>
</template>

<script>
import maxlength from './maxlength'

export default {
    directives: {
        maxlength
    },
    data() {
        return {
            inputVal: '',
            maxlen: 5,
        }
    }
}
</script>

<style scoped>
input {
    min-width: 300px;
}
</style>
