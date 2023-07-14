import { PaginationType } from 'src/Models/PaginationType';
import axiosInstance from './AxiosInstance';

export const Get = async (url: string): Promise<PaginationType> => {
  return await axiosInstance
    .get(url)
    .then((response) => {
      const responseData: PaginationType = JSON.parse(
        JSON.stringify(response.data)
      );
      return responseData;
    })
    .catch((error) => {
      throw error;
    });
};
