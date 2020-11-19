Jeopardy! Fan Edition
=======

A hackathon complete for the [MintBean Quiz Platform Hackathon](https://sites.google.com/mintbean.io/mbjavascripthackshackthequizpl/home)

Participants
------
[David Diep](https://github.com/david-diep)

[Dan Dalgatov](https://github.com/dandalgatov)

[Mohammad Al Hallaq](https://github.com/mhallaq)

Live Demo
======
[https://confident-kilby-f1fa10.netlify.app/](https://confident-kilby-f1fa10.netlify.app/)

Personal Contributions
======
- Landing page
- Round timer and logic 
- Game end and replay logic
- Grid and question mapping
- View changes between components
- Transition Screens (Double Jeopardy, Final Jeopardy, Game Over)
- Mobile Responsiveness

Features
=======
- As a user, When the page loads a landing page asking if I want to play

- As a user, When Click play a game board appears

- As a user, When I look at the game board I see 6 columns each with

  A category

  5 questions with increasing point values

- As a user, when I click on a point value I will be asked a question

- As a user, once the question has been asked I can see a timer showing me the time I have to answer a question

- As a user, If I fail to answer a question in the given time the question will close and my score will be unaffected

- As a user, If I answer a question correctly my score will be increased by the point value on the on the question selected

- As a user, If I answer a question incorrectly my score will be decreased by the point value on the questions selected

- As a user, After a unseen period of time the game will start the next round

- As a user, at the start of the 2nd round the game board is refilled and I continue like the first round

- As a user, at the start of the third round I am given a question and asked to wager from my earned points

- As a user, if I answer the third round question correctly I gain the value of my wager

- As a user, if I answer the third round question incorrectly I lose the value of my wager

- As a user, after the third round I am shown my score and asked if I want to play again

Development
======

System Requirements
------

- Node.js 10 or higher

- npm 6 or higher

Technologies Used
------
- React
- Material UI
- Axios

### Getting Started


1. Clone this repository

```shell
git clone https://github.com/mhallaq/quiz-platform-ddm
cd quiz-platform-dmm
```
2. Install dependencies with NPM

```shell
npm install
```

3. Start the project.  It can be view at [http://localhost:3000/](http://localhost:3000/) in the browser

```shell
npm run start
```
