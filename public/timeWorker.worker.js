// tslint:disable:no-console
let timerRef = null
let timer = 0

const stopTimer = () => timerRef && clearInterval(timerRef)

const startTimer = (startTime) => {
  timer = startTime
  if (timerRef) {
    stopTimer()
  }
  timerRef = setInterval(() => {
    console.log('WORKER_THREAD: worker managed interval')
    if (timer <= 0) {
      this.postMessage({ type: 'stop' })
    }
    timer -= 1000
    this.postMessage({ type: 'tick', timer })
  }, 1000)
}

this.addEventListener('message', function (e) {
  console.log('WORKER_THREAD: worker listener', e)
  this.postMessage(e.data);
  switch (e.data.type) {
    case 'start': {
      console.warn('start event', e.data.timer)
      this.postMessage({ type: 'SUCCESS', data: 123 })
      startTimer(e.data.timer)
      return
    }
    case 'stop': {
      console.warn('stop event', { timer })
      stopTimer()
      return
    }
  }
}, false);