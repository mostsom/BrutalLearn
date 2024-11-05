var em = window.localStorage.getItem('email');
if(em){
    console.log(em)
}else{
    window.location.href = 'LogReg.html'
}
var techORprog = 0;

var em = window.localStorage.getItem('email');
var ems = window.localStorage.getItem('emails');
ems = ems.split(' ')
for (var i = 0; i < ems.length; i++){
    if(ems[i] == em){
        var progs = window.localStorage.getItem('programmers');
        progs = progs.split(' ')
        var techs = window.localStorage.getItem('teachers');
        techs = techs.split(' ')
        console.log(techs)
        console.log(progs)
        if(progs[i] == '1'){
            tech_p.style.display = 'none'
            whoyou.innerHTML = 'YOU ARE PROGRAMMER'
            willbe.style.display='block'
        }
        if(techs[i] == '1'){
            tech_p.style.display = 'none'
            whoyou.innerHTML = 'YOU ARE TEACHER'
            willbe.style.display='block'

        }
    }
}
function techS(){
    techORprog = 0;
    tech_s.style.transition = '0.2s';
    tech_s.style.color = 'green';
    tech_s.style.background = 'white';

    prog_s.style.color = 'white';
    prog_s.style.background = 'transparent';
}
function progS(){
    techORprog = 1;
    prog_s.style.transition = '0.2s';
    prog_s.style.color = 'green';
    prog_s.style.background = 'white';


    tech_s.style.color = 'white';
    tech_s.style.background = 'transparent';
}
function activate(){
    alert('Activated successfully')
    var em = window.localStorage.getItem('email');
    var ems = window.localStorage.getItem('emails');
    ems = ems.split(' ')
    for (var i = 0; i < ems.length; i++){
        if(ems[i] == em){
            if(techORprog){
                var progs = window.localStorage.getItem('programmers');
                progs = progs.split(' ')
                progs[i] = '1'
                progs = progs.join(' ')
                window.localStorage.setItem('programmers',progs)
                var techs = window.localStorage.getItem('teachers');
                techs = techs.split(' ')
                techs[i] = '0'
                techs = techs.join(' ')
                window.localStorage.setItem('teachers',techs)
            }else{
                var progs = window.localStorage.getItem('programmers');
                progs = progs.split(' ')
                progs[i] = '0'
                progs = progs.join(' ')
                window.localStorage.setItem('programmers',progs)
                var techs = window.localStorage.getItem('teachers');
                techs = techs.split(' ')
                techs[i] = '1'
                techs = techs.join(' ')
                window.localStorage.setItem('teachers',techs)
            }
        }
    }
}