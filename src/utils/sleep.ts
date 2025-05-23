const sleep = async (ms = 0) => {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

export default sleep
