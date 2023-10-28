/**
 * @description 跳转页面
 * @param {{}} args
 */
export const gotoCommand: Command.ICommandType = {
  main: 'goto',
  name: '跳转页面',
  desc: '跳转页面',
  params: [
    {
      key: 'link',
      desc: '需要跳转的链接地址',
      required: true
    }
  ],
  options: [
    {
      key: 'position',
      alias: ['p'],
      desc: '打开位置(默认当前页打开)',
      type: 'string',
      defaultValue: '',
      required: false
    }
  ],
  // @ts-ignore
  action: async ({ params, options }) => {
    if (!params[0]) {
      return {
        type: 'text',
        text: 'link 参数缺失, 例如：Goto www.baidu.com',
        status: 'error'
      }
    }
    const keys = Object.keys(options)
    const isBlank = keys.includes('position') || keys.includes('p')
    if (!params[0].startsWith('http://') && !params[0].startsWith('https://')) {
      params[0] = 'http://' + params[0]
    }
    if (isBlank) {
      window.open(params[0])
    } else {
      window.location.href = params[0]
    }
    return {
      type: 'text',
      text: '跳转成功',
      status: 'success'
    }
  },
  collapsible: true
}
