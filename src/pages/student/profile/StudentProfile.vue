<template>
  <div class="finance-dashboard">
    <!-- 메인 대시보드 카드 -->
    <div class="card border-0 py-1 p-md-2 p-xl-3 p-xxl-4 mb-4">
      <div class="card-body">
        <div class="d-flex align-items-center mt-0 pb-2 mb-3">
          <i class="bi bi-wallet2 text-primary lead pe-1 me-2"></i>
          <h2 class="h4 mb-0">내 자산 현황</h2>
        </div>

        <!-- 자산 요약 정보 -->
        <div class="row mb-4">
          <div class="col-md-4">
            <div class="finance-summary-card">
              <div class="summary-icon">
                <i class="bi bi-piggy-bank"></i>
              </div>
              <div class="summary-info">
                <h3 class="summary-title">총 자산</h3>
                <p class="summary-value">{{ totalAssets }} 씨드</p>
              </div>
            </div>
          </div>
          <div class="col-md-4">
            <div class="finance-summary-card">
              <div class="summary-icon income">
                <i class="bi bi-graph-up-arrow"></i>
              </div>
              <div class="summary-info">
                <h3 class="summary-title">총 수입</h3>
                <p class="summary-value">{{ totalIncome }} 씨드</p>
              </div>
            </div>
          </div>
          <div class="col-md-4">
            <div class="finance-summary-card">
              <div class="summary-icon expense">
                <i class="bi bi-graph-down-arrow"></i>
              </div>
              <div class="summary-info">
                <h3 class="summary-title">총 지출</h3>
                <p class="summary-value">{{ totalExpense }} 씨드</p>
              </div>
            </div>
          </div>
        </div>

        <!-- 자산 분포 차트 -->
        <div class="row mb-4">
          <div class="col-md-6">
            <div class="chart-container">
              <h3 class="chart-title">자산 분포</h3>
              <div class="asset-distribution">
                <div class="donut-chart-container">
                  <div class="donut-chart">
                    <svg viewBox="0 0 100 100" class="donut-svg">
                      <circle cx="50" cy="50" r="40" fill="transparent" stroke="#f0f0f0" stroke-width="20" />
                      <circle v-for="(segment, index) in assetSegments" :key="index" cx="50" cy="50" r="40"
                        fill="transparent" :stroke="segment.color" stroke-width="20"
                        :stroke-dasharray="`${segment.dashArray} ${251.2 - segment.dashArray}`"
                        :stroke-dashoffset="segment.dashOffset" class="donut-segment" />
                    </svg>
                    <div class="donut-hole">
                      <div class="donut-hole-text">
                        <span class="total-amount">{{ totalAssets }}</span>
                        <span class="total-label">씨드</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="chart-legend">
                  <div class="legend-item" v-for="(item, index) in assetItems" :key="index">
                    <div class="legend-color" :style="{ backgroundColor: assetColors[index] }"></div>
                    <div class="legend-text">
                      <span class="legend-label">{{ item.label }}</span>
                      <span class="legend-value">{{ item.value }} 씨드 ({{ Math.round(item.value / totalAssets * 100)
                      }}%)</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="col-md-6">
            <div class="chart-container">
              <h3 class="chart-title">수익률 추이</h3>
              <div class="profit-trend">
                <div class="trend-chart">
                  <div class="trend-line">
                    <svg viewBox="0 0 300 100" class="trend-svg">
                      <polyline :points="profitTrendPoints" class="trend-polyline" />
                      <circle v-for="(point, index) in profitTrendData" :key="index"
                        :cx="index * (300 / (profitTrendData.length - 1))" :cy="100 - (point + 20) * (100 / 40)" r="3"
                        class="trend-point" />
                    </svg>
                  </div>
                  <div class="trend-labels">
                    <div class="trend-y-labels">
                      <div>+20%</div>
                      <div>0%</div>
                      <div>-20%</div>
                    </div>
                    <div class="trend-x-labels">
                      <div v-for="(month, index) in trendMonths" :key="index">{{ month }}</div>
                    </div>
                  </div>
                </div>
                <div class="current-profit">
                  <div class="profit-label">현재 수익률:</div>
                  <div class="profit-value" :class="{ 'positive': currentProfit >= 0, 'negative': currentProfit < 0 }">
                    {{ currentProfit }}%
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- 탭 네비게이션 -->
        <div class="finance-tabs mb-3">
          <div class="tab-item" v-for="(tab, index) in tabs" :key="index" :class="{ 'active': activeTab === index }"
            @click="activeTab = index">
            {{ tab }}
          </div>
        </div>

        <!-- 탭 컨텐츠 -->
        <div class="tab-content">
          <!-- 전체 내역 탭 -->
          <div v-if="activeTab === 0" class="transaction-list">
            <div class="transaction-header">
              <div class="transaction-date">날짜</div>
              <div class="transaction-desc">내용</div>
              <div class="transaction-amount">금액</div>
              <div class="transaction-balance">잔액</div>
            </div>
            <div class="transaction-item" v-for="(item, index) in transactions" :key="index">
              <div class="transaction-date">{{ item.date }}</div>
              <div class="transaction-desc">{{ item.description }}</div>
              <div class="transaction-amount"
                :class="{ 'income': item.type === 'income', 'expense': item.type === 'expense' }">
                {{ item.type === 'income' ? '+' : '-' }}{{ item.amount }} 씨드
              </div>
              <div class="transaction-balance">{{ item.balance }} 씨드</div>
            </div>
            <div class="pagination">
              <button class="pagination-btn" @click="prevPage" :disabled="currentPage === 1">
                <i class="bi bi-chevron-left"></i>
              </button>
              <span class="pagination-info">{{ currentPage }} / {{ totalPages }}</span>
              <button class="pagination-btn" @click="nextPage" :disabled="currentPage === totalPages">
                <i class="bi bi-chevron-right"></i>
              </button>
            </div>
          </div>

          <!-- 수입 내역 탭 -->
          <div v-if="activeTab === 1" class="transaction-list">
            <div class="transaction-header">
              <div class="transaction-date">날짜</div>
              <div class="transaction-desc">내용</div>
              <div class="transaction-amount">금액</div>
              <div class="transaction-balance">잔액</div>
            </div>
            <div class="transaction-item" v-for="(item, index) in incomeTransactions" :key="index">
              <div class="transaction-date">{{ item.date }}</div>
              <div class="transaction-desc">{{ item.description }}</div>
              <div class="transaction-amount income">
                +{{ item.amount }} 씨드
              </div>
              <div class="transaction-balance">{{ item.balance }} 씨드</div>
            </div>
            <div class="pagination">
              <button class="pagination-btn" @click="prevIncomePage" :disabled="incomeCurrentPage === 1">
                <i class="bi bi-chevron-left"></i>
              </button>
              <span class="pagination-info">{{ incomeCurrentPage }} / {{ incomeTotalPages }}</span>
              <button class="pagination-btn" @click="nextIncomePage" :disabled="incomeCurrentPage === incomeTotalPages">
                <i class="bi bi-chevron-right"></i>
              </button>
            </div>
          </div>

          <!-- 지출 내역 탭 -->
          <div v-if="activeTab === 2" class="transaction-list">
            <div class="transaction-header">
              <div class="transaction-date">날짜</div>
              <div class="transaction-desc">내용</div>
              <div class="transaction-amount">금액</div>
              <div class="transaction-balance">잔액</div>
            </div>
            <div class="transaction-item" v-for="(item, index) in expenseTransactions" :key="index">
              <div class="transaction-date">{{ item.date }}</div>
              <div class="transaction-desc">{{ item.description }}</div>
              <div class="transaction-amount expense">
                -{{ item.amount }} 씨드
              </div>
              <div class="transaction-balance">{{ item.balance }} 씨드</div>
            </div>
            <div class="pagination">
              <button class="pagination-btn" @click="prevExpensePage" :disabled="expenseCurrentPage === 1">
                <i class="bi bi-chevron-left"></i>
              </button>
              <span class="pagination-info">{{ expenseCurrentPage }} / {{ expenseTotalPages }}</span>
              <button class="pagination-btn" @click="nextExpensePage"
                :disabled="expenseCurrentPage === expenseTotalPages">
                <i class="bi bi-chevron-right"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useStockStore } from '@/stores/stockStore';
