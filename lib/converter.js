const files = require('./files')

module.exports = {
  toHtml: async (markdown) => {
    const showdown  = require('showdown')
    const showdownConverter = new showdown.Converter()
    showdownConverter.setFlavor('github')
    return showdownConverter.makeHtml(markdown)
  },

  getHtml: async (path) => {
    const markdown = await files.getFile(path)
    return await module.exports.toHtml(markdown)
  },

  getHtmlWithoutTitle: async (path) => {
    let markdown = await files.getFile(path)
    markdown = await files.removeFirstLine(markdown)
    return await module.exports.toHtml(markdown)
  }
}