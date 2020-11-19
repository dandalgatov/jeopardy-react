import React from "react";
// import Container from '@material-ui/core/Container';
import { Box } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Counter from "./Counter";
import styled from "styled-components";

const useStyles = makeStyles((theme) => ({
  main: {
    marginTop: '8vh',
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
    width: "80%",
    alignItems: "center",
    justifyContent: "center",
    display: "flex",
    flexFlow: "column nowrap",
  },
  answerRow: {
    height: "150px",
    alignItems: "center",
    display: "flex",
  },
  countdown: {
    height: "2rem",
    // width: "80vw",
    margin: "auto",
    // paddingTop: "5vh",
    paddingBottom: "5vh"

  },
}));

//Styling Counter bar

const CounterBarContainer = styled.div`
  width: 100vw;
  margin: 0 auto;
`;

const QuestionCard = (props) => {
  const { clue, setView, correctAnswer, wrongAnswer, randomAnswers, shuffleArray } = props;

  const classes = useStyles();

  const stripItalics = (stringIn) => {
    if (stringIn.charAt(0)==='<'){
      return stringIn.slice(3,stringIn.length-4)
    }
    return stringIn;
  }
  // eslint-disable-next-line
  const [answers, setAnswers] = React.useState(shuffleArray([
    <Button key={1} onClick={correctAnswer} variant="contained">
      <h3>{stripItalics(clue.answer)}</h3>
    </Button>,
    <Button key={2} onClick={wrongAnswer} variant="contained">
      <h3>{stripItalics(randomAnswers[0])}</h3>
    </Button>,
    <Button key={3} onClick={wrongAnswer} variant="contained">
      <h3>{stripItalics(randomAnswers[1])}</h3>
    </Button>,
  ])
)

  return (
    <Box className={classes.main}>
      {/* <Box className={classes.countdown}>
        <CounterBarContainer>
          <Counter setView={setView} wrongAnswer={wrongAnswer}/>
        </CounterBarContainer>
      </Box> */}
      <Box className={`${classes.question}`}>
        <h1>{clue.question}</h1>
      </Box>
      <div
        style={{
          height: "24vh",
          width: "100%",
          display: "flex",
          flexflow: "row wrap",
          justifyContent: "space-around",
          alignItems: "flex-start",
        }}
      >

        {answers}
      </div>
    </Box>
  );
};

export default QuestionCard;
