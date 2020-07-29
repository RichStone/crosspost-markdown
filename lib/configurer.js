const pkg = require('../package.json')
const Configstore = require('configstore')
const { config } = require('chai')

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

  getDevtoApiKey: () => {
    return configstore.get('devtoApiKey')
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