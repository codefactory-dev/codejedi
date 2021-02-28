import axios from "axios";

// For common config
axios.defaults.headers.post["Content-Type"] = "application/json";

const api = axios.create({
    baseURL: '/.netlify/functions/server/api'
});

export {
  api
};