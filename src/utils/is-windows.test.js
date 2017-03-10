describe('is-windows', () => {
    const windowsPlatform = 'win32'
    const nonWindowsPlatforms = [
        'darwin', 'freebsd', 'linux', 'sunos'
    ]

    it('should be a function', () => {
        expect(typeof require('./is-windows')).toBe('function')
    })

    nonWindowsPlatforms.forEach(p => {
        it(`should return false if platform is ${p}`, () => {
            jest.mock('./process')
            process.platform = p
            expect(require('./is-windows')()).toBe(false)
        })
    })


    it('should return true if windows', () => {
        jest.mock('./process')
        process.platform = windowsPlatform
        expect(require('./is-windows')()).toBe(true)
    })
})