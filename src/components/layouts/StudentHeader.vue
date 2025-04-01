<template>
  <div class="header">
    <div class="d-flex flex-row justify-content-between align-items-center">
      <div class="ms-3">
        <span v-if="couponUsage">쿠폰 사용중</span>
      </div>
      <div class="d-flex me-6">
        <div class="welcome me-3" v-if="isLogin">
          {{ name }} 학생 환영합니다!
        </div>
        <div class="logout" @click="logout" v-if="isLogin">
          <i class="fas fa-sign-out-alt"></i> 로그아웃
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useAuthStore } from '@/stores/auth';
import { computed, ref, onMounted, onUnmounted } from 'vue';
import { useRouter } from 'vue-router';

import api from '@/api/teacherAlarmApi';

// 스토어와 라우터 설정
const router = useRouter();
const store = useAuthStore();
const couponUsage = ref(true);

// 로그인 상태와 학생 이름 확인
const name = computed(() => store.name);
const isLogin = computed(() => store.isLogin);

// 알림 모달 열림/닫힘 상태
const isNotificationModalOpen = ref(false);

// 알림 모달 열기/닫기
const toggleNotificationModal = () => {
  isNotificationModalOpen.value = !isNotificationModalOpen.value;
};


// 로그아웃 함수
const logout = () => {
  store.logout();
  router.push('/');
};

const alarms = ref([]);
const alarmColor = ref(false);
let eventSource;

const fetchAlarmHistory = async () => {
  try {
    const response = await api.getAlarmHistory(store.username);
    console.log(response);
    if (response.length === 0) {
      console.log("no Alarm List");
      alarmColor.value = false;
      alarms.value = [];
    } else {
      alarmColor.value = true;
      alarms.value = response;
    }
    console.log('value', alarms.value);
  } catch (error) {
    console.error('Failed : ', error);
  }

}

const checkAlarm = async (id, idx) => {
  try {
    const response = await api.postCheckAlarm(id)
    alarms.value.splice(idx, 1);
    console.log(alarms.value.length);
    if (alarms.value.length === 0) {
      alarmColor.value = false;
    }
  } catch (error) {
    console.error("Failed checked alarm", error);
  }
};
const loginCheck = ref(false);

onMounted(async () => {

  if (store.roles[0] === 'ROLE_TEACHER') {
    try {
      loginCheck.value = true;
      await fetchAlarmHistory();
      const username = store.username;
      const token = store.getToken();

      eventSource = new EventSource(`/api/alarm/subscribe/${username}`);

      eventSource.addEventListener('alarm', (event) => {
        const alarm = JSON.parse(event.data);
        alarms.value = [...alarms.value, { id: alarm.id, message: alarm.message }];
        alarmColor.value = true;
      });
      eventSource.onerror = (error) => {
        console.error("Error with SSE connection", error);
      }
    }

    catch (error) {
      console.error('mounte중 오류 발생: ', error);
    }
  };

});

onUnmounted(() => {
  if (eventSource) {
    eventSource.close();
  }
})
</script>

<style scoped>
.header {
  background-color: #473221;
  height: 50px;
  /* padding: 0 20px; */
  color: #f8f6e9;
  width: 100%;
}

.notification {
  font-size: 20px;
  cursor: pointer;
  margin-right: 20px;
}

.welcome {
  font-size: 16px;
  margin-right: 20px;
  line-height: 50px;
}

.logout {
  font-size: 16px;
  display: flex;
  align-items: center;
  cursor: pointer;
}

.logout i {
  margin-right: 5px;
}

/* 모달 오버레이 스타일 */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

/* 모달 창 스타일 */
.modal-content {
  background-color: white;
  border-radius: 15px;
  padding: 20px;
  width: 600px;
  height: 500px;
  /* 모달 창 너비 수정 */
  text-align: center;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  position: relative;
}

/* 알림 목록 가로 채우기 */
.modal-body {
  padding: 20px 0;
  height: 100%;
}

.notifications-container {
  width: 100%;
  height: 380px;
  overflow-x: auto;
  /* 알림 목록이 가로로 꽉 차도록 설정 */
}

.notification-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  padding: 10px;
  background-color: #f9f9f9;
  border-radius: 8px;
  margin-bottom: 10px;
}

.notification-item i {
  margin-right: 10px;
  color: #28a745;
  /* 아이콘 색상을 초록색으로 설정 */
}

.notification-item p {
  margin: 0;
}

.notification-item small {
  color: black;
  /* 시간 글씨를 검정색으로 설정 */
}

.notification-item:hover {
  background-color: #f0f0f0;
}

.delete-btn {
  background: none;
  border: none;
  color: red;
  font-size: 14px;
  cursor: pointer;
}

.close-btn {
  background-color: #473221;
  width: 100%;
  color: white;
  padding: 10px;
  border: none;
  cursor: pointer;
}

.close-btn:hover {
  background-color: #6a4c35;
}
</style>
