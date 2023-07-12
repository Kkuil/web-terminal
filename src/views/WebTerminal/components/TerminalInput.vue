<script setup lang="ts">
import { useCommandStore } from '@/stores/command'
import { commandMap } from '@/core/commandRegister'
import _ from 'lodash'
import { computed, nextTick, ref } from 'vue'
import { useTerminalStore } from '@/stores/terminal'

interface HintCommandType {
  prefix: string
  command: Command.ICommandType | null
}

const commandStore = useCommandStore()
const terminalStore = useTerminalStore()
const historyIndex = ref<number>(terminalStore.config.history.length)

const commandInputRef = ref<HTMLInputElement>()
// 当前需要提示的命令对象
const currentHintCommand = ref<HintCommandType | null>()

nextTick(() => {
  // 聚焦
  commandInputRef.value?.focus()
})

// 键盘事件映射
const mapKeyToCommand = {
  Enter: () => {
    // 重置历史记录索引
    historyIndex.value = terminalStore.config.history.length
    // 清除提示
    currentHintCommand.value = null
    commandStore.submitCommand(commandStore.commandInput.command)
  },
  ArrowUp: (e: InputEvent) => {
    e.preventDefault()
    commandStore.commandInput.command = terminalStore.config.history[historyIndex.value]
    if (historyIndex.value > 0) {
      historyIndex.value--
    } else {
      historyIndex.value = 0
    }
  },
  ArrowDown: (e: InputEvent) => {
    e.preventDefault()
    if (historyIndex.value < terminalStore.config.history.length) {
      historyIndex.value++
    } else {
      historyIndex.value = terminalStore.config.history.length
    }
    commandStore.commandInput.command = terminalStore.config.history[historyIndex.value]
  },
  Tab: (e: InputEvent) => {
    e.preventDefault()
    if (currentHintCommand.value) {
      commandStore.commandInput.command = currentHintCommand.value?.prefix
        ? currentHintCommand.value?.prefix + ' ' + currentHintCommand.value?.command?.main
        : currentHintCommand.value?.command?.main ?? '' + ' '
      nextTick(() => {
        // 聚焦
        commandInputRef.value?.focus()
      })
    }
  }
}

// 搜索命令提示
const searchHint = _.debounce((e: InputEvent) => {
  // @ts-ignore
  const value = e.target?.value?.trim()
  if (!value) {
    currentHintCommand.value = null
    return
  }
  // 递归搜索命令
  currentHintCommand.value = searchCommand('', value, commandMap)
  console.log(currentHintCommand.value)
}, 100)

// 搜索命令
const searchCommand = (
  prefix: string,
  command: string,
  parentCommand: Record<string, Command.ICommandType> = commandMap
): HintCommandType => {
  // 去除命令首尾空格
  command = command.trim()
  // 分割命令
  const commandSlice = command.split(' ')
  // 主命令
  const main = commandSlice[0]
  // 判断主命令是否存在
  const commands = Object.keys(parentCommand).filter((key) => key.startsWith(main))
  if (commands.length === 0) {
    return {
      prefix: '',
      command: null
    }
  } else {
    if (commandSlice.length > 1 && parentCommand[main].subCommands) {
      // 递归解析子命令
      return searchCommand(
        parentCommand[commands[0]].main,
        commandSlice.slice(1).join(' '),
        parentCommand[main].subCommands
      )
    } else {
      return {
        prefix,
        command: parentCommand[commands[0]]
      }
    }
  }
}

// 计算当前命令提示
const hint = computed(() => {
  const command = currentHintCommand.value?.command
  if (command) {
    // 拼参数接命令提示
    const params = command?.params
      ?.map((param: Command.CommandParamsType) => `<${param?.desc}>`)
      .join(' ')
    // 拼接选项接命令提示
    const options = command?.options
      ?.map((option: Command.CommandOptionsType) => {
        // 拼接简写
        const alias = option?.alias?.map((alia: string) => `-${alia}`).join(' ')
        return `[--${option?.key}(${alias ?? ''}) ${option.desc}]`
      })
      .join(' ')
    return `${currentHintCommand.value?.prefix} ${command?.main}${params ? ` ${params}` : ''}${
      options ? ` ${options}` : ''
    }${command?.desc ? ` ${command?.desc}` : ''}`
  }
  return ''
})

// 提交命令
const onKeyUp = (keyboardEvent: KeyboardEvent) => {
  // @ts-ignore
  mapKeyToCommand[keyboardEvent.key]?.(keyboardEvent)
}
</script>

<template>
  <div class="terminal-input flex">
    <span class="mr-[10px]">[local]$ </span>
    <input
      ref="commandInputRef"
      class="bg-transparent flex-1 outline-none"
      v-model="commandStore.commandInput.command"
      @keydown.stop="onKeyUp"
      @input="(searchHint as Function)"
      placeholder="请输入命令"
    />
  </div>
  <h4 v-show="hint" class="hint text-[#777]">Hint: {{ hint }}</h4>
</template>

<style scoped lang="scss"></style>
