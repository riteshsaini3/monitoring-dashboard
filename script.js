const cpuData = [];
const memoryData = [];
const diskData = [];
const labels = [];

function createChart(id, label) {
    return new Chart(document.getElementById(id), {
        type: "line",
        data: {
            labels: labels,
            datasets: [{
                label: label,
                data: [],
                fill: false
            }]
        }
    });
}

const cpuChart = createChart("cpuChart", "CPU %");
const memoryChart = createChart("memoryChart", "Memory %");
const diskChart = createChart("diskChart", "Disk %");

async function fetchMetrics() {
    const res = await fetch("/metrics");
    const data = await res.json();

    labels.push(data.time);

    cpuChart.data.datasets[0].data.push(data.cpu);
    memoryChart.data.datasets[0].data.push(data.memory);
    diskChart.data.datasets[0].data.push(data.disk);

    cpuChart.update();
    memoryChart.update();
    diskChart.update();
}

setInterval(fetchMetrics, 2000);
