var saveBtn = $('.saveBtn')
var displayDate = $('#currentDay');

// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.

function displayCurrentDate() {
  var today = dayjs().format('dddd, MMMM D');
  displayDate.text(today);
}

var rows = document.getElementsByClassName("row");
let currentHour = parseInt(dayjs().format('H'));

Array.from(rows).forEach(row => {
  let
    rowIdString = row.id,
    rowHour;
  if (rowIdString) {
    rowHour = parseInt(rowIdString);
  }
  if (rowHour) {
    if (currentHour === rowHour) {
      setColor(row, 'red');
    } else if ((currentHour < rowHour) && (currentHour > rowHour - 6)) {
      setColor(row, 'green');
    } else if ((currentHour > rowHour) && (currentHour < rowHour + 6)) {
      setColor(row, 'lightgrey');
    } else {
      setColor(row, 'lightgrey');
    }
  }
});

function setColor(element, color) {
  element.style.backgroundColor = color;
}

function saveScheduledEventFromStorage() {
  var events = localStorage.getItem('events')
  if (events) {
    events = JSON.parse(events);
  } else {
    events = [];
  }
  return events;
}

function saveScheduledEventToStorage(events) {

  localStorage.setItem('events', JSON.stringify(events));
}

function printEvents() {
  for(
    let i = 9; i < 18; i++ 
  ) {
    var savedItem = localStorage.getItem(i)
    $('#' + i).children('textarea').val(savedItem)
  }
}

function deleteEvent() {
  var eventsIndex = parseInt($(this).attr('data-index'));
  var events = saveScheduledEventFromStorage();
  events.splice(eventsIndex, 1);
  saveScheduledEventFromStorage(events);
  printEvents();
}

function handleEventsFormSubmit(event) {
  event.preventDefault();
  console.log($(event.target).parents('.row').first().children('textarea').val());
  var value = $(event.target).parents('.row').first().children('textarea').val();
  var time = $(this).parent().attr('id');
  console.log(time, value);
  localStorage.setItem(time, value);
  printEvents();
  var events = saveScheduledEventFromStorage();
  events.push(value, time);
  saveScheduledEventToStorage(events);
}

saveBtn.on('click', handleEventsFormSubmit);

displayCurrentDate();

printEvents();

