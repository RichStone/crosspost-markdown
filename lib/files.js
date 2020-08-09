const fs = require('fs').promises
const path = require('path')

module.exports = {
  getFile: async (path) => {
    return fs.readFile(path, 'utf-8')
  },

  saveIndividualPostConfJson: async (json) => {
    fs.writeFile(
      module.exports.getIndividualPostConfPath(), 
      JSON.stringify(json)
    )
  },

  getIndividualPostConfPath: () => {
    return path.join(process.cwd(), process.env.articleName + '.json')
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