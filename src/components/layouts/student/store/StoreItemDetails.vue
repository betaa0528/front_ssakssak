<script setup>
import { computed, ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import api from '@/api/studentStoreApi';

const quantity = ref(1);
const price = ref(0);
const isShow = ref(false);
const confirmModal = ref(false);
const purchaseCompleteModal = ref(false);
const purchaseFailedModal = ref(false);
const couponDetails = ref({});
const router = useRouter();

const props = defineProps({
    couponId: {
        type: Number,
        required: true
    }, coupon: {
        type: Object,
        required: true
    }
});

const selectCpId = ref('');

const getCouponDetails = async () => {
    if (!props.couponId) {
        console.error('Invalid coupon ID:', props.couponId);
        return;
    }

    try {
        const response = await api.getCouponById(props.couponId);
        couponDetails.value = response;
        price.value = couponDetails.value.cpPrice;
        // console.log('Coupon Details:', couponDetails.value);
    } catch (error) {
        console.error('Failed to fetch coupon details:', error);
    }
};

const showModal = () => {
    isShow.value = !isShow.value;
};

const openConfirmModal = () => {
    confirmModal.value = true;
};

const closeConfirmModal = () => {
    confirmModal.value = false;
};

const closePurchaseCompleteModal = () => {
    emit('close');
    router.go(0);
    purchaseCompleteModal.value = false;
};

const closePurchaseFailedModal = () => {
    emit('close');
    purchaseFailedModal.value = false;
}

const minusQuantity = () => {
    if (quantity.value > 1) {
        quantity.value--;
    }
};

const plusQuantity = () => {
    quantity.value++;
};

const totalPrice = computed(() => {
    return quantity.value * price.value;
});

const emit = defineEmits(['close', 'couponBuy']);

const close = () => {
    emit('close');
};

const buyRequest = ref({
    cpId: props.couponId,
    quantity: '',
    price: props.coupon.cpPrice,
});

const errorMsg = ref('');

const confirmBuy = async () => {
    try {
        buyRequest.value.quantity = quantity.value;
        const response = await api.buyCoupon(buyRequest);
        console.log("buy==============================> ", response);
        if (response && response.status === 200) {
            props.coupon.cpQuantity -= quantity.value;
            emit('couponBuy', { couponId: props.couponId, coupon: props.coupon });
            closeConfirmModal();
            purchaseCompleteModal.value = true;
        }
    } catch (error) {
        console.log(error.response);
        errorMsg.value = error.response.data;
        console.error('쿠폰 사기 실패', error);
        closeConfirmModal();
        purchaseFailedModal.value = true;
    }

};



onMounted(() => {
    getCouponDetails();
});
</script>

<template>
    <div class="modal-wrap">
        <div class="modal-container shadow-lg p-2">
            <div class="row card-body align-items-start p-2">
                <div class="col-4 mt-2">
                    <div class="imgBox">
                        <img src="@/assets/images/coupon.png" alt="쿠폰 이미지">
                    </div>
                </div>

                <div class="col-8">
                    <div class="d-flex justify-content-between">
                        <span class="d-block mt-2 text-muted fs-6">쿠폰</span>
                        <button class="btn btn-outline-secondary text-center" @click="close"><i
                                class="bi bi-x-lg"></i></button>
                    </div>
                    <div>
                        <span class="d-block fs-5 fw-bold">{{ couponDetails.cpName }}</span>
                    </div>
                    <div class="text-end mb-2">
                        <span class="fs-5 fw-semibold primary">{{ couponDetails.cpQuantity }}개 / {{
                            couponDetails.cpPrice }} 씨드</span>
                    </div>
                    <div>
                        {{ couponDetails.cpContent }}
                    </div>
                    <div class="mb-4"></div>

                    <div class="mb-3 d-flex justify-content-between">
                        <div class="d-flex">
                            <button class="button cyan small fs-5" @click="minusQuantity">-</button>
                            <input type="text" class="form-control text-center fs-6 fw-semibold" v-model="quantity">
                            <button class="button cyan small fs-5" :disabled="quantity >= couponDetails.cpQuantity"
                                @click="plusQuantity">+</button>
                        </div>
                        <div class="fs-4 fw-semibold text-danger">
                            <span>{{ totalPrice }} 씨드</span>
                        </div>
                    </div>
                    <div class="text-end">
                        <button class="btn btn-primary" @click="openConfirmModal">구매하기</button>
                    </div>

                </div>
            </div>
        </div>
    </div>

    <div v-if="confirmModal" class="confirm-modal">
        <div class="confirm-container shadow-lg p-4">
            <p class="fs-5 fw-semibold">정말로 구매하시겠습니까?</p>
            <div class="d-flex justify-content-center mt-3" style="gap: 10px;">
                <button class="btn btn-primary" @click="confirmBuy">구매</button>
                <button class="btn btn-secondary" @click="closeConfirmModal">취소</button>
            </div>
        </div>
    </div>

    <div v-if="purchaseCompleteModal" class="confirm-modal">
        <div class="confirm-container shadow-lg p-4">
            <p class="fs-5 fw-semibold">구매가 완료되었습니다!</p>
            <div class="d-flex justify-content-center mt-3">
                <button class="btn btn-primary" @click="closePurchaseCompleteModal">확인</button>
            </div>
        </div>
    </div>

    <div v-if="purchaseFailedModal" class="confirm-modal">
        <div class="confirm-container shadow-lg p-4">
            <p class="fs-5 fw-semibold">{{ errorMsg }}</p>
            <div class="d-flex justify-content-center mt-3">
                <button class="btn btn-primary" @click="closePurchaseFailedModal">확인</button>
            </div>
        </div>
    </div>

</template>

<style scoped>
.modal-wrap {
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.4);
    z-index: 10;
}

.modal-container {
    position: relative;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 700px;
    background: #fff;
    border-radius: 10px;
    padding: 20px;
    box-sizing: border-box;
}

.confirm-modal {
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.4);
    z-index: 11;
    display: flex;
    justify-content: center;
    align-items: center;
}

.confirm-container {
    background: #fff;
    padding: 20px;
    border-radius: 10px;
    text-align: center;
    width: 400px;
}

.imgBox {
    width: 100%;
    height: 100%;
    border-radius: 12px;
    overflow: hidden;
}

.imgBox img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.form-control {
    border-radius: 5px;
    width: 80px;
    height: 40px;
}

.button {
    position: relative;
    border: 0;
    width: 40px;
    height: 35px;
    display: inline-block;
    text-align: center;
    color: white;
    border-radius: 5px;
}

.button:active {
    top: 4px;
}

.cyan {
    background-color: #7fccde;
    box-shadow: 0px 4px 0px #73B9C9;
}

.cyan:active {
    box-shadow: 0 0 #73B9C9;
    background-color: #70B4C4;
}

.btn-primary {
    background-color: #00A3FF;
    border-color: #00A3FF;
}

.btn-secondary {
    color: #fff;
    background-color: #EF5858;
    border-color: #EF5858;
}
</style>
