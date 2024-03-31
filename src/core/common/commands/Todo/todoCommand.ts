import { addCommand } from "./subCommands/addCommand"
import { removeCommand } from "./subCommands/removeCommand"
import { defineAsyncComponent } from "vue"
import { LOCAL_TOKEN_KEY } from "@/constant/auth"

/**
 * @description 待办事项
 * @param {{}} args
 */
export const todoCommand: Command.ICommandType = {
    main: "todo",
    name: "待办事项",
    desc: "待办事项",
    subCommands: {
        add: addCommand,
        remove: removeCommand
    },
    // @ts-ignore
    action: async ({ params }) => {
        // 判断是否登录
        const token = localStorage.getItem(LOCAL_TOKEN_KEY)
        if (token) {
            const todoBox = {
                type: "component",
                // @ts-ignore
                component: defineAsyncComponent(
                    () => import("@/core/common/commands/Todo/TodoBox.vue")
                )
            }
            if (params.length > 0) {
                return {
                    type: "command",
                    resultList: [
                        {
                            type: "text",
                            text: `参数 ${params.join(",")} 是冗余的`,
                            status: "warning"
                        },
                        todoBox
                    ]
                }
            }
            return todoBox
        } else {
            return {
                type: "command",
                resultList: [
                    {
                        type: "text",
                        text: "请先登录",
                        status: "warning"
                    }
                ]
            }
        }
    },
    collapsible: true
}