import api from '@/api/studentStockApi';

// 스토어 및 API 데이터
const stockStore = useStockStore();
const myStock = computed(() => stockStore.myStock);

// 탭 관리
const tabs = ['전체 내역', '수입 내역', '지출 내역'];
const activeTab = ref(0);

// 페이지네이션 관련 상태
const itemsPerPage = 5;
const currentPage = ref(1);
const incomeCurrentPage = ref(1);
const expenseCurrentPage = ref(1);

// 자산 데이터
const totalAssets = ref(12500);
const totalIncome = ref(15000);
const totalExpense = ref(2500);
const currentProfit = ref(8.5);

// 자산 분포 데이터
const assetItems = ref([
  { label: '예수금', value: 1000 },
  { label: '주식', value: 4500 },
  { label: '적금', value: 3000 }
]);
const assetColors = ['#00A3FF', '#FF6940', '#FAB809'];

// 수익률 추이 데이터
const profitTrendData = ref([2, 5, 3, 7, 4, 8.5]);
const trendMonths = ['1월', '2월', '3월', '4월', '5월', '6월'];

// 거래 내역 데이터 (실제로는 API에서 가져올 것)
const allTransactions = ref([
  { date: '2023-06-01', description: '월급 수령', amount: 3000, type: 'income', balance: 8000 },
  { date: '2023-06-03', description: '주식 매수', amount: 1500, type: 'expense', balance: 6500 },
  { date: '2023-06-05', description: '적금 입금', amount: 500, type: 'expense', balance: 6000 },
  { date: '2023-06-10', description: '주식 배당금', amount: 200, type: 'income', balance: 6200 },
  { date: '2023-06-15', description: '월급 수령', amount: 3000, type: 'income', balance: 9200 },
  { date: '2023-06-18', description: '물건 구매', amount: 300, type: 'expense', balance: 8900 },
  { date: '2023-06-20', description: '주식 매도', amount: 2000, type: 'income', balance: 10900 },
  { date: '2023-06-25', description: '적금 입금', amount: 500, type: 'expense', balance: 10400 },
  { date: '2023-06-28', description: '보너스', amount: 1500, type: 'income', balance: 11900 },
  { date: '2023-06-30', description: '물건 구매', amount: 400, type: 'expense', balance: 11500 },
  { date: '2023-07-01', description: '월급 수령', amount: 3000, type: 'income', balance: 14500 },
  { date: '2023-07-05', description: '주식 매수', amount: 2000, type: 'expense', balance: 12500 }
]);

