
function route(){
    let hashTag = window.location.hash;
    let pageID = hashTag.replace("#/","");
    console.log(pageID);
    if(!pageID){
        MODEL.changeContent("home");
    }else {
        MODEL.changeContent(pageID);
    }
}

function checkHash(){
    $(window).on("hashchange",route);
    route();
}

$(document).ready(function(){
    console.log("Page Has Loaded! Function have begun running!")
    checkHash();
});