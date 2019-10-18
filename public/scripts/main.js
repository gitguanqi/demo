/*
 * @Author: fed_guanqi 
 * @Date: 2019-10-18 19:49:27 
 * @Last Modified by: fed_guanqi
 * @Last Modified time: 2019-10-18 21:21:43
 */
let siteTitle = document.querySelector('.site-title');
let counts = document.querySelectorAll('.count');
let contentItem = document.querySelectorAll('.demo-content-item-ls');

getData();
async function getData () {
    let data = await axios.get('/demo/public/mock/list.json');
    document.title = data.data.name + '- 探索前端新技术';
    siteTitle.innerText = data.data.name;
    let list = data.data.data.v1.data.list;
    showData(list);
}

function showData (list) {
    let contentItem = document.querySelectorAll('.demo-content-item-ls');
    let host = location.origin;
    list.forEach(element => {
        let cIndex = element.cid.toString().split('')[0] - 1;
        let tags = element.tags.split(',').join(', ');
        if (element.href.indexOf('http') > -1 || element.href.indexOf('https') > -1) {
            element.href = host + '/demo/link/?url=' + element.href;
        } else {
            element.href = host + '/demo/' + element.href;
        }
        contentItem[cIndex].innerHTML += `<li>
            <a href="${element.href}" target="_blank" title="${element.description}">
                <img src="${host}/demo/public/images/holder.png" data-src="${host + '/demo/' + element.picUrl}" alt="${element.name}">
                <span class="project-title">${element.name}</span>
                <span class="project-des">${element.description}</span>
                <span class="project-tags"><i class="fa fa-tags"></i> ${tags}</span>
            </a>
        </li>`;
    });
    for (let i = 0; i < contentItem.length; i++) {
        const element = contentItem[i];
        counts[i].innerText = element.childNodes.length;
    }
}