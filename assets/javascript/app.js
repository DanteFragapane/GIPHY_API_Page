const apiKey = 'WN9A4uzTEES50sNrEA7pwivxsuuYG5Zc'
const url = 'https://api.giphy.com/v1/gifs/search?'

let topics = ['aviation', 'airplane', 'plane', 'boeing', 'airbus', 'b737', 'a380', 'takeoff', 'rocket', 'spacex', 'tesla']

// ======================
// Functions
// ======================
// Initializes the topicArray as buttons on the page
const initializeButtons = function initializeButtons(topicArray) {
  $('#topics').html('')
  let buttons = $('<div>', {
    id: 'buttonList'
  })
  topicArray.forEach((topic) => {
    let button = $('<button>', {
      class: 'topicButton',
      id: topic,
      text: topic
    })
    buttons.append(button)
  })
  console.log(buttons)
  $('#topics').append(buttons)
}

// Adds the given topic to the given topics array
const addTopic = function addTopic(topicName, topics) {
  if (!topics.includes(topicName)) {
    topics.push(topicName)
  } else return false
}

// Make the AJAX call
const getGifs = function getGifs(topicName) {
  const params = {
    api_key: apiKey,
    q: topicName,
    limit: 25,
    offset: 0,
    rating: 'g',
    lang: 'en'
  }
  console.log($.param(params))
  const ajax = $.ajax({
    url: url + $.param(params),
    method: 'GET'
  }).then((response) => {
    return response
  })
}
// ======================

// ======================
// Logic
// ======================

initializeButtons(topics)

// On submit of the form
$('form').on('submit', (event) => {
  event.preventDefault()

  const topicName = $('#topicName').val().trim().toLowerCase()
  addTopic(topicName, topics)
  initializeButtons(topics)
})

$('.topicButton').on('click', function (event) {
  console.log($(this))
  const topicName = $(this).attr('id')
  getGifs(topicName)
})
