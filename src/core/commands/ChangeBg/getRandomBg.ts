import request from '@/utils/request'

/**
 * @description 获取随机背景图
 * @param type
 */
export const getRandomBg = (type: string) => {
  return request({
    url: '/random/bg',
    method: 'GET',
    params: {
      type
    }
  })
}
