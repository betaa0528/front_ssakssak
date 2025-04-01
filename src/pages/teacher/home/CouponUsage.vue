<template>
    <div class="container">
        <!-- 카드 섹션 -->
        <div class="coupon-usage card">
            <table class="usage-table">
                <thead>
                    <tr>
                        <th>학생 이름</th>
                        <th>쿠폰 이름</th>
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
}

/* 카드 스타일 */
.coupon-usage {
    border-radius: 15px;
    background-color: #fff;
    overflow: hidden;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
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