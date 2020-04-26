import axios from "axios";

const apiClient = axios.create({
  baseURL: `https://fy2imwzr1f.execute-api.us-west-2.amazonaws.com/dev/oil-prices`,
  withCredentials: false,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json"
  }
});

export default {
  getFuels() {
    return apiClient.get();
  }
};
