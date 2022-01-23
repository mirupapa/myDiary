export const formatDate = (date: Date, format: string): string => {
  format = format.replace(/YYYY/, String(date.getFullYear()))
  format = format.replace(/MM/, ('00' + String(date.getMonth() + 1)).slice(-2))
  format = format.replace(/DD/, ('00' + String(date.getDate())).slice(-2))
  format = format.replace(/HH/, ('00' + String(date.getHours())).slice(-2))
  format = format.replace(/mm/, ('00' + String(date.getMinutes())).slice(-2))
  format = format.replace(/ss/, ('00' + String(date.getSeconds())).slice(-2))
  return format
}
