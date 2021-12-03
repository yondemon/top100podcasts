import axios from "axios";
import { setupCache } from "axios-cache-adapter";

const cache = setupCache({
  maxAge: 24 * 60 * 60 * 1000,
  exclude: {
    query: false
  },
});

const httpCommon = axios.create({
  headers: {
    "Content-type": "application/json"
  },
  adapter: cache.adapter,
});

export default httpCommon;