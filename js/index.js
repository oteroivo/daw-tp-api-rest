"use strict"

document.addEventListener('DOMContentLoaded', () => {
    var currentPage = 1;
    fetchCharacters(currentPage);

    var container = document.querySelector('.characters-container');

    function createCharacterCard(character, container) {
        var cardDiv = document.createElement('div');
        cardDiv.className = 'character';

        var img = document.createElement('img');
        img.className = 'character-img';
        img.src = character.image || 'https://i.pinimg.com/originals/6e/51/32/6e5132a90812ad1abf3711135a5cf406.png';
        cardDiv.appendChild(img);

        function createLabel(text, value) {
            var labelDiv = document.createElement('div');
            labelDiv.className = 'label';

            var boldSpan = document.createElement('span');
            boldSpan.className = 'font-bold';
            boldSpan.textContent = text + ': ';

            labelDiv.appendChild(boldSpan);
            labelDiv.appendChild(document.createTextNode(value));

            return labelDiv;
        };

        cardDiv.appendChild(createLabel('Name', character.name || 'Unknown'));
        cardDiv.appendChild(createLabel('Species', character.species || 'Unknown'));
        cardDiv.appendChild(createLabel('Status', character.status || 'Unknown'));
        cardDiv.appendChild(createLabel('Gender', character.gender || 'Unknown'));
        cardDiv.appendChild(createLabel('Location', character.location || 'Unknown'));
        cardDiv.appendChild(createLabel('Type', character.type || 'Unknown'));

        container.appendChild(cardDiv); 
    }

    function toggleNoCharactersContainer(value) {
        const div = document.querySelector('.no-characters-container');
        div.style.display = value;
    }


    function fetchCharacters(page) {
        var characterContainer = document.querySelector('.characters-container');

        characterContainer.innerHTML = '';

        var nameInput = document.querySelector('#name');
        var statusSelect = document.querySelector('#status');
        var speciesSelect = document.querySelector('#species');
        var typeInput = document.querySelector('#type');
        var genderSelect = document.querySelector('#gender');

        var params = `?page=${page}`;


        if(nameInput.value){
            params += `&name=${nameInput.value}`
        }

        if(statusSelect.value){
            params += `&status=${statusSelect.value}`
        }
        
        if(speciesSelect.value){
            params += `&species=${speciesSelect.value}`
        }

        if(typeInput.value){
            params += `&type=${typeInput.value}`
        }

        if(genderSelect.value){
            params += `&gender=${genderSelect.value}`
        }

        var loadingContainer = document.querySelector('.loading-card');
        loadingContainer.style.display = 'flex';
        toggleNoCharactersContainer('none')

        fetch(`https://rickandmortyapi.com/api/character${params}`)
            .then((res) => {
                return res.json();
            })
            .then(data => {
                toggleNoCharactersContainer('none')

                var characters = data.results;

                if (!characters.length) {
                    toggleNoCharactersContainer('none')
                    return;
                }

                characters.forEach((character) => {
                    var characterData = {
                        name: character.name,
                        image: character.image,
                        species: character.species,
                        status: character.status,
                        gender: character.gender,
                        type: character.type,
                        location: character.location ? character.location.name : 'Unknown'
                    };
                    createCharacterCard(characterData, container);
                })

            })
            .catch(err => {
                console.log(err);
                toggleNoCharactersContainer('flex')
            })
            .finally(() => {
                loadingContainer.style.display = 'none';
            })
    }


    var nameInput = document.querySelector('#name');
    var statusSelect = document.querySelector('#status');
    var speciesSelect = document.querySelector('#species');
    var typeInput = document.querySelector('#type');
    var genderSelect = document.querySelector('#gender');

    nameInput.addEventListener('keyup', (event) => {
        if (event.keyCode === 13) {
            fetchCharacters(currentPage);
        }
    })

    typeInput.addEventListener('keyup', (event) => {
        if (event.keyCode === 13) {
            fetchCharacters(currentPage);
        }
    })

    statusSelect.addEventListener('change', () => {
        fetchCharacters(currentPage);
    })

    speciesSelect.addEventListener('change', () => {
        fetchCharacters(currentPage);
    })

    genderSelect.addEventListener('change', () => {
        fetchCharacters(currentPage);
    })

    var buttonGetCharacters = document.querySelector('#buttonCharacters');
    var buttonNextPage = document.querySelector('#buttonNext');
    var buttonPreviousPage = document.querySelector('#buttonPrevious')

    var pageNumber = document.querySelector('#page');

    buttonGetCharacters.addEventListener('click', () => {
        var pageContainer = document.querySelector('.page-number');
        pageContainer.style.display = 'block';
        currentPage = 1;
        fetchCharacters(currentPage);
        pageNumber.textContent = currentPage;
    });

    buttonPreviousPage.addEventListener('click', () => {
        if(currentPage == 1) {
            return;
        }
        currentPage -= 1;
        fetchCharacters(currentPage);
        pageNumber.textContent = currentPage;
    });

    buttonNextPage.addEventListener('click', () => {
        currentPage += 1;
        fetchCharacters(currentPage);
        pageNumber.textContent = currentPage;
    });
});