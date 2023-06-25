import './App.css';
import Header from './Header';
import{ BrowserRouter, Route, Routes} from 'react-router-dom'
import HomePage from './HomePage'
import BuyAHome from './BuyAHome'
import SellAHome from './SellAHome'

function App() {
  return (
    <div>
      
      <BrowserRouter>
        <Header/>
        <Routes>
          <Route index element={<HomePage/>}/>
          <Route path='/Buy_A_Home' element={<BuyAHome/>}/>
          <Route path='/Sell_A_Home' element={<SellAHome/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
