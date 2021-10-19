function route(){
    let hashTag = window.location.hash;
    let pageID = hashTag.replace("#/","");
    if(!pageID) {
        MODEL.changeContent("home");
    } else {
        MODEL.changeContent(pageID);
    }
}

function checkHash(){
    $(window).on("hashchange",route);
    route();
};

$(document).ready(function(){
    console.log("Page functions have loaded! checkHash() function has begun running!");
    checkHash();
});
