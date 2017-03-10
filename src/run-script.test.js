describe('run-script', () => {
    const noop = _ => _
    beforeEach(()=>{
        jest.mock('./clear')
        require('./clear').mockImplementation(noop)
    })

    const getModule = () => require('./run-script')

    it('should be a function', () => {
        expect(typeof getModule()).toBe('function')
    })

    it('should spawn an npm script process with a script name', () => {
        jest.mock('child_process')
        const {spawn} = require('child_process')
        
        jest.mock('./utils/process')
        
        jest.mock('./get-script-command')
        const getScriptCommand = require('./get-script-command')
        getScriptCommand.mockReturnValueOnce('polyfilled_npm')

        expect(spawn).not.toBeCalled()
        getModule()({name: 'custom-script'})
        expect(spawn).toBeCalled()
        expect(spawn.mock.calls[0][0]).toBe('polyfilled_npm')
    })

})