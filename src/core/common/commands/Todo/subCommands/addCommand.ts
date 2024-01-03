import { useTodoStore } from "@/stores/todo"
import { defineAsyncComponent } from "vue"

/**
 * @description 增加文件
 * @param {{}} args
 */
export const addCommand: Command.ICommandType = {
    main: "add",
    name: "增加待办事项",
    desc: "增加待办事项",
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
        // 不等于-1说明有重复
        if (duplicateIndex !== -1) {
            return {
                type: "text",
                text: `事项 ${params[0]} 已存在，请不要重复添加`,
                status: "warning"
            }
        }
        // 添加事项
        todoStore.add(params[0])
        return {
            type: "command",
            resultList: [
                {
                    type: "text",
                    text: `事项 ${params[0]} 添加成功`,
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
