import { AxiosResponse } from 'axios';
import { CommonPageResult, CommonPagination } from '@example/common';
import BaseClient from '@/service/axios/baseClient';

export class ExampleClient extends BaseClient {
  constructor() {
    super(window.origin);
  }

  findUsers(
    commonPagination: CommonPagination,
  ): Promise<AxiosResponse<CommonPageResult>> {
    return this.axiosClient.get('/users', { params: commonPagination });
  }
}

export const exampleClient = new ExampleClient();
