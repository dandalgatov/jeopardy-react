import React from "react";
import { Box } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";


const useStyles = makeStyles((theme) => ({
  main: {
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
  },
  full:{
    height:"80vh"
  },
  statement: {
    width: "80%",
    margin:'auto'
  },
  button: {
    fontFamily: 'Swiss911',
    border: '1px solid black',
    backgroundColor: '#FFFFFF',
    "-webkit-text-stroke": '0px',
    width: '30%',
    '&:hover': {
      backgroundColor: "#D3D3D3",
      color: '#FFFFFF',
      "-webkit-text-stroke": '1px black',
    }
  },
}));


const EndCard = (props) => {
  const { mode, score, setView, reset } = props;

  const classes = useStyles();

  const renderEndText = () =>{
    if (mode === "fail") {
      return (
      <>
        <h1>Game Over</h1>
        <h2>You weren't able to maintain a positive score at the end of the Double Jeopardy.</h2>
      </>
      )
    } else{
      return (
      <>
        <h2>Congratulations!</h2>
      <h3>You completed Jeopardy with a score of {score}.</h3>
      </>
      )
    }
  }


  return (
    <Box className={`${classes.full} ${classes.main}`}>
      <Box className={`${classes.statement} ${classes.main}`}>
        {renderEndText()}
        <Button className={classes.button}
          onClick={() => { setView('landing'); reset()}}
        >
          <h2>Play Again?</h2>
        </Button>
      </Box>

    </Box>
  );
};

export default EndCard;
