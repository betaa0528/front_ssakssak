<script setup>
import apexcharts from 'vue3-apexcharts';
import { useStockStore } from '@/stores/stockStore';
import { computed, ref, watch } from 'vue';

const stockStore = useStockStore();
const chartData = computed(() => stockStore.chartData);


const highest = computed(() => {
    if (chartData.value.length === 0) {
        return 0;
    }
    return chartData.value.reduce((prev, value) => {
        return prev.stockPrice >= value.stockPrice ? prev : value
    }).stockPrice;
});


const generateCandleData = (stockPrice) => {

    if (!stockPrice || isNaN(stockPrice)) {
        return [0, 0, 0, 0];
    }

    const open = parseInt(stockPrice + (Math.random() * 10 - 4));  // +- 5 범위에서 오픈 가격 생성
    const high = parseInt(stockPrice + (Math.random() * 8 + 2));      // stockPrice + 0 ~ 10 범위에서 고가 생성
    const low = parseInt(stockPrice - (Math.random() * 6 + 2));       // stockPrice - 0 ~ 10 범위에서 저가 생성
    const close = parseInt(stockPrice); // +- 5 범위에서 종가 생성

    const orderedHigh = Math.max(open, high, close);
    const orderedLow = Math.min(open, low, close);

    return [open, orderedHigh, orderedLow, close];
};


const transformData = (data) => {
    return data.map(item => ({
        x: new Date(item.stockDate),
        y: generateCandleData(item.stockPrice),
    }));
};

const series = ref([{
    name: 'Stock Prices',
    data: transformData(chartData.value)
}]);


watch(chartData, (newData) => {
    series.value[0].data = transformData(newData);
});

const chartOptions = ref({
    chart: {
        id: 'basic-bar',
    },
    plotOptions: {
        candlestick: {
            colors: {
                upward: '#3C90EB',
                downward: '#DF7D46'
            }
        }
    },
    height: '100%',
    xaxis: {
        type: 'datetime',
        labels: {
            formatter: function (value) {
                const date = new Date(value);
                return date.getDate();
            }
        },
        tickAmount: chartData.value.length,
    },
    yaxis: {
        tooltip: {
            enabled: true
        },
        range: highest.value + 10,
    }
})
</script>

<template>
    <div class="container" style="height: 100%;">
        <apexcharts style="width:100%; height: 100%;" :type="'candlestick'" :options="chartOptions" :series="series" />
    </div>
</template>