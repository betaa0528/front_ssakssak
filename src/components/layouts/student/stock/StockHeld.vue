<script setup>
import { ref, computed, defineEmits, onMounted } from 'vue';
import { useStockStore } from '@/stores/stockStore';

const stockStore = useStockStore();
const myStock = computed(() => stockStore.myStock);

const stockLabels = {
    totalInvestment: '원금',
    currentValue: '현재 평가액',
    totalQuantity: '보유 수량',
    averagePrice: '1주 평균 금액',
    seed: '예수금'
};

const getUnit = (key) => {
    if (key === 'totalQuantity') return '싹싹';
    return '씨드';
};

</script>
<template>
    <div class="container justify-content-center mb-5">
        <div class="shadow card p-4">
            <div class="ps-2 pt-2 mb-3">
                <h3 class="stock-title">내 보유 주식</h3>
            </div>

            <div class="row">
                <div class="col-md-6">
                    <div class="stock-info-table">
                        <div class="stock-info-row" v-for="(label, key, index) in stockLabels" :key="key">
                            <div class="stock-info-label">{{ label }}</div>
                            <div class="stock-info-value">
                                {{ myStock[key] }}
                                <span class="unit">{{ getUnit(key) }}</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="col-md-6">
                    <div class="stock-summary-container">
                        <div class="stock-logo-container">
                            <img src="../../../../assets/images/images-removebg-preview 1.png" alt="주식 로고"
                                class="stock-logo">
                        </div>

                        <div class="stock-profit-container">
                            <div class="profit-item">
                                <span class="profit-label">현재 수익률 :</span>
                                <span class="profit-value"
                                    :class="{ 'profit-positive': myStock.profitRate >= 0, 'profit-negative': myStock.profitRate < 0 }">
                                    {{ myStock.profitRate }}%
                                </span>
                            </div>

                            <div class="profit-item mt-3">
                                <span class="profit-label">현재 수익금 :</span>
                                <span class="profit-amount"
                                    :class="{ 'profit-positive': myStock.profitLoss >= 0, 'profit-negative': myStock.profitLoss < 0 }">
                                    {{ myStock.profitLoss }} 씨드
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.container {
    height: 400px;
}

.card {
    height: 100%;
    border-radius: 12px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1) !important;
}

.stock-title {
    color: #00A3FF;
    font-weight: 600;
    border-bottom: 2px solid #00A3FF;
    padding-bottom: 8px;
    display: inline-block;
}

.stock-info-table {
    padding: 0.5rem 1rem;
}

.stock-info-row {
    display: flex;
    justify-content: space-between;
    padding: 0.8rem 0;
    border-bottom: 1px solid #eee;
    transition: all 0.2s ease;
}

.stock-info-row:hover {
    background-color: rgba(0, 163, 255, 0.05);
    border-radius: 8px;
}

.stock-info-label {
    color: #666;
    font-size: 1rem;
}

.stock-info-value {
    font-weight: 600;
    color: #333;
}

.unit {
    font-size: 0.9rem;
    color: #666;
}

.stock-summary-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100%;
    padding: 1rem;
}

.stock-logo-container {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100px;
    height: 100px;
    border-radius: 50%;
    background-color: rgba(25, 135, 84, 0.1);
    margin-bottom: 1.5rem;
    transition: all 0.3s ease;
}

.stock-logo-container:hover {
    transform: scale(1.05);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.stock-logo {
    width: 80px;
    height: 70px;
}

.stock-profit-container {
    text-align: center;
}

.profit-item {
    margin-bottom: 0.5rem;
}

.profit-label {
    font-size: 1.1rem;
    color: #555;
}

.profit-value,
.profit-amount {
    font-size: 1.1rem;
    font-weight: 600;
    padding: 0.3rem 0.8rem;
    border-radius: 20px;
    margin-left: 0.5rem;
}

.profit-positive {
    color: #dc3545;
    background-color: rgba(220, 53, 69, 0.1);
}

.profit-negative {
    color: #0d6efd;
    background-color: rgba(13, 110, 253, 0.1);
}

@media (max-width: 768px) {
    .container {
        height: auto;
    }

    .card {
        height: auto;
    }

    .stock-summary-container {
        margin-top: 2rem;
    }
}
</style>