var canvas = document.getElementById('c1');
var ctx = canvas.getContext('2d');

canvas.width = window.innerWidth*0.98;
canvas.height = 720;

var particles = []
var origin = [canvas.width/2,canvas.height/2.5]

var ptMouse = []
var moX = canvas.width/2;
var moY = canvas.height/1.2;

var motterX = 1;
var motterY = 1;
var hintReg = document.getElementById('hint');
hintReg.style.display = 'none'

for (var i = 0; i <= 10; i++){
    vx = Math.cos((Math.random()*360)*Math.PI/180);
    vy = Math.sin((Math.random()*360)*Math.PI/180);
    ptMouse.push(moX,moY,Math.random()*3+3,vx,vy);
}
for (var i = 0; i <= 10; i++){
    vx = Math.cos((Math.random()*90+60)*Math.PI/180);
    vy = Math.sin((Math.random()*90+60)*Math.PI/180);
    particles.push(origin[0],origin[1],Math.random()*5+5,vx,vy);
}
for (var i = 0; i <= 10; i++){
    vx = Math.cos((Math.random()*90+240)*Math.PI/180);
    vy = Math.sin((Math.random()*90+240)*Math.PI/180);
    particles.push(origin[0],origin[1],Math.random()*5+5,vx,vy);
}
function drawPT(x,y,r,color=null){
    r = Math.abs(r)
    ctx.beginPath();
    if (color){
        ctx.fillStyle = color
    }else{
        ctx.fillStyle = 'rgba(255,255,255,0.1)'
    }
    ctx.arc(x,y,r,0,Math.PI*2,false);
    ctx.fill();
    ctx.closePath();
}
function drawPT2(x,y,r,color=null){
    r = Math.abs(r)
    ctx.beginPath();
    if (color){
        ctx.fillStyle = color
    }else{
        ctx.fillStyle = 'white'
    }

    ctx.moveTo(x,y-r);
    ctx.bezierCurveTo(x,y,x,y,x-r,y);

    ctx.moveTo(x-r,y);
    ctx.bezierCurveTo(x,y,x,y,x,y+r);

    ctx.moveTo(x,y+r);
    ctx.bezierCurveTo(x,y,x,y,x+r,y);

    ctx.moveTo(x+r,y);
    ctx.bezierCurveTo(x,y,x,y,x,y-r);

    ctx.fill();
    ctx.closePath();
}

function update(){

    ctx.clearRect(0,0,canvas.width,canvas.height)
    if (window.scrollY <= 20){
        for (let i = 0; i < ptMouse.length; i+=5) {
            var dist = Math.hypot(Math.abs(ptMouse[i]-moX),Math.abs(ptMouse[i+1]-moY))
            drawPT(ptMouse[i],ptMouse[i+1],ptMouse[i+2]*2-dist*0.05,'rgba(71,235,84,0.2)')
            drawPT2(ptMouse[i],ptMouse[i+1],ptMouse[i+2]-dist*0.05,'rgb(71,235,84)')
            ptMouse[i] -= ptMouse[i+3]*Math.random()*3
            ptMouse[i+1] += ptMouse[i+4]*Math.random()*3
            if(dist >= 150){
                ptMouse[i] = moX-10
                ptMouse[i+1] = moY+10
                vx = Math.cos((Math.random()*360)*Math.PI/180);
                vy = Math.sin((Math.random()*360)*Math.PI/180);
                ptMouse[i+3] = vx*motterX
                ptMouse[i+4] = vy*motterY
            }
        }
    }
    for (let i = 0; i < particles.length; i+=5) {
        var dist = Math.hypot(Math.abs(particles[i]-origin[0]),Math.abs(particles[i+1]-origin[1]))
        particles[i] -= particles[i+3]*Math.random()*3
        particles[i+1] += particles[i+4]*Math.random()*3
        if(dist >= 100){
            drawPT(particles[i],particles[i+1],particles[i+2]*2-dist*0.05)
            drawPT2(particles[i],particles[i+1],particles[i+2]-dist*0.05)
        }
        if(dist >= 250){
            particles[i] = origin[0]
            particles[i+1] = origin[1]
        }
    }
    
    requestAnimationFrame(update)
}
var AtomC = document.getElementById('AtomC');
var AtomPT = document.getElementById('AtomPT');
var AtomPTS = document.getElementById('AtomPTS');
AtomC.style = `
    display:none;
    position: absolute;
    z-index: 1000;
	width: 50px;
	height: 50px;
	border-radius:100%;
	pointer-events:none;
    border: 3px solid rgb(71,235,84);
    filter: drop-shadow(0px 0px 5px rgba(71,235,84,1));
    transition: transform 1s
    `

