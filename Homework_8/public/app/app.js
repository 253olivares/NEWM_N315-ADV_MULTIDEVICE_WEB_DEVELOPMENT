var localNameSave = "Name";
let ingredientNum = 4;
let instructionNum = 4;

// function loadEditRecipes() {}

function loadPublicRecipes() {
  $(".browseSection__display").empty();
  $.getJSON("data/data.json", function (recipes) {
    console.log(recipes);
    $.each(recipes.PUBLIC_RECIPES, function (index, recipe) {
      let displayRecipes = "";
      if (recipe.hour == 0) {
        displayRecipes = `
      <div class="recipe">
            <div class="recipe__image recipe--${recipe.image}">

            </div>
            <div class="recipe__description">
                <div class="hold">
                    <h1>${recipe.name}</h1>
                    <hr>
                    <p>${recipe.description}</p>
                    <div class="time">
                        <img src="images/time.svg" alt="">
                        <div class="showingTime"><span>${recipe.min}</span>min</div>
                    </div>
                    <div class="servings">
                        <img src="images/servings.svg" alt="">
                        <div class="showingServing"><span>${recipe.servings}</span> servings</div>
                    </div>
                </div>
            </div>
        </div>
      `;
      } else {
        displayRecipes = `
        <div class="recipe">
              <div class="recipe__image recipe--${recipe.image}">
  
              </div>
              <div class="recipe__description">
                  <div class="hold">
                      <h1>${recipe.name}</h1>
                      <hr>
                      <p>${recipe.description}</p>
                      <div class="time">
                          <img src="images/time.svg" alt="">
                          <div class="showingTime"><span>${recipe.hour}</span>h <span>${recipe.min}</span>min</div>
                      </div>
                      <div class="servings">
                          <img src="images/servings.svg" alt="">
                          <div class="showingServing"><span>${recipe.servings}</span> servings</div>
                      </div>
                  </div>
              </div>
          </div>
        `;
      }
      $(".browseSection__display").append(displayRecipes);
    });
  }).fail(function (jqxhr, textStatus, error) {
    console.log(jqxhr + " text " + textStatus + " " + error);
  });
}

function loadUserRecipes() {
  $(".browseSection__display").empty();
  $.getJSON("data/data.json", function (recipes) {
    console.log(recipes);
    $.each(recipes.USER_RECIPES, function (index, recipe) {
      let displayRecipes = "";
      if (recipe.hour == 0) {
        displayRecipes = `
      <div class="recipe">
            <div class="recipe__image recipe--${recipe.image}">

            </div>
            <div class="recipe__description">
                <div class="hold">
                    <h1>${recipe.name}</h1>
                    <hr>
                    <p>${recipe.description}</p>
                    <div class="time">
                        <img src="images/time.svg" alt="">
                        <div class="showingTime"><span>${recipe.min}</span>min</div>
                    </div>
                    <div class="servings">
                        <img src="images/servings.svg" alt="">
                        <div class="showingServing"><span>${recipe.servings}</span> servings</div>
                    </div>
                </div>
            </div>
        </div>
      `;
      } else {
        displayRecipes = `
        <div class="recipe">
              <div class="recipe__image recipe--${recipe.image}">
  
              </div>
              <div class="recipe__description">
                  <div class="hold">
                      <h1>${recipe.name}</h1>
                      <hr>
                      <p>${recipe.description}</p>
                      <div class="time">
                          <img src="images/time.svg" alt="">
                          <div class="showingTime"><span>${recipe.hour}</span>h <span>${recipe.min}</span>min</div>
                      </div>
                      <div class="servings">
                          <img src="images/servings.svg" alt="">
                          <div class="showingServing"><span>${recipe.servings}</span> servings</div>
                      </div>
                  </div>
              </div>
          </div>
        `;
      }
      $(".browseSection__display").append(displayRecipes);
    });
  }).fail(function (jqxhr, textStatus, error) {
    console.log(jqxhr + " text " + textStatus + " " + error);
  });
}

function loaduserName() {
  console.log("loadUserName Test");
  $(".recipeUsername").html(localNameSave);
}

