import { Request, Response } from 'express';
import { Mock, randomAvatar, ResponseWarpper } from './_utils';
import api from '../src/services/api';

const { login, logout, queryRouteList, queryUserInfo } = api;

const usersListData = Mock.mock({
  'data|80-100': [
    {
      id: '@id',
      name: '@name',
      nickName: '@last',
      phone: /^1[34578]\d{9}$/,
      'age|11-99': 1,
      address: '@county(true)',
      isMale: '@boolean',
      email: '@email',
      createTime: '@datetime',
      avatar() {
        return randomAvatar();
      },
    },
  ],
});

const database = usersListData.data;

const EnumRoleType = {
  ADMIN: 'admin',
  DEFAULT: 'guest',
  DEVELOPER: 'developer',
};

const userPermission = {
  DEFAULT: {
    visit: ['1', '2', '21', '7', '5', '51', '52', '53'],
    role: EnumRoleType.DEFAULT,
  },
  ADMIN: {
    role: EnumRoleType.ADMIN,
  },
  DEVELOPER: {
    role: EnumRoleType.DEVELOPER,
  },
};

const adminUsers = [
  {
    id: 0,
    username: 'admin',
    password: 'admin',
    permissions: userPermission.ADMIN,
    avatar: randomAvatar(),
  },
  {
    id: 1,
    username: 'guest',
    password: 'guest',
    permissions: userPermission.DEFAULT,
    avatar: randomAvatar(),
  },
];

const queryArray = (array: any[], key: string, keyAlias = 'key') => {
  if (!(array instanceof Array)) {
    return null;
  }

  let data: any;
  for (const item of array) {
    if (item[keyAlias] === key) {
      data = item;
      break;
    }
  }

  return data;
};

export default {
  [login](req: Request, res: Response) {
    const { userName, password } = req.body;
    const user = adminUsers.filter(item => item.username === userName);

    if (user.length > 0 && user[0].password === password) {
      const now = new Date();
      now.setDate(now.getDate() + 1);
      res.cookie('token', JSON.stringify({ id: user[0].id, deadline: now.getTime() }), {
        maxAge: 900000,
        httpOnly: true,
      });
      res.json(ResponseWarpper.success());
    } else {
      res.json(ResponseWarpper.failed());
    }
  },

  [logout](req: Request, res: Response) {
    res.clearCookie('token');
    res.json(ResponseWarpper.success());
  },

  [queryUserInfo](req: Request, res: Response) {
    const { id } = req.params;
    const data = queryArray(database, id, 'id');
    if (data) {
      res.json(ResponseWarpper.success(data));
    } else {
      res.json(ResponseWarpper.failed('Not Found'));
    }
  },

  // eslint-disable-next-line max-lines-per-function
  [queryRouteList](req: Request, res: Response) {
    const data = [
      {
        id: 1,
        name: '首页',
        route: '/dashboard/home',
        children: [],
        parentId: 0,
        icon: 'pm-index',
        level: 1,
      },
      {
        id: 2,
        name: '基础信息',
        route: '',
        children: [
          {
            id: 9,
            name: '停车场',
            route: '/dashboard/parkingMgmt',
            children: [
              {
                id: 10,
                name: '停车场管理',
                route: '/dashboard/parkingMgmt/parking',
                children: [],
                parentId: 9,
                icon: '',
                level: 3,
              },
            ],
            parentId: 2,
            icon: '',
            level: 2,
          },
        ],
        parentId: 0,
        icon: 'pm-basic-data',
        level: 1,
      },
    ];
    if (data) {
      res.json(ResponseWarpper.success(data));
    } else {
      res.json(ResponseWarpper.failed('Not Found'));
    }
  },
};
