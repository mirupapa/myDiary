import { RequiredStringSchema } from 'yup/lib/string'

// todo 増える可能性
type validateType = RequiredStringSchema<string | undefined, Record<string, any>>
type valueType = string | number

export const validator = (validate: validateType, value: valueType) => {
  let message = ''
  try {
    validate.validateSync(value)
  } catch (err) {
    message = err instanceof Error ? err.message : 'Error'
  }
  return message
}
