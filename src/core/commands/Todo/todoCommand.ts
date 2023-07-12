import { addCommand } from './subCommands/addCommand'
import { defineAsyncComponent } from 'vue'

/**
 * @description 待办事项
 * @param {{}} args
 */
export const todoCommand: Command.ICommandType = {
  main: 'todo',
  name: '待办事项',
  desc: '待办事项',
  subCommands: {
    add: addCommand
  },
  // @ts-ignore
  action: async ({ params }) => {
    const todoBox = {
      type: 'component',
      component: defineAsyncComponent(() => import('@/core/commands/Todo/TodoBox.vue'))
    }
    if (params.length > 0) {
      return {
        type: 'command',
        resultList: [
          {
            type: 'text',
            text: `参数 ${params.join(',')} 是冗余的`,
            status: 'warning'
          },
          todoBox
        ]
      }
    }
    return todoBox
  },
  collapsible: true
}
