
function route(){
    let hashTag = window.location.hash
    let pageID = hashTag.replace("#/", "");
    if(!pageID){
        MODEL.changeContent("home")
    } else{
        MODEL.changeContent(pageID)
    }
}


function listenPage(){
    $(window).on("hashchange",route);
    route();
}


$(document).ready(function(){
    listenPage();
});