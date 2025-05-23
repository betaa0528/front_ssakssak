<script setup>
import { ref, computed, onMounted } from 'vue';
import { useStockStore } from '@/stores/stockStore';
import { useAuthStore } from '@/stores/auth';
import CouponUsage from './CouponUsage.vue';
import AttendanceCheck from './AttendanceCheck.vue';
import api from '@/api/studentStockApi';
import StockChart from './StockChart.vue';

const stockStore = useStockStore();
const authStore = useAuthStore();
const chartData = computed(() => stockStore.chartData);
const auth = authStore.roles;

onMounted(async () => {
  await stockStore.fetchMyStock();
  await stockStore.fetchChartData();
});

const tabs = [
  { name: 'couponUsage', label: '쿠폰 사용 현황' },
  { name: 'attendanceCheck', label: '출석 체크 현황' },
];

const activeTab = ref('couponUsage'); // 기본 탭 설정


const highest = computed(() => {
  if (chartData.value.length === 0) {
    return 0; // 또는 다른 기본값
  }

  return chartData.value.reduce((prev, value) => {
    return prev.stockPrice >= value.stockPrice ? prev : value
  });
});

const lowest = computed(() => {
  if (chartData.value.length === 0) {
    return 0; // 또는 다른 기본값
  }

  return chartData.value.reduce((prev, value) => {
    return prev.stockPrice <= value.stockPrice ? prev : value
  });
});

const lastChartData = computed(() => {
  if (chartData.value.length === 0) {
    return 0; // 또는 다른 기본값
  }
  return chartData.value[chartData.value.length - 1];
});

const lastDayDiffPrice = computed(() => {
  if (chartData.value.length === 0) {
    return 0; // 또는 다른 기본값
  }
  return chartData.value[chartData.value.length - 1].stockPrice - chartData.value[chartData.value.length - 2].stockPrice;
});
</script>

<template>
  <div class="container">
    <div class="card">
      <div class="row">
        <div class="imgText col-5 text-white" style="min-width: 300px;">
          <img src="@/assets/images/imgText2.png" class="card-img" alt="...">
          <div class="card-img-overlay">
            <div class="d-flex align-items-center mb-3">
              <div class="col-auto"> <!-- col-auto로 최소화 -->
                <img src="@/assets/images/tree1.png" class="chart-img" style="width: 30px; height: auto;">
                <!-- 이미지 크기 고정 -->
              </div>
              <div class="mx-2 d-flex align-items-center">
                <h2 class="text-white fs-7 mt-3">싹싹주식</h2>
              </div>
            </div>

            <div class="px-0 pt-2">
              <p class="fs-5 mb-0 text-danger fw-semibold"><span class="text-gray">오늘의 가격</span> {{
                lastChartData.stockPrice }} 씨드</p>
              <p class="fs-5 txt-primary fw-semibold"><span class="fs-6 text-muted pe-2">어제보다</span>
                {{ lastDayDiffPrice }} 씨드 ({{ lastChartData.change >= 0 ? `+${lastChartData.change}` :
                  lastChartData.change }}%)
              </p>
            </div>
            <div class="text-bottom">
              <p class="fs-5 mt-3 mb-1">최고 가격 (30일): <span class="fw-bold text-danger">{{ highest.stockPrice }}
                  씨드</span>
              </p>
              <p class="fs-5 mb-1 mb-3">최저 가격 (30일): <span class="fw-bold txt-primary">{{ lowest.stockPrice }}
                  씨드</span></p>
            </div>
          </div>
        </div>

        <div class="stockChart col-7" style="min-width: 500px; max-width: 700px;">
          <!-- 탭 메뉴 -->
          <div class="tabs ms-3">
            <button v-for="tab in tabs" :key="tab.name" @click="activeTab = tab.name"
              :class="['tab', { active: activeTab === tab.name }]">
              {{ tab.label }}
            </button>
          </div>

          <!-- 탭 콘텐츠 -->
          <div class="tab-content">
            <CouponUsage v-if="activeTab === 'couponUsage'" />
            <AttendanceCheck v-if="activeTab === 'attendanceCheck'" />
          </div>
        </div>
      </div>
    </div>
  </div>


</template>

<style scoped>
.chart-image {
  width: 50px;
  height: 40px;
}

.router1 {
  text-decoration: none;
}

.imgText {
  position: relative;
  padding: 0px;
  border-radius: 0 !important;
}

.text {
  position: absolute;
  bottom: 5%;
  left: 5%;
  color: white;
}

.stockChart {
  padding: 10px;
}

#seed {
  color: #062375;
  font-size: 30px;
}

.text-bottom {
  padding-top: 10px;
  color: #fff;
}

#seed1 {
  color: #062375;
}

.seed-title {
  font-size: 30px;
  color: #062375;
  margin-bottom: 0px;
}

.mb-1 {
  font-size: 18px;
  color: #fff;
}


.tabs {
  display: flex;
  justify-content: flex-start;
  margin-bottom: 20px;
}

.tab {
  padding: 10px 20px;
  cursor: pointer;
  background: #f1f1f1;
  border: 1px solid #ddd;
  margin-right: 10px;
  border-radius: 5px;
  transition: 0.3s;
}

.tab:hover {
  background: #e0e0e0;
}

.tab.active {
  background: #66cfff;
  color: white;
  border-color: #66cfff;
}

.tab-content {
  padding: 10px;
  border-radius: 5px;
  background: #fff;
}
</style>