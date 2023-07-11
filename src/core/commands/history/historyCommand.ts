import { defineAsyncComponent } from 'vue'
import { useHistoryStore } from '@/stores/history'

/**
 * @description 历史记录
 * @param {{}} args
 */
export const historyCommand: Command.ICommandType = {
  main: 'history',
  name: '查看历史记录',
  desc: '查看历史记录',
  alias: ['h'],
  options: [
    {
      key: 'number',
      alias: ['n'],
      desc: '显示最近的n条记录',
      type: 'number',
      defaultValue: 10,
      required: false
    },
    {
      key: 'order',
      alias: ['o'],
      desc: '是否显示序号',
      type: 'boolean',
      defaultValue: true,
      required: false
    },
    {
      key: 'clean',
      alias: ['l'],
      desc: '清空历史',
      type: 'string',
      required: false
    }
  ],
  action: async ({ options }) => {
    console.log(Object.keys(options).includes('clean') || Object.keys(options).includes('l'))
    const historyStore = useHistoryStore()
    if (Object.keys(options).includes('clean') || Object.keys(options).includes('l')) {
      if (historyStore.list.length > 1) {
        historyStore.clearHistory()
        return {
          type: 'text',
          text: '清空成功',
          status: 'success'
        }
      } else {
        return {
          type: 'text',
          text: '历史记录为空',
          status: 'info'
        }
      }
    }
    return {
      type: 'component',
      component: defineAsyncComponent(() => import('./History.vue')),
      props: {
        number: options?.number ?? options?.n,
        order: options?.order ?? options?.o
      }
    }
  },
  collapsible: true
}
