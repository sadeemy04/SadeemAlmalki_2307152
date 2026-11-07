
let likes = 100;
let dislikes = 20;
let comments = [];
let vote = "";

let likeButton = document.getElementById("like-btn");
let dislikeButton = document.getElementById("dislike-btn");
let likeCount = document.getElementById("like-count");
let dislikeCount = document.getElementById("dislike-count");
let commentInput = document.getElementById("comment-input");
let submitButton = document.getElementById("submit-btn");
let clearButton = document.getElementById("clear-btn");
let commentsList = document.getElementById("comments-list");

// read saved cookies
let cookies = document.cookie.split(";");

for (let cookie of cookies) {
    let [key, value] = cookie.trim().split("=");

    if (key === "lab6Vote") {
        vote = value;
    }

    if (key === "lab6Comment") {
        comments.push(value);
    }
}

// restore saved vote
if (vote === "like") {
    likes++;
}

if (vote === "dislike") {
    dislikes++;
}

// update counters and comments
function updatePage() {
    likeCount.innerText = likes;
    dislikeCount.innerText = dislikes;

    commentsList.innerHTML = "";

    for (let comment of comments) {
        let p = document.createElement("p");
        p.innerText = comment;
        commentsList.appendChild(p);
    }
}

// like button
likeButton.addEventListener("click", function () {
    if (vote === "") {
        likes++;
        vote = "like";

        document.cookie = "lab6Vote=like; max-age=86400";

        updatePage();
    }
});

// dislike button
dislikeButton.addEventListener("click", function () {
    if (vote === "") {
        dislikes++;
        vote = "dislike";

        document.cookie = "lab6Vote=dislike; max-age=86400";

        updatePage();
    }
});

// submit comment
submitButton.addEventListener("click", function () {
    let comment = commentInput.value.trim();

    if (comment !== "" && comments.length === 0) {
        comments.push(comment);

        document.cookie = "lab6Comment=" + comment + "; max-age=86400";

        commentInput.value = "";
        updatePage();
    }
});

// clear cookies and reset
clearButton.addEventListener("click", function () {
    document.cookie = "lab6Vote=; expires=" + new Date(2000, 0, 1).toUTCString();
    document.cookie = "lab6Comment=; expires=" + new Date(2000, 0, 1).toUTCString();

    likes = 100;
    dislikes = 20;
    comments = [];
    vote = "";

    commentInput.value = "";
    updatePage();
});

updatePage();
