import ChartJS from 'chart.js/auto'

const myCustomPlugin = {
    id: 'myCustomPlugin',
    afterDraw: (chart, args, options) => {
        const ctx = chart.ctx;
        const xAxis = chart.scales.x;
        const yAxis = chart.scales.y;

        ctx.save();
        ctx.textAlign = 'center';
        ctx.textBaseline = 'top';
        ctx.fillStyle = 'black'; // set the color of the text

        chart.data.labels.forEach((label, index) => {
            const xPos = xAxis.getPixelForValue(index); // Get the center position of the bar
            const yPos = yAxis.bottom + 12; // Adjust this as needed

            // Optionally adjust xPos based on bar width if needed
            const barWidth = chart.getDatasetMeta(0).data[index].width;
            const adjustedXPos = xPos - barWidth / 2 - 10; // Adjust this calculation as needed

            ctx.fillText(label, adjustedXPos, yPos);
        });

        ctx.restore();
    }
};

new ChartJS(document.querySelector("#chart"), {
    type: 'bar',
    data: {
        labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
        datasets: [{
            label: '# of Votes',
            data: [12, 19, 3, 5, 2, 3],
            barPercentage: 1,
            categoryPercentage: 1,
            barThickness: 'flex'
        }]
    },
    options: {
        plugins: {
            myCustomPlugin: {} // enable your custom plugin
        },
        scales: {
            x: {
                ticks: {
                    color: 'transparent'
                }
            }
        },
    },
    plugins: [myCustomPlugin]
});