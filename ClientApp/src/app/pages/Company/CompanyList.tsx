import React from 'react';
import { BasicTable } from 'src/app/components/Table/BasicTable';
import axiosInstance from 'src/app/services/AxiosInstance';

const CompanyList: React.FC = () => {
  //ဒါကTableမှာပေါ်မယ့်Column ထည့်ပေးရုံပဲ
  //idက ထည့်ပေးရမယ် Edit Delete Detailအတွက်
  //id မပါရင် Edit Delete Detail အလုပ်မလုပ်
  const displayData = ['name', 'age', 'description', 'id'];
  //ဒါကခေါ်သုံးမယ့် API Urlမှာ api/ ရဲ့နောက်ကပါတဲ့ URLထည့်ရုံပဲ Parameterထည့်ရန်မလို
  const apiEndPoint = 'Certificate/GetCertificateApproveList';
  const fetch = (url: string) => {
    axiosInstance
      .get(url)
      .then((response) => {
        console.log(response.data);
        return response.data;
      })
      .catch((error) => {
        console.error(error);
      });
    return [
      { id: 1, name: 'John Doe', age: 25, description: 'Married' },
      { id: 2, name: 'Jane Smith', age: 30 },
      { id: 3, name: 'Bob Johnson', age: 35 },
      { id: 4, name: 'John Doe', age: 25 },
      { id: 5, name: 'Jane Smith', age: 30 },
      //{ id: 6, name: 'John Doe', age: 25, description: 'Married' },
      //{ id: 7, name: 'Jane Smith', age: 30 },
      //{ id: 8, name: 'Bob Johnson', age: 35 },
      //{ id: 9, name: 'John Doe', age: 25 },
      //{ id: 10, name: 'Jane Smith', age: 30 },
    ];
  };
  return (
    <BasicTable
      api={apiEndPoint}
      displayData={displayData}
      fetch={fetch}
    ></BasicTable>
  );
};

export default CompanyList;
