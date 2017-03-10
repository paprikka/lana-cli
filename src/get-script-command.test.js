describe('get-script-command', () => {
    it('should be a function', () => {
        expect(typeof require('./get-script-command')).toBe('function')
    })

    it('should return "npm" for *nix platforms', ()=> {
        jest.mock('./utils/is-windows')
        const isWindowsMock = require('./utils/is-windows')
        isWindowsMock.mockReturnValueOnce(false)
        expect(require('./get-script-command')()).toBe('npm')
    })

    it('should return "npm.cmd" for *nix platforms', ()=> {
        jest.mock('./utils/is-windows')
        const isWindowsMock = require('./utils/is-windows')
        isWindowsMock.mockReturnValueOnce(true)
        expect(require('./get-script-command')()).toBe('npm.cmd')
    })
})