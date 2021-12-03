var MODEL = (function () {
  var _changeContent = function (page) {
    $.get(`pages/${page}/${page}.html`, function (data) {
      let butnPlace = page + "Btn";
      console.log(butnPlace);
      $("#app").html(data);
    });
  };
  return { changeContent: _changeContent };
})();
