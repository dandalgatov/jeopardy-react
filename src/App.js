import { useState, useEffect } from 'react'
import JeopardyGrid from './components/jeopardyGrid'
import "./App.css";
import createBoard from './services/createBoard'
import QuestionCard from './components/questionCard'
import LandingPage from './components/landingPage'
import Header from './components/Header'
import { fetchRand } from './services/apiConfig'
import WagerScreen from './components/WagerScreen'

function App() {
  const [board, setBoard] = useState()
  const [view, setView] = useState('wager')
  const [col, setColumn] = useState()
  const [row, setRow] = useState()
  const [history, setHistory]= useState([
    [true, true, true, true, true],
    [true, true, true, true, true],
    [true, true, true, true, true],
    [true, true, true, true, true],
    [true, true, true, true, true],
    [true, true, true, true, true],
  ])

  const [questionValue, setQuestionValue] = useState()
  const [bank, setBank] = useState(201)
  const [randomAnswers, setRandomAnswers] = useState()

  useEffect( () => {
    createBoard(setBoard)

    async function getWrongAnswers () {
      setRandomAnswers(await fetchRand())
    }
    getWrongAnswers()
  }, [])



  

  const itemClick = (col, row, value) => {
    setColumn(col)
    setRow(row)
    setQuestionValue(value)
    setView('question')
    setHistory(prevHistory=>{
      prevHistory[col][row]=false;
      return [...prevHistory];
    })
  }

  const randIdx = Math.floor(Math.random() * 98)

  const correctAnswer = () => {
    setBank(bank + questionValue)
  }

  const wrongAnswer = () => {
    setBank(bank - questionValue)
  }

  const renderMain = () => {
    if (view === 'landing') {
      return (
        <LandingPage
          setView={setView}
        />)
    }
    if (view === 'grid') return (
      <JeopardyGrid
        board={board}
        itemClick={itemClick}
        history={history}/>
    )
    if (view === 'question') return (
      <QuestionCard
        
        clue={board[col].clues[row]}
        setView={setView}
        setQuestionValue={setQuestionValue}
        correctAnswer={correctAnswer}
        wrongAnswer={wrongAnswer}
        randomAnswers={[randomAnswers[randIdx], randomAnswers[randIdx+1]]}
      />
    )
    if (view === 'wager') return (
      <WagerScreen bank={bank} setBank={setBank} />
    )
  }

  return (

    <div className="App ">
      <div className="gradient-background" style={{display: 'flex', flexFlow: 'column nowrap', alignContent: 'flex-end'}}>
        <Header bank={bank} setBank={setBank} />
        {renderMain()}
      </div>
    </div>
  );
}

export default App;
