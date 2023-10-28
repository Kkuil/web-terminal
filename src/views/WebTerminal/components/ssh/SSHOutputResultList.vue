<script setup lang="ts">
defineProps<{
    list: WebTerminal.SSHCommandOutputType[]
}>()
</script>

<template>
    <div v-for="result in list" :key="result.id">
        [ssh]$ <span>{{ result.command }}</span>
        <div v-for="item in result.output" :key="item" v-html="item"></div>
    </div>
</template>

<style scoped lang="scss"></style>
