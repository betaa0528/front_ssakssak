import api from "@/api";
import { ref } from "vue";

const BASE_URL = "/api/student/stock";

const headers = { "Content-Type": "multipart/form-data" };

export default {
  async getNewsList() {
    const { data } = await api.get(`${BASE_URL}/news`);
    // console.log('NEWS LIST GET', data);
    return data;
  },

  async getChartData() {
    const { data } = await api.get(`${BASE_URL}/data`);
    console.log("getChartData", data);
    return data;
  },

  async updateNewsStatus(newsId) {
    try {
      const response = await api.put(`${BASE_URL}/news/${newsId}/status`, {
        status: "n",
      });
      console.log("News status updated:", response.data);
      return response.data;
    } catch (error) {
      console.error("Error updating news status:", error);
      throw error;
    }
  },

  async getMyStock() {
    const { data } = await api.get(`${BASE_URL}/my-stock`);
    // console.log("get my stock: ", data);
    return data;
  },

  async buyStock(stockRequest) {
    try {
      const response = await api.post(`${BASE_URL}/buy`, stockRequest);
      return response;
    } catch (error) {
      if (error.response && error.response.data) {
        errorMsg = error.response.data;
      } else {
        errorMsg = "알 수 없는 오류가 발생했습니다!";
      }
    }
  },

  async sellStock(stockRequest) {
    console.log(stockRequest);
    try {
      const response = await api.post(`${BASE_URL}/sell`, stockRequest);
      return response;
    } catch (error) {
      if (error.response && error.response.data) {
        errorMsg.value = error.response.data;
      } else {
        errorMsg.value = "알 수 없는 오류가 발생했습니다!";
      }
    }
  },

  async getStudentProfile() {
    try {
      const response = await api.get(`/student/profile/${stdId}`);
      return response;
    } catch (error) {
      if (error.response && error.response.data) {
        errorMsg.value = error.response.data;
      } else {
        errorMsg.value = "알 수 없는 오류가 발생했습니다!";
      }
    }
  },

  async getOrderBook() {
    try {
      const response = await api.get(`${BASE_URL}/orderBook`);
      return response;
    } catch (error) {
      console.error("Error updating news status:", error);
      throw error;
    }
  },
};
