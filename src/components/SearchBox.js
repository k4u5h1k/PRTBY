import {useState, useEffect} from 'react';
import { Grid, TextField } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { useHistory } from "react-router-dom";

const styles = theme => ({
    cssLabel: {
        color : 'white'
    },
    cssOutlinedInput: {
        color : 'white',
        '&$cssFocused $notchedOutline': {
          borderColor: 'white',
        }
    },
    cssFocused: {
        color : 'white',
        borderColor: `white !important`
    },
    notchedOutline: {
        color : 'white',
        borderRadius: '15px',
        borderRadius: '50px',
        borderColor: 'white !important'
    },
    size: {
        fontSize: 'xx-large',
        marginLeft: '1%'
    }
})

var SearchBox = (props) => {
    const [query, setQuery] = useState("")
    const history = useHistory();

    var handleChange = (evt) => {
        setQuery(evt.target.value)
    }

    var checkEnter = (evt) => {
        if (evt.key === 'Enter'){
            evt.preventDefault()
            history.push({
                pathname: "/PRTBY/searchResults",
                state: {query: query}
            });
        }
    }

    const { classes } = props;
    return <TextField
              id="outlined-full-width"
              placeholder="Search for torrents"
              defaultValue={props.value}
              fullWidth
              InputLabelProps={{
                classes: {
                  root: classes.cssLabel,
                  focused: classes.cssFocused,
                },
              }}
              InputProps={{
                classes: {
                  root: classes.cssOutlinedInput,
                  focused: classes.cssFocused,
                  notchedOutline: classes.notchedOutline,
                  input: classes.size
                }
              }}
              variant="outlined"
              margin={props.margin}
              onKeyUp={checkEnter}
              onChange={handleChange}
            />
}

export default withStyles(styles)(SearchBox)
