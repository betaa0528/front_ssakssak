<template>
  <div class="card-container">
    <div class="card">
      <div class="card-img-overlay">
        <div class="text-white fw-semi-bold">
          <div class="tax-title">주별 단위로 쌓인 세금을<br> 확인할 수 있습니다.</div>
        </div>
        <div class="alert alert-success d-flex mb-0" style="margin-top: 10px; margin-left:40px">
          <i class="ai-octagon-alert fs-xl me-2"></i>
          <p class="taxAlert mb-0">세금은 국고로 편입됩니다.</p>
        </div>

        <div class="tax-footer" style="margin-top : 15px">
          <button type="button" class="btn btn-warning" style="margin-right : 15px" @click="openTaxModal">세금 확인</button>
          <button type="button" class="btn btn-warning" @click="openTaxRateModal">세율 변경</button>
        </div>
      </div>
    </div>

    <div class="card" id="scard">
      <div class="card-img-overlay">
        <div class="text-blue fw-semi-bold">
          <div class="saving-title" style="margin-top:170px; margin-left:70px">예적금상품을 등록/관리하여 학생들의 씨드활동을 유도하세요.</div>
        </div>

        <div class="saving-footer" style="margin-top : 40px">
          <router-link to="/teacher/bank"><button type="button" class="btn btn-primary" id="savingbtn"
              style="margin-right : 15px">예적금 상품 확인</button>
          </router-link>
          <button type="button" class="btn btn-danger" id="saving2btn" @click="openModal">예적금 상품 변경</button>
        </div>
      </div>
    </div>
  </div>

  <div>

    <div>
      <!-- 모달 창 -->
      <div v-if="isModalOpen" class="modal">
        <div class="modal-content">

          <!-- 모달 내용 -->
          <h4 class="no-bold">새 적금 등록하기</h4>
          <form @submit.prevent="submitForm" class="form-grid">

            <!-- 적금 이름 -->
            <div class="form-group">
              <label for="saving-name">적금이름 <span class="required-asterisk">*</span></label>
              <input type="text" id="saving-name" v-model="savingName" placeholder="적금이름을 입력해주세요.">
            </div>

            <!-- 기본 금리 -->
            <div class="form-group">
              <label for="basic-rate">기본금리(숫자만 입력)<span class="required-asterisk">*</span></label>
              <input type="text" id="basic-rate" v-model="basicRate" placeholder="기본 금리를 입력해주세요.">
            </div>

            <!-- 상품 특징 -->
            <div class="form-group">
              <label for="saving-point">상품특징<span class="required-asterisk">*</span></label>
              <input type="text" id="saving-point" v-model="savingPoint" placeholder="상품특징을 입력해주세요.">
            </div>

            <!-- 가입 대상 -->
            <div class="form-group">
              <label for="saving-person">가입대상<span class="required-asterisk">*</span></label>
              <input type="text" id="saving-person" v-model="savingPerson" placeholder="가입대상을 입력해주세요.">
            </div>

            <!-- 예치 기간 -->
            <div class="form-group">
              <label for="period">예치기간 <span class="required-asterisk">*</span></label>
              <select id="period" v-model="period" placeholder="예치 기간을 선택해주세요">
                <option value="2주">2주</option>
                <option value="4주">4주</option>
                <option value="8주">8주</option>
              </select>
            </div>

            <!-- 입금 주기 -->
            <div class="form-group">
              <label for="frequency">입금 주기 <span class="required-asterisk">*</span></label>
              <select id="frequency" v-model="frequency" placeholder="입금 주기를 선택해주세요">
                <option value="1일">1일</option>
                <option value="1주">1주</option>
              </select>
            </div>

            <!-- 최대 입금 금액 -->
            <div class="form-group">
              <label for="max-amount">최대 입금 금액(숫자만 입력)<span class="required-asterisk">*</span></label>
              <input type="text" id="max-amount" v-model="maxAmount" placeholder="최대 입금 금액을 설정해주세요">
            </div>

            <!-- 우대 금리 설정 -->
            <div class="form-group">
              <label for="extra-rate">우대 금리 설정(숫자만 입력)</label>
              <input type="text" id="extra-rate" v-model="extraRate" placeholder="우대 금리를 설정해주세요">
            </div>

            <!-- 우대 금리 직업 -->
            <div class="form-group">
              <label for="selected-Jobs">우대 금리 직업 (최대 4개 선택 가능)</label>
              <div class="job-list">
                <label v-for="job in jobs" :key="job.name">
                  <input type="checkbox" :value="job.name" v-model="selectedJobs"
                    :disabled="selectedJobs.length >= 4 && !selectedJobs.includes(job.name)" />
                  {{ job.name }}
                </label>
              </div>
            </div>

            <!-- 선택한 직업 리스트 -->
            <div class="form-group">
              <label for="selected-Jobslist">선택된 우대 금리 직업</label>
              <ul>
                <li v-for="job in selectedJobs" :key="job">{{ job }}</li>
              </ul>
            </div>

            <!-- 등록 및 취소 버튼 -->
            <div class="form-group full-width button-group">
              <button type="submit" class="submit-button">등록</button>
              <button type="button" @click="closeModal" class="cancel-button">취소</button>
            </div>
          </form>
        </div>
      </div>
    </div>
    <!-- 완료 모달 -->
    <div v-if="isCompleted" class="complete-modal">
      <div class="modal-content">
        <p>적금 설정이 완료되었어요</p>
        <button @click="closeCompleteModal" class="confirm-button">확인</button>
      </div>
    </div>
    <!-- 경고 모달 -->
    <div v-if="showWarningModal" class="complete-modal">
      <div class="modal-content">
        <p>필수 정보를 모두 입력해주세요</p>
        <button @click="closeWarningModal" class="confirm-button">확인</button>
      </div>
    </div>
  </div>

  <div v-if="isTaxModalOpen" class="tax-modal">
    <div class="tax-modal-content">
      <div class="modal-header">
        <h4 class="modal-title">이번 주 우리반 세금 확인</h4>
        <button class="close-button" @click="closeTaxModal">&times;</button>
      </div>
      <div class="modal-body">
        <label for="seedValue">이번 주 우리반 적립된 세금은?</label>
        <!-- 여기에 currentWeekTax 값을 바인딩하여 출력 -->
        <input type="text" id="seedValue" v-model="currentWeekTax" class="input-field" readonly />
      </div>
      <div class="modal-footer">
        <button class="btn btn-primary" @click="closeTaxModal">닫기</button>
      </div>
    </div>
  </div>


  <!-- 세율 변경 모달 창 -->
  <!-- 세율 변경 모달 창 -->
  <div v-if="isTaxRateModalOpen" class="tax-modal">
    <div class="tax-modal-content">
      <div class="modal-header">
        <h4 class="modal-title">세율 변경하기</h4>
        <button class="close-button" @click="closeTaxRateModal">&times;</button>
      </div>
      <div class="modal-body">
        <label for="taxCategory">세금 카테고리:</label>
        <!-- 드롭다운 메뉴 -->
        <select id="taxCategory" v-model="selectedTaxCategory" class="input-field">
          <option value="Income Tax">주급 씨드</option>
          <option value="Deposit Tax">예금</option>
          <option value="Saving Tax">적금</option>
          <option value="Stock Trade Tax">주식 거래</option>
        </select>

        <label for="newTaxRate">새로운 세율 값:</label>
        <input type="number" id="newTaxRate" v-model="newTaxRate" class="input-field" placeholder="세율 값을 입력하세요" />
      </div>
      <div class="modal-footer">
        <button class="confirm-button" @click="updateTaxRate">저장</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import api from '@/api/teacherTaxApi.js';  // API 호출 관련 파일 임포트

