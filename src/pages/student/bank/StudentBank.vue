<template>
  <link rel="stylesheet" href="assets/css/theme.min.css">
  <link rel="stylesheet" href="assets/css/theme.css">
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons/font/bootstrap-icons.css">

  <!-- 적금 가입 목록 보기 -->
  <div class="container mt-2 mt-lg-5 mb-lg-4 my-xl-5">
    <!-- 카드로 테이블 감싸기 -->
    <!-- 카드 헤더에 제목 추가 -->
    <div class="card-header">
      <h5 class="title">현재 가입중인 예금 상품</h5>


      <!-- 카드 본문에 테이블 배치 -->
      <div class="card-body">
        <table class="table">
          <thead>
            <tr>
              <th id="th1">상품 가입일</th>
              <th id="th1">만기 예정일</th>
              <th id="th1">상품명</th>
              <th id="th1">적립액</th>
              <th id="th1">해지하기</th>
            </tr>
          </thead>
          <tbody>
            <!-- 적금 리스트를 순회하며 행을 생성 -->
            <tr v-for="(item, index) in depositAccount" :key="index" v-if="depositAccount && depositAccount.length">
              <td>{{item.startDate}}</td>
              <td>{{ item.endDate[0] + '-' + (item.endDate[1] < 10 ? '0' + item.endDate[1] : item.endDate[1]) + '-' +
                (item.endDate[2] < 10 ? '0' + item.endDate[2] : item.endDate[2]) }}</td>
              <td>{{ item.depositName }}</td>
              <td style="color: blue;">{{ item.depositAmount }} 씨드</td>
              <td>
                <button class="btn btn-outline-danger" @click="cancelDeposit(item)">상품 해지</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>

  <div class="container mt-2 mt-lg-5 mb-lg-4 my-xl-5">
    <!-- 카드로 테이블 감싸기 -->
    <!-- 카드 헤더에 제목 추가 -->
    <div class="card-header">
      <h5 class="title">현재 가입중인 적금 상품</h5>


      <!-- 카드 본문에 테이블 배치 -->
      <div class="card-body">
        <table class="table">
          <thead>
            <tr>
              <th id="th1">상품 가입일</th>
              <th id="th1">만기 예정일</th>
              <th id="th1">상품명</th>
              <th id="th1">적립액</th>
              <th id="th1">해지하기</th>
            </tr>
          </thead>
          <tbody>
            <!-- 적금 리스트를 순회하며 행을 생성 -->
            <tr v-for="(item, index) in savingAccount" :key="index">
              <td>{{ item.startDate[0] + '-' + (item.startDate[1] < 10 ? '0' + item.startDate[1] : item.startDate[1])
                + '-' + (item.startDate[2] < 10 ? '0' + item.startDate[2] : item.startDate[2]) }}</td>
              <td>{{ item.endDate[0] + '-' + (item.endDate[1] < 10 ? '0' + item.endDate[1] : item.endDate[1]) + '-' +
                (item.endDate[2] < 10 ? '0' + item.endDate[2] : item.endDate[2]) }}</td>
              <td>{{ item.savingName }}</td>
              <td style="color: blue;">{{ item.totalAmount }} 씨드</td>
              <td>
                <button class="btn btn-outline-danger" @click="cancelSaving(item.accountId)">상품 해지</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>



  <!-- 적금 상품 전체보기 -->
  <div class="container">
    <div class="card-header">
      <h5 class="title">가입 가능한 예금 상품 전체보기</h5>
    </div>
  </div>
  <div id="specificSavingsPlan" class="savings-plans">
    <div v-for="(deposit, index) in depositList" :key="deposit.depositId" class="card-safe">
      <div class="savingCard">
        <img src=" @/assets/images/tree1.png" alt="싹싹예금" class="card-img" id="card-img" />
        <div class="card-header">
          <h4>{{ deposit.depositName }}</h4>
          <div class="alert alert-primary" role="alert">
            <i class="bi bi-bar-chart-line me-2" style=" padding-bottom:5px;"></i>금리 : {{ deposit.rate }}%<i
              class="bi bi-calendar4-week me-2" style="padding-left: 10px; padding-bottom:5px;"></i>예치 기간 :
            {{ deposit.depositPeriod }}주
          </div>
        </div>
        <div class="card-body">
          <div class="d-flex justify-content-between align-items-center pb-2 mb-3">
            <span class="text-muted fw-bold d-block p-0">상품특징</span>
            <span class="text-muted ps-5" style="text-align:left">{{ deposit.depositContent }}</span>
          </div>
          <div class="d-flex justify-content-between align-items-center pb-2 mb-3">
            <span class="text-muted fw-bold">예치기간</span>
            <span class="text-muted">{{ deposit.depositPeriod }}주</span>
          </div>
          <div class="d-flex justify-content-between align-items-center pb-2 mb-3">
            <span class="text-muted fw-bold">저축금액</span>
            <span class="text-muted">최대 {{ deposit.maxDeposit }}씨드</span>
          </div>
        </div>
        <button class="btn2" @click="openDepositModal(deposit)" :disabled="isSubscribedDeposit(deposit.depositId)">상품
          가입하기</button>
      </div>
    </div>
  </div>
  <!-- ==================================================== 기존 적금 카드들 시작  -->

  <div class="container">
    <div class="card-header">
      <h5 class="title">가입 가능한 적금 상품 전체보기</h5>
    </div>
  </div>
  <div class="savings-plans">
    <div v-for="(saving, index) in savingList" :key="saving.savingId" class="card-safe">
      <div class="savingCard">
        <img src="@/assets/images/tree1.png" alt="새싹적금" class="card-img" id="card-img" />
        <div class="card-header">
          <h4>{{ saving.savingName }}</h4>
          <div class="alert alert-primary" role="alert">
            <i class="bi bi-bar-chart-line me-2" style=" padding-bottom:5px;"></i>금리 : {{ saving.rate }} {{
              saving.primeRate ? ' ~ ' + saving.primeRate : '' }}%<i class="bi bi-calendar4-week me-2"
              style="padding-left: 10px; padding-bottom:5px;"></i>예치 기간 : {{ saving.savingPeriod / 7 }}주
          </div>
        </div>
        <div class="card-body">
          <div class="d-flex justify-content-between align-items-center pb-2 mb-3">
            <span class="text-muted fw-bold d-block p-0" style="width: 100px;">상품특징</span>
            <span class="text-muted ps-5" style="text-align:left">{{ saving.savingContent }}</span>
          </div>
          <div class="d-flex justify-content-between align-items-center pb-2 mb-3">
            <span class="text-muted fw-bold">예치기간</span>
            <span class="text-muted">{{ saving.savingPeriod / 7 }}주</span>
          </div>
          <div class="d-flex justify-content-between align-items-center pb-2 mb-3">
            <span class="text-muted fw-bold">저축금액</span>
            <span class="text-muted">최대 {{ saving.maxDeposit }}씨드</span>
          </div>
        </div>
        <button class="btn2" @click="openModal(saving)" :disabled="isSubscribed(saving.savingId)">상품 가입하기</button>
      </div>
    </div>
  </div>

  <!-- 예금 가입 모달 -->
  <div v-if="isDepositModalOpen" class="modal">
    <div class="modal-content">
      <h3 v-if="!isDepositSubscribedSuccessfully">{{ selectedDepositName }} 가입하기</h3>
      <h3 v-if="isDepositSubscribedSuccessfully">축하합니다! 예금 가입이 완료되었습니다.</h3>

      <div v-if="!isDepositSubscribedSuccessfully">
        <label>금액 설정 : </label>
        <input type="number" v-model="subscriptionDepositAmount" class="moneyselect" />
        <button class="btn btn-primary" @click="subscribeToDeposit">예금 가입하기</button>
      </div>
      <div v-else>
        <p>이제 나의 적금에서 확인할 수 있습니다.</p>
      </div>

      <button @click="closeDepositModal">닫기</button>
    </div>
  </div>
  <!-- 적금 가입모달 -->
  <div v-if="isModalOpen" class="modal">
    <div class="modal-content">
      <h3 v-if="!isSubscribedSuccessfully">{{ selectedProductName }} 가입하기</h3>
      <h3 v-if="isSubscribedSuccessfully">축하합니다! 적금 가입이 완료되었습니다.</h3>

      <div v-if="!isSubscribedSuccessfully">
        <label>금액 설정 : </label>
        <input type="number" v-model="subscriptionAmount" class="moneyselect" />
        <button class="btn btn-primary" @click="subscribeToSaving">적금 가입하기</button>
      </div>
      <div v-else>
        <p>이제 나의 적금에서 확인할 수 있습니다.</p>
      </div>

      <button @click="closeModal">닫기</button>
    </div>
  </div>



  <div class="container mt-2 mt-lg-5 mb-lg-4 my-xl-5">
    <div class="card-header">
      <h5 class="title">얼마를 받을 수 있을까? 📱</h5>

      <!-- 상품 선택 및 금액 입력 -->
      <div class="input-section">
        <div class="form-group">
          <label>상품 선택 : </label>
          <select v-model="selectedProduct" class="form-control styled-select">
            <option value="">선택</option>
            <option v-for="(product, idx) in products" :value="product.name">{{ product.name }}
            </option>
          </select>
        </div>
        <div class="form-group">
          <label>금리</label>
          <input type="text" :value="calRate" class="form-control styled-select" disabled />
        </div>
        <div class="form-group">
          <label>입금 금액</label>
          <div class="amount-input">
            <button @click="decreaseAmount" class="btn btn-outline-success">-</button>
            <input type="number" v-model="depositAmount" class="form-control" />
            <button @click="increaseAmount" class="btn btn-outline-success">+</button>
          </div>
        </div>
        <button class="calculate-btn" @click="calculateInterest">계산하기</button>
      </div>

      <!-- 계산 결과 출력 -->
      <div class="result-section">
        <div class="result-item">
          <label>예상 적립액</label>
          <div>{{ depositAmount }} 씨드</div>
        </div>
        <div class="result-item">
          <label>세후 예상 이자(세금 : 15.4%)</label>
          <div>{{ expectedInterest }} 씨드</div>
        </div>
        <div class="result-item">
          <label>만기 금액</label>
          <div>{{ finalAmount }} 씨드</div>
        </div>
      </div>
    </div>
  </div>
