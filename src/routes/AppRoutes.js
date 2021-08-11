import { BrowserRouter, Route, Switch } from 'react-router-dom';
import MainPage from '../components/MainPage';
import SearchResults from '../components/SearchResults';

const Routes = () => {
    return <BrowserRouter>
        <Switch>
            <Route exact path="/" component={MainPage}/>
            <Route path="/searchResults" component={SearchResults}/>
        </Switch>
    </BrowserRouter>
};

export default Routes;
