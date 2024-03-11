<script setup lang="ts">
import WelcomeComp from "./components/WelcomeComp.vue"
import TerminalInput from "@/views/WebTerminal/components/common/TerminalInput.vue"
import TerminalOutputResultList from "@/views/WebTerminal/components/common/TerminalOutputResultList.vue"
import { useCommandStore } from "@/stores/command"
import { useTerminalStore } from "@/stores/terminal"
import { CommandTypeEnum } from "@/core/enums/CommandTypeEnum"
import SSHInput from "@/views/WebTerminal/components/ssh/SSHInput.vue"
import SSHOutputResultList from "@/views/WebTerminal/components/ssh/SSHOutputResultList.vue"

const commandStore = useCommandStore()
const terminalStore = useTerminalStore()
</script>

<template>
    <div class="web-terminal w-screen min-h-screen overflow-x-hidden bg-[--bg-100] p-[15px]">
        <WelcomeComp v-if="terminalStore.config.isShowWelcome" />
        <TerminalOutputResultList
            v-if="commandStore.commandInfo.mode === CommandTypeEnum.COMMON"
            :list="commandStore.commandInfo.listOutput"
        />
        <SSHOutputResultList
            v-else-if="commandStore.commandInfo.mode === CommandTypeEnum.SSH"
            :list="commandStore.commandInfo.sshOutput"
        />
        <TerminalInput v-if="commandStore.commandInfo.mode === CommandTypeEnum.COMMON" />
        <SSHInput v-else-if="commandStore.commandInfo.mode === CommandTypeEnum.SSH" />
    </div>
</template>

<style scoped lang="scss">
.web-terminal {
    &::-webkit-scrollbar {
        width: 0;
        height: 0;
    }
}
</style>