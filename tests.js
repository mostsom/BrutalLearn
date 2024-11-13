var easyQ = [];
var quationPlayId = 0;
var PTd = document.getElementById('PlayDialog');
var quationName = document.getElementById('playTestName');
var quationAnsversDiv = document.getElementById('forAns');
var easyA = [];
var Qdivs = [];
var howmanyPlay = 0;
var currentTeam = 0;
var teamScore = [];
var teamColor = ['rgba(80, 83, 255, 1)','rgba(248, 98, 98, 1)','rgba(44, 161, 40, 1)','rgba(202, 142, 29, 1)','rgba(105, 57, 1, 1)','rgba(37, 163, 153, 1)'];
var exampleTest = `1. We looked up at all the stars in ___ sky.
A) a
B) -
C) the*
2. He was elected ___ President many years ago.
A) a
B) -*
C) the
3. We went there by ___ car.
A) a
B) -*
C) the
4. We travelled to Rome last month and stayed at ___ very cheap hotel there. We did not like ___ hotel very much, but all other hotels were already booked.
A) a, the*
B) a, a
C) the, the
5. Have you got ___ headache?
A) -
B) the
C) a*
6. He stayed at ___ Hilton Hotel.
A) -
B) the*
7. She has spent her life caring for ___ sick.
A) the*
B) -
8. ___ test was not difficult. I answered ___ questions very quickly.
A) The, the*
B) The, -
C) A, the
9. He is currently in ___ prison for tax fraud.
A) a
B) -*
C) the
10. Tom is parents have been invited to ___ school because the principal wants to speak to them.
A) -
B) the*
C) a
11. Can you tell me where ___ room 25 is, please?
A) the
B) -*
12. He has to wear ___ uniform.
A) an
B) a*
13. What did you have for ___ dinner?
A) -*
B) the
14. I eat ___ apple every day
A) an*
B) -
C) the
D) a
15. Their family is extremely poor, they even have ___ little money for food, so they are almost starving.
A) -*
B) a
16. ___ United Kingdom is situated off the west coast of mainland Europe.
A) The*
B) -
17. Everest is the highest mountain in the world, in the range of mountains called ___ Himalayas.
A) the*
B) -
18. What ___ wonderful story!
A) a*
B) -
C) the
19. Good morning, ___ children!
A) the
B) -*
20. Let's watch ___ TV.
A) a
B) -*
C) the
21. Rome is very lovely in ___ spring.
A) the or -*
B) only the
C) only -
22. Which is ___ tallest building in this city?
A) the*
B) a
23. ___ more dangerous out trip is, ___ more I enjoy it.
A) -, -
B) The, the*
C) The, -
24. I came in and sat down on ___ chair which was the nearest to the door.
A) the*
B) a
25. Do you take ___ sugar in your tea?
A) -*
B) the
C) a`
class EasyAns{
    constructor(quation,ansvers,rightAns){
        this.quation = quation;
        this.ansvers = ansvers;
        this.rightAns = rightAns;
        this.chosen = null;
        this.buttons = []
        this.getGroup = 0;
        for (let index = 0; index < this.ansvers.length; index++) {
            var s = document.createElement('button')
            this.buttons.push(s);
            s.innerHTML = this.ansvers[index]
            s.id = index
            s.onclick = (e) =>{
                setAns(e.target.id)
            }
        }
    }
    show(quationid,divid){
        var nameQuation = document.getElementById(quationid);
        var divforAns = document.getElementById(divid);
        nameQuation.style.fontSize = (1000/this.quation.length)+30+'px'
        nameQuation.innerHTML = this.quation;

        for (let index = 0; index < this.buttons.length; index++) {
            divforAns.appendChild(this.buttons[index])            
        }
    }
    hide(divid){
        var divforAns = document.getElementById(divid);
        for (let index = 0; index < this.buttons.length; index++) {
            try{
                divforAns.removeChild(this.buttons[index])            
            }
            catch{

            }
        }
    }
    showG(){
        playGroupTestName.innerHTML = this.quation;
        ansverGroup.innerHTML = this.ansvers[this.rightAns].slice(2).trim();
        this.getGroup = 1
    }
}
class EasyQuation{
    constructor(quation,ansvers,rightAns){
        this.quation = quation;
        this.ansvers = ansvers;
        this.rightAns = rightAns;
    }
}
function dellChar(text,char,by='char') {
    var arr = text.split('');
    var Ttext = "";
    if(by == 'char'){
        for (var i = 0; i < text.length; i++) {
            if(arr[i] == char){
            }else{
                Ttext+=arr[i];
            }   
        }
    }else if(by == 'index'){
        Ttext = [].concat(arr.slice(0,char),arr.slice(char+1))
        Ttext = Ttext.join('');
    }
    return Ttext;
}
function main(){
    var qIndex = 1;
    var testIndex = 1;
    easyQ = [];
    var startQ = false;
    var quation = '';
    var ansvers = [];
    var rightAns = 0;
    var base = document.getElementById('tctext').value;
    var downloadQuationNames = '';
    var downloadAnsvers = '';
    var downloadRightAns = '';
    base = base.split('\n')
    for (var i = 0; i < base.length; i++) {
        if(base[i].search(testIndex+'.') == 0){
            testIndex+=1
        }
    }
    base.push(testIndex+'. test','A)','B)','C)','D)')
    for (var index = 0; index < base.length; index++) {
        if(base[index].search(qIndex+'.') == 0){
            quation = base[index]
            for (var i = 0; i < ansvers.length; i++) {
                for (var j = 0; j < ansvers[i].length; j++) {
                    if(ansvers[i][j] == "*"){
                        rightAns = i;
                        ansvers[i] = dellChar(ansvers[i],"*");
                    }
                }
            }
            easyQ.push(new EasyQuation(quation,ansvers,rightAns));
            qIndex+=1;
            ansvers = [];
            startQ = true
        }else if(startQ){
            ansvers.push(base[index])
        }
    }
    var temp = easyQ[0].quation
    var temp2 = '';
    for (var index = 1; index < easyQ.length; index++) {
        temp2 = easyQ[index].quation
        easyQ[index].quation = temp
        temp = temp2
    }
    easyQ.shift()
    for (var index = 0; index < easyQ.length; index++) {
        downloadQuationNames += easyQ[index].quation + '$'
        downloadAnsvers += easyQ[index].ansvers.join('#') + '|'
        downloadRightAns += easyQ[index].rightAns + ' '
    }
    console.log(downloadQuationNames)
    console.log(downloadAnsvers)
    console.log(downloadRightAns)
    var allinOne = downloadQuationNames +'\n'+downloadAnsvers+'\n'+downloadRightAns
    allinOne = btoa(allinOne)
    if(allinOne != "Cgo="){
        console.log(allinOne)
        downloadFile(allinOne);
    }
}
function downloadFile(content = '') {
    const link = document.createElement("a");
    var content = content;
    const file = new Blob([content], { type: 'text/plain' });
    link.href = URL.createObjectURL(file);
    link.download = "BrutalLearnTest("+Math.random().toFixed(7).slice(2)+").txt";
    link.click();
    URL.revokeObjectURL(link.href);
};
function playTest(){
    easyQ = [];
    easyA = [];
    quationPlayId = 0
    var base = document.getElementById('tctext2').value;
    quationPlayId = 0;
    try {
        base = atob(base);
    } catch (error) {
        alert(error)
    }
    console.log(base);
    var quations = base.split("\n")[0].split('$')
    var ansver = base.split("\n")[1].split('|')
    var rightAns = base.split("\n")[2].split(' ')
    var ansvers = []
    quations.pop();
    ansver.pop();
    rightAns.pop();
    for (var index = 0; index < ansver.length; index++) {
        ansvers.push(ansver[index].split('#'))
    }
    console.log(ansvers)
    for (var index = 0; index < quations.length; index++) {
        easyA.push(new EasyAns(quations[index],ansvers[index],rightAns[index]));
    }
    easyA[quationPlayId].show('playTestName','forAns');
    PTd.style.display = 'flex';
}
function setAns(btnid){
    easyA[quationPlayId].chosen = btnid;
    for (let index = 0; index < easyA[quationPlayId].buttons.length; index++) {
        easyA[quationPlayId].buttons[index].style.background = 'rgba(45,45,45,1)'
        easyA[quationPlayId].buttons[index].style.color = '#fff'
    }
    easyA[quationPlayId].buttons[parseInt(easyA[quationPlayId].chosen)].style.background = 'green'
    easyA[quationPlayId].buttons[parseInt(easyA[quationPlayId].chosen)].style.color = 'white'
}
function runLeft() {
    for (let index = 0; index < easyA.length; index++) {
        easyA[index].hide('forAns');
    }
    if(quationPlayId > 0){
        quationPlayId -= 1;
    }
    easyA[quationPlayId].show('playTestName','forAns');

}
function runRight() {
    for (let index = 0; index < easyA.length; index++) {
        easyA[index].hide('forAns');
    }
    if(quationPlayId < easyA.length-1){
        quationPlayId += 1;
    }
    easyA[quationPlayId].show('playTestName','forAns');
}
function finish(){
    for (let index = 0; index < easyA.length; index++) {
        easyA[index].hide('forAns');
    }
    PTd.style.display = 'none'
    var rightAns = 0;
    var wrongAns = 0;
    for (let index = 0; index < easyA.length; index++) {
        if(easyA[index].rightAns == easyA[index].chosen){
            rightAns+=1;
        }else{
            wrongAns+=1;
        }
    }
    tctext3.value ='Your score is: '+ Math.round(rightAns/easyA.length*100) + '% out of 100%';
}
var em = window.localStorage.getItem('email');
var ems = window.localStorage.getItem('emails');
ems = ems.split(' ')
for (var i = 0; i < ems.length; i++){
    if(ems[i] == em){
        var progs = window.localStorage.getItem('programmers');
        progs = progs.split(' ')
        var techs = window.localStorage.getItem('teachers');
        techs = techs.split(' ')
        if(techs[i] == '1'){
            TestCreator.style.display = 'flex'
            groupWork.style.display = 'block'
        }
    }
}
function exempleT(){
    tctext.value = exampleTest
}
groupSize.onchange = () =>{
    group_size_span.innerHTML = groupSize.value;
    quationCardSize.setAttribute("min", groupSize.value)
    quationCardSize.setAttribute("max", easyA.length-(easyA.length/groupSize.value-Math.round(easyA.length/groupSize.value))*groupSize.value)
    quationCardSize.setAttribute("step", groupSize.value)
    quation_size_span.innerHTML = quationCardSize.value;
}
quationCardSize.onchange = () =>{
    quation_size_span.innerHTML = quationCardSize.value;

}
function playGroup() {
    easyQ = [];
    easyA = [];
    quationPlayId = 0
    var base = document.getElementById('tctext2').value;
    quationPlayId = 0;
    try {
        base = atob(base);
    } catch (error) {
        alert("WRONG CODE")
    }
    console.log(base);
    var quations = base.split("\n")[0].split('$')
    var ansver = base.split("\n")[1].split('|')
    var rightAns = base.split("\n")[2].split(' ')
    var ansvers = []
    quations.pop();
    ansver.pop();
    rightAns.pop();
    for (var index = 0; index < ansver.length; index++) {
        ansvers.push(ansver[index].split('#'))
    }
    console.log(ansvers)
    for (var index = 0; index < quations.length; index++) {
        easyA.push(new EasyAns(quations[index],ansvers[index],rightAns[index]));
    }
    settingGroup.style.display = 'flex';
    quationCardSize.setAttribute("max", easyA.length-(easyA.length/groupSize.value-Math.round(easyA.length/groupSize.value))*groupSize.value)
}
function StartGroupPlay(){
    Qdivs = [];
    currentTeam = 0;
    teamScore = []
    gps = groupSize.value;
    qcs = parseInt(quationCardSize.value);
    howmanyPlay = gps;
    for (let index = 0; index < gps; index++) {
        teamScore.push(0)
    }
    settingGroup.style.display = 'none'
    PlayDialogGroup.style.display = 'flex'
    PlayDialogGroup.style.backgroundColor = teamColor[currentTeam];
    for (let index = 0; index < qcs; index++) {
        var tdiv = document.createElement('div')
        tdiv.innerHTML = index+1
        tdiv.id = index
        tdiv.onclick = (e) =>{
            showGsoloQuation(e.target.id);
        }
        tdiv.style.width = "250px"
        tdiv.style.height = "120px"
        tdiv.style.display = 'flex'
        tdiv.style.borderRadius = '20px'
        tdiv.style.justifyContent = 'center';
        tdiv.style.alignItems = 'center';
        tdiv.style.textAlign = 'center'
        tdiv.style.background = 'rgba(20,20,20,0.7)'
        tdiv.style.margin = '5px'
        tdiv.style.border = '1px solid rgba(20,20,20,1)'
        Qdivs.push(tdiv);
    }
    for (let index = 0; index < Qdivs.length; index++) {
        quationsGroup.appendChild(Qdivs[index])
    }
}
function showGsoloQuation(id) {
    if(!easyA[id].getGroup){
        QuationSoloBlock.style.display = 'flex';
        QuationBlockGroup.style.display = 'none';
        easyA[id].showG();
    }
}
function CheckAnsG(){
    ansverGroup.style.display = 'block';
    checkBtn.style.display = 'none';
    correct.style.display = 'block';
    incorrect.style.display = 'block';
}
function BackAnsG(){
    var temps = 0
    PlayDialogGroup.style.backgroundColor = teamColor[currentTeam];
    for (let index = 0; index < Qdivs.length; index++) {
        if(easyA[index].getGroup){
            Qdivs[index].innerHTML = '-'
        }else{
            temps = 1;
            Qdivs[index].innerHTML = index+1
        }
    }
    if(temps == 0){
        PlayDialogGroup.style.display = 'none'
        QuationSoloBlock.style.display = 'none';
        QuationBlockGroup.style.display = 'flex';
        ansverGroup.style.display = 'none';
        checkBtn.style.display = 'block';
        backBtn.style.display = 'none';
        var finalText = ''
        for (let index = 0; index < Qdivs.length; index++) {
            quationsGroup.removeChild(Qdivs[index])
        }
        for (let index = 0; index < teamScore.length; index++) {
            finalText += (index+1)+' Team: ' +teamScore[index] + '\n';
        }
        tctext3.value = finalText;
    }else{
        QuationSoloBlock.style.display = 'none';
        QuationBlockGroup.style.display = 'flex';
        ansverGroup.style.display = 'none';
        checkBtn.style.display = 'block';
        backBtn.style.display = 'none';
    }
}
function cAns(){
    teamScore[currentTeam] += 1;
    correct.style.display = 'none';
    incorrect.style.display = 'none';
    backBtn.style.display = 'block';
    if(currentTeam > howmanyPlay-2){
        currentTeam = 0;
    }else{
        currentTeam += 1;
    }
}
function incAns() {
    correct.style.display = 'none';
    incorrect.style.display = 'none';
    backBtn.style.display = 'block';
    if(currentTeam > howmanyPlay-2){
        currentTeam = 0;
    }else{
        currentTeam += 1;
    }
}