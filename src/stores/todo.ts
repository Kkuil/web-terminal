import { defineStore } from "pinia"

interface TodoType {
    name: string
    isCompleted: boolean
}

/**
 * 历史记录
 */
export const useTodoStore = defineStore("todo", {
    state: () => ({
        list: JSON.parse((localStorage.getItem("todo-list") as string) || "[]") as TodoType[]
    }),
    actions: {
        // 增加todo
        add(name: string) {
            this.list.push({
                name,
                isCompleted: false
            })
        },
        // 删除todo
        del(name: string) {
            const index = this.list.findIndex((todo) => todo.name === name)
            this.list.splice(index, 1)
        },
        // 清空todo
        clearHistory() {
            this.list = []
        }
    }
})
