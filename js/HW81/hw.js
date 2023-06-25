(function () {
    'use strict';

    const searchbar = document.getElementById('searchbar');
    const searchbarJquery = $('#searchbar');
    const display = $('#display')

    async function loadJson(url) {
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`${response.status} ${response.statusText}`)
            }
            const data = await response.json();
            return data;
        } catch (e) {
            console.error(e)
        }
    }

    async function loadPictures() {
        searchbar.addEventListener('input', async () => {
            const images = await loadJson(`${searchbarJquery.val()}.json`);
            if (searchbarJquery.val() === '') {
                display.empty();
                $('<span>what are you looking for? the options are birds and kittens</span>').appendTo(display);
            } else if (images === undefined) {
                display.empty();
                $('<span>no match was found...</span>').appendTo(display);
            } else {
                loadPicViewer(images);
            }
        })

    }

    function picViewer(number,thePictures) {
        
    }
    
    function loadPicViewer(pictures, number ,picNumber) {
        let num = number || 0;
        let picNum = picNumber || 0;

        display.empty();
        $(`
            <span id="previous"><<</span>
            <img id="viewer" src="${pictures[num].picture}"/>
            <span id="next">>></span>
        `).appendTo(display);

        $('#previous').on('click', () => {
            if (picNum === 0) {
                picNum = pictures.length - 1;
            } else {
                picNum--;
            }
            if (picNum !== num) {
                num = picNum;
                loadPicViewer(pictures,num,picNum)
            }
        });
        $('#next').on('click', () => {
            if (picNum === pictures.length - 1) {
                picNum = 0;
            } else {
                picNum++;
            }
            if (picNum !== num) {
                num = picNum;
                loadPicViewer(pictures,num,picNum)
            }
        });
    }

    loadPictures();
}());