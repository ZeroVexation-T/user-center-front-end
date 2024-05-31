import { GithubOutlined } from '@ant-design/icons';
import { DefaultFooter } from '@ant-design/pro-components';
import React from 'react';

const Footer: React.FC = () => {
  const defaultMessage = "TANG出品";
  const currentYear = new Date().getFullYear();
  return (
    <DefaultFooter
      copyright={`${currentYear} ${defaultMessage}`}
      style={{
        background: 'none',
      }}
      links={[
        {
          key: 'QQ邮箱',
          title: '1924584005@qq.com',
          href: '',
          blankTarget: true,
        },
        {
          key: 'github',
          title: <><GithubOutlined />ZeroVexation-T</>,
          href: '',
          blankTarget: true,
        },
        {
          key: '联系我们',
          title: '19114771205',
          href: '',
          blankTarget: true,
        },
      ]}
    />
  );
};

export default Footer;
