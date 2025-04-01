import api from "@/api";

const BASE_URL = "/api/alarm";

const headers = { "Content-Type": "multipart/form-data" };

export default {
  async getAlarmHistory(username) {
    const { data } = await api.get(`${BASE_URL}/history/${username}`);
    // console.log(data);
    return data;
  },

  async postCheckAlarm(id) {
    const response = await api.post(`${BASE_URL}/checked/${id}`);
    return response;
  },

  //   async createEventSource(username) {
  //     const response = new EventSource(`${BASE_URL}/subscribe/${username}`);
  //     return response;
  //   },
};
