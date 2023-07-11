import { Link, useLocation } from 'react-router-dom';
type Props = {
  id: string;
};

const TableAction = ({ id }: Props) => {
  const location = useLocation();
  const temp = [...location.pathname.split('/')];
  const link = '/' + temp[temp.length - 2];
  return (
    <td key={'action'}>
      <Link to={link + '/Edit/' + id}>
        <span>Edit</span>
      </Link>
      {'   '}|{'   '}
      <Link to={link + '/Delete/' + id}>
        <span>Delete</span>
      </Link>
      {'   '}|{'   '}
      <Link to={link + '/Detail/' + id}>
        <span>Detail</span>
      </Link>
    </td>
  );
};

export default TableAction;
