const inputDescription = document.getElementById('input-description');
const inputDate = document.getElementById('input-date');
const inputValue = document.getElementById('input-value');
const addBtn = document.getElementById('add-btn');
const tBody = document.getElementsByTagName('tbody')[0];
const inputs = document.querySelectorAll('input');
const incomesCard = document.querySelector('#incomes');
const expensesCard = document.querySelector('#expenses');
const totalCard = document.querySelector('#total');
const months = document.querySelectorAll('#months li');
const saveBtn = document.getElementById('save-btn');
const backBtn = document.getElementById('back-btn');

const verifyInputs = () => {
  let result = true;
  inputs.forEach((input) => {
    if (!input.value) result = false;
  });
  return result;
}

const createRow = (input) => {
  const td = document.createElement('td');
  if (input.id === 'input-value') {
    td.innerText = `${input.value}R$`;
    input.value < 0 ? td.classList.add('expenses') : td.classList.add('incomes');
  } else {
    td.innerText = `${input.value}`;
  }
  return td;
}

const hideOverlay = () => {
  const overlayContainer = document.querySelector('.container-overlay');
  overlayContainer.classList.remove('active');
  overlayContainer.classList.add('inactive');
}

const showOverlay = () => {
  const transactionLink = document.querySelector('#balance a h3');
  transactionLink.addEventListener('click', () => {
    const selected = document.querySelector('.selected');
    if (!selected) {
      alert('Select a month');
      return;
    }
    const overlayContainer = document.querySelector('.container-overlay');
    overlayContainer.classList.add('active');
    overlayContainer.classList.remove('inactive');
  })
}

const clickBackBtn = () => {
  backBtn.addEventListener('click', hideOverlay);
}


const addTransaction = () => {
  addBtn.addEventListener('click', () => {
    if (!verifyInputs()) {
      alert('Type all the infos');
      return;
    }
    const tr = document.createElement('tr');
    inputs.forEach((input) => {
      tr.appendChild(createRow(input));
    })
    tr.addEventListener('click', (event) => deleteRow(event.currentTarget));
    tBody.appendChild(tr);
    inputs.forEach((input) => input.value = '');
    updateAll();
    hideOverlay();
    saveOnLocalStorage();
  })
}

const updateAll = () => {
  updateIncomes();
  updateExpenses();
  updateTotal();
}

const updateExpenses = () => {
  const expenses = document.querySelectorAll('.expenses');
  let sum = 0;
  expenses.forEach((expense) => {
    const value = parseFloat(expense.innerText.split(' ')[0])
    sum += value;
  });
  expensesCard.innerText = `${sum.toFixed(2)} R$`;
  return sum;
}

const updateIncomes = () => {
  const incomes = document.querySelectorAll('.incomes');
  let sum = 0;
  incomes.forEach((income) => {
    const value = parseFloat(income.innerText.split(' ')[0])
    sum += value;
  });
  incomesCard.innerText = `${sum.toFixed(2)} R$`;
  return sum;
}

const updateTotal = () => {
  const income = updateIncomes();
  const expense = updateExpenses();
  const total = income + expense;
  totalCard.innerText = `${total.toFixed(2)} R$`
}

const deleteFromLocalStorage = (event) => {
  const children = event.childNodes;
  const selected = document.querySelector('.selected');
  const month = selected.innerText;
  const savedTransactions = JSON.parse(localStorage.getItem(month));
  const newSavedTransactions = savedTransactions.filter((transaction) => (
    transaction.description !== children[0].innerText
    || transaction.value !== children[1].innerText
    || transaction.date !== children[2].innerText))
  localStorage.setItem(`${month}`, JSON.stringify(newSavedTransactions));
}

const deleteRow = (event) => {
  event.remove();
  deleteFromLocalStorage(event);
  updateAll();
}

const setSelectedMonth = (event) => {
  const selected = document.querySelector('.selected');
  const monthClass = event.target.classList;
  if (!selected) monthClass.add('selected');
  else {
    if (monthClass.contains('selected')) monthClass.toggle('selected');
  }
}

const monthsClicked = () => {
  months.forEach((month) => {
    month.addEventListener('click', setSelectedMonth);
    month.addEventListener('click', getLocalStorage);
  });
};

const saveOnLocalStorage = () => {
  const selected = document.querySelector('.selected');
  const rows = document.querySelectorAll('tbody tr');
  const array = [];
  rows.forEach((row) => {
    const tds = row.childNodes;
    const obj = {};
    tds.forEach((td, index) => {
      if (index === 0) obj['description'] = td.innerText;
      if (index === 1) obj['value'] = td.innerText;
      if (index === 2) {
        obj['date'] = td.innerText;
        array.push(obj)
      }
    })
    const JSONArray = JSON.stringify(array)
    localStorage.setItem(`${selected.innerText}`, JSONArray);
  })
  hideOverlay();
}

const getLocalStorage = (event) => {
  if (!event.target.classList.contains('selected')) return;
  const month = event.target.innerText;
  tBody.innerText = '';
  updateAll();
  const savedTransactions = JSON.parse(localStorage.getItem(month)) || [];
  const keys = ['description', 'value', 'date'];
  savedTransactions.forEach((transaction) => {
    const row = document.createElement('tr');
    keys.forEach((key) => {
      const td = document.createElement('td');
      if (key === 'value') {
        const number = parseFloat(transaction[key]);
        number < 0 ? td.classList.add('expenses') : td.classList.add('incomes');
      }
      td.innerText = transaction[key];
      row.appendChild(td);
      row.addEventListener('click', (event) => deleteRow(event.currentTarget));
    })
    tBody.appendChild(row);
    updateAll();
  })
}

window.onload = () => {
  addTransaction();
  monthsClicked();
  showOverlay();
  clickBackBtn();
}