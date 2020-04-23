import React, { PureComponent } from 'react';
import { Input as AntdInput } from 'antd';
import styles from './index.less';
import { InputProps as AntdInputProps } from 'antd/lib/input/Input';

export interface InputProps extends AntdInputProps {}

class Input extends PureComponent<InputProps> {
  render() {
    return (
      <div className={styles.input}>
        <AntdInput maxLength={50} {...this.props} />
      </div>
    );
  }
}
export default Input;
