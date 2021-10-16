const timeWorker_worker = require("./timeWorker.worker")
// @ponicode
describe("timeWorker_worker.default", () => {
    test("0", () => {
        let callFunction = () => {
            timeWorker_worker.default()
        }
    
        expect(callFunction).not.toThrow()
    })
})
