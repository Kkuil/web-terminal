declare namespace Command {
  interface ICommandType {
    // 主命令
    main: string
    // 命令名称
    name: string
    // 命令描述
    desc?: string
    // 命令简写
    alias?: string[]
    // 参数配置
    params?: CommandParamsType[]
    // 选项配置
    options?: CommandOptionsType[]
    // 子命令
    subCommands?: Record<string, ICommandType>
    // 执行功能
    action: ({ params, options }: CommandActionParamsType) => WebTerminal.OutputType | {} | Promise<WebTerminal.OutputType | {}>
    // 结果是否允许折叠
    collapsible?: boolean
  }

  /**
   * 命令参数类型
   */
  interface CommandParamsType {
    key: string // 参数名
    desc?: string // 描述
    defaultValue?: string | boolean
    required?: boolean // 是否必填
  }

  /**
   * 命令选项类型
   */
  interface CommandOptionsType {
    key: string // 参数名，比如 --word
    alias?: string[] // 命令简写，比如 -w
    desc?: string // 描述
    type: 'string' | 'number' | 'boolean'
    defaultValue?: string | boolean | number // 默认值，标识作用
    required?: boolean // 是否必填
  }

  /**
   * action函数接收四个参数
   */
  interface CommandActionParamsType {
    params: string[]
    options: Record<string, string>
  }

  /**
   * 解析后的命令行参数，为了后续操作方便，统一转换为对象
   */
  interface CommandParsedResultType {
    originCommand: string
    main: string
    params?: string[]
    options?: Record<string, string>
    subCommands?: Record<string, CommandParamsResultType>
  }
}
