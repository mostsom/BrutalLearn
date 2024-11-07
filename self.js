var nameAcc = document.getElementById('loginregister');
var logOut = document.getElementById('logout');
var email = window.localStorage.getItem('email')
var s = document.getElementsByClassName('hero--info')[0];
var t = document.getElementsByClassName('wrapper')[0];
var i = document.getElementsByClassName('bachGg')[0];
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
adaptativeWindow();

window.onresize = () =>{
    adaptativeWindow();
}
function adaptativeWindow() {
    try {
        t.style.width = window.innerWidth*0.95+"px"
        s.style.width = window.innerWidth*0.9+"px";
    } catch (error) {
        
    }
}