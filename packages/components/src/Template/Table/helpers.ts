type ISort = 'asc' | 'desc' | ''
const Sort: ISort[] = ['', 'asc', 'desc']

export const nextSort = (current: ISort): ISort => {
  const i = Sort.findIndex(x => x === current)
  if (i + 1 > Sort.length - 1) {
    return Sort[0]
  }

  return Sort[i + 1]
}
