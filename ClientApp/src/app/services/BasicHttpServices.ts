import { PaginationType } from 'src/Models/PaginationType';
import axiosInstance from './AxiosInstance';
import { AnyObject } from 'src/Models/AnyObject';

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

export const GetSingle = async (url: string): Promise<AnyObject> => {
  return await axiosInstance
    .get(url)
    .then((response) => {
      const responseData: AnyObject = JSON.parse(JSON.stringify(response.data));
      return responseData;
    })
    .catch((error) => {
      throw error;
    });
};
