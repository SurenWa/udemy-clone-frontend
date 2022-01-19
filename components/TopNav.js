import React, { useState, useEffect, useContext } from 'react';
import { Menu } from "antd";
import Link from "next/link";
import {
    AppstoreOutlined,
    LoginOutlined,
    UserAddOutlined,
    LogoutOutlined,
    CoffeeOutlined,
    CarryOutOutlined,
    TeamOutlined
} from "@ant-design/icons";

import { Context } from '../context';
import axios from "axios";
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';


const { Item, SubMenu, ItemGroup } = Menu;

const TopNav = () => {

    const [current, setCurrent] = useState("")

    const { state, dispatch } = useContext(Context)
    const { user } = state

    const router = useRouter()

    useEffect(() => {
        process.browser && setCurrent(window.location.pathname)
        //console.log(window.location.pathname)
    }, [process.browser && window.location.pathname])

    const logout = async () => {
        dispatch({ type: "LOGOUT" });
        window.localStorage.removeItem("user");
        const { data } = await axios.get("/api/logout");
        toast(data.message);
        router.push("/login");
    }


    return (
        <Menu mode="horizontal" selectedKeys={[current]} className='mb-2'>
            <Item
                key="/"
                onClick={(e) => setCurrent(e.key)}
                icon={<AppstoreOutlined />}
            >
                <Link href="/">
                    <a>LMS Nepal</a>
                </Link>
            </Item>

            {user && user.role && user.role.includes("Instructor") ? (
                <Item
                    key="/instructor/course/create"
                    icon={<CarryOutOutlined />}
                    onClick={(e) => setCurrent(e.key)}
                >
                    <Link href="/instructor/course/create">
                        <a>Create Course</a>
                    </Link>
                </Item>
            ) : (
                <Item
                    key="/user/become-instructor"
                    icon={<TeamOutlined />}
                    onClick={(e) => setCurrent(e.key)}
                >
                    <Link href="/user/become-instructor">
                        <a>Become Instructor</a>
                    </Link>
                </Item>
            )}



            {user === null && (
                <>
                    <Item
                        key="/login"
                        icon={<LoginOutlined />}
                        onClick={(e) => setCurrent(e.key)}
                    >
                        <Link href="/login">
                            <a>Login</a>
                        </Link>
                    </Item>

                    <Item
                        key="/register"
                        icon={<UserAddOutlined />}
                        onClick={(e) => setCurrent(e.key)}
                    >
                        <Link href="/register">
                            <a>Register</a>
                        </Link>
                    </Item>
                </>
            )}

            {user !== null && (
                <SubMenu
                    key="/logout"
                    icon={<CoffeeOutlined />}
                    title={user && user.name}
                    //className="float-right"
                    style={{ marginLeft: 'auto' }}

                >
                    <ItemGroup>
                        <Item key="/user">
                            <Link href="/user">
                                <a>Dashboard</a>
                            </Link>
                        </Item>

                        <Item
                            onClick={logout}
                            icon={<LogoutOutlined />}
                        >
                            Logout
                        </Item>
                    </ItemGroup>
                </SubMenu>
            )}

            {user && user.role && user.role.includes("Instructor") && (
                <Item
                    key="/instructor"
                    icon={<TeamOutlined />}
                    onClick={(e) => setCurrent(e.key)}
                    className='float-right'
                >
                    <Link href="/instructor">
                        <a>Instructor</a>
                    </Link>
                </Item>
            )}

        </Menu>
    );
};

export default TopNav;
