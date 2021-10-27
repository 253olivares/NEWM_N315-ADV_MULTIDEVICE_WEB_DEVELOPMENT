function route(){
    let hashTag = window.location.hash;
    let pageID = hashTag.replace("#/","");
    if(!pageID) {
        MODEL.changeContent("home");
    } else {
        MODEL.changeContent(pageID);
    }
}
function checkMenu(){
    let menu = "close";
    $(".mobile-menu").click(function(e){
        if(menu == "close"){
            $(".hiddenNav").css("top","0");
            $(".mobile-menu").css("display","none");
            menu = "open";
        } else {
            $(".hiddenNav").css("top","-100%");
            $(".mobile-menu").css("display","flex");
            menu = "close";
        }
    });
    $(".removeButton").click(function(e){
        if(menu == "close"){
            $(".hiddenNav").css("top","0");
            $(".mobile-menu").css("display","none");
            menu = "open";
        } else {
            $(".hiddenNav").css("top","-100%");
            $(".mobile-menu").css("display","flex");
            menu = "close";
        }
    });
}
function checkHash(){
    $(window).on("hashchange",route);
    route();
}

function initFirebase(){
    firebase
    .auth()
    .onAuthStateChanged(function(user){
        if(user) {
           var displayName = user.displayName;
           var email = user.email;
           var emailVerified = user.emailVerified;
           var isAnonymous = user.isAnonymous; 
           var uid = user.uid; 
            console.log("connected");
            $(".loginBtn").css("display","none");
            $(".logoutBtn").css("display","block");
            $(".yourBtn").css("display","block");
            $(".loginMobile").css("display","none");
            $(".logoutMobile").css("display","block");
            $(".yourMobile").css("display","block");
            // MODEL.changeContent("home");
        } else {
            console.log("logged out");
            $(".logoutBtn").css("display","none");
            $(".loginBtn").css("display","block");
            $(".yourBtn").css("display","none");
            $(".loginMobile").css("display","block");
            $(".logoutMobile").css("display","none");
            $(".yourMobile").css("display","none");
        }
    });
}

function updateUser(disName){
    firebase
    .auth()
    .currentUser
    .updateProfile({
      displayName:disName,
    });
  }
  
function createUser() {
    let fName = $("#fName").val();
    let lName = $("#lName").val();
    let email = $("#emailSignUp").val();
    let password = $("#passSignup").val();

    firebase.auth().createUserWithEmailAndPassword(email, password)
  .then((userCredential) => {
    // Signed in 
    let fullName  = fName + ' '+lName;
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
    alert(errorCode + " " +errorMessage);
    // ..
  });
}

function login() {

    let email = $("#email").val();
    let password = $("#password").val();

   firebase.auth().signInWithEmailAndPassword(email, password)
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
   alert(errorCode + " " +errorMessage);
 });
}

function signOut() {
    firebase.auth().signOut().then(() => {
        console.log("Signed Out");
      }).catch((error) => {
          console.log(error);
          alert(error);
        // An error happened.
      });
}

function initListeners(btnID) {
    console.log("runFunction");
        // e.preventDefault();
        // let btnID = e.currentTarget.id;
        console.log(btnID);
        if(btnID == "create"){
            createUser();
        }else if (btnID == "login"){
            login();
        } else if (btnID == "signout" || "signout2"){
            signOut();
        }
}

$(document).ready(function(){
    console.log("Page functions have loaded! checkHash() function has begun running!");
    try {
        let app = firebase.app();
        initFirebase();
        checkHash();
        checkMenu();
    } catch {
        console.error(e);
        alert(e);
    }
});