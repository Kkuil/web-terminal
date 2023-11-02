<script setup lang="ts">
import { useCommandStore } from "@/stores/command"
import { ref } from "vue"
import { useTerminalStore } from "@/stores/terminal"

const commandStore = useCommandStore()
const terminalStore = useTerminalStore()
const historyIndex = ref<number>(terminalStore.config.SSHHistory.length)

const commandInputRef = ref<HTMLInputElement>()

// 键盘事件映射
const mapKeyToCommand = {
    Enter: () => {
        // 重置历史记录索引
        historyIndex.value = terminalStore.config.SSHHistory.length
        // 添加到历史记录
        terminalStore.addSSHHistory(commandStore.commandInfo.commandInput.command)
        commandStore.submitSSHCommand(commandStore.commandInfo.commandInput.command)
    },
    ArrowUp: (e: InputEvent) => {
        e.preventDefault()
        commandStore.commandInfo.commandInput.command =
            terminalStore.config.SSHHistory[historyIndex.value]
        if (historyIndex.value > 0) {
            historyIndex.value--
        } else {
            historyIndex.value = 0
        }
    },
    ArrowDown: (e: InputEvent) => {
        e.preventDefault()
        if (historyIndex.value < terminalStore.config.SSHHistory.length) {
            historyIndex.value++
        } else {
            historyIndex.value = terminalStore.config.SSHHistory.length
        }
        commandStore.commandInfo.commandInput.command =
            terminalStore.config.SSHHistory[historyIndex.value]
    }
}

// 提交命令
const onKeyUp = (keyboardEvent: KeyboardEvent) => {
    // @ts-ignore
    mapKeyToCommand[keyboardEvent.key]?.(keyboardEvent)
}
</script>

<template>
    <div class="terminal-input flex">
        <span class="mr-[10px]">[ssh]$ </span>
        <input
            ref="commandInputRef"
            class="bg-transparent flex-1 outline-none"
            v-model="commandStore.commandInfo.commandInput.command"
            @keydown.stop="onKeyUp"
            placeholder="请输入ssh命令"
        />
    </div>
</template>

<style scoped lang="scss"></style>