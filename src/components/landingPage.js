import React from 'react'
import { Box, Container, Button, Grid,  makeStyles } from '@material-ui/core';
import alexTrebek from '../public/images/alex_trebek_clean.png'
import jeopardyIntro from '../public/audio/jeopardy-intro.mp3'

const useStyles = makeStyles(theme => ({
  main: {
    paddingTop: '7vh',
    alignItems: 'center',
    display: "flex",
    flexDirection: 'column',
    width: '100%',
    height: '100vh',
    color: '#FFFFFF',
    "-webkit-text-stroke": '1px black',
    fontWeight: 'bold',
    [theme.breakpoints.down('sm')]: {
      height:'100%'
    }
  },
  imageContainer:{
    display:'flex',
    flexDirection:'column',
    justifyContent:'flex-end',
    overflow:'hidden'
  },
  alex:{
    objectFit:'contain',
    maxHeight: "70vh",
  },
  title: {
    marginTop: '5vh',
    fontSize:'2rem'
  },
  bottomRow: {
    height:'100%',
    [theme.breakpoints.down('sm')]: {
      flexDirection:'column-reverse'
    }
  },
  button: {
    fontFamily: 'Swiss911',
    border:'1px solid black',
    backgroundColor: '#FFFFFF',
    fontSize:'1.5rem',
    "-webkit-text-stroke": '0px',
    width:'30%',
    '&:hover':{
      backgroundColor: "#060CE9",
      color:'#FFFFFF',
      "-webkit-text-stroke": '1px black',
}
  },


}))

export default function LandingPage(props) {
  const classes = useStyles();

  React.useEffect(() => {
    var audio = document.getElementById('jeopardy-intro')
    audio.volume = .3
    audio.play()
  }, [])

  return (
    <Box className={`${classes.main}`} >
        <audio id="jeopardy-intro" src={jeopardyIntro}></audio>
        <Box className={`${classes.title} logo`} >
          <h1>Jeopardy!</h1>
        </Box>
      <Grid container className={classes.bottomRow} >
        <Grid item md={4} sm={12} className={classes.imageContainer}>
          <h3><i>Remembering Alex Trebek.</i></h3>
          <img className={classes.alex} src={alexTrebek} alt='Alex Trebek'></img>
        </Grid>
        <Grid item md={4} sm={12}>
          <Container>
            <h2><u>Rules</u></h2>
            <h3>1. To start the game, press the PLAY button.</h3>
            <h3>2. Select any tile from a corresponding category on the screen.</h3>
            <h3>3. There will be a question with multiple answer choices.</h3>
            <h3>4. If answered correctly, your score will increase and incorrect answers will detract from your score.</h3>
          </Container>
        </Grid>
        <Grid item md={4} sm={12}>
          <Button size="large" className={classes.button}
            onClick={() => {props.setView('grid'); props.start();}}
          >
            <h1>Play</h1>
          </Button>
          <Container>
            <h2>Made By: <br></br>
            David Diep <br></br>
            (<a href="https://github.com/david-diep" target="__blank">GitHub</a> | <a href="https://www.linkedin.com/in/david-diep-dev/" target="__blank">LinkedIn</a>)
            </h2>
            <h2>
              Dan Dalgatov <br></br>
              (<a href="https://github.com/dandalgatov" target="__blank">GitHub</a> | <a href="https://www.linkedin.com/in/dandalgatov/" target="__blank">LinkedIn</a>)

            </h2>
            <h2>
              Mohammad Al Hallaq <br></br>
              (<a href="https://github.com/mhallaq" target="__blank">GitHub</a> | <a href="https://www.linkedin.com/in/mohallaq/" target="__blank">LinkedIn</a>)
            </h2>

          </Container>
        </Grid>
      </Grid>

    </Box>
  )
}
