import {useState, useEffect} from 'react';
import { useHistory } from "react-router-dom";
import { Grid, Typography, CircularProgress, IconButton, withStyles } from '@material-ui/core';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import GetAppIcon from '@material-ui/icons/GetApp';
import {format_size, copyOrDownload} from './utilities';
import SearchBox from './SearchBox';

const styles = theme => ({
    detailsFormat: {
        background : '#B4A186',
        margin : '10px',
        padding : '20px',
        borderRadius : '30px',
        overflowWrap : 'break-word',
    },
    download: {
        background : '#B4A186',
        margin : '10px',
        padding : '20px',
        borderRadius : '30px',

        '&:hover': {
            backgroundColor: '#B4A186E0',
            cursor: 'pointer'
        }
    },
    description: {
        backgroundColor : '#B4A186E0',
        padding : '20px',
        margin : '10px',
        borderRadius : '30px',
        overflow : 'scroll',
        overflowWrap : 'break-word'
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

var Details = (props) => {
    const { id, query } = (props.location && props.location.state) || {}
    var [deets, setdeets] = useState({})
    const history = useHistory();

    useEffect( () => {
        fetch(`https://prtbyapi.azurewebsites.net/api/proxy?endpoint=t&id=${id}`)
            .then(res => res.json())
            .then((results) => {
                setdeets(results)
            })
    // eslint-disable-next-line
    }, [])

    var replaceHtmlEntites = (function() {
      var translate_re = /&(nbsp|amp|quot|lt|gt);/g;
      var translate = {
        "nbsp": " ",
        "amp" : "&",
        "quot": "\"",
        "lt"  : "<",
        "gt"  : ">"
      };
      return function(s) {
        return ( s.replace(translate_re, function(match, entity) {
          return translate[entity];
        }) );
      }
    })();

    var backToMenu = () => {
        history.push({
            pathname: "/searchResults",
            state: {query: query}
        });
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
                    <SearchBox value={query} margin='normal'/>
                </Grid>
                { Object.keys(deets).length > 0 ?
                        <>
                        <Grid container item className={classes.detailsFormat} direction="row" md={10} sm={10} xs={10}>
                            <Grid item style={{marginBottom: '10px'}} md={12} sm={12} xs={12}>
                                <Typography variant="h2">
                                    {deets['name']}
                                </Typography>
                            </Grid>
                            <br/>

                            <Grid item md={2} sm={2} xs={2}>
                                <Typography variant="h4">
                                    Uploader
                                </Typography>
                            </Grid>
                            <Grid item md={1} sm={1} xs={1}>
                                <Typography variant="h4">
                                    :
                                </Typography>
                            </Grid>
                            <Grid item md={9} sm={9} xs={9}>
                                <Typography variant="h4">
                                    {deets['username']}
                                </Typography>
                            </Grid>

                            <Grid item md={2} sm={2} xs={2}>
                                <Typography variant="h4">
                                    Files
                                </Typography>
                            </Grid>
                            <Grid item md={1} sm={1} xs={1}>
                                <Typography variant="h4">
                                    :
                                </Typography>
                            </Grid>
                            <Grid item md={9} sm={9} xs={9}>
                                <Typography variant="h4">
                                    {deets['num_files']}
                                </Typography>
                            </Grid>

                            <Grid item md={2} sm={2} xs={2}>
                                <Typography variant="h4">
                                    Size
                                </Typography>
                            </Grid>
                            <Grid item md={1} sm={1} xs={1}>
                                <Typography variant="h4">
                                    :
                                </Typography>
                            </Grid>
                            <Grid item md={9} sm={9} xs={9}>
                                <Typography variant="h4">
                                    {format_size(deets['size'])}
                                </Typography>
                            </Grid>

                            <Grid item md={2} sm={2} xs={2}>
                                <Typography variant="h4">
                                    Seeders
                                </Typography>
                            </Grid>
                            <Grid item md={1} sm={1} xs={1}>
                                <Typography variant="h4">
                                    :
                                </Typography>
                            </Grid>
                            <Grid item md={9} sm={9} xs={9}>
                                <Typography variant="h4">
                                    {deets['seeders']}
                                </Typography>
                            </Grid>

                            <Grid item md={2} sm={2} xs={2}>
                                <Typography variant="h4">
                                    Leechers
                                </Typography>
                            </Grid>
                            <Grid item md={1} sm={1} xs={1}>
                                <Typography variant="h4">
                                    :
                                </Typography>
                            </Grid>
                            <Grid item md={9} sm={9} xs={9}>
                                <Typography variant="h4">
                                    {deets['leechers']}
                                </Typography>
                            </Grid>
                        </Grid>
                        <Grid container item className={classes.description} direction="row" md={10} sm={10} xs={10}>
                            <pre style={{fontSize: '1.2rem'}}>
                                {replaceHtmlEntites(deets['descr'])}
                            </pre>
                        </Grid>
                        <Grid 
                          container 
                          item 
                          className={classes.download} 
                          onClick={() => copyOrDownload(deets)}
                          direction="row" 
                          md={10} sm={10} xs={10}
                        >
                            <GetAppIcon 
                              fontSize='large' 
                              style={{margin: 'auto'}}
                            />
                        </Grid>
                        </>
                    :
                    <Grid container justifyContent="center">
                        <CircularProgress className={classes.progressStyle} />
                    </Grid>
                }
            </Grid>
    </>

}

export default withStyles(styles)(Details);
