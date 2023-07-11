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
  const fetch = async (url: string): Promise<object[]> => {
    return await axiosInstance
      .get(url)
      .then((response) => {
        //return response.data;
        return [
          {
            id: +(+Math.random() * 10) + 1,
            name: 'John Doe',
            age: +(+Math.random() * 10) + 1,
            description: 'Married',
          },
          {
            id: +(+Math.random() * 10) + 1,
            name: 'Jane Smith',
            age: +(+Math.random() * 10) + 1,
          },
          {
            id: +(+Math.random() * 10) + 1,
            name: 'Bob Johnson',
            age: 20,
          },
          {
            id: +(+Math.random() * 10) + 1,
            name: 'John Doe',
            age: +(+Math.random() * 10) + 1,
          },
          {
            id: +(+Math.random() * 10) + 1,
            name: 'Jane Smith',
            age: +(+Math.random() * 10) + 1,
          },
          {
            id: +(+Math.random() * 10) + 1,
            name: 'John Doe',
            age: +(+Math.random() * 10) + 1,
            description: 'Married',
          },
          {
            id: +(+Math.random() * 10) + 1,
            name: 'Jane Smith',
            age: +(+Math.random() * 10) + 1,
          },
          {
            id: +(+Math.random() * 10) + 1,
            name: 'Bob Johnson',
            age: +(+Math.random() * 10) + 1,
          },
          {
            id: +(+Math.random() * 10) + 1,
            name: 'John Doe',
            age: +(+Math.random() * 10) + 1,
          },
          {
            id: +(+Math.random() * 10) + 1,
            name: 'Jane Smith',
            age: +(+Math.random() * 10) + 1,
          },
        ];
      })
      .catch((error) => {
        return [
          {
            id: +(+Math.random() * 10) + 1,
            name: 'John Doe',
            age: +(+Math.random() * 10) + 1,
            description: 'Married',
          },
          {
            id: +(+Math.random() * 10) + 1,
            name: 'Jane Smith',
            age: +(+Math.random() * 10) + 1,
          },
          {
            id: +(+Math.random() * 10) + 1,
            name: 'Bob Johnson',
            age: 20,
          },
          {
            id: +(+Math.random() * 10) + 1,
            name: 'John Doe',
            age: +(+Math.random() * 10) + 1,
          },
          {
            id: +(+Math.random() * 10) + 1,
            name: 'Jane Smith',
            age: +(+Math.random() * 10) + 1,
          },
          {
            id: +(+Math.random() * 10) + 1,
            name: 'John Doe',
            age: +(+Math.random() * 10) + 1,
            description: 'Married',
          },
          {
            id: +(+Math.random() * 10) + 1,
            name: 'Jane Smith',
            age: +(+Math.random() * 10) + 1,
          },
          {
            id: +(+Math.random() * 10) + 1,
            name: 'Bob Johnson',
            age: +(+Math.random() * 10) + 1,
          },
          {
            id: +(+Math.random() * 10) + 1,
            name: 'John Doe',
            age: +(+Math.random() * 10) + 1,
          },
          {
            id: +(+Math.random() * 10) + 1,
            name: 'Jane Smith',
            age: +(+Math.random() * 10) + 1,
          },
        ];
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

export default CompanyList;
