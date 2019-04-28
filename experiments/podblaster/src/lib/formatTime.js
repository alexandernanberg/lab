function getTimeFromSeconds(secs) {
  const hours = String(Math.floor(secs / 3600))
  const minutes = String(Math.floor((secs % 3600) / 60))
  const seconds = String(Math.round(secs % 60))

  return { hours, minutes, seconds }
}

export default function formatTime(secs) {
  const { hours, minutes, seconds } = getTimeFromSeconds(secs)

  let formattedTime = ''

  if (hours > 0) {
    formattedTime += `${hours}:${minutes < 10 ? '0' : ''}`
  }

  formattedTime += `${minutes}:${seconds < 10 ? '0' : ''}`
  formattedTime += seconds

  return formattedTime
}
