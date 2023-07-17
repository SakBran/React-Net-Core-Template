import { useEffect, useState } from 'react';
import './style.css';
import NameConvert from 'src/app/services/NameConvert';
import TableAction from '../TableAction/TableAction';
import { Button, Input, Pagination, Select, Space, Spin } from 'antd';
import { PaginationType } from 'src/Models/PaginationType';
//ဒီနေရမှာ Ant Designက Table သုံးလဲရတယ် Depedencyနဲနိုင်သမျှနဲအောင် လုပ်သာအကောင်းဆုံးပဲ
//Fetch လုပ်တာလဲ ပြချင်တဲ့ Column ကို Display Dataထဲထည့်ပေးရုံပဲ
//Fetch ကထွက်လာတဲ့ Databindingကလဲ အဆင်ပြေအောင် Componentအပြင်ပဲထုတ်ထားတယ်

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type TableFunctionType = (api: string) => Promise<PaginationType>;
interface PropsType {
  displayData: string[];
  api: string;
  fetch: (url: string) => Promise<PaginationType>;
}

export const BasicTable: React.FC<PropsType> = ({
  displayData,
  api,
  fetch,
}) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any

  const intialValue: PaginationType = {
    data: [],
    pageIndex: 0,
    pageSize: 0,
    totalCount: 0,
    totalPages: 0,
    hasPreviousPage: false,
    hasNextPage: false,
    sortColumn: '',
    sortOrder: '',
    filterColumn: '',
    filterQuery: '',
  };
  const [loading, setloading] = useState<boolean>(false);
  const [sortColumn, setSortColumn] = useState(displayData[0]);
  const [sortDirection, setSortDirection] = useState('asc');

  const [filterColumn, setFilterColumn] = useState(displayData[0]);
  const [filterQuery, setFilterQuery] = useState('');

  const [searchColumn, setSearchColumn] = useState('');
  const [searchValue, setSearchValue] = useState('');

  const [pageIndex, setPageIndex] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [data, setData] = useState<PaginationType>(intialValue);

  const [url, setUrl] = useState('');
  const handleSort = (column: string) => {
    setSortColumn(column);
    setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
  };

  //ဒီထဲကParameterက Dotnet Core ထဲကPagination Getနဲ့ညှိပေးထားတာ
  //တကယ်လို့ပြင်ချင်ရင် Parameter တွေပြင်သုံးပေါ့
  useEffect(() => {
    let temp = `${api}?pageIndex=${pageIndex}&pageSize=${pageSize}`;

    if (sortColumn !== '') {
      temp = temp + `&sortColumn=${sortColumn}&sortOrder=${sortDirection}`;
    }
    if (filterQuery !== '' && filterColumn !== '') {
      temp = temp + `&filterColumn=${filterColumn}&filterQuery=${filterQuery}`;
    }
    setUrl(temp);
  }, [
    sortColumn,
    sortDirection,
    pageSize,
    pageIndex,
    filterColumn,
    filterQuery,
    api,
    fetch,
    url,
  ]);

  useEffect(() => {
    setloading(true);
    const call = async () => {
      setData(await fetch(url));
    };
    call()
      .then(() => setloading(false))
      .catch(() => setloading(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [url, filterColumn, filterQuery]);

  const { Option } = Select;
  const selectBefore = (
    <Select
      defaultValue={displayData[0]}
      style={{ minWidth: '150px' }}
      onChange={(e) => setSearchColumn(e)}
    >
      {displayData.map((display: string) => {
        return (
          <Option key={display} value={display}>
            {NameConvert(display)}
          </Option>
        );
      })}
    </Select>
  );

  return (
    <Spin tip="Loading..." spinning={loading}>
      {/* <div className="form-container">
        <select onChange={(e) => setSearchColumn(e.target.value)}>
          <option key="searchKey" value="">
            Select One
          </option>
          {displayData.map((display: string) => {
            return (
              <option key={display} value={display}>
                {NameConvert(display)}
              </option>
            );
          })}
        </select>
        <input
          type="text"
          placeholder="......"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
        />
        <button
          onClick={() => {
            setFilterQuery(searchValue);
            setFilterColumn(searchColumn);
          }}
        >
          Search
        </button>
      </div> */}

      <Space.Compact block size="small" className="antdFormContainer">
        <Input
          addonBefore={selectBefore}
          onChange={(e) => setSearchValue(e.target.value)}
        />
        <Button
          onClick={() => {
            setFilterQuery(searchValue);
            setFilterColumn(searchColumn);
          }}
        >
          Search
        </Button>
      </Space.Compact>

      <div className="table-container">
        <table>
          <thead>
            <tr>
              <td>No</td>
              {displayData.map((display: string, i) => {
                if (display !== 'id') {
                  return (
                    <td key={i} onClick={() => handleSort(display)}>
                      {NameConvert(display)}
                      {sortColumn === display && (
                        <span>{sortDirection === 'asc' ? '▲' : '▼'}</span>
                      )}
                    </td>
                  );
                } else {
                  return '';
                }
              })}
              <td>Action</td>
            </tr>
          </thead>
          <tbody>
            {data.data.map((row, index) => {
              const data = displayData.map((display: string, i) => {
                if (display !== 'id') {
                  return <td key={i}>{row[display]}</td>;
                } else {
                  return '';
                }
              });

              const action = <TableAction id={row['id']} />;

              const template = (
                <tr key={row['id']}>
                  <td key={row['id'] + 'No'}>
                    {index + 1 + pageIndex * pageSize}
                  </td>
                  {data}
                  {action}
                </tr>
              );
              return template;
            })}
          </tbody>
        </table>
      </div>

      <div className="pagination">
        <Pagination
          size="small"
          showSizeChanger
          onShowSizeChange={(current) => setPageSize(current)}
          defaultCurrent={+pageIndex}
          total={data.totalCount}
          onChange={(page, pageSize) => {
            setPageIndex(page - 1);
            setPageSize(pageSize);
          }}
        />
      </div>
    </Spin>
  );
};
