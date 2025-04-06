<template>
    <div class="container justify-content-center mb-5">
        <div class="shadow card p-4">
            <div class="ps-2 pt-2 mb-3">
                <h3 class="news-title">싹싹 주식 뉴스</h3>
            </div>
            <div class="news-list ps-3">
                <div v-for="(news, idx) in newsList" :key="news.newsId" class="news-item mb-3 p-2">
                    <div class="d-flex align-items-center justify-content-between">
                        <span class="fs-5 fw-semibold d-block news-title-text" @click="openNewsModal(news)">
                            {{ news.title }}
                        </span>
                        <span class="news-date">{{ news.newsDate }}</span>
                    </div>
                    <span class="d-block news-content">{{ news.content }}</span>
                </div>
            </div>
        </div>

        <!-- 뉴스 모달 -->
        <div class="modal-backdrop" v-if="showModal" @click="closeModal"></div>
        <div class="news-modal" v-if="showModal">
            <div class="modal-content">
                <div class="modal-header">
                    <h4 class="modal-title">{{ selectedNews.title }}</h4>
                    <button type="button" class="btn-close" @click="closeModal"></button>
                </div>
                <div class="modal-body">
                    <div class="news-date-modal mb-2">{{ selectedNews.newsDate }}</div>
                    <p class="news-content-full">{{ selectedNews.content }}</p>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-primary" @click="closeModal">닫기</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import api from '@/api/studentStockApi';
import { ref } from 'vue'

const selectedDay = ref(0) // 기본적으로 첫 번째 날짜 선택
const newsList = ref([]);
const showModal = ref(false);
const selectedNews = ref({});

const getNewsList = async () => {
    newsList.value = await api.getNewsList();
};

getNewsList();

const selectDay = (index) => {
    selectedDay.value = index
}

const openNewsModal = (news) => {
    selectedNews.value = news;
    showModal.value = true;
}

const closeModal = () => {
    showModal.value = false;
    document.body.style.overflow = ''; // 모달 닫힐 때 배경 스크롤 복원
}
</script>

<style scoped>
.container {
    height: 400px;
}

.card {
    height: 100%;
    border-radius: 12px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1) !important;
}

.news-title {
    color: #00A3FF;
    font-weight: 600;
    border-bottom: 2px solid #00A3FF;
    padding-bottom: 8px;
    display: inline-block;
}

.news-list {
    height: calc(100% - 60px);
    width: 100%;
    overflow-y: auto;
    overflow-x: hidden;
    padding-right: 10px;
}

.news-item {
    border-bottom: 1px solid #eee;
    transition: all 0.2s ease;
    border-radius: 8px;
}

.news-item:hover {
    background-color: rgba(0, 163, 255, 0.05);
}

.news-title-text {
    cursor: pointer;
    color: #333;
    transition: color 0.2s ease;
    width: 70%;
}

.news-title-text:hover {
    color: #00A3FF;
}

.news-date {
    font-size: 0.8rem;
    color: #888;
}

.news-content {
    width: 90%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    color: #666;
    font-size: 0.9rem;
    margin-top: 4px;
}

.news-list::-webkit-scrollbar {
    width: 6px;
}

.news-list::-webkit-scrollbar-thumb {
    background: rgba(184, 184, 184, 0.6);
    border-radius: 10px;
}

.news-list::-webkit-scrollbar-track {
    background: rgba(219, 219, 219, 0.1);
    border-radius: 10px;
}

/* 모달 스타일 */
.modal-backdrop {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 1000;
}

.news-modal {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 1001;
    width: 90%;
    max-width: 600px;
}

.modal-content {
    background-color: white;
    border-radius: 12px;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
    overflow: hidden;
}

.modal-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 16px 20px;
    border-bottom: 1px solid #eee;
    background-color: #f8f9fa;
}

.modal-title {
    margin: 0;
    color: #00A3FF;
    font-weight: 600;
}

.modal-body {
    padding: 20px;
    max-height: 70vh;
    overflow-y: auto;
}

.news-date-modal {
    color: #888;
    font-size: 0.9rem;
}

.news-content-full {
    line-height: 1.6;
    color: #333;
    white-space: pre-line;
}

.modal-footer {
    padding: 12px 20px;
    display: flex;
    justify-content: flex-end;
    border-top: 1px solid #eee;
}

.btn-primary {
    background-color: #00A3FF;
    border-color: #00A3FF;
    transition: all 0.2s ease;
}

.btn-primary:hover {
    background-color: #0090e0;
    border-color: #0090e0;
}

.btn-active-primary {
    color: #00A3FF;
    border-color: #00A3FF;
}

.btn-active-primary.active {
    color: white;
    background-color: #00A3FF;
}
</style>