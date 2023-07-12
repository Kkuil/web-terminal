<script setup lang="ts">
import { useTodoStore } from '@/stores/todo'

const todoStore = useTodoStore()

todoStore.$subscribe(
  () => {
    localStorage.setItem('todo-list', JSON.stringify(todoStore.list))
  },
  {
    immediate: true,
    deep: true
  }
)
</script>

<template>
  <div class="todo-box bg-black text-black w-[450px]">
    <div class="todo-list w-full bg-white rounded-[10px]">
      <div
        class="todo h-[45px] flex items-center px-[15px] justify-between"
        v-for="todo in todoStore.list"
        :key="todo.name"
      >
        <div>
          <input type="checkbox" name="todo" v-model="todo.isCompleted" />
          <span class="todo-name font-semibold text-[16px] ml-[10px]">{{ todo.name }}</span>
        </div>
        <button class="text-[14px] hover:bg-[#ccc]" @click="todoStore.del(todo.name)">删除</button>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss"></style>
