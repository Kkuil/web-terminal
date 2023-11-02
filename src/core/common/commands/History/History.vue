<script setup lang="ts">
import { useTerminalStore } from "@/stores/terminal"

interface Props {
    number?: number
    order?: number
}

const props = defineProps<Props>()
defineOptions({
    name: "HistoryOperation"
})
const terminalStore = useTerminalStore()

const tempHistory = terminalStore.config.history.slice(
    0,
    props.number ?? terminalStore.config.history.length
)
</script>

<template>
    <div class="history">
        <table>
            <thead>
                <tr class="h-[30px]">
                    <td class="w-[100px] h-full" v-show="order">序号</td>
                    <td class="h-full">命令</td>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(history, index) in tempHistory" :key="index">
                    <td class="order h-full" v-show="order">{{ index + 1 }}</td>
                    <td class="command h-full">{{ history }}</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<style scoped lang="scss"></style>