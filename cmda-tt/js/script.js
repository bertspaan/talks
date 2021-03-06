Reveal.initialize({
  controls: false,
  progress: false,
  history: true,
  center: true,
  transition: 'fade',
  width: 1280,
  height: 800,
  dependencies: [
    { src:
      'js/highlight.js',
      async: true,
      callback: function() {
        hljs.initHighlightingOnLoad()
      }
    }
  ]
})

Reveal.addEventListener('slidechanged', function (event) {
  setCaption(event.indexh, event.currentSlide)
})

function shuffle (str) {
  var chars = str.split('')

  for(var i = chars.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1))
    var tmp = chars[i]
    chars[i] = chars[j]
    chars[j] = tmp
  }

  return chars.join('')
}

function getCurrentIndex () {
  return Reveal.getIndices().h
}

function setCaption (index, slide) {
  var globalCaption = document.getElementById('caption')

  var slideCaption = slide.querySelectorAll('.caption')[0]

  if (!slideCaption) {
    globalCaption.style.visibility = 'hidden'
    return
  } else {
    globalCaption.style.visibility = 'visible'
  }

  var text = slideCaption.textContent.trim()
  var html = slideCaption.innerHTML

  var length = 0

  function step () {
    if (getCurrentIndex() !== index) {
      return
    }

    length += 2

    if (length < text.length) {
      var stepText = text.slice(0, length)
        .split(' ')
        .map(shuffle)
        .join(' ')

      globalCaption.innerHTML = stepText
      window.requestAnimationFrame(step)
    } else {
      globalCaption.innerHTML = html
    }
  }

  window.requestAnimationFrame(step)
}

setCaption(getCurrentIndex(), Reveal.getCurrentSlide())
