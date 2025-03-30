<script setup>
import { ref, computed, defineEmits } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/auth';
import api from '@/api/studentStockApi';
import { useStockStore } from '@/stores/stockStore';
import StockVolume from './StockVolume.vue';

const authStore = useAuthStore();
const nowQuantity = ref('');
const stockStore = useStockStore();
const myStock = computed(() => stockStore.myStock);

const chartData = computed(() => stockStore.chartData);

const avaliableStock = computed(() => {
    const lastChartData = chartData.value[chartData.value.length - 1];
    if (!lastChartData || !lastChartData.stockPrice) {
        return 0; // 또는 다른 기본값
    }
    return parseInt(myStock.value.seed / lastChartData.stockPrice);
});

const lastChartData = computed(() => {
    if (chartData.value.length === 0) {
        return 0; // 또는 다른 기본값
    }
    return chartData.value[chartData.value.length - 1];
});

console.log(lastChartData.value.stockPrice);


const buyTotal = computed(() => {
    return nowQuantity.value * lastChartData.value.stockPrice;
})



const stockRequest = ref({
    username: authStore.username,
    name: authStore.name,
    quantity: '',
    stock_price: ''
});

const plusQuantity = (num) => {
    nowQuantity.value = Number(nowQuantity.value) + Number(num);
};

const maxQuantity = () => {
    nowQuantity.value = avaliableStock.value;
};

const emit = defineEmits(['closePop']);

const buyStock = async () => {
    stockRequest.value.quantity = nowQuantity.value;
    stockRequest.value.stock_price = lastChartData.value.stockPrice;
    try {
        const response = await api.buyStock(stockRequest.value);
        stockStore.updateMyStock(response.data);

        closePop();
    } catch (error) {
        console.error('주식사기 실패..', error);
    }
};

const closePop = () => {
    emit('close');
};
</script>
<template>
    <div class="modal-wrap">
        <div class="modal-container p-4 shadow-lg rounded bg-white">
            <div class="modal-header mb-4 d-flex justify-content-between align-items-center">
                <span class="fs-3 fw-bold">싹싹주식 매수하기</span>
            </div>

            <div class="modal-body">
                <div class="mb-2">
                    <span class="fs-5">싹싹 주식 금액 : </span>
                    <span class="fs-5 fw-bold">{{ lastChartData.stockPrice }} 씨드</span>
                </div>
                <div class="mb-3">
                    <span class="fs-5">구매 가능한 주식 수량 : </span>
                    <span class="fs-5 fw-bold text-primary">{{ avaliableStock }} 싹싹</span>
                </div>

                <div class="mb-3">
                    <span class="d-block fs-5 mb-2">구매할 수량</span>
                    <div class="d-flex align-items-center">
                        <input type="number" class="form-control w-50" v-model="nowQuantity" placeholder="0">
                        <!-- <span v-if="errorMsg" class="text-danger fs-6 ms-3">{{ errorMsg }}</span> -->
                    </div>
                    <div class="mt-2">
                        <button class="btn btn-outline btn-outline-danger me-2 pt-0 pb-1"
                            @click="plusQuantity(5)">+5</button>
                        <button class="btn btn-outline-danger btn-color-danger me-2 pt-0 pb-1"
                            @click="plusQuantity(10)">+10</button>
                        <button class="btn btn-outline-danger btn-color-danger me-2 pt-0 pb-1"
                            @click="plusQuantity(20)">+20</button>
                        <button class="btn btn-outline-danger btn-color-danger pt-0 pb-1"
                            @click="maxQuantity">전체</button>
                    </div>
                </div>

                <div class="mb-3">
                    <span class="d-block fs-5">주문 금액:</span>
                    <span class="fw-bold">{{ buyTotal }} 씨드</span>
                </div>
                <div class="mb-3">
                    <StockVolume />
                </div>
            </div>

            <!-- 버튼 -->
            <div class="modal-footer d-flex justify-content-end">
                <button class="btn btn-secondary me-2" @click="closePop">닫기</button>
                <button class="btn btn-danger" @click="buyStock">매수하기</button>
            </div>
        </div>
    </div>
</template>

<style scoped>
/* dimmed */
.modal-wrap {
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.4);
    z-index: 1;
}

/* modal or popup */
.modal-container {
    position: relative;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 550px;
    background: #fff;
    border-radius: 10px;
    padding: 20px;
    box-sizing: border-box;
}
</style>