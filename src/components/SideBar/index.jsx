import React from 'react';
import { Menu, Icon } from 'antd';
import routes from '../../routes';

const { SubMenu } = Menu;

const SideBar = ()=>{ 
    
    const handleClick = e => {
        console.log('click ', e);
    };

    return (
        <Menu
            onClick={handleClick}
            style={{ width: 300 }}
            defaultSelectedKeys={['1']}
            defaultOpenKeys={['sub1']}
            mode="inline"
            theme="dark"
        >
        <SubMenu
            key="demo"
            title={
                <span>
                    <Icon type="appstore" />
                    <span>Demo</span>
                </span>
            }
        >
            {()=>{
                let dom;
                routes.forEach(item=>{
                    dom += <Menu.Item key={item.name}>{item.name}</Menu.Item>
                })
                return dom
            }}
        </SubMenu>
        </Menu>
    );
}

export default SideBar