const scripts2list = require('./scripts2list')
describe('scripts2list', () => {
    it('should be a function', () => {
        expect(typeof scripts2list).toEqual('function')
    })


    it('should return a map of script names and shell commands if docs are not provided', () => {
        const scripts = {
            'help': 'lana --help',
            'start': 'node cli',
            'test': 'jest --watch',
            'lint': 'eslint **/*.js'
        }

        const expectedOutput = [

            { name: 'help', label: 'lana --help' },
            { name: 'start', label: 'node cli' },
            { name: 'test', label: 'jest --watch' },
            { name: 'lint', label: 'eslint **/*.js' }

        ]


        expect(scripts2list(scripts)).toEqual(expectedOutput)
    })

    it('should return replace shell commands with descriptions if spec provided', () => {
        const scripts = {
            'help': 'lana --help',
            'start': 'node cli',
            'test': 'jest --watch',
            'lint': 'eslint **/*.js'
        }

        const descriptions = {
            'test': 'Run unit tests',
            'start': 'Call cli explicitly, used for integration testing'
        }

        const expectedOutput = [

            { name: 'help', label: 'lana --help' },
            { name: 'start', label: descriptions['start'] },
            { name: 'test', label: descriptions['test'] },
            { name: 'lint', label: 'eslint **/*.js' }

        ]


        expect(scripts2list(scripts, descriptions)).toEqual(expectedOutput)
    })
})