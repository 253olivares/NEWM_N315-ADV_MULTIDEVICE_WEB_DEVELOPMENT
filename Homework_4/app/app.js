function addModalListener(){
    $(".bg-click").click(function(e){
        $(".modal").remove();
    });
    $(".loginButton").click(function(e){
        let name = $("#username").val();
        alert(`Succesfully Logged In! Welcome: ${name}`);
        $(".modal").remove();
    });
    $(".signButton").click(function(e){
        let name = $("#username").val();
        alert(`Succesfully Signed In! Welcome: ${name}`);
        $(".modal").remove();
    })
}


function route(){
    let hashTag = window.location.hash;
    let pageID = hashTag.replace("#/","");
    console.log(pageID);
    if(!pageID){
        MODEL.changeContent("home");
        $("#app").css("width", "1500px");
            $("#app").css("padding", "10px");
    }else{
        if(pageID == "home"){
            $("body").css("background-color", "#eaeded");
            $("#app").css("width", "1500px");
            $("#app").css("padding", "10px");
            MODEL.changeContent(pageID);
        }else{
            $("body").css("background-color", "#fff");
            $("#app").css("width", "100%");
            $("#app").css("padding", "0px");
            MODEL.changeContent(pageID);
        }

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