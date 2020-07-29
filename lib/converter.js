module.exports = {
  toHtml: async (markdown) => {
    const showdown  = require('showdown')
    const showdownConverter = new showdown.Converter()
    return showdownConverter.makeHtml(markdown)
  },

  getHtml: async (path) => {
    const markdown = await require('./files').getFile(path)
    return await module.exports.toHtml(markdown)
  }
}