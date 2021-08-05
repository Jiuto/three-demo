import React from 'react';
import { Menu, Icon } from 'antd';
import routes from '../../routes';
import { useHistory } from 'react-router-dom';

const { SubMenu } = Menu;

function SideBar(){ 
    const history = useHistory()

    const handleClick = e => {
        history.push(e.key)
    };

    return (
        <Menu
            className="sidebar"
            openKeys={["demo"]}
            onClick={handleClick}
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
            {
                routes.map(item=>{
                    return <Menu.Item key={item.path}>{item.name}</Menu.Item>
                })
            }
        </SubMenu>
        </Menu>
    );
}

export default SideBar