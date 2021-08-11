import { useState } from 'react';
import {ReactComponent as Logo} from '../assets/img/logo.svg';
import { Grid } from '@material-ui/core';
import SearchBox from './SearchBox';

var MainPage = (props) => {
    return <>
        <Grid 
          container 
          justifyContent="center"
          alignItems="center"
        >
            <Grid item md={6}>
                <Logo style={{
                    height: 'auto', 
                    width: '100%',
                    marginBottom: '-30%'
                }}/>
            </Grid>
            <Grid item md={8}>
                <SearchBox />
            </Grid>
        </Grid>
    </>
}

export default MainPage
