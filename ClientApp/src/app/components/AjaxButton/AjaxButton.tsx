import { LoadingOutlined } from '@ant-design/icons';
import { Button, Spin } from 'antd';
import React from 'react';
type Props = {
  writeLoading: boolean;
  action: string;
};
export const AjaxButton = ({ writeLoading, action }: Props) => {
  return (
    <>
      {action !== 'Detail' ?? (
        <>
          <Button type="primary" htmlType="submit">
            {writeLoading ? (
              <Spin
                tip="Loading..."
                spinning={writeLoading}
                indicator={<LoadingOutlined style={{ color: 'white' }} spin />}
              ></Spin>
            ) : (
              action
            )}
          </Button>{' '}
        </>
      )}

      <Button onClick={() => window.history.back()}>Back</Button>
    </>
  );
};
