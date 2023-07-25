(function() {
    'use strict';

    const searchForm = $('#searchInput');
    const searchInput = $('#theSearch');
    const searchOutput = $('#searchOutput');

    const map = new google.maps.Map(
        document.getElementById('mapDiv'),
        {
            zoom: 4,
            center: {lat: 40.09584720509516, lng: -74.22222707431865}
        }
    );

    const infoWindow = new google.maps.InfoWindow({ maxWidth: 260 });
    const bounds = new google.maps.LatLngBounds();

    let markerArray = [];

    searchForm.submit(async e => {
        try {
            e.preventDefault();

            if(markerArray.length){
                markerArray.forEach(marker => {
                    marker.setMap(null)
                })
                markerArray = [];
            }

            const data = await fetch(`http://api.geonames.org/wikipediaSearch?q=${searchInput.val()}&maxRows=10&username=mrsestysolomon&type=json`);
            if(!data.ok) {
                throw new Error(`${data.status} ${data.statusText}`);
            }
            const geonames = await data.json();
            let geonamesArray = geonames.geonames;

            searchOutput.empty();

            

            geonamesArray.forEach(i => {
                const pic = i.thumbnailImg ? i.thumbnailImg : undefined;

                const geoInfoContent1 = `<div class='listDisplay'>`;
                const geoInfoContent2 =   `<div>
                                    <h3>${i.title}</h3>
                                        <a href='https://${i.wikipediaUrl}'>go to page</a>
                                    </div>
                                </div>`;
                const geoInfoContent = pic
                    ? geoInfoContent1 + `<img id='listImg' src=${pic} alt=${i.title} />` + geoInfoContent2
                    : geoInfoContent1 + geoInfoContent2;
                
                const geoInfo = $(geoInfoContent);

                const thePosition = {lat: i.lat, lng: i.lng};

                bounds.extend(thePosition)

                geoInfo.appendTo(searchOutput);

                //change zoom?
                geoInfo.on('click', () => {
                    map.setZoom(13);
                    map.panTo(thePosition);
                });

                const marker = new google.maps.Marker({
                    position: thePosition,
                    map,
                    title: i.title,
                    animation: google.maps.Animation.DROP,
                    icon: i.thumbnailImg? {
                        url: pic,
                        scaledSize: new google.maps.Size(50,50)
                    } : undefined
                });

                markerArray.push(marker);

                const infoWindowContent1 = `<div><h2>${i.title}</h2>`;
                const infoWindowContent2 = `<p>${i.summary}</p><a href='http://${i.wikipediaUrl}'>go to page</a></div>`;

                const infoWindowContent = i.thumbnailImg
                    ? infoWindowContent1 + `<img class='infoWindowPic' src="${pic}" alt="${i.title}"/>` + infoWindowContent2
                    : infoWindowContent1 + infoWindowContent2;

                marker.addListener("click", () => {
                    infoWindow.setContent(infoWindowContent);
                    infoWindow.open(map,marker);
                });
            });

            map.fitBounds(bounds);
            map.setCenter(bounds.getCenter());

        } catch (err) {
            console.error(err);
        }
    });
}());