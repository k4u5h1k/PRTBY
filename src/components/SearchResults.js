import {useState, useEffect} from 'react';
import { useHistory } from "react-router-dom";
import { Grid, Box, Divider, List, CircularProgress, withStyles } from '@material-ui/core';
import { ListItem, ListItemText, IconButton, ListItemSecondaryAction } from '@material-ui/core';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import SearchBox from './SearchBox';
import GetAppIcon from '@material-ui/icons/GetApp';

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
    colorPrimary: {
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
    const history = useHistory();

    useEffect(() => {
        setResults([])
        fetch(`https://prtbyapi.azurewebsites.net/api/proxy?endpoint=q&q=${encodeURIComponent(query)}&cat=`)
            .then(res => res.json())
            .then((results) => {
                results.sort((a,b) => {return Number(b['seeders']) > Number(a['seeders'])})
                setResults(results)
            })
    }, [query]);

	var format_size = (num, suffix='B') => {
        var sizes = ['','Ki','Mi','Gi','Ti','Pi','Ei','Zi']
		for (const unit in sizes){
			if (Math.abs(num) < 1024.0) return `${(num).toFixed(2)} ${sizes[unit]}${suffix}`
			num /= 1024.0
        }
		return `${(num).toFixed(2)} Yi${suffix}`
    }

    var generateMeta = (el) => {
        var name = el['username']
        var size = format_size(Number(el['size']))
        var date = new Date(el['added']*1000).toLocaleString()
        return `${name} | ${size} | seeders: ${el['seeders']} leechers: ${el['leechers']} | ${date}`
    }

    var get_trackers = () => {
        let tr = '&tr=' + encodeURIComponent('udp://tracker.coppersurfer.tk:6969/announce');
        tr += '&tr=' + encodeURIComponent('udp://tracker.openbittorrent.com:6969/announce');
        tr += '&tr=' + encodeURIComponent('udp://tracker.opentrackr.org:1337');
        tr += '&tr=' + encodeURIComponent('udp://tracker.leechers-paradise.org:6969/announce');
        tr += '&tr=' + encodeURIComponent('udp://tracker.dler.org:6969/announce');
        tr += '&tr=' + encodeURIComponent('udp://opentracker.i2p.rocks:6969/announce');
        tr += '&tr=' + encodeURIComponent('udp://47.ip-51-68-199.eu:6969/announce');
        return tr;
    }

    var generateMagnet = (ih, name) =>{
        window.open(`magnet:?xt=urn:btih:${ih}&dn=${encodeURIComponent(name)}${get_trackers()}`)
    }

    var download = (el) => {
        fetch(generateMagnet(el['info_hash'], el['name']))
    }

    var backToMenu = () => {
        history.push("/");
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
                                <Divider variant="middle" />
                                </>
                                :
                                results.map((el) => {
                                    return <>
                                        <ListItem>
                                            <ListItemText
                                                primary={el['name']}
                                                secondary={generateMeta(el)}
                                                className={classes.resultItem}
                                            />
                                            <ListItemSecondaryAction>
                                                <IconButton 
                                                    end="edge" 
                                                    style={{marginLeft: '-5vw'}}
                                                    onClick={() => download(el)}
                                                >
                                                    <GetAppIcon fontSize='large' />
                                                </IconButton>
                                            </ListItemSecondaryAction>
                                        </ListItem>
                                        <Divider variant="middle" />
                                    </>
                                })
                            :
                            <Grid container justifyContent="center">
                                <CircularProgress className={classes.colorPrimary} />
                            </Grid>
                    }
                </List>
            </Box>
        </>
}

export default withStyles(styles)(SearchResults)
