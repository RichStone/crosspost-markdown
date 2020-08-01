const expect = require('chai').expect
const files = require('../lib/files')

describe ('Files', () => {
  it('should correctly remove the first line', async () => {
    let markdown = await files.getFile('./test.md')
    markdown = await files.removeFirstLine(markdown)
    console.log(markdown)
  })
})