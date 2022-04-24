
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import SuperSubscriptions from '../SuperSubscriptions';
import SuperSubscription from '../SuperSubscriptions/SuperSubscription';
import Profile from '../Profile';

const Router = () => (
  <BrowserRouter>
    <Routes>
      <Route path='/' element={<SuperSubscriptions />}/>
      <Route path='/:subscriptionName' element={<SuperSubscription />} />
      <Route path='/profile' element={<Profile />} />
    </Routes>
  </BrowserRouter>

);

export default Router;
