import { translate } from "@/core/common/commands/Translate/translate"

/**
 * @description 登录命令
 * @param {{}} args
 */
export const translateCommand: Command.ICommandType = {
    main: "translate",
    name: "翻译",
    desc: "翻译文本",
    alias: ["tlt"],
    options: [
        {
            key: "from",
            alias: ["f"],
            desc: "源语言 zh 中文 en 英文（默认中文）",
            type: "string"
        },
        {
            key: "to",
            alias: ["t"],
            desc: "目标语言 zh 中文 en 英文（默认英文）",
            type: "string"
        }
    ],
    // @ts-ignore
    action: async ({ params, options }) => {
        const q = params.join(" ")
        const from = options.from ?? options.f ?? "zh-CHS"
        const to = options.to ?? options.t ?? "en"
        const result = await translate({
            q,
            from,
            to
        })
        if (result.translation)
            return {
                type: "command",
                resultList: [
                    {
                        type: "text",
                        text: `翻译结果：${result.translation}`,
                        status: "success"
                    }
                ]
            }
    }
}
