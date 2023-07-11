import { useEffect, useState } from 'react';
import './style.css';
import NameConvert from 'src/app/services/NameConvert';
import TableAction from '../TableAction/TableAction';
//ဒီနေရမှာ Ant Designက Table သုံးလဲရတယ် Depedencyနဲနိုင်သမျှနဲအောင် လုပ်သာအကောင်းဆုံးပဲ
//Fetch လုပ်တာလဲ ပြချင်တဲ့ Column ကို Display Dataထဲထည့်ပေးရုံပဲ
//Fetch ကထွက်လာတဲ့ Databindingကလဲ အဆင်ပြေအောင် Componentအပြင်ပဲထုတ်ထားတယ်

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type TableFunctionType = (api: string) => any[];
interface PropsType {
  displayData: string[];
  api: string;
  fetch: TableFunctionType;
}

export const BasicTable: React.FC<PropsType> = ({
  displayData,
  api,
  fetch,
}) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const intialValue: any[] = [];
  const [sortColumn, setSortColumn] = useState(displayData[0]);
  const [sortDirection, setSortDirection] = useState('asc');

  const [filterColumn, setFilterColumn] = useState('');
  const [filterQuery, setFilterQuery] = useState('');

  const [searchColumn, setSearchColumn] = useState('');
  const [searchValue, setSearchValue] = useState('');

  const [pageIndex, setPageIndex] = useState('0');
  const [pageSize, setPageSize] = useState('5');
  const [data, setData] = useState(intialValue);

  const handleSort = (column: string) => {
    setSortColumn(column);
    setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
  };

  //ဒီထဲကParameterက Dotnet Core ထဲကPagination Getနဲ့ညှိပေးထားတာ
  //တကယ်လို့ပြင်ချင်ရင် Parameter တွေပြင်သုံးပေါ့
  useEffect(() => {
    let temp = `${api}?
    pageIndex=${pageIndex}
    &pageSize=${pageSize}&
    sortColumn=${sortColumn}&
    sortOrder=${sortDirection}`;
    if (filterQuery !== '' && filterColumn !== '') {
      temp =
        temp +
        `filterColumn=${filterColumn}&
        filterQuery=${filterQuery}`;
    }
    setData(fetch(temp));
  }, [
    sortColumn,
    sortDirection,
    pageSize,
    pageIndex,
    filterColumn,
    filterQuery,
    api,
    fetch,
  ]);

  return (
    <>
      <div className="form-container">
        <select onChange={(e) => setSearchColumn(e.target.value)}>
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
      </div>
      <div className="table-container">
        <table>
          <thead>
            <tr>
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
            {data.map((row, index) => {
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
        <select onChange={(e) => setPageSize(e.target.value)}>
          <option value="5">5 / Page</option>
          <option value="10">10 / Page</option>
          <option value="100">100 / Page</option>
          <option value="1000">1000 / Page</option>
        </select>

        <button>&laquo;</button>
        <button onClick={(e) => setPageIndex((+pageIndex + 1).toString())}>
          Prev
        </button>
        <button onClick={(e) => setPageIndex((+pageIndex + 1).toString())}>
          Next
        </button>
        <button>&raquo;</button>
      </div>
    </>
  );
};
