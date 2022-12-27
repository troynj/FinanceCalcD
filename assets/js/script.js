var accountObj = {
  // user input values
  yearlyInterest: new Number(),
  investment: new Array(),
  accountTotal: new Array(),
};

// var initInvestmentEl = document.getElementById("init_investment");
// var yearlyInvestmentEl = document.getElementById("yearly_investment");
// var interestEl = document.getElementById("interest");
// var yearsEl = document.getElementById("years");
// var calcBtnEl = document.getElementById("calculate");
// var initInv = parseInt(initInvestmentEl.value);
// var yearlyInvestmentVal = parseInt(yearlyInvestmentEl.value);
// var interestVal = parseInt(interestEl.value);
var inputFieldObj = {
  ifElArr: [
    { initInvestmentEl: document.getElementById("init_investment") },
    {
      yearlyInvestmentEl: document.getElementById("yearly_investment"),
    },
    {
      interestEl: document.getElementById("interest"),
    },
    {
      yearsEl: document.getElementById("years"),
    },
  ],
  initInv: new Number(),
  yrInv: new Number(),
  int: new Number(),
  numYrs: new Number(),
};
//table
var tableDescriptionEL = document.getElementById("table_description");
var investmentListEL = document.getElementById("investment");
var accountTotalListEl = document.getElementById("account_total");

document.getElementById("calculate").addEventListener("click", gameFlow);
document.getElementById("reset").addEventListener("click", resetTable);
document.getElementById("edit").addEventListener("click", editEntry);

function gameFlow(event) {
  event.preventDefault();
  //   var accTotalEl = document.getElementById("account_total");
  //   var invEl = document.getElementById("investment");
  resetTable();
  checkUserInput();
  //console.log(inputFieldObj)
  for (var i = 0; i < inputFieldObj.numYrs; i++) {
    populateObj(i);
    createTable(i);
  }
}

function checkUserInput() {
  var tempStr = "";
  //var tempInput = Object.values(inputFieldObj.ifElArr[i])[0].value;

  for (var i = 0; i < inputFieldObj.ifElArr.length; i++) {
    var tempInput = Object.values(inputFieldObj.ifElArr[i])[0].value;
    for (var n = 0; n < tempInput.length; n++) {
      if (Number.isInteger(parseInt(tempInput[n]))) {
        tempStr += tempInput[n];
      }
    }
    i == 0 && (inputFieldObj.initInv = parseInt(tempStr));
    i == 1 && (inputFieldObj.yrInv = parseInt(tempStr));
    i == 2 && (inputFieldObj.int = parseInt(tempStr));
    i == 3 && (inputFieldObj.numYrs = parseInt(tempStr));

    tempStr = "";
  }
  console.log(inputFieldObj);
  console.log(inputFieldObj.ifElArr);
  //console.log(typeof tempStr)
}

function populateObj(i) {
  //   var initInv = parseInt(initInvestmentEl.value);
  //   var yrInv = parseInt(yearlyInvestmentEl.value);
  //   var int = parseInt(interestEl.value);

  if (i == 0) {
    accountObj.investment.push(inputFieldObj.initInv);
  } else {
    accountObj.investment.push(inputFieldObj.yrInv);
  }

  accountObj.yearlyInterest = inputFieldObj.int / 100;

  var interestRevenue = new Number();
  if (!i) {
    //true if i == 0
    //interest gained per year
    interestRevenue = accountObj.yearlyInterest * accountObj.investment[i];
    accountObj.accountTotal[i] = interestRevenue + accountObj.investment[i];
  } else {
    //var if i == 0
    var prevI = i - 1;
    //interest gained per year
    interestRevenue =
      accountObj.yearlyInterest *
      (accountObj.investment[i] + accountObj.accountTotal[prevI]);
    //total per year
    accountObj.accountTotal[i] =
      interestRevenue +
      accountObj.investment[i] +
      accountObj.accountTotal[prevI];
  }
}

function createTable(i) {
  //   console.log(i);
  //   console.log(accountObj.investment[i])
  //   console.log(typeof accountObj.investment[i])
  //   console.log(accountObj.investment[i].toFixed(2))

  var invLiEl = document.createElement("li");
  invLiEl.textContent = accountObj.investment[i].toFixed(2);
  document.getElementById("investment").append(invLiEl);

  var totalLiEl = document.createElement("li");
  totalLiEl.textContent = accountObj.accountTotal[i].toFixed(2);
  document.getElementById("account_total").append(totalLiEl);
}

function resetTable() {
  var accTotalEl = document.getElementById("account_total");
  var invEl = document.getElementById("investment");
  while (accTotalEl.firstChild) {
    accTotalEl.removeChild(accTotalEl.firstChild);
  }
  while (invEl.firstChild) {
    invEl.removeChild(invEl.firstChild);
  }
}

// function editEntry() {
//   var userInputIndex = prompt(
//     "Enter the number of the entry you would like to change:"
//   );
//   var userInput = prompt("Enter the investment value for entry " + index + ":");

//   var index = parseInt(userInputIndex);
//   accountObj.investment[index - 1] = parseInt(userInput);

//   resetTable();
//   for (var i = 0; i < accountObj.investment.length; i++) {
//     createTable(i);
//   }
// }
