var canvas = document.getElementById('c1');
var ctx = canvas.getContext('2d');

var canvas2 = document.getElementById('c2');
var ctx2 = canvas.getContext('2d');

canvas.width = window.innerWidth*0.98;
canvas.height = 720;

canvas2.width = window.innerWidth*0.98;
canvas2.height = 720;
var MotivWords = ['Dream','Achieve','Grow','Connect','Explore','Inspire','Empower','Learn','Create','Succeed','Discover'];
var Mtext = [];
var textOrigin = [canvas.width/2,canvas.height/2.5]
var particles = []
var origin = [canvas.width/2,canvas.height/2.5]
var ptMouse = []
var moX = canvas.width/2;
var moY = canvas.height/1.2;

var motterX = 1;
var motterY = 1;
for (var i = 0; i <= MotivWords.length-1; i++){
    vx = Math.cos((Math.random()*360)*Math.PI/180);
    vy = Math.sin((Math.random()*360)*Math.PI/180);
    Mtext.push(MotivWords[i],origin[0],origin[1],Math.random()*200+50,vx,vy);
}
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
    for (let i = 0; i < Mtext.length; i+=6) {
        var dist = Math.hypot(Math.abs(Mtext[i+1]-origin[0]),Math.abs(Mtext[i+2]-origin[1]))
        var opocity = (1-dist*0.002)
        ctx2.beginPath();
        ctx2.fillStyle = 'rgba(71,235,84,'+opocity+')'
        ctx2.font = 50+"px Inter"
        Mtext[i+1] += Mtext[i+4]*Math.random()*3
        Mtext[i+2] += Mtext[i+5]*Math.random()*3
        if(dist >= 300){
            ctx2.fillText(Mtext[i],Mtext[i+1],Mtext[i+2]);
        }
        if(dist >= 500){
            Mtext[i+1] = textOrigin[0]
            Mtext[i+2] = textOrigin[1]
            Mtext[i+4] = Math.cos((Math.random()*360)*Math.PI/180);
            Mtext[i+5] = Math.sin((Math.random()*360)*Math.PI/180);
        }
        ctx2.closePath();
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
    if(!navigator.onLine){
        alert('OFFLINE MODE ACTIVATE')
    }
    update()
}
function startS() {
    document.getElementById('loginregister').click()
}