</template>


<script setup>
import { ref, computed, onMounted } from 'vue';
import { useBankStore } from '@/stores/bankStore';
import api from '@/api/studentBankApi';

// 은행 pinia store 사용
const bankStore = useBankStore();

const depositList = computed(() => bankStore.depositList);
const depositAccount = computed(() => bankStore.myDepositList);
const savingList = computed(() => bankStore.savingList);
const savingAccount = computed(() => bankStore.mySavingList);

onMounted(async () => {
  await bankStore.fetchDepositList();
  await bankStore.fetchDepositAccount();
  await bankStore.fetchSavingList();
  await bankStore.fetchSavingAccount();
  await console.log('======>', depositAccount.value[0].startDate.split('-'));

});

console.log(depositAccount);
console.log(savingAccount);


// 모달 상태
const isModalOpen = ref(false);
const selectedProductName = ref('');
const subscriptionAmount = ref(100);
const isSubscribedSuccessfully = ref(false);

// 모달 열기
const openModal = (saving) => {
  selectedProductName.value = saving.savingName;
  isModalOpen.value = true;
};

// 모달 닫기
const closeModal = () => {
  isModalOpen.value = false;
  isSubscribedSuccessfully.value = false;
  subscriptionAmount.value = 100; // 초기화
};

const isDepositModalOpen = ref(false);
const selectedDepositName = ref('');
const subscriptionDepositAmount = ref(100);
const isDepositSubscribedSuccessfully = ref(false);

