import { useCallback, useEffect, useState } from 'react';
import { Post, Put, Delete } from '../services/BasicHttpServices';
import { Modal } from 'antd';

const useFormActions = (id: string, action: string, APIURL: string) => {
  const [writeLoading, setWriteLoading] = useState(false);
  const success = () => {
    Modal.success({
      title: 'Success',
      content: 'Operation is successfully compleed...',
    });
  };

  const error = () => {
    Modal.error({
      title: 'Error',
      content: 'Something went wrong...',
    });
  };

  const onFinish = useCallback(
    (values: unknown) => {
      setWriteLoading(true);
      if (action === 'New') {
        Post(APIURL, values)
          .then((x) => {
            setWriteLoading(false);
            success();
          })
          .catch((err) => {
            setWriteLoading(false);
            error();
          });
      } else if (action === 'Edit') {
        Put(APIURL, id, values)
          .then((x) => {
            setWriteLoading(false);
            success();
          })
          .catch((err) => {
            setWriteLoading(false);
            error();
          });
      } else if (action === 'Delete') {
        Delete(APIURL, id)
          .then((x) => {
            setWriteLoading(false);
            success();
          })
          .catch((err) => {
            setWriteLoading(false);
            error();
          });
      } else if (action === 'Detail') {
        setWriteLoading(false);
      }
    },
    [APIURL, action, id]
  );
  return { onFinish, writeLoading };
};
export default useFormActions;
