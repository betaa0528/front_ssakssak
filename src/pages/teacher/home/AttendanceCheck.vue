<template>
    <div class="container">
        <!-- 카드 섹션 -->
        <div class="coupon-usage card shadow-sm">
            <table class="usage-table">
                <thead>
                    <tr>
                        <th>학생 이름</th>
                        <th>출석 시간</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(coupon, student) in usageList" :key="student">
                        <td>{{ student }}</td>
                        <td>{{ coupon }}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script setup>
import storeApi from '@/api/teacherStoreApi.js';
import { ref, onMounted } from 'vue';


onMounted(() => {
    getTodayUsageCoupons();
});

const usageList = ref({});

const getTodayUsageCoupons = async () => {
    try {
        const response = await storeApi.getTodayUsageCoupon();
        usageList.value = parseCouponName(response.data);

        console.log('redis가져온거확인 === > ', usageList.value);
    } catch (error) {
        console.log('redis가져오던중 error', error);
    }
};

const parseCouponName = (data) => {
    const result = {};
    Object.keys(data).forEach((key) => {
        result[key] = decodeURIComponent(data[key].replace(/[\=\+]/g, ' '));
    });
    return result;
}

</script>


<style scoped>
/* 컨테이너 */
.container {
    margin: auto;
    padding: 0;
    max-width: 700px;
    background-color: #f8f9fa;
    border-radius: 15px;
}

/* 카드 스타일 */
.coupon-usage {
    border: 1px solid #dee2e6;
    border-radius: 15px;
    background-color: #fff;
    overflow: hidden;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

/* 카드 헤더 */
.card-header {
    background-color: #5da8f9;
    color: white;
    padding: 1rem;
    font-size: 1.25rem;
    font-weight: bold;
    /* text-align: center; */
}

/* 카드 본문 */
.card-body {
    padding: 1rem;
}

/* 테이블 스타일 */
.usage-table {
    width: 100%;
    border-collapse: collapse;
    font-size: 1rem;
    text-align: left;
}

.usage-table th,
.usage-table td {
    padding: 0.75rem;
    border: 1px solid #dee2e6;
}

.usage-table thead {
    background-color: #f1f1f1;
    font-weight: bold;
}

.usage-table tbody tr:hover {
    background-color: #f8f9fa;
}

/* 글꼴 및 배경색 */
.title {
    font-family: 'The Jamsil 3 Regular', sans-serif;
}

body {
    background-color: #f8f6e9;
    font-family: 'The Jamsil 3 Regular', sans-serif;
}
</style>