// 계산된 속성들
const assetSegments = computed(() => {
  const total = assetItems.value.reduce((sum, item) => sum + item.value, 0);
  let cumulative = 0;

  return assetItems.value.map((item, index) => {
    const percentage = item.value / total;
    const dashArray = percentage * 251.2;
    const dashOffset = -cumulative; // 누적된 길이만큼 밀어줌
    cumulative += dashArray;

    return {
      percentage,
      color: assetColors[index],
      dashArray,
      dashOffset
    };
  });
});

const profitTrendPoints = computed(() => {
  return profitTrendData.value.map((point, index) => {
    const x = index * (300 / (profitTrendData.value.length - 1));
    const y = 100 - (point + 20) * (100 / 40); // 스케일 조정: -20% ~ +20% 범위를 0~100으로 매핑
    return `${x},${y}`;
  }).join(' ');
});

// 페이지네이션된 거래 내역
const transactions = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  return allTransactions.value.slice(start, end);
});

const totalPages = computed(() => {
  return Math.ceil(allTransactions.value.length / itemsPerPage);
});

// 수입 내역만 필터링
const allIncomeTransactions = computed(() => {
  return allTransactions.value.filter(item => item.type === 'income');
});

const incomeTransactions = computed(() => {
  const start = (incomeCurrentPage.value - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  return allIncomeTransactions.value.slice(start, end);
});

const incomeTotalPages = computed(() => {
  return Math.ceil(allIncomeTransactions.value.length / itemsPerPage);
});

// 지출 내역만 필터링
const allExpenseTransactions = computed(() => {
  return allTransactions.value.filter(item => item.type === 'expense');
});

const expenseTransactions = computed(() => {
  const start = (expenseCurrentPage.value - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  return allExpenseTransactions.value.slice(start, end);
});

const expenseTotalPages = computed(() => {
  return Math.ceil(allExpenseTransactions.value.length / itemsPerPage);
});

// 메서드
const getDonutSegmentStyle = (segment, index) => {
  return {
    '--start-angle': `${segment.startAngle}deg`,
    '--end-angle': `${segment.endAngle}deg`,
    '--segment-color': segment.color
  };
};

const prevPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--;
  }
};

