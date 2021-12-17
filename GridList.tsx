import React, { ReactElement } from 'react';
import { useIntl } from 'react-intl';
import { Spin, Row, Col, Empty } from 'antd';
import styles from './GridList.module.less'

const layout = {
  xs: 24,
  sm: 12,
  md: 8,
  lg: 6,
  xl: 6,
  xxl: 4
};

type Props<T> = {
  dataSource: T[];
  renderItem: (item: T, index: number) => ReactElement;
  loading: boolean;
  rowKey?: string;
};

export default function GridList<T>({ dataSource = [], renderItem, rowKey = 'id', loading }: Props<T>): ReactElement {
  if (loading) {
    return (
      <Spin tip='加载中...'>
        <div className={styles.loading}></div>
      </Spin>
    );
  }
  if (dataSource.length === 0) {
    return (
      <div style={{ padding: '48px 0' }}>
        <Empty description='暂无数据' />
      </div>
    );
  }
  return (
    <div className={styles.root}>
      <Row gutter={4}>
        {dataSource.map((item, index) => (
          <Col key={item[rowKey] + '-' + index} {...layout}>
            {renderItem(item, index)}
          </Col>
        ))}
      </Row>
    </div>
  );
}
