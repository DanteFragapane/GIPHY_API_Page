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