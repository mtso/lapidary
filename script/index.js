
// CONFIG

const destroyDuration = 1000;


var totalCopies = 0;
var mineralTotal = 343 * Math.random() | 0 + 200;

var initialOptionCount = getURLParameter('opt');
if (!initialOptionCount) {
  initialOptionCount = Math.random() * 33 | 0 + 10; // Default is 43 if no count specified
}

totalCopies = initialOptionCount;


$('document').ready(function() {

  updateCopyCount();
  updateMineralCount();

  /* SET UP DROPDOWN */
  var previousNumber = 0;
  for (var i = 1; i <= initialOptionCount; i++) {
    var printNumber = previousNumber + 1 + i * (Math.random() * 30 | 0);
    previousNumber = printNumber;

    var optionHTML = '<option value="' + i + '">#' + printNumber + '</option>';
    document.getElementById('print-number-selector').innerHTML += optionHTML;
  }

  /* SET UP FLIP */
  $(function(){
    $("#card-first").flip({
      axis: "y",
      // reverse: false,
      trigger: "manual",
      speed: '250',
      // autoSize: false
    });
  });


});


function updateCopyCount() {

  var text = ' You own ' + totalCopies + ' copies';

  if (totalCopies < 1) {
    // No more copies!

    text = ' You own 0 copies';

    document.getElementById('destroy-btn').disabled = true;
    document.getElementById('destroy-btn').style.opacity = '0.3';
    document.getElementById('card-image').src = 'img/blurred-front-grayscale.png';
    document.getElementById('dropdown-icon').style.opacity = '0';
    $('#print-number-selector').hide();
  }

  document.getElementById('copy-count-text').innerHTML = text;
}

function updateMineralCount() {
  document.getElementById('mineral-total').innerHTML = mineralTotal;
}

/* Destroy Button */


var destroyTimer;
var previousUpdateTime = 0;
var destroyTimeElapsed = 0;

function beginDestroyTimer() {

  $("#card-first").flip(true);

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

  // MINERALIZE the card
  $('#disappearing-div').trigger('mineralize', ['mineralize', function() {
    
    var dropdown = document.getElementById('print-number-selector');
    var value = dropdown.options[dropdown.selectedIndex].value;

    // Select next option or previous option (if at the end of list)
    dropdown.selectedIndex = (dropdown.selectedIndex == dropdown.options.length - 1) ?
      dropdown.selectedIndex - 1 :
      dropdown.selectedIndex + 1;

    $("#print-number-selector option[value='" + value + "']").remove();
    totalCopies -= 1;
    updateCopyCount();

    mineralTotal += 1;
    updateMineralCount();
    
    cancelDestroyTimer(false);
  }]);


  // var dropdown = document.getElementById('print-number-selector');
  // var value = dropdown.options[dropdown.selectedIndex].value;

  // // Select next option or previous option (if at the end of list)
  // dropdown.selectedIndex = (dropdown.selectedIndex == dropdown.options.length - 1) ?
  //   dropdown.selectedIndex - 1 :
  //   dropdown.selectedIndex + 1;

  // $("#print-number-selector option[value='" + value + "']").remove();
  // totalCopies -= 1;
  // updateCopyCount();

  // mineralTotal += 1;
  // updateMineralCount();
  
  // cancelDestroyTimer(false);
}

function cancelDestroyTimer(isAbort) {

  $("#card-first").flip(false);

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