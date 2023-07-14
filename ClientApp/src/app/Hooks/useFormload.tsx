import { FormInstance } from 'antd';
import { url } from 'inspector';
import React, { useMemo } from 'react';
import { GetSingle } from '../services/BasicHttpServices';
import useFormhelper from './useFormhelper';

export const useFormload = (url: string) => {
  const { readOnly, id, action } = useFormhelper();
  const formRef = React.useRef<FormInstance>(null);
  useMemo(() => {
    action !== 'New' ??
      GetSingle(url + '/' + id).then((x) => {
        formRef.current?.setFieldsValue(x);
      });
  }, [url, action, id]);

  return { readOnly, id, action, formRef };
};
