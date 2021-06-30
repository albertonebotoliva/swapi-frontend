import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Icon, IconButton } from '@material-ui/core';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

const useStyles = makeStyles((theme) => ({
    root: {
        padding: '2px 0px',
        alignItems: 'center',
        height: "auto"
    },
    nested: {
        paddingLeft: 20
    }
}));

export default function Tree({ filteredItems, openItems, selectedItems, dispatch, nested = 0 }) {
    const classes = useStyles();

    return (
        <List
            component="nav"
            aria-labelledby="nested-list-subheader"
            className={nested ? classes.nested : classes.root}
        >
            {
                filteredItems.map((item, index) => (
                    <div key={index} >
                        <ListItem>
                            <ListItemIcon>
                                <IconButton onClick={() => dispatch({ type: "set_selected_items", item })}>
                                    {selectedItems.find(i => i.id === item.id) ? <Icon>check_box_outline</Icon> : <Icon>check_box_outline_blank</Icon>}
                                </IconButton>
                            </ListItemIcon>
                            <ListItemText primary={item.label} />
                            {item.children && (
                                <IconButton onClick={() => dispatch({ type: "set_open_items", openItems: { ...openItems, [item.id]: !openItems[item.id] } })}>
                                    {openItems[item.id] ? <Icon>expand_less</Icon> : <Icon>expand_more</Icon>}
                                </IconButton>
                            )}
                        </ListItem>
                        {openItems[item.id] && item.children && (
                            <Tree
                                filteredItems={item.children}
                                openItems={openItems}
                                selectedItems={selectedItems}
                                dispatch={dispatch}
                                nested={nested + 1}
                            />
                        )}
                    </div>
                ))
            }
        </List >

    );
}