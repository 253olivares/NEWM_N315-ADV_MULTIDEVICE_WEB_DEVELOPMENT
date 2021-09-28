

function addModalListener(){
    $(".bg-click").click(function(e){
        $(".modal").css("display","none");
    });
}

function initListeners(){
    $("#submit").click(function(e){
        e.preventDefault();

        let text = $("#callout-text").val();
        gsap.to($(".modal"),{scale:0, duration:0, onComplete: showAlert, onCompleteParams:[text],});
    });
    $("#showModal").click(function(e){
        // $("body").append(modal);
        // $(".modal").css("display","flex")
        gsap.to($(".modal"),{scale:100,duraction:2,onComplete:showAlert});
        addModalListener();
    });
}

function showAlert(info){
    alert("Hi "+ info);
    $("#callout-text").val("");
}

$(document).ready(function(){
    initListeners();
    addModalListener();
});