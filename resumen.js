let chart;  // Variable global para almacenar la instancia del gráfico

document.addEventListener('DOMContentLoaded', () => {
    updateSummary();
    updateChart();
});

function updateSummary() {
    const summary = document.getElementById('summary');
    let expenses = JSON.parse(localStorage.getItem('expenses')) || [];
    let categories = expenses.reduce((acc, expense) => {
        acc[expense.category] = (acc[expense.category] || 0) + expense.amount;
        return acc;
    }, {});

    summary.innerHTML = `<h3>Resumen</h3> ${Object.entries(categories).map(([category, amount]) => `<p>${category}: $${amount}</p>`).join('')}`;
}

function updateChart() {
    let expenses = JSON.parse(localStorage.getItem('expenses')) || [];
    let categories = expenses.reduce((acc, expense) => {
        acc[expense.category] = (acc[expense.category] || 0) + expense.amount;
        return acc;
    }, {});

    const data = {
        labels: Object.keys(categories),
        datasets: [{
            label: 'Gastos por Categoría',
            data: Object.values(categories),
            backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0'],
        }]
    };

    const ctx = document.getElementById('expenseChart').getContext('2d');

    if (chart) {
        chart.destroy();  // Destruir el gráfico existente antes de crear uno nuevo
    }

    chart = new Chart(ctx, {
        type: 'doughnut', // Puedes cambiar 'doughnut' por 'bar' o cualquier otro tipo según prefieras
        data: data,
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}
