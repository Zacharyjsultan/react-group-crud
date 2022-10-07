import { Redirect, Route, Switch } from 'react-router-dom';
import './App.css';
import Auth from './components/Auth/Auth';
import Header from './components/Header/Header';
import EditReviews from './components/Reviews/EditReviews';
import CreateReview from './components/Reviews/CreateReview';
import Reviews from './components/Reviews/Reviews';

function App() {
  return (
    <div className="App">
      <Header />
      <Switch>
        <Route path="/auth/:type" component={Auth} />
        <Route path="/reviews" component={Reviews} />
        <Route path="/review/form/edit/:id" component={EditReviews} />
        <Route path="/review/form/create" component={CreateReview} />
        <Route path="*">
          <Redirect to="/auth/auth" />
        </Route>
        <Route path="/" component={Auth}></Route>
      </Switch>
    </div>
  );
}

export default App;