var xx = 0;
var yy = 0;
var angle = 0;
var va = 0.1;
var AtomMx = 20;
var AtomMy = 20;
var moHover;
var AtomVx = 26;
var AtomVy = 26;
document.addEventListener('mousemove',(event)=>{
    AtomC.style.display = 'block';
    moX = event.x
    moY = event.y
    if(event.target.getAttribute('moh')){
        AtomC.style.transform = 'scale(2)'
        AtomPTS.style.transform = 'scale(0.2)'

        AtomC.style.left = event.x-25+"px";
        AtomC.style.top = event.y-25+"px";
        AtomPTS.style.left = 15+"px";
	    AtomPTS.style.top = 15+"px";
        motterX = 5;
        motterY = 5;
        va = 0.3;
    }else{
        AtomC.style.transform = 'scale(1)'
        
        AtomPTS.style.transform = 'scale(1)'

        AtomC.style.left = event.x-25+"px";
        AtomC.style.top = window.scrollY+event.y-25+"px";
        AtomPTS.style.left = 15+"px";
	    AtomPTS.style.top = 15+"px";
        motterX = 1;
        motterY = 1;
        AtomMx = 20;
        AtomMy = 20;
        AtomVx = 27;
        AtomVy = 27;
        va = 0.1;
    }
    
    
})
cricleAnim()
function cricleAnim(){
	angle+=va;
	AtomPT.style.marginLeft = AtomMx+AtomVx*Math.cos(angle)+"px";
	AtomPT.style.marginTop = AtomMy+AtomVy*Math.sin(angle)+"px";
    requestAnimationFrame(cricleAnim);
}
window.onload = () =>{
    if (window.localStorage.getItem('emails') == null){
        window.localStorage.setItem('emails','user@gmail.com root@gmail.com')
        window.localStorage.setItem('teachers','0 1')
        window.localStorage.setItem('programmers','0 1')
        window.localStorage.setItem('passwords','user root')
    }
    update()
}
var sup = document.getElementById('sing_upID');
var Stemp = 1;
var swipedCount = 0;
sup.onclick = () => {
    if (swipedCount){
        swipedCount = 0
    }else{
        swipedCount = 1
    }
    sup.classList.add('swiped');
    
    if (Stemp == 1){
        setTimeout(supdel, 250);
        setTimeout(swipedLR, 250);
        Stemp = 0
    }
}
function supdel(){
    sup.classList.remove('swiped');
    Stemp = 1
}
function swipedLR() {
    if (swipedCount){
        document.getElementById('sing_text').innerText = 'Register'
        document.getElementById('sign_btn').innerHTML = 'REGISTER'
    }else{
        document.getElementById('sing_text').innerText = 'Login'
        document.getElementById('sign_btn').innerHTML = 'LOGIN'
    }
}
function SignOK(){
    if (swipedCount){
        window.localStorage.setItem('email',emailP.value);
        window.localStorage.setItem('password',passP.value);

        var emails = window.localStorage.getItem('emails');
        emails += " "+emailP.value;
        window.localStorage.setItem('emails',emails);

        var passwords = window.localStorage.getItem('passwords');
        passwords += " "+passP.value;
        window.localStorage.setItem('passwords',passwords);

        var teachers = window.localStorage.getItem('teachers');
        teachers += " "+0;
        window.localStorage.setItem('teachers',teachers);

        var programmers = window.localStorage.getItem('programmers');
        programmers += " "+0;
        window.localStorage.setItem('programmers',programmers);
        
        alert('Account successfully created')
        window.location.href = 'selfMe.html'
    }else{
        var emails = window.localStorage.getItem('emails');
        var passwords = window.localStorage.getItem('passwords');
        var eArr = emails.split(' ');
        var pArr = passwords.split(' ');
        for (let i = 0; i < eArr.length; i++) {
            if(emailP.value == eArr[i] && passP.value == pArr[i]){
                window.localStorage.setItem('email',emailP.value);
                window.localStorage.setItem('password',passP.value);
                window.location.href = 'selfMe.html'
                return 0;
            }
        }
        alert('Email or Password is incorrect');
        hintReg.style.display = 'block'
    }
}
