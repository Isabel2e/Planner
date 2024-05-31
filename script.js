
document.getElementById('addExpenseButton').addEventListener('click', addExpense);
document.getElementById('addCategoryButton').addEventListener('click', addCategory);
document.getElementById('viewSummaryButton').addEventListener('click', () => {
    window.location.href = 'summary.html';
});
document.addEventListener('DOMContentLoaded', loadExpenses);
document.addEventListener('DOMContentLoaded', loadCategories);

let chart;

function addExpense() {
    const description = document.getElementById('descriptionInput').value;
    const amount = parseFloat(document.getElementById('amountInput').value);
    const category = document.getElementById('categoryInput').value;

    if (description && !isNaN(amount) && category) {
        const expense = {
            description,
            amount,
            category,
            id: Date.now()
        };

        saveExpense(expense);
        renderExpense(expense);
        
        document.getElementById('descriptionInput').value = '';
        document.getElementById('amountInput').value = '';
        document.getElementById('categoryInput').value = '';
    }
}

function saveExpense(expense) {
    let expenses = JSON.parse(localStorage.getItem('expenses')) || [];
    expenses.push(expense);
    localStorage.setItem('expenses', JSON.stringify(expenses));
}

function loadExpenses() {
    let expenses = JSON.parse(localStorage.getItem('expenses')) || [];
    expenses.forEach(renderExpense);
}

function renderExpense(expense) {
    const expenseList = document.getElementById('expenseList');
    const li = document.createElement('li');
    li.setAttribute('data-id', expense.id);
    li.innerHTML = `
        ${expense.description} - $${expense.amount} (${expense.category})
        <button class="delete" onclick="deleteExpense(${expense.id})">Eliminar</button>
    `;
    expenseList.appendChild(li);
}

function deleteExpense(id) {
    let expenses = JSON.parse(localStorage.getItem('expenses')) || [];
    expenses = expenses.filter(expense => expense.id !== id);
    localStorage.setItem('expenses', JSON.stringify(expenses));

    const expenseList = document.getElementById('expenseList');
    const li = expenseList.querySelector(`[data-id='${id}']`);
    expenseList.removeChild(li);
}

function addCategory() {
    const newCategory = document.getElementById('newCategoryInput').value.trim();

    if (newCategory) {
        let categories = JSON.parse(localStorage.getItem('categories')) || [];
        if (!categories.includes(newCategory)) {
            categories.push(newCategory);
            localStorage.setItem('categories', JSON.stringify(categories));
            renderCategory(newCategory);
            document.getElementById('newCategoryInput').value = '';
        } else {
            alert("Esta categoría ya existe.");
        }
    } else {
        alert("La categoría no puede estar vacía.");
    }
}

function loadCategories() {
    let categories = JSON.parse(localStorage.getItem('categories')) || [];
    categories.forEach(renderCategory);
}

function renderCategory(category) {
    const categoryInput = document.getElementById('categoryInput');
    const option = document.createElement('option');
    option.value = category;
    option.textContent = category;
    categoryInput.appendChild(option);

    const categoryList = document.getElementById('categoryList');
    const li = document.createElement('li');
    li.innerHTML = `
        ${category}
        <button class="delete" onclick="deleteCategory('${category}')">Eliminar</button>
    `;
    categoryList.appendChild(li);
}

function deleteCategory(category) {
    let categories = JSON.parse(localStorage.getItem('categories')) || [];
    categories = categories.filter(cat => cat !== category);
    localStorage.setItem('categories', JSON.stringify(categories));

    const categoryList = document.getElementById('categoryList');
    const li = categoryList.querySelector(`li:contains('${category}')`);
    categoryList.removeChild(li);

    // Remove category from select input
    const categoryInput = document.getElementById('categoryInput');
    const option = categoryInput.querySelector(`option[value='${category}']`);
    categoryInput.removeChild(option);
}

// Inicializar categorías con algunas predefinidas
document.addEventListener('DOMContentLoaded', () => {
    let categories = JSON.parse(localStorage.getItem('categories')) || [];
    loadCategories(categories);
});

function loadCategories(categories) {
    categories.forEach(renderCategory);
}
