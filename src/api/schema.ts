import { BASE_URL } from 'src/utils/constants';
import { default as API } from '../utils/request';
import { SchemaObj } from '../types/schema';

export const savePageSchema = (data: SchemaObj) => {
    return API.post(`${BASE_URL}/api/v1/schema/upload`, data);
}