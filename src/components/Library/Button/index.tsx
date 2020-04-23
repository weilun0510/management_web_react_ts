import React, { PureComponent } from 'react';
import { Button as AntdButton } from 'antd';
import { ButtonProps as AntButtonProps } from 'antd/lib/button/button';
import styles from './index.less';
import classnames from 'classnames';

export type IButtonProps = {
  customtype?: string;
  title?: string;
  className?: string;
} & AntButtonProps;

class Button extends PureComponent<IButtonProps> {
  render() {
    const { title, customtype, className } = this.props;

    let cn = className;
    if (customtype) {
      cn = className ? classnames(styles[customtype], className) : styles[customtype];
    }

    return (
      <AntdButton {...this.props} className={cn} onClick={this.onClick}>
        {title}
      </AntdButton>
    );
  }

  onClick = e => {
    if (this.props.onClick) {
      console.log('onClick: ');
      this.props.onClick(e);
    }
  };
}
export default Button;
