
var totalCopies = 0;

var initialOptionCount = getURLParameter('opt');
if (!initialOptionCount) {
  initialOptionCount = Math.random() * 33 | 0 + 10; // Default is 43 if no count specified
}

totalCopies = initialOptionCount;

/* SET UP DROPDOWN */
$('document').ready(function() {

  updateCount();

  var previousNumber = 0;
  for (var i = 1; i <= initialOptionCount; i++) {
    var printNumber = previousNumber + 1 + i * (Math.random() * 30 | 0);
    previousNumber = printNumber;

    var optionHTML = '<option value="' + i + '">#' + printNumber + '</option>';
    document.getElementById('print-number-selector').innerHTML += optionHTML;
  }

});


function updateCount() {
  var text = ' You own ' + totalCopies + ' copies';
  document.getElementById('copy-count-text').innerHTML = text;
}

/* Destroy Button */

const destroyDuration = 1000;

var destroyTimer;
var previousUpdateTime = 0;
var destroyTimeElapsed = 0;

function beginDestroyTimer() {

  var btnwidth = document.getElementById('destroy-btn').offsetWidth;

  destroyTimeElapsed = 0;

  destroyTimer = setInterval(function() {

    var dateNow = (new Date).getTime();
    deltaTime = (previousUpdateTime == 0) ? 0 : dateNow - previousUpdateTime;
    previousUpdateTime = dateNow;

    destroyTimeElapsed += deltaTime;
    if (destroyTimeElapsed > destroyDuration) {

      removeSelectedCopy();

    } else {
      // Tick progress bar
      var progress = destroyTimeElapsed / destroyDuration;
      var barWidth = btnwidth * progress;
      document.getElementById('destroy-btn').style.background = "linear-gradient(to right, #929091 " + barWidth + "px, rgba(0, 0, 0, 0) 0px)";
    }
  }, 10);
}

function removeSelectedCopy() {

  var dropdown = document.getElementById('print-number-selector');
  var value = dropdown.options[dropdown.selectedIndex].value;

  // Select next option or previous option (if at the end of list)
  dropdown.selectedIndex = (dropdown.selectedIndex == dropdown.options.length - 1) ?
    dropdown.selectedIndex - 1 :
    dropdown.selectedIndex + 1;

  $("#print-number-selector option[value='" + value + "']").remove();
  updateCount();
  
  cancelDestroyTimer(false);
}

function cancelDestroyTimer(isAbort) {

  clearInterval(destroyTimer);
  previousUpdateTime = 0;
  destroyTimeElapsed = 0;

  if (isAbort) {
    document.getElementById('destroy-btn').style.background = "";
  } else {
    document.getElementById('destroy-btn').style.background = "#ddd";
    setTimeout(function() {
      document.getElementById('destroy-btn').style.background = ""; // "#929091";
    }, 100);  
  }
}