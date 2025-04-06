import api from "@/api";

const BASE_URL = "/api/teacher";

export default {
  async getSavingList() {
    const { data } = await api.get(`${BASE_URL}/bank/saving-list`);
    console.log(`요청 확인 =====================> ${BASE_URL}/bank/saving-list`);
    return data;
  },
  async addSaving(request) {
    const response = await api.post(`${BASE_URL}/bank/saving`, request);
    console.log(response);
  },
  async deleteSaving(id) {
    const response = await api.post(`${BASE_URL}/bank/saving/${id}`);
    console.log(response);
  },
  async getDepositList() {
    const { data } = await api.get(`${BASE_URL}/bank/deposit-list`);
    return data;
  },
  async deleteDeposit(id) {
    const response = await api.post(`${BASE_URL}/bank/deposit/${id}`);
    console.log(response);
  },
  async addDeposit(request) {
    const response = await api.post(`${BASE_URL}/bank/deposit`, request);
  },
};
