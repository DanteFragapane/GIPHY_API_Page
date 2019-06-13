let topics = ['aviation', 'airplane', 'plane', 'boeing', 'airbus', 'b737', 'a380', 'takeoff', 'rocket', 'spacex', 'tesla']

const initializeButtons = function initializeButtons(topicArray) {
  $('#topics').html('')
  topicArray.forEach((topic) => {
    console.log(topic)
  })
}

const addTopic = function addTopic(topicName, topics) {
  if(!topics.includes(topicName)) {
    topics.push(topicName)
  } else return false
}

initializeButtons(topics)

$('form').on('submit', (event) => {
  event.preventDefault()

  const topicName = $('#topicName').val().trim().toLowerCase()
  addTopic(topicName, topics)
  initializeButtons(topics)
})
