export const formatDate = (date: Date, format: string): string => {
  format = format.replace(/YYYY/, String(date.getFullYear()))
  format = format.replace(/MM/, String(date.getMonth() + 1))
  format = format.replace(/DD/, String(date.getDate()))
  format = format.replace(/HH/, String(date.getHours()))
  format = format.replace(/mm/, String(date.getMinutes()))
  format = format.replace(/ss/, String(date.getSeconds()))
  return format
}
