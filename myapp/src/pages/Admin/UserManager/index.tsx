import type { ProColumns } from '@ant-design/pro-components';
import {
  EditableProTable,
  ProCard,
  ProFormField,
  ProFormRadio,
} from '@ant-design/pro-components';
import React, { useState } from 'react';
import { searchUser } from '@/services/ant-design-pro/api';
import { Image } from "antd";
import {result} from "lodash";

const waitTime = (time: number = 100) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, time);
  });
};

export default () => {
  const [editableKeys, setEditableRowKeys] = useState<React.Key[]>([]);
  const [dataSource, setDataSource] = useState<readonly API.CurrentUser[]>([]);
  const [position, setPosition] = useState<'top' | 'bottom' | 'hidden'>(
      'bottom',
  );

  const columns: ProColumns<API.CurrentUser>[] = [
    // formItemProps: (form, { rowIndex }) => {
    //   return {
    //     rules:
    //         rowIndex > 1 ? [{ required: true, message: '此项为必填项' }] : [],
    //   };
    // },
    // // 第一行不允许编辑
    // editable: (text, record, index) => {
    //   return index !== 0;
    // },
    // copyable: true,
    // tooltip 提示符
    // width: 200,

    {
      title: 'ID',
      dataIndex: 'id',
      width: '4%',
    },
    {
      title: '用户名',
      dataIndex: 'username',
      width: '8%',
    },
    {
      title: '用户账户',
      dataIndex: 'userAccount',
      width: '8%',
    },
    {
      title: '头像',
      dataIndex: 'avatarUrl',
      width: '6%',
      render: (_, record) => (
        <div>
          <Image src={record.avatarUrl} width={80} />
        </div>
      ),
    },
    {
      title: '性别',
      dataIndex: 'gender',
      width: '5%',
    },
    {
      title: '电话',
      dataIndex: 'phone',
      width: '10%',
    },
    {
      title: '邮箱',
      dataIndex: 'email',
      width: '14%',
    },
    {
      title: '角色',
      dataIndex: 'userRole',
      valueType: 'select',
      valueEnum: {
        0: { text: '普通用户', status: 'Default' },
        1: {
          text: '管理员',
          status: 'Success',
        },
      },
      width: '8%',
    },
    {
      title: '状态',
      dataIndex: 'userStatus',
      valueType: 'select',
      valueEnum: {
        0: { text: '离线', status: 'Default' },
        1: {
          text: '在线',
          status: 'Success',
        },
      },
      width: '6%',
    },
    {
      title: '创建时间',
      dataIndex: 'creatTime',
      valueType: 'date',
      width: '10%',

    },
    {
      title: '更新时间',
      dataIndex: 'updateTime',
      valueType: 'date',
      width: '10%',
    },
    {
      title: '操作',
      valueType: 'option',
      width: '10%',
      render: (text, record, _, action) => [
        <a
            key="editable"
            onClick={() => {
              action?.startEditable?.(record.id);
            }}
        >
          编辑
        </a>,
        <div>/</div>,
        <a
            key="delete"
            onClick={() => {
              setDataSource(dataSource.filter((item) => item.id !== record.id));
            }}
        >
          删除
        </a>,
      ],
    },
  ];

  return (
    <>
      <EditableProTable<API.CurrentUser>
        rowKey="id"
        headerTitle="用户信息表"
        maxLength={5}
        scroll={{
          x: 960,
        }}
        recordCreatorProps = {
          position !== 'hidden'
            ? {
              position: position as 'top',
              record: (index, dataSource): API.CurrentUser => ({
                id: 0,
                username: '',
                userAccount: '',
                avatarUrl: '',
                gender: 0,
                phone: '',
                email: '',
                userStatus: 0,
                createTime: new Date(),
                userRole: 0,
              }),
            }
            : false
        }
        loading={false}
        toolBarRender={() => [
          <ProFormRadio.Group
            key="render"
            fieldProps={{
              value: position,
              onChange: (e) => setPosition(e.target.value),
            }}
            options={[
              {
                label: '添加到顶部',
                value: 'top',
              },
              {
                label: '添加到底部',
                value: 'bottom',
              },
              {
                label: '隐藏',
                value: 'hidden',
              },
            ]}
          />,
        ]}
        columns={columns}

        request={async () => {
          try {
              // 调用 searchUser 接口获取用户数据
              const response = await searchUser();
              // const userList = await searchUser();

              // TODO 这里怎么接收到的是 undefined ？？？
              console.log('错误111：' + response.data);

              const userList = response.data;

              return {
                  // 将获取的用户数据设置为表格的 dataSource
                  data: userList,
                  // 或者 userList.data, 根据实际返回的数据结构而定
                  total: userList.length,
                  success: true,
              };
          }
          catch (error) {

              // 如果发生错误，处理错误情况
            console.error("获取数据失败", error);
            return {
              data: [],
              total: 0,
              success: false,
            };
          }
        }}
        editable={{
          type: 'multiple',
          editableKeys,
          onSave: async (rowKey, data, row) => {
            console.log(rowKey, data, row);
            await waitTime(2000);
          },
          onChange: setEditableRowKeys,
        }}
      />
      {/*<ProCard title="表格数据" headerBordered collapsible defaultCollapsed>*/}
      {/*  <ProFormField*/}
      {/*    ignoreFormItem*/}
      {/*    fieldProps={{*/}
      {/*      style: {*/}
      {/*        width: '100%',*/}
      {/*      },*/}
      {/*    }}*/}
      {/*    mode="read"*/}
      {/*    valueType="jsonCode"*/}
      {/*    text={JSON.stringify(dataSource)}*/}
      {/*  />*/}
      {/*</ProCard>*/}
    </>
  );
};
