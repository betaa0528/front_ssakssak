import api from "@/api"; // Axios 설정된 모듈 가져오기

const BASE_URL = "/api/student/profile";

export default {
  async getStudentProfile() {
    try {
      const { data } = await api.get(`${BASE_URL}/${stdId}`);
      return data;
    } catch (error) {
      console.error("Failed to fetch student profile from API:", error);
      throw error; // 에러 발생 시 throw
    }
  },

  async getTransactionList(stdId, type) {
    try {
      const { data } = await api.get(`${BASE_URL}/${stdId}/transactions`, {
        params: type,
      });
      return data;
    } catch (error) {
      console.error("Failed to fetch student profile from API:", error);
      throw error;
    }
  },
  async getFinanceProfile(stdId) {
    try {
      const { data } = await api.get(`${BASE_URL}/${stdId}/finance-profile`);
      return data;
    } catch (error) {
      console.error("Failed to fetch student profile from API:", error);
      throw error;
    }
  }
};
