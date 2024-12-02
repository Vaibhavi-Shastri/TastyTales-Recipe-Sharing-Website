import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { HomeScreen } from './screens/HomeScreen';
import { LoginScreen } from './screens/AUTH/LoginScreen';
import {RegisterScreen} from './screens/AUTH/RegisterScreen';
import NotFoundpage, { Notfoundpage } from './screens/Notdefinepage/Notfoundpage';
import { Allrecipe } from './screens/Recipe/Allrecipe.js';
import { RecipeDetails } from './screens/Recipe/RecipeDetails.js'; // Recipe Details Page
import './index.css';




function App() {
  return (
    <div className="App">
      <header className="App-header">

        <Router>
          <Routes>
            <Route path='/' element={<HomeScreen/>} />
            <Route path='/login' element={<LoginScreen/>} />
            <Route path='/register' element={<RegisterScreen/>} />

            <Route path='/home' element={<HomeScreen/>} />
            <Route path="/" element={<Allrecipe />} />
        <Route path="/recipe/:id" element={<RecipeDetails />} /> {/* Recipe details page */}
     
            <Route path="*" element={<Notfoundpage/>} /> {/* This catches all undefined routes */}

          </Routes>
        </Router>
      </header>
    </div>
  );
}

export default App;