// 예금 모달 열기
const openDepositModal = (deposit) => {
  selectedDepositName.value = deposit.depositName;
  isDepositModalOpen.value = true;
}

const closeDepositModal = () => {
  isDepositModalOpen.value = false;
  isDepositSubscribedSuccessfully.value = false;
  subscriptionDepositAmount.value = 100;
}

// 주 단위로 날짜를 더해 만기일 계산하는 함수
const addWeeks = (date, weeks) => {
  const result = new Date(date);
  result.setDate(result.getDate() + weeks * 7);
  return result;
};

// 날짜 형식 변환 (YYYY-MM-DD)
const formatDate = (date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};


// 예금 가입처리 
const subscribeToDeposit = async () => {
  const currentDate = new Date();
  let expiryDate;
  const selectedDeposit = depositList.value.find(deposit => deposit.depositName === selectedDepositName.value);
  expiryDate = addWeeks(currentDate, selectedDeposit.depositPeriod);
  if (subscriptionDepositAmount.value > selectedDeposit.maxDeposit) {
    alert(`최대 금액을 초과했습니다! ${selectedDepositName.value}의 최대 금액은 ${maxAmount}입니다.`);
    return;
  }

  const request = {
    depositId: selectedDeposit.depositId,
    rate: selectedDeposit.rate,
    depositAmount: subscriptionDepositAmount.value,
    startDate: formatDate(currentDate),
    endDate: formatDate(expiryDate),
  }

  await api.subscribeDeposit(request);
  isDepositSubscribedSuccessfully.value = true;
  await bankStore.fetchDepositAccount();
}
// 적금 가입 처리
const subscribeToSaving = async () => {
  const currentDate = new Date();
  let expiryDate;
  const selectedSaving = savingList.value.find(saving => saving.savingName === selectedProductName.value);
  expiryDate = addWeeks(currentDate, selectedSaving.savingPeriod / 7);
  if (subscriptionAmount.value > selectedSaving.maxDeposit) {
    alert(`최대 금액을 초과했습니다! ${selectedProductName.value}의 최대 금액은 ${selectedSaving.maxDeposit}입니다.`);
    return;
  }

  const request = {
    savingId: selectedSaving.savingId,
    savingName: selectedSaving.savingName,
    rate: selectedSaving.rate,
    depositAmount: subscriptionAmount.value,
    startDate: formatDate(currentDate),
    endDate: formatDate(expiryDate),
    totalAmount: 0
  }

  await api.subscribeSaving(request);
  isSubscribedSuccessfully.value = true;
  await bankStore.fetchSavingList();
};



