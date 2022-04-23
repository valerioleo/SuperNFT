require('dotenv').config()
const {init, getDaysLeft} = require('./superFluid')
const {getAllUsers} = require('./users')
const {sendDirect} = require('./send')

const interval = 5000

const sentLast = {}
const notificationResendTime = 60000 // 1 minute

const handleUser = async address => {
  const daysLeft = await getDaysLeft(address)

  if(Number(daysLeft) === 0) {
    return
  }

  console.log(`User ${address} has ${daysLeft} days left`)
  if(Number(daysLeft) < 10) {
    const now = Date.now()

    if(!sentLast[address] || now - sentLast[address] > notificationResendTime) {
      console.log('Send notification')
      await sendDirect(
        address,
        'Top Up',
        `Top up your account, you have balance left for ${daysLeft} days`,
        'Top Up your account',
        `
          Top up your account, you have balance left for ${daysLeft} days.
          ------------\n
          Sent at ${new Date().toString()}
        `
      )

      sentLast[address] = now
    }
    else {
      console.log('Notification already sent')
    }
  }
}

const start = async () => {
  const user = await getAllUsers()

  await Promise.all(user.map(handleUser))
}

const run = async () => {
  init()
  const intervalID = setInterval(start, interval);
}

run()