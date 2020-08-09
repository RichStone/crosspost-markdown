const pkg = require('../package.json')
const configurer = require('./configurer')
const files = require('./files')
const inquirer = require('./inquirer')
const webflow = require('./webflow')
const devto = require('./devto')

const chalk = require('chalk')
const figlet = require('figlet')

const { Command } = require('commander')
const program = new Command()
program.version(pkg.version)

const configure = async (cmdObj) => {
  configurer.validateSetup()
  
  const configFunctionsMapping = {
    webflowApiKey: configureWebflowApiKey,
    webflowCollectionId: configureWebflowCollectionId,
    webflowArticlesUrl: configureWebflowArticlesUrl,
    devtoApiKey: configureDevtoApiKey
  }

  async function setSpecificConfig(key) {
    if (key in configFunctionsMapping) {
      const configFunction = configFunctionsMapping[key]
      await configFunction()
    } else {
      console.log(key, 'does not exist as an option.')
      console.log('Run `crosspost configure --list-configs` to see your options.')
      process.exit()
    }
  }

  if (cmdObj.listConfigs) {
    console.log('\nConfigurations set via `crosspost conigure` will not appear in any public configuration file.')
    console.log('Individual Article configs will be created and maintained automatically in an article.md.json')
    console.log('\nYou can use these options together with `configure --specify-config`:')
    Object.keys(configFunctionsMapping).forEach(function(key) {
      console.log('\t', key)
    })
    console.log('')
  }
  
  if (cmdObj.specificConfig) {
    await setSpecificConfig(cmdObj.specificConfig)
  }

  // TODO there must be a way to check cmdObj if no options are present
  if (!cmdObj.all && !cmdObj.only && !cmdObj.specificConfig) {
    console.log('Choose an option:')
    console.log('--all to configure all platforms.')
    console.log('--only <platform> to configure a specific platform (webflow, devto, github)\n')
  }

  if (cmdObj.all) {
    await configureWebflowApiKey()
    await configureWebflowCollectionId()
    await configureWebflowArticlesUrl()
    await configureDevtoApiKey()
  }

  if (cmdObj.only) {
    const platform = cmdObj.only
    const availablePlatforms = ['webflow', 'devto']
    if(platform === availablePlatforms[0]) {
      await configureWebflowApiKey()
      await configureWebflowCollectionId()
      await configureWebflowArticlesUrl()
    } else if (platform === availablePlatforms[1]) {
      await configureDevtoApiKey()
    } else {
      console.log(platform, 'is not available for configuration yet...❌')
      console.log('Please choose from available platforms:', availablePlatforms.toString())
    }
  }

  async function configureWebflowApiKey() {
    const input = await inquirer.askWebflowApiKey()
    configurer.set('webflowApiKey', input.webflowApiKey)
    if (configurer.getWebflowApiKey()) console.log('Webflow API key is set 👍')
  }

  async function configureWebflowCollectionId() {
    const input = await inquirer.askWebflowCollectionId()
    configurer.set('webflowCollectionId', input.webflowCollectionId)
    if (configurer.getWebflowCollectionId()) console.log('Webflow Collection ID is set 👍')
  }

  async function configureWebflowArticlesUrl() {
    const input = await inquirer.askWebflowArticlesUrl()
    configurer.set('webflowArticlesUrl', input.webflowArticlesUrl)
    if (configurer.getWebflowArticlesUrl()) console.log('Webflow Articles URL is set 👍')
  }
  
  async function configureDevtoApiKey() {
    const input = await inquirer.askDevtoConfigs()
    configurer.set('devtoApiKey', input['devtoApiKey'])
    if (configurer.getDevtoApiKey()) console.log('dev.to API key set 👍')
  }
}

const article = async (articleName, cmdObj) => {
  // validate articleName: it should not be a file path, can only be a .md file
  // to ensure that CLI is fired only from the dir of the config
  if (!articleName.charAt(0).match(/\w/i)) {
    console.log(`\nSorry, ${articleName} must be a letter, number or underscore... exiting...`)
    return process.exit()
  }
  // validate if the article md doesn't exist exit process ASAP, 
  // so that no configs are created etc.
  if (await files.fileExistsInCurrentWorkDir(articleName)) {
    console.log(articleName, 'found in your current directory! 👍')
  }

  // getting the individual postconfig in another module relies on the article name
  process.env.articleName = articleName
  
  const setupErrors = configurer.validateSetup()
  if (Object.keys(setupErrors).length) {
    console.log('\nSome configs are missing in order to crosspost an article.🚨\n')
    return process.exit()
  }

  console.log(
    chalk.greenBright(
      figlet.textSync('CrossPost...', { horizontalLayout: 'full' })
    )
  )

  configurer.assertIndividualPostConf()

  const targetPlatform = cmdObj.to

  if (targetPlatform) {
    // only post to the specified platform
    console.log('...to %s platform!🚀', targetPlatform)
    switch (targetPlatform) {
      case 'webflow':
        webflow.publish(articleName)
        break
      case 'devto':
        devto.publish(articleName)
        break
      default:
        console.log(
          '...does not support %s 😓 Contact https:fullstack.coach to extend the tool.', 
          targetPlatform
        )
    }
  } else {
    // without a provided platform, post to every configured platform
    console.log('...to all configured platforms!🚀')
    await webflow.publish(articleName)
    await devto.publish(articleName)
  }
}

module.exports = {
  initializeCommands: async () => {
    program
    .command('configure')
    .description('Configure CrossPost')
    .option('-a, --all', 'Configure all the platforms')
    .option('-o, --only <platform>', 'Configure a specific platform (only webflow, dev.to or GitHub)')
    .option('-s, --specific-config <config-option>', 'Configure a specific option (check --list-configs to see your options)')
    .option('-l, --list-configs', 'See all available configs')
    .action(configure)
  
    program
    .command('article <file_path>')
    .description('Cross post markdown article 🚀')
    .option('--to <platform>', '(optional) Specify the platform ("webflow" or "devto")')
    .option('-p, --production', 'As a default, your posts will be published as a draft. If you are absolutely sure to go live, use the -p option.')
    .action(article)
  
    await program.parseAsync(process.argv)
  }
}

