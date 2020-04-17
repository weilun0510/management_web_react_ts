import React, { PureComponent, Fragment } from 'react';
import withRouter from 'umi/withRouter';
import { connect } from '@/utils/decorators';
import { GlobalState, UmiComponentProps } from '@/types/globals';
import { RouteComponentProps } from 'react-router';
import { Layout } from 'antd';
import { Header } from '@/components/Layout';
const mapStateToProps = (state: GlobalState) => {
  return {
    routeList: state.app.routeList,
    loading: state.loading,
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
    const { children } = this.props;

    return (
      <Fragment>
        <Layout>
          <Header />
          {children}
        </Layout>
      </Fragment>
    );
  }
}

export default withRouter(PrimaryLayout);
