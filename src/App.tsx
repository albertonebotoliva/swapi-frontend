import React, { useReducer } from 'react';
import { reducer, initialState } from './stores';
import { Grid, Paper } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Search from './components/layout/search';
import Tree from './components/layout/tree';
import './App.css';

import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
  content: {
    borderRight: "1px solid #ccc",
    height: "100vh"
  },
  margin: {
    marginTop: 6
  },
  pre: { display: "block", padding: "10px 30px", margin: 0, overflow: "scroll" }
});


function App() {
  const classes = useStyles();
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <Grid container spacing={0} className={classes.content}>
      <Grid item xs={1}></Grid>
      <Grid item xs={4}>
        <Search
          isOpen={state.isOpen}
          selectedItems={state.selectedItems}
          dispatch={dispatch}
        />
        {state.isOpen && (
          <Paper className={classes.margin}>
            <Tree
              filteredItems={state.filteredItems}
              selectedItems={state.selectedItems}
              openItems={state.openItems}
              dispatch={dispatch}
            />
          </Paper>
        )}
      </Grid>
      <Grid item xs={2}></Grid>
      <Grid item xs={4}>
        {state.response.results && state.response.results.map((row: any) => (
          <Card>
            <CardActionArea>
              <CardMedia
                image="/static/images/cards/contemplative-reptile.jpg"
                title="Contemplative Reptile"
              />
              <CardContent>
                <Typography variant="body2" color="textSecondary" component="p">
                  {Object.keys(row).map((key: any, index: number) => (
                    (key === "name") ? (
                      <Typography gutterBottom variant="h5" component="h2">
                        {row[key]}
                      </Typography>
                    )
                      : (
                        <>
                          <b>{key}:</b> {row[key]} < br />
                        </>
                      )
                  ))}
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        ))}
      </Grid>
      <Grid item xs={1}>
      </Grid>
    </Grid>
  );
}

export default App;
