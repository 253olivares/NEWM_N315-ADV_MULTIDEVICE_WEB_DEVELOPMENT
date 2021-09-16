
function pageNavBindings(){
    // This it he function specifcally that adds the bindings and runs comands in the model page that allows the page to update dynamically changing the content within the content div

};

// This here runs code that binds listening actions to tthe page website buttons so that we can dynamically change the contents within the page when a user clicks one of the buttons. It loads at the very starts and functions throughout.
// I write a console log that runs after each function letting me know if a function has succesfully ran.
$(document).ready(function(){
    console.log("Page as begun loading and functions have beegun running. Current Functions opperating are:");
    pageNavBindings();
    console.log("pageNavBindings()");
});
