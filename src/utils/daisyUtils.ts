const color = (name: string, desc?: string) => {
  const cssVariable = getCssVariable(name, desc)
  const themeElement = document.documentElement

  if (cssVariable && themeElement) {
    const hsl = getComputedStyle(themeElement).getPropertyValue(cssVariable)
    return 'hsl(' + hsl + ')'
  }

  return '#aaa'
}

const getCssVariable = (name: string, desc?: string) => {
  switch (name) {
    case 'primary':
    case 'secondary':
    case 'accent':
    case 'base':
    case 'neutral':
      return '--' + name.charAt(0) + (desc ? desc?.charAt(0) : '')
    case 'error':
    case 'info':
    case 'success':
    case 'warning':
      return '--' + name.substring(0, 2) + (desc ? desc?.charAt(0) : '')
    default:
      return ''
  }
}

export { color }
