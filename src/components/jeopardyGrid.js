import React from 'react';
// import Container from '@material-ui/core/Container';
import {Box, Grid} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles( theme => ({
  main: {
    border: '2px solid black',
    flexGrow: 1,
    minHeight:"500px"
},
  item: {
    border: '2px solid black',
    fontWeight: 'bold',
    height: "150px",
    alignItems: 'center',
    justifyContent: "center",
    display:"flex",
    backgroundColor:"#060CE9",
    color: '#FFFFFF',
     "-webkit-text-stroke": '1px black',
  }

}))

export default function JeopardyGrid(props) {
  const classes = useStyles();
  const [categories, setCategories] = React.useState([
    { title: 'category 1' },
    { title: 'category 2' },
    { title: 'category 3' },
    { title: 'category 4' },
    { title: 'category 5' },
    {title:'category 6'},])

  React.useEffect(() => { if (props.board.categories.length===6) setCategories(props.board.categories)},[props.board.categories])
  const columns = categories.map((column, index) => {
    return (
      <Grid key={index} xs={2} container direction="column" item>
        <Box className={classes.item}>
          <h2>{column.title}</h2>
        </Box>
        <Box className={classes.item} onClick={() => props.itemClick(index, 0)}>
          <h2>$200</h2>
        </Box>
        <Box className={classes.item} onClick={() => props.itemClick(index, 1)}>
          <h2>$400</h2>
        </Box>
        <Box className={classes.item} onClick={() => props.itemClick(index, 2)}>
          <h2>$600</h2>
        </Box>
        <Box className={classes.item} onClick={() => props.itemClick(index, 3)}>
          <h2>$800</h2>
        </Box>
        <Box className={classes.item} onClick={() => props.itemClick(index, 4)}>
          <h2>$1000</h2>
        </Box>
      </Grid>)
  })

  return (
    <Grid container direction="row" className={classes.main} >
      {columns}
    </Grid>
  )
}
