export function timeoutPromise(handler, time) {
  return new Promise((res, _rej) => {
    setTimeout(() => {
      const data = handler()
      res(data)
    }, time)
  })
}