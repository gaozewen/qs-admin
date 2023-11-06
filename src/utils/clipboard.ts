// 复制文本兼容新老版本浏览器
export const copyToClipboard = (text: string, onSuccess: () => void) => {
  if (document.execCommand) {
    const inputElem = document.createElement('input')
    inputElem.value = text
    document.body.appendChild(inputElem)
    inputElem.select()
    document.execCommand('copy')
    inputElem.remove()
    if (onSuccess) onSuccess()
    return
  }

  if (navigator && navigator.clipboard) {
    navigator.clipboard.writeText(text).then(() => {
      if (onSuccess) onSuccess()
    })
  }
}
