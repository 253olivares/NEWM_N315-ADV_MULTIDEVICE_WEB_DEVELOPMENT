
function showVariable(newName){
    console.log("newName app.js " + newName);
}



function showNewVariable(Name){
    console.log("I like " + Name);
}
function setBindings(){
    $(".start a").click(function(e){
        let btnID = e.currentTarget.id;
        console.log(btnID);
        MODEL.getMyVariable(btnID, showVariable);
    });
    $(".catDogBind a").click(function(e){
        let btnID = e.currentTarget.id;
        console.log (btnID)
        MODEL.getCatDogVariable(btnID,showNewVariable)
    });
}



$(document).ready(function(){
        console.log("ready");
        setBindings();
});