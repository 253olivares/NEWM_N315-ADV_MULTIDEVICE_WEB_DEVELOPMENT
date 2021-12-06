var menu = "close";

subtotal = 0;
//this is an array that we will push coffee into when we click buy now and if the user is signed in
var cart = [];
//this function will check to see if a user is signed in.
var userLogStatus = false;
//this is a variable that will keep track of our toggle to see if we have login or sign up in the account div
var loginToggle = true;
//local name save
var localNameSave = "";

//this funcion keeps track of our address URL
function checkHash() {
  $(window).on("hashchange", route);
  route();
}

//this function checks the address URL and takes out the page where the user is directing to.
//after finding the page from the url stores value locally and calls a model function that grabs html data from an external file
function route() {
  let hashTag = window.location.hash;
  let pageID = hashTag.replace("#/", "");

  switch (pageID) {
    case "home":
      MODEL.changeContent(pageID, afterRoute);

      break;
    case "cart":
      MODEL.changeContent(pageID, afterRoute);

      break;
    default:
      MODEL.changeContent("home", afterRoute);
      console.log("URL is invalid or empty");
      break;
  }
}

//this function runs after route and ensures that our data is loaded first before running other code.
//we throw our firebase code in here so we know that the page is loading first.
//the callback has another value within the ()  that comes from our model and it keeps track of the page the user is in using the url
//if we wanted to continue keeping track without url for sub pages then we would need a external local variable
function afterRoute(page) {
  let app = firebase.app();
  initFirebase();
  initLogin();
  // initNav();
  switch (page) {
    case "home":
      console.log("You are on the home page!");
      loadCoffee();
      cartupdate();
      break;
    case "cart":
      console.log("you are on the cart page!");
      checkCart();
      cartupdate();
      console.log(cart);
      break;
  }
  // checkMenu();
}

//this function loads our coffee on the page by cycling through our coffee array
function loadCoffee() {
  $(".homePage__List").empty();
  $.getJSON("data/data.json", function (coffee) {
    $.each(coffee.MACHINES, function (index, x) {
      let displayCoffee = `
      <div class="homePage__List__coffeeHolder">
        <div class="homePage__List__coffeeHolder__Coffee">
          <p class="banner banner--purple" style="background-color:${x.bannerColor};">${x.bannerMessage}</p>
          <img class="cofImg" src="images/${x.images}" alt="Coffee Machine">
          <div id="collectionColor${x.id}" class="homePage__List__coffeeHolder__Coffee__colors">
          </div>
          <div class="homePage__List__coffeeHolder__Coffee__information">
            <h1>${x.name}</h1>
            <p class="cost"><span>$</span>${x.price}</p>
            <div class="homePage__List__coffeeHolder__Coffee__information__reviews">
              <span class="fa fa-star checked"></span>
              <span class="fa fa-star checked"></span>
              <span class="fa fa-star checked"></span>
              <span class="fa fa-star checked"></span>
              <span class="fa fa-star endstar"></span><p>${x.rating}</p><p>|</p> <p>(${x.numRating})</p>
            </div>
            <div class="homePage__List__coffeeHolder__Coffee__information__shipping">
              <img src="images/Shipping.svg" alt="Shipping">
              <p>Free shipping</p>
            </div>
            <div class="homePage__List__coffeeHolder__Coffee__information__compare">
              <input title="compare" type="checkbox" class="compare" name="compare" value="compareValue">
              <label for="compare">Compare</label>
            </div>
          </div>
        </div>
        <button onclick="buyListener(${x.id})" class="buyNow" coffeeArray="${x}" coffeeid="${x.id}"> BUY NOW</button>
      </div>`;
      $(".homePage__List").append(displayCoffee);
      $.each(x.color, function (index, y) {
        console.log(y);
        let circles = `<div style="background-color:${y};" alt="circle">`;
        $(`#collectionColor${x.id}`).append(circles);
      });
    });
  });
  // $.each(coffee, function (index, x) {
  //   console.log(x);
  //   $("#coffeeDisplay").append(displayCoffee);
  //   // $.each(x.color, function (index, y) {
  //   //   circles = `<img src="images/circle-solid.svg" style="color: ${y};" alt="circle">`;
  //   //   $("colorCircles").append(circles);
  //   // });
  // });
}

//this function here keeps track of the number of coffee makers we have pushed into our array
function cartupdate() {
  if (cart.length == 0) {
    $("#countThingy").css("display", "none");
  } else {
    $("#countThingy").css("display", "flex");
    $("#countThingy").html(cart.length);
  }
}

//Function that controls our mobile menu options that lets us show and hide our menu
function mobileMenu() {
  $(".topNav__menuBurger").click(function (e) {
    if (menu == "close") {
      $(".mobileCoffeMenu").css("display", "block");
      $(".openMenu").css("display", "none");
      $(".closeMenu").css("display", "block");
      $("body").css("overflow", "hidden");
      menu = "open";
    } else {
      $(".mobileCoffeMenu").css("display", "none");
      $(".openMenu").css("display", "block");
      $(".closeMenu").css("display", "none");
      $("body").css("overflow", "auto");
      menu = "close";
    }
  });
}

