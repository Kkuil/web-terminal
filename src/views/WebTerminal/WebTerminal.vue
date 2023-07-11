<script setup lang="ts">
import Welcome from './components/Welcome.vue'
import TerminalInput from './components/TerminalInput.vue'
import TerminalOutputResultList from '@/views/WebTerminal/components/TerminalOutputResultList.vue'
import { useCommandStore } from '@/stores/command'
import { useTerminalStore } from '@/stores/terminal'

const commandStore = useCommandStore()
const terminalStore = useTerminalStore()
</script>

<template>
  <div class="web-terminal w-screen min-h-screen bg-black text-white p-[15px] opacity-80">
    <Welcome v-if="terminalStore.config.isShowWelcome" />
    <TerminalOutputResultList :list="commandStore.listOutput" />
    <TerminalInput />
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
