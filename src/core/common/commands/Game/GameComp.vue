<script setup lang="ts">
import { onMounted, ref } from "vue"
import { GAME_MAP } from "@/core/common/commands/Game/gameConst"

const props = defineProps<{
    name: string
    isFull: boolean
}>()

const iframe = ref<HTMLIFrameElement>()

const fullscreen = () => {
    if (iframe.value?.requestFullscreen) {
        if (!document.fullscreenElement) {
            if ("requestFullscreen" in iframe.value) {
                iframe.value.requestFullscreen()
            }
        } else {
            document.exitFullscreen()
        }
    }
}

onMounted(() => {
    if (props.isFull) {
        fullscreen()
    }
})
console.log(props)
</script>

<template>
    <iframe :src="GAME_MAP[name]" ref="iframe"></iframe>
</template>

<style scoped lang="scss"></style>