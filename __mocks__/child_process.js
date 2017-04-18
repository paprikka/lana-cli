module.exports = {
    addListener: jest.fn( (event, cb) => cb() ),
    spawn: jest.fn(() => ({
        stdin: jest.fn(),
        addListener: jest.fn()
    }))
}