const files = require('./files')
const pkg = require('../package.json')
const Configstore = require('configstore')

const configstore = new Configstore(pkg.name)

module.exports = {
  getCrosspostConf: async () => {
    try {
      const postConfPath = await files.getCrossPostConfPath()
      return require(postConfPath)
    } catch (e) {
      console.log('Could not find crosspostConf.json')
    }
  },

  existsCrosspostConf: async () => {
    const crosspostConf = await module.exports.getCrosspostConf()
    return crosspostConf ? true : false
  },

  assertCrosspostConf: async () => {
    const confExists = await module.exports.existsCrosspostConf()
    if(!confExists) {
      console.log('Creating crosspostConf.json')
      files.saveCrosspostConfJson({})
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

  getCanonicalUrl: async () => {
    // TODO: crosspostConf.json should be required at the beginning of this module
    const postConf = await module.exports.getCrosspostConf()
    return postConf.canonicalUrl
  },

  setCanonicalUrl: async (url) => {
    // TODO: crosspostConf.json should be required at the beginning of this module
    const postConf = await module.exports.getCrosspostConf()
    postConf.canonicalUrl = url
    await files.saveCrosspostConfJson(postConf)
  },

  show: () => {
    console.log(configstore.all)
  },

  validateSetup: () => {
    const errors = {}

    if (module.exports.getWebflowApiKey()) {
      console.log('✅ webflow API key is present')
    } else {
      errors.webflowApiKeyPresent = false
      console.log('❌ webflow API key is missing')
    }

    if (module.exports.getWebflowCollectionId()) {
      console.log('✅ webflow collection ID is present')
    } else {
      errors.webflowCollectionIdPresent = false
      console.log('❌ webflow collection ID is missing')
    }

    if (module.exports.getDevtoApiKey()) {
      console.log('✅ devto is configured👍')
    } else {
      errors.devtoApiKeyPresent = false
      console.log('❌ devto API key is missing')
    }
    return errors
  }
}