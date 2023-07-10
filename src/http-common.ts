import axios from "axios";

const httpCommon = axios.create({
  headers: {
    "Content-type": "application/json"
  },
});

export default httpCommon;