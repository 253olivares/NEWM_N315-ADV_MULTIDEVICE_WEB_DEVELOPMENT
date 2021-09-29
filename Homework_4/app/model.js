var MODEL = (function(){
    var _modalSignUp = ``;
    var _modalLogin = ``;
    var _changeContent = function(page){
        $.get(`pages/${page}/${page}.html`, function(data){
            console.log(data);
            $(`#app`).html(data);
        });
    }

    var _modalPopup = function(modal){
        if(modal == "Login"){
            
        }else if (modal == "SignUp"){
            
        }
    }

    return{
        changeContent: _changeContent,
        modalPopup: _modalPopup
    }
})();