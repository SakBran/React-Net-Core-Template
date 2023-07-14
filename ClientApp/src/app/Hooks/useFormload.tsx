import { FormInstance } from 'antd';
import React, { useCallback } from 'react';
import { GetSingle } from '../services/BasicHttpServices';

const useFormLoad = (id: string, action: string, url: string) => {
  const formRef = React.useRef<FormInstance>(null);
  const onLoad = useCallback(() => {
    if (action !== 'New') {
      GetSingle(url + '/' + id).then((x) => {
        formRef.current?.setFieldsValue(x);
      });
    }
  }, [action, id, url]);
  onLoad();
  return { formRef };
};
export default useFormLoad;
