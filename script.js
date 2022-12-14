'use strict';

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  movementsDates: [
    '2019-11-18T21:31:17.178Z',
    '2019-12-23T07:42:02.383Z',
    '2020-01-28T09:15:04.904Z',
    '2020-04-01T10:17:24.185Z',
    '2020-05-08T14:11:59.604Z',
    '2020-05-27T17:01:17.194Z',
    '2020-07-11T23:36:17.929Z',
    '2020-07-12T10:51:36.790Z',
  ],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  movementsDates: [
    '2019-11-01T13:15:33.035Z',
    '2019-11-30T09:48:16.867Z',
    '2019-12-25T06:04:23.907Z',
    '2020-01-25T14:18:46.235Z',
    '2020-02-05T16:33:06.386Z',
    '2020-04-10T14:43:26.374Z',
    '2020-06-25T18:49:59.371Z',
    '2020-07-26T12:01:20.894Z',
  ],

  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  movementsDates: [
    '2019-11-18T21:31:17.178Z',
    '2019-12-23T07:42:02.383Z',
    '2020-01-28T09:15:04.904Z',
    '2020-04-01T10:17:24.185Z',
    '2020-05-08T14:11:59.604Z',
    '2020-05-27T17:01:17.194Z',
    '2020-07-11T23:36:17.929Z',
    '2020-07-12T10:51:36.790Z',
  ],

  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  movementsDates: [
    '2019-11-18T21:31:17.178Z',
    '2019-12-23T07:42:02.383Z',
    '2020-01-28T09:15:04.904Z',
    '2020-04-01T10:17:24.185Z',
    '2020-05-08T14:11:59.604Z',
    '2020-05-27T17:01:17.194Z',
    '2020-07-11T23:36:17.929Z',
    '2020-07-12T10:51:36.790Z',
  ],

  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

/////////////////////////////////////////////////

//lets add some display change to our movment class i.e. where movement is shown

const displayMovements = function (movement, sort = false) {
  containerMovements.innerHTML = ''; //set previous html containt to empty //similar to textcontent
  const movementsStoreArray = sort
    ? movement.slice().sort((a, b) => a - b)
    : movement;
  movementsStoreArray.forEach(function (mov, i) {
    let type = mov > 0 ? 'deposit' : 'withdrawal';
    const html = `
  <div class="movements__row">
    <div class="movements__type movements__type--${type}">${i + 1} ${type}</div>
    <div class="movements__value">${mov}????</div>
  </div>`;
    containerMovements.insertAdjacentHTML('afterbegin', html); //to insert html containt in webpage exictely same
  });
};

//displaying in out and total in the bank

const displaydepositAndWithdrawlMoney = function (acc) {
  const deposit = acc.movements
    .filter(money => money > 0)
    .reduce((depst, mov) => mov + depst, 0);
  labelSumIn.textContent = `${deposit}????`;
  const withdrawal = acc.movements
    .filter(mov => mov < 0)
    .reduce((withdrl, money) => withdrl + money, 0);
  labelSumOut.textContent = `${Math.abs(withdrawal)}???`;

  const intrest = acc.movements
    .filter(mov => mov > 0)
    .map(function (deposit) {
      return (deposit * acc.interestRate) / 100;
    })
    .reduce((add, intrst) => add + intrst, 0);
  labelSumInterest.textContent = `${intrest.toFixed(2)}????`;
};

//to display  total money in account creating function
const displayMomentsMoney = function (acc) {
  acc.totalBalance = acc.movements.reduce(function (acc, mon) {
    return acc + mon;
  }, 0);

  labelBalance.textContent = `${acc.totalBalance}????`;
};

