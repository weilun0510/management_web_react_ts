import React, { PureComponent } from 'react';
import { Layout, Dropdown, Icon, Menu } from 'antd';
import styles from './Header.less';
import { connect } from '@/utils/decorators';
import Img from 'react-image';
// import { GlobalState } from '@/types/globals';
import { router } from '@/utils';

const mapStateToProps = ({ app }) => ({ app });

// type HearderStateProps = ReturnType<typeof mapStateToProps>;
// type HeaderProps = HearderStateProps & UmiComponentProps;

interface State {
  helpVisible: boolean;
}

@connect(
  mapStateToProps,
  null,
)
class Header extends PureComponent<any, State> {
  constructor(props) {
    super(props);
    this.state = {
      helpVisible: false,
    };
  }
  componentDidMount() {}

  renderMenuList() {
    return (
      <Menu className={styles.overlayClassName}>
        <div className={styles.dropTitle}>个人档案</div>
        <Menu.Divider />
        <Menu.Item onClick={this.openHelp}>
          <Icon type="question-circle" />
          帮助文档
        </Menu.Item>
        <Menu.Item onClick={this.loginout}>
          <Icon type="logout" />
          退出
        </Menu.Item>
      </Menu>
    );
  }

  render() {
    return (
      <Layout.Header className={styles.header}>
        <div className={styles.logo}>
          <Img src={require('@/assets/images/logo.png')} />
          <p>智能电源控制后台</p>
        </div>
        <div className={styles.right}>
          <Img src={require('@/assets/images/logo.png')} />
          <div className={styles.admin}>
            <div className={styles.name}>admin</div>
            {/* <div className={styles.position}>{userInfo && userInfo.roleName}</div> */}
          </div>
          <div className={styles.loginOut}>
            <Dropdown
              overlay={this.renderMenuList()}
              className={styles.dropdown}
              overlayClassName={styles.dropdownBody}
            >
              <div>
                {/* {userInfo && userInfo.roleName} */}
                <Icon type="down" />
              </div>
            </Dropdown>
            {/* <Icon type={'pm-power-off'} className={styles.quitIcon} onClick={this.loginout} /> */}
          </div>
        </div>
      </Layout.Header>
    );
  }

  navInit = () => {
    router.push('/initialization');
  };

  openGuide = () => {
    this.props.dispatch({ type: 'app/operateUsageGuide', visible: true });
  };

  openHelp = () => {
    // const { dispatch } = this.props;
    // dispatch({
    //   type: 'helpGlobal/getHelpData',
    // });
    // this.setState({
    //   helpVisible: true,
    // });
  };
  cancelHelp = () => {
    this.setState({
      helpVisible: false,
    });
  };
  cancelGuide = () => {
    this.props.dispatch({ type: 'app/operateUsageGuide', visible: false });
  };

  loginout = () => {
    const { dispatch } = this.props;
    dispatch({
      type: 'app/logout',
    }).then(res => {
      if (res) {
        localStorage.clear();
        router.push({ pathname: '/login' });
      }
    });
  };
}

export default Header;