// 모달 및 폼 상태 관리
const isModalOpen = ref(false);
const isCompleted = ref(false);
const showWarningModal = ref(false);
const selectedJobs = ref([]);

// 적금 데이터
const savings = ref([
]);

// 새 적금 데이터
const savingName = ref('');
const period = ref('');
const frequency = ref('');
const basicRate = ref('');
const maxAmount = ref('');
const extraRate = ref('');
const savingPoint = ref('');
const savingPerson = ref('');

const jobs = ref([
  { name: "회사원" },
  { name: "경찰" },
  { name: "낙농협회장" },
  { name: "환경미화원" },
  { name: "우체부" },
  { name: "사서" },
  { name: "통계청장" },
  { name: "한국전력공사대표" }
]);

const openModal = () => {
  isModalOpen.value = true;
};

const closeModal = () => {
  isModalOpen.value = false;
};

const submitForm = () => {
  if (!savingName.value || !period.value || !frequency.value || !basicRate.value || !maxAmount.value || !savingPoint.value || !savingPerson.value) {
    showWarningModal.value = true;
  } else {
    savings.value.push({
      name: savingName.value,
      basicRate: basicRate.value,
      extraRate: extraRate.value,
      point: savingPoint.value,
      person: savingPerson.value,
      period: period.value,
      maxAmount: maxAmount.value,
      image: "/public/safeimage.png" // 기본 이미지 추가
    });
    isModalOpen.value = false;
    isCompleted.value = true;
  }
};

const closeCompleteModal = () => {
  isCompleted.value = false;
};

const closeWarningModal = () => {
  showWarningModal.value = false;
};

const deleteSaving = (name) => {
  savings.value = savings.value.filter((saving) => saving.name !== name);
};

