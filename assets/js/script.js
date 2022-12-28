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

document.getElementById("calculate").addEventListener("click", calculate);
document.getElementById("reset").addEventListener("click", resetAll);


// function gameFlow(event) {
//   event.preventDefault();
//   //   var accTotalEl = document.getElementById("account_total");
//   //   var invEl = document.getElementById("investment");

//   //console.log(inputFieldObj)

// }

function calculate() {
  checkUserInput();

  for (var i = 0; i < inputFieldObj.numYrs; i++) {
    populateObj(i);
    addEntry(i);
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
  // console.log(inputFieldObj.initInv);
  // console.log(inputFieldObj.yrInv);
  // console.log(inputFieldObj.int);
  //console.log(accountObj);
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

function setTable() {
    var trElHead = document.createElement("tr");
    trElHead.setAttribute("id", "table_head");
    document.getElementById("table").append(trElHead);
 
    var thEl1 = document.createElement("th");
    var thEl2 = document.createElement("th");
    var thEl3 = document.createElement("th");
    thEl1.textContent = "Years";
    thEl2.textContent = "Investment";
    thEl3.textContent = "Account Total";
     trElHead.append(thEl1);
     trElHead.append(thEl2);
     trElHead.append(thEl3);
}

function addEntry(i) {
     console.log(i);
     console.log(typeof i);
  //   console.log(accountObj.investment[i])
  //   console.log(typeof accountObj.investment[i])
  //   console.log(accountObj.investment[i].toFixed(2))

  //   document.getElementById("table").innerHTML +=
  //     '<tr><td>${i}</td><td>${accountObj.investment[i].toFixed(2)}</td><td>${accountObj.accountTotal[i].toFixed(2)}</td><td class="edit">Edit</td></tr>';
  if(i === 0) {
    console.log("entered thing")
   //add table head
setTable();

  }

  //add table row
  var trEl = document.createElement("tr");
  trEl.setAttribute("id", "row_" + (i + 1));
  (i%2 == 0) && trEl.setAttribute("style", "background-color:#00000033");
  document.getElementById("table").append(trEl);
  //add data to row
  var yearsTdEl = document.createElement("td");
  yearsTdEl.textContent = i + 1;
  trEl.append(yearsTdEl);

  var investmentTdEl = document.createElement("td");
  investmentTdEl.setAttribute("id", "investment_" + i);
  investmentTdEl.textContent = accountObj.investment[i].toFixed(2);
  trEl.append(investmentTdEl);

  var accountTotalTdEl = document.createElement("td");
  accountTotalTdEl.setAttribute("id", "accountTotal_" + i);
  accountTotalTdEl.textContent = accountObj.accountTotal[i].toFixed(2);
  trEl.append(accountTotalTdEl);

  var editBtn = document.createElement("button");
  editBtn.setAttribute("id", i);
  editBtn.textContent = "Edit Entry"
  editBtn.addEventListener("click", editEntry, {once : true});
  trEl.append(editBtn);
}

function resetAll() {
    resetTable();
    resetObject();
  }

function resetTable() {
  var tableEl = document.getElementById("table");
  while (tableEl.firstChild) {
    tableEl.removeChild(tableEl.firstChild);
  }

}

function resetObject() {
  accountObj.yearlyInterest = 0;
  accountObj.investment = [];
  accountObj.accountTotal = [];

  inputFieldObj.initInv = 0;
  inputFieldObj.yrInv = 0;
  inputFieldObj.int = 0;
  inputFieldObj.numYrs = 0;
}

//  function editMultipleEntries(editInvEl) {
//  }
 //function editEntry() {
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
 //}

function editEntry(event) {
    // console.log("entered openEdit")
    var editBtn = event.target;
var index = editBtn.getAttribute("id")
editBtn.textContent = "Set Entry";
editBtn.addEventListener("click", function() {

    accountObj.investment[index] = parseInt(editInvEl.value)

editBtn.textContent = "Edit Entry"
editBtn.addEventListener("click", editEntry, {once: true})
resetTable()
calculate()
}, {once: true})

var invEl = document.getElementById("investment_" + index)
var editInvEl = document.createElement("input")
//editInvEl.setAttribute("placeholder", "Enter Value")

invEl.replaceWith(editInvEl)


}
