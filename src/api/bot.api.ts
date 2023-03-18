import { api } from './index';

export const sendDataToBot = async (text: string, query_id: string) => {
  return await api.post('bot', { json: { text, query_id } }).json();
};
