const md2json = require('./md2json')
describe('md2json', () => {
    it('should be a function', () => {
        expect(typeof md2json).toBe('function')
    })
    
    it('should return an object for a string', () => {
        expect(typeof md2json('## hello')).toBe('object')
    })

    it('should throw if no arguments passed', () => {
        const runner = () => md2json()
        expect(runner).toThrow()
    })

    it('should return matches for headers', () => {
        const inputString = `
### Header

Random paragraph of text goes here...

### Docs


#### Start the app <!--lana: start-->
        
        `

        expect(md2json(inputString)).toEqual(
            {
                start: 'Start the app'
            }
        )
    })

    it('should support snake-case', () => {
        const inputString = `
### Header

Random paragraph of text goes here...

### Docs


#### Start the app <!--lana: start-->

#### Snake! <!--lana: snake-case-->
#### Snake Two! <!--lana:snake-two-->


#### This one is described with a paragraph

lorem ipsum dolor sit amet consectatur trolo lolo lo <!--lana: paragraph-here-->


### This is a multiline paragraph
lorem ipsum dolor
sit amet <!--lana: multiline-->
        `

        expect(md2json(inputString)).toEqual(
            {
                start: 'Start the app',
                'snake-case': 'Snake!',
                'snake-two': 'Snake Two!',
                'paragraph-here': 'lorem ipsum dolor sit amet consectatur trolo lolo lo',
                'multiline': 'sit amet'
            }
        )
    })
})