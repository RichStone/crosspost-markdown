const files = require('./files')
const pkg = require('../package.json')
const Configstore = require('configstore')

const configstore = new Configstore(pkg.name)

module.exports = {
  getCrosspostConf: async (articlePath) => {
    try {
      const postConfPath = await files.getCrossPostConfPath(articlePath)
      return require(postConfPath)
    } catch (e) {
      console.log('Could not find crosspostConf.json')
    }
  },

  existsCrosspostConf: async (articlePath) => {
    const crosspostConf = await module.exports.getCrosspostConf(articlePath)
    return crosspostConf ? true : false
  },

  assertCrosspostConf: async (articlePath) => {
    const confExists = await module.exports.existsCrosspostConf(articlePath)
    if(!confExists) {
      console.log('Creating crosspostConf.json')
      files.saveCrosspostConfJson({}, articlePath)
      console.log('Your article\'s individual configurations will now be stored in the crosspostConf.json ✅')
    }
  },

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

  getCanonicalUrl: async (articlePath) => {
    // TODO: crosspostConf.json should be required at the beginning of this module
    const postConf = await module.exports.getCrosspostConf(articlePath)
    return postConf.canonicalUrl
  },

  setCanonicalUrl: async (url, articlePath) => {
    // TODO: crosspostConf.json should be required at the beginning of this module
    const postConf = await module.exports.getCrosspostConf(articlePath)
    postConf.canonicalUrl = url
    await files.saveCrosspostConfJson(postConf, articlePath)
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