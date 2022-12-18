import { TypeTheme } from '@cityscoot/components/src'

export const switchTheme = (theme: TypeTheme) => {
  const body = document.getElementById('body')
  if (body) {
    body.classList.remove(TypeTheme.dark)
    body.classList.remove(TypeTheme.white)
    body.classList.add(theme)
  }
}
