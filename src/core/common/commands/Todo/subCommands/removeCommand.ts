import { useTodoStore } from "@/stores/todo"
import { defineAsyncComponent } from "vue"

/**
 * @description 删除待办事项
 * @param {{}} args
 */
export const removeCommand: Command.ICommandType = {
    main: "remove",
    name: "删除待办事项",
    desc: "删除待办事项",
    params: [
        {
            key: "name",
            desc: "事项名称",
            required: true
        }
    ],
    // @ts-ignore
    action: async ({ params }: { params: string }) => {
        if (!params || params.length === 0) {
            return {
                type: "text",
                text: `请输入待办事项名称`,
                status: "error"
            }
        }
        const todoStore = useTodoStore()
        const duplicateIndex = todoStore.list.findIndex((todo) => todo.name === params[0])
        // 等于-1说明不存在
        if (duplicateIndex === -1) {
            return {
                type: "text",
                text: `事项 ${params[0]} 不存在，请重新输入`,
                status: "warning"
            }
        }
        // 删除事项
        todoStore.del(params[0])
        return {
            type: "command",
            resultList: [
                {
                    type: "text",
                    text: `事项 ${params[0]} 删除成功`,
                    status: "success"
                },
                {
                    type: "component",
                    component: defineAsyncComponent(
                        () => import("@/core/common/commands/Todo/TodoBox.vue")
                    )
                }
            ]
        }
    },
    collapsible: true
}
