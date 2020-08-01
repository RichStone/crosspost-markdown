const files = require('./files')
const errorMessages = require('./messagesError')
const configurer = require('./configurer')

module.exports = {
  post: async (markdown, meta) => {
    if (meta.canonicalUrl === '') throw "🚨 Can't upload to dev.to: Canonical URL \
is not yet set, this means you have not yet pushed your article with CrossPost \
to webflow. If you do not wish to post your article to webflow, you will need \
to specify the --canonical-url option. 🚨"
    async function post() {
      const data = {
        "article": {
          "title": meta.title,
          "published": false,
          "body_markdown": markdown,
          "tags": [
            "discuss",
            "help"
          ],
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
      });
      let json = await response.json()

      return json;
    }

    return await post()
  },

  publish: async (articlePath) => {
    let meta = {}

    // get markdown
    let markdown = await files.getFile(articlePath)

    // set meta title
    const markdownTitleGetter = require("get-title-markdown")
    meta.title = markdownTitleGetter(markdown)

    // set meta canonical URL
    meta.canonicalUrl = configurer.getCanonicalUrl(articlePath)

    // remove the title to avoid duplicating in body
    // (setting the title happens in the API request)
    markdown = await files.removeFirstLine(markdown)
    
    try {
      const devtoResponse = await module.exports.post(markdown, meta)
      
      if (devtoResponse.status < 200 || devtoResponse.status > 299) {
        errorMessages.devto(devtoResponse)
      } else {
        console.log('Published on dev.to! 🎉🎉🎉') 
      }
    } catch (e) {
      console.log(e)
    }
  }
}