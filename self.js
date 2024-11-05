var nameAcc = document.getElementById('loginregister');
var logOut = document.getElementById('logout');
var email = window.localStorage.getItem('email')

setTimeout(()=>{
    if(!email){
        nameAcc.innerHTML = 'Login / Register'
        nameAcc.href = 'LogReg.html'
        logOut.style.display = 'none'
    }else{
        nameAcc.innerHTML = email.split('@')[0]+''
        nameAcc.href = 'selfMe.html'
        logOut.style.display = 'block'
    }
},50)