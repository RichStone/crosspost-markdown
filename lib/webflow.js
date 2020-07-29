const config = require('../crosspostConf.json')
const configurer = require('./configurer')
const converter = require('./converter')
const files = require('./files')
const errorMessages = require('./messagesError')
const htmlParser = require('node-html-parser')
const slugify = require('slugify')
const Webflow = require('webflow-api')

module.exports = {
  post: async(html) => {
    const webflow = new Webflow({ token: configurer.getWebflowApiKey() })
    const item = webflow.createItem({
      "collectionId": configurer.getWebflowCollectionId(),
      "fields": {
        "name": config.title,
        "slug": config.slug,
        "_archived": false,
        "_draft": config.isDraft,
        "color": "#a98080",
        "post-body": html,
        "post-summary": "Summary of exciting blog post which has to be much longer than I expected to be honest!!! And even that, not enough..."
      }
    })

    return await item
  },

  publish: async (articlePath) =>  {
    // TODO: setting the html & finding/setting the title/slug should be the
    // responsibility of a different module
    let htmlString = await converter.getHtml(articlePath)
    const htmlObj = htmlParser.parse(htmlString)
    const h1 = htmlObj.querySelector('h1')
    // set the title
    config.title = h1.text
    // set the slug
    config.slug = slugify(h1.text, { lower: true, strict: true })
    // remove the headline from the actual blog post
    // beacause webflow top heading will be defined via API
    // and should not appear another time in the blog post body
    h1.set_content('')
    // now the htmlObj's headline is '' and we convert it back to our
    // htmlString to deploy it to webflow
    htmlString = htmlObj.toString()
  
    try {
      const webflowResponse = await module.exports.post(htmlString)
      // FIXME: must be set in the configuration step
      config.canonicalUrl = config.webflowPostUrl + webflowResponse.slug
      // if everything went well save the configs
      await files.saveJson(config, articlePath)
      console.log('Published on webflow! 🎉🎉🎉')
    } catch (e) {
      errorMessages.webflow(e)
    }
  }
}