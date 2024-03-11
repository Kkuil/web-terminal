<script setup lang="ts">
import { ref } from "vue"
import ThemeComp from "@/views/WebTerminal/components/ThemeComp.vue"

const dialogVisible = ref(false)
</script>

<template>
    <div class="welcome leading-[25px] mb-[15px] text-[--text-100] font-serif font-bold">
        欢迎来到 Web-terminal！<br />
        这是一款为程序员打造的最酷的浏览器主页！<br />
    </div>
    <div class="fixed bottom-[10px] right-[10px]">
        <span class="text-[--text-100]">man 命令可以查看你想输入的命令</span>
    </div>
    <div
        class="fixed top-[10px] right-[10px] flex-center cursor-pointer w-[35px] h-[35px] rounded-[5px] border-[1px] border-[--text-100] transition-all hover:border-[#ccc] hover:text-[#ccc]"
        title="设置"
        @click="dialogVisible = true"
    >
        <i class="iconfont icon-setting text-[--text-100]"></i>
    </div>
    <el-dialog v-model="dialogVisible" title="全局设置" width="500">
        <template #default>
            <div class="font flex justify-between text-[17px]">
                <span>字体大小</span>
                <div>123</div>
            </div>
            <div class="theme flex justify-between mt-[10px] text-[17px]">
                <span>主题色</span>
                <ThemeComp />
            </div>
        </template>
    </el-dialog>
</template>

<style lang="scss">
.el-dialog {
    background-color: var(--bg-100) !important;

    * {
        color: var(--text-100) !important;
    }
}
</style>