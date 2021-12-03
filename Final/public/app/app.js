var currentPage = "";
function checkHash() {
  $(window).on("hashchange", route);
  route();
}

function route() {
  let hashTag = window.location.hash;
  let pageID = hashTag.replace("#/", "");

  if (!pageID) {
    MODEL.changeContent("home");
  } else {
    MODEL.changeContent(pageID, afterRoute);
  }
}
function afterRoute() {
  console.log("test");
}

$(document).ready(function () {
  //   $.getJSON("data/data.json", function (recipes) {
  //     recipePage = recipes.USER_RECIPES;
  //     console.log(recipePage);
  //   });
  console.log(
    "Page functions have loaded! checkHas() function has begun Running!"
  );
  try {
    // let app = firebase.app();
    // initFirebase();
    checkHash();
    // checkMenu();
  } catch (e) {
    console.error(e);
    alert(e);
  }
});
