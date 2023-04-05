import axios, {
  AxiosHeaders,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  AxiosError,
} from "axios";
import jwt from "jsonwebtoken";

import { UserCredentials, LoginResponse } from "../interfaces/Login";
import { EventStream } from "../interfaces/Stream";

export default class API {
  private axiosInstance: AxiosInstance;
  private videoSrc: string = "https://stream.mux.com/";
  private extension: string = ".m3u8";

  constructor() {
    this.axiosInstance = axios.create({
      baseURL: "https://vu-backend-dev.herokuapp.com",
    });

    this.axiosInstance.interceptors.request.use(
      (config) => {
        const token = localStorage.getItem("token");
        if (token) {
          config.headers.Authorization = `${token}`;
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );
  }

  public async login(
    credentials: UserCredentials
  ): Promise<AxiosResponse<LoginResponse>> {
    const { email, password } = credentials;
    const data = { email, password };
    const response = await this.axiosInstance.post<LoginResponse>(
      "/api/auth/login",
      data
    );
    const token = response.headers.authorization;
    const userId = response.data.userId;

    console.log(
      `success:${response.data.success} - userId:${userId} - token:${token}`
    );

    localStorage.setItem("token", token);
    axios.defaults.headers.common["Authorization"] = token;

    return response;
  }

  public async getStream(id: string): Promise<EventStream> {
    const response = await this.axiosInstance.get(`/api/streams/status/${id}`);
    console.log(`Stream Found! StreamId: ${response.data.stream.id}`);
    return response.data;
  }
}
