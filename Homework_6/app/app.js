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
};

$(document).ready(function(){
    console.log("Page functions have loaded! checkHash() function has begun running!");
    checkHash();
    checkMenu();
});
