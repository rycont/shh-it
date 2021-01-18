// 소스 가져오기

const url = '/src/background/'
const files = ['webfont.js', 'tracker.js', 'jquery.min.js']

Promise.all(
    files.map(filename =>
        fetch(chrome.extension.getURL(url + filename)).then(res => res.text())
    )
).then(([ webfont, tracker, jquery ]) => {
    window.webfont = webfont
    window.tracker = tracker
    window.jquery = jquery
})
