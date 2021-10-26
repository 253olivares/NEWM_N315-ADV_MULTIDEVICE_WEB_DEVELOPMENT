function initFirebase() {
    firebase
    .auth()
    .onAuthStateChanged(function(user){
        if(user) {

            console.log("connected");
            $('pName').css("display", "block");

        } else {
            console.log("user is not there");
            $('pName').css("display", "none");
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

function updateUser(disName){
  firebase
  .auth()
  .currentUser
  .updateProfile({
    displayName:disName,
  });
}

function createUser() {
    // let username;
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
    console.log(errorMessage)
    // ..
  });

}

function login() {

    // let username;
    let password = "testurmom"; //$("#password").val();
    let email = "test@gmail.com";
    let fName = "Miguel";
    let lName = "Olivares";

    firebase.auth().signInWithEmailAndPassword(email, password)
  .then((userCredential) => {
    // Signed in
    var user = userCredential.user;
    console.log("signed in");
    // ...
  })
  .catch((error) => {
    var errorCode = error.code;
    var errorMessage = error.message;
    console.log(errorMessage)
  });
}

function signOut() {
    firebase.auth().signOut().then(() => {
        console.log("Signed Out");
      }).catch((error) => {
          console.log(error);
        // An error happened.
      });
}

function initListeners() {
    $(".inListen").click(function(e){
        e.preventDefault();
        let btnID = e.currentTarget.id;
        if(btnID == "create"){
            createUser();
        }else if (btnID == "login"){
            login();
        } else if (btnID == "signout"){
            signOut();
        }
    });
}

$(document).ready(function(){
    try {
        let app = firebase.app();
        initFirebase();
        initListeners();
    } catch {
        console.error(e);
    }
});