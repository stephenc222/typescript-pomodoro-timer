export default class WebWorker implements Worker {
  public postMessage: Worker['postMessage'];
  public onmessage: Worker['onmessage'];
  public addEventListener: Worker['addEventListener']
  public removeEventListener: Worker['removeEventListener']
  public terminate: Worker['terminate']
  public dispatchEvent: Worker['dispatchEvent']
  public onerror: Worker['onerror']
  constructor(worker: any) {
    const code = worker.toString();
    const blob = new Blob(['(' + code + ')()']);
    return new Worker(URL.createObjectURL(blob));
  }
}