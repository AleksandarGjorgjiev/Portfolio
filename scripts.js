function toggleContent(event, id) {
    event.preventDefault();
    var content = document.getElementById(id);
    if (content.style.display === "none" || content.style.display === "") {
        content.style.display = "block";
    } else {
        content.style.display = "none";
    }
}

// Game Logic for "Guess The Capital City"
document.addEventListener('DOMContentLoaded', function () {
    const countries = [
        { name: "Македонија", capitalCity: "Скопје" },
        { name: "Германија", capitalCity: "Берлин" },
        { name: "Франција", capitalCity: "Париз" },
        { name: "Шпанија", capitalCity: "Мадрид" },
        { name: "Грција", capitalCity: "Атина" },
        { name: "Србија", capitalCity: "Белград" },
        { name: "Босна", capitalCity: "Сараево" },
        { name: "Црна Гора", capitalCity: "Подгорица" },
        { name: "Бугарија", capitalCity: "Софија" },
        { name: "Турција", capitalCity: "Анкара" },
        { name: "Кина", capitalCity: "Пекинг" },
        { name: "Русија", capitalCity: "Москва" },
        { name: "Англија", capitalCity: "Лондон" },
        { name: "Португалија", capitalCity: "Лисабон" },
        { name: "Италија", capitalCity: "Рим" },
        { name: "Авганистан", capitalCity: "Кабул" },
        { name: "Австрија", capitalCity: "Виена" },
        { name: "Белгија", capitalCity: "Брисел" },
        { name: "Канада", capitalCity: "Отава" },
        { name: "Куба", capitalCity: "Хавана" },
        { name: "Чешка", capitalCity: "Прага" },
        { name: "Финска", capitalCity: "Хелсинки" },
        { name: "Унгарија", capitalCity: "Будимпешта" },
        { name: "Иран", capitalCity: "Техеран" },
        { name: "Ирак", capitalCity: "Багдад" },
        { name: "Индија", capitalCity: "Њу Делхи" },
        { name: "Јапонија", capitalCity: "Токио" },
        { name: "Луксембург", capitalCity: "Луксембург" },
        { name: "Монако", capitalCity: "Монако" },
        { name: "Норвешка", capitalCity: "Осло" },
        { name: "Холандија", capitalCity: "Амстердам" }
    ];

    let currentCountryIndex = 0;
    let score = 0;

    const gameContainer = document.getElementById('game');
    const modal = document.getElementById('modal');
    const highscoresList = document.getElementById('highscoresList');
    const playerNameInput = document.getElementById('playerNameInput');

    function displayCountry() {
        if (currentCountryIndex >= countries.length) {
            currentCountryIndex = 0;
        }
        gameContainer.innerHTML = `
            <h3>Guess the Capital City</h3>
            <p>Country: ${countries[currentCountryIndex].name}</p>
            <input type="text" id="capitalGuess" placeholder="Enter capital city" />
            <button onclick="checkAnswer()">Submit</button>
        `;
    }

    window.checkAnswer = function () {
        const capitalGuess = document.getElementById('capitalGuess').value.trim();
        if (capitalGuess.toLowerCase() === countries[currentCountryIndex].capitalCity.toLowerCase()) {
            alert('Correct!');
            score++;
        } else {
            alert(`Incorrect! The correct answer is ${countries[currentCountryIndex].capitalCity}.`);
        }
        currentCountryIndex++;
        displayCountry();
    };

    document.getElementById('resetScoreBtn').addEventListener('click', () => {
        score = 0;
        currentCountryIndex = 0;
        displayCountry();
    });

    document.getElementById('showModalBtn').addEventListener('click', () => {
        modal.classList.add('modal-show');
        loadHighscores();
    });

    document.getElementById('closeModalBtn').addEventListener('click', () => {
        modal.classList.remove('modal-show');
    });

    document.getElementById('saveScoreBtn').addEventListener('click', () => {
        const playerName = playerNameInput.value.trim();
        if (playerName) {
            saveHighscore(playerName, score);
            playerNameInput.value = '';
            modal.classList.remove('modal-show');
        }
    });

    function loadHighscores() {
        const highscores = JSON.parse(localStorage.getItem('highscores')) || [];
        highscoresList.innerHTML = highscores.map(score => `<li>${score.name}: ${score.score}</li>`).join('');
    }

    function saveHighscore(name, score) {
        const highscores = JSON.parse(localStorage.getItem('highscores')) || [];
        highscores.push({ name, score });
        highscores.sort((a, b) => b.score - a.score);
        localStorage.setItem('highscores', JSON.stringify(highscores));
    }

    displayCountry();
});
