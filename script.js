document.addEventListener('DOMContentLoaded', function() {
    const questions = [
        {
            question: "¿Cuál es tu color favorito?",
            options: { A: "Rojo", B: "Azul", C: "Verde", D: "Amarillo" }
        },
        {
            question: "¿Cuál es tu tipo de comida favorita?",
            options: { A: "Comida rápida", B: "Comida gourmet", C: "Comida saludable", D: "Comida tradicional" }
        },
        {
            question: "¿Cuál es tu actividad favorita en tu tiempo libre?",
            options: { A: "Leer libros", B: "Jugar deportes", C: "Hacer manualidades", D: "Ver películas" }
        },
        {
            question: "¿Qué valor aprecias más?",
            options: { A: "Coraje", B: "Sabiduría", C: "Lealtad", D: "Ambición" }
        },
        {
            question: "¿Cuál es tu estación del año favorita?",
            options: { A: "Verano", B: "Invierno", C: "Primavera", D: "Otoño" }
        },
        {
            question: "¿Qué tipo de libros prefieres?",
            options: { A: "Aventuras", B: "Misterio", C: "Fantasía", D: "Romance" }
        },
        {
            question: "¿Cuál es tu animal favorito?",
            options: { A: "León", B: "Águila", C: "Erizo", D: "Serpiente" }
        },
        {
            question: "¿Cómo te enfrentas a un problema?",
            options: { A: "Con valentía", B: "Con análisis", C: "Con paciencia", D: "Con estrategia" }
        },
        {
            question: "¿Qué tipo de película prefieres?",
            options: { A: "Acción", B: "Documental", C: "Animación", D: "Ciencia ficción" }
        },
        {
            question: "¿Cuál es tu hobby favorito?",
            options: { A: "Escuchar música", B: "Jugar a juegos de mesa", C: "Pintar o dibujar", D: "Hacer deporte" }
        }
    ];

    function createQuestionElement(question, index) {
        const questionElement = document.createElement('div');
        questionElement.classList.add('question');

        const questionText = document.createElement('h3');
        questionText.textContent = question.question;
        questionElement.appendChild(questionText);

        for (const [key, value] of Object.entries(question.options)) {
            const answerLabel = document.createElement('label');
            const answerInput = document.createElement('input');
            answerInput.type = 'radio';
            answerInput.name = `q${index + 1}`;
            answerInput.value = key;
            answerLabel.appendChild(answerInput);
            answerLabel.appendChild(document.createTextNode(value));
            questionElement.appendChild(answerLabel);
        }

        return questionElement;
    }

    function setImageSource(imageElement, baseName) {
        const formats = ['webp'];
        let formatIndex = 0;

        function tryNextFormat() {
            if (formatIndex < formats.length) {
                imageElement.src = `${baseName}.${formats[formatIndex]}`;
                const img = new Image();
                img.onload = () => { /* Image loaded successfully */ };
                img.onerror = () => {
                    formatIndex++;
                    tryNextFormat();
                };
                img.src = imageElement.src;
            } else {
                imageElement.src = 'default-image.jpg';
            }
        }

        tryNextFormat();
    }

    document.getElementById('hat-btn').addEventListener('click', function() {
        document.getElementById('dialogue-section').style.display = 'block';
        document.getElementById('hat-image').style.display = 'none';
    });

    document.getElementById('name-submit-btn').addEventListener('click', function() {
        const nameInput = document.getElementById('name-input').value.trim();
        if (nameInput) {
            document.getElementById('dialogue-section').style.display = 'none';
            document.getElementById('welcome-text').textContent = `Mucho gusto, ${nameInput}. Soy el sombrero seleccionador.`;
            document.getElementById('welcome-section').style.display = 'block';
        } else {
            alert('Por favor, ingresa tu nombre.');
        }
    });

    document.getElementById('start-quiz-btn').addEventListener('click', function() {
        const quizContainer = document.getElementById('quiz-form');
        quizContainer.innerHTML = '';
        questions.forEach((question, index) => {
            quizContainer.appendChild(createQuestionElement(question, index));
        });

        document.getElementById('welcome-section').style.display = 'none';
        document.getElementById('quiz-section').style.display = 'block';

        let timeLeft = 25;
        const timerElement = document.getElementById('timer');
        const timerInterval = setInterval(() => {
            timeLeft--;
            timerElement.textContent = timeLeft;
            if (timeLeft <= 0) {
                clearInterval(timerInterval);
                document.getElementById('time-up-image').style.display = 'block';
                document.getElementById('submit-quiz-btn').style.display = 'none';
                document.getElementById('retry-quiz-btn').style.display = 'block';
            }
        }, 1000);

        document.getElementById('submit-quiz-btn').style.display = 'block';
    });

    document.getElementById('submit-quiz-btn').addEventListener('click', function() {
        let houseScores = { A: 0, B: 0, C: 0, D: 0 };
        const allAnswered = questions.every((_, index) => {
            const selectedOption = document.querySelector(`input[name="q${index + 1}"]:checked`);
            if (selectedOption) {
                houseScores[selectedOption.value]++;
                return true;
            }
            return false;
        });

        if (allAnswered) {
            const highestScore = Math.max(...Object.values(houseScores));
            const houses = { A: 'gryffindor', B: 'ravenclaw', C: 'hufflepuff', D: 'slytherin' };
            const selectedHouse = Object.keys(houseScores).find(key => houseScores[key] === highestScore);

            document.getElementById('result-text').textContent = `¡Felicidades, perteneces a la casa ${capitalize(houses[selectedHouse])}!`;
            setImageSource(document.getElementById('result-image'), houses[selectedHouse]);

            document.getElementById('result-image').style.display = 'block';
            document.getElementById('quiz-section').style.display = 'none';
            document.getElementById('result-section').style.display = 'block';

            document.getElementById('house-button').style.display = 'block';
            document.getElementById('house-button').textContent = `Ir a la página de ${capitalize(houses[selectedHouse])}`;
            document.getElementById('house-button').onclick = function() {
                window.location.href = `${houses[selectedHouse]}.html`;
            };
        } else {
            alert('Por favor, responde todas las preguntas.');
        }
    });

    document.getElementById('retry-quiz-btn').addEventListener('click', function() {
        document.getElementById('quiz-form').innerHTML = '';
        document.getElementById('time-up-image').style.display = 'none';
        document.getElementById('submit-quiz-btn').style.display = 'none';
        document.getElementById('retry-quiz-btn').style.display = 'none';
        document.getElementById('welcome-section').style.display = 'block';
    });

    document.getElementById('thank-you-btn').addEventListener('click', function() {
        window.location.href = 'index.html';
    });

    function capitalize(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
});


