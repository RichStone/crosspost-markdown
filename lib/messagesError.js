module.exports = {
  webflow: (e) => {
    console.log('')
    console.log('########################################################')
    console.log('🚨There was an error while uploading to webflow🚨')
    console.log('This is what webflow is saying:')
    console.log('Response error code:', e.code)
    console.log('Error message:', e.msg)
    console.log('########################################################')
    console.log('')
    if (e.problems) {
      console.log(e.problems)
      console.log('########################################################')
      console.log('')
    }
    if (!e) {
      console.log('Huh, there is a weird issue. Have you checked your internet connection?')
      console.log('########################################################')
      console.log('')
    }
  },
  devto: (e) => {
    console.log('')
    console.log('########################################################')
    console.log('🚨There was an error while uploading to dev.to🚨')
    console.log('This is what dev.to is saying:')
    console.log('Response error code:', e.status)
    console.log('Error message:', e.error)
    console.log('########################################################')
    console.log('')
  }
}