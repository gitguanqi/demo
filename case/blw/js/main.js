var more=document.querySelector(".more"),back=document.querySelector(".back"),totop=document.querySelector(".totop"),navlist=document.querySelector(".navlist");more.onclick=function(o){o=o||window.event,o.preventDefault(),navlist.style.display="block",more.style.display="none"},back.onclick=function(o){o=o||window.event,o.preventDefault(),navlist.style.display="none",more.style.display="block"},window.onscroll=function(){var o=document.documentElement.scrollTop||document.body.scrollTop;o+=10,o>100&&(totop.style.display="block"),100>o&&(totop.style.display="none")},totop.onclick=function(o){o=o||window.event,o.preventDefault();var e=setInterval(function(){var o=document.documentElement.scrollTop||document.body.scrollTop;return o-=30,document.documentElement.scrollTop?document.documentElement.scrollTop=o:document.body.scrollTop=o,0>o?void clearInterval(e):void 0},2)};