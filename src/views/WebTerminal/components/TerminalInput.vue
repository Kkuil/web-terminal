<script setup lang="ts">
import { useCommandStore } from '@/stores/command'
import { commandList } from '@/core/commandRegister'
import _ from 'lodash'
import { computed, nextTick, ref } from 'vue'
import { useHistoryStore } from '@/stores/history'

const commandStore = useCommandStore()
const historyStore = useHistoryStore()
const historyIndex = ref<number>(historyStore.list.length)

const commandInputRef = ref<HTMLInputElement>()

nextTick(() => {
  // 聚焦
  commandInputRef.value?.focus()
})

// 键盘事件映射
const mapKeyToCommand = {
  Enter: () => {
    // 清除提示
    currentHintCommand.value = null
    commandStore.submitCommand(commandStore.commandInput.command)
  },
  ArrowUp: () => {
    if (historyIndex.value > 0) {
      historyIndex.value--
    } else {
      historyIndex.value = 0
    }
    commandStore.commandInput.command = historyStore.list[historyIndex.value]
  },
  ArrowDown: () => {
    if (historyIndex.value <= historyStore.list.length) {
      historyIndex.value++
    } else {
      historyIndex.value = historyStore.list.length
    }
    commandStore.commandInput.command = historyStore.list[historyIndex.value]
  },
  Tab: () => {
    if (hint.value) {
      commandStore.commandInput.command = hint.value
      nextTick(() => {
        // 聚焦
        commandInputRef.value?.focus()
      })
    }
  }
}

// 当前需要提示的命令对象
const currentHintCommand = ref<Command.ICommandType | null>()

// 搜索命令提示
const searchHint = _.debounce((e: InputEvent) => {
  const value = e.target?.value?.trim()
  if (!value) {
    currentHintCommand.value = null
    return
  }
  for (let command of commandList) {
    if (
      command.main.startsWith(value) ||
      command.alias?.filter((alia: string) => alia.startsWith(value)).length
    ) {
      currentHintCommand.value = command
      break
    }
  }
}, 300)

// 计算当前命令提示
const hint = computed(() => {
  const command = currentHintCommand.value
  if (command) {
    // 拼参数接命令提示
    const params = command?.params
      ?.map((param: Command.CommandParamsType) => {
        return `<${param?.desc}>`
      })
      .join(' ')
    // 拼接选项接命令提示
    const options = command?.options
      ?.map((option: Command.CommandOptionsType) => {
        // 拼接简写
        const alias = option?.alias
          ?.map((alia: string) => {
            return `-${alia}`
          })
          .join(' ')
        return `[--${option?.key}(${alias ?? ''}) ${option.desc}]`
      })
      .join(' ')
    return `${command?.main}${params ? ` ${params}` : ''}${options ? ` ${options}` : ''}${
      command?.desc ? ` ${command?.desc}` : ''
    }`
  }
  return ''
})

// 提交命令
const onKeyUp = (keyboardEvent: KeyboardEvent) => {
  console.log(keyboardEvent.key)
  mapKeyToCommand[keyboardEvent.key]?.()
}
</script>

<template>
  <div class="terminal-input flex">
    <span class="mr-[10px]">[local]$ </span>
    <input
      ref="commandInputRef"
      class="bg-transparent outline-0 flex-1"
      v-model="commandStore.commandInput.command"
      @keydown.stop="onKeyUp"
      @input="searchHint"
      placeholder="请输入命令"
    />
  </div>
  <h4 v-show="hint" class="hint text-[#777]">Hint: {{ hint }}</h4>
</template>

<style scoped lang="scss"></style>
