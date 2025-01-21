import api from "@/api";

const BASE_URL = "/api/student/coupon";

export default {
  async getCouponlist() {
    try {
      const { data } = await api.get(`${BASE_URL}/list`);
      //   console.log("Couponlist info GET", data);
      return data;
    } catch (error) {
      console.error("Failed to fetch coupon list:", error);
      throw error;
    }
  },

  async getCouponById(cpId) {
    try {
      const { data } = await api.get(`${BASE_URL}/list/${cpId}`);
      //   console.log("Coupon info GET by ID", data);
      return data;
    } catch (error) {
      console.error(`Failed to fetch coupon with id ${cpId}:`, error);
      throw error;
    }
  },

  async buyCoupon(request) {
    try {
      console.log("쿠폰 구매 정보 ", request);
      const response = await api.post(`${BASE_URL}/buy`, request.value);
      return response;
    } catch (error) {
      console.error("Failed to buy coupon", error);
      throw error;
    }
  },

  async getStudentCoupons(stdId) {
    const { data } = await api.get(`${BASE_URL}/mycp`);
    console.log("Student coupons GET", data);
    return data;
  },

  async usageCoupon(cpName) {
    console.log(cpName);
    const response = await api.post(`${BASE_URL}/use`, cpName);
    return response;
  },
};