const handleJobSelection = (job) => {
  if (selectedJobs.value.length >= 4 && !selectedJobs.value.includes(job)) {
    return;
  }
  selectedJobs.value = selectedJobs.value.includes(job)
    ? selectedJobs.value.filter(j => j !== job)
    : [...selectedJobs.value, job];
};



// 모달 상태 관리
const isTaxModalOpen = ref(false);

// 이번 주 세금 데이터
const currentWeekTax = ref('');

// 모달을 열 때 세금 데이터를 가져오는 함수
const openTaxModal = async () => {
  isTaxModalOpen.value = true;  // 모달 열림 상태로 설정
  try {
    const data = await api.getWeeklyTaxTotal();  // API 호출
    console.log('세금 데이터:', data);  // 콘솔에서 응답 확인
    currentWeekTax.value = data || '0'; // 세금 데이터를 currentWeekTax에 저장
  } catch (error) {
    console.error('세금 데이터를 가져오는 데 실패했습니다.', error);
    currentWeekTax.value = '데이터를 불러오지 못했습니다.';
  }
};

// 서버에서 세금 데이터 가져오기
const fetchTaxData = async () => {
  try {
    const response = await api.getSeedTax();  // API 호출로 세금 데이터 가져옴
    currentWeekTax.value = response.amount;  // 데이터에서 세금 금액 설정
  } catch (error) {
    console.error('세금 데이터를 불러오는 중 오류 발생', error);
  } finally {
    isLoadingTax.value = false;
  }
};

// 페이지 로딩 시 세금 데이터 가져오기
onMounted(() => {
  fetchTaxData();
});

// 세금 확인 모달 닫기
const closeTaxModal = () => {
  isTaxModalOpen.value = false;
};

// 세율 변경 모달 열기
const openTaxRateModal = () => {
  isTaxRateModalOpen.value = true;
};

// 세율 변경 모달 열기
const closeTaxRateModal = () => {
  isTaxRateModalOpen.value = false;
};

// 상태 정의
const isTaxRateModalOpen = ref(false);
const selectedTaxCategory = ref('');
const newTaxRate = ref(0);

// 세율 업데이트 메서드
const updateTaxRate = async () => {
  // 정책 ID를 순차적으로 할당 (예시로 1부터 시작)
  const policyIdMapping = {
    "Income Tax": 1,
    "Deposit Tax": 2,
    "Saving Tax": 3,
    "Stock Trade Tax": 4,
  };

  const policyId = policyIdMapping[selectedTaxCategory.value];
  const policyType = selectedTaxCategory.value;
  const rate = newTaxRate.value;

  // 서버로 전송할 데이터 구조
  const updatedTaxData = {
    policyId: policyId,
    policyType: policyType,
    rate: rate,
  };

  try {
    // 서버에 PUT 요청을 보내서 세율 업데이트
    const response = await api.updateTax(updatedTaxData);
    console.log('세율 업데이트 성공:', response.data);

    // 모달 창 닫기
    closeTaxRateModal();
  } catch (error) {
    console.error('세율 업데이트 실패:', error);
  }
};

</script>


<style scoped>
.card-container {
  display: flex;
  /* Flexbox 사용 */
  justify-content: space-between;
  /* 카드 사이에 간격 추가 */
  gap: 20px;
  /* 카드 사이의 여백 설정 */
  width: 100%;
  /* 컨테이너 전체 너비 */
}

.card {
  width: 48%;
  /* 각 카드의 너비를 48%로 설정하여 두 개가 한 줄에 맞게 함 */
  height: 400px;
  /* 카드 높이 */
  background-size: contain;
  /* 이미지가 짤리지 않게 설정 */
  background-position: center;
  /* 이미지 중앙에 위치 */
  background-repeat: no-repeat;
  /* 여백 없이 표시 */
  border-radius: 25px;
  /* 카드 모서리 둥글게 */
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  /* 그림자 효과 */
  margin: 0px;
  background-color: #00A3FF;
}

/* 첫 번째 카드 배경 이미지 */
.card:nth-child(1) {
  background-image: url('@/assets/images/taxImage2.png');
  /* 첫 번째 카드 배경 */
}

/* 두 번째 카드 배경 이미지 */
.card:nth-child(2) {
  background-image: url('@/assets/images/savingImage.png');
  /* 두 번째 카드 배경 */
}

.overlay-text {
  color: white;
  /* 텍스트 색상 */
  font-size: 24px;
  /* 텍스트 크기 */
  font-weight: bold;
  text-align: center;
  background-color: rgba(0, 0, 0, 0.5);
  /* 텍스트 배경 반투명 처리 */
  padding: 10px;
  border-radius: 5px;
  /* 텍스트 배경 모서리 둥글게 */
  position: absolute;
}

.tax-title {
  padding-top: 20px;
  /* 상단 여백을 적당히 설정 (필요 시 값 조정) */
  color: white;
  font-size: 18px;
  margin-top: 120px;
  margin-left: 45px;

}

