var md = require('markdown-it')()

const md2json = mdString => {
    if(!mdString) throw new Error('Markdown string expected')
    const parsed = md.parse(mdString)
    const exp = /(.*?)<!--lana:(\s?)+(\w+.*?)-->/i
    const result = parsed
        .filter( token => token.content && token.content != '')
        .map( ({content}) => content )
        .filter( content => exp.test(content) )
        .map( content => {
            const matches = content.match(exp)
            const value = matches[1].trim()
            const key = matches[3].trim()

            const result = {}
            result[key] = value
            return result
        }).reduce((acc, val) => Object.assign(acc, val), {})
    
        
    return result
}

module.exports = md2json