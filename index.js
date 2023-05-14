document.addEventListener("DOMContentLoaded", () => {
    displayArtists();
    addSubmitListener();

})

// fetch artists
function displayArtists() {
    fetch('http://localhost:3000/artists')
        .then(res => res.json())
        .then(artists => {
            artists.forEach(artist => renderOneArtist(artist))
            showArtistDetails(artists[0]);

        })
}
function addSubmitListener() {
    const artistForm = document.getElementById('new-artist');

    artistForm.addEventListener('submit', (e) => {
        e.preventDefault();
        addNewArtist();
        artistForm.reset();
    })
}

// add artist one at time

function renderOneArtist(artist) {
    const artistImg = document.createElement('img');
    const artistDiv = document.createElement('div');
    const artistMenu = document.getElementById('artist-menu');

    artistImg.src = artist.image;

    artistMenu.append(artistDiv);
    artistDiv.append(artistImg);

    artistImg.addEventListener("click", () => showArtistDetails(artist));

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
    const detailRestaurant = document.getElementById("detail-restaurant");
    const detailRating = document.getElementById("detail-rating");
    const detailComment = document.getElementById("detail-comment");

    detailImage.src = artist.image;
    detailName.textContent = artist.name;
    detailRestaurant.textContent = artist.restaurant;
    detailRating.textContent = artist.date;
    detailComment.textContent = artist.comment;

}

// gets new artist from form, then adds it to database, then adds to menu
function addNewArtist() {
    // build newArtist object from form inputs
    const newName = document.getElementById("new-name").value;
    const newRestaurant = document.getElementById("new-restaurant").value;
    const newImage = document.getElementById("new-image").value;
    const newRating = document.getElementById("new-rating").value;
    const newComment = document.getElementById("new-comment").value;

    const newArtist = {
        "name": newName,
        "restaurant": newRestaurant,
        "image": newImage,
        "date": newRating,
        "comment": newComment
    }
    // POST new artist to db
    fetch("http://localhost:3000/artists", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newArtist)
    })

    // add new ramen to menu by calling renderOneArtist()
    renderOneArtist(newArtist);

    // display the details of the new artist (nifty!)
    showArtistDetails(newArtist);
}

// deletes ramen from db and from artist menu
// we pass in the id of the artist to identify it on the back end
// and we pass in the artistDiv to identify it on the front end
function deleteArtist(id, artistDiv) {
    // delete ramen from database
    fetch(`http://localhost:3000/artists/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
    })

    // delete corresponding artist image from menu
    artistDiv.remove();

    // reset the displayed artist info
    const placeholderInfo = {
        "name": "Click a artist!",
        "restaurant": ":3",
        "image": "",
        "rating": "Select a artist to display its rating!",
        "comment": "Same deal."
    }

    showArtistDetails(placeholderInfo);
}
