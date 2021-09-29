var MODEL = (function(){
    var _modalSignUp = `<div class="modal">
    <div class="bg-click"></div>
    <div class="callout sig">
      <img src="/images/Amazon.png" alt="Amazon Logo">
      <label class="textLabel" for="firstname">Firstname:</label>
      <input class="textField" type="text" id="firstname" name="firstname">
      <label class="textLabel" for="lastword">Lastname:</label>
      <input class="textField" type="text" id="lastnane" name="lastname">
      <label class="textLabel" for="username">Username:</label>
      <input class="textField" type="text" id="username" name="username">
      <label class="textLabel" for="password">Password:</label>
      <input class="textField" type="text" id="password" name="password">
      <label class="textLabel" for="email">Email:</label>
      <input class="textField" type="text" id="email" name="email">
      <input class="signButton styling" type="submit" value="Signup">
    </div>
  </div>`;
    var _modalLogin = ` <div class="modal">
    <div class="bg-click"></div>
    <div class="callout log">
      <img src="/images/Amazon.png" alt="Amazon Logo">
      <label class="textLabel" for="username">Username:</label>
      <input class="textField" type="text" id="username" name="username">
      <label class="textLabel" for="password">Password:</label>
      <input class="textField" type="text" id="password" name="password">
      <input class="loginButton" type="submit" value="Signup">
    </div>
  </div>`;
    var _changeContent = function(page){
        $.get(`pages/${page}/${page}.html`, function(data){
            console.log(data);
            $(`#app`).html(data);
        });
    }

    var _modalPopup = function(modal){
        if(modal == "Login"){
            $("body").append(_modalLogin);
            gsap.to($(".callout"),{scale:1,duraction:1.5,onComplete:addModalListener});
            // ,onComplete:modalListenr
        }else if (modal == "SignUp"){
            $("body").append(_modalSignUp);
            gsap.to($(".callout"),{scale:1,duraction:1.5,onComplete:addModalListener});
        }
    }

    return{
        changeContent: _changeContent,
        modalPopup: _modalPopup
    }
})();