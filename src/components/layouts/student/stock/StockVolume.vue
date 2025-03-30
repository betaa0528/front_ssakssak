<template>
    <div class="orderbook">
        <h6 class="fw-bold mb-2">📈 실시간 매물대</h6>
        <div class="orderbook-grid">
            <div v-for="sell in sellOrders" :key="'sell-' + sell.price" class="order sell">
                매도 | {{ sell.price }} 씨드 ({{ sell.quantity }}주)
            </div>
            <div v-for="buy in buyOrders" :key="'buy-' + buy.price" class="order buy">
                매수 | {{ buy.price }} 씨드 ({{ buy.quantity }}주)
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import api from '@/api/studentStockApi'; // 너희 프로젝트에 맞는 API 모듈로 변경

const sellOrders = ref([]);
const buyOrders = ref([]);

onMounted(async () => {
    try {
        const { data } = await api.getOrderBook(); // 매물대 API 호출
        sellOrders.value = data.sell; // [{ price: 105, quantity: 3 }, ...]
        buyOrders.value = data.buy;   // [{ price: 100, quantity: 5 }, ...]
    } catch (error) {
        console.error("매물대 불러오기 실패", error);
    }
});
</script>

<style scoped>
.orderbook-grid {
    display: flex;
    flex-direction: column;
    max-height: 200px;
    overflow-y: auto;
    border: 1px solid #ccc;
    border-radius: 8px;
    padding: 10px;
    background: #f9f9f9;
}

.order {
    padding: 5px;
    font-size: 14px;
}

.sell {
    color: red;
}

.buy {
    color: blue;
}
</style>