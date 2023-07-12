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
  action: async () => {
    return {
      type: 'component',
      component: defineAsyncComponent(() => import("@/core/commands/Todo/TodoBox.vue"))
    }
  },
  collapsible: true
}
