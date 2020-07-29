const config = require('../crosspostConf.json')
const files = require('./files')
const errorMessages = require('./messagesError')
const configurer = require('./configurer')

module.exports = {
  post: async (markdown) => {
    const canonicalUrl = config.canonicalUrl

    if (canonicalUrl === '') throw "🚨 Can't upload to dev.to: Canonical URL \
is not yet set, this means you have not yet pushed your article with CrossPost \
to webflow. If you do not wish to post your article to webflow, you will need \
to specify the --canonical-url option. 🚨"

    async function post() {
      const data = {
        "article": {
          "title": config.title,
          "published": !config.isDraft,
          "body_markdown": markdown,
          "tags": [
            "discuss",
            "help"
          ],
          "series": "Hello series",
          "canonical_url": config.canonicalUrl
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
    let markdown = await files.getFile(articlePath)
    // the title get set from the config, remove the title to avoid duplicating
    // it in the article's body
    markdown = await files.removeFirstLine(markdown)
    
    try {
      const devtoResponse = await module.exports.post(markdown)
      
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