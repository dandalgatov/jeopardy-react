import React from 'react';
import {
    Box,
    Button,
    InputAdornment,
    FormControl,
    OutlinedInput,
    Container
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import WagerBar from './WagerBar'



const useStyles = makeStyles(theme => ({
    main: {
        fontFamily: 'KorinnaBold',
        alignItems: 'center',
        justifyContent: "center",
        display: "flex",
        flexFlow: "column nowrap",
        width: '100%',
        color: '#FFFFFF',
        fontWeight: '900',
        [theme.breakpoints.down('sm')]: {
            paddingTop: '9vh',
        },
    },


}))

export default function WagerScreen(props) {
    const { bank, setBank, maxBet, setQuestionValue, setView } = props
    const classes = useStyles();
    const [percentage, setPercentage] = React.useState(20)
    const [betValue, setBetValue] = React.useState(Math.ceil((maxBet / 100) * 20));

    const handleChange = () => (e) => {
        const onlyNums = e.target.value.replace(/[^0-9]/g, '');
        setBetValue(onlyNums);
    };

    const handleSubmit = () => {
        setQuestionValue(betValue)
        setView('question')
    }

    return (
        <Box className={classes.main} >
            <div style={{
                height: '94vh',
                width: '100%',
                display: 'grid',
                placeItems: 'center'
            }}>
                <Container
                    maxWidth="sm"
                    style={{
                        backgroundColor: 'white',
                        height: 'auto',
                        borderRadius: '5px',
                        textAlign: "left",
                        color: 'black',
                        maxWidth: '500px'
                    }}>
                    <h1>Enter your wager</h1>
                    <div>
                        <FormControl fullWidth className={classes.margin} variant="outlined">
                            <OutlinedInput
                                error={betValue > maxBet ? true : false}
                                value={betValue}
                                onChange={handleChange()}
                                startAdornment={
                                    <InputAdornment position="start">$</InputAdornment>
                                }
                            />
                        </FormControl>
                    </div>

                    <WagerBar
                        betValue={betValue}
                        setBetValue={setBetValue}
                        bank={bank}
                        setBank={setBank}
                        percentage={percentage}
                        setPercentage={setPercentage}
                        maxBet={maxBet}
                    />
                    <Button
                        fullWidth={true}
                        variant="contained"
                        onClick={() => setBetValue(maxBet)}
                        style={{
                            backgroundColor: '#FFFF00',
                            color: 'black',
                            fontFamily: 'swiss911'
                        }}
                    >Max Bet ${maxBet}
                    </Button>
                    <div style={{height: '1rem'}} />
                    <Button
                        fullWidth={true}
                        variant="contained"
                        onClick={(e) => handleSubmit(e)}
                        style={{ color: 'yellow', backgroundColor: '#060CE9' }}
                    >Submit
                    </Button>
                    <h2>Jeopardy Wager Rules:</h2>
                    <p>
                        1. In the FIRST ROUND, if you have less than $1000, you can only bet up to $1000. In the SECOND ROUND, if you have less than $2000, you can only bet up to $2000.
                    </p>
                    <p>
                        2. All other times you can bet as much as you want as long as it does not exceed your total score.
                    </p>
                    <p>
                        3. If you have less than $1 after SECOND ROUND, you can not participate in FINAL JEOPARDY, and automatically lose the game.
                    </p>
                    <p>
                        4. All bets must be full-dollar ammount.
                    </p>
                </Container>
            </div>

        </Box>
    )
}
