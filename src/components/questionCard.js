import React from "react";
import { Box, Button, TextField } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Counter from "./Counter";

const useStyles = makeStyles((theme) => ({
  main: {
    [theme.breakpoints.down('sm')]: {
        paddingTop: '7vh',
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
      height: "50vh",
    },
    width: "80%",
    alignItems: "center",
    justifyContent: "center",
    display: "flex",
    flexFlow: "column nowrap",
  },
  answerRow: {
    height: "24vh",
    width: "100%",
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
    [theme.breakpoints.down('md')]: {
      flexDirection: 'column',
      height: "40vh",
    },
  },
  answer:{
    [theme.breakpoints.down('md')]: {
      margin: '0 1rem'
    },
  },
  countdown: {
    width: '100vw',
    margin: "auto",
  },
  bigFont: {
    fontSize: '1.4rem'
  },
}));


const QuestionCard = (props) => {
  const { clue, correctAnswer, wrongAnswer, randomAnswers, shuffleArray, setView, round, hard} = props || "";
  const classes = useStyles();


  // eslint-disable-next-line
  const [answers, setAnswers] = React.useState(shuffleArray([
    <Button  className = {classes.answer} key={1} onClick={correctAnswer} variant="contained">
      <h3 dangerouslySetInnerHTML={{__html: clue.answer}}/>
    </Button>,
    <Button className={classes.answer} key={2} onClick={wrongAnswer} variant="contained">
      <h3 dangerouslySetInnerHTML={{__html: randomAnswers && randomAnswers[0]}}/>
    </Button>,
    <Button className={classes.answer} key={3} onClick={wrongAnswer} variant="contained">
      <h3 dangerouslySetInnerHTML={{__html: randomAnswers[1]}}/>
    </Button>,
  ])
)

  const freeAnswer = (
    <>
      <form>
        <TextField label="Your Answer" variant="outlined"
          InputProps={{
            classes: {
              input: classes.bigFont,
            },
          }}
        />
        <Button> Submit </Button>
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
        {hard && freeAnswer}
      </div>
    </Box>
  );
};

export default QuestionCard;
