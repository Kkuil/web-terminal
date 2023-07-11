import { defineAsyncComponent } from 'vue'

/**
 * @description 查看时间命令
 * @param {{}} args
 */
export const seeTimeCommand: Command.ICommandType = {
  main: 'time',
  name: '查看时间',
  desc: '查看当前时间',
  alias: ['t'],
  action: (): WebTerminal.OutputType => {
    return {
      type: 'component',
      component: defineAsyncComponent(() => import('./SeeTime.vue'))
    }
  },
  collapsible: true
}
