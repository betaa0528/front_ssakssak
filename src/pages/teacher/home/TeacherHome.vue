<script setup>
import StockChart from './StockChartLayout.vue';
import TeacherDoor from './Teacherdoor.vue';
import TeacherTax from './tax.vue';
import Treasury from './treasury.vue';

</script>

<template>

    <div class="container mt-3" style="width: 80vw;">
        <div class="row">
            <div class="chart col-12 mb-6">
                <StockChart />
            </div>
            <div class="col-12 mb-6">
                <TeacherDoor />
            </div>
            <div class="Tax col-12 mb-6">
                <TeacherTax />
            </div>
            <div class="col-12 mb-6" id="Treasury">
                <Treasury />
            </div>
        </div>
    </div>
</template>

<style scoped>
#Treasury {
    padding-right: 5px;
}

.chart {
    padding-right: 0px;
}

.Tax {
    padding-right: 5px;
}
</style>
