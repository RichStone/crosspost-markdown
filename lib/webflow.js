const configurer = require('./configurer')
const converter = require('./converter')
const errorMessages = require('./messagesError')
const htmlParser = require('node-html-parser')
const Webflow = require('webflow-api')
var path = require('path')

module.exports = {
  POST: async(html, meta) => {
    const webflow = new Webflow({ token: configurer.getWebflowApiKey() })
    const item = webflow.createItem({
      "collectionId": configurer.getWebflowCollectionId(),
      "fields": {
        "name": meta.title,
        "slug": meta.slug,
        "_archived": false,
        "_draft": false,
        "color": "#a98080",
        "author": configurer.getWeblowAuthorId || "",
        "post-body": html,
        "post-summary": "Summary of exciting blog post which has to be much longer than I expected to be honest!!! And even that, not enough..."
      }
    })
    return await item
  },

  PUT: async(html, meta) => {
    const webflow = new Webflow({ token: configurer.getWebflowApiKey() })
    const item = webflow.updateItem({
      "collectionId": configurer.getWebflowCollectionId(),
      "itemId": meta.webflowArticleId,  
      "fields": {
        "_archived": false,
        "_draft": false,
        "name": meta.title,
        "slug": meta.slug,
        "post-body": html
      }
    })
    return await item
  },

  publish: async (articleName) =>  {
    const meta = {}
    // TODO: decouple articleName by making it global?
    const articlePath = path.join(process.cwd(), articleName)
    
    let htmlString = await converter.getHtml(articlePath)

    // get HTML title
    const htmlObj = htmlParser.parse(htmlString)
    const h1 = htmlObj.querySelector('h1')
    // set the title
    meta.title = h1.text
    
    meta.webflowArticleId = await configurer.getIndividualPostConfValue('webflowArticleId')
    // only change the slug, if the article has not been published yet!
    if (!meta.webflowArticleId) {
      // set the slug
      const slugify = require('slugify')
      // use the h1 tag of a markdown file to build the URL slugs
      meta.slug = slugify(h1.text, { lower: true, strict: true })
    } else {
      meta.slug = await configurer.getIndividualPostConfValue('webflowSlug')
    }

    htmlString = await converter.getHtmlWithoutTitle(articlePath)
  
    let webflowResponse
    try {
      if (meta.webflowArticleId) {
        webflowResponse = await module.exports.PUT(htmlString, meta)
        // TODO: check if you can detect from the response when there were no
        // changes in the webflow article and notify the user accordingly
        // right now every PATCH says that the article was updated even if there
        // were no updates.
      } else {
        webflowResponse = await module.exports.POST(htmlString, meta)
      }
    } catch (e) {
      errorMessages.webflow(e)
    }

    if (meta.webflowArticleId && webflowResponse) {
      console.log('Updated your article 👍')
    }

    if (!meta.webflowArticleId) {
      // save the configs if everything went well
      const canonicalUrl = configurer.getWebflowArticlesUrl() + webflowResponse.slug
      configurer.writeToIndividualPostConfConf('canonicalUrl', canonicalUrl)
      configurer.writeToIndividualPostConfConf('webflowArticleId', webflowResponse._id)
      configurer.writeToIndividualPostConfConf('webflowSlug', meta.slug)
      
      console.log('Published a new article on webflow! 🎉🎉🎉')
    }
    if (!webflowResponse) {
      console.log('Sorry, something went wrong...')
    }
  }
}