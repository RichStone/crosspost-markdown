const configurer = require('./configurer')
const converter = require('./converter')
const errorMessages = require('./messagesError')
const htmlParser = require('node-html-parser')
const Webflow = require('webflow-api')

module.exports = {
  post: async(html, meta) => {
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

  publish: async (articleName) =>  {
    const meta = {}
    const articlePath = process.cwd() + '/' + articleName
    
    // TODO: setting the html & finding/setting the title/slug should be the
    // responsibility of a different module
    let htmlString = await converter.getHtml(articlePath)
    const htmlObj = htmlParser.parse(htmlString)
    const h1 = htmlObj.querySelector('h1')
    // set the title
    meta.title = h1.text
    // set the slug
    const slugify = require('slugify')
    meta.slug = slugify(h1.text, { lower: true, strict: true })
    // remove the headline from the actual blog post
    // beacause webflow top heading will be defined via API
    // and should not appear another time in the blog post body
    h1.set_content('')
    // now the htmlObj's headline is '' and we convert it back to our
    // htmlString to deploy it to webflow
    htmlString = htmlObj.toString()
  
    let webflowResponse
    try {
      webflowResponse = await module.exports.post(htmlString, meta)
    } catch (e) {
      errorMessages.webflow(e)
    }
    // save the configs if everything went well
    const canonicalUrl = configurer.getWebflowPostUrl() + webflowResponse.slug
    configurer.setCanonicalUrl(canonicalUrl)
    console.log('Published a new article on webflow! 🎉🎉🎉')
  }
}