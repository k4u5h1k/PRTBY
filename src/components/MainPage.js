import { ReactComponent as Logo } from '../assets/img/logo.svg';
import { Grid } from '@material-ui/core';
import { Link } from "react-router-dom";
import SearchBox from './SearchBox';

var MainPage = (props) => {
    return <>
        <Grid 
          container 
          justifyContent="center"
          alignItems="center"
        >
            <Grid item xs={11} sm={9} lg={6} md={6}>
                <Link
                  to={{
                    pathname: "/searchResults",
                    state: { query: 'a' }
                  }}
                >
                    <Logo style={{
                        width: '100%',
                        marginBottom: '-30%'
                    }}/>
                </Link>
            </Grid>
            <Grid item xs={10} sm={10} lg={8} md={8}>
                <SearchBox />
            </Grid>
        </Grid>
    </>
}

export default MainPage
