import { useCallback } from 'react';
import { Post, Put, Delete } from '../services/BasicHttpServices';

const useFormActions = (id: string, action: string, APIURL: string) => {
  const onFinish = useCallback(
    (values: unknown) => {
      if (action === 'New') {
        Post(APIURL, values);
      } else if (action === 'Edit') {
        Put(APIURL, id, values);
      } else if (action === 'Delete') {
        Delete(APIURL, id);
      } else if (action === 'Detail') {
        console.log();
      }
    },
    [APIURL, action, id]
  );
  return { onFinish };
};
export default useFormActions;
