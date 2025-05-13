export const genChannelId = () => {
  return (
    'ch-' +
    Date.now().toString(36) +
    Math.floor(
      Math.pow(10, 12) + Math.random() * 9 * Math.pow(10, 12),
    ).toString(36)
  )
}

export const genRequestId = () => {
  return (
    'req-' +
    Date.now().toString(36) +
    Math.floor(
      Math.pow(10, 12) + Math.random() * 9 * Math.pow(10, 12),
    ).toString(36)
  )
}
