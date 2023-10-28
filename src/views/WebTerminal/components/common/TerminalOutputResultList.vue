<script setup lang="ts">
import ContentOutput from "@/views/WebTerminal/components/common/ContentOutput.vue"

defineProps<{
    list: WebTerminal.CommandOutputType[]
}>()
</script>

<template>
    <div v-for="result in list" :key="result.id">
        [local]$ <span>{{ result.command }}</span>
        <ContentOutput
            v-if="!result.output?.resultList?.length"
            :output="result.output as WebTerminal.OutputType"
        />
        <ContentOutput
            v-else
            v-for="(output, index) in result.output?.resultList"
            :key="index"
            :output="output"
        />
    </div>
</template>

<style scoped lang="scss"></style>