// 이미 가입된 예금인지 확인하는 함수 
const isSubscribedDeposit = (id) => {
  return depositAccount.value.find((deposit) => deposit.depositId === id);
}
// 이미 가입된 적금인지 확인하는 함수
const isSubscribed = (id) => {
  return savingAccount.value.find((item) => item.savingId === id);
};

// 예금 해지 처리
const cancelDeposit = async (item) => {
  await api.cancelDeposit(item.accountId);
  alert(`${item.depositName} 적금을 해지합니다.`);
  await bankStore.fetchDepositAccount();
};

// 적금 해지 처리
const cancelSaving = async (item) => {
  await api.cancelSaving(item.accountId);
  alert(`${item.savingName} 적금을 해지합니다.`);
  await bankStore.fetchSavingAccount();
};


// 기능3 이자계산
// 상품 선택 및 금액과 이자율 정보

const products = computed(() => {
  const arr = [];
  const depositCopy = [...depositList.value];
  const savingCopy = [...savingList.value];
  for (const deposit of depositCopy) {
    arr.push({
      name: deposit.depositName,
      maxDeposit: deposit.maxDeposit,
      depositPeriod: deposit.depositPeriod,
      rate: deposit.rate,
    })
  };

  for (const saving of savingCopy) {
    arr.push({
      name: saving.savingName,
      maxDeposit: saving.maxDeposit,
      depositPeriod: saving.savingPeriod,
      rate: saving.rate,
    })
  }
  return arr;
});



const selectedProduct = ref('');
const depositAmount = ref(100);
const calRate = computed(() => {
  const selProduct = products.value.find(product => product.name === selectedProduct.value);
  if (selProduct) {
    return selProduct.rate;
  }
});
// 예상 이자와 만기 금액 계산을 위한 값
const expectedInterest = ref(0);
const finalAmount = ref(0);

// 상품에 따른 기간 (주 단위)


// 이자 계산 함수
const calculateInterest = () => {
  const selProduct = products.value.find(product => product.name === selectedProduct.value);
  if (selProduct) {
    let interestRate = selProduct.rate;
    let depositPeriod = selProduct.depositPeriod; // 예치/적금 기간
    let interest = 0;

    console.log('name', selProduct.name);
    console.log('이율', selProduct.rate)

    // 예금 이자 계산
    if (selProduct.name.endsWith('예금')) {
      const months = depositPeriod / 4; // 예금 기간을 월로 변환 (주 -> 월)
      interest = depositAmount.value * (interestRate / 100) * months;
    }

    // 적금 이자 계산 (매주 납입, 총 금액과 이자를 계산)
    if (selProduct.name.endsWith('적금')) {
      const weeks = depositPeriod / 7; // 적금 기간을 주로 변환 (일 -> 주)
      const totalDeposits = depositAmount.value * weeks; // 총 납입 금액

      // 적금은 매주 납입하므로, 매주 납입 금액에 대해 주당 이자를 계산하고 합산
      // 적금이기 때문에 매주 적립한 금액에 이자가 붙고, 평균 절반 기간만큼 이자를 받음
      interest = totalDeposits * (interestRate / 100 / 12); // 이자율을 월 기준으로 계산
    }

    // 세금 계산 (15.4%)
    const tax = interest * 0.154;
    const afterTaxInterest = interest - tax;

    // 결과 업데이트
    expectedInterest.value = Math.round(afterTaxInterest);
    finalAmount.value = depositAmount.value + expectedInterest.value; // 총 납입금 + 이자
  }
};

