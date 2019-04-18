const multer = require('multer')
const path = require('path')
const crypto = require('crypto')

// Multer é usado para fazer upload de arquivos.

module.exports = {
    // path.resolve > resolve o caminho dos arquivos. Padroniza a escrita dos arquivos dentro do Node.
    dest: path.resolve(__dirname, '..', '..', 'tmp'),
    storage: multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, path.resolve(__dirname, '..', '..', 'tmp'))
        },
        filename: (req, file, cb) => {
            // Gera hashes, conjunto de caracteres únicos.
            crypto.randomBytes(16, (err, hash) => {
                if (err) cb(err)
                file.key = `${hash.toString('hex')}-${file.originalname}`

                cb(null, file.key)
            })
        }
    })
}