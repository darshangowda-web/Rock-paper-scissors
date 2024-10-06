from flask import Flask, render_template, jsonify, request
import random

app = Flask(__name__)

# Function to get the computer's choice
def get_computer_choice():
    choices = ['rock', 'paper', 'scissors']
    return random.choice(choices)

# Function to determine the winner
def determine_winner(player_choice, computer_choice):
    if player_choice == computer_choice:
        return "It's a tie!"
    elif (player_choice == 'rock' and computer_choice == 'scissors') or \
         (player_choice == 'paper' and computer_choice == 'rock') or \
         (player_choice == 'scissors' and computer_choice == 'paper'):
        return "You win!"
    else:
        return "Computer wins!"

# Home page route
@app.route('/')
def index():
    return render_template('index.html')

# API route to play the game
@app.route('/play', methods=['POST'])
def play():
    player_choice = request.json.get('choice')
    computer_choice = get_computer_choice()

    result = determine_winner(player_choice, computer_choice)

    return jsonify({
        'player_choice': player_choice,
        'computer_choice': computer_choice,
        'result': result
    })

if __name__ == '__main__':
    app.run(debug=True)
