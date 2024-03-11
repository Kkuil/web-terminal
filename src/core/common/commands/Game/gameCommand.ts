import { defineAsyncComponent } from "vue"
import { GAME_MAP } from "@/core/common/commands/Game/gameConst"

/**
 * @description 登录命令
 * @param {{}} args
 */
export const gameCommand: Command.ICommandType = {
    main: "game",
    name: "摸鱼",
    desc: `摸鱼 参数为: ${Object.keys(GAME_MAP)}`,
    alias: ["moyu"],
    options: [
        {
            key: "full",
            alias: ["f"],
            desc: "是否全屏显示",
            type: "string"
        }
    ],
    // @ts-ignore
    action: async ({ params, options }) => {
        const isFull = options.full ?? options.f ?? false
        if (!params[0]) {
            return {
                type: "command",
                resultList: [
                    {
                        type: "text",
                        text: `请输入游戏`,
                        status: "warning"
                    }
                ]
            }
        }
        if (!GAME_MAP[params[0] as string]) {
            return {
                type: "command",
                resultList: [
                    {
                        type: "text",
                        text: `游戏${params[0]}不存在`,
                        status: "warning"
                    }
                ]
            }
        }
        return {
            type: "command",
            resultList: [
                {
                    type: "component",
                    component: defineAsyncComponent(() => import("./GameComp.vue")),
                    props: {
                        isFull,
                        name: params[0]
                    }
                }
            ]
        }
    }
}