function afterRoute(pageID) {
  console.log("Big Test!");
  if (pageID == "browse") {
    loadPublicRecipes();
  } else if (pageID == "recipes") {
    loaduserName();
    // loadUserRecipes();
  } else if (pageID == "create") {
    loaduserName();
  }
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
function checkMenu() {
  let menu = "close";
  $(".mobile-menu").click(function (e) {
    if (menu == "close") {
      $(".hiddenNav").css("top", "0");
      $(".mobile-menu").css("display", "none");
      menu = "open";
    } else {
      $(".hiddenNav").css("top", "-100%");
      $(".mobile-menu").css("display", "flex");
      menu = "close";
    }
  });
  $(".removeButton").click(function (e) {
    if (menu == "close") {
      $(".hiddenNav").css("top", "0");
      $(".mobile-menu").css("display", "none");
      menu = "open";
    } else {
      $(".hiddenNav").css("top", "-100%");
      $(".mobile-menu").css("display", "flex");
      menu = "close";
    }
  });
}

function checkHash() {
  $(window).on("hashchange", route);
  route();
}

function initFirebase() {
  firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
      var displayName = user.displayName;
      var email = user.email;
      var emailVerified = user.emailVerified;
      var isAnonymous = user.isAnonymous;
      var uid = user.uid;
      localNameSave = displayName;
      console.log("connected");
      $(".loginBtn").css("display", "none");
      $(".logoutBtn").css("display", "block");
      $(".createBtn").css("display", "block");
      $(".recipesBtn").css("display", "block");
      $(".yourMobile").css("display", "block");
      $(".loginMobile").css("display", "none");
      $(".logoutMobile").css("display", "block");
      $(".recipeMobile").css("display", "block");
      $(".recipeUsername").html(localNameSave);
      // MODEL.changeContent("home");
      // MODEL.changeContent("home");
    } else {
      console.log("logged out");
      $(".logoutBtn").css("display", "none");
      $(".loginBtn").css("display", "block");
      $(".recipesBtn").css("display", "none");
      $(".createBtn").css("display", "none");
      $(".loginMobile").css("display", "block");
      $(".logoutMobile").css("display", "none");
      $(".yourMobile").css("display", "none");
      $(".recipeMobile").css("display", "none");
      localNameSave = "";
    }
  });
}

function updateUser(disName) {
  firebase.auth().currentUser.updateProfile({
    displayName: disName,
  });
}

function createUser() {
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
      localNameSave = fullName;
      var user = userCredential.user;
      console.log(userCredential.user);
      // ...
    })
    .catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log(errorMessage);
      alert(errorCode + " " + errorMessage);
      // ..
    });
}

function login() {
  let email = $("#email").val();
  let password = $("#password").val();

  firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then((userCredential) => {
      // Signed in
      var user = userCredential.user;
      $("#email").val("");
      $("#password").val("");
      // ...
    })
    .catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log(errorMessage);
      alert(errorCode + " " + errorMessage);
    });
  MODEL.changeContent("home");
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
      alert(error);
      // An error happened.
    });
}

function addIngredient() {
  let ingredientInput = `
  <input type="text" class="ing${ingredientNum}" placeholder="Ingredient #${ingredientNum}">
  `;
  $(".ingredients").append(ingredientInput);
  ingredientNum++;
}

function addInstructions() {
  let instructionsInput = `
  <input type="text" class="ins${instructionNum}" placeholder="Instructions #${instructionNum}">
  `;
  $(".instructions").append(instructionsInput);
  instructionNum++;
}

function initListeners(btnID) {
  console.log("runFunction");
  // e.preventDefault();
  // let btnID = e.currentTarget.id;
  console.log(btnID);
  if (btnID == "create") {
    createUser();
  } else if (btnID == "login") {
    login();
  } else if (btnID == "signout" || "signout2") {
    signOut();
  }
}

$(document).ready(function () {
  console.log(
    "Page functions have loaded! checkHash() function has begun running!"
  );
  $("#login").click(function (event) {
    event.preventDefault();
  });
  try {
    let app = firebase.app();
    initFirebase();
    checkHash();
    checkMenu();
  } catch (e) {
    console.error(e);
    alert(e);
  }
});