//function that looks at the cart array and sees if
//it contains anything and if it does then displays items
//otherwise says it has nothing
function checkCart() {
  if (cart.length == 0) {
    $(".cartPage").html(`<p class="emptyitems">0 ITEMS</p>
    <h1 class="emptyText">You don't have any items in your shopping cart</h1>`);
  } else {
    //this portion of the if statment is a bit long becuase it lays out the page structure before filling in values.
    $(".cartPage")
      .html(`<p class="freeship"><i class="fa fa-check-square"></i>You get FREE shipping!</p>
    <div class="ShoppingCart">
        <div class="sCLeft">
            <div id="displayCoffeArea" class="purchases">
            <h1>Regular Purchases</h1>
            <p>These items will be processed today and ship right away.</p>
            </div>
            <div class="discount">
                <h3>Savings & Discounts</h3>
                <div class="couponCode">
                    <input title="coupon" placeholder="Coupon Code" type="text">
                    <button>APPLY</button>
                </div>
            </div>
        </div>
        <div class="sCRight">
            <div class="showTotal">
                <h1>Cart Summary</h1>
                <div class="subtotal"><p>Subtotal (1 Item)</p> <p>$<span id="cartSubTotal">199.99</span></p></div>
                <hr class="firsthr">
                <div class="savingDiscounts"><p>Savings & Discounts</p> <p class="subCost">-$0.00</p></div>
                <p class="addCoup">Add coupon</p>
                <div class="shippingTotal"><p>Shipping</p> <p class="shippingFree">FREE</p></div>
                <div class="orderTotal"><p>Order Total<i class="fa fa-info-circle"></i></p> <p>$<span id="cartOrderTotal">199.99</span></p></div>
                <hr class="secondhr">
                <div class="buttonsCheckout">
                    <button title="secureCheckout" onclick="checkout();" class="secureCheckout">SECURE CHECKOUT</button>
                    <button title="Paypal" class="Paypal">Check out with <i class="fa fa-paypal"></i></button>
                </div>
            </div>
        </div>
    </div>`);

    loadCartMachines();
  }
}

//this function clears our cart successfully completing the transaction
function checkout() {
  cart = [];
  alert("Congratulations on your order " + localNameSave);
  MODEL.changeContent("cart", afterRoute);
  subtotal = 0;
}

//This function loads our cart array and grabs the coffee machines we saved.

function loadCartMachines() {
  $("#coffeeDisplay").empty();
  $.getJSON("data/data.json", function (coffee) {
    $.each(cart, function (c) {
      let displayCoffee = `
      <div class="coffeeListed">
      <div class="coffeeListed__left">
          <div class="coffeeListed__left__image">
              <img src="images/${coffee.MACHINES[cart[c]].images}" alt="">
          </div>
          <div class="coffeeListed__left__title">
              <p>Keurig®</p>
              <h1>${coffee.MACHINES[cart[c]].name}</h1>
          </div>
      </div>
      <div class="coffeeListed__right">
          <div class="coffeeListed__right__cost">
              <p>${coffee.MACHINES[cart[c]].price} each</p>
              <select title="selectTotal" name="selectTotal" class="selectedTotal">
                  <option value="1">1</option>
              </select>
          </div>
          <div class="coffeeListed__right__later">
              <div class="coffeeListed__right__later__total">
                  <p>${coffee.MACHINES[cart[c]].price}</p>
              </div>
          </div>
      </div>
      <div class="coffeeListed__close">
          <p>Save For Later</p>
          <i class="fa fa-times"></i>
      </div>
  </div>
      `;
      subtotal = subtotal + coffee.MACHINES[c].price;
      $("#displayCoffeArea").append(displayCoffee);
      $("#cartSubTotal").empty();
      $("#cartSubTotal").html(subtotal);
      $("#cartOrderTotal").empty();
      $("#cartOrderTotal").html(subtotal);
    });
  });
}

//Sign in function that will log the user into our applicaiton using the firebase profile feature.
function signIn(email, password) {
  firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then((userCredential) => {
      var user = userCredential.user;
      alert("Welcome " + user.displayName);
    })
    .catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log(errorMessage);
      alert(errorCode + " " + errorMessage);
    });
}

//function to allow the user to sign out
function signOut() {
  firebase
    .auth()
    .signOut()
    .then(() => {
      console.log("Signed Out");
      alert("You have been succesfully signed out! Goodbye!");
    })
    .catch((error) => {
      console.log(error);
      alert(error);
      // An error happened.
    });
}

