var easyQ = [];
var quationPlayId = 0;
var PTd = document.getElementById('PlayDialog');
var quationName = document.getElementById('playTestName');
var quationAnsversDiv = document.getElementById('forAns');
var easyA = []
class EasyAns{
    constructor(quation,ansvers,rightAns){
        this.quation = quation;
        this.ansvers = ansvers;
        this.rightAns = rightAns;
        this.chosen = 0;
        this.buttons = []
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
        nameQuation.innerHTML = this.quation;
        for (let index = 0; index < this.buttons.length; index++) {
            divforAns.appendChild(this.buttons[index])            
        }
    }
    hide(divid){
        var divforAns = document.getElementById(divid);
        for (let index = 0; index < this.buttons.length; index++) {
            divforAns.removeChild(this.buttons[index])            
        }
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
            quation = base[index].split(' ')[1]
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
    var base = document.getElementById('tctext2').value;
    quationPlayId = 0;
    base = atob(base);
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
        easyA[quationPlayId].buttons[index].style.background = 'white'
        easyA[quationPlayId].buttons[index].style.color = 'black'
    }
    easyA[quationPlayId].buttons[parseInt(easyA[quationPlayId].chosen)].style.background = 'green'
    easyA[quationPlayId].buttons[parseInt(easyA[quationPlayId].chosen)].style.color = 'white'
}
function runLeft() {
    easyA[quationPlayId].hide('forAns');
    if(quationPlayId > 0){
        quationPlayId -= 1;
    }
    easyA[quationPlayId].show('playTestName','forAns');

}
function runRight() {
    easyA[quationPlayId].hide('forAns');
    if(quationPlayId < easyA.length-1){
        quationPlayId += 1;
    }
    easyA[quationPlayId].show('playTestName','forAns');
}
function finish(){
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
    tctext3.value ='Your score is: '+ rightAns/(rightAns+wrongAns)*100 + '%'
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
        }
    }
}