import { Redirect, Route, Switch } from 'react-router-dom';
import './App.css';
import Auth from './components/Auth/Auth';
import Header from './components/Header/Header';
import ReviewForm from './components/Reviews/ReviewForm';
import Reviews from './components/Reviews/Reviews';

function App() {
  return (
    <div className="App">
      <Header />
      <Switch>
        <Route path="/auth/:type" component={Auth} />
        <Route path="/reviews" component={Reviews} />
        <Route path="/review/form/edit" component={ReviewForm} /> 
        <Route path="/review/form/create" component={ReviewForm} /> 
        <Route path="/" component={Auth}></Route>
        <Route path="*"> <Redirect to="/auth/auth" /> </Route>
        
      </Switch>
    </div>
  );
}

export default App;
