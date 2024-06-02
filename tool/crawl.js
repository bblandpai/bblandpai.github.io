async function crawlGame() {
    let docs = document.querySelectorAll('body > div.site-wrapper-outer > div > ul.site-list > li');

    if (!docs || docs.length === 0) {
        console.error('No elements found');
        return [];
    }

    let games = [];

    for (let i = 0; i < docs.length; i++) {
        let aTag = docs[i].querySelector('a');
        let imgTag = docs[i].querySelector('img');
        let spanTag = docs[i].querySelector('span');

        let url = aTag ? aTag.href : '';
        let img = imgTag ? imgTag.src : '';
        let title = spanTag ? spanTag.innerText : '';

        if (url !== '') {
            games.push({
                url: url.replaceAll('https://www.emulatorgames.net', ''),
                img: img,
                title: title,
                categories: [],
                gameId: '',
                downloadUrl: ''
            });
        }
    }

    return games;
}

async function getCategory(document) {
    let categoriesDocs = document.querySelectorAll('body > div.site-wrapper > div.site-expand.row > div.col-md-6.col-lg-5.px-3.px-md-0.mb-3 > div.site-links.text-left.mb-2 > ul > li > a');
    let categories = [];

    if (!categoriesDocs || categoriesDocs.length === 0) {
        console.error('No categories found');
    } else {
        for (let i = 0; i < categoriesDocs.length; i++) {
            let nameCategory = categoriesDocs[i].innerText;
            let urlCategory = categoriesDocs[i].href;

            categories.push({
                name: nameCategory,
                url: urlCategory
            });
        }
    }

    return categories;
}

function getID(document) {
    let gameIdInput = document.querySelector('input[name="post_id"]');
    if (gameIdInput) {
        return gameIdInput.value;
    } else {
        console.error('Post ID input not found');
        return '';
    }
}

async function fetchDocument(url, retries = 3, backoff = 1000) {
    try {
        let response = await fetch(url);
        if (response.status === 403) {
            alert('403 Forbidden. Reloading page...');
            window.location.reload();
            return;
        }
        let text = await response.text();
        let parser = new DOMParser();
        return parser.parseFromString(text, 'text/html');
    } catch (error) {
        console.error('Failed to fetch document:', error);
        throw error;
    }
}

async function getDownloadLink(gameId) {
    let formData = new FormData();
    formData.append('get_type', 'post');
    formData.append('get_id', gameId);

    let headers = {
        'Origin': 'https://www.emulatorgames.net',
        'Pragma': 'no-cache',
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36',
        'X-Requested-With': 'XMLHttpRequest'
    };

    let response = await fetch('https://www.emulatorgames.net/prompt/', {
        method: 'POST',
        body: formData,
        headers: headers
    });

    if (response.status === 403) {
        throw Error('403 Forbidden');
    }

    if (response.ok) {
        let data = await response.json();
        if (data[2] === 'success') {
            return data[0]; // First item is the download URL
        } else {
            console.error('Failed to get download link:', data);
            return '';
        }
    } else {
        console.error('Failed to fetch download link:', response.status);
        return '';
    }
}

async function updateGameList(gameList) {
    let successfullyCrawled = [];
    let failedToCrawl = [];

    for (let game of gameList) {
        try {
            // Check in local storage
            let storedgameIds = JSON.parse(localStorage.getItem('gameIds')) || {};
            if (storedgameIds[game.url] || storedgameIds[game.gameId]) {
                console.log(`Game with gameId ${game.gameId} already exists in localStorage. Skipping...`);
                continue;
            }

            let doc = await fetchDocument(game.url);
            await new Promise(resolve => setTimeout(resolve, 3000)); // Wait for page to load, adjust delay as needed

            game.categories = await getCategory(doc);
            game.gameId = getID(doc);
            game.downloadUrl = await getDownloadLink(game.gameId);
            console.log('game', game);

            let response = await fetch('http://127.0.0.1:5000/api/v1/game', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(game)
            });

            if (response.status === 201 || response.status === 409) {
                console.log(`Successfully processed game with gameId ${game.gameId}`);
                successfullyCrawled.push(game);
                storedgameIds[game.url] = true;
                localStorage.setItem('gameIds', JSON.stringify(storedgameIds));
            } else {
                console.error(`Failed to insert game with gameId ${game.gameId}`);
                failedToCrawl.push(game);
            }

            await new Promise(resolve => setTimeout(resolve, 5000)); // Delay time 10s for crawling each game
        } catch (error) {
            console.error('Error crawling game:', game.url, error);
            if (error.message.includes('403 Forbidden')) {
                failedToCrawl.push(game);
            }
        }
    }

    console.log('Successfully crawled games:', successfullyCrawled);
    console.log('Failed to crawl games:', failedToCrawl);

    return { successfullyCrawled, failedToCrawl };
}


(async function () {
    let gameList = await crawlGame();
    let { successfullyCrawled, failedToCrawl } = await updateGameList(gameList);
    console.log('Updated Game List:', { successfullyCrawled, failedToCrawl });
    alert(JSON.stringify({ successfullyCrawled, failedToCrawl }, null, 2));
})();