//Sign up function that will allow the user to create an account on firebase to sign into our application
function signUp(fn, ln, email, password) {
  firebase
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .then((userCredential) => {
      let fullName = fn + " " + ln;
      firebase.auth().currentUser.updateProfile({
        displayName: fullName,
      });
      localNameSave = fullName;
      var user = userCredential.user;
      alert("Welcome! Your account has been successfully created");
    })
    .catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log(errorMessage);
      alert(errorCode + " " + errorMessage);
    });
}

//listener for the login profile button that will make the gray
//overlay appear when the user hovers the profile icon
function initLogin() {
  let click = false;
  $(".profilehov").hover(
    function () {
      if (click == false) {
        $(".login").css("display", "block");
        $(".grayOverlay").css("display", "block");
        $(".closeButton").click(function () {
          $(".login").css("display", "none");
          $(".grayOverlay").css("display", "none");
          click = false;
        });
        $(".grayOverlay").click(function () {
          $(".login").css("display", "none");
          $(".grayOverlay").css("display", "none");
          click = false;
        });
        $(".lsButton").click(function () {
          let selected = $(this).attr("dir");
          $(".lsButton").removeClass("selected");
          $(this).addClass("selected");
          if (selected == "signup") {
            $(".inputFieldsLogin").css("display", "none");
            $(".whyBoxL").css("display", "none");
            $(".inputFieldsSign").css("display", "block");
            $(".whyBoxS").css("display", "block");
          } else {
            $(".inputFieldsLogin").css("display", "block");
            $(".whyBoxL").css("display", "block");
            $(".inputFieldsSign").css("display", "none");
            $(".whyBoxS").css("display", "none");
          }
        });
      }
    },
    function () {
      if (click == false) {
        $(".login").css("display", "none");
        $(".grayOverlay").css("display", "none");
      }
    }
  );
  $(".profilehov").click(function () {
    if (click == false) {
      $(".login").css("display", "block");
      $(".grayOverlay").css("display", "block");
      $(".closeButton").click(function () {
        $(".login").css("display", "none");
        $(".grayOverlay").css("display", "none");
        click = false;
      });
      $(".grayOverlay").click(function () {
        $(".login").css("display", "none");
        $(".grayOverlay").css("display", "none");
        click = false;
      });
      $(".SignInButton").click(function () {
        let email = $("#loginEmail").val();
        let password = $("#loginPassword").val();

        if (!email || !password) {
          alert("Please make sure to fill out both fields");
        } else {
          $("#loginEmail").val("");
          $("#loginPassword").val("");
          signIn(email, password);
          $(".login").css("display", "none");
          $(".grayOverlay").css("display", "none");
          click = false;
        }
      });
      $(".SignUpButton").click(function () {
        let fn = $("#signUpFN").val();
        let ln = $("#signUpLN").val();
        let email = $("#signUpEmail").val();
        let password = $("#signUpPassword").val();
        if (!fn || !ln || !email || !password) {
          alert("Please make sure to fill out all fields");
        } else {
          $("#signUpFN").val("");
          $("#signUpLN").val("");
          $("#signUpEmail").val("");
          $("#signUpPassword").val("");
          signUp(fn, ln, email, password);
          $(".login").css("display", "none");
          $(".grayOverlay").css("display", "none");
          click = false;
        }
      });
    } else {
      $(".login").css("display", "none");
      $(".grayOverlay").css("display", "none");
    }
    click = !click;
  });
}

//init close function that closes the modal when you click the close button
//this function runs ater our route switch stament and gives our
//coffee makers a listener that checks to see if the user is signed
//in and if they are it will poush that coffee maker into a array
//otherwise it will push an error telling the user to login
function buyListener(x) {
  if (userLogStatus == false) {
    alert("You must log in first before Buying this coffee maker!");
  } else {
    cart.push(x);
    cartupdate();
  }
}

//this function here runs our firebase that authenticats
//the user when logged in will store an external value letting the
//page know if a user is signed in or not
function initFirebase() {
  firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
      console.log("A user is logged in!");
      userLogStatus = true;
      localNameSave = user.displayName;
      $(".profilehov").css("display", "none");
      $(".signoutHov").css("display", "flex");
    } else {
      console.log("A user is not logged in!");
      userLogStatus = false;
      localNameSave = "";
      $(".profilehov").css("display", "flex");
      $(".signoutHov").css("display", "none");
    }
  });
}

//this here uses a try and catch to attempt checking our hash and getting json. This starts the dynamic flow of our webapge allowing it to check the url
//if we fail to get the hash started or collecting our JSON we will get an error in our console log
$(document).ready(function () {
  try {
    checkHash();
    mobileMenu();
    //this console log runs after our JSON and has telling us they ran sucessfully.
    console.log(
      "If you see this console log then that means that the check hash function has finished running. And the page has successfully collected our JSON data."
    );
  } catch (e) {
    console.error(e);
    alert(e);
  }
});
