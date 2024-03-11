<script setup lang="ts">
import { ref } from "vue"

const dialogVisible = ref(false)
</script>

<template>
    <div class="welcome leading-[25px] mb-[15px]">
        欢迎来到 Web-terminal！<br />
        这是一款为程序员打造的最酷的浏览器主页！<br />
        Web-terminal 的开源代码托管在
        <a href="https://github.com/Kkuil/web-terminal" class="text-[#0094ff]" target="_blank">
            GitHub
        </a>
        上，让你可以自由地开发和定制自己的主页。 <br />
        作者
        <a href="https://github.com/Kkuil" class="text-[#0094ff]" target="_blank">Kkuil</a>
    </div>
    <div class="fixed bottom-[10px] right-[10px]">
        <span>man 命令可以查看你想输入的命令</span>
    </div>
    <div
        class="fixed top-[10px] right-[10px] flex-center cursor-pointer w-[35px] h-[35px] rounded-[5px] border-[1px] border-[#fff] transition-all hover:border-[#ccc] hover:text-[#ccc]"
        title="设置"
        @click="dialogVisible = true"
    >
        <i class="iconfont icon-setting"></i>
    </div>
    <el-dialog v-model="dialogVisible" title="全局设置" width="500">
        <template #default>
            <div class="font flex justify-between">
                <span>字体大小</span>
                <div>123</div>
            </div>
            <div class="theme flex justify-between mt-[10px]">
                <span>主题色</span>
                <div>123</div>
            </div>
        </template>
    </el-dialog>
</template>

<style scoped lang="scss"></style>