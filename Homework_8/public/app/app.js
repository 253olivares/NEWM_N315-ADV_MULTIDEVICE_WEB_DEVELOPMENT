var localNameSave = "Name";
var createID = 1;
let ingredientNum = 4;
let instructionNum = 4;
let recipeSelected = 5;
let editRecipe = 6;
var recipePage = [];

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
  $.each(recipePage, function (index, recipe) {
    let displayRecipes = "";
    if (recipe.hour == 0) {
      displayRecipes = `
        <div class="recipe_hold">
        <div class="recipe">
            <div class="recipe__image recipe--${recipe.image}">
                <button title="viewButton" class="viewIngredient" recipeId ="${recipe.id}">View</button>
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
        <div class="buttonFunction">
            <button title="editButton" class="editRecipe" recipeId="${recipe.id}">Edit Recipe</button>
            <button title="deleteButton" class="deleteRecipe" recipeId="${recipe.id}">Delete</button>
        </div>
    </div>
      `;
    } else {
      displayRecipes = `
        <div class="recipe_hold">
            <div class="recipe">
                <div class="recipe__image recipe--${recipe.image}">
                    <button title="viewButton" class="viewIngredient" recipeId ="${recipe.id}">View</button>
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
            <div class="buttonFunction">
                <button title="editButton" class="editRecipe" recipeId="${recipe.id}" onclick="editListener(${recipe.id})">Edit Recipe</button>
                <button title="deleteButton" class="deleteRecipe" recipeId="${recipe.id}"  onclick="deleteListener(${recipe.id})">Delete</button>
            </div>
        </div>
        `;
    }
    $(".recipeSection__display ").append(displayRecipes);
    loadSelectedRecipe();
  });
}

function deleteListener(x) {
  recipePage.splice(x, 1);
  MODEL.changeContent("recipes", afterRoute);
}

function loaduserName() {
  console.log("loadUserName Test");
  $(".recipeUsername").html(localNameSave);
}

function loadSelectedRecipe() {
  $(".viewIngredient").on("click", function () {
    console.log("click");
    recipeSelected = $(this).attr("recipeid");
    MODEL.changeContent("view", afterRoute);
  });
}

function afterRoute(pageID) {
  console.log("Big Test!");
  if (pageID == "browse") {
    loadPublicRecipes();
  } else if (pageID == "recipes") {
    loaduserName();
    loadUserRecipes();
  } else if (pageID == "create") {
    loaduserName();
  } else if (pageID == "view") {
    loadView(recipeSelected);
  } else if (pageID == "edit") {
    loaduserName();
    loadValues();
  }
}

function createRecipe() {
  let newCreateArray = {};
  let createImage = $(".recipeImage").val();
  let createName = $("#cname").val();
  let createDescription = $("#cdescription").val();
  let createtotalH = $("#totalh").val();
  let createtotalM = $("#totalm").val();
  let createServings = $("#cserving").val();
  let newingredients = [];
  let newinstructions = [];
  let ingredientsCollection =
    document.getElementsByClassName("createcollecting");
  let instructionsCollection =
    document.getElementsByClassName("createcollectins");
  for (var i = 0; i < ingredientsCollection.length; i++) {
    const newobj = {};
    if (ingredientsCollection[i].value == "") {
    } else {
      newobj.ingredient = ingredientsCollection[i].value;
      newingredients.push(newobj);
    }
  }
  for (var i = 0; i < instructionsCollection.length; i++) {
    const newobj = {};
    if (instructionsCollection[i].value == "") {
    } else {
      newobj.instructions = instructionsCollection[i].value;
      newinstructions.push(newobj);
    }
  }
  newCreateArray.id = createID;
  newCreateArray.name = createName;
  newCreateArray.image = createImage;
  newCreateArray.description = createDescription;
  newCreateArray.hour = createtotalH;
  newCreateArray.min = createtotalM;
  newCreateArray.servings = createServings;
  newCreateArray.INGREDIENTS = newingredients;
  newCreateArray.INSTRUCTIONS = newinstructions;
  recipePage.push(newCreateArray);
  console.log(recipePage);
  createID++;
}

