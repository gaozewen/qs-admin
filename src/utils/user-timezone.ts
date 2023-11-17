/**
 * @description 获取用户客户端时区
 * @author 高泽文
 */

// Asia/Shanghai
let TIME_ZONE_CACHE = ''
export const getUserClientTimezone = () => {
  if (TIME_ZONE_CACHE) return TIME_ZONE_CACHE

  // 步骤 1: 使用DateTimeFormat方法创建一个格式化对象
  const formatter = new Intl.DateTimeFormat()

  // 步骤 2: 通过格式化对象调用resolvedOptions方法
  const options = formatter.resolvedOptions()

  // 步骤 3: 从返回的结果中获取时区信息
  const timezone = options.timeZone
  TIME_ZONE_CACHE = timezone

  return TIME_ZONE_CACHE
}
