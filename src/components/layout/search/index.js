import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Icon, IconButton, InputBase, Paper, Chip } from '@material-ui/core';
import useDebounce from './../../../hooks';

const BASE_URL = "http://localhost:8080/SWAPI";

const useStyles = makeStyles((theme) => ({
    root: {
        padding: '2px 4px',
        display: 'flex',
        alignItems: 'center'
    },
    input: {
        marginLeft: theme.spacing(1),
        flex: 1,
    },
    chip: {
        marginRight: 5,
        margin: 3
    },
    iconButton: {
        padding: 10,
    },
    divider: {
        height: 28,
        margin: 4,
    },
}));

export default function Search({ isOpen, dispatch, selectedItems }) {
    const classes = useStyles();

    const setFilter = async e => {
        const url = selectedItems[0]
            ? BASE_URL + `/${selectedItems[0].entity}/${e.target.value}`
            : null;

        if (!url) return false;

        dispatch({ type: "set_filter", filter: e.target.value });
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        dispatch({ type: "set_response", response: await response.json() });
    }

    const onChange = useDebounce(setFilter);

    return (
        <Paper component="form" onSubmit={e => e.preventDefault()} className={classes.root}>
            <Icon>search</Icon>
            <div>
                {selectedItems && selectedItems.map((item, index) => <Chip key={index} label={item.label} className={classes.chip} />)}
            </div>
            <InputBase
                className={classes.input}
                placeholder="Search..."
                inputProps={{ 'aria-label': 'mainSearch' }}
                onChange={onChange}
            />
            <IconButton onClick={() => dispatch({ type: "set_is_open", isOpen: !isOpen })} className={classes.iconButton} aria-label="search">
                {isOpen
                    ? <Icon>expand_less</Icon>
                    : <Icon>expand_more</Icon>
                }
            </IconButton>
        </Paper>
    );
}