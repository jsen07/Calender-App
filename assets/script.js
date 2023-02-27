// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.

$( document ).ready(function() {
  console.log( "ready!" );

let now = dayjs();
let currentDate = document.getElementById('currentDay');
currentDate.innerText = now.format('D MMMM YYYY');
let currentTime = document.getElementById('currentTime');
currentTime.innerText = now.format('H:m:s'); //CONVERT THIS TO JQUERY
let taskName;
let taskID;


$('[id^="hour-"]').each(function() { //for each id tht begins with 'hour-'
  let newHour = $(this ).attr('id').replace('hour-', ''); //get the hour in the id
  $(this).attr("timeOfDay", newHour); //sets value attribute to the schedules hour
  let schedHour = parseInt($(this).attr("timeOfDay")); // get schedule hour
  let currentHour = parseInt(now.format('H')); //get current hour

  if (schedHour > currentHour) {
    $(this).addClass("future");
    $(this).removeClass("past");
    $(this).removeClass("present");
  }

  else if (schedHour === currentHour) {
    $(this).addClass("present");
    $(this).removeClass("future");
    $(this).removeClass("past");
  }

  else if (schedHour < currentHour) {
    $(this).addClass("past");
    $(this).removeClass("future");
    $(this).removeClass("present");
  
  }

});

$('[id^="hour-"]').each(function () { //for each div starting with id find button sibling

  $(this).find('button').click(function () {

    var buttonParent = $(this).parent();
     let time = buttonParent.attr("id");
     let toDo = buttonParent.find("textarea").val();

    tasks = {
      time: time,
      do: toDo
    };


    localStorage.setItem(time, JSON.stringify(tasks));

 
  });

  for (var i = 1; i < 24; i++) {
    const tasksToDo = JSON.parse(localStorage.getItem("hour-"+ i));
  if(tasksToDo !== null) {
  if ($(this).attr('id') === tasksToDo.time) {
    $(this).find("textarea").val(tasksToDo.do);

  }
 }
  }
});


$(function () {
  // TODO: Add a listener for click events on the save button. This code should
  // use the id in the containing time-block as a key to save the user input in
  // local storage. HINT: What does `this` reference in the click listener
  // function? How can DOM traversal be used to get the "hour-x" id of the
  // time-block containing the button that was clicked? How might the id be
  // useful when saving the description in local storage?
  //
  // TODO: Add code to apply the past, present, or future class to each time
  // block by comparing the id to the current hour. HINTS: How can the id
  // attribute of each time-block be used to conditionally add or remove the
  // past, present, and future classes? How can Day.js be used to get the
  // current hour in 24-hour time?
  //
  // TODO: Add code to get any user input that was saved in localStorage and set
  // the values of the corresponding textarea elements. HINT: How can the id
  // attribute of each time-block be used to do this?
  //
  // TODO: Add code to display the current date in the header of the page.
});
});
