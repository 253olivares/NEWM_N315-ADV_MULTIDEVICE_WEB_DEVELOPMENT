var loggedIn = false;

var User = {
  firstname: "Todd",
  lastname: "Shelton",
  email: "t@gt.com",
};

var fullName = "";

// var RECIPES = [
//   {
//     recipeName: "Pot Roast",
//   },
//   {
//     recipeName: "Hamburger",
//   },
//   {
//     recipeName: "Chicken Pot Pie",
//   },
//   {
//     recipeName: "Chicken Critters",
//   },
// ];

function loop() {
  // for (let i = 0; i < RECIPES.length; i++) {

  // }
  // console.log("RECIPES: ", RECIPES[i].recipeName);

  $.getJSON("data/data.json", function (recipes) {
    console.log(recipes);
    $.each(recipes.USER_RECIPES, function (index, recipe) {
      console.log("recipe " + index + " " + recipe.recipeName);
    });

    $.each(recipes.PUBLIC_RECIPES, function (index, recipe) {
      console.log("public recipe " + index + " " + recipe.recipeName);
      $("#app").append(`<p>${recipe.recipeName}</p>`);
    });
  }).fail(function (jqxhr, textStatus, error) {
    console.log(jqxhr + " text " + textStatus + " " + error);
  });

  // $.each(RECIPES, function (index, recipe) {
  //   console.log(index);
  //   console.log(recipe);
  //   // console.log("recipe " + recipe.recipeName);
  // }).fail(function (error) {
  //   console.log(error);
  // });
}
function loadUserRecipe() {
  $("#app").empty();
  $.getJSON("data/data.json", function (recipes) {
    console.log(recipes);
    $.each(recipes.USER_RECIPES, function (index, recipe) {
      console.log("recipe " + index + " " + recipe.recipeName);
      $("#app").append(`<p>${recipe.recipeName}</p>`);
    });
  }).fail(function (jqxhr, textStatus, error) {
    console.log(jqxhr + " text " + textStatus + " " + error);
  });
}

function loadPublicRecipe() {
  $("#app").empty();
  $.getJSON("data/data.json", function (recipes) {
    console.log(recipes);
    $.each(recipes.PUBLIC_RECIPES, function (index, recipe) {
      console.log("public recipe " + index + " " + recipe.recipeName);
      $("#app").append(`<p>${recipe.recipeName}</p>`);
    });
  }).fail(function (jqxhr, textStatus, error) {
    console.log(jqxhr + " text " + textStatus + " " + error);
  });
}

function initFirebase() {
  firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
      // console.log("connected");
      // $("pName").css("display", "block");
      loggedIn = true;
      console.log("Connected ", user);
      firebase
        .auth()
        .currentUser.updateProfile({
          displayName: fullName,
        })
        .then(() => {
          console.log("Update Successdul");
          updateSiteWithInfo();
        });
      $("pName").css("display", "block");
      $("pName").html(user.email);
      loadUserRecipe();
    } else {
      loggedIn = false;
      console.log("user is not there");
      $("pName").css("display", "none");
      loadPublicRecipe();
    }
  });
  // .signInAnonymously()
  // .then(() => {
  //     console.log("signed in");
  // })
  // .catch((error) => {
  //     var errorCode = error.code;
  //     var errorMessage = error.message;
  //     _db = [];
  // });
}

function updateSiteWithInfo() {
  let user = firebase.auth().currentUser;
}

function updateUser(disName) {
  firebase.auth().currentUser.updateProfile({
    displayName: disName,
  });
}

function createUser() {
  // let username;
  let fName = $("#fName").val();
  let lName = $("#lName").val();
  let email = $("#emailSignUp").val();
  let password = $("#passSignup").val();

  firebase
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .then((userCredential) => {
      // Signed in
      let fullName = fName + " " + lName;
      updateUser(fullName);

      $("#fName").val("");
      $("#lName").val("");
      $("#emailSignUp").val("");
      $("#passSignup").val("");

      var user = userCredential.user;
      console.log(userCredential.user);
      // ...
    })
    .catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log(errorMessage);
      // ..
    });
}

function login() {
  // let username;
  let password = "testurmom"; //$("#password").val();
  let email = "test@gmail.com";
  let firstName = "Miguel";
  let lastName = "Olivares";
  fullName = firstName + " " + lastName;

  firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then((userCredential) => {
      // Signed in
      var user = userCredential.user;
      console.log("signed in");
      // ...
    })
    .catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log(errorMessage);
    });
}

function signOut() {
  firebase
    .auth()
    .signOut()
    .then(() => {
      console.log("Signed Out");
    })
    .catch((error) => {
      console.log(error);
      // An error happened.
    });
}

function initListeners() {
  $(".inListen").click(function (e) {
    e.preventDefault();
    let btnID = e.currentTarget.id;
    if (btnID == "create") {
      createUser();
    } else if (btnID == "login") {
      login();
    } else if (btnID == "signout") {
      signOut();
    }
  });
}

$(document).ready(function () {
  try {
    let app = firebase.app();
    initFirebase();
    initListeners();
    // loop();
  } catch (e) {
    console.error(e);
  }
});
