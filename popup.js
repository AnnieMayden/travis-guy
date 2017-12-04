function getCurrentTabUrl (callback) {
  var queryInfo = {
    active: true,
    currentWindow: true
  }
  chrome.tabs.query(queryInfo, (tabs) => {
    var tab = tabs[0]
    var url = tab.url

    console.assert(typeof url === 'string', 'tab.url should be a string')

    callback(url)
  })
}

function scrollToError (clickCount) {
  chrome.tabs.executeScript(null, {file: 'jquery.js'}, function () {
    chrome.tabs.executeScript({
      code: '$("html, body").animate({scrollTop: ($(".bg-red").eq(' + clickCount + ').next().offset().top)},500)'
    })
  })
}

function scrollToTop () {
  chrome.tabs.executeScript(null, {file: 'jquery.js'}, function () {
    chrome.tabs.executeScript({
      code: '$("html, body").animate({scrollTop: "0px"}, 300)'
    })
  })
}

document.addEventListener('DOMContentLoaded', () => {
  getCurrentTabUrl((url) => {
    var errorButton = document.getElementById('errorFinder')
    var toTopButton = document.getElementById('toTop')
    var clickCount = 0
    errorButton.addEventListener('click', () => {
      scrollToError(clickCount)
      clickCount++
    })

    toTopButton.addEventListener('click', () => {
      scrollToTop()
    })
  })
})
