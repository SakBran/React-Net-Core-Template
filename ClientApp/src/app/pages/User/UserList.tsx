import React from 'react';
import { PaginationType } from 'src/Models/PaginationType';
import { BasicTable } from 'src/app/components/Table/BasicTable';
import axiosInstance from 'src/app/services/AxiosInstance';

const UserList: React.FC = () => {
  //ဒါကTableမှာပေါ်မယ့်Column ထည့်ပေးရုံပဲ
  //idက ထည့်ပေးရမယ် Edit Delete Detailအတွက်
  //id မပါရင် Edit Delete Detail အလုပ်မလုပ်
  const displayData = ['name', 'password', 'permission', 'id'];
  //ဒါကခေါ်သုံးမယ့် API Urlမှာ api/ ရဲ့နောက်ကပါတဲ့ URLထည့်ရုံပဲ Parameterထည့်ရန်မလို
  const apiEndPoint = 'User';
  const fetch = async (url: string): Promise<PaginationType> => {
    return await axiosInstance
      .get(url)
      .then((response) => {
        const responseData: PaginationType = JSON.parse(
          JSON.stringify(response.data)
        );
        return responseData;
      })
      .catch((error) => {
        console.log(error);
        throw error;
      });
  };
  return (
    <BasicTable
      api={apiEndPoint}
      displayData={displayData}
      fetch={fetch}
    ></BasicTable>
  );
};

export default UserList;
