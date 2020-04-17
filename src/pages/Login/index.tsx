import React, { PureComponent } from 'react';
import { Button, Input, Form, Icon } from 'antd';
import styles from './index.less';
import { FormComponentProps } from 'antd/lib/form/Form';
import { connect } from '@/utils/decorators';
import { GlobalState, UmiComponentProps } from '@/types/globals';

interface LoginProps extends FormComponentProps, UmiComponentProps {}

const mapStateToProps = ({ login }: GlobalState) => {
  return {
    login,
  };
};

@connect(
  mapStateToProps,
  null,
)
class Login extends PureComponent<LoginProps> {
  componentDidMount() {}

  render() {
    const { form } = this.props;
    const { getFieldDecorator } = form;
    return (
      <div className={styles.loginStyle}>
        <Form onSubmit={this.onLogin} layout={'vertical'}>
          <Form.Item>
            {getFieldDecorator('userName', {
              rules: [{ required: true, message: 'Please input your username!' }],
            })(
              <Input
                prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                placeholder="Username"
              />,
            )}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator('password', {
              rules: [{ required: true, message: 'Please input your Password!' }],
            })(
              <Input
                prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                type="password"
                placeholder="Password"
              />,
            )}
          </Form.Item>
          <Button type="primary" htmlType="submit">
            登录
          </Button>
        </Form>
      </div>
    );
  }

  onLogin = (event: React.FormEvent<HTMLFormElement>) => {
    if (event) {
      event.preventDefault();
    }
    const { form, dispatch } = this.props;
    const { validateFields } = form;
    validateFields((errors, values) => {
      if (errors) {
        return;
      }
      dispatch({ type: 'login/login', payload: values });
    });
  };
}

export default Form.create<LoginProps>()(Login);
