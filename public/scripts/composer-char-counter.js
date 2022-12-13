$(document).ready(function() {
  $("#tweet-text").on("input", function () {
    const maxChar = 140;
    const inputCharLength = $(this).val().length;
    const charCounter = maxChar - inputCharLength;

    const $counterElement = $(this).next().find(".counter");

    $counterElement.text(charCounter);

    const tooManyChar = charCounter < 0;
    if (tooManyChar) {
      $counterElement.css('color', 'red');
    } else {
      $counterElement.css('color', '#292929');
    }
  });
});