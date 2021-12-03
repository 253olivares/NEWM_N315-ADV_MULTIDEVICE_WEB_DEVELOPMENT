//this is our model that serves the only function of collecting the page name from the URL and then moving the data needed to the main page.
//our model also incorpurated a call back function that makes sure a extgernal function is runned after the page has properly loaded.
var MODEL = (function () {
  var _changeContent = function (page, callback) {
    $.get(`pages/${page}/${page}.html`, function (data) {
      $("#app").html(data);
      if (callback) {
        callback(page);
      }
    });
  };
  return { changeContent: _changeContent };
})();
