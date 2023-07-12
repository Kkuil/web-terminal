<script setup lang="ts">

defineProps<{
  commands: Command.ICommandType[]
}>()
defineOptions({
  name: "ManOperation"
})
</script>

<template>
  <div class="man">
    <h1>命令大全：</h1>
    <table>
      <tr v-for="command in commands" :key="command.main">
        <td class='min-w-[150px] h-[35px] leading-[35px]'>{{ command.main }}</td>
        <td class='min-w-[150px] h-[35px] leading-[35px]'>{{ command.name }}</td>
        <td class='min-w-[150px] h-[35px] leading-[35px]'>{{ command.desc }}</td>
      </tr>
    </table>
  </div>
</template>
