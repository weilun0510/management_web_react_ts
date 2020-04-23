import React, { PureComponent, Fragment } from 'react';
import { connect } from '@/utils/decorators';
import { UmiComponentProps } from '@/types/globals';
import {
  WrappedFormUtils,
  FormComponentProps,
  PaginationConfig,
  ColumnProps,
} from '@/components/Library/type';
import { SearchForm, ButtonGroup, CommonComponent, Table, Button } from '@/components/Library';
import { SINGLE_COLUMN_WIDTH, DOUBLE_COLUMN_WIDTH } from '@/utils/constant';
import { isEmpty } from 'lodash';
import classNames from 'classnames';

// interface UserProps extends FormComponentProps, UmiComponentProps {}

const mapStateToProps = ({ user, loading: { effects } }) => {
  return {
    userData: user.userData,
    getUserDataLoading: effects['user/getUser'],
  };
};

type UserStateProps = ReturnType<typeof mapStateToProps>;
type UserProps = UserStateProps & FormComponentProps & UmiComponentProps;

interface UserState {
  selectedRowKeys: number[];
  searchFields: { [propName: string]: any };
}

@connect(
  mapStateToProps,
  null,
)
class User extends PureComponent<UserProps, UserState> {
  searchForm: WrappedFormUtils;

  constructor(props: Readonly<UserProps>) {
    super(props);
    this.state = {
      selectedRowKeys: [],
      searchFields: {},
    };
  }

  componentDidMount() {
    this.getUserData({ page: 0 });
  }

  render() {
    return (
      <div className={classNames('height100', 'flexColStart')}>
        {this.renderSearchFrom()}
        <div className={'listTitle'}>信息展示</div>
        {this.renderButtonGroup()}
        {this.renderTable()}
      </div>
    );
  }

  renderSearchFrom() {
    const props = {
      items: [
        {
          type: 'input',
          field: 'name',
          placeholder: '姓名',
        },
        {
          type: 'input',
          field: 'phone',
          placeholder: '电话',
        },
        {
          type: 'input',
          field: 'name2',
          placeholder: '姓名',
        },
        {
          type: 'input',
          field: 'phone2',
          placeholder: '电话',
        },
        {
          type: 'input',
          field: 'phone3',
          placeholder: '电话',
        },
        {
          type: 'input',
          field: 'phone4',
          placeholder: '电话',
        },
        {
          type: 'input',
          field: 'phone5',
          placeholder: '电话',
        },
      ],
      actions: [
        { customtype: 'select', title: '查询', htmlType: 'submit' as 'submit' },
        { customtype: 'reset', title: '重置', onClick: this.onSearchFormReset },
      ],
      columnNumOfRow: 4,
      onSubmit: this.onSearch,
      onGetFormRef: this.onGetFormRef,
    };

    return <SearchForm {...props} />;
  }

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

  renderTable() {
    const { userData, getUserDataLoading } = this.props;
    const { selectedRowKeys } = this.state;

    if (isEmpty(userData) || !userData) {
      return null;
    }

    const columns: ColumnProps<any>[] = [
      {
        title: '用户名',
        dataIndex: 'userName',
        key: 'userName',
        width: SINGLE_COLUMN_WIDTH,
        render: (text: any, record: object) => CommonComponent.renderTableCol(text, record),
      },
      {
        title: '姓名',
        width: DOUBLE_COLUMN_WIDTH,
        dataIndex: 'name',
        key: 'name',
        render: (text: any, record: object) => CommonComponent.renderTableCol(text, record),
      },
      {
        title: '邮箱',
        width: DOUBLE_COLUMN_WIDTH,
        dataIndex: 'email',
        key: 'email',
        render: (text: any, record: object) => CommonComponent.renderTableCol(text, record),
      },
      {
        title: '手机号',
        width: DOUBLE_COLUMN_WIDTH,
        key: 'phone',
        dataIndex: 'phone',
        render: (text: any, record: object) => CommonComponent.renderTableCol(text, record),
      },
      {
        title: '所属角色',
        width: DOUBLE_COLUMN_WIDTH,
        key: 'roleName',
        dataIndex: 'roleName',
        render: (text: any, record: object) => CommonComponent.renderTableCol(text, record),
      },
      {
        title: '操作',
        width: DOUBLE_COLUMN_WIDTH,
        key: 'action',
        render: (_text: any, record: any) =>
          userData ? (
            <Fragment>
              <Button
                customtype={'icon'}
                // onClick={() => this.updateUser(record)}
                icon={'edit'}
                title={'修改用户'}
              />
              <Button
                customtype={'icon'}
                // onClick={() => this.deleteUser(record.id)}
                title={'删除'}
                icon={'delete'}
              />
            </Fragment>
          ) : null,
      },
    ];

    const pagination: PaginationConfig = {
      position: 'bottom',
      current: userData.pageable.pageNumber + 1,
      total: userData.totalElements,
      pageSize: userData.pageable.pageSize,
      defaultCurrent: 1,
      // onChange: this.onChangePage,
    };

    return (
      <div className={classNames('flexAuto')}>
        <Table
          columns={columns}
          dataSource={userData.content}
          loading={getUserDataLoading}
          scroll={{ y: '100%' }}
          pagination={pagination}
          onSelectRow={this.onTableSelectRow}
          onChange={this.onTableChange}
          selectedRow={selectedRowKeys}
        />
      </div>
    );
  }

  addUser = () => {
    // this.setState({
    //   add: true,
    // });
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

  getUserData = Fileds => {
    const { dispatch } = this.props;
    this.setState({ selectedRowKeys: [] });
    dispatch({ type: 'user/getUser', payload: { ...Fileds } });
  };

  onSearch = e => {
    e.preventDefault();
    this.searchForm.validateFields((err, fieldsValue) => {
      if (err) {
        return;
      }
      this.setState({
        searchFields: { ...fieldsValue },
      });
      fieldsValue.page = 0;
      console.log('fieldsValue: ', fieldsValue);
    });
  };

  onSearchFormReset = () => {
    this.searchForm.resetFields();
    // this.setState({
    //   searchFields: {},
    // });
    // this.getUserData({ page: 0 });
  };

  onGetFormRef = (form: WrappedFormUtils) => {
    console.log('form: ', form);
    this.searchForm = form;
  };

  onTableChange = pagination => {
    const searchFields = { ...this.state.searchFields };
    searchFields.page = --pagination.current;
    searchFields.size = pagination.pageSize;
    this.getUserData(searchFields);
  };

  onTableSelectRow = selectedRowKeys => {
    this.setState({ selectedRowKeys });
  };
}

export default User;
