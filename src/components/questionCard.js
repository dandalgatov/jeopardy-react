import React from "react";
import { Box, Button, TextField } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Counter from "./Counter";

const useStyles = makeStyles((theme) => ({
  main: {
    [theme.breakpoints.down('sm')]: {
        paddingTop: '10vh',
    },
    fontFamily: "KorinnaBold",
    alignItems: "center",
    justifyContent: "center",
    display: "flex",
    flexFlow: "column nowrap",
    width: "100%",
    backgroundColor: "#060CE9",
    color: "#FFFFFF",
    "-webkit-text-stroke": "1px black",
    fontWeight: "900",
    outline: "black solid 1px",
  },
  question: {
    height: "60vh",
    [theme.breakpoints.down('md')]: {
      height: "55vh",
      fontSize: '.8rem'
    },
    width: "80%",
    alignItems: "center",
    justifyContent: "center",
    display: "flex",
    flexFlow: "column wrap",
  },
  answerRow: {
    height: "24vh",
    width: "100%",
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
    [theme.breakpoints.down('md')]: {
      height: "30vh",
    },
  },
  answer:{
    [theme.breakpoints.down('md')]: {
      margin: '0 .5rem',
      padding: '0 5px',

    },
  },
  answerText: {
    [theme.breakpoints.down('md')]: {
      padding: '0 0',
    },
  },
  countdown: {
    width: '100vw',
    margin: "auto",
  },
  bigFont: {
    fontSize: '1.4rem'
  },
  freeAnswer: {
    [theme.breakpoints.up('md')]: {
      width: '50%',
    },
    display: 'flex',
    justifyContent: 'space-around',
    "-webkit-text-stroke": "0px black",
    alignItems:'center'
  }
}));


const QuestionCard = (props) => {
  const { clue, correctAnswer, wrongAnswer, randomAnswers, shuffleArray, setView, round, hard, handleFreeAnswer} = props || "";
  const classes = useStyles();

  const [freeAnswer, setFreeAnswer] = React.useState("")
  // eslint-disable-next-line
  const [answers, setAnswers] = React.useState(shuffleArray([
    <Button  className = {classes.answer} key={1} onClick={correctAnswer} variant="contained">
      <p className={classes.answerText} dangerouslySetInnerHTML={{__html: clue.answer}}/>
    </Button>,
    <Button className={classes.answer} key={2} onClick={wrongAnswer} variant="contained">
      <p className={classes.answerText} dangerouslySetInnerHTML={{__html: randomAnswers[0]}}/>
    </Button>,
    <Button className={classes.answer} key={3} onClick={wrongAnswer} variant="contained">
      <p className={classes.answerText} dangerouslySetInnerHTML={{__html: randomAnswers[1]}}/>
    </Button>,
  ])
)

  const freeAnswerForm = (
    <>
      <form className={classes.freeAnswer} onSubmit={() => {handleFreeAnswer(freeAnswer)}}>
        <div>
          <h3>What is </h3>
          <TextField
            placeholder=" Answer"
            style={{ color: 'black', backgroundColor: 'white' }}
            value={freeAnswer}
            onChange={event => setFreeAnswer(event.target.value)}
          />
        </div>

        <Button
          style={{color:'black', backgroundColor:'white', margin:"5px"}}
          onClick={() => handleFreeAnswer(freeAnswer)}
        > Submit </Button>
      </form>
    </>)

  return (
    <Box className={classes.main}>
      <Box className={classes.countdown}>
          <Counter hard={hard} wrongAnswer={wrongAnswer} setView={setView} round={round}/>
      </Box>
      <Box className={`${classes.question}`}>
        <h1>{clue.question}</h1>
      </Box>
      <div
        className={classes.answerRow}
      >
        {!hard && answers}
        {hard && freeAnswerForm}
      </div>
    </Box>
  );
};

export default QuestionCard;
