import api from "@/api";
import { ref } from "vue";

const BASE_URL = "/api/student/bank";

const headers = { "Content-Type": "multipart/form-data" };

export default {
  async getDepositAccount() {
    try {
      const { data } = await api.get(`${BASE_URL}/deposit-account`);
      return data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  },
  async subscribeDeposit(request) {
    try {
      const response = await api.post(`${BASE_URL}/deposit-account`, request);
      return response;
    } catch (error) {
      console.error(error);
      throw error;
    }
  },
  async getSavingAccount() {
    try {
      const { data } = await api.get(`${BASE_URL}/saving-account`);
      return data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  },
  async subscribeSaving(request) {
    try {
      console.log("saving Account DTO", request);
      const response = await api.post(`${BASE_URL}/product`, request);
      return response;
    } catch (error) {
      console.error(error);
      throw error;
    }
  },
  async cancelDeposit(id) {
    try {
      const response = await api.post(`${BASE_URL}/deposit/cancel/${id}`);
      console.log(response);
    } catch (error) {
      console.error(error);
      throw error;
    }
  },
  async cancelSaving(id) {
    try {
      const response = await api.post(`${BASE_URL}/saving/cancel/${id}`);
      console.log(response);
    } catch (error) {
      console.error(error);
      throw error;
    }
  },
};
