document.addEventListener('DOMContentLoaded', function () {
    const buttons = document.querySelectorAll('.choice');
    const resultDiv = document.getElementById('result');
    const countdownDiv = document.getElementById('countdown');
    const playerScoreSpan = document.getElementById('player-score');
    const computerScoreSpan = document.getElementById('computer-score');

    let playerScore = 0;
    let computerScore = 0;

    buttons.forEach(button => {
        button.addEventListener('click', () => {
            const playerChoice = button.getAttribute('data-choice');
            startCountdown(() => playGame(playerChoice));
        });
    });

    // Countdown function
    function startCountdown(callback) {
        let count = 3;
        countdownDiv.textContent = count + '...';
        const interval = setInterval(() => {
            count--;
            if (count > 0) {
                countdownDiv.textContent = count + '...';
            } else {
                clearInterval(interval);
                countdownDiv.textContent = "";
                callback();
            }
        }, 1000);
    }

    // Play the game
    function playGame(playerChoice) {
        fetch('/play', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ choice: playerChoice })
        })
        .then(response => response.json())
        .then(data => {
            const resultText = `You chose ${data.player_choice}. Computer chose ${data.computer_choice}. ${data.result}`;
            resultDiv.textContent = resultText;

            // Update the score
            if (data.result === "You win!") {
                playerScore++;
            } else if (data.result === "Computer wins!") {
                computerScore++;
            }
            updateScores();

            // Display the result for at least 2.5 seconds and add the result animation
            resultDiv.style.opacity = '1'; // Ensure visibility
            resultDiv.classList.add('result-animation');
            
            setTimeout(() => {
                // After 2.5 seconds, keep the result visible without animation
                resultDiv.style.opacity = '0';
                resultDiv.classList.remove('result-animation');
            }, 2500);
        })
        .catch(error => {
            console.error('Error:', error);
        });
    }

    // Update score display
    function updateScores() {
        playerScoreSpan.textContent = playerScore;
        computerScoreSpan.textContent = computerScore;
    }
});
