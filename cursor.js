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
        AtomPT.style.backgroundColor = 'rgb(71,235,84)'
        AtomPTS.style.backgroundColor = 'rgb(71,235,84)'
        AtomC.style.border = '3px solid rgba(71,235,84,1)'
        AtomC.style.filter = 'drop-shadow(0px 0px 5px rgba(71,235,84,1))';
        AtomC.style.transform = 'scale(2)'
        AtomPTS.style.transform = 'scale(0.2)'

        AtomC.style.left = event.x-25+"px";
        AtomC.style.top = event.y-25+"px";
        AtomPTS.style.left = 15+"px";
	    AtomPTS.style.top = 15+"px";
        motterX = 5;
        motterY = 5;
        va = 0.3;
    }else if(event.target.getAttribute('inc')){
        AtomPT.style.backgroundColor = 'red'
        AtomPTS.style.backgroundColor = 'red'
        AtomC.style.border = '3px solid red'
        AtomC.style.filter = 'drop-shadow(0px 0px 5px red)';

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
    }else{
        AtomPTS.style.backgroundColor = 'rgb(71,235,84)'
        AtomPT.style.backgroundColor = 'rgb(71,235,84)'
        AtomC.style.border = '3px solid rgba(71,235,84,1)'
        AtomC.style.filter = 'drop-shadow(0px 0px 5px rgba(71,235,84,1))';
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