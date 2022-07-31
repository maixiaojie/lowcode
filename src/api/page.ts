import { BASE_URL } from 'src/utils/constants';
import { default as API } from '../utils/request';
import { Page } from '../types/schema';

export const savePageInfo = (data: Page) => {
    return API.post(`${BASE_URL}/api/v1/page/create`, data);
}

export const getPageList = () => {
    return API.get(`${BASE_URL}/api/v1/page/list`);
}