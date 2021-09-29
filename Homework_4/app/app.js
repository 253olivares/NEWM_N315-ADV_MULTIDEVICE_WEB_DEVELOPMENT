function addModalListener(){
    $(".bg-click").click(function(e){
        $(".modal").remove();
    });
    $(".loginButton").click(function(e){
        $(".modal").remove();
    });
    $(".signButton").click(function(e){
        $(".modal").remove();
    })
}


function route(){
    let hashTag = window.location.hash;
    let pageID = hashTag.replace("#/","");
    console.log(pageID);
    if(!pageID){
        MODEL.changeContent("home");
    }else{
        MODEL.changeContent(pageID);
    }
}

function modalOpen(){
    $(".openLogin").click(function(e){
        e.preventDefault();
        MODEL.modalPopup("Login");
    });
    $(".openSignUp").click(function(e){
        e.preventDefault();
        MODEL.modalPopup("SignUp");
    });
}


function checkHash(){
    $(window).on("hashchange",route);
    route();
}

$(document).ready(function(){
    console.log("Page Has Loaded! Function have begun running!")
    checkHash();
    modalOpen();
});