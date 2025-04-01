<script setup>
import { RouterView } from 'vue-router';
import DefaultLayout from './components/layouts/DefaultLayout.vue';



</script>

<template>
  <div id="app" class="main-background">
    
    <DefaultLayout>
      <RouterView />
    </DefaultLayout>
  </div>
</template>

<style scoped>
@font-face {
  font-family: 'CustomFont';
  /* 폰트 이름 정의 */
  src: url('@/assets/fonts/The Jamsil 3 Regular.ttf') format('truetype');
  /* 폰트 파일 경로 */
  font-weight: bold;
  font-style: normal;
}

* {
  font-family: 'CustomFont', sans-serif !important;
  font-family: bold;
  /* 전역적으로 폰트 적용 */
}


.btn-primary {
  background-color: #00A3FF;
}

.btn-danger {
  background-color: #EF5858;
}
</style>
