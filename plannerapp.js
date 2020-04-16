var currTimeInHours;
var timeBlocks = ["9AM", "10AM", "11AM", "12PM", "1PM", "2PM", "3PM", "4PM"];
var matchedTime = false;
var m = moment(); // current date and time using moment js
var currDate = m.format("MMMDoYYYY");

var daySchedulerObj = {};
daySchedulerObj[currDate] = {
  "9AM": "",
  "10AM": "",
  "11AM": "",
  "12PM": "",
  "1PM": "",
  "2PM": "",
  "3PM": "",
  "4PM": "",
};

$(document).ready(function () {
  $("#dateVal").html(m.format("dddd Do MMMM, YYYY").toString());

  currTimeInHours = m.format("hA");
  // currTimeInHours = "8PM";
  // pull the data from localStorage
  var obj = JSON.parse(localStorage.getItem(currDate));

  for (var i = 0; i < timeBlocks.length; i++) {
    //update timeblocks with data
    if (obj != null) {
      $("#" + timeBlocks[i]).val(obj[currDate][timeBlocks[i]]);
    }

    // update timblocks with colors
    if (
      matchedTime ||
      moment.duration(moment().diff(moment().hours(9))).asHours() < 0
    ) {
      $("#" + timeBlocks[i]).css("background", "#d8d85e"); // yellow
    } else {
      // to find out matched time or current time
      if (timeBlocks[i].startsWith(currTimeInHours)) {
        $("#" + timeBlocks[i]).css("background", "#6cdc6c"); // green
        matchedTime = true;
      } else {
        $("#" + timeBlocks[i]).css("background", "#a7a5a5"); // grey
        $("#" + timeBlocks[i]).attr("readonly", true);
      }
    }
  }
});

function saveHourlySchedule(idOfText) {
  var contentOfHour = $("#" + idOfText).val();
  dayObj = daySchedulerObj;
  var dayObj = JSON.parse(localStorage.getItem(currDate));
  if (dayObj == undefined) {
    dayObj = daySchedulerObj;
  }
  dayObj[currDate][idOfText] = contentOfHour;
  localStorage.setItem(currDate, JSON.stringify(dayObj));
}
