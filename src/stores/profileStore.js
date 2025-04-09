import { defineStore } from "pinia";
import api from "@/api/studentProfileApi";

export const useProfileStore = defineStore("profile", {
  state: () => ({
    seedBalance: 0,
    savings: [],
    deposits: [],
    stock: [],
    transactionList: [],
  }),
  actions: {
    async fetchMyTransactions(stdId) {
      try {
        const res = await api.getTransactionList(stdId);
        return res;
      } catch (error) {
        console.error("Failed to fetch transactions:", error);
      }
    },
    async fetchFinanceProfile(stdId) {
      try {
        const res = await api.getFinanceProfile(stdId); // ← 백에서 통합 응답 받는 API
        console.log('store확은', res)
        this.seedBalance = res.seedBalance;
        this.savings = res.savings;
        this.deposits = res.deposits;
        this.stock = res.stocks;
        return res;
      } catch (error) {
        console.error("Failed to fetch finance profile:", error);
      }
    },
  },
  persist: true,
});
