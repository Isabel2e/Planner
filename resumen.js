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

const ctx = document.getElementById('expenseChart').getContext('2d');
const myChart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: labels,
        datasets: [{
            label: '# de Gastos',
            data: data,
            backgroundColor: [
                'rgb(21, 52, 72, 0.2)',
                'rgba(60, 91, 111.0.2)',
                'rgb(148, 137, 121,0.2)',
                'rgb(223, 208, 184,0.2)',
                // Agrega más colores según tus necesidades
            ],
            borderColor: [    // Agrega más colores según tus necesidades
            ],
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
});