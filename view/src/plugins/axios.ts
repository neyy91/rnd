import axios  from "axios";

const apiClient = axios.create({
    baseURL: "https://rnd-h9h2.onrender.com/",
    headers: {
        "Content-type": "application/json",
    },
});

export default apiClient;