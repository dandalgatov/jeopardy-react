import { useState, useEffect, useCallback } from "react";
import JeopardyGrid from "./components/jeopardyGrid";
import "./App.css";
import createBoard from './services/createBoard'
import QuestionCard from './components/questionCard'
import LandingPage from './components/landingPage'
import Header from './components/Header'
import AnnouncementPage from './components/announcementPage'
import { fetchRand } from './services/apiConfig'
import WagerScreen from './components/WagerScreen'
import maxBetService from './services/maxBet'
import correctNotification from "./public/audio/rightanswer.mp3";
import wrongNotification from "./public/audio/wrong-answer.mp3";
import EndGame from './components/endGame'


function App() {
  const [board, setBoard] = useState()
  const [boardOffset, setBoardOffset] = useState(1)
  const [view, setView] = useState('landing')
  const [round, setRound] = useState(1)
  const [col, setColumn] = useState()
  const [row, setRow] = useState()
  const [history, setHistory] = useState([
    [true, true, true, true, true],
    [true, true, true, true, true],
    [true, true, true, true, true],
    [true, true, true, true, true],
    [true, true, true, true, true],
    [true, true, true, true, true],
  ])
  const [questionValue, setQuestionValue] = useState()
  const [bank, setBank] = useState(0)
  const [dailyDouble, setDailyDouble] = useState([[Math.floor(Math.random() * 6), Math.floor(Math.random() * 5)]])
  const [randomAnswers, setRandomAnswers] = useState()
  const [roundTimer, setRoundTimer] = useState(-1)
  const [maxBet, setMaxBet] = useState(0);
  const [questionCounter, setQuestionCounter] = useState(0)
  const roundLength = 60;


  const setEndView = useCallback(() => {
    if (bank > 0) {
      setRound(3)
      setColumn(0)
      setRow(4)
      setView("finalRound")
    }
    else {
      setView("gameOver")
    }
  }, [bank])

  const nextRound = useCallback(() => {
    if (round === 1) {
      setDailyDouble([[Math.floor(Math.random() * 6), Math.floor(Math.random() * 5)], [Math.floor(Math.random() * 6), Math.floor(Math.random() * 5)]])
      setView("secondRound")
      setRoundTimer(roundLength)//time second round
      setRound(2)
      setQuestionCounter(0)
      setHistory([
        [true, true, true, true, true],
        [true, true, true, true, true],
        [true, true, true, true, true],
        [true, true, true, true, true],
        [true, true, true, true, true],
        [true, true, true, true, true],
      ]);
      async function getWrongAnswers() {
        setRandomAnswers(await fetchRand());
      }
      getWrongAnswers()
    } else {
    if (round===2){
      setEndView()
    }
    }
  }, [round, setEndView])


  useEffect(() => {
    if(questionCounter===30){
      nextRound()
    }
  },[questionCounter, nextRound]);

  useEffect(() => {
    createBoard(setBoard, boardOffset);
    async function getWrongAnswers() {
      setRandomAnswers(await fetchRand());
    }
    getWrongAnswers();
  }, [boardOffset]);

  useEffect(()=>{
    const countdown = setInterval(()=>{


      setRoundTimer(roundTimer-1)
      if(roundTimer===0){
        nextRound();
      }

    },1000)
    return ()=>clearInterval(countdown);
  })



  const itemClick = (col, row, value) => {
    setColumn(col)
    setRow(row)
    setQuestionValue(value)
    setMaxBet(maxBetService(round, bank))

    setHistory((prevHistory) => {
      prevHistory[col][row] = false;
      return [...prevHistory];
    })
    if ((round !== 3 && col === dailyDouble[0][0] && row === dailyDouble[0][1]) || (round === 2 && col === dailyDouble[1][0] && row === dailyDouble[1][1])){
      setView('dailyDouble')
    }else{
      setView('question')
    }
  }

  const reset = () => {
    setBoardOffset(boardOffset + 13)
    createBoard(setBoard, boardOffset + 13);
    async function getWrongAnswers() {
      setRandomAnswers(await fetchRand());
    }
    getWrongAnswers();
    setRound(1)
    setBank(0)
    setHistory([
      [true, true, true, true, true],
      [true, true, true, true, true],
      [true, true, true, true, true],
      [true, true, true, true, true],
      [true, true, true, true, true],
      [true, true, true, true, true],
    ]);
  }

  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  const correctAnswer = () => {
    document.getElementById("correct-sound").play();
    setQuestionCounter(questionCounter + 1)
    setTimeout(() => {
      setBank(bank + questionValue);
    }, 500);
    reduceWrongAnswers()
    if (round===3){
      setView('win')
    }else{
      setView('grid')
    }
  };

  const wrongAnswer = () => {
    document.getElementById("wrong-sound").play();
    setQuestionCounter(questionCounter+1)
    setTimeout(() => {
      setBank(bank - questionValue);
    }, 500);
    reduceWrongAnswers()
    if (round === 3 && bank - questionValue <= 0) {
      setView('gameOver')
    } else if(round === 3) {
      setView('win')
    } else {
      setView('grid')
    }
  };

  const reduceWrongAnswers = () =>{
    setRandomAnswers((prevAnswers)=>{
      prevAnswers.pop()
      return [...prevAnswers]
    })
  }

  const renderMain = () => {
    if (view === "landing") {
      return <LandingPage setView={setView} start={() => setRoundTimer(roundLength)}/>;
    }

    if (view === 'grid') return (
      <JeopardyGrid
        board={board}
        itemClick={itemClick}
        history={history}
        round={round}/>
    )

    if (view === 'question'){
      return (
        <QuestionCard
        round={round}
        setView={setView}
        clue={board[round-1][col].clues[row]}
        setQuestionValue={setQuestionValue}
        correctAnswer={correctAnswer}
        shuffleArray={shuffleArray}
        wrongAnswer={wrongAnswer}
        randomAnswers={[randomAnswers[randomAnswers.length - 1], randomAnswers[randomAnswers.length-2]]}
      />
    )}
    if (view==='dailyDouble') return (
      <AnnouncementPage text="Daily Double!" setView={setView} next='wager' time={2}/>
    )
    if (view === 'secondRound') return (
      <AnnouncementPage text="Double Jeopardy!" setView={setView} next='grid' time={2} />
    )
    if (view === 'finalRound') return (
      <AnnouncementPage text="Final Jeopardy" setView={setView} next='finalRoundCategory' time={2} />
    )
    if (view === 'finalRoundCategory') return (
      <AnnouncementPage text={`Category: ${board[2][0].title}`} setView={setView} next='wager' time={3} />
    )
    if (view === 'wager') return (
      <>
        <WagerScreen bank={bank} setBank={setBank} round={round} maxBet={maxBet && maxBet} setQuestionValue={setQuestionValue} setView={setView} />
      </>
    )
    if(view ==="gameOver") return (
      <>
        <EndGame mode="fail" setView={setView} reset={reset}/>
      </>
    )
    if (view === "win") return (
      <>
        <EndGame setView={setView} score={bank} reset={reset} />
      </>
    )
  }



  return (
    <div className="App ">
      <div
        className="gradient-background"
        style={{
          display: "flex",
          flexFlow: "column nowrap",
          alignContent: "flex-end",
        }}
      >
        <>
          <audio id="correct-sound" src={correctNotification}></audio>
          <audio id="wrong-sound" src={wrongNotification}></audio>
        </>
        <Header bank={bank} setBank={setBank} />
        {renderMain()}
      </div>
    </div>
  );
}

export default App;