//creaating a function that convet owner full name to user account sign in name
const createUserName = function (accountDetails) {
  accountDetails.forEach(function (accountDetails) {
    accountDetails.UserName = accountDetails.owner
      .split(' ')
      .map(function (name) {
        return name[0];
      })
      .join('')
      .toLowerCase();
  });
};
createUserName(accounts);
//defining  ui update function
const uiUpdate = function (acc) {
  //displaying total balance
  displayMomentsMoney(acc);
  //displaying momments
  displayMovements(acc.movements);
  //displaying deposit withdrawl and interest
  displaydepositAndWithdrawlMoney(acc);
};
//creating login page
let currentAccount;
btnLogin.addEventListener('click', function (e) {
  e.preventDefault(); //prevent from refreshing page again and again
  //for finding current accout
  currentAccount = accounts.find(
    acc => acc.UserName === inputLoginUsername.value
  );
  if (currentAccount?.pin === Number(inputLoginPin.value)) {
    //displaying label welcome
    labelWelcome.textContent = `Welcome back, ${
      currentAccount.owner.split(' ')[0]
    }`;
    labelWelcome.style.color = 'green';
    //clearing text label
    inputLoginPin.value = inputLoginUsername.value = '';
    inputLoginPin.blur(); //to inactive text area
    inputLoginUsername.blur(); // to in active text area
    containerApp.style.opacity = 100;
    //ui update
    uiUpdate(currentAccount);
  } else {
    labelWelcome.textContent = 'Wrong Input ??????';
    labelWelcome.style.color = 'red';
    containerApp.style.opacity = 0;
  }
  //for updating dates
  datesUpade();
});

//define function for ui update for fund transfer.
btnTransfer.addEventListener('click', function (e) {
  e.preventDefault(); //prevent from defult realoding
  const transferAmount = Number(inputTransferAmount.value);
  const transferAccount = accounts.find(
    acc => acc.UserName == inputTransferTo.value
  );
  if (
    transferAmount > 0 &&
    transferAccount &&
    currentAccount.totalBalance >= transferAmount &&
    transferAccount.UserName !== currentAccount.UserName
  ) {
    //doing transfer
    currentAccount.movements.push(-transferAmount);
    transferAccount.movements.push(transferAmount);
    uiUpdate(currentAccount);
  } else {
  }
  inputTransferAmount.value = inputTransferTo.value = '';
});

//adding event listener for close button
btnClose.addEventListener('click', function (e) {
  e.preventDefault(); //prevent from defult realoding
  if (
    inputCloseUsername.value == currentAccount.UserName &&
    currentAccount.pin == Number(inputClosePin.value)
  ) {
    console.log('wright input');
    const findAccount = accounts.findIndex(
      acc => acc.UserName == currentAccount.UserName
    );
    accounts.splice(findAccount, 1);
    inputCloseUsername.value = inputClosePin.value = '';
    containerApp.style.opacity = 0;
  }
});
console.log(accounts);
//defining loan approval
btnLoan.addEventListener('click', function (e) {
  e.preventDefault(); //prevent from defult realoding
  const loanAmount = Number(inputLoanAmount.value);
  if (
    loanAmount > 0 &&
    currentAccount.movements.some(loan => loan >= loanAmount * 0.2)
  ) {
    currentAccount.movements.push(loanAmount);
  }
  uiUpdate(currentAccount);
  console.log(loanAmount);
});
let sort = false;
btnSort.addEventListener('click', function (e) {
  e.preventDefault();
  //adding event for the sort button
  const movmentsUiData = [
    ...document.querySelectorAll('.movements__value'),
  ].map(pisa => Number(pisa.textContent.replace('????', '')));
  displayMovements(movmentsUiData, !sort);
  sort = !sort;
});

//function for update dates and time in each accounts
function datesUpade() {
  const date = new Date();
  const year = date.getFullYear();
  const month = `${date.getMonth() + 1}`.padStart(2, 0);
  const day = `${date.getDate()}`.padStart(2, 0);
  const hour = date.getHours();
  const min = date.getMinutes();
  labelDate.textContent = `${day}/${month}/${year} ${
    hour < 12 ? hour : hour - 12
  }:${hour < 12 ? min + ' AM' : min + ' PM'}`;
}
//displaying date in webpage