// 입금 금액 증가 및 감소 함수
const increaseAmount = () => {
  depositAmount.value += 10;
};
const decreaseAmount = () => {
  if (depositAmount.value > 10) {
    depositAmount.value -= 10;
  }
};

</script>
<style scoped>
.container,
.container-fluid,
.container-sm,
.container-md,
.container-lg,
.container-xl {
  width: 100%;
  padding-right: var(--bs-gutter-x, 0.75rem);
  padding-left: var(--bs-gutter-x, 0.75rem);
  margin-right: auto;
  margin-left: auto;
}

.savings-table {
  padding: 20px;
  display: flex;
  /* Flexbox 사용 */
  justify-content: center;
  /* 가운데 정렬 */
}

.alert {
  background-color: #CFE2FF !important;
  color: #485598;
}

.card {
  background-color: #fff;
  /* 카드 배경색 */
  border-radius: 10px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  max-width: 960px;
  /* 카드의 최대 너비 설정 */
  width: 100%;
  /* 부모 요소에 따라 카드 크기 조정 */
  margin: 0 auto;
  /* 수평 가운데 정렬 */
  color: #50495B;
}

.card-header {
  background-color: #fff;
  padding: 10px;
  border-bottom: 1px solid #ccc;
  border-radius: 10px;
  /* 상단 모서리 둥글게 */
  margin-top: 10px;

}

.card-header-center {
  display: center;
  margin-top: 230px;
}

.title {
  padding-top: 20px;
  padding-left: 5px;
  margin-left: 20px;
  /* 제목 좌측에 마진 추가 */
}

.card-body {
  padding: 10px;
}

.table {
  width: 100%;
  border-collapse: separate;
  /* 테두리 둥글게 하기 위해 separate 사용 */
  border-spacing: 0;
  /* 테두리 간격 제거 */
  border-radius: 10px;
  /* 테이블 전체 둥글게 */
  overflow: hidden;
  /* 둥근 모서리 넘침 방지 */
}

.table th,
.table td {
  border: 1px solid #f0f0f0e2;
  padding: 10px;
  text-align: center;


}

th {
  color: #fff !important;
}

/* 상단 모서리 둥글게 */
.table th:first-child {
  border-top-left-radius: 10px;
}

.table th:last-child {
  border-top-right-radius: 10px;
}

/* 하단 모서리 둥글게 */
.table tr:last-child td:first-child {
  border-bottom-left-radius: 10px;
}

.table tr:last-child td:last-child {
  border-bottom-right-radius: 10px;
}

.table th {
  background-color: #00A3FF;
  color: #fff;
}

.btn {
  padding: 5px 10px;
  font-size: 14px;
}

#allshow {
  margin: 20px auto;
  /* 수직 마진과 수평 가운데 정렬 */
  margin-left: 20px;
  /* 왼쪽 마진 추가 */
  text-align: left;
  /* 텍스트 왼쪽 정렬 */
}


/*적금 가입*/


.savings-plans {
  display: flex;
  justify-content: center;
  /* 중앙 정렬 */
  background-color: #f8f6e9;
  /* 배경색 */
  padding: 40px 20px;
  /* 상하 좌우 패딩 추가 */
  width: 100%;
  flex-wrap: wrap;
  /* 카드들이 줄을 넘어갈 경우 다음 줄로 이동하도록 설정 */
  box-sizing: border-box;
  /* 패딩과 마진을 포함하여 너비 계산 */
}

.savingCard {
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  padding: 20px;
  margin: 20px;
  /* 각 카드의 마진을 동일하게 설정하여 균일하게 배치 */
  width: 404px;
  text-align: center;
  /* cursor: pointer; */
  transition: transform 0.2s;
  /* 카드에 호버 효과 */
  color: #50495B;
}

#th1 {
  color: #fff !important;
  background-color: #00A3FF;
}

.savingCard:hover {
  transform: translateY(-5px);
  /* 호버 시 살짝 올라가는 효과 */
}

.savingCard-img {
  width: 50px;
  height: 50px;
  margin-bottom: 10px;
}

.description {
  margin-top: 15px;
}

.btn2 {
  background-color: #00A3FF;
  color: #fff;
  border: 1px white solid;
  padding: 5px;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 15px;
}

.btn2:disabled {
  background-color: #cccccc;
  /* 회색 */
  color: #666666;
  /* 텍스트 색상 */
  cursor: not-allowed;
  /* 커서 모양 변경 */
  border: 1px solid #aaaaaa;
  /* 테두리 색상 */
}

