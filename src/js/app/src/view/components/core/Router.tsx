
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import SuperSubscriptions from '../SuperSubscriptions';
import SuperSubscription from '../SuperSubscriptions/SuperSubscription';

const Router = () => (
  <BrowserRouter>
    <Routes>
      <Route path='/' element={<SuperSubscriptions />}/>
      <Route path='/:subscriptionName' element={<SuperSubscription />} />
    </Routes>
  </BrowserRouter>

);

export default Router;
