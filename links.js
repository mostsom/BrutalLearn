var link = {'index':'index.html',
            'logout':'logout.html',
            'logreg':'LogReg.html',
            'regplus':'RegPlus.html',
            'self':'selfMe.html'}
var home = document.getElementById('home');
var howitworks = document.getElementById('howitworks');
var becomeapartner = document.getElementById('becomeapartner');
var aboutus = document.getElementById('aboutus');
var loginregister = document.getElementById('loginregister');
var logout = document.getElementById('logout');

home.href = link.index
becomeapartner.href = link.regplus
loginregister.href = link.logreg
logout.href = link.logout