import './App.css';
import Vendor from './Vendor';
import Purchase from './Components/purchaseComponent/purchase';

import Report from './Report';
import Category from './Category';
import { ProSidebarProvider } from 'react-pro-sidebar';
import Slidebar from './Slidebar';
import { BrowserRouter as Router,Routes,Route} from 'react-router-dom';
import Stock from './Stock';
import Login from './Components/loginComponent/login';
import Test from './Test';
import CatogeryRp from './Components/Reoprt/CatogeryRp';
import AverageRp from './Components/Reoprt/AverageRp';
import MonthlyRp from './Components/Reoprt/MonthlyRp';
import ItemRp from './Components/Reoprt/ItemRp';
import Dispatch from './Components/dispatchComponent/dispatch';

function App() {
  return (
    <div>
     <Router>
      <Routes>  
        <Route path='/' element={<Login/>}/>
        <Route path='/dis' element={<Dispatch/>}/>
        <Route path='/rep' element={<Report/>}/>
        <Route path='/purs' element={<Purchase/>}/>
        <Route path='/category' element={<Category/>}/>
        <Route path='/ven' element={<Vendor/>}/>
        <Route path='/stock' element={<Stock/>}/>
        <Route path="/test" element={<Test/>}/>
        <Route path="/catogery" element={<CatogeryRp/>} />
        <Route path="/average" element={<AverageRp/>} />
        <Route path="/monthly" element={<MonthlyRp/>} />
        <Route path="/item" element={<ItemRp/>} />
      </Routes>
     </Router>

        {/* <Dispatch/> */}

      {/* <Vendor/> 
       <Purchase/> */}
      
      {/* <Report/> */}
      


     
      
    </div>
  );
}

export default App;
