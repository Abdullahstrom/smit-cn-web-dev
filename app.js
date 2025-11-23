
let postsdad = document.querySelector('#postsdad');
let postinfo = document.querySelector("#postinputar");
let posttext = document.querySelector("#posttext");
let imgurl = document.querySelector("#imgurl");
let welcome = document.querySelector("#welcome");

welcome.innerHTML = `HI,${localStorage.getItem("username")}`;

var currentdiv = null;


let savedPosts = JSON.parse(localStorage.getItem("savedPosts") || "[]");
loadPosts();

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
    currentdiv.style.position = "relative";

    postsdad.insertBefore(currentdiv, postsdad.firstChild);

    posttext.value = "";
    imgurl.value = "";
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

        let newdate = new Date();
        let DATE = newdate.toLocaleString();

        
        let postData = {
            id: Date.now(),
            text: text,
            image: image,
            date: DATE
        };

        savedPosts.unshift(postData); 
        localStorage.setItem("savedPosts", JSON.stringify(savedPosts));


        renderPost(postData);

        currentdiv.remove();
        currentdiv = null;
        postinfo.classList.remove("block");
        posttext.value = "";
        imgurl.value = "";
    }
}

function renderPost(p) {
    let div = document.createElement('div');

    div.style.backgroundColor = '#B0C4DE';
    div.style.height = "300px";
    div.style.width = "300px";
    div.style.margin = "20px auto";
    div.style.borderRadius = "15px";
    div.style.position = "relative";

    if (p.text !== "") div.innerHTML += p.text.toUpperCase();
    if (p.image !== "") div.innerHTML += `<img src="${p.image}" style="width:100%;height:200px;border-radius:10px;margin-top:10px;">`;

    // TIME
    let timeBox = document.createElement("div");
    timeBox.textContent = p.date;
    timeBox.style.cssText = "position:absolute; bottom:10px; right:20px; font-size:12px; color:#011F5B;";
    div.appendChild(timeBox);

    // DELETE BUTTON
    let deleteBtn = document.createElement("button");
    deleteBtn.innerHTML = "×";
    deleteBtn.style = `
        position:absolute; top: 10px; right: 15px;
        background: #011F5B; color: white;
        border: none; width: 30px; height: 30px;
        border-radius: 50%; font-size: 20px;
        cursor: pointer;
    `;
    deleteBtn.onclick = function () {
        div.remove();
        savedPosts = savedPosts.filter(x => x.id !== p.id);
        localStorage.setItem("savedPosts", JSON.stringify(savedPosts));
    };
    div.appendChild(deleteBtn);

    postsdad.appendChild(div);
}

function loadPosts() {
    postsdad.innerHTML = "";
    savedPosts.forEach(p => renderPost(p));
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

// SEARCH
document.getElementById('filter').addEventListener("input", function () {
    let query = this.value.toUpperCase();
    let allposts = document.querySelectorAll('#postsdad div');

    allposts.forEach(ele => {
        let postText = ele.innerText.toUpperCase();
        ele.style.display = postText.includes(query) ? "block" : "none";
    });
});
document.getElementById("sortSelect").addEventListener("change", function(){
    let v = this.value;

    if(v == "new"){
        savedPosts.sort(function(a,b){ return b.id - a.id });
    }
    else if(v == "old"){
        savedPosts.sort(function(a,b){ return a.id - b.id });
    }

    localStorage.setItem("savedPosts", JSON.stringify(savedPosts));
    loadPosts(); 
});


