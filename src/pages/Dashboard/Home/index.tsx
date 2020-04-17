import React, { PureComponent } from 'react';
import { FormComponentProps } from 'antd/lib/form/Form';
import { connect } from '@/utils/decorators';
import { UmiComponentProps } from '@/types/globals';

interface HomeProps extends FormComponentProps, UmiComponentProps {}

const mapStateToProps = () => {
  return {};
};

@connect(
  mapStateToProps,
  null,
)
class Home extends PureComponent<HomeProps> {
  componentDidMount() {}

  render() {
    return <div>home</div>;
  }
}

export default Home;
