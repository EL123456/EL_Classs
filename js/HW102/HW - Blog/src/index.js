import './index.css';
import $ from 'jquery';
import { createNavLinks,getUserInfo,UserPage,loadPosts,displayPost,createUserDivs,createUserInfo,createPostDivs,createSelectedPost,createCommentDivs } from './functions';

export const content = $('#theContent');

$('#homeLogo').on('click',() => document.location.href='/HW - Blog');
$('#theUsers, #blogLink').on('click', UserPage);

export async function fetchJson(link) {
    try {
        const response = await fetch(link);
        const userData = await response.json();
        if(!response.ok) {
            throw new Error(`${response.status} ${response.statusText}`)
        }
        return userData;
    } catch (e) {
        console.error(e);
    }
}

export async function display(type,id) {
    const jsonUrl = 'https://jsonplaceholder.typicode.com';
    let fetchUrl;
    id? fetchUrl = `${jsonUrl}/${type}?${id}` : fetchUrl = `${jsonUrl}/${type}`;
    const jsonData = await fetchJson(fetchUrl);

    const navLink = $('<div id="navLink"></div>').appendTo(content);
    const navLinkHome = createNavLinks('The Blog',() => document.location.href="/hw - blog");
    const navLinkUsers = createNavLinks('users',UserPage);
    

    switch(type) {
        case 'users':
            content.css('flex-direction','row')
            navLinkHome.appendTo(navLink);
            createUserDivs(jsonData);
            break;
        case 'posts':
            const theUser = await getUserInfo(jsonData[0].userId);
            const navLinkPosts = createNavLinks(`${theUser[0].website}'s posts`,() => loadPosts(`userId=${jsonData[0].userId}`));
            if (id.includes('userId')) {
                navLink.append([
                    navLinkHome,
                    $('<span class="divider"> &gt; </span>'),
                    navLinkUsers
                ]);
                createUserInfo(theUser[0]);
                createPostDivs(jsonData);
            } else {
                navLink.append([
                    navLinkHome, ' &gt; ',
                    navLinkUsers, ' &gt; ',
                    navLinkPosts
                ]);
                createSelectedPost(jsonData[0]);
            }
            break;
        case 'comments':
            createCommentDivs(jsonData);
            break;
    }
}