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
  $('#topics').append(buttons)
}

// Adds the given topic to the given topics array
const addTopic = function addTopic(topicName, topics) {
  if (!topics.includes(topicName)) {
    topics.push(topicName)
    return topics
  } else return false
}

// Make the AJAX call
const getGifs = function getGifs(topicName) {
  const params = {
    api_key: apiKey,
    q: topicName,
    limit: 10,
    offset: 0,
    rating: 'g',
    lang: 'en'
  }
  $.ajax({
    url: url + $.param(params),
    method: 'GET'
  }).then((response) => {
    setGifs(response)
  })
}

// Put the gifs on the page
const setGifs = function setGifs(response) {
  $('#gifs').html('')
  response.data.forEach((gif) => {
    const div = $('<div>', {
      class: 'gif',
      'data-state': 'still',
      'data-still': gif.images.fixed_height_still.url,
      'data-animate': gif.images.fixed_height.url
    })
    div.append($('<h3>', {
      text: 'Rating: ' + gif.rating
    }))
    div.append($('<img>', {
      src: gif.images.fixed_height_still.url
    }))
    $('#gifs').append(div)
  })
}

// ======================
// Logic
// ======================

initializeButtons(topics)

// On submit of the form
$('form').on('submit', (event) => {
  event.preventDefault()

  const topicName = $('#topicName').val().trim().toLowerCase()
  let topicBool = addTopic(topicName, topics) // This variable will hold either the array of topics, OR will be "false"
  if (topicBool !== false) {
    topics = topicBool
    initializeButtons(topics)
  }
})

$('#topics').on('click', '.topicButton', function (event) {
  const topicName = $(this).attr('id')
  getGifs(topicName)
})

// Handling the clicking of the gif and the animation state
$('#gifs').on('click', '.gif', function (event) {
  if ($(this).attr('data-state') === 'still') {
    const animUrl = $(this).attr('data-animate')
    $(this).children().attr('src', animUrl)
    $(this).attr('data-state', 'animate')
  } else {
    const stillUrl = $(this).attr('data-still')
    $(this).children().attr('src', stillUrl)
    $(this).attr('data-state', 'still')
  }
})