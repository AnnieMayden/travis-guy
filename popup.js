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
      code: 'if (typeof ($((([].slice.call(document.querySelectorAll(".bg-red"))).filter(function (error) {return error.innerHTML === " Test "}))[' + clickCount + '])).offset() === "undefined") {console.log("knock knock, who is there, no more errors, no more errors who, no more errors you like monkeys")} else {$("html, body").animate({scrollTop: $((([].slice.call(document.querySelectorAll(".bg-red"))).filter(function (error) {return error.innerHTML === " Test "}))[' + clickCount + ']).offset().top},500)}'
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
      clickCount = 0
    })
  })
})
