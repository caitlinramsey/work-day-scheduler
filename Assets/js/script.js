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

$(function () {
  // TODO: Add a listener for click events on the save button. This code should
  // use the id in the containing time-block as a key to save the user input in
  // local storage. HINT: What does `this` reference in the click listener
  // function? How can DOM traversal be used to get the "hour-x" id of the
  // time-block containing the button that was clicked? How might the id be
  // useful when saving the description in local storage?
  //
  // TODO: Add code to get any user input that was saved in localStorage and set
  // the values of the corresponding textarea elements. HINT: How can the id
  // attribute of each time-block be used to do this?
});

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

  var events = saveScheduledEventFromStorage();

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
  var newEvent = {
    //enter textarea input?
  }
  var events = saveScheduledEventFromStorage();
  projects.push(newEvent);
  saveScheduledEventToStorage(events);
  printEvents();
}

saveBtn.on('click', handleEventsFormSubmit);

displayCurrentDate();

printEvents();

