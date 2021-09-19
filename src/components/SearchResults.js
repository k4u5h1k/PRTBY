import {useState, useEffect} from 'react';
import { useHistory } from "react-router-dom"
import { Grid, Box, List, CircularProgress, withStyles } from '@material-ui/core';
import { ListItem, ListItemText, IconButton, ListItemSecondaryAction } from '@material-ui/core';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import GetAppIcon from '@material-ui/icons/GetApp';
import DoneIcon from '@material-ui/icons/Done';
import {generateMeta, copyOrDownload} from './utilities';
import SearchBox from './SearchBox';

const styles = theme => ({
    resultItem: {
        background : '#B4A186',
        paddingLeft : '1vw',
        marginRight : '-32px',
        '& span, & svg': {
            fontSize: window.innerWidth > 500 ? 'xx-large':'large',
            paddingTop : '1.5vh',
        },
        '& p': {
            fontSize: window.innerWidth > 500 ? 'large':'small',
            paddingBottom : '1.5vh'
        },
        '&:hover': {
            backgroundColor: '#B4A186E0',
            cursor: 'pointer'
        },
        borderRadius : '10px',
        overflowWrap: 'break-word'
    },
    progressStyle: {
        color: 'white',
        marginTop: '2%'
    },
    arrowStyle: {
        color:'white', 
        marginTop: '20%'
    }
})

var SearchResults = (props) => {
    const { query, dontPrintQuery } = (props.location && props.location.state) || {}

    var [results, setResults] = useState([])
    var [finished_hashes, setFinished] = useState([])

    const history = useHistory()

    useEffect(() => {
        setResults([])
        fetch(`https://prtbyapi.azurewebsites.net/api/proxy?endpoint=q&q=${encodeURIComponent(query)}&cat=`)
            .then(res => res.json())
            .then((results) => {
                results.sort((a,b) => {return Number(b['seeders']) > Number(a['seeders'])})
                setResults(results)
            })
    }, [query]);

    var choiceWrapper = (el) => {
        copyOrDownload(el);
        setFinished(finished_hashes.concat([el['info_hash']]));
    }

    var backToMenu = () => {
        history.push("/");
    }

    var showDetails = (el) => {
        history.push({
            pathname: "/details",
            state: { 
                id: el["id"],
                dontPrintQuery: dontPrintQuery,
                query: query
            }
        })
    }

    const { classes } = props;
    return <>
            <Grid 
              container 
              justifyContent="center"
              alignItems="center"
              direction="row"
            >
                { window.innerWidth > 500 && 
                    <Grid item md={1} sm={1} xs={1}>
                        <IconButton 
                            color="primary" 
                            component="span" 
                            onClick={() => backToMenu()}
                        >
                        <ArrowBackIcon fontSize='large' className={classes.arrowStyle}/>
                        </IconButton>
                    </Grid>
                }
                <Grid item md={8} sm={8} xs={8}>
                    <SearchBox value={query} dontPrintQuery={dontPrintQuery} margin='normal'/>
                </Grid>
            </Grid>
            <Box component='div' px={2} pt={0}>
                <List>
                    { 
                        results.length > 0 ? 
                            results[0]['name'] === 'No results returned' ?
                                <>
                                <ListItem>
                                    <ListItemText
                                        primary='No results returned'
                                        secondary=''
                                        className={classes.resultItem}
                                    />
                                    <ListItemSecondaryAction>
                                        <IconButton 
                                            end="edge" 
                                            style={{marginLeft: '-5vw'}}
                                            onClick={() => {
                                                alert('You are proof that users are stupid XD. Jk enjoy the app!')
                                            }}
                                        >
                                            <GetAppIcon fontSize='large' />
                                        </IconButton>
                                    </ListItemSecondaryAction>
                                </ListItem>
                                </>
                                :
                                results.map((el) => {
                                    return <>
                                        <ListItem>
                                            <ListItemText
                                                primary={el['name']}
                                                secondary={generateMeta(el)}
                                                className={classes.resultItem}
                                                onClick={() => showDetails(el)}
                                            />
                                            <ListItemSecondaryAction>
                                                <IconButton 
                                                    end="edge" 
                                                    style={{marginLeft: '-5vw'}}
                                                    onClick={() => choiceWrapper(el)}
                                                >
                                                { 
                                                    finished_hashes.indexOf(el['info_hash'])!==-1?
                                                        <DoneIcon fontSize='large' />
                                                        :
                                                        <GetAppIcon fontSize='large' />
                                                }
                                                </IconButton>
                                            </ListItemSecondaryAction>
                                        </ListItem>
                                    </>
                                })
                            :
                            <Grid container justifyContent="center">
                                <CircularProgress className={classes.progressStyle} />
                            </Grid>
                    }
                </List>
            </Box>
        </>
}

export default withStyles(styles)(SearchResults)
