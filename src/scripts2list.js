const { keys } = Object
const scripts2list = scripts => (
    keys(scripts)
        .map(
        name => ({ name, script: scripts[name] })
        )
)

module.exports = scripts2list