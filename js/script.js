const $ = q => document.querySelector(q);
const $$ = q => document.querySelectorAll(q);
const print = v => console.log(v);

var userName = $('.sign-up #user-name'),
    userPass = $('.sign-up #user-password'),
    repaetUserPass = $('.sign-up #repeat-user-password'),
    signUpButt = $('#sign-up-button'),
    signUpMsg = $('.sign-up .alert') ;


try {
    signUpButt.addEventListener('click', ()=> {
        if(userName.value == '' || 
            userName.value == null || 
            userPass.value == '' || 
            userPass.value == null || 
            repaetUserPass.value != userPass.value ) 
        {
            signUpMsg.innerHTML = "Your name or password not correct!";
            signUpMsg.classList.add('wrong');
            setTimeout(() => {
                signUpMsg.classList.remove('wrong');
            }, 2500);
        } else {
            localStorage.setItem('name', userName.value);
            localStorage.setItem('pass', userPass.value);
            localStorage.setItem('status', 'true');

            signUpMsg.innerHTML = "Nice, account created :) ..Please wait!";
            signUpMsg.classList.add('right');
            setTimeout(() => {
                window.location.replace("../index.html");
            }, 2500);

        }
    })
} catch (error) {}



var myUser = $('.sign-in #user-name'),
    myUserPass = $('.sign-in #user-password'),
    signInButt = $('#sign-in-button') ,
    signInMsg = $('.sign-in .alert') ;

try {
    signInButt.addEventListener('click', () => {
        var storedName = localStorage.getItem('name'),
            storedPw = localStorage.getItem('pass');
            storedStatus = localStorage.getItem('status');
        
        if(
            !(storedName) 
            || myUser.value.toLowerCase() !== storedName.toLowerCase() 
            || myUserPass.value.toLowerCase() !== storedPw.toLowerCase()
        ) 
        {
            signInMsg.innerHTML = "Your name or password not correct!";
            signInMsg.classList.add('wrong');
            setTimeout(() => {
                signInMsg.classList.remove('wrong');
            }, 2500);
        } else {
            if(storedStatus != 'true') {
                localStorage.setItem('status', 'true');
                signInMsg.innerHTML = `Welcome ${storedName}:) ..Please wait!`;
                signInMsg.classList.add('right');
                setTimeout(() => {
                    window.location.replace("../index.html");
                }, 2500);
            }
        }
    })
} catch (error) {}