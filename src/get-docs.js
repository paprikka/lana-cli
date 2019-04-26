const dir = require('node-dir')

const getDocs = root => {
    const mds = []

    return new Promise((resolve, reject) => {
        dir.readFiles(root, {
            match: /.md$/,
            excludeDir: ['node_modules'],
            exclude: /^\./
        },
        function(err, content, next) {
            if (err) throw err
            mds.push(content)
            next()
        },
        function(err, files) {
            if (files && files.length === 0) return reject(new Error('NO_DOCS_AVAILABLE'))
            if (err) return reject(err)

            resolve(mds.join('\n'))
        })
    })
}

module.exports = getDocs
