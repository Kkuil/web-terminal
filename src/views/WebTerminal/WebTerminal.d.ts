declare namespace WebTerminal {
  /**
   * 输出状态
   */
  type OutputStatusType = 'info' | 'success' | 'warning' | 'error' | 'system'

  /**
   * 输出类型
   */
  interface OutputType {
    type: 'command' | 'text' | 'component'
    text?: string
    component?: any
    resultList?: OutputType[]
    status?: OutputStatusType
    props?: any
    collapsible?: boolean
  }

  // 命令输入类型
  interface CommandInputType {
    command: string
    hint?: string
  }

  // 命令输出类型
  interface CommandOutputType {
    id: string
    command: string
    output: OutputType
  }
}
