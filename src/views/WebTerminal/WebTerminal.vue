<script setup lang="ts">
import Welcome from './components/Welcome.vue'
import TerminalInput from './components/TerminalInput.vue'
import TerminalOutputResultList from '@/views/WebTerminal/components/TerminalOutputResultList.vue'
import { useCommandStore } from '@/stores/command'

const commandStore = useCommandStore()
</script>

<template>
  <div class="w-screen h-screen bg-black text-white p-[15px]">
    <Welcome />
    <br />
    <TerminalOutputResultList :list="commandStore.listOutput" />
    <TerminalInput />
  </div>
</template>

<style scoped lang="scss"></style>
