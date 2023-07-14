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

export const Post = async (url: string, data: unknown): Promise<AnyObject> => {
  return await axiosInstance
    .post(url, data)
    .then((response) => {
      const responseData: AnyObject = JSON.parse(JSON.stringify(response.data));
      return responseData;
    })
    .catch((error) => {
      throw error;
    });
};

export const Put = async (
  url: string,
  id: string,
  data: unknown
): Promise<AnyObject> => {
  const jsonObject = data as { [key: string]: unknown };
  jsonObject.id = id;
  return await axiosInstance
    .put(url + '/' + id, jsonObject)
    .then((response) => {
      const responseData: AnyObject = JSON.parse(JSON.stringify(response.data));
      return responseData;
    })
    .catch((error) => {
      throw error;
    });
};

export const Delete = async (url: string, id: string): Promise<AnyObject> => {
  return await axiosInstance
    .delete(url + '/' + id)
    .then((response) => {
      const responseData: AnyObject = JSON.parse(JSON.stringify(response.data));
      return responseData;
    })
    .catch((error) => {
      throw error;
    });
};
