import { useCallback, useState } from 'react';
import { Post, Put, Delete } from '../services/BasicHttpServices';

const useFormActions = (id: string, action: string, APIURL: string) => {
  const [writeLoading, setWriteLoading] = useState(false);

  const onFinish = useCallback(
    (values: unknown) => {
      setWriteLoading(true);
      if (action === 'New') {
        Post(APIURL, values)
          .then((x) => setWriteLoading(false))
          .catch((err) => setWriteLoading(false));
      } else if (action === 'Edit') {
        Put(APIURL, id, values)
          .then((x) => setWriteLoading(false))
          .catch((err) => setWriteLoading(false));
      } else if (action === 'Delete') {
        Delete(APIURL, id)
          .then((x) => setWriteLoading(false))
          .catch((err) => setWriteLoading(false));
      } else if (action === 'Detail') {
        console.log();
        setWriteLoading(false);
      }
    },
    [APIURL, action, id]
  );
  return { onFinish, writeLoading };
};
export default useFormActions;
