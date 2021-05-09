export type DiaryType = {
  id: string
  title: string
  text: string
  date: string
}

export const isDiary = (arg: unknown): arg is DiaryType => {
  const _arg = arg as DiaryType
  return (
    typeof _arg?.id === 'string' &&
    typeof _arg?.title === 'string' &&
    typeof _arg?.text === 'string' &&
    typeof _arg?.date === 'string'
  )
}

export const isDiaries = (args: unknown[]): args is DiaryType[] => {
  return !args.some((arg) => !isDiary(arg))
}
