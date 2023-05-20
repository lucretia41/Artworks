// document.addEventListener("DOMContentLoaded", () => {
//     displayArtists();
//     addSubmitListener();

// })

// fetch artists

// fetch("http://localhost:3000/artists")
//     .then(res => res.json())
//     .then(artistsData => {
//         // artists.forEach(artist => renderOneArtist(artist))
//         ArtistsDisplay(artistsData),
//             showCaseArtist(artistsData[0]),
//             addNewArtist()
//     })

// const ArtistsDisplayNav = document.querySelector("#artists-guild")

// const artistName = document.querySelector(".name")
// const artistDate = document.querySelector(".date")
// const artistImage = document.querySelector(".detail-image")
// const artistObjectName = document.querySelector("#object-name")
// const artistTitle = document.querySelector("#title")


// function ArtistsDisplay(artists) {
//     artists.forEach(artist => {
//         const eachArtist = document.createElement('img')
//         eachArtist.src = artist.image
//         ArtistsDisplayNav.appendChild(eachArtist)
//         eachArtist.addEventListener("click", event => {
//             showCaseArtist(artist)
//         })
//         eachArtist.addEventListener('mouseover', event => {
//             addGlow(event, eachArtist);
//         })
//     })
// }
// // artistImage.addEventListener('mousemove', event => {
// //     addGlow(event, artistImage);


// function addGlow(event, artistImage) {
//     const colors = ['red', 'blue', 'green'];
//     const randomColor = colors[Math.floor(Math.random() * colors.length)];

//     artistImage.style.borderColor = randomColor;
//     artistImage.style.borderWidth = '5px';
//     artistImage.style.borderStyle = 'solid';
//     artistImage.style.transition = 'border-color 0.5s, border-width 0.5s';

//     setTimeout(() => {
//         artistImage.style.borderColor = '';
//         artistImage.style.borderWidth = '';
//         artistImage.style.borderStyle = '';
//         artistImage.style.transition = '';
//     }, 1000);
// }

// function addGlowToMainArtist(event, artistImage) {
//     const colors = ['red', 'blue', 'green'];
//     const randomColor = colors[Math.floor(Math.random() * colors.length)];

//     artistImage.style.borderColor = randomColor;
//     artistImage.style.borderWidth = '5px';
//     artistImage.style.borderStyle = 'solid';
//     artistImage.style.transition = 'border-color 0.5s, border-width 0.5s';
// }


// function showCaseArtist(artists) {
//     artistName.textContent = artists.name
//     artistDate.textContent = artists.date
//     artistImage.textContent = artists.image
//     artist.artistsObjectName = artists.objectname
//     artistTitle.textContent = artists.title

//     artistImage.addEventListener('mouseover', event => {
//         addGlowToMainArtist(event, artistImage);

//     })

// }

// const newArtistName = document.querySelector("#new-name")
// const newArtistsDate = document.querySelector("#new-date")
// const newArtistsImage = document.querySelector("#new-detail-image")
// const newArtistsObjectName = document.querySelector("#new-object-name")
// const newArtistsTitle = document.querySelector("#new-title")

// function addNewArtist() {
//     const newArtistForm = document.querySelector("#new-artist")
//     newArtistForm.addEventListener('submit', event => {
//         event.preventDefault()
//         const newArtist = {
//             name: newArtistName.value,
//             date: newArtistsDate.value,
//             image: newArtistsImage.value,
//             artistObjectName: newArtistsObjectName.value,
//             title: newArtistName.value,

//         }
//         ArtistsDisplay([newArtist])
//     })
// }






















function addSubmitListener() {
    const artistForm = document.getElementById('new-artist');

    artistForm.addEventListener('click', (e) => {
        e.preventDefault();
        addNewArtist();
        artistForm.reset();
    })
};

// add artist one at time

function renderOneArtist(artist) {
    const artistImg = document.createElement('img');
    const artistDiv = document.createElement('div');
    const artistMenu = document.getElementById('artist-menu');

    artistImg.src = artist.image;

    artistMenu.append(artistDiv);
    artistDiv.append(artistImg);

    artistImg.addEventListener("mouseover", () => showArtistDetails(artist));

    const deleteButton = document.createElement('button');
    deleteButton.textContent = "delete";
    deleteButton.className = "delete-btn";
    artistDiv.append(deleteButton);


    deleteButton.addEventListener('click', () => deleteArtist(artist.id, artistDiv))

}

function showArtistDetails(artist) {


    //get detail elements
    const detailImage = document.getElementById("detail-image");
    const detailName = document.getElementById("detail-name");
    const detailTitle = document.getElementById("detail-title");
    const detailDate = document.getElementById("detail-date");
    const detailLikes = document.getElementById("detail-likes");

    detailImage.src = artist.image;
    detailName.textContent = artist.name;
    detailTitle.textContent = artist.title;
    detailDate.textContent = artist.date;
    detailLikes.textContent = artist.likes;

}

// gets new artist from form, then adds it to database,
function addNewArtist() {


    // build newArtist object from form inputs
    const newName = document.getElementById("new-name").value;
    const newTitle = document.getElementById("new-title").value;
    const newImage = document.getElementById("new-image").value;
    const newDate = document.getElementById("new-date").value;
    const newLikes = document.getElementById("new-likes").value;

    const newArtist = {
        "name": newName,
        "title": newTitle,
        "image": newImage,
        "date": newDate,
        "likes": newLikes
    }
    // POST new artist to db
    fetch("http://localhost:3000/artists", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newArtist)
    })

    // add new artist to menu by calling renderOneArtist()
    renderOneArtist(newArtist);

    // display the details of the new artist
    showArtistDetails(newArtist);
}

// deletes artist from db and from artist menu

function deleteArtist(id, artistDiv) {
    // delete artist from database
    fetch(`http://localhost:3000/artists/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
    })

    // delete corresponding artist image 
    artistDiv.remove();

    // reset the displayed artist info
    const placeholderInfo = {
        "name": "Click a artist!",
        "title": ":3",
        "image": "",
        "date": "Select a artist to display its rating!",
        "likes": "Amazing."
    }

    showArtistDetails(placeholderInfo);
}


function addGlow(event, artistImage) {
    const colors = ['red', 'blue', 'green'];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];

    artistImage.style.borderColor = randomColor;
    artistImage.style.borderWidth = '5px';
    artistImage.style.borderStyle = 'solid';
    artistImage.style.transition = 'border-color 0.5s, border-width 0.5s';

    setTimeout(() => {
        artistImage.style.borderColor = '';
        artistImage.style.borderWidth = '';
        artistImage.style.borderStyle = '';
        artistImage.style.transition = '';
    }, 1000);
}



function addGlowToMainArtist(event, artistImage) {
    const colors = ['red', 'blue', 'green'];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];

    artistImage.style.borderColor = randomColor;
    artistImage.style.borderWidth = '5px';
    artistImage.style.borderStyle = 'solid';
    artistImage.style.transition = 'border-color 0.5s, border-width 0.5s';




    artistImage.addEventListener('mousemove', event => {
        addGlowToMainArtist(event, artistImage);
    })
}


