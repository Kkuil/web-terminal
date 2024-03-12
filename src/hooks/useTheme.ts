import { ref } from "vue"
import { LOC_THEME_KEY } from "@/constant/local"

export enum ThemeEnum {
    LIGHT = "light",
    DARK = "dark"
}

// 0: 浅色主题 1: 深色主题
const locTheme = localStorage.getItem(LOC_THEME_KEY) ?? ThemeEnum.DARK
const theme = ref<ThemeEnum>(locTheme)
const html = document.querySelector("html")
/**
 * 切换主题
 */
const switchTheme = (thm: ThemeEnum) => {
    theme.value = thm
    html.classList.remove("light")
    html.classList.remove("dark")
    html.classList.add(thm)
    localStorage.setItem(LOC_THEME_KEY, thm)
}
switchTheme(locTheme)
export default function () {
    return {
        theme,
        switchTheme
    }
}
