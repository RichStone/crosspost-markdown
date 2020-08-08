const files = require('./files')
const errorMessages = require('./messagesError')
const configurer = require('./configurer')

module.exports = {
  POST: async (markdown, meta) => {
    console.log(meta.canonicalUrl)
    if (!meta.canonicalUrl || meta.canonicalUrl === '') throw "🚨 Can't upload to dev.to: Canonical URL \
is not yet set, this means you have not yet pushed your article with CrossPost \
to webflow. If you do not wish to post your article to webflow, you will need \
to specify the --canonical-url option. 🚨"

    async function post() {
      const data = {
        "article": {
          "title": meta.title,
          "published": false,
          "body_markdown": markdown,
          "tags": [],
          "canonical_url": meta.canonicalUrl || ""
        }
      }
      
      let response = await fetch('https://dev.to/api/articles', {
        method: 'POST',
        headers: {
          'api-key': configurer.getDevtoApiKey(),
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
      })
      let json = await response.json()

      return json
    }

    return await post()
  },

  PUT: async (markdown, meta) => {
    const articleData = {
      "article": {
        "title": meta.title,
        "body_markdown": markdown
      }
    }

    const response = await fetch(`https://dev.to/api/articles/${meta.devtoArticleId}`, {
      method: 'PUT',
      headers: {
        'api-key': configurer.getDevtoApiKey(),
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(articleData)
    })

    const json = await response.json()
    return json
  },

  publish: async (articleName) => {
    let meta = {}
    const articlePath = process.cwd() + '/' + articleName

    // get markdown
    let markdown = await files.getFile(articlePath)

    // set meta title
    const markdownTitleGetter = require("get-title-markdown")
    meta.title = markdownTitleGetter(markdown)

    // set meta canonical URL
    meta.canonicalUrl = await configurer.getCanonicalUrl()

    // remove the title to avoid duplicating in body
    // (setting the title happens in the API request)
    markdown = await files.removeFirstLine(markdown)
    
    let devtoResponse
    const devtoArticleId = await configurer.getIndividualPostConfValue('devtoArticleId')
    try {
      if (devtoArticleId) {
        meta['devtoArticleId'] = devtoArticleId
        devtoResponse = await module.exports.PUT(markdown, meta)
      } else {
        devtoResponse = await module.exports.POST(markdown, meta)
      }
    } catch (e) {
      console.log('Sorry, it was not possible to publish on dev.to ❌')
      console.log(e)
      process.exit(1)
    }

    if (devtoResponse.status < 200 || devtoResponse.status > 299) {
      errorMessages.devto(devtoResponse)
    } else if (!devtoArticleId) {
      configurer.writeToIndividualPostConfConf('devtoArticleId', devtoResponse.id)
      console.log('Published your new article on dev.to! 🎉🎉🎉') 
    } else if (devtoArticleId) {
      console.log('Successfully updated your dev.to article.👍')
    }
  }
}