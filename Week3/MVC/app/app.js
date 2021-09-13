function setBindings(){
    $("nav a").click(function(e){
        let btnID = e.currentTarget.id;
        console.log(btnID);
        MODEL.getMyVariable(btnID);
    });
}
$(document).ready(function(){
        console.log("ready");
        setBindings();
});