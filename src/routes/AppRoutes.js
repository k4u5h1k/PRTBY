import { BrowserRouter, Route, Switch } from 'react-router-dom';
import MainPage from '../components/MainPage';
import Details from '../components/Details';
import SearchResults from '../components/SearchResults';

const Routes = () => {
    return <BrowserRouter>
        <Switch>
            <Route exact path="/" component={MainPage}/>
            <Route path="/searchResults" component={SearchResults}/>
            <Route path="/details" component={Details}/>
        </Switch>
    </BrowserRouter>
};

export default Routes;
