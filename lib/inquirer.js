const inquirer = require('inquirer')

module.exports = {
  askDevtoConfigs: async () => {
    const questions = [
      {
        name: 'devtoApiKey',
        type: 'input',
        message: 'Enter your dev.to API key (more information at https://docs.dev.to/api/#section/Authentication/api_key)',
        validate: function(value) {
          if (value.length) {
            return true
          } else {
            return 'Please enter the dev.to API key.'
          }
        }
      }
    ]
    return await inquirer.prompt(questions)
  },
  askWebflowApiKey: async () => {
    const questions = [
      {
        name: 'webflowApiKey',
        type: 'input',
        message: 'Enter your webflow API key (more information at https://developers.webflow.com/oauth#api-keys)',
        validate: function(value) {
          if (value.length) {
            return true
          } else {
            return 'Please enter the webflow API key.'
          }
        }
      }
    ]
    return await inquirer.prompt(questions)
  },

  askWebflowCollectionId: async () => {
    const questions = [
      {
        name: 'webflowCollectionId',
        type: 'input',
        message: 'Enter your webflow collection ID (Once you have your API key, you can get a list of your collections https://developers.webflow.com/#list-collections)',
        validate: function(value) {
          if (value.length) {
            return true
          } else {
            return 'Please enter the webflow collection ID of your blog posts.'
          }
        }
      }
    ]
    return await inquirer.prompt(questions)
  },
}