.btn2:hover {
  background-color: #f24d4d;
  color: #fff;
}

.description li {
  text-align: left;
  list-style-type: none;
  margin-bottom: 10px;
}

#card-img {
  width: 40px;
  height: 40px;
}

.saving-p {
  color: #03C75A;
  font-weight: bold;
}

/*이자 계산기 */
.interest-calculator {
  background-color: #fff;
  padding: 30px;
  border-radius: 12px;
  width: 960px;
  margin: 30px auto;
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.1);
  color: #50495B;

}

.calculator-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #50495B;

}

.input-section,
.result-section {
  flex: 1;
}

.input-section {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.result-section {
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding-left: 30px;
  border-left: 2px solid #ddd;
}

.form-group {
  display: flex;
  flex-direction: column;
}

label {
  font-weight: bold;
  margin-bottom: 5px;
}

.form-control {
  padding: 8px;
  border-radius: 6px;
  border: 1px solid #ccc;
  width: 100%;
  font-size: 16px;
}

.amount-input {
  display: flex;
  align-items: center;
  gap: 10px;
}

.amount-input-field {
  width: 70px;
  text-align: center;
}

.btn-amount {
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 50%;
  width: 30px;
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 18px;
  cursor: pointer;
}

.btn-amount:hover {
  background-color: #0056b3;
}

.calculate-btn {
  background-color: #00A3FF;
  color: #fff;
  border: none;
  padding: 10px 20px;
  cursor: pointer;
  border-radius: 6px;
  font-size: 16px;
  margin-top: 20px;
  margin-bottom: 20px;
}

.calculate-btn:hover {
  background-color: #00A3FF;
}

.result-item {
  display: flex;
  justify-content: space-between;
  font-size: 16px;
  font-weight: bold;
}

.result-item label {
  font-weight: normal;
  color: #555;
}

.styled-select {
  background-color: #fff;
  color: #50495B;
  padding: 10px;
  border-radius: 6px;
  border: 1px solid #ddd;
  font-size: 16px;
  transition: all 0.3s ease;
}

/* 모달 스타일 */
.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.6);
  /* 배경을 어둡게 */
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  /* 다른 요소 위로 */
}

.modal-content {
  background: #fefefe;
  /* 밝은 배경 */
  padding: 30px;
  /* 충분한 여백 */
  border-radius: 16px;
  /* 더 둥근 모서리 */
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  /* 더 부드러운 그림자 */
  max-width: 500px;
  /* 더 넓은 최대 너비 */
  width: 100%;
  text-align: center;
  position: relative;
  /* 닫기 버튼 위치 설정을 위해 상대 위치 */
}

.modal-content h3 {
  font-size: 1.5rem;
  /* 더 큰 제목 */
  color: #333;
  /* 어두운 제목 색상 */
  margin-bottom: 20px;
  /* 제목 아래 여백 */
}

.modal-content p {
  font-size: 1rem;
  /* 일반 텍스트 크기 */
  color: #555;
  /* 약간 밝은 텍스트 색상 */
  margin-bottom: 20px;
  /* 텍스트 아래 여백 */
}

.modal-content input[type="number"] {
  padding: 10px;
  width: 80%;
  border: 1px solid #ddd;
  border-radius: 8px;
  margin-bottom: 20px;
  font-size: 1rem;
  margin-left: 10px;
  /* input 앞에 여백 추가 */
}

.modal-content button {
  background-color: #00A3FF;
  /* 초록색 버튼 */
  color: white;
  border: none;
  padding: 12px 24px;
  font-size: 1rem;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  margin: 10px 0;
  /* 버튼 간격을 위한 여백 추가 */
}

.modal-content button:hover {
  background-color: #00A3FF;
  /* 호버 시 어두운 초록색 */
}

.modal-content button.close-btn {
  background-color: transparent;
  color: #999;
  font-size: 1.5rem;
  position: absolute;
  top: 10px;
  right: 20px;
  cursor: pointer;
  border: none;
}

.modal-content button.close-btn:hover {
  color: #333;
}

.modal-content button.disabled-btn {
  background-color: #ccc;
  /* 비활성화 버튼 색상 */
  cursor: not-allowed;
}

.modal-content .button-group {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
  /* 버튼과 다른 요소 간의 간격 */
}

.modal-content .button-group button {
  width: 48%;
  /* 버튼을 나란히 배치하고 폭 설정 */
}
</style>
