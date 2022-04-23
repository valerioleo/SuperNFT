const EpnsSDK = require("@epnsproject/backend-sdk-staging").default;
const {privKey} = require("./secrets.json")

const  CHANNEL_PK = privKey; // the private key of the channel

// Initialise the SDK
const epnsSdk = new EpnsSDK(CHANNEL_PK);

const sendDirect = async (
  recipientAddress,
  pushNotificationTitle,
  pushNotificationMessage,
  notificationTitle,
  notificationMessage,
  link = ''
) => {
  return await epnsSdk.sendNotification(
    recipientAddress,
    pushNotificationTitle,
    pushNotificationMessage,
    notificationTitle,
    notificationMessage,
    3, // this is the notificationType: 1 - for broadcast, 3 - for direct message, 4 - for subset.
    link, // a url for users to be redirected to
  );
}

const getSubscribers = async () => {
  const subscribers = await  epnsSdk.getSubscribedUsers();

  return subscribers
}


module.exports = {
  getSubscribers,
  sendDirect
}
