const files = require('./files')
const pkg = require('../package.json')
const Configstore = require('configstore')

const configstore = new Configstore(pkg.name)

module.exports = {
  getIndividualPostConf: async () => {
    try {
      const postConfPath = await files.getIndividualPostConfPath()
      return require(postConfPath)
    } catch (e) {
      console.log(`Could not find ${process.env.articleName}'.json`)
    }
  },

  existsIndividualPostConf: async () => {
    const individualPostConf = await module.exports.getIndividualPostConf()
    return individualPostConf ? true : false
  },

  assertIndividualPostConf: async () => {
    const confExists = await module.exports.existsIndividualPostConf()
    if(!confExists) {
      console.log(`Creating ${process.env.articleName}.json...`)
      files.saveIndividualPostConfJson({})
      console.log(`Your article\'s individual configurations will now be stored in the ${process.env.articleName}.json ✅`)
      console.log(`You will need to keep them together for consistency.`)
    }
  },

  writeToIndividualPostConfConf: async (key, val) => {
    const postConfig = await module.exports.getIndividualPostConf()
    postConfig[key] = val
    await files.saveIndividualPostConfJson(postConfig)
  },

  getIndividualPostConfValue: async (key) => {
    const postConfig = await module.exports.getIndividualPostConf()
    return postConfig[key]
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
    // FIXME: unhardcode -> make addable in configstore
    return 'https://fullstack.coach/post/'
  },

  getDevtoApiKey: () => {
    return configstore.get('devtoApiKey')
  },

  getCanonicalUrl: async () => {
    const postConf = await module.exports.getIndividualPostConf()
    return postConf.canonicalUrl
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