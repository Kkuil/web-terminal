import { getRandomBg } from './getRandomBg'

const types = ['wallpaper', 'acg']

/**
 * @description 切换背景
 * @param {{}} args
 */
export const changeBgCommand: Command.ICommandType = {
  main: 'bg',
  name: '切换背景',
  desc: '切换背景(["wallpaper", "acg"])',
  alias: ['background'],
  params: [
    {
      key: 'type',
      desc: '背景图类型',
      defaultValue: 'wallpaper',
      required: false
    }
  ],
  // @ts-ignore
  action: async ({ params = ['wallpaper'] }) => {
    if (params[0] && !types.includes(params[0])) {
      return {
        type: 'text',
        text: '参数错误',
        status: 'error',
        collapsible: false
      }
    }
    try {
      const { data } = await getRandomBg(params[0] ?? 'wallpaper')
      if (data) {
        window.document.body.style.background = `url(${data})`
        return {
          type: 'text',
          text: '获取成功',
          status: 'success'
        }
      } else {
        return {
          type: 'text',
          text: '获取失败',
          status: 'error'
        }
      }
    } catch (e) {
      return {
        type: 'text',
        text: '获取失败',
        status: 'error'
      }
    }
  },
  collapsible: true
}