function loadValues() {
  $(".editform").empty();
  $(".ingredients").empty();
  $(".instructions").empty();
  let setselectValues = ``;
  let setinputValues = ``;
  let ingredientsValues = ``;
  let instructionsValue = ``;
  if (recipePage[editRecipe].image == "pizza") {
    setselectValues = `
    <select title="recipeImage" name="recipeImage" class="recipeImage">
        <option selected="selected" value="pizza">Pizza</option>
        <option value="burger">Burger</option>
        <option value="chicken">Chicken</option>
        <option value="chow">Chow Mein</option>
    </select>
`;
    $(".editform").append(setselectValues);
  } else if (recipePage[editRecipe].image == "burger") {
    setselectValues = `
    <select title="recipeImage" name="recipeImage" class="recipeImage">
        <option value="pizza">Pizza</option>
        <option selected="selected" value="burger">Burger</option>
        <option value="chicken">Chicken</option>
        <option value="chow">Chow Mein</option>
    </select>
`;
    $(".editform").append(setselectValues);
  } else if (recipePage[editRecipe].image == "chicken") {
    setselectValues = `
    <select title="recipeImage" name="recipeImage" class="recipeImage">
        <option value="pizza">Pizza</option>
        <option value="burger">Burger</option>
        <option selected="selected" value="chicken">Chicken</option>
        <option value="chow">Chow Mein</option>
    </select>
`;
    $(".editform").append(setselectValues);
  } else if (recipePage[editRecipe].image == "chow") {
    setselectValues = `
    <select title="recipeImage" name="recipeImage" class="recipeImage">
        <option value="pizza">Pizza</option>
        <option value="burger">Burger</option>
        <option selected="selected" value="chicken">Chicken</option>
        <option value="chow">Chow Mein</option>
    </select>
`;
    $(".editform").append(setselectValues);
  }

  setinputValues = `
        <input type="text" id="editname" value="${recipePage[editRecipe].name}" placeholder="Recipe Name"/>
        <input type="text" id="editdescription" value="${recipePage[editRecipe].description}" placeholder="Recipe Description"/>
        <input type="text" id="edittotalh" value="${recipePage[editRecipe].hour}" placeholder="Recipe Total Hours"/>
        <input type="text" id="edittotalm" value="${recipePage[editRecipe].min}" placeholder="Recipe Total Minutes"/>
        <input type="text" id="editserving" value="${recipePage[editRecipe].servings}" placeholder="Recipe Serving Size"/>
  `;
  $(".editform").append(setinputValues);
  $(".ingredients").append(`<h4>Enter Ingredients:</h4>`);
  for (var i = 0; i < recipePage[editRecipe].INGREDIENTS.length; i++) {
    ingredientsValues = `<input type="text" class="ing${
      i + 1
    } collectIng" value="${
      recipePage[editRecipe].INGREDIENTS[i].ingredient
    }" placeholder="Ingredient #${i + 1}">`;
    $(".ingredients").append(ingredientsValues);
  }
  $(".ingredients").append(
    `<button title="addIngredient" class="ingredientsButton" onclick="addIngredient()"></button>`
  );
  $(".instructions").append(`<h4>Enter Instructions:</h4>`);
  for (var i = 0; i < recipePage[editRecipe].INSTRUCTIONS.length; i++) {
    instructionsValue = `<input type="text" class="ins${
      i + 1
    } collectIns" value="${
      recipePage[editRecipe].INSTRUCTIONS[i].instructions
    }" placeholder="Ingredient #${i + 1}">`;
    $(".instructions").append(instructionsValue);
  }
  $(".instructions").append(
    `<button title="addInstruction" class="instructionsButton" onclick="addInstructions()"></button>`
  );

  $(".editpage").append(
    `<button title="submitRecipe" class="submitRecipeButton" onclick="saveChanges(${editRecipe})">Submit Changes</button>`
  );
}

function saveChanges(x) {
  let arraySave = recipePage[x];
  let newName = $("#editname").val();
  let newImage = $(".recipeImage").val();
  let newDescription = $("#editdescription").val();
  let newTotalh = $("#edittotalh").val();
  let newTotalm = $("#edittotalm").val();
  let newServing = $("#editserving").val();
  let newingredients = [];
  let newinstructions = [];
  let ingredientsCollection = document.getElementsByClassName("collectIng");
  let instructionsCollection = document.getElementsByClassName("collectIns");
  for (var i = 0; i < ingredientsCollection.length; i++) {
    const newobj = {};
    newobj.ingredient = ingredientsCollection[i].value;
    newingredients.push(newobj);
  }
  for (var i = 0; i < instructionsCollection.length; i++) {
    const newobj = {};
    newobj.instructions = instructionsCollection[i].value;
    newinstructions.push(newobj);
  }
  arraySave.name = newName;
  arraySave.image = newImage;
  arraySave.description = newDescription;
  arraySave.hour = newTotalh;
  arraySave.min = newTotalm;
  arraySave.servings = newServing;
  arraySave.INGREDIENTS = newingredients;
  arraySave.INSTRUCTIONS = newinstructions;
  alert("Successfully saved!");
  MODEL.changeContent("recipes", afterRoute);
}

function loadView(select) {
  let step = 1;
  let displayBaseInformation = `<div class="main">
    <div class="pizzaImage">
        <div class="${recipePage[select].image}Img">
            <p>${recipePage[select].name}</p>
        </div>
    </div>
    <div class="information">
        <h3 class="description">Description</h3>
        <p class="pad">${recipePage[select].description}</p>
        <h3>Total  Time:</h3>
        <p class="pad">${recipePage[select].hour}h ${recipePage[select].min}min</p>
        <h3>Servings</h3>
        <p>${recipePage[select].servings} servings</p>
    </div>
</div>
<div class="ingredientsLists">
    <h3>Ingredients:</h3>
  
</div>
<div class="instructionLists">
    <h3>Instructions:</h3>
</div>
<button class="editButtonView" onclick="editListener(${select})">Edit Recipe</button>`;
  $(".viewpage").append(displayBaseInformation);
  let ing = recipePage[select].INGREDIENTS;
  console.log(ing);

  for (var i = 0; i < ing.length; i++) {
    let stuff = `<p>${ing[i].ingredient}</p>`;
    $(".ingredientsLists").append(stuff);
  }

  let inst = recipePage[select].INSTRUCTIONS;
  for (var i = 0; i < inst.length; i++) {
    let stuff = `<p>${step}. ${inst[i].instructions}</p>`;
    $(".instructionLists").append(stuff);
    step++;
  }

  // $.each(recipes.USER_RECIPES[select].INGREDIENTS, function (ing) {
  //   let stuff = `<p>${ing.ingredient}</p>`;
  //   $(".ingredientsLists").append(stuff);
  // });
}

function editListener(s) {
  editRecipe = s;
  MODEL.changeContent("edit", afterRoute);
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
  $.getJSON("data/data.json", function (recipes) {
    recipePage = recipes.USER_RECIPES;
    console.log(recipePage);
  });
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
