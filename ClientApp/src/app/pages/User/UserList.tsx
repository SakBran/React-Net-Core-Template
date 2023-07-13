import { Spin } from 'antd';
import React, { useMemo, useState } from 'react';
import { PaginationType } from 'src/Models/PaginationType';
import { BasicTable } from 'src/app/components/Table/BasicTable';
import axiosInstance from 'src/app/services/AxiosInstance';

const UserList: React.FC = () => {
  //ဒါကTableမှာပေါ်မယ့်Column ထည့်ပေးရုံပဲ
  //idက ထည့်ပေးရမယ် Edit Delete Detailအတွက်
  //id မပါရင် Edit Delete Detail အလုပ်မလုပ်
  const displayData = useMemo(
    () => ['name', 'password', 'permission', 'id'],
    []
  );
  //ဒါကခေါ်သုံးမယ့် API Urlမှာ api/ ရဲ့နောက်ကပါတဲ့ URLထည့်ရုံပဲ Parameterထည့်ရန်မလို
  const apiEndPoint = useMemo(() => 'User', []);
  const [loading, setLoading] = useState(false);
  const fetch = async (url: string): Promise<PaginationType> => {
    setLoading(true);
    return await axiosInstance
      .get(url)
      .then((response) => {
        const responseData: PaginationType = JSON.parse(
          JSON.stringify(response.data)
        );
        setLoading(false);
        return responseData;
      })
      .catch((error) => {
        setLoading(false);
        throw error;
      });
  };
  return (
    <BasicTable
      api={apiEndPoint}
      displayData={displayData}
      fetch={fetch}
      loading={loading}
    ></BasicTable>
  );
};

export default UserList;
