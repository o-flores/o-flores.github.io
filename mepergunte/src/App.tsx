import { Home } from './pages/Home';
import { NewRoom } from './pages/NewRoom';
import { Room } from './pages/Room';
import { AdminRoom } from './pages/AdminRoom';
import { Route, BrowserRouter, Switch } from 'react-router-dom';
import { AuthContextProvider } from './contexts/AuthContext';


function App() {
  return (
    <BrowserRouter>
      <Switch>
        <AuthContextProvider>
          <Route exact path="/mepergunte" component={Home} />
          <Route exact path="/room/new" component={NewRoom} />
          <Route exact path="/rooms/:id" component={Room} />
          <Route exact path="/admin/rooms/:id" component={AdminRoom} />
        </AuthContextProvider>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
