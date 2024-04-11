export function reverseDate(dateStr) {
  // convert date in fr format dd-mm-yyyy to system format yyyy-mm-dd
  // and vice versa
  return dateStr.split('-').reverse().join('-')
}

export function isDateValid(dateStr) {
  // dateStr is on a system format: yyyy-mm-dd
  const date = new Date(dateStr)
  // check date is valid
  if (!isNaN(date)) {
    // check year
    const year = new Date().getFullYear()
    return [year - 1, year].includes(date.getFullYear())
  }
  return false
}

export function isTimeValid(timeStr) {
  // value is of the form 12:34:56
  const str = timeStr.trim()
  // length of value is 8
  if (str.length != 8) {
    return false
  }
  // should have 3 numbers (hour, minute, second) separate with 2 colons (":")
  const split = str.split(':', 3)
  if (
    !isHourValid(split[0]) ||
    !isMinuteOrSecondValid(split[1]) ||
    !isMinuteOrSecondValid(split[2])
  ) {
    return false
  }
  return true
}

function isHourValid(value) {
  // 1 -> 23
  return isPositiveNumberValid(value) && value < 24
}

function isMinuteOrSecondValid(value) {
  // 1 -> 59
  return isPositiveNumberValid(value) && value < 60
}

export function isPositiveNumberValid(value) {
  return isNumberValid(value) && value > 0
}

function isNumberValid(value) {
  return !isNaN(value)
}
