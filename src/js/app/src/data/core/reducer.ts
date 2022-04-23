import smartContractReducer from '../smart-contract/smartContractReducer';
import notificationsReducer from '../notification/notificationsReducer';
import subscriptionReducer from '../subscription/subscriptionReducer';

export default {
  smartContract: smartContractReducer,
  subscription: subscriptionReducer,
  notifications: notificationsReducer
};
