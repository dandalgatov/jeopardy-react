import React from 'react'
import { Box, Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  main: {
    border: "2px solid black",
    minHeight: "500px",
    [theme.breakpoints.down('sm')]: {
      height: '100%'
    }
  },
  item: {
    fontFamily: "Swiss911",
    fontSize: "1.5rem",
    border: "2px solid black",
    fontWeight: "bold",
    height: "15vh",
    alignItems: "center",
    justifyContent: "center",
    display: "flex",
    backgroundColor: "#060CE9",
    "-webkit-text-stroke": ".5px black",
  },
  select:{
    '&:hover': {
      background: "#090DA0",
    },
  },
  title: {
    color: "#FFFFFF",
  },
  question: {
    color: "#FFFF00",
  },
  [theme.breakpoints.down('sm')]: {
    main:{
      paddingTop: '9vh',
    }
  },
}));

export default function JeopardyGrid(props) {
  const { board, itemClick, round, } = props || [];
  const classes = useStyles();



  return (
    <Grid container direction="row" className={classes.main}>

      {board &&
        board[round-1].map((column, index) => {
          const notTaken = props.history[index];

          return (
            <Grid key={index} md={2} container direction="column" item>
              <Box className={`${classes.item} ${classes.title}`}>
                <h3>{column.title}</h3>
              </Box>
              <Box
                className={`${classes.item} ${classes.select} ${classes.question}`}
                onClick={() => {
                  if (notTaken[0]) itemClick(index, 0, 200 * round);
                }}
              >
                {notTaken[0] && <h2>${200*round}</h2>}
              </Box>
              <Box
                className={`${classes.item} ${classes.select} ${classes.question}`}
                onClick={() => {
                  if (notTaken[1]) itemClick(index, 1, 400 * round);
                }}
              >
                {notTaken[1] && <h2>${400 * round}</h2>}
              </Box>
              <Box
                className={`${classes.item} ${classes.select} ${classes.question}`}
                onClick={() => {
                  if (notTaken[2]) itemClick(index, 2, 600 * round);
                }}
              >
                {notTaken[2] && <h2>${600 * round}</h2>}
              </Box>
              <Box
                className={`${classes.item} ${classes.select} ${classes.question}`}
                onClick={() => {
                  if (notTaken[3]) itemClick(index, 3, 800 * round);
                }}
              >
                {notTaken[3] && <h2>${800 * round}</h2>}
              </Box>
              <Box
                className={`${classes.item} ${classes.select} ${classes.question}`}
                onClick={() => {
                  if (notTaken[4]) itemClick(index, 4, 1000 * round);
                }}
              >
                {notTaken[4] && <h2>${1000 * round}</h2>}
              </Box>
            </Grid>
          );
        })}
    </Grid>
  );
}
