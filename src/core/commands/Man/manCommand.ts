import { defineAsyncComponent } from 'vue'
import { commandMap, commandList } from '@/core/commandRegister'

/**
 * @description 查看帮助文档
 * @param {{}} args
 */
export const manCommand: Command.ICommandType = {
  main: 'man',
  name: '帮助文档',
  desc: '查看帮助文档',
  params: [
    {
      key: 'command',
      desc: '命令名称(可以传递多个，例如：Man goto history)',
      defaultValue: "all",
      required: false
    }
  ],
  // @ts-ignore
  action: ({ params }): WebTerminal.OutputType => {
    const showCommands: Command.ICommandType[] = []
    for (let i = 0; i < params.length; i++) {
      if (!commandMap[params[i]]) {
        return {
          type: 'text',
          text: `命令 ${params[i]} 不存在`,
          status: 'error'
        }
      } else {
        showCommands.push(commandMap[params[i]])
      }
    }
    return {
      type: 'component',
      component: defineAsyncComponent(() => import('@/core/commands/Man/Man.vue')),
      props: {
        commands: showCommands.length ? showCommands : commandList
      }
    }
  },
  collapsible: true
}
