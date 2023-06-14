import { App } from 'vue';
import axios, { AxiosInstance } from 'axios';
import qs from 'qs';

export default class BaseClient {
  axiosClient: AxiosInstance;

  url: string;

  constructor(url = 'http://localhost') {
    this.url = `${url}${process.env.VITE_EXAMPLE_PATH ?? '/api'}`;
    this.axiosClient = axios.create({
      baseURL: this.url,
      paramsSerializer: {
        serialize: (params: any) =>
          qs.stringify(params, { arrayFormat: 'indices' }),
      },
    });
  }

  install(app: App) {
    // eslint-disable-next-line no-param-reassign
    app.config.globalProperties.$axios = this.axiosClient;
  }
}