const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++;
  }
};

const prevIncomePage = () => {
  if (incomeCurrentPage.value > 1) {
    incomeCurrentPage.value--;
  }
};

const nextIncomePage = () => {
  if (incomeCurrentPage.value < incomeTotalPages.value) {
    incomeCurrentPage.value++;
  }
};

const prevExpensePage = () => {
  if (expenseCurrentPage.value > 1) {
    expenseCurrentPage.value--;
  }
};

const nextExpensePage = () => {
  if (expenseCurrentPage.value < expenseTotalPages.value) {
    expenseCurrentPage.value++;
  }
};

// 데이터 초기화
onMounted(async () => {
  try {
    // 실제 API 호출로 대체할 수 있습니다
    // const stockData = await api.getMyStock();
    // myStock.value = stockData;

    // 여기에 거래 내역, 자산 정보 등을 가져오는 API 호출을 추가할 수 있습니다
  } catch (error) {
    console.error('데이터 로딩 중 오류 발생:', error);
  }
});
</script>

<style scoped>
.finance-dashboard {
  font-family: 'Noto Sans KR', sans-serif;
}

.card {
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

/* 요약 카드 스타일 */
.finance-summary-card {
  display: flex;
  align-items: center;
  background-color: #f8f9fa;
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  height: 100px;
}

.finance-summary-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
}

.summary-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: rgba(0, 163, 255, 0.1);
  margin-right: 15px;
}

.summary-icon i {
  font-size: 24px;
  color: #00A3FF;
}

.summary-icon.income i {
  color: #28a745;
}

.summary-icon.income {
  background-color: rgba(40, 167, 69, 0.1);
}

.summary-icon.expense i {
  color: #dc3545;
}

.summary-icon.expense {
  background-color: rgba(220, 53, 69, 0.1);
}

.summary-info {
  flex: 1;
}

.summary-title {
  font-size: 14px;
  color: #6c757d;
  margin: 0 0 5px 0;
}

.summary-value {
  font-size: 20px;
  font-weight: 600;
  color: #212529;
  margin: 0;
}

/* 차트 컨테이너 스타일 */
.chart-container {
  background-color: #fff;
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  height: 300px;
  margin-bottom: 20px;
}

.chart-title {
  font-size: 16px;
  font-weight: 600;
  color: #00A3FF;
  margin-bottom: 20px;
  padding-bottom: 10px;
  border-bottom: 2px solid #00A3FF;
  display: inline-block;
}

/* 자산 분포 차트 스타일 */
.asset-distribution {
  display: flex;
  height: 220px;
}

.donut-chart {
  position: relative;
  width: 180px;
  height: 180px;
}

.donut-svg {
  transform: rotate(-90deg);
  /* 12시 방향에서 시작하도록 회전 */
}

.donut-segment {
  transition: all 0.3s ease;
}

.donut-chart-container {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
}

.donut-hole {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 60%;
  height: 60%;
  background-color: white;
  border-radius: 50%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1) inset;
}

.donut-hole-text {
  text-align: center;
}

.total-amount {
  display: block;
  font-size: 18px;
  font-weight: 600;
  color: #212529;
}

.total-label {
  display: block;
  font-size: 12px;
  color: #6c757d;
}

