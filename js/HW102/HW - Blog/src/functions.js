import $ from 'jquery';
import { content,display,fetchJson } from ".";

export function createNavLinks(name,path) {
    const link = $(
        `<span class="link">${name}</span>`
    ).on('click', path);
    return link;
}

function commentListener(commentId) {
    let showComments = false;
    // SL - capitalized var is unusual...
    const CommentButton = $('#commentSwitch');

    // SL - given your UI only shows 1 post at a time, not so much utility in hiding and showing commments...
    CommentButton.on('click', () => {
        if(!showComments) {
            showComments = true;
            CommentButton.html('hide comments');
            display('comments',commentId);
        } else {
            const commentDiv = $('#commentDiv');
            showComments = false;
            CommentButton.html('show comments');
            commentDiv.remove();
        }
    });
}

export async function getUserInfo(id) {
    const theUser = await fetchJson(`https://jsonplaceholder.typicode.com/users?id=${id}`);
    return theUser;
}
export function UserPage() {
    $('#theContent').empty();
    display('users');
}

export function loadPosts(id){
    content.empty();
    display('posts',id);
}

export function displayPost(post) {
    content.empty();
    display('posts', post);
}

export function createUserDivs(array) {
    return array.forEach(user => {
        const userDiv = $(
            `<div class="contentContainer">
                <h2>${user.website}</h2>
                <h3>by: ${user.name}</h3>
                <br>
            </div>`
        ).on('click', e => loadPosts(`userId=${user.id}`));
        userDiv.appendTo(content);
    });
}

export function createPostDivs(array) {
    return array.forEach(post => {
        const postDiv = $(
                `<div class="postContentContainer">
                    <h3>${post.title}</h3>
                    <h4>${post.body}</h4>
                    <br>
                </div>`
        ).on('click',() => displayPost(`id=${post.id}`));
        postDiv.appendTo(content);
    });
}

export function createSelectedPost(post) {
    const postDiv = $(
        `<div id="contentContainer">
            <h1>${post.title}</h1>
            <h4>${post.body}</h4>
            <button id='commentSwitch'>show comments</button>
        </div>`
    ).appendTo(content);
    commentListener(`postId=${post.id}`);
    return postDiv;
}

export function createCommentDivs(array) {
    const theCom = $(
        '<div id="commentDiv"></div>'
    ).appendTo(content);
    return array.forEach(comment => {
        $(
            `<div class="comDiv">
                <h4>${comment.name}</h4>
                <h5>${comment.email}</h5>
                <h3>${comment.body}</h3>
                <br>
            </div>`
        ).appendTo(theCom);
    });
}

export function createUserInfo(user) {
    const window = $(
        `<div id="userWindow">
            <h1>${user.website}</h1>
            <h2>by: ${user.name}</h2>
            <button id="moreInfo">more info</button>
        </div>`
    ).appendTo(content);
    infoPage(user);
    return window;
}

function infoPage(user) {
    //wanted to put a modal window thing here... didn't get to it
    let showUser = false;
    const infoButton = $('#moreInfo');
    const theInfo = $(
        `<div id="theInfo">
            <p><span>username:</span> ${user.username}</p>
            <p><span>email:</span> ${user.email}</p>
            <p><span>address:</span> ${user.address.street} #${user.address.suite}, ${user.address.city}</p>
            <p><span>company:</span> ${user.company.name} <span class="company" id="title">catchphrase:</span> <span class="company">${user.company.catchPhrase}</span></p>
        </div>`
    );
    infoButton.on('click', () => {
        //once i have the modal thingy down, i'll prob erase this...
        if(!showUser) {
            showUser = true;
            infoButton.html('close info window');
            theInfo.appendTo(content);
        } else {
            showUser = false;
            infoButton.html('more info');
            theInfo.remove();
        }
    });
}

// SL - nice that you made a separate file for functions, but I think having multiple files divided into blogs, posts, comments might make it easier to follow and maintain
