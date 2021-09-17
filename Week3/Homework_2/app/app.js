
function pageNavBindings(){
    // This it he function specifcally that adds the bindings and runs comands in the model page that allows the page to update dynamically changing the content within the content div
    $(".actionBTN").click(function(e){
        let btnID = e.currentTarget.id;
        $(".actionBTN").removeClass("selectedRed selectedBlue selectedPurple selectedPink")
        console.log(btnID);
        MODEL.changePageContent(btnID);

        if(btnID == "home"){
            $("#home").addClass("selectedRed");
        }else if (btnID == "about"){
            $("#about").addClass("selectedBlue");
        } else if (btnID == "services"){
            $("#services").addClass("selectedPurple");
        } else {
            $("#contact").addClass("selectedPink");
        }
    });
};



// It loads at the very starts and functions throughout.
// I write a console log that runs after each function letting me know if a function has succesfully ran.
$(document).ready(function(){
    console.log("Page as begun loading and functions have beegun running. Current Functions opperating are:");
    pageNavBindings();
    console.log("pageNavBindings()");
});
