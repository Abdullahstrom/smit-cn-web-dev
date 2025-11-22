

let postsdad = document.querySelector('#postsdad');
let postinfo = document.querySelector("#postinputar");
let posttext = document.querySelector("#posttext");
let imgurl = document.querySelector("#imgurl");

var currentdiv = null;

function posthandler() {
    postinfo.classList.add("block");
    if (currentdiv) {
        currentdiv.remove();
    }
    currentdiv = document.createElement('div');
    currentdiv.style.backgroundColor = '#B0C4DE';
    currentdiv.style.height = "300px";
    currentdiv.style.width = "300px";
    currentdiv.style.margin = "20px auto";
    currentdiv.style.borderRadius = "15px";
    
    postsdad.insertBefore(currentdiv, postsdad.firstChild);
    
    posttext.value = "";
    imgurl.value = "";
     currentdiv.style.position = "relative";
}

function submitpost() {
    if (currentdiv) {
        let text = posttext.value.trim();
        let image = imgurl.value.trim();

        if (text === "" && image === "") {
            alert("Kuch likh ya image daal bhai!");
            currentdiv.remove();
            postinfo.classList.remove("block");
            return;
        }

        currentdiv.innerHTML = "";

        if (text !== "") {
            currentdiv.innerHTML += text.toUpperCase() ;
        }

        if (image !== "") {
            currentdiv.innerHTML += `<img src="${image}" style="width:100%;height:200px;border-radius:10px;margin-top:10px;">`;
        }
       
let deleteBtn = document.createElement("button");
deleteBtn.innerHTML = "×";     
currentdiv.appendChild(deleteBtn)          
deleteBtn.style="position:absolute; top: 10px; right: 15px; background: #011F5B; color: white; border: none; width: 30px; height: 30px; border-radius: 50%; font-size: 20px; cursor: pointer;z-index: 9999;    pointer-events: auto;"
deleteBtn.onclick=function()
{this.parentElement.remove();}


let newdate = new Date();
let DATE = newdate.toLocaleString();
let timeBox = document.createElement("div");
timeBox.textContent = DATE;
timeBox.style.cssText = "position:absolute;height:; bottom:10px; right:20px; font-size:2px; color:#E0FFFF;";
currentdiv.appendChild(timeBox);
let likes=0;
let likebtn = document.createElement("button")
likebtn.innerHTML="🤍"
likebtn.style.cssText = "position:absolute; bottom:15px; left:20px; background:none; border:none; font-size:32px; cursor:pointer;";

let likeCount = document.createElement("span");
likeCount.textContent = "0";
        likeCount.style.cssText = "position:absolute; bottom:18px; left:70px; font-size:20px; font-weight:bold; color:#011F5B;";
        likebtn.onclick = function() {
            likes++;
            likebtn.innerHTML = "❤️";
            likeCount.textContent = likes;
        };
currentdiv.appendChild(likebtn);
        currentdiv.appendChild(likeCount);


        currentdiv = null;
        postinfo.classList.remove("block");
        posttext.value = "";
        imgurl.value = "";
    }
}

function popupcls() {
    if (currentdiv) {
        currentdiv.remove();
        currentdiv = null;
    }
    postinfo.classList.remove("block");
    posttext.value = "";
    imgurl.value = "";
}
document.getElementById('filter').addEventListener("input", function() {
    let query = this.value.toUpperCase();                 
    let allposts = document.querySelectorAll('#postsdad  div');  

    allposts.forEach(function(ele) {                        
        let postText = ele.innerText.toUpperCase();         

        if (postText.includes(query)) {
            ele.style.display = "block";                    
        } else {
            ele.style.display = "none";                    
        }
    });
});