import api from "@/api";

const BASE_URL = "/api/teacher/store";
const headers = { "Content-Type": "multipart/form-data" };

export default {
  async getCouponlist() {
    try {
      const { data } = await api.get(`${BASE_URL}/coupon-list`);
      return data;
    } catch (error) {
      console.error("Failed to fetch coupon list:", error);
      throw error;
    }
  },

  // 쿠폰 등록 API 호출
  async applyCoupon(storeDTO, file) {
    try {
      // FormData 객체 생성
      const formData = new FormData();

      // storeDTO를 JSON 문자열로 변환하여 추가
      formData.append("storeDTO", JSON.stringify(storeDTO));

      // 파일 추가
      formData.append("file", file);

      // POST 요청 보내기 (multipart/form-data로 전송됨)
      const { data } = await api.post(`${BASE_URL}/coupon-apply`, formData);

      return data; // 서버 응답 데이터 반환
    } catch (error) {
      console.error("Failed to apply coupon:", error);
      throw error;
    }
  },

  async getTodayUsageCoupon() {
    const data = await api.get(`/api/teacher/home/usage`);
    return data;
  },
};
