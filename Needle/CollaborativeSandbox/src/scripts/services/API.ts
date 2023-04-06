import axios, {
  AxiosHeaders,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  AxiosError,
} from "axios";
//import jwt from "jsonwebtoken";

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

    const stream: EventStream = {
      image: response.data.stream.image,
      id: response.data.stream.id,
      title: response.data.stream.title,
      price: response.data.stream.price,
      streamKey: response.data.stream.streamKey,
      playbackId: response.data.stream.playbackId,
      status: response.data.stream.status,
      is360: response.data.stream.is360,
      createdAt: response.data.stream.createdAt,
      updatedAt: response.data.stream.updatedAt,
      UserId: response.data.stream.UserId,
      CategoryId: response.data.stream.CategoryId,
      User: response.data.stream.User,
      playbackLink: `${this.videoSrc}/${response.data.stream.playbackId}${this.extension}`,
    };

    return stream;
  }
}
