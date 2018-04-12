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
      code: 'if (typeof ($((([].slice.call(document.querySelectorAll(".bg-red"))).filter(function (error) {return (error.innerHTML === " Test " || error.innerHTML === "ERRORS!")}))[' + clickCount + '])).offset() === "undefined") {console.log("knock knock, who is there, no more errors, no more errors who, no more errors you like monkeys")} else {$("html, body").animate({scrollTop: $((([].slice.call(document.querySelectorAll(".bg-red"))).filter(function (error) {return (error.innerHTML === " Test " || error.innerHTML === "ERRORS!")}))[' + clickCount + ']).offset().top},500)}'
    })
  })
}

function scrollToErrorCode (clickCount) {
  chrome.tabs.executeScript(null, {file: 'jquery.js'}, function () {
    chrome.tabs.executeScript({
      code: 'if (typeof ($((([].slice.call(document.querySelectorAll("span"))).filter(function (error) { return (error.innerHTML.search(/exited with [^0]/i) !== -1)}))[' + clickCount + '])).offset() === "undefined") {console.log("knock knock, who is there, no more errors, no more errors who, no more errors you like monkeys")} else {$("html, body").animate({scrollTop: $((([].slice.call(document.querySelectorAll("span"))).filter(function (error) { return (error.innerHTML.search(/exited with [^0]/i) !== -1)}))[' + clickCount + ']).offset().top},500)}'
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
    var toErrorCodeButton = document.getElementById('errorCodeFinder')
    var clickCount = 0
    errorButton.addEventListener('click', () => {
      scrollToError(clickCount)
      clickCount++
    })

    var clickCountErrorCode = 0
    toErrorCodeButton.addEventListener('click', () => {
      scrollToErrorCode(clickCountErrorCode)
      clickCountErrorCode++
    })

    toTopButton.addEventListener('click', () => {
      scrollToTop()
      clickCount = 0
      clickCountErrorCode = 0
    })
  })
})
