let desc = document.getElementById('description');
let amt = document.getElementById('amount');
let rIncome = document.getElementById('realIncome');
let rExpense = document.getElementById('realExpense');
let add = document.getElementById('Add');
let currBal = document.getElementById('currBal');
let list = document.getElementById('list');

//get previous transactions
const localStorageTransactions = JSON.parse(localStorage.getItem('transactions'));

//if previous record is null, create a new array for transactions
let transactions = localStorage.getItem('transactions') !== null ? localStorageTransactions : [];

//update balance, income, value 
function updateValues() {
    //all the transaction values
    const amounts = transactions.map(transaction => transaction.amt);

    //add all transaction values
    const total = amounts.reduce((acc, item) => (acc += item), 0).toFixed(2);

    //total income value
    const incomes = amounts.filter(item => item > 0).reduce((acc, item) => (acc += item), 0).toFixed(2);

    //total expense value
    const expenses = (amounts.filter(item => item < 0).reduce((acc, item) => (acc += item), 0) * -1).toFixed(2);

    currBal.innerText = `$${total}`;
    rIncome.innerText = `$${incomes}`;
    rExpense.innerText = `$${expenses}`;
}


function addTransactions(e) {
    e.preventDefault();
    //validate
    if (desc.value.trim() == '' || amt.value.trim() == '') {
        alert('Please input description and amount!');
    } else {
        const transaction = {
            id: generateID(),
            desc: desc.value,
            amt: +amt.value
        };

        transactions.push(transaction);

        addTransactionsDom(transaction);

        updateValues();

        updateLocalStorage();

        desc.value = '';
        amt.value = '';
    }


}
//create transaction ID
function generateID() {
    return Math.floor(Math.random() * 100000000);
}

//add transactions to DOM list
function addTransactionsDom(transaction) {
    const sign = transaction.amt > 0 ? '+' : '-';
    const item = document.createElement('li');

    //add class to the new li element
    item.classList.add(transaction.amt > 0 ? 'plus' : 'minus');

    item.innerHTML = `
    ${transaction.desc}<span>${sign}${Math.abs(transaction.amt)}</span>
    <button class="delete-btn" onclick="removeTransaction(${transaction.id})">X</button>`;
    
    list.appendChild(item);
}

//delete transaction based on id
function removeTransaction(id) {
    console.log(id);
    transactions = transactions.filter(transaction => transaction.id !== id);

    updateLocalStorage();

    init();
}

function updateLocalStorage() {
    localStorage.setItem("transactions", JSON.stringify(transactions));
}

//Init app
function init() {
    list.innerHTML = '';
    transactions.forEach(element => {
        addTransactionsDom(element);
    });
    updateValues();
}

init();

add.addEventListener('click',addTransactions);





