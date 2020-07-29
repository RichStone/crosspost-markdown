const expect = require('chai').expect
const files = require('../lib/files')

describe ('Files', () => {
  it('should correctly remove the first line', async () => {
    let markdown = await files.getFile('./test.md')
    markdown = await files.removeFirstLine(markdown)
    console.log(markdown)
  })

  it('should return the correct crossPost.conf path', () => {
    const articlePath = '/Users/rich/code/src/github.com/crossposter/test/test.md'
    expect(files.getCrossPostConfPath(articlePath)).to.equal('/Users/rich/code/src/github.com/crossposter/test/crosspostConf.json')
  })
})