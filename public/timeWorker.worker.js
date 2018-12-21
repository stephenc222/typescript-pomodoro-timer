let timerRef = null
let timer = 0

const stopTimer = () => timerRef && clearInterval(timerRef)

const startTimer = (startTime) => {
  timer = startTime
  if (timerRef) {
    stopTimer()
  }
  timerRef = setInterval(() => {
    if (timer <= 0) {
      this.postMessage({ type: 'stop' })
    }
    timer -= 1000
    this.postMessage({ type: 'tick', timer })
  }, 1000)
}

this.addEventListener('message', function (e) {
  this.postMessage(e.data);
  switch (e.data.type) {
    case 'start': {
      this.postMessage({ type: 'SUCCESS', data: 123 })
      startTimer(e.data.timer)
      return
    }
    case 'stop': {
      stopTimer()
      return
    }
  }
}, false);