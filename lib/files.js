const fs = require('fs').promises
const path = require('path')

module.exports = {
  getCurrentDirectoryBase: () => {
    return path.basename(process.cwd())
  },

  directoryExists: (filePath) => {
    return fs.existsSync(filePath)
  },

  getFile: async (path) => {
    return fs.readFile(path, 'utf-8')
  },

  saveCrosspostConfJson: async (json) => {
    fs.writeFile(
      module.exports.getCrossPostConfPath(), 
      JSON.stringify(json)
    )
  },

  getCrossPostConfPath: () => {
    // crosspostConf.json must be in the same directory as the article

    // TODO: getCrossPostConfPath should be in configurer.js
    // TODO: make use of some kind of path builder to avoid compatibility issues? (windows <-> UNIX)
    return process.cwd() + '/crosspostConf.json'
  },

  removeFirstLine: async (file) => {
    var position = file.toString().indexOf('\n'); // find position of new line element
    if (position != -1) { // if new line element found
      file = file.substr(position + 1); // subtract string based on first line length
      return file
    } else {
        console.log('no lines found');
    }
  }
}