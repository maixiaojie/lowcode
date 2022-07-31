import React from "react";
import { Button, Table, Box, Dialog, Form, Field, Input, Select } from '@alifd/next';
import './index.scss';

const { useState, useEffect } = React;

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
            pageName: '',
            page: '',
        },
      });

    useEffect(() => {
        setData(tableDataSource);
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
        const values = field.getValues()
        console.log(values);
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
                    <Input name="pageName" placeholder="请输入页面名称" />
                </Form.Item>
                <Form.Item label="page" required requiredMessage="请输入page">
                    <Input name="page" placeholder="请输入page" />
                </Form.Item>
            </Form>
        </Dialog>
    </>
}
export default Pages;