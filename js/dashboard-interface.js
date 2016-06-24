var getRecentTransactions = require('./../js/firebase.js').getRecentTransactions;
var setProgress = require('./../js/firebase.js').setProgress;
var ProgressBar = require('progressbar.js');



var barInit = function(width, userBudget) {
  $("#barcreated").val("true");
  var bar = new ProgressBar.SemiCircle(progress_bar, {
    strokeWidth: 6,
    color: '#FFEA82',
    trailColor: '#eee',
    trailWidth: 1,
    easing: 'easeInOut',
    duration: 1400,
    svgStyle: null,
    text: {
      value: '0',
      alignToBottom: false
    },
    from: {color: '#FFEA82'},
    to: {color: '#ED6A5A'},

    // Set default step function for all animate calls
    step: function(state, bar)  {
      bar.path.setAttribute('stroke', state.color);
      var value = Math.round(bar.value() * 100);
      if (value === 0) {
        bar.setText('');
      } else {
        bar.setText(value + '% of $' + parseInt(userBudget));
      }

      bar.text.style.color = state.color;
    }
  });
  bar.text.style.fontFamily = '"Raleway", Helvetica, sans-serif';
  bar.text.style.fontSize = '2rem';

  bar.animate(width);
}
