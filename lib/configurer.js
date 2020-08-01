const files = require('./files')
const pkg = require('../package.json')
const Configstore = require('configstore')

const configstore = new Configstore(pkg.name)

module.exports = {
  set: (key, value) => {
    configstore.set(key, value)
  },

  getWebflowApiKey: () => {
    return configstore.get('webflowApiKey')
  },

  getWebflowCollectionId: () => {
    return configstore.get('webflowCollectionId')
  },

  getWebflowAuthorId: () => {
    return configstore.get('webflowAuthorId')
  },

  getWebflowPostUrl: () => {
    // FIXME: unhardcode
    return 'https://fullstack.coach/post/'
  },

  getDevtoApiKey: () => {
    return configstore.get('devtoApiKey')
  },

  getCanonicalUrl: (articlePath) => {
    // TODO: crosspostConf.json should be required at the beginning of this module
    const postConfPath = files.getCrossPostConfPath(articlePath)
    const postConf = require(postConfPath)
    return postConf.canonicalUrl
  },

  setCanonicalUrl: async (url, articlePath) => {
    // TODO: crosspostConf.json should be required at the beginning of this module
    console.log("AP",articlePath)
    const postConfPath = files.getCrossPostConfPath(articlePath)
    console.log('pcp',postConfPath)
    const postConf = require(postConfPath)
    console.log('pc',postConf)
    postConf.canonicalUrl = url
    files.saveJson(postConf, articlePath)
  },

  show: () => {
    console.log(configstore.all)
  },

  validateSetup: () => {

    if (module.exports.getWebflowApiKey()) {
      console.log('✅ webflow API key is present')
    } else {
      console.log('❌ webflow API key is missing')
    }

    if (module.exports.getWebflowCollectionId()) {
      console.log('✅ webflow collection ID is present')
    } else {
      console.log('❌ webflow collection ID is missing')
    }

    if (module.exports.getDevtoApiKey()) {
      console.log('✅ devto is configured👍')
    } else {
      console.log('❌ devto API key is missing')
    }
  }
}