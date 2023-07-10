<script setup lang="ts">
import { useCommandStore } from '@/stores/command'

const commandStore = useCommandStore()
</script>

<template>
  <div class="terminal-input">
    <span>[local]$ </span>
    <input
      class="bg-transparent outline-0"
      v-model="commandStore.commandInput.command"
      @keyup.enter="commandStore.execCommand(commandStore.commandInput.command)"
      placeholder='请输入命令'
    />
  </div>
</template>

<style scoped lang="scss"></style>
