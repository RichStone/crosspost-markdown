const pkg = require('../package.json')
const configurer = require('./configurer')
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

  if(!cmdObj.all && !cmdObj.only) {
    console.log('Choose an option:')
    console.log('--all to configure all platforms.')
    console.log('--only <platform> to configure a specific platform (webflow, devto, github)')
  }

  if(cmdObj.all) {
    await configureWebflowApiKey()
    await configureWebflowCollectionId()
    await configureDevtoApiKey()
  }

  if(cmdObj.only) {
    const platform = cmdObj.only
    if(platform === 'webflow') {
      await configureWebflowApiKey()
      await configureWebflowCollectionId()
    }
  }

  // TODO functions below should be responsibilities of configurer
  async function configureWebflowApiKey() {
    const input = await inquirer.askWebflowApiKey()
    configurer.set('webflowApiKey', input.webflowApiKey)
    if (configurer.getWebflowApiKey()) console.log('Webflow API key is set 👍')
  }

  async function configureWebflowCollectionId () {
    const input = await inquirer.askWebflowCollectionId()
    configurer.set('webflowCollectionId', input.webflowCollectionId)
    if (configurer.getWebflowCollectionId()) console.log('Webflow Collection ID is set 👍')
  }
  
  async function configureDevtoApiKey() {
    const input = await inquirer.askDevtoConfigs()
    configurer.set('devtoApiKey', input['devtoApiKey'])
    if (configurer.getDevtoApiKey()) console.log('dev.to API key set 👍')
  }
}

const article = async (articleName, cmdObj) => {
  // TODO: validate articleName: it should not be a file path, can only be a .md file
  // to ensure that CLI is fired only from the dir of the config
  
  console.log(
    chalk.greenBright(
      figlet.textSync('CrossPost...', { horizontalLayout: 'full' })
    )
  )

  configurer.assertCrosspostConf()

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

