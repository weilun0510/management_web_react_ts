import React, { PureComponent, Fragment } from 'react';
import withRouter from 'umi/withRouter';
import { connect } from '@/utils/decorators';
import { GlobalState, UmiComponentProps } from '@/types/globals';
import { RouteComponentProps } from 'react-router';
// import { Layout } from 'antd';
import { Header, Sider, Bread, Footer } from '@/components/Layout';
import Layout from '@/components/Library/Layout';
import styles from './PrimaryLayout.less';

const { Content } = Layout;
const mapStateToProps = ({ app, loading }: GlobalState) => {
  return {
    routeList: app.routeList,
    loading: loading,
    collapsed: app.collapsed,
  };
};

type StateProps = ReturnType<typeof mapStateToProps>;
interface PrimaryLayoutProps extends StateProps, UmiComponentProps, RouteComponentProps {}

@connect(
  mapStateToProps,
  null,
)
class PrimaryLayout extends PureComponent<PrimaryLayoutProps> {
  render() {
    const { children, routeList, collapsed } = this.props;

    return (
      <Fragment>
        <Layout className={'height100'}>
          <Header />
          <Layout className={styles.around}>
            <Sider
              routeList={routeList}
              collapsed={collapsed}
              onCollapseChange={this.onCollapseChange}
            />
            <Layout className={styles.page}>
              <Bread routeList={routeList} />
              <Content>{children}</Content>
              <Footer />
            </Layout>
          </Layout>
        </Layout>
      </Fragment>
    );
  }

  onCollapseChange = collapsed => {
    this.props.dispatch({
      type: 'app/handleCollapseChange',
      payload: collapsed,
    });
  };
}

export default withRouter(PrimaryLayout);