.alert {
  width: 250px;
  background-color: white;
  color: #00A3FF;
}

.taxAlert {
  color: #00A3FF;
}

.tax-footer {
  margin-left: 40px;
}

.saving-footer {
  margin-left: 70px;
}

.btn {
  width: 115px;
  border-radius: 5px;
}

#scard {
  background-color: #BCEAFF;
  padding-right: 5px;
}

#savingbtn {
  background-color: #00A3FF;
  border: none;
  width: 180px;
}

#saving2btn {
  background-color: #EF5858;
  width: 180px;
}

.modal {
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  z-index: 1000;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.4);
  /* 배경 반투명 설정 */
}

.modal-content {
  background-color: #fff;
  text-align: center;
  padding: 20px;
  border-radius: 10px;
  width: 500px;
  max-width: 80%;
  /* 화면이 작은 경우에 대비한 최대 너비 */
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
}

.close {
  color: #aaa;
  float: right;
  font-size: 28px;
  font-weight: bold;
  cursor: pointer;
}

.close:hover,
.close:focus {
  color: #000;
}

.form-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 20px;
}

.form-group {
  display: flex;
  flex-direction: column;
}

.full-width {
  grid-column: span 2;
}

label {
  margin-bottom: 5px;
  font-size: 14px;
}

input,
select {
  padding: 8px;
  font-size: 14px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

button {
  padding: 10px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  width: 120px;
}

.submit-button {
  background-color: #00a3ff;
  color: white;
  width: 100px;
  padding: 10px 0;
  /* 버튼 높이를 설정 */
  text-align: center;
  /* 텍스트를 가운데 정렬 */
}

.cancel-button {
  background-color: #ef5858;
  color: white;
  width: 100px;
  padding: 10px 0;
  /* 버튼 높이를 설정 */
  text-align: center;
  /* 텍스트를 가운데 정렬 */
}

.form-group div {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  text-align: center;
}

.button-group {
  display: flex;
  justify-content: center;
  /* 버튼들을 양 끝으로 배치 */
  align-items: center;
  /* 버튼을 수직 중앙에 맞춤 */
  width: 100%;
  /* 부모 컨테이너의 전체 너비를 차지 */
  flex-direction: row;
  gap: 20px;
}

.multiselect {
  width: 100%;
  max-width: 400px;
}

.required-asterisk {
  color: red;
  /* 빨간색으로 표시 */
}

.complete-modal {
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  z-index: 1000;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.4);
}

.confirm-button {
  background-color: #00a3ff;
  color: white;
  width: 80px;
  padding: 10px 0;
  text-align: center;
  margin: 0 auto;
  /* 버튼을 중앙에 정렬하기 위해 margin을 auto로 설정 */
  margin-top: 20px;
  display: flex;
  justify-content: center;
  /* 텍스트를 중앙에 정렬 */
  align-items: center;
  border-radius: 5px;
  border: none;
  cursor: pointer;
}

.input-group-text {
  background-color: #f1f1f1;
  border: 1px solid #ccc;
  padding: 8px;
  font-size: 14px;
  border-radius: 0 4px 4px 0;
  /* 오른쪽 모서리만 둥글게 */
  margin-left: -1px;
  /* input과 겹쳐지지 않게 함 */
}

.no-bold {
  font-weight: normal;
  /* 폰트 두께를 기본(normal)으로 설정하여 볼드체를 제거 */
  margin-bottom: 20px;
  margin-top: 10px;
}


/* 모달 배경 스타일 */
.tax-modal {
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  z-index: 1000;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
}

.tax-modal-content {
  background-color: #fff;
  border-radius: 15px;
  width: 400px;
  padding: 20px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  animation: fadeIn 0.3s ease-out;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #e0e0e0;
  padding-bottom: 10px;
  margin-bottom: 20px;
}

.modal-title {
  font-size: 1.2rem;
  font-weight: bold;
  color: #333;
}

.close-button {
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: #999;
}

.close-button:hover {
  color: #000;
}

.modal-body {
  margin-bottom: 20px;
}

.input-field {
  width: 100%;
  padding: 10px;
  border-radius: 8px;
  border: 1px solid #ccc;
  margin-top: 10px;
  font-size: 1rem;
}

.modal-footer {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
}

.cancel-button,
.confirm-button {
  padding: 10px 20px;
  border-radius: 8px;
  font-size: 1rem;
  border: none;
  cursor: pointer;
}

.cancel-button {
  background-color: #e0e0e0;
  color: #555;
}

.confirm-button {
  background-color: #4caf50;
  color: white;
}

.confirm-button:hover {
  background-color: #45a049;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: scale(0.9);
  }

  to {
    opacity: 1;
    transform: scale(1);
  }
}
</style>
