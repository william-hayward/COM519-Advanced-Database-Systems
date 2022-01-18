const gameView = (game) => `

<div class="col-12">
    <div class="card">
        <h5 class="card-header"> ${game.title}</h5>
        <div class="card-body">
          <ul class="list-group">
               <li class="list-group-item">Platform: ${game.platform}</li>
                <li class="list-group-item">Genre: ${game.genre}</li>
                <li class="list-group-item">Release Date: ${game.release_date}</li>
                <li class="list-group-item">Online Features: ${game.online_features}</li>
                <li class="list-group-item">Played: ${game.played}</li>
                <li class="list-group-item">Rating: ${game.rating}</li>
          </ul>
        </div>

      </div>
 </div>
`;


const handleClick = async () => {
    const searchVal = document.querySelector("#searchInput").value;
    const gameDomRef = document.querySelector('#gameItems');
    try {

        const ref = await fetch(`/api/searching/?search=${searchVal}`);
        const searchResults = await ref.json();
        let gameHtml = [];
        searchResults.forEach(game => {
            gameHtml.push(gameView(game));
        });
        gameDomRef.innerHTML = gameHtml.join("");
    } catch (e) {
        console.log(e);
        console.log('could not search api');
    }

}