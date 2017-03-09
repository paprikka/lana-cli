

describe('get-docs', () => {
    let getDocs
    beforeEach(()=>{
        getDocs = require('./get-docs')
    })
    it('should be a function', () => {
        expect(typeof getDocs).toBe('function')
    })

    it('should return a promise', ()=>{
        expect(getDocs('') instanceof Promise).toBe(true)
    })

    it('should load README from the passed root directory', () => {
        jest.mock('fs')
        const { readFile } = require('fs')

        const root = '/foo/bar/baz'
        require('./get-docs')(root)
        expect(readFile).toBeCalled()
        expect(readFile.mock.calls[0][0]).toEqual(root + '/README.md')
    })

    it('should reject with NO_DOCS_AVAILABLE error if README not found', () => {
        jest.mock('fs')
        const { readFile } = require('fs')


        readFile.mockImplementationOnce((path, encoding, cb) => {
            const err = new Error()
            err.code = 'ENOENT'
            cb(err, '')
        })
        const root = '/foo/bar/baz'
        return require('./get-docs')(root)
            .catch( err => {
                expect(err.message).toBe('NO_DOCS_AVAILABLE')
            })

    })

    it('should pass the exception if a different fs error occurs', () => {
        jest.mock('fs')
        const { readFile } = require('fs')


        readFile.mockImplementationOnce((path, encoding, cb) => {
            const err = new Error()
            err.code = 'Oh my god, it\'s a boo boo'
            cb(err, '')
        })
        const root = '/foo/bar/baz'
        return require('./get-docs')(root)
            .catch( err => {
                expect(err.message).not.toBe('NO_DOCS_AVAILABLE')
                expect(err.code).toBe('Oh my god, it\'s a boo boo')
            })

    })
})