.chart-legend {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

/* 범례 스타일 개선 */
.legend-item {
  display: flex;
  align-items: center;
  margin-bottom: 15px;
  transition: transform 0.2s ease;
}

.legend-item:hover {
  transform: translateX(5px);
}

.legend-color {
  width: 16px;
  height: 16px;
  border-radius: 4px;
  margin-right: 10px;
}

.legend-text {
  display: flex;
  flex-direction: column;
}

.legend-label {
  font-size: 14px;
  color: #495057;
  font-weight: 500;
}

.legend-value {
  font-size: 12px;
  color: #6c757d;
}

/* 수익률 추이 차트 스타일 */
.profit-trend {
  height: 220px;
  display: flex;
  flex-direction: column;
}

.trend-chart {
  flex: 1;
  position: relative;
}

.trend-line {
  height: 180px;
  position: relative;
  border-left: 1px solid #dee2e6;
  border-bottom: 1px solid #dee2e6;
  margin-left: 30px;
}

.trend-svg {
  position: absolute;
  top: 0;
  left: 0;
  width: calc(100% - 30px);
  height: 100%;
}

.trend-polyline {
  fill: none;
  stroke: #00A3FF;
  stroke-width: 2;
}

.trend-point {
  fill: #00A3FF;
}

.trend-labels {
  display: flex;
  margin-left: 30px;
}

.trend-y-labels {
  position: absolute;
  left: 0;
  top: 0;
  height: 180px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  font-size: 12px;
  color: #6c757d;
}

.trend-y-labels div {
  transform: translateY(-50%);
}

.trend-x-labels {
  display: flex;
  justify-content: space-between;
  width: 100%;
  font-size: 12px;
  color: #6c757d;
  margin-top: 5px;
}

.current-profit {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 10px;
}

.profit-label {
  font-size: 14px;
  color: #495057;
  margin-right: 10px;
}

.profit-value {
  font-size: 18px;
  font-weight: 600;
  padding: 4px 12px;
  border-radius: 20px;
}

.profit-value.positive {
  color: #28a745;
  background-color: rgba(40, 167, 69, 0.1);
}

.profit-value.negative {
  color: #dc3545;
  background-color: rgba(220, 53, 69, 0.1);
}

/* 탭 네비게이션 스타일 */
.finance-tabs {
  display: flex;
  border-bottom: 1px solid #dee2e6;
}

.tab-item {
  padding: 10px 20px;
  cursor: pointer;
  font-size: 14px;
  color: #495057;
  border-bottom: 2px solid transparent;
  transition: all 0.3s ease;
}

.tab-item:hover {
  color: #00A3FF;
}

.tab-item.active {
  color: #00A3FF;
  border-bottom-color: #00A3FF;
  font-weight: 600;
}

/* 거래 내역 스타일 */
.transaction-list {
  margin-top: 20px;
}

.transaction-header {
  display: flex;
  padding: 10px 15px;
  background-color: #f8f9fa;
  border-radius: 8px;
  font-weight: 600;
  color: #495057;
  margin-bottom: 10px;
}

.transaction-item {
  display: flex;
  padding: 12px 15px;
  border-bottom: 1px solid #f1f1f1;
  transition: background-color 0.2s ease;
}

.transaction-item:hover {
  background-color: rgba(0, 163, 255, 0.05);
}

.transaction-date {
  width: 20%;
  color: #6c757d;
}

.transaction-desc {
  width: 40%;
  color: #212529;
}

.transaction-amount {
  width: 20%;
  font-weight: 600;
  text-align: right;
}

.transaction-amount.income {
  color: #28a745;
}

.transaction-amount.expense {
  color: #dc3545;
}

.transaction-balance {
  width: 20%;
  text-align: right;
  color: #495057;
}

/* 페이지네이션 스타일 */
.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
}

.pagination-btn {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  border: 1px solid #dee2e6;
  background-color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  transition: all 0.2s ease;
}

.pagination-btn:hover:not(:disabled) {
  background-color: #f8f9fa;
  border-color: #00A3FF;
  color: #00A3FF;
}

.pagination-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.pagination-info {
  margin: 0 15px;
  font-size: 14px;
  color: #6c757d;
}

/* 반응형 스타일 */
@media (max-width: 768px) {
  .asset-distribution {
    flex-direction: column;
    height: auto;
  }

  .donut-chart-container {
    margin-bottom: 20px;
  }

  .chart-legend {
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-around;
  }

  .legend-item {
    margin-right: 10px;
  }

  .transaction-date,
  .transaction-desc,
  .transaction-amount,
  .transaction-balance {
    font-size: 12px;
  }
}
</style>