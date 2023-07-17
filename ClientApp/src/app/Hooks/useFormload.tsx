import { FormInstance } from 'antd';
import React, { useCallback, useEffect, useState } from 'react';
import { GetSingle } from '../services/BasicHttpServices';

const useFormLoad = (id: string, action: string, url: string) => {
  const [loading, setLoading] = useState(true);
  const formRef = React.useRef<FormInstance>(null);
  const onLoad = useCallback(() => {
    if (action !== 'New') {
      GetSingle(url + '/' + id).then((x) => {
        formRef.current?.setFieldsValue(x);
        setLoading(false);
      });
    }
  }, [action, id, url]);
  useEffect(() => onLoad(), [onLoad]);
  return { formRef, loading };
};
export default useFormLoad;
