const { keys } = Object

const getItem = (name, command, descriptions) => {
    return {
        name,
        label: descriptions[name] ? descriptions[name] : command
    }
}

const scripts2list = (scripts, descriptions = {}) => (
    keys(scripts)
        .map(
            name => getItem(name, scripts[name], descriptions)
        )
)

module.exports = scripts2list