import axios from "axios";
import { env } from "@/lib/env";

const apiClient = axios.create({
  baseURL: env.deploymentURL,
  timeout: 10_000,
  headers: { "Content-Type": "application/json" },
});

export default apiClient;
