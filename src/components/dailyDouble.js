import React from 'react';
import { Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  main: {
    [theme.breakpoints.down('sm')]: {
      height: '100%'
    },
    fontFamily: 'KorinnaBold',
    alignItems: 'center',
    justifyContent: "center",
    display: "flex",
    flexFlow: "column nowrap",
    width: '100%',
    backgroundColor: "#060CE9",
    color: '#FFFFFF',
    "-webkit-text-stroke": '1px black',
    fontWeight: '900',
  },
  question: {
    height: '70vh',
    width: "80%",
    fontSize: "2.1rem"
  },


}))

export default function DailyDouble(props) {


  const { setView } = props
  const [dailyTimer, setDailyTimer] = React.useState(1)

  const classes = useStyles();

  React.useEffect(() => {
    const counter = setInterval(() => countdown(), 1000);
    return () => clearInterval(counter);
  });

  const countdown = () =>{
    if (dailyTimer === 0) {
      setView('wager')
    }
    setDailyTimer(dailyTimer - 1)

  }

  return (
    <Box className={classes.main} >

      <Box className={`${classes.question} ${classes.main}`} >
        <h1>Daily Double</h1>
      </Box>


    </Box>
  )
}
