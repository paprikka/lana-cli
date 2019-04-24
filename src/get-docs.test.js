const fs = require('fs')
const dir = require('node-dir')

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


    it('should reject with NO_DOCS_AVAILABLE error if README not found', () => {
        return require('./get-docs')(__dirname)
            .catch( err => {
                expect(err.message).toBe('NO_DOCS_AVAILABLE')
            })

    })

    describe('when md files are present', () => {
        const mockedContent = 'Hello markdown'
        const createMdFile = (name) =>
            fs.writeFileSync(`${__dirname}/${name}.md`, mockedContent)

        afterAll(() => {
            dir.files(__dirname, (err, files) => {
                if (err) throw err

                files.forEach((mdFile) => {
                    /.md$/.test(mdFile) && fs.unlinkSync(mdFile)
                })
            })
        })

        it('should load README from the passed root directory', () => {
            createMdFile('README')

            return require('./get-docs')(__dirname)
                .then( content => {
                    expect(content).toBe(mockedContent)
                })
        })

        it('should load all md files from the passed root directory', () => {
            createMdFile('some-more')

            return require('./get-docs')(__dirname)
                .then( content => {
                    expect(content.length).toEqual(mockedContent.length * 2 + 1)
                })
        })
    })
})
