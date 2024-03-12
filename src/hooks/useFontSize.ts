import { ref } from "vue"
import { LOC_FONT_SIZE_KEY } from "@/constant/local"

export enum FontSizeEnum {
    SMALL = "s",
    MIDDLE = "m",
    DEFAULT = "m",
    LARGE = "l"
}

const locFontSize = localStorage.getItem(LOC_FONT_SIZE_KEY) ?? FontSizeEnum.DEFAULT
const fontSize = ref<FontSizeEnum>(locFontSize)
const html = document.querySelector("html")
/**
 * 切换字体大小
 */
const switchFontSize = (font: FontSizeEnum) => {
    fontSize.value = font
    html.classList.remove("s")
    html.classList.remove("m")
    html.classList.remove("l")
    html.classList.add(font)
    localStorage.setItem(LOC_FONT_SIZE_KEY, font)
}
switchFontSize(locFontSize)
export default function () {
    return {
        fontSize,
        switchFontSize
    }
}
