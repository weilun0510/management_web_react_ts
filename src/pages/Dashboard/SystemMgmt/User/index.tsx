import React, { PureComponent } from 'react';
import { connect } from '@/utils/decorators';
import { UmiComponentProps } from '@/types/globals';
import { WrappedFormUtils, FormComponentProps } from '@/components/Library/type';
import { ButtonGroup } from '@/components/Library';
// import { SearchForm,  } from '@/components/Library';
// import {CommonComponent}from '@/components/Library';
// import { SINGLE_COLUMN_WIDTH, DOUBLE_COLUMN_WIDTH } from '@/utils/constant';

// interface UserProps extends FormComponentProps, UmiComponentProps {}

const mapStateToProps = ({ user, loading: { effects } }) => {
  return {
    userData: user.userData,
    getUserDataLoading: effects['user/getUser'],
  };
};

type UserStateProps = ReturnType<typeof mapStateToProps>;
type UserProps = UserStateProps & FormComponentProps & UmiComponentProps;

interface UserState {}

@connect(
  mapStateToProps,
  null,
)
class User extends PureComponent<UserProps, UserState> {
  searchForm: WrappedFormUtils;

  componentDidMount() {}

  render() {
    return (
      <div>
        {/* {this.renderSearchFrom()} */}
        <div className={'listTitle'}>信息展示</div>
        {this.renderButtonGroup()}
        {/* {this.renderTable()} */}
      </div>
    );
  }

  // renderSearchFrom() {
  //   const props = {
  //     items: [
  //       {
  //         type: 'input',
  //         field: 'name',
  //         placeholder: '姓名',
  //       },
  //       {
  //         type: 'input',
  //         field: 'phone',
  //         placeholder: '电话',
  //       },
  //       {
  //         type: 'input',
  //         field: 'name2',
  //         placeholder: '姓名',
  //       },
  //       {
  //         type: 'input',
  //         field: 'phone2',
  //         placeholder: '电话',
  //       },
  //       {
  //         type: 'input',
  //         field: 'phone3',
  //         placeholder: '电话',
  //       },
  //       {
  //         type: 'input',
  //         field: 'phone4',
  //         placeholder: '电话',
  //       },
  //       {
  //         type: 'input',
  //         field: 'phone5',
  //         placeholder: '电话',
  //       },
  //     ],
  //     actions: [
  //       { customtype: 'select', title: '查询', htmlType: 'submit' as 'submit' },
  //       { customtype: 'reset', title: '重置', onClick: this.onSearchFormReset },
  //     ],
  //     columnNumOfRow: 4,
  //     onSubmit: this.onSearch,
  //     onGetFormRef: this.onGetFormRef,
  //   };

  //   return <SearchForm {...props} />;
  // }

  renderButtonGroup() {
    const ButtonGroupProps = {
      actions: [
        {
          customtype: 'master',
          title: '新增',
          onClick: this.addUser,
        },
        // {
        //   customtype: 'warning',
        //   title: '删除',
        //   onClick: this.batchDeleteCarBan,
        //   loading: deleteDeviceLoading,
        // },
      ],
    };
    return <ButtonGroup {...ButtonGroupProps} />;
  }

  // renderTable() {
  //   const { userData, getUserDataLoading } = this.props;
  //   const { selectedRowKeys } = this.state;

  //   if (isEmpty(userData) || !userData) {
  //     return null;
  //   }

  //   const columns: ColumnProps<any>[] = [
  //     {
  //       title: '车牌号',
  //       width: SINGLE_COLUMN_WIDTH,
  //       dataIndex: 'carPlate',
  //       key: 'carPlate',
  //       render: (text: any, record: object) => CommonComponent.renderTableCol(text, record),
  //     },
  //     {
  //       title: '车辆类型',
  //       width: SINGLE_COLUMN_WIDTH,
  //       dataIndex: 'carTypeStr',
  //       key: 'carTypeStr',
  //       render: (text: any, record: object) => CommonComponent.renderTableCol(text, record),
  //     },
  //     {
  //       title: '车主姓名',
  //       width: SINGLE_COLUMN_WIDTH,
  //       dataIndex: 'name',
  //       key: 'name',
  //       render: (text: any, record: object) => CommonComponent.renderTableCol(text, record),
  //     },
  //     {
  //       title: '联系方式',
  //       width: DOUBLE_COLUMN_WIDTH,
  //       dataIndex: 'phone',
  //       key: 'phone',
  //       render: (text: any, record: object) => CommonComponent.renderTableCol(text, record),
  //     },
  //     {
  //       title: '出入关卡',
  //       width: DOUBLE_COLUMN_WIDTH,
  //       key: 'address',
  //       dataIndex: 'address',
  //       render: (text: any, record: object) => CommonComponent.renderTableCol(text, record),
  //     },
  //     {
  //       title: '出入类型',
  //       width: SINGLE_COLUMN_WIDTH,
  //       key: 'transitTypeStr',
  //       dataIndex: 'transitTypeStr',
  //       render: (text: any, record: object) => CommonComponent.renderTableCol(text, record),
  //     },
  //     {
  //       title: '通行时间',
  //       // width: DOUBLE_COLUMN_WIDTH,
  //       key: 'createTime',
  //       dataIndex: 'createTime',
  //       render: (text: any, record: object) => CommonComponent.renderTableCol(text, record),
  //     },
  //   ];

  //   const pagination: PaginationConfig = {
  //     position: 'bottom',
  //     current: userData.pageable.pageNumber + 1,
  //     total: userData.totalElements,
  //     pageSize: userData.pageable.pageSize,
  //     defaultCurrent: 1,
  //     // onChange: this.onChangePage,
  //   };

  //   return (
  //     <div className={classNames('flexAuto')}>
  //       <Table
  //         columns={columns}
  //         dataSource={userData.content}
  //         loading={getUserDataLoading}
  //         scroll={{ y: '100%' }}
  //         pagination={pagination}
  //         onSelectRow={this.onTableSelectRow}
  //         onChange={this.onTableChange}
  //         selectedRow={selectedRowKeys}
  //       />
  //     </div>
  //   );
  // }

  addUser = () => {
    this.setState({
      add: true,
    });
  };

  batchDeleteCarBan = () => {
    // if (this.confirmRef.current) {
    //   this.confirmRef.current.open(
    //     () => this.onDeleteCarBan(this.state.selectedRowKeys),
    //     '删除',
    //     '是否确认删除选中的条目？',
    //   );
    // }
  };

  onSearch = e => {
    e.preventDefault();
    this.searchForm.validateFields((err, fieldsValue) => {
      if (err) {
        return;
      }
      console.log('fieldsValue: ', fieldsValue);
    });
  };

  onSearchFormReset = () => {
    this.searchForm.resetFields();
    // this.setState({
    //   searchFields: {},
    // });
    // this.getCarRecordData({ page: 0 });
  };

  onGetFormRef = (form: WrappedFormUtils) => {
    this.searchForm = form;
  };
}

export default User;
