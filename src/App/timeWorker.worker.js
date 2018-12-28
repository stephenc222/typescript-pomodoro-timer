export default () => {
  let timerRef = 0
  let timer = 0

  const stopTimer = () => timerRef && clearInterval(timerRef)

  const startTimer = (startTime) => {
    timer = startTime
    if (timerRef) {
      stopTimer()
    }
    timerRef = setInterval(() => {
      if (timer <= 0) {
        postMessage({ type: 'stop' })
      }
      timer -= 1000
      postMessage({ type: 'tick', timer })
    }, 1000)
  }

  addEventListener('message', (e) => {
    switch (e.data.type) {
      case 'start': {
        startTimer(e.data.timer)
        return
      }
      case 'stop': {
        stopTimer()
        return
      }
    }
  }, false);
}