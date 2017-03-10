module.exports = {
    addListener: jest.fn( (event, cb) => cb() ),
    spawn: jest.fn((commands, args, opts)=> ({
        stdin: jest.fn(),
        addListener: jest.fn()
    }))
}