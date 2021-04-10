/*
 * @Author: Mr.Mark  
 * @Date: 2019-10-18 19:49:27 
 * @Last Modified by: Mr.Mark
 * @Last Modified time: 2020-03-25 11:25:51
 */
let siteTitle = document.querySelector('.site-title');
let content = document.querySelector('.demo-content');
let count = document.querySelector('#count');
let navLis = document.querySelectorAll('.demo-nav-content li a');
let contents = document.querySelectorAll('.demo-content-item');
let contentItem = document.querySelectorAll('.demo-content-item-ls');
let pathName = location.pathname.split('/');
let host = location.origin + '/' + pathName[1];

// 到顶部
let goTopBtn = document.querySelector('.demo-go-top');
let showNav = document.querySelector('.demo-nav-m');
let demoNav = document.querySelector('.demo-nav');
let navExit = document.querySelector('.demo-nav-exit');

// 获取数据
getData();

function getData () {
    let data = axios.get(host + '/assets/mock/site.json');
    data.then(function(res) {
        if (res.status === 200) {
            let data = res;
            document.title = '网址导航 - ' + data.data.name;
            siteTitle.innerText = data.data.name;
            let list = data.data.data.v1.data.list;
            let navs = data.data.data.v1.data.navs;
            showNavs(navs);
            showData(list);
        } else {
            let list = [];
            showData(list);
        }
    })
    .catch(function(err) {
        throw new Error(err);
    })
}

// 显示数据
function showNavs (list) {  
    let contentNavs = document.querySelector('.demo-nav-content');
    let contentBox = document.querySelector('.demo-content-box');
    let str = '';
    let strLi = '';
    for (let i = 0; i < list.length; i++) {
        const element = list[i];
        str += '<li><a href="#' + element.des + '"><i class="fa fa-'+ element.icon + '"></i> <span>' + element.title + '</span></a></li>';    
        strLi += '<div class="demo-content-item"><h3 class="demo-content-item-title" id="' + element.des + '">' + element.title + '(<span class="count">0</span>)</h3><ul class="demo-content-item-ls demo-content-item-ls-two clearFix"></ul></div>'
    }
    contentNavs.innerHTML += str;
    contentBox.innerHTML += strLi;
}

function showData (list) {
    let contentItem = document.querySelectorAll('.demo-content-item-ls');
    let counts = document.querySelectorAll('.count');

    for (let i = 0; i < list.length; i++) {
        const element = list[i];
        let cIndex = element.cid-1;
        if (element.href.indexOf('http') > -1 || element.href.indexOf('https') > -1) {
            element.href = host + '/link/?url=' + element.href;
        } else {
            element.href = host + element.href;
        }
        let str = '<li><a href="' + element.href + '" target="_blank" title=" ' + element.des + '"><img class="lazyimg" src="../assets/images/holder.png" data-src="' + '../' + element.cover + '" alt="' + element.name + '"><div><span class="project-title">' + element.name + '</span><span class="project-des">' + element.des + '</span></div></a></li>';
        contentItem[cIndex].innerHTML += str;
    }
    for (let i = 0; i < contentItem.length; i++) {
        const element = contentItem[i];
        counts[i].innerText = element.childNodes.length;
    }
    count.innerText = list.length;
    lazyLoad();
}

// 图片懒加载
function lazyLoad() {
    let n = 0;
    let lazyImgs = document.querySelectorAll('.lazyimg');
    let clientHeight = document.documentElement.clientHeight || document.body.clientHeight;
    let scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    for (var i = n; i < lazyImgs.length; i++) {
      if (lazyImgs[i].offsetTop < (clientHeight + scrollTop)) {
        let secImgs = lazyImgs[i];
        if (secImgs.getAttribute('src') === '../assets/images/holder.png') {
            secImgs.src = secImgs.getAttribute('data-src');
        }
      }
      n = i + 1;
    }
}

window.addEventListener('scroll', function(){
    // 懒加载
    lazyLoad();
    // 到顶部
    let scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    if (scrollTop > 280) {
        goTopBtn.style.display = 'block';
    } else {
        goTopBtn.style.display = 'none';
    }
    // 滚动高亮
    for (let i = 0; i < contents.length; i++) {
        const element = contents[i].offsetTop - 50;
        if (element <= scrollTop) {
          for (let j = 0; j < navLis.length; j++) {
            navLis[j].className = '';
          }
          navLis[i].className = 'active';
        }
      }
}, false);

// 点击到对应
goNavContent();
function goNavContent () {
    for (let i = 0; i < navLis.length; i++) {
        const element = navLis[i];
        element.addEventListener('click', function(e) {
            let contentTop = 0;
            if (contents[i]) {
                contentTop = contents[i].offsetTop;
            }
            document.documentElement.scrollTop = contentTop;
            document.body.scrollTop = contentTop;
        })
    }
}

// 到顶部
$g.addEvent(goTopBtn, 'click', goTop, false);
function goTop () {
    let timer = setInterval(function () {
    let top = document.documentElement.scrollTop || document.body.scrollTop;
    let speed = 0;
    if (top > 0) {
        speed = Math.floor(-top / 6);
    }
    if (top == 0) {
        clearInterval(timer);
    }
    document.documentElement.scrollTop = document.body.scrollTop = top + speed;
    }, 10);
}

// 手机版显示左侧导航
if (navigator.userAgent.indexOf('Mobile') > -1) {
    if (showNav) {
        showNav.addEventListener('click', showSilderNav, false);
        function showSilderNav () {
            demoNav.style.left = 0;
        }
    }
    if (navExit) {
        navExit.addEventListener('click', hideSilderNav, false);
        function hideSilderNav () {
            demoNav.style.left = -100 + '%';
        }    
    }
}

window.onresize = function () {
    let clientWidth = document.documentElement.clientWidth || document.body.clientWidth;
    if (clientWidth >= 750) {
        demoNav.style.left = 0;
    } else {
        demoNav.style.left = -100 + '%';
    }
}