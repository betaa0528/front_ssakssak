<template>
  <div class="login-page">
    <!-- 왼쪽 금융싹싹 소개 섹션 -->
    <div class="intro-section">
      <img src="@/assets/images/15.png" alt="금융싹싹 로고" class="logo" />
      <h1>금융싹싹에 오신 걸 환영합니다</h1>
      <p>금융싹싹으로 학생들에게 쉽고 재미있는 금융 교육을 제공하세요! <br />
        적금 상품 비교 및 가입, 주식 거래 등 실생활에서 필요한 금융 서비스를<br>직접 경험하고 배울 수 있습니다.
      </p>
    </div>

    <!-- 로그인 섹션 -->
    <div class="login-section">
      <h2>학생 로그인</h2>
      <form @submit.prevent="login">
        <div class="form-group">
          <label for="id">아이디</label>
          <input type="text" v-model="member.username" placeholder="아이디를 입력하세요" required>
        </div>
        <div class="form-group">
          <label for="password">비밀번호</label>
          <input type="password" v-model="member.password" placeholder="비밀번호를 입력하세요" required>
          <a @click="goToFindPw">비밀번호 재설정</a>
        </div>
        <button type="submit" class="login-button">로그인하기</button>
        <div v-if="error" class="error-message">로그인 정보가 일치하지 않습니다.</div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { computed, reactive, ref } from 'vue';
import { useAuthStore } from '@/stores/auth';
import { useRoute, useRouter } from 'vue-router';

const route = useRoute();
const router = useRouter();
const auth = useAuthStore();


const member = reactive({
  username: '',
  password: '',
});

const error = ref('');

const login = async () => {
  // console.log(member);
  try {
    await auth.login({ ...member }, "student");
    if (router.query && router.query.next) {
      router.push({ name: route.query.next });
    } else {
      // 일반
      if(router.currentRoute.value.path.includes("/student") && auth.roles.includes("ROLE_TEACHER")); {
        new Error("학생페이지에서 선생님계정으로 로그인 불가");
      }
      router.push('/student/home');
    }
  } catch (e) {
    // 로그인 에러
    console.log('에러=======', e);
    error.value = e.response.data;
  }
};

const goToFindPw = () => {
  router.push('/student/auth/findpw');
};


</script>

<style scoped>
.login-page {
  display: flex;
  justify-content: space-between;
  height: 100vh;
  background-color: #f9f9f9;
}

.intro-section {
  background-color: #FAB809;
  color: white;
  width: 50%;
  padding: 40px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.logo {
  width: 500px;
  margin-bottom: 20px;
}

h1 {
  font-size: 28px;
  margin-bottom: 20px;
  color: #ffffff;
}

p {
  font-size: 16px;
  line-height: 1.5;
  text-align: center;
  max-width: 80%;
  color: white;
}

.login-section {
  width: 50%;
  padding: 60px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

h2 {
  font-size: 24px;
  margin-bottom: 20px;
}

.form-group {
  margin-bottom: 20px;
}

label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
}

input {
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

a {
  font-size: 146x;
  color: #FAB809;
  text-decoration: none;
}

a:hover {
  text-decoration: underline;
}

.login-button {
  width: 100%;
  padding: 15px;
  background-color: #FAB809;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
}

.login-button:hover {
  background-color: #FAB809;
}

.error-message {
  color: red;
  font-size: 14px;
  margin-top: 10px;
}

/* 회원가입 섹션 스타일 */
.signup-section {
  text-align: center;
  /* 텍스트를 가운데 정렬 */
  margin-top: 20px;
  /* 위쪽 여백 추가 */
  font-size: 16px;
  color: #FAB809;
}

.black-text {
  color: #3d3d3d;
}
</style>