import React from "react";
import { Button, Table, Box, Dialog, Form, Field, Input, Message } from '@alifd/next';
import './index.scss';

const { useState, useEffect } = React;

import { savePageInfo, getPageList } from 'src/api/page';
import { Page } from "src/types/schema";
import { OSS_BASE_URL } from "src/utils/constants";

const tableDataSource = [{
    id: '1',
    page: 'test1',
    create_at: +new Date(),
}, {
    id: '2',
    page: 'test2',
    create_at: +new Date(),
}]

const Pages: React.FC = (props) => {
    const [data, setData] = useState([]);
    const [visible, setVisble] = useState(false);

    const field = Field.useField({
        values: {
            page_name: '',
            page: '',
            schema_url: '',
        },
    });

    useEffect(() => {
        const getData = async () => {
            const result = await getPageList()
            const { data } = result;
            if(Array.isArray(data)) {
                setData(data);
            }
            console.log(result)
        }
        getData();
    }, []);

    const openAddForm = () => {
        setVisble(true);
    }
    const close = () => {
        setVisble(false);
    }
    const submit = async () => {
        const { errors } = await field.validatePromise();
        if (errors && errors.length > 0) {
            return;
        }
        const values: Page = field.getValues()
        console.log(values);
        const { page } = values;
        try {
            const res = await savePageInfo({
                ...values,
                schema_url: `${OSS_BASE_URL}/schema/${page}.json`
            });
            console.log(res);
        } catch (e) {
            console.log(e);
            Message.error('保存失败');
        }
    }

    return <>
        <div className="plugin-page-container">
            <Box spacing={20}>
                <Button onClick={openAddForm}>新增</Button>
                <Table dataSource={data}>
                    <Table.Column title="Id" dataIndex="id" />
                    <Table.Column title="page" dataIndex="page" />
                    <Table.Column title="创建时间" dataIndex="create_at" />
                </Table>
            </Box>
        </div>
        <Dialog
            visible={visible}
            title="新增页面"
            style={{ width: 720 }}
            onOk={submit}
            onCancel={close}
        >
            <Form field={field} fullWidth style={{ paddingLeft: 40, paddingRight: 40 }}>
                <Form.Item label="页面名称" required requiredMessage="请输入页面名称">
                    <Input name="page_name" placeholder="请输入页面名称" />
                </Form.Item>
                <Form.Item label="page" required requiredMessage="请输入page">
                    <Input name="page" placeholder="请输入page" />
                </Form.Item>
            </Form>
        </Dialog>
    </>
}
